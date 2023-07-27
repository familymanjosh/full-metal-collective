from flask import Flask, request, jsonify, make_response, session, Response, render_template, send_from_directory
from flask_restful import Resource
from datetime import datetime
from config import db, api, bcrypt, app
from models import User, Project, Reviews, Photos, Invoice, Notes
from werkzeug.utils import secure_filename;

# Instantiate REST API

@app.route('/api/auth', methods=['GET'])
def auth():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        return make_response(jsonify(user.to_dict()), 200)
    else:
        return make_response(jsonify({'error': 'User not logged in'}), 400)


@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.all()
        return make_response(jsonify([user.to_dict() for user in users]), 200)
    elif request.method == 'POST':
        data = request.get_json()

        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        email = data.get('email')
        username = data.get('username')
        password = data.get('password')
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        phone = data.get('phone')
        address = data.get('address')
        city = data.get('city')
        state = data.get('state')
        user = User(email=email, username=username, password=password, first_name=first_name, last_name=last_name,
        phone=phone, address=address, city=city, state=state)
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return make_response(jsonify(user.to_dict()), 201)


@app.route('/api/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def user(id):
    user = User.query.get(id)
    if not user:
        return make_response(jsonify({'error': 'User not found'}), 404)
    if request.method == 'GET':
        return make_response(jsonify(user.to_dict()), 200)
    elif request.method == 'PUT':
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')
        if not email or not username or not password:
            return make_response(jsonify({'error': 'Missing required parameters'}), 400)
        user.email = email
        user.username = username
        user.password = password
        db.session.commit()
        return make_response(jsonify(user.to_dict()), 200)
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return make_response(jsonify({'message': 'User deleted successfully'}), 200)



@app.route('/api/login', methods=['POST'])
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


todos = []
todo_id_counter = 1


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


# Project routes

@app.route('/api/projects', methods=['GET', 'POST'])
def projects():
    if request.method == 'GET':
        projects = Project.query.all()
        project_list = [{'id': project.id, 'title': project.title,
                         'description': project.description} for project in projects]
        return jsonify(project_list)
    elif request.method == 'POST':
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        title = data.get('title')
        description = data.get('description')

        project = Project(title=title, description=description)
        db.session.add(project)
        db.session.commit()

        return make_response(jsonify(project.to_dict()), 201)


@app.route('/api/projects/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def project(id):
    project = Project.query.get(id)
    if not project:
        return make_response(jsonify({'error': 'Project not found'}), 404)

    if request.method == 'GET':
        return make_response(jsonify(project.to_dict()), 200)
    elif request.method == 'PUT':
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        title = data.get('title')
        description = data.get('description')

        if not title or not description:
            return make_response(jsonify({'error': 'Missing required parameters'}), 400)

        project.title = title
        project.description = description
        db.session.commit()

        return make_response(jsonify(project.to_dict()), 200)
    elif request.method == 'DELETE':
        db.session.delete(project)
        db.session.commit()
        return make_response(jsonify({'message': 'Project deleted successfully'}), 200)


# Tag routes


# Associate users with projects


@app.route('/api/users/<int:user_id>/projects/<int:project_id>', methods=['PUT', 'DELETE'])
def associate_user_project(user_id, project_id):
    user = User.query.get(user_id)
    project = Project.query.get(project_id)
    if not user or not project:
        return make_response(jsonify({'error': 'User or project not found'}), 404)

    if request.method == 'PUT':
        user_project = user_project(user_id=user.id, project_id=project.id)
        db.session.add(user_project)
        db.session.commit()
        return make_response(jsonify({'message': 'User associated with project'}), 200)
    elif request.method == 'DELETE':
        user_project = user_project.query.filter_by(
            user_id=user.id, project_id=project.id).first()
        if not user_project:
            return make_response(jsonify({'error': 'User not associated with project'}), 404)

        db.session.delete(user_project)
        db.session.commit()
        return make_response(jsonify({'message': 'User disassociated from project'}), 200)


@app.route('/api/notes', methods=['GET'])
def notes():
    if request.method == 'GET':
        notes = Notes.query.all()
        note_list = [{'id': note.id, 'title': note.title,
                     'content': note.content} for note in notes]
        return jsonify(note_list)
    
@app.route('/api/notes/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def note():
    note = Notes.query.get(id)
    if not note:
        return make_response(jsonify({'error': 'Note not found'}), 404)

    if request.method == 'GET':
        return make_response(jsonify(note.to_dict()), 200)
    elif request.method == 'PUT':
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        title = data.get('title')
        content = data.get('content')

        if not title or not content:
            return make_response(jsonify({'error': 'Missing required parameters'}), 400)

        note.title = title
        note.content = content
        db.session.commit()

        return make_response(jsonify(note.to_dict()), 200)
    elif request.method == 'DELETE':
        db.session.delete(note)
        db.session.commit()
        return make_response(jsonify({'message': 'Note deleted successfully'}), 200)

@app.route('/api/notes', methods=['POST'])
def create_note():
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'Invalid request data'}), 400)

    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return make_response(jsonify({'error': 'Missing required parameters'}), 400)

    note = Notes(title=title, content=content)
    db.session.add(note)
    db.session.commit()

    return make_response(jsonify(note.to_dict()), 201)

