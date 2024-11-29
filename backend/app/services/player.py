from sqlalchemy.orm import Session
from app import model
from sqlalchemy import func
from sqlalchemy import text


def get_all_players_from_db(db: Session , match_id: str):
    return db.query(model.PlayerStats).filter(model.PlayerStats.match_id == match_id).all()

def get_player_stats_from_db(db: Session, match_id: str, player_id: str):
    return db.query(model.PlayerStats).filter(model.PlayerStats.match_id == match_id, model.PlayerStats.player_id == player_id).first()

def get_teams_player_stats_from_db(db: Session, match_id: str, player_ids: list):
    return db.query(model.PlayerStats).filter(model.PlayerStats.match_id == match_id, model.PlayerStats.player_id.in_(player_ids)).all()

def get_match_player_stats_from_db(db: Session, match_id: str):
    return db.query(model.PlayerStats).filter(model.PlayerStats.match_id == match_id).all()