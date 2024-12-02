from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel, validator
from io import BytesIO
from fastapi.responses import StreamingResponse
from ...product_ui_model.Product_UI_runner import get_player_scores
# from ...chatbot.chat_bot import tool_selector
from ...chatbot.text_to_speech import convert_text_to_audio 
from typing import List, Union, Literal
import datetime
import re
import pandas as pd

# Initialize FastAPI and Router
router = APIRouter()

# Pydantic model for the chat message
class ChatMessage(BaseModel):
    message: str
class ModelInput(BaseModel):
    match_type: str
    player_ids: Union[str, List[str]]
    match_date: str
    @validator('match_date')
    def validate_match_date_format(cls, v):
        # Regular expression for YYYY-MM-DD format
        date_pattern = r'^\d{4}-\d{2}-\d{2}$'
        if not re.match(date_pattern, v):
            raise ValueError("Invalid match_date format. It must be in 'YYYY-MM-DD' format.")
        try:
            # Attempt to convert to datetime
            pd.to_datetime(v)
        except Exception as e:
            raise ValueError(f"Invalid match_date value: {v}. Unable to parse date. Error: {e}")
        return v
# Chat endpoint to return response from chatbot tool_selector
# @router.post("/chat")
# async def chat_endpoint(chat_message: ChatMessage):
#     try:
#         response = tool_selector(chat_message.message)
#         return {"response": response}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# Audio endpoint to convert text to audio and return the audio file
@router.post("/audio")
async def audio_endpoint(chat_message: ChatMessage):
    # Get the text input
    text = chat_message.message
    if not text:
        raise HTTPException(status_code=400, detail="Text input is required")

    try:
        # Convert text to audio
        audio_data = convert_text_to_audio(text,'hi-IN')

        # Return the audio as a streaming response
        audio_file = BytesIO(audio_data)
        return StreamingResponse(audio_file, media_type="audio/wav", headers={"Content-Disposition": "attachment; filename=audio.wav"})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/predict")
async def predict_scores(modelInput :ModelInput ):
# async def predict_scores(match_type: str, player_ids: Union[str, List[str]], match_date: str):
    # match_date="2024-12-01"
    # player_ids = ["0085a7ce", "00823a96"]
    # match_type = 'Test'
    players = get_player_scores(modelInput.match_type, modelInput.player_ids, modelInput.match_date)
    # return {"player_scores": players, "count": len(players)}
    return players
