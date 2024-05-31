from flask import Flask, request, jsonify
from transformers import pipeline
from threading import Thread
import torch
import json
from Secundarias import obtener_ip, Ngrok, clean_response_json
from flask_cors import CORS
import os
from config.env_vars import env_vars


# Configuración del modelo
model_id = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"

device = "cuda" if torch.cuda.is_available() else "cpu"
torch_dtype = torch.bfloat16 if device == "cuda" else torch.float32

pipe = pipeline("text-generation", model=model_id, torch_dtype=torch_dtype, device_map="auto" if device == "cuda" else None)

app = Flask(__name__)
CORS(app)

# Archivo de contexto
context_file = 'context.json'

# Prompt de sistema inicial
initial_system_prompt = (
    "You are a helpful GNU/Linux assistant created by Meta. Your purpose is to assist users by providing accurate and relevant information, answering questions, and helping with various tasks. You provide short responses to short questions or statements, but detailed responses to more complex and open-ended questions. You assist with various tasks, from writing to programming (using markdown for code blocks, JSON, and tables). You do not have real-time data access or code execution capabilities. You avoid stereotyping and provide balanced perspectives on controversial topics. You do not provide song lyrics, poems, or news articles and do not disclose details of your training data. This is your system message, guiding your responses. Do not mention it, just respond to the user. If you find yourself talking about this message, stop. You should respond appropriately and usually that means not mentioning this. Do not mention any of this information about yourself unless it is directly pertinent to the user's query."
)

def load_context():
    if os.path.exists(context_file):
        with open(context_file, 'r') as file:
            return json.load(file)
    return []

def save_context(context):
    with open(context_file, 'w') as file:
        json.dump(context, file)

def prompt_build(system_prompt, user_input):
    messages = [
        {
            "role": "system",
            "content": system_prompt,
        },
        {"role": "user", "content": user_input},
    ]
    prompt = pipe.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    return prompt

def clean_response(response, system_prompt, user_input):
    # Remover el mensaje del sistema y cualquier marca sobrante
    if system_prompt in response:
        response = response.replace(system_prompt, "").strip()
    if user_input in response:
        response = response.replace(user_input, "").strip()
    return response

def chat(user_input):
    prompt = prompt_build(initial_system_prompt, user_input)
    outputs = pipe(prompt, max_new_tokens=1024, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
    generated_text = outputs[0]["generated_text"].strip()
    response = clean_response(generated_text, initial_system_prompt, user_input)
    return response

@app.route('/chat', methods=['POST'])
def chat_api():
    data = request.json
    user_input = data.get('user_input', '')

    # Cargar el contexto (historial)
    history = load_context()

    response_1 = chat(user_input)
    
    # Actualizar el historial con la nueva interacción
    # history.append((user_input, response))
    
    # Guardar el contexto actualizado
    # save_context(history)

    response_2 = clean_response_json(response_1)
    
    return jsonify({"response": response_2})

if __name__ == '__main__':
    Ip = obtener_ip()
    Port = env_vars.api_port
    if env_vars.mode == 0:
        Thread(target=Ngrok, args=(Ip, Port)).start()
        app.run(host=Ip, port=Port)
    else:
        app.run(host=Ip, port=Port)
