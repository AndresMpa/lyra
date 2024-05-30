import requests
import json
from config.env_vars import env_vars

class FireBase:
    def __init__(self, url):
        self.url = url

    def get(self, filtro=""):
        try:
            response = requests.get(f"{self.url}/{filtro}.json")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}

    def post(self, data, filtro=""):
        try:
            response = requests.post(f"{self.url}/{filtro}.json", json=data)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}

    def put(self, data, filtro=""):
        try:
            response = requests.put(f"{self.url}/{filtro}.json", json=data)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}

    def delete(self, filtro=""):
        try:
            response = requests.delete(f"{self.url}/{filtro}.json")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}

# Configuración de la URL de Firebase
firebase_url = env_vars.firebase
FIREBASE = FireBase(firebase_url)

