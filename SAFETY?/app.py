from flask import Flask, request, jsonify, render_template
import json
from werkzeug.formparser import default_stream_factory
from views import views
import os

app = Flask(__name__)
app.register_blueprint(views, url_prefix='/')

json_data = "cards.json"
with open(json_data, 'r') as file:
    data = json.load(file)


@app.route('/get_nodes', methods=['GET'])
def get_nodes():
    # Pre-process data to ensure order
    ordered_nodes = []
    for node in data:
        ordered_node = {}
        for key in node:  # This loop maintains the order from JSON
            ordered_node[key] = node[key]
        ordered_nodes.append(ordered_node)
    return jsonify(ordered_nodes)


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=8001)