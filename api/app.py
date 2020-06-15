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


@app.route('/random_walk', methods=['POST'])
def getRandomWalkMap():

    print("request: ", request)
    data = request.get_json()
    print("data: ", data)
    n = data['n']
    steps = data['steps']
    ranges = data['ranges']
    rangeLength = data['rangeLength']
    island = data['island']
    brush = data['brush']
    print(n, steps, ranges, rangeLength, island, brush)

    img = generateRandomWalkMap(n, steps, ranges, rangeLength, island, brush)
    return send_image(img)


@app.route('/perlin_noise', methods=['POST'])
def getPerlinNoiseMap():

    print("request: ", request)
    data = request.get_json()
    print("data: ", data)
    scale = data['scale']
    octaves = data['octaves']
    print("cells: ", scale, "octaves: ", octaves)

    img = generateNoiseMap(scale, octaves)
    return send_image(img)


@app.route('/dungeon', methods=['POST'])
def getDungeonMap():

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
