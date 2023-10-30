#!/usr/bin/env python3
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules =('-contact.user',)
    
    # Columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    gender = db.Column(db.String)
    phone_number = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    address = db.Column(db.String)
    
    # relationship
    contact = db.relationship('Contact', backref='user')
    
    # validation
    @validates('email')
    def validate_email(self, key, email):
        assert '@' in email, 'Invalid email address'
        return email
    
    @validates('phone_number')
    def validate_phone_number(self, key, phone_number):
        assert phone_number.isdigit() and len(phone_number) >= 9, 'Invalid phone number'
        return phone_number

    @validates('password')
    def validate_password(self, key, password):
        # At least 8 characters, one uppercase letter, one lowercase letter, and one digit
        assert len(password) >= 8, 'Password must be at least 8 characters long'
        assert any(char.isupper() for char in password), 'Password must contain at least one uppercase letter'
        assert any(char.islower() for char in password), 'Password must contain at least one lowercase letter'
        assert any(char.isdigit() for char in password), 'Password must contain at least one digit'
        return password
    
class Organization(db.Model, SerializerMixin):
    __tablename__ = 'organizations'

    serialize_rules = ('-contact.organization',)
    
    # Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    address = db.Column(db.String)
    
    # relationship
    contact = db.relationship('Contact', backref='organization')
    
    # validation
    @validates('email')
    def validate_email(self, key, email):
        assert '@' in email, 'Invalid email address'
        return email
    
class Contact(db.Model, SerializerMixin):
    __tablename__ = 'contacts'

    serialize_rules = ('-user.contact','-organization.contact',)
    
    # Columns
    id=db.Column(db.Integer, primary_key=True)
    profile_notes = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    organization_id = db.Column(db.Integer, db.ForeignKey("organization.id"))
