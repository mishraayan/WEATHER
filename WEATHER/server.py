from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/fetch_weather', methods=['POST'])
def fetch_weather():
    city = request.form['city']
    api_key = "put your openweathermap api here"
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"

    try:
        response = requests.get(url)
        data = response.json()
        if data.get('cod') == 200:
            weather_info = {
                'description': data['weather'][0]['description'],
                'temperature': data['main']['temp'],
                'humidity': data['main']['humidity'],
                'wind_speed': data['wind']['speed']
            }
            return jsonify(weather_info)
        else:
            return jsonify({'error': 'City not found. Please enter a valid city name.'}), 404
    except Exception as e:
        return jsonify({'error': 'Failed to fetch data. Please check your internet connection.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
