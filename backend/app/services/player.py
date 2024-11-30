from sqlalchemy.orm import Session
from app import model
from sqlalchemy import func
from sqlalchemy import text


def get_all_players_stats_from_db(db: Session , match_id: str):
    return db.query(model.PlayerStats).filter(model.PlayerStats.match_id == match_id).all()

def get_player_stats_from_db(db: Session, match_id: str, player_id: str):
    return db.query(model.PlayerStats).filter(model.PlayerStats.match_id == match_id, model.PlayerStats.player_id == player_id).first()

def get_teams_player_stats_from_db(db: Session, match_id: str, player_ids: list):
    return db.query(model.PlayerStats).filter(model.PlayerStats.match_id == match_id, model.PlayerStats.player_id.in_(player_ids)).all()

def get_match_player_stats_from_db(db: Session, match_id: str):
    return db.query(model.PlayerStats).filter(model.PlayerStats.match_id == match_id).all()

def get_all_players_profile_from_db(db: Session):
    return db.query(model.Player).all()

def get_player_ids_for_match(db: Session, match_id: str):
    return db.query(model.PlayerStats.player_id).filter(model.PlayerStats.match_id == match_id).distinct().all()

def get_player_profile_for_ids(db: Session, player_ids: list):
    return db.query(model.Player).filter(model.Player.player_id.in_(player_ids)).all()

def get_all_match_players_profile_from_db(db: Session, match_id: str):
    return db.query(model.Player).filter(model.Player.match_id == match_id).all()

def get_player_lifetime_stats_from_db(db: Session, player_id: str):
    return db.query(model.CricketersLifetimeStats).filter(model.CricketersLifetimeStats.identifier == player_id).first()