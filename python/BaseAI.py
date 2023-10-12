import os
import sys
import openai
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

class BaseAI:
    def __init__(self, model, temperature, max_tokens, frequency_penalty):
        openai.api_key = OPENAI_API_KEY
        self.model = model
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.frequency_penalty = frequency_penalty
        
    def get_ai_response(self, query):
        message = [{"role": "user", "content": query}]
        
        ai = openai.ChatCompletion.create(
            model=self.model,
            messages=message,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            frequency_penalty=self.frequency_penalty
        )
        return ai.choices[0].message.content
