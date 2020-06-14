from flask import Flask, send_file, request, jsonify
from flask_cors import CORS
import io

from Dungeon import generateDungeon
from PerlinNoiseMap import generateNoiseMap
from RandomWalk import generateRandomWalkMap

app = Flask(__name__)
CORS(app)


@app.route('/')
def testAlive():
    return "Alive", 201


@app.route('/<name>')
def testName(name):
    return "name: " + name, 201


@app.route('/random_walk', methods=['GET'])
def getRandomWalkMap():
    img = generateRandomWalkMap(250, 50000, 0, 0, 0, 2)
    return send_image(img)


@app.route('/perlin_noise', methods=['GET'])
def getPerlinNoiseMap():
    img = generateNoiseMap(100, 5)
    return send_image(img)


@app.route('/dungeon', methods=['POST'])
def getDungeonMap():
    cells = 5

    print("request: ", request)
    data = request.get_json()
    print("data: ", data)
    cells = data['cells']
    print("cells: ", cells)

    img = generateDungeon(cells)
    return send_image(img)


def send_image(img):
    file_object = io.BytesIO()
    img.save(file_object, 'PNG')
    file_object.seek(0)
    return send_file(file_object, mimetype="image/PNG")


if __name__ == '__main__':
    app.run()
