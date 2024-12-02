from typing import Union, List
from fastapi import FastAPI

from Product_UI_runner import get_player_scores
app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/predict")
async def predict_scores():
# async def predict_scores(match_type: str, player_ids: Union[str, List[str]], match_date: str):
    match_date="2024-12-01"
    player_ids = ["0085a7ce", "00823a96"]
    match_type = 'Test'
    return get_player_scores(match_type, player_ids, match_date)

