from flask import Flask,request, jsonify, Response
from flask_cors import CORS
import os
import subprocess

app = Flask(__name__)
CORS(app)

def generate_output(message):
    process = subprocess.Popen(['python', '-u', 'script.py', message],
                               stdout=subprocess.PIPE,
                               stderr=subprocess.STDOUT,
                               bufsize=1,
                               universal_newlines=True)

    for line in iter(process.stdout.readline, ''):
        words = line.split()  # Split the line into words
        for i, word in enumerate(words):
            if i == len(words) - 1:  # Check if it's the last word in the line
                yield f'data: {word}\n\n'  # Add newline at the end of the line
            else:
                yield f'data: {word} '

@app.route('/')
def home():
    return 'Api is Healthy'

# Remove this and move it to nextjs 
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "Please send a POST request with a file", 400
    file = request.files['file']
    if not os.path.exists('./temp'):
        os.makedirs('./temp')
    file.save('./temp/' + file.filename)
    return 'Embeddings made successfully!', 200

@app.route('/run', methods=['POST'])
def test():
    try:
        message = request.json.get('message')
        return Response(generate_output(message), mimetype='text/event-stream')
    except Exception as e:
        return jsonify(str(e))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)