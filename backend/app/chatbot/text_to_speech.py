# text_to_speech.py

import requests
import base64
from dotenv import load_dotenv
import os
from fastapi import HTTPException

# Load environment variables from the .env file
load_dotenv()

# Retrieve values from environment variables
API_SUBSCRIPTION_KEY = os.getenv('API_SUBSCRIPTION_KEY')
TEXT_TO_SPEECH_API_URL = os.getenv('TEXT_TO_SPEECH_API_URL')
# Example function for text-to-speech conversion (replace with your actual implementation)
def convert_text_to_audio(text: str) -> bytes:
    # Your existing code for converting text to speech
    url = TEXT_TO_SPEECH_API_URL
    payload = {
        "inputs": [text],
        "target_language_code": "hi-IN",
        "speaker": "amartya",
        "pitch": 0,
        "pace": 1.1,
        "loudness": 1.5,
        "speech_sample_rate": 8000,
        "enable_preprocessing": True,
        "model": "bulbul:v1"
    }
    headers = {
        "api-subscription-key": API_SUBSCRIPTION_KEY,  # Replace with your API key from environment variable
        "Content-Type": "application/json"
    }
    
    # Send request to the TTS API
    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        # Extract base64 audio and decode to bytes
        data = response.json()
        audio_data_base64 = data['audios'][0]
        audio_data = base64.b64decode(audio_data_base64)
        return audio_data
    else:
        raise HTTPException(status_code=500, detail="Failed to generate audio")
