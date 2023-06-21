from flask import request, jsonify, make_response, session
from flask_restful import Resource
from datetime import datetime
from config import app, db, api, bcrypt
from models import User



# Instantiate Flask app



todos = []
todo_id_counter = 1
# Set secret key


# Configure app




# Instantiate REST API


class UserList(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)
    
api.add_resource(UserList, '/users')
    
class UserListById(Resource):
    def get(self, id):
        user = User.query.get(id)
        if not user:
            return make_response({"error": "404: User not found."}, 404)
        return make_response(jsonify(user.to_dict()), 200)
    
api.add_resource(UserListById, '/api/users/<int:id>')

class Signup(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        password = data.get('password')

        user = User(username=data.get('username'), password=password, email=data.get('email'))

        db.session.add(user)
        db.session.commit()

        session['user_id'] = user.id

        return make_response(jsonify({'message': 'User created successfully'}), 201)

api.add_resource(Signup, '/api/dashboard/signup')


@app.route('/api/dashboard/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'Invalid request data'}), 400)

    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not user.authenticate(password):
        return make_response(jsonify({'error': 'Invalid email or password'}), 401)

    session['user_id'] = user.id

    return make_response(jsonify({'message': 'Logged in successfully', 'user_id': user.id}), 200)

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)  # Remove user ID from the session
    return make_response(jsonify({'message': 'Logged out successfully'}), 200)



@app.route("/api/todos", methods=["GET"])

def get_all_todo_items():
    return jsonify(todos)


@app.route("/api/todos/<int:todo_id>", methods=["GET"])
def get_todo_item(todo_id):
    todo = next((todo for todo in todos if todo["id"] == todo_id), None)
    if todo:
        return jsonify(todo)
    return jsonify({"error": "Todo item not found"}), 404


@app.route("/api/todos", methods=["POST"])
def create_todo_item():
    data = request.get_json()
    title = data.get("title")
    if not title:
        return jsonify({"error": "Title is required"}), 400

    global todo_id_counter
    todo = {
        "id": todo_id_counter,
        "title": title,
        "completed": False
    }
    todos.append(todo)
    todo_id_counter += 1
    return jsonify(todo), 201


@app.route("/api/todos/<int:todo_id>", methods=["PATCH"])
def update_todo_item(todo_id):
    data = request.get_json()
    title = data.get("title")
    completed = data.get("completed")

    todo = next((todo for todo in todos if todo["id"] == todo_id), None)
    if todo:
        if title is not None:
            todo["title"] = title
        if completed is not None:
            todo["completed"] = completed
        return jsonify(todo)
    return jsonify({"error": "Todo item not found"}), 404


@app.route("/api/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo_item(todo_id):
    global todos
    todos = [todo for todo in todos if todo["id"] != todo_id]
    return jsonify({"message": "Todo item deleted"})


@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return jsonify({"status": "success", "message": "Integrate Flask Framework with Next.js"})


if __name__ == "__main__":
    app.run()
