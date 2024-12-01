from pydantic import BaseModel
from typing import List, Optional

class PlayerStatsInput(BaseModel):
    match_id: str 
    player_id: str

class PlayersInput(BaseModel):
    match_id: str
    player_ids: List[str]

class PlayerInput(BaseModel):
    player_id: str
    match_id: Optional[int] = None