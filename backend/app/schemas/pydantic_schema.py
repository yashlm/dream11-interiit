from pydantic import BaseModel
from typing import List, Optional

class PlayerStatsInput(BaseModel):
    match_id: str
    player_id: str

class PlayersInput(BaseModel):
    match_id: str
    player_ids: List[str]