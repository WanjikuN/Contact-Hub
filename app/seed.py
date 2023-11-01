from flask import Flask
from models import db, User, Contact, Organization
from faker import Faker

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacthub.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

fake = Faker()

with app.app_context():
    db.create_all()

    def clear_tables():
        # Clear all records from the tables
        db.session.query(User).delete()
        db.session.query(Organization).delete()
        db.session.query(Contact).delete()

        # Commit the changes to the database
        db.session.commit()

    def generate_valid_phone_number():
        phone_number = fake.random_int(min=100000000, max=999999999)
        return str(phone_number)

    def seed_data():
        # Clear tables before seeding
        clear_tables()

        # Create sample users
        for _ in range(20):  # Change 2 to the number of initial users you want
            user = User(
                username=fake.user_name(),
                gender=fake.random_element(elements=('Male', 'Female')),
                phone_number=generate_valid_phone_number(),
                email=fake.email(),
                password=fake.password(),
                address=fake.address()
            )
            db.session.add(user)

        db.session.commit()

        # Create sample organizations
        for _ in range(20):  # Change 2 to the number of initial organizations you want
            org = Organization(
                name=fake.company(),
                email=fake.company_email(),
                address=fake.address()
            )
            db.session.add(org)

        db.session.commit()

        # Create sample contacts
        for _ in range(20):  # Change 2 to the number of initial contacts you want
            contact = Contact(
                profile_notes=fake.sentence(),
                user_id=fake.random_element(elements=User.query.with_entities(User.id).all())[0],
                organization_id=fake.random_element(elements=Organization.query.with_entities(Organization.id).all())[0]
            )
            db.session.add(contact)

        # Commit the changes to the database
        db.session.commit()

    if __name__ == "__main__":
        seed_data()
