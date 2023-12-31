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
        users = []
        for _ in range(20):
            user = User(
                username=fake.user_name(),
                gender=fake.random_element(elements=('Male', 'Female')),
                phone_number=generate_valid_phone_number(),
                email=fake.email(),
                password=fake.password(),
                address=fake.address()
            )
            users.append(user)

        db.session.add_all(users)
        db.session.commit()

        # Create sample organizations
        organizations = []
        for _ in range(5):  # Adjust the number of organizations as needed
            org = Organization(
                name=fake.company(),
                email=fake.company_email(),
                address=fake.address()
            )
            organizations.append(org)

        db.session.add_all(organizations)
        db.session.commit()

        # Assign users to organizations
        for user in users:
            user.organization_id = fake.random_element(elements=organizations).id

        # Commit the changes to the database
        db.session.commit()

        # Create sample contacts
        contacts = []
        for _ in range(20):
            contact = Contact(
                profile_notes=fake.sentence(),
                user_id=fake.random_element(elements=User.query.with_entities(User.id).all())[0],
                organization_id=fake.random_element(elements=Organization.query.with_entities(Organization.id).all())[0]
            )
            contacts.append(contact)

        db.session.add_all(contacts)
        db.session.commit()


    if __name__ == "__main__":
        seed_data()
