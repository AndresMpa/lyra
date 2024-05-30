from dotenv import load_dotenv
from types import SimpleNamespace

import os

load_dotenv()

env_vars = SimpleNamespace(
    firebase = os.environ.get("LYRA_FIREBASE_URL"),
    host = os.environ.get("LYRA_HOST_URL", "http://localhost"),
    ngrok_port = os.environ.get("LYRA_NGROK_PORT", "4040"),
    api_port = int(os.environ.get("LYRA_API_PORT", 5000)),
    mode = int(os.environ.get("LYRA_MODE", 1)),
    verbose = os.environ.get("LYRA_DEBUG_MODE", 0) == '1'
)