import subprocess
import socket
import webbrowser
from threading import Thread
from LlamadosExternos.FireBase import FIREBASE
import json
import re

from config.env_vars import env_vars

def start_ngrok(Ip, port):
    command = f"ngrok http {Ip}:{port}"
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return process

def get_ngrok_url():
    result = subprocess.run(["curl", "-s", f"{env_vars.host}:{env_vars.ngrok_port}/api/tunnels"], capture_output=True, text=True)
    if result.returncode == 0:
        tunnels = json.loads(result.stdout)
        if tunnels['tunnels']:
            return tunnels['tunnels'][0]['public_url']
    return None

def SendNgrokUrl(url):
    try:
        FIREBASE.put(url, "data")
        webbrowser.open(url)
    except Exception as e:
        print("Error al enviar la URL de Ngrok:", e)

def Ngrok(ip, port):
    try:
        process = start_ngrok(ip, port)
        Thread(target=monitor_ngrok, args=(process,)).start()
    except Exception as e:
        print("Error al iniciar Ngrok:", e)

def monitor_ngrok(process):
    try:
        while True:
            url = get_ngrok_url()
            if url:
                SendNgrokUrl(url)
                break
    except Exception as e:
        print("Error al monitorear Ngrok:", e)

def obtener_ip():
    try:
        hostname = socket.gethostname()
        ip = socket.gethostbyname(hostname)
        return ip
    except Exception as e:
        print("Error al obtener la dirección IP:", e)
        return None
    
def clean_response_json(response_json):

    data = response_json.replace('<|system|>\n</s>\n<|user|>\n</s>\n<|assistant|>\n', '')
    
    return data
