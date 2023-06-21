from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from faker import Faker
from config import db, bcrypt, app




fake = Faker()


# Models go here!
class TodoList(db.Model, SerializerMixin):
    __tablename__ = 'todolists'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    todos = association_proxy('todo_list_items', 'todo')

    def __repr__(self):
        return f"<TodoList {self.name}>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "todos": [todo.to_dict() for todo in self.todos]
        }
    
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

    
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String(255), nullable=False, unique=True)
    username = Column(String(20), nullable=False, unique=True)
    _password_hash = Column(String, nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise AssertionError('No username provided')
        if User.query.filter(User.username == username, User.id != self.id).first():
            raise AssertionError('Username is already in use')
        if len(username) < 3 or len(username) > 20:
            raise AssertionError('Username must be between 3 and 20 characters')
        return username
    
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
        return bcrypt.checkpw(password_bytes, hashed_password)
