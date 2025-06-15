from flask import Flask, request, jsonify
import psycopg2
import requests

app = Flask(__name__)

# Подключение к PostgreSQL
def get_db():
    conn = psycopg2.connect(
        host="db",
        database="postgres",
        user="postgres",
        password="postgres",
        port="5432"
    )
    return conn

# Получить случайного котика
@app.route('/api/random-cat')
def random_cat():
    response = requests.get('https://api.thecatapi.com/v1/images/search')
    return jsonify(response.json()[0])

# Сохранить мем
@app.route('/api/memes', methods=['POST'])
def save_meme():
    data = request.json
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO memes (image_url, text) VALUES (%s, %s)",
        (data['image_url'], data['text'])
    )
    conn.commit()
    return jsonify({"status": "ok"})

# Получить все мемы
@app.route('/api/memes')
def get_memes():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM memes")
    memes = cur.fetchall()
    return jsonify(memes)