from flask import Flask,request, jsonify, Response
from flask_cors import CORS
from agent import MakeEmbeddings
import os
import subprocess

app = Flask(__name__)
CORS(app)

def generate_output(message,id):
    process = subprocess.Popen(['python', '-u', 'script.py', message, id],
                               stdout=subprocess.PIPE,
                               stderr=subprocess.STDOUT,
                               bufsize=1,
                               universal_newlines=True)

    for line in iter(process.stdout.readline, ''):
        words = line.split() 
        for i, word in enumerate(words):
            if i == len(words) - 1:
                yield f'data: {word}\n\n'
            else:
                yield f'data: {word} '

@app.route('/')
def home():
    return 'Api is Healthy'

# In future add id to verify with db session, will do job of auth 
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "Please send a POST request with a file", 400
    
    groupId = request.form.get('id')

    if groupId is None:
        return "Don't call api directly", 400

    file = request.files['file']

    if not os.path.exists('./temp'):
        os.mkdir('temp')

    folder_path = os.path.join('temp', str(groupId))
    if not os.path.exists(folder_path):
        os.mkdir(folder_path)

    file.save(os.path.join(folder_path, file.filename))

    # MakeEmbeddings(groupId)
    return 'Embeddings made and saved successfully!', 200

@app.route('/run', methods=['POST'])
def test():
    try:
        message = request.json.get('message')
        groupId = request.json.get('id')
        return Response(generate_output(message,groupId), mimetype='text/event-stream')
    except Exception as e:
        return jsonify(str(e))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)