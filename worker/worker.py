import requests
import time
import logging
import mysql.connector

try:
    connection = mysql.connector.connect(host='localhost',database='coinminer',user=' ', password=' '
    )
    cursor = connection.cursor()
except mysql.connector.Error as error:
    print("Failed to update".format(error))
finally:
    if connection.is_connect():
        connection.close()
        print("Mysql is closed")

        
def get_bitcoin_bytes():
    r = requests.get("http://rng/randomNumber")
    return r.content
   
def hash_bytes(data):
    r = requests.post("http://hasher/", data=data)
    hex_hash = r.text
    return hex_hash

def work_once():
    logging.debug("Doing one unit of work")
    time.sleep(0.1)
    random_bytes = get_bitcoin_bytes()
    hex_hash = hash_bytes(random_bytes)
    if not hex_hash.startswith('0'):
        logging.debug("No coin found")
        return
    logging.info("Coin found: {}...".format(hex_hash[:8]))
    created  = """INSERT INTO MyPortfolio (CoinType,Quantity) Values("Bitcoin", 6)"""
    # created = redis.hset("wallet", hex_hash, random_bytes)
    if not created:
        logging.info("We already had that coin")


if __name__ == "__main__":
    while True:
        try:
            work_once()
        except:
            logging.exception("In work loop:")
            logging.error("Waiting 10s and restarting.")
            time.sleep(10)
