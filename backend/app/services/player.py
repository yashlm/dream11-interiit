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

def get_player_stats_by_name_from_db(db: Session, player_name: str, match_id: int):
    # Query the database to join both tables and filter by player_name and match_id
    result = db.query(model.CricketersLifetimeStats, model.PlayerStats) \
        .join(model.PlayerStats, model.CricketersLifetimeStats.identifier == model.PlayerStats.player_id) \
        .filter(model.CricketersLifetimeStats.unique_name == player_name) \
        .filter(model.PlayerStats.match_id == match_id) \
        .first()
    
    if result:
        cricketer_data = result[0]  # CricketersLifetimeStats object
        player_data = result[1]     # PlayerStats object

        # Convert to dictionary and exclude internal SQLAlchemy fields
        cricketer_dict = {key: value for key, value in cricketer_data.__dict__.items() if not key.startswith('_')}
        player_dict = {key: value for key, value in player_data.__dict__.items() if not key.startswith('_')}

        # Combine both dictionaries
        player_stats = {
            "cricketer_data": cricketer_dict,
            "player_data": player_dict
        }
        
        return player_stats
    else:
        return None

from sqlalchemy import text

def get_all_player_ids_played_for_team_from_db(db: Session, team_name: str):
    """
    Fetch all player IDs where the given team name is in the teams array.

    :param db: SQLAlchemy Session object.
    :param team_name: The name of the team to filter players by.
    :return: List of player IDs.
    """
    query = text("SELECT player_id FROM team_played WHERE :team_name = ANY(teams)")
    result = db.execute(query, {"team_name": team_name}).fetchall()
    return [row[0] for row in result]  # Extract player IDs from the result

def get_all_player_info_for_player_ids_from_db(db: Session, player_ids: list):
    """
    Fetch all player information for the given player IDs.

    :param db: SQLAlchemy Session object.
    :param player_ids: List of player IDs to filter by.
    :return: List of player objects.
    """
    return db.query(model.Player).filter(model.Player.player_id.in_(player_ids)).all()