from flask import Flask, request, jsonify
from werkzeug.formparser import default_stream_factory
import json
from views import views


app = Flask(__name__)
app.register_blueprint(views,url_prefix= '/')




json_file_path = '/home/Palagio/mysite/info_store.json'

# Function to save data to JSON file
def save_to_json(data):
    with open(json_file_path, 'w') as f:
        json.dump(data, f)

# Function to load data from JSON file
def load_from_json():
    try:
        with open(json_file_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}  # Return empty dict if file doesn't exist yet

@app.route('/update_info', methods=['POST'])
def update_info():
    new_info = request.json.get('info')
    # Store the new info in the JSON file
    save_to_json({'data': new_info})
    return jsonify({"status": "success", "message": "Info updated"}), 200

@app.route('/get_info', methods=['GET'])
def get_info():
    # Load the info from the JSON file
    data = load_from_json()
    return jsonify({"info": data.get('data')}), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True,  port=8000)
