from flask import Flask, request, jsonify
from models import db, User, Contact, Organization
from flask_migrate import Migrate

app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contacthub.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
migrate = Migrate(app, db)
db.init_app(app)

with app.app_context():
    db.create_all()


#creating new user
@app.route("/user", methods=["POST"])
def create_user():
    data = request.json
    new_user = User(
        username=data['username'],
        gender=data['gender'],
        phone_number=data['phone_number'],
        email=data['email'],
        password=data['password'],
        address=data['address']
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    serialized_users = [user.to_dict(rules=('-contact.user',)) for user in users]
    return jsonify(serialized_users), 200


# Create a new organization
@app.route('/organization', methods=['POST'])
def create_organization():
    data = request.json
    new_organization = Organization(
        name=data['name'],
        email=data['email'],
        address=data['address']
    )

    db.session.add(new_organization)
    db.session.commit()

    return jsonify({'message': 'Organization created successfully'}), 201

# Get all organizations
@app.route('/organizations', methods=['GET'])
def get_organizations():
    organizations = Organization.query.all()
    serialized_organizations = [org.to_dict(rules=('contact.organization',)) for org in organizations]
    return jsonify(serialized_organizations), 200

# Create a new contact
@app.route('/contact', methods=['POST'])
def create_contact():
    data = request.json
    new_contact = Contact(
        profile_notes=data['profile_notes'],
        user_id=data['user_id'],
        organization_id=data['organization_id']
    )

    db.session.add(new_contact)
    db.session.commit()

    return jsonify({'message': 'Contact created successfully'}), 201

# Get all contacts
@app.route('/contacts', methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    serialized_contacts = [contact.to_dict(rules=('-user.contact', '-organization.contact',)) for contact in contacts]
    return jsonify(serialized_contacts), 200

#Delete user
@app.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404



if __name__ == "__main__":
    app.run(port=5555, debug=True)



