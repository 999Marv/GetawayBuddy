from openai import OpenAI, OpenAIError
from os import getenv
from dotenv import load_dotenv
from .prompt_schema import schema

load_dotenv()
DATABASE_URL = getenv("DATABASE_URL", "sqlite:///default.db")
client = OpenAI(api_key=getenv("chat_key"))

def clean_json_response(raw_response: str) -> str:
    start = raw_response.find("{")
    end = raw_response.rfind("}") + 1
    if start != -1 and end != -1:
        return raw_response[start:end]
    return raw_response

def generate_completion(prompt):
    """
    Returns ai generated response from openAI.
    Comes back as a JSON object.
    Formatted as:
    {
    "day1": 
        {
        "morning": "eat at the good burger home of the good burger"
        }
     "description": "Two sentences describing the country."
    }...
    """
    try:
        completion = client.chat.completions.create(
            model = "gpt-3.5-turbo",
            messages = schema(prompt)
        )
        content = completion.choices[0].message.content
        print("Raw AI response:", content)
        cleaned_content = clean_json_response(content)
        print("clean AI response:", cleaned_content)
        return cleaned_content
    except OpenAIError as e:
        print("OpenAI error: %s", str(e))
        return '{"error": "An error occurred while generating the itinerary."}'
