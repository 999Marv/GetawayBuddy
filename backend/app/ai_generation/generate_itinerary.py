from openai import OpenAI, OpenAIError
from os import getenv
from dotenv import load_dotenv
from .prompt_schema import schema

load_dotenv()
DATABASE_URL = getenv("DATABASE_URL", "sqlite:///default.db")
client = OpenAI(api_key=getenv("chat_key"))

def generate_completion(prompt):
    try:
        completion = client.chat.completions.create(
            model = "gpt-3.5-turbo",
            messages = schema(prompt)
        )
        return completion.choices[0].message.content
    except OpenAIError as e:
        return f"Error: {str(e)}"
