import psycopg2
import itertools
from flask import Flask, render_template, jsonify
from config import username
from config import password

app = Flask(__name__, template_folder="templates")

def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='atl_crime_db',
                            user= username,
                            password=password, 
                            port = '5432')
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM atl_crime2021;')
    atl_crime2021 = cur.fetchall()
    cur.close()
    conn.close()
    return render_template('index.html', atl_crime2021 = atl_crime2021)

@app.route('/crimedata')
def crimedata():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM atl_crime2021;')
    desc = cur.description
    column_names = [col[0] for col in desc] 
    data = [dict(itertools.zip_longest(column_names, row))  
        for row in cur.fetchall()]
    cur.close()
    conn.close()
    return jsonify (data)

if __name__ == "__main__":
    app.run(debug=True)