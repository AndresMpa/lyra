import requests

class FireBase ():
    def __init__(self):
        self.url = "https://lyra-42e75-default-rtdb.firebaseio.com/"

    def Get(self,Filtro = ""):
        try:
            response = requests.get(f"{self.url}/{Filtro}.json")
            if response.status_code == 200:
                data = response.json()
                return data
            else:
                return None
        except Exception as e:
            return (f"Error: {e}")

    def Post(self, data,Filtro = ""):
        try:
            response = requests.post(f"{self.url}/{Filtro}.json", json=data)
            if response.status_code == 200:
                return response.json()
            else:
                return None
        except Exception as e:
            return (f"Error: {e}")

    def Put(self, data,Filtro = ""):
        try:
            response = requests.put(f"{self.url}/{Filtro}.json", json=data)
            if response.status_code == 200:
                return response.json()
            else:
                return None
        except Exception as e:
            return (f"Error: {e}")

    def Delete(self,Filtro = ""):
        try:
            response = requests.delete(f"{self.url}/{Filtro}.json")
            if response.status_code == 200:
                return response.json()
            else:
                return None
        except Exception as e:
            return (f"Error: {e}")

FIREBASE = FireBase()

