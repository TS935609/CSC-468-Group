from flask import Flask, request
import time
app = Flask(__name__)
import hashlib

@app.route('/')
def hash(data):
    time.sleep(1)
    hashed_rng = hashlib.sha256(data.encode()).hexdigest()
    return hashed_rng


if __name__ == '__main__':
    app.run(debug = True, host="0.0.0.0", port=80, threaded=False)
