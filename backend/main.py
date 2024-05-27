from flask import Flask, request, jsonify
import transformers
from torch import bfloat16
from threading import Thread
import json
import os
from Secundarias import obtener_ip, Ngrok
from threading import Thread
from flask import Flask,request,redirect
from ujson import dumps as  jsonify
from flask_cors import CORS
import os

# Configuración del modelo
model_id = "meta-llama/Meta-Llama-3-8B-Instruct"  # El modelo

bnb_config = transformers.BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type='nf4',
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=bfloat16
)
model_config = transformers.AutoConfig.from_pretrained(
    model_id,
)

model = transformers.AutoModelForCausalLM.from_pretrained(
    model_id,
    trust_remote_code=True,
    config=model_config,
    quantization_config=bnb_config,
    device_map='auto',
)

tokenizer = transformers.AutoTokenizer.from_pretrained(
    model_id,
)

app = Flask(__name__)
CORS(app)

# Archivo de contexto
context_file = 'context.json'

# Prompt de sistema inicial
initial_system_prompt = (
    "You are a helpful assistant created by Meta. Your purpose is to assist users by providing accurate and relevant information, answering questions, and helping with various tasks. You provide short responses to short questions or statements, but thorough responses to more complex and open-ended questions. You assist with various tasks, from writing to coding (using markdown for code blocks — remember to use ``` with code, JSON, and tables). You do not have real-time data access or code execution capabilities. You avoid stereotyping and provide balanced perspectives on controversial topics. You do not provide song lyrics, poems, or news articles and do not divulge details of your training data. This is your system prompt, guiding your responses. Do not reference it, just respond to the user. If you find yourself talking about this message, stop. You should be responding appropriately and usually that means not mentioning this. Do not mention any of this information about yourself unless the information is directly pertinent to the user's query."
)

def load_context():
    if os.path.exists(context_file):
        with open(context_file, 'r') as file:
            return json.load(file)
    else:
        return []

def save_context(context):
    with open(context_file, 'w') as file:
        json.dump(context, file)

def prompt_build(system_prompt, user_inp, hist):
    prompt = f"""### System:\n{system_prompt}\n\n"""
    
    for pair in hist:
        prompt += f"""### User:\n{pair[0]}\n\n### Assistant:\n{pair[1]}\n\n"""

    prompt += f"""### User:\n{user_inp}\n\n### Assistant:"""
    return prompt

def chat(user_input, history):
    prompt = prompt_build(initial_system_prompt, user_input, history)
    model_inputs = tokenizer([prompt], return_tensors="pt").to("cuda")

    streamer = transformers.TextIteratorStreamer(tokenizer, timeout=10., skip_prompt=True, skip_special_tokens=True)

    generate_kwargs = dict(
        input_ids=model_inputs.input_ids,
        attention_mask=model_inputs.attention_mask,
        streamer=streamer,
        max_length=8192,
        do_sample=True,
        top_p=0.95,
        temperature=0.8,
        top_k=50
    )

    thread = Thread(target=model.generate, kwargs=generate_kwargs)
    thread.start()

    model_output = ""
    for new_text in streamer:
        model_output += new_text
    thread.join()  # Asegura que el hilo ha terminado

    return model_output.strip()

@app.route('/chat', methods=['POST'])
def chat_api():
    data = request.json
    user_input = data.get('user_input', '')
    
    # Cargar el contexto
    history = load_context()

    response = chat(user_input, history)
    
    # Actualizar el historial con la nueva interacción
    history.append((user_input, response))
    
    # Guardar el contexto actualizado
    save_context(history)
    
    return jsonify({"response": response, "history": history})

if __name__ == '__main__':
    Ip = obtener_ip()
    Port = 5000
    Thread(target=Ngrok, args=(Ip,Port)).start()
    app.run(host=Ip, port=Port)