@app.route('/api/invoices' , methods=['GET'])  
def invoices():
    if request.method == 'GET':
        invoices = Invoice.query.all()
        invoice_list = [{'id': invoice.id, 'title': invoice.title,
                     'content': invoice.content} for invoice in invoices]
        return jsonify(invoice_list)
    
@app.route('/api/invoices/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def invoice():
    invoice = Invoice.query.get(id)
    if not invoice:
        return make_response(jsonify({'error': 'Invoice not found'}), 404)

    if request.method == 'GET':
        return make_response(jsonify(invoice.to_dict()), 200)
    elif request.method == 'PUT':
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        title = data.get('title')
        content = data.get('content')

        if not title or not content:
            return make_response(jsonify({'error': 'Missing required parameters'}), 400)

        invoice.title = title
        invoice.content = content
        db.session.commit()

        return make_response(jsonify(invoice.to_dict()), 200)
    elif request.method == 'DELETE':
        db.session.delete(invoice)
        db.session.commit()
        return make_response(jsonify({'message': 'Invoice deleted successfully'}), 200)
    
@app.route('/api/invoices', methods=['POST'])
def create_invoice():
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'Invalid request data'}), 400)

    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return make_response(jsonify({'error': 'Missing required parameters'}), 400)

    invoice = Invoice(title=title, content=content)
    db.session.add(invoice)
    db.session.commit()

    return make_response(jsonify(invoice.to_dict()), 201)

@app.route('/api/photos' , methods=['GET'])
def photos():
    if request.method == 'GET':
        photos = Photos.query.all()
        photo_list = [{'id': photo.id, 'title': photo.title,
                     'content': photo.content} for photo in photos]
        return jsonify(photo_list)
    
@app.route('/api/photos/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def photo():
    photo = Photos.query.get(id)
    if not photo:
        return make_response(jsonify({'error': 'Photo not found'}), 404)

    if request.method == 'GET':
        return make_response(jsonify(photo.to_dict()), 200)
    elif request.method == 'PUT':
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        title = data.get('title')
        content = data.get('content')

        if not title or not content:
            return make_response(jsonify({'error': 'Missing required parameters'}), 400)

        photo.title = title
        photo.content = content
        db.session.commit()

        return make_response(jsonify(photo.to_dict()), 200)
    elif request.method == 'DELETE':
        db.session.delete(photo)
        db.session.commit()
        return make_response(jsonify({'message': 'Photo deleted successfully'}), 200)
    
@app.route('/api/photos', methods=['POST'])
def create_photo():
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'Invalid request data'}), 400)

    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return make_response(jsonify({'error': 'Missing required parameters'}), 400)

    photo = Photos(title=title, content=content)
    db.session.add(photo)
    db.session.commit()

    return make_response(jsonify(photo.to_dict()), 201)

@app.route('/api/reviews' , methods=['GET'])
def reviews():
    if request.method == 'GET':
        reviews = Reviews.query.all()
        review_list = [{'id': review.id, 'title': review.title,
                     'content': review.content} for review in reviews]
        return jsonify(review_list)
    
@app.route('/api/reviews/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def review():
    review = Reviews.query.get(id)
    if not review:
        return make_response(jsonify({'error': 'Review not found'}), 404)

    if request.method == 'GET':
        return make_response(jsonify(review.to_dict()), 200)
    elif request.method == 'PUT':
        data = request.get_json()
        if not data:
            return make_response(jsonify({'error': 'Invalid request data'}), 400)

        title = data.get('title')
        content = data.get('content')

        if not title or not content:
            return make_response(jsonify({'error': 'Missing required parameters'}), 400)

        review.title = title
        review.content = content
        db.session.commit()

        return make_response(jsonify(review.to_dict()), 200)
    elif request.method == 'DELETE':
        db.session.delete(review)
        db.session.commit()
        return make_response(jsonify({'message': 'Review deleted successfully'}), 200)
    
@app.route('/api/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    if not data:
        return make_response(jsonify({'error': 'Invalid request data'}), 400)

    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return make_response(jsonify({'error': 'Missing required parameters'}), 400)

    review = Reviews(title=title, content=content)
    db.session.add(review)
    db.session.commit()

    return make_response(jsonify(review.to_dict()), 201)



if __name__ == "__main__":
    app.run(debug=True)
