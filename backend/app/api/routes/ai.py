from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from io import BytesIO
from fastapi.responses import StreamingResponse
from ...chatbot.chat_bot import tool_selector
from ...chatbot.text_to_speech import convert_text_to_audio 

# Initialize FastAPI and Router
router = APIRouter()

# Pydantic model for the chat message
class ChatMessage(BaseModel):
    message: str


# Chat endpoint to return response from chatbot tool_selector
@router.post("/chat")
async def chat_endpoint(chat_message: ChatMessage):
    try:
        response = tool_selector(chat_message.message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Audio endpoint to convert text to audio and return the audio file
@router.post("/audio")
async def audio_endpoint(chat_message: ChatMessage):
    # Get the text input
    text = chat_message.message
    if not text:
        raise HTTPException(status_code=400, detail="Text input is required")

    try:
        # Convert text to audio
        audio_data = convert_text_to_audio(text)

        # Return the audio as a streaming response
        audio_file = BytesIO(audio_data)
        return StreamingResponse(audio_file, media_type="audio/wav", headers={"Content-Disposition": "attachment; filename=audio.wav"})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

