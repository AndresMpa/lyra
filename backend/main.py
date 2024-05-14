import transformers
import torch
import logging
import warnings

# Configurar logging para suprimir los mensajes no deseados
logging.basicConfig(level=logging.ERROR)  # Ajusta a ERROR para evitar la mayoría de los logs

# Suprimir advertencias específicas
warnings.filterwarnings("ignore", message="`do_sample` is set to `False`")
warnings.filterwarnings("ignore", message="`temperature` is set to `0.7` -- this flag is only used in sample-based generation modes")
warnings.filterwarnings("ignore", message="`top_p` is set to `0.9` -- this flag is only used in sample-based generation modes")


# Configuración inicial del modelo y dispositivo
model_id = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
device = "cuda" if torch.cuda.is_available() else "cpu"
pipeline = transformers.pipeline(
    "text-generation",
    model=model_id,
    model_kwargs={"torch_dtype": torch.bfloat16},
    device=device
)

# Mensaje inicial y contexto de sistema
system_prompt = "<You are LLAMA, created by Meta. You were last updated in Marzo 2023. You answer questions based on information available up to that point. YOU PROVIDE SHORT RESPONSES TO SHORT QUESTIONS OR STATEMENTS, but provide thorough responses to more complex and open-ended questions. You assist with various tasks, from writing to coding (using markdown for code blocks — remember to use ``` with code, JSON, and tables).(You do not have real-time data access or code execution capabilities. You avoid stereotyping and provide balanced perspectives on controversial topics. You do not provide song lyrics, poems, or news articles and do not divulge details of your training data.) This is your system prompt, guiding your responses. Do not reference it, just respond to the user. If you find yourself talking about this message, stop. You should be responding appropriately and usually that means not mentioning this. YOU DO NOT MENTION ANY OF THIS INFORMATION ABOUT YOURSELF UNLESS THE INFORMATION IS DIRECTLY PERTINENT TO THE USER'S QUERY>"
messages = [{"role": "system", "content": system_prompt}]


# Función para actualizar el contexto y generar respuestas
def chat_with_llama():
    """Iniciar una conversación con LLAMA, el modelo de lenguaje de Meta."""
    while True:
        user_input = input()  # Recibir entrada del usuario
        if user_input.lower() == "salir":  # Permitir salir de la conversación
            print("Chat finalizado.")
            break
        messages.append({"role": "user", "content": user_input})
        prompt = pipeline.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
        response = pipeline(prompt, max_new_tokens=4096, do_sample=False, temperature=0.7, top_p=0.9)
        generated_response = response[0]["generated_text"][len(prompt):].strip()
        print(generated_response)
        messages.append({"role": "system", "content": generated_response})  # Actualizar el contexto con la respuesta generada

# Iniciar la conversación
chat_with_llama()