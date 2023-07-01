"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def create_user():
    print(request.json)
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None or  password is None: 
        return jsonify({"msg": "No enough data"}), 400

    else:
        try: 
            user=User(email=email, password=password)
            db.session.add(user)
            db.session.commit()
            return jsonify({"msg": "User created"}), 200
            
        except Exception as error:
            return jsonify({"msg": f"{error.args[0]}"}), 400

@api.route('/user', methods=['GET'])
@jwt_required()
def search_user():
    get_user = User.query.get(get_jwt_identity())
    return jsonify(get_user.serialize())