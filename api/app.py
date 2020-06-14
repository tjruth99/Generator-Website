from flask import Flask, send_file
from tempfile import NamedTemporaryFile
from shutil import copyfileobj
from os import remove
import io

from Dungeon import generateDungeon
from PerlinNoiseMap import generateNoiseMap
from RandomWalk import generateRandomWalkMap

app = Flask(__name__)
tempFileObj = NamedTemporaryFile(mode='w+b',suffix='png')

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

@app.route('/dungeon', methods=['GET'])
def getDungeonMap():
    img = generateDungeon(5)
    return send_image(img)


def send_image(img):
    file_object = io.BytesIO()
    img.save(file_object, 'PNG')
    file_object.seek(0)
    return send_file(file_object, mimetype="image/PNG")


if __name__ == '__main__':
    app.run()