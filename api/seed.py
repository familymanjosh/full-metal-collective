from faker import Faker
from config import db
from models import TodoList, User, Project, Reviews, Photos, Invoice
from datetime import datetime
from config import app
import random

fake = Faker()

def seed_data():
    with app.app_context():
        seed_todo_lists()
        seed_users()
        seed_projects()
        seed_reviews()
        seed_photos()
        seed_invoices()


def seed_todo_lists(count=100):
        name = fake.text(max_nb_chars=20)[:20]  # Generate a random name with max 20 characters
        todo_list = TodoList(name=name)
        db.session.add(todo_list)
        db.session.commit()

def seed_users():
    for _ in range(10):
        first_name = fake.first_name()
        last_name = fake.last_name()
        address = fake.street_address()
        city = fake.city()
        state = fake.state()
        phone = fake.phone_number()
        email = fake.email()
        username = fake.user_name()
        password = fake.password(length=10)

        user = User(
            first_name=first_name,
            last_name=last_name,
            address=address,
            city=city,
            state=state,
            phone=phone,
            email=email[:50],
            username=username,
            password=password,
        )

        db.session.add(user)

    db.session.commit()


def seed_projects(count=100):
    for _ in range(count):
        project = Project(title=fake.catch_phrase(), description=fake.text(
        ), start_date=fake.date_time_this_decade(), end_date=fake.future_date())
        db.session.add(project)
    db.session.commit()


def seed_reviews():
    projects = Project.query.all()
    users = User.query.all()

    for _ in range(10):
        project = random.choice(projects)
        user = random.choice(users)
        review = Reviews(project_id=project.id, user_id=user.id, content=fake.paragraph())
        db.session.add(review)

    db.session.commit()



def seed_photos(count=100):
    for _ in range(count):
        project = Project.query.order_by(db.func.random()).first()
        user = User.query.order_by(db.func.random()).first()
        photo = Photos(project_id=project.id, user_id=user.id,
                      file_path=fake.file_path(), caption=fake.sentence())
        db.session.add(photo)
    db.session.commit()


def seed_invoices(count=100):
    for _ in range(count):
        project = Project.query.order_by(db.func.random()).first()
        invoice = Invoice(project_id=project.id, amount=fake.random_int(min=100, max=1000), due_date=fake.future_date(
        ), payment_status=fake.random_element(elements=("Paid", "Pending", "Overdue")))
        db.session.add(invoice)
    db.session.commit()


# Run the seed_data() function to seed the database
seed_data()
print("Database seeded!")
