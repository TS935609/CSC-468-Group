from flask import Flask, Response
import socket
import time
from faker import Faker
from urllib.request import urlopen
app = Flask(__name__)
hostname = socket.gethostname()
fake = Faker()

@app.route('/')
def index():
    return "RNG running on {}\n".format(hostname)

@app.route('/randomNumber')
def number():
    time.sleep(1)
    rng = str(fake.random_int(min=100, max=100000))
    return Response(rng, 
    content_type="application/octet-stream")
if __name__ == '__main__':
    app.run(debug = True, host="0.0.0.0", port=80, threaded=False)
