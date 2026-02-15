from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app) # Enables Cross-Origin Resource Sharing for the SPA

# Retrieves API key from environment variables for security
API_KEY = os.environ.get("OPENWEATHERMAP_API_KEY", "YOUR_OPENWEATHERMAP_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

@app.route('/api/weather', methods=['GET'])
def get_weather_data():
    """RESTful API endpoint to fetch and serve meteorological data."""
    city = request.args.get('city')
    
    if not city:
        return jsonify({"error": "City parameter is required"}), 400
    
    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric" 
    }
    
    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status() 
        return jsonify(response.json())
        
    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": f"HTTP error occurred: {http_err}"}), response.status_code
    except Exception as err:
        return jsonify({"error": f"An error occurred: {err}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)