from flask import Flask
from models import db, User, Contact, Organization

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacthub.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()

    def clear_tables():
        # Clear all records from the tables
        db.session.query(User).delete()
        db.session.query(Organization).delete()
        db.session.query(Contact).delete()

        # Commit the changes to the database
        db.session.commit()

    def seed_data():
        # Clear tables before seeding
        clear_tables()

        # Create sample users
        user1 = User(
            username="john_doe",
            gender="Male",
            phone_number="123456789",
            email="john@example.com",
            password="Password123",
            address="123 Main St"
        )

        user2 = User(
            username="jane_doe",
            gender="Female",
            phone_number="987654321",
            email="jane@example.com",
            password="SecurePasswo1rd",
            address="456 Oak St"
        )

        # Add users to the session
        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()
        # Create sample organizations
        org1 = Organization(
            name="TechCorp",
            email="info@techcorp.com",
            address="789 Tech St"
        )

        org2 = Organization(
            name="Foodies Inc.",
            email="info@foodiesinc.com",
            address="321 Food St"
        )

        # Add organizations to the session
        db.session.add(org1)
        db.session.add(org2)
        db.session.commit()
        # Create sample contacts
        contact1 = Contact(
            profile_notes="Met at a conference",
            user_id=user1.id,
            organization_id=org1.id
        )

        contact2 = Contact(
            profile_notes="Networking event",
            user_id=user2.id,
            organization_id=org2.id
        )

        # Add contacts to the session
        db.session.add(contact1)
        db.session.add(contact2)

        # Commit the changes to the database
        db.session.commit()

    if __name__ == "__main__":
        seed_data()
