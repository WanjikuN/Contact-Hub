from flask import Flask, request, jsonify, session
from models import db, User, Contact, Organization
from flask_migrate import Migrate
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)

app.secret_key = "qwertyyuiop"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
    app.instance_path, "contacthub.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
migrate = Migrate(app, db)

# Bcrypt = Bcrypt(app)
db.init_app(app)


@app.route("/signup", methods=["POST"])
def signup():
    name = request.json.get("name")
    email = request.json.get("email")
    password = request.json.get("password")
    gender = request.json.get("gender")
    phone_number = request.json.get("phone_number")
    address = request.json.get("address")

    if name and email and password:
        new_user = User(
            username=name,
            email=email,
            gender=gender,
            phone_number=phone_number,
            address=address,
        )
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id

        return jsonify(new_user.to_dict()), 201
    return (
        jsonify({"error": "User details (name, email, and password) must be provided"}),
        422,
    )


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if email and password:
        user = User.query.filter(User.email == email).first()
        if user and user.check_password(password):
            session["user_id"] = user.id
            return jsonify(user.to_dict()), 200
    return jsonify({"error": "Email or password is incorrect"}), 401


#####


# creating new user
@app.route("/user", methods=["POST"])
def create_user():
    data = request.json
    new_user = User(
        username=data["username"],
        gender=data["gender"],
        phone_number=data["phone_number"],
        email=data["email"],
        password=data["password"],
        address=data["address"],
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


# Get all users
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    serialized_users = [user.to_dict(rules=("-contact.user",)) for user in users]
    return jsonify(serialized_users), 200


# Create a new organization
@app.route("/organization", methods=["POST"])
def create_organization():
    data = request.json
    new_organization = Organization(
        name=data["name"], email=data["email"], address=data["address"]
    )

    db.session.add(new_organization)
    db.session.commit()

    return jsonify({"message": "Organization created successfully"}), 201


# Get all organizations
@app.route("/organizations", methods=["GET"])
def get_organizations():
    organizations = Organization.query.all()
    serialized_organizations = [
        org.to_dict(rules=("contact.organization",)) for org in organizations
    ]
    return jsonify(serialized_organizations), 200


# Get a specific organization by its id
@app.route("/organizations/<int:id>", methods=["GET"])
def get_organizations_by_id(id):
    organizations = Organization.query.get(id).to_dict()

    return jsonify(organizations), 200


# Create a new contact
@app.route("/contact", methods=["POST"])
def create_contact():
    data = request.json
    new_contact = Contact(
        profile_notes=data["profile_notes"],
        user_id=data["user_id"],
        organization_id=data["organization_id"],
    )

    db.session.add(new_contact)
    db.session.commit()

    return jsonify({"message": "Contact created successfully"}), 201


# Get all contacts
@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    serialized_contacts = [
        contact.to_dict(
            rules=(
                "-user.contact",
                "-organization.contact",
            )
        )
        for contact in contacts
    ]
    return jsonify(serialized_contacts), 200


# Delete user
@app.route("/user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 200
    else:
        return jsonify({"message": "User not found"}), 404


if __name__ == "__main__":
    app.run(port=5555, debug=True)
