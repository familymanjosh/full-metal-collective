from faker import Faker
from models import  User
from config import db, bcrypt, app

fake = Faker()

# Configure app



with app.app_context():
    db.create_all()

    # Seed Users
    for _ in range(10):
        username = fake.user_name()
        email = fake.email()
        password = fake.password()
        
        user = User(username=username, email=email)
        user.password = password
        db.session.add(user)

    db.session.commit()

print("Seed completed successfully.")
