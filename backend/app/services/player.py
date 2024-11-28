from sqlalchemy.orm import Session
from app import model
from sqlalchemy import func
from sqlalchemy import text


def get_all_players_from_db(db: Session , match_id: str):
    return db.query(model.PlayerStats).filter(model.PlayerStats.match_id == match_id).all()