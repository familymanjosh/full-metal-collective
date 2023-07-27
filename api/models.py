from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import validates, relationship
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime
from faker import Faker
from config import db, bcrypt, app

fake = Faker()

# Association Tables
user_project = db.Table('user_project',
                        Column('user_id', Integer, ForeignKey('users.id')),
                        Column('project_id', Integer, ForeignKey('projects.id'))
                        )

user_review = db.Table('user_review',
                        Column('user_id', Integer, ForeignKey('users.id')),
                        Column('review_id', Integer, ForeignKey('reviews.id'))
                        )
user_todo_list = db.Table('user_todo_list',
                        Column('user_id', Integer, ForeignKey('users.id')),
                        Column('todo_list_id', Integer, ForeignKey('todolists.id'))
                        )

class TodoList(db.Model, SerializerMixin):
    __tablename__ = 'todolists'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __repr__(self):
        return f"<TodoList {self.name}>"

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise AssertionError('No name provided')
        if TodoList.query.filter(TodoList.name == name, TodoList.id != self.id).first():
            raise AssertionError('Name is already in use')
        if len(name) < 3 or len(name) > 20:
            raise AssertionError('Name must be between 3 and 20 characters')
        return name

    @classmethod
    def generate_fake(cls, count=100):
        for i in range(count):
            todo_list = TodoList(name=fake.name())
            db.session.add(todo_list)
        db.session.commit()

    users = relationship('User', back_populates='todolists')


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    city = Column(String(255), nullable=False)
    state = Column(String(255), nullable=False)
    phone = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    username = Column(String(20), nullable=False, unique=True)
    _password_hash = Column(String, nullable=False)


    projects = relationship('Project', secondary=user_project, back_populates='users')
    reviews = relationship('Reviews', secondary=user_review, back_populates='users')
    todolists = relationship('TodoList', secondary=user_todo_list, back_populates='users')




    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise AssertionError('No username provided')
        if User.query.filter(User.username == username, User.id != self.id).first():
            raise AssertionError('Username is already in use')
        if len(username) < 3 or len(username) > 20:
            raise AssertionError('Username must be between 3 and 20 characters')
        return username

    @validates('email')
    def validate_email(self, key, email):
        if not email:
            raise AssertionError('No email provided')
        if User.query.filter(User.email == email, User.id != self.id).first():
            raise AssertionError('Email is already in use')
        if len(email) < 3 or len(email) > 50:
            raise AssertionError('Email must be between 3 and 20 characters')
        return email

    def __repr__(self):
        return f"<User {self.username}>"

    @property
    def password(self):
        raise AttributeError("Password is not readable")

    @password.setter
    def password(self, password):
        password_bytes = password.encode("utf-8")
        hashed_password = bcrypt.generate_password_hash(password_bytes)
        self._password_hash = hashed_password.decode("utf-8")

    def authenticate(self, password):
        password_bytes = password.encode("utf-8")
        hashed_password = self._password_hash.encode("utf-8")
        return bcrypt.check_password_hash(hashed_password, password_bytes)


class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    title = Column(String(100))
    description = Column(String)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    
    users = relationship('User', secondary=user_project, back_populates='projects')
    photos = relationship('Photos', backref='project')
    invoices = relationship('Invoice', backref='project')




class Reviews(db.Model):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True)
    content = Column(String, nullable=False)
    project_id = Column(Integer, ForeignKey('projects.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    users = relationship('User', secondary=user_review, back_populates='reviews')



class Photos(db.Model, SerializerMixin):
    __tablename__ = 'photos'
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey('projects.id'))
    file_path = Column(String(200))
    caption = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey('users.id'))


class Invoice(db.Model, SerializerMixin):
    __tablename__ = 'invoices'
    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey('projects.id'))
    amount = Column(Integer)
    user_id = Column(Integer, ForeignKey('users.id'))
    due_date = Column(DateTime)
    payment_status = Column(String(50))

class Notes(db.Model, SerializerMixin):
    __tablename__ = 'notes'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    title = Column(String(100), nullable=False)
    content = Column(String(255), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    project_id = Column(Integer, ForeignKey('projects.id'))
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship('User', backref='notes')
    project = relationship('Project', backref='notes')

    def __repr__(self):
        return f"<Notes {self.content}>"

    @validates('content')
    def validate_content(self, key, content):
        if not content:
            raise AssertionError('No content provided')
        if len(content) < 3 or len(content) > 255:
            raise AssertionError('Content must be between 3 and 255 characters')
        return content
