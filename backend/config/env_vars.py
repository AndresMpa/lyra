from types import SimpleNamespace

import json
import os

# Definir la ruta del archivo de configuración
config_path = os.path.expanduser('~/.config/lyra/config.json')

# Leer el archivo de configuración
def load_config(config_path):
    if os.path.exists(config_path):
        with open(config_path, 'r') as config_file:
            return json.load(config_file)
    else:
        raise FileNotFoundError(f"No se encontró el archivo de configuración en {config_path}")

# Cargar configuraciones desde el archivo de configuración
config = load_config(config_path)

env_vars = SimpleNamespace(
    firebase = config['firebase'],
    host = config['host'],
    ngrok_port = config['ngrokPort'],
    api_port = config['apiPort'],
    mode = config['mode'],
    verbose = config['verbose'] == '1'
)