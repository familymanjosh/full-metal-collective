from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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


@app.route("/api/healthchecker", methods=["GET"])
def healthchecker():
    return jsonify({"status": "success", "message": "Integrate Flask Framework with Next.js"})


if __name__ == "__main__":
    app.run()
