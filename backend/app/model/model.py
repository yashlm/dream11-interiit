from sqlalchemy import Column, Integer, String, ForeignKey, ARRAY, Text
from pydantic import BaseModel
from app.db.session import Base

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

class GuestUser(Base):
    __tablename__ = 'guest_users'
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class Team(Base):
    __tablename__ = "teams"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False) 
    url = Column(Text, nullable=False)     
    colors_used = Column(ARRAY(String), nullable=True)  # Array of color strings (e.g., "255, 0, 0")
    final_colors = Column(String, nullable=True)  


class Player(Base):
    __tablename__ = "players" 
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    team_id = Column(Integer, ForeignKey("teams.id"))
    url = Column(String, unique=True)

# class Match(Base):
#     __tablename__ = "matches" 
#     id = Column(Integer, primary_key=True, index=True)
#     team1_id = Column(Integer, ForeignKey("teams.id"))
#     team2_id = Column(Integer, ForeignKey("teams.id"))
#     winner = Column(Integer, ForeignKey("teams.id"))
#     url = Column(String, unique=True)

class Match(Base):
    __tablename__ = 'matches'  # Name of the table in PostgreSQL
    id = Column(Integer, primary_key=True, index=True)  # Primary key
    match_id = Column(String(20))  # Match ID (Primary Key)
    innings = Column(Integer, nullable=False)        # Innings number
    batting_team = Column(String(100), nullable=False)  # Batting team name
    city = Column(String(100))                       # City where the match is played
    dates = Column(ARRAY(String), nullable=False)    # Dates as an array of strings
    event_name = Column(String(200))                 # Name of the event or series
    match_number = Column(String(20))                # Match number in the series
    gender = Column(String(10))                      # Gender of the players (e.g., male, female)
    match_type = Column(String(20))                  # Type of match (e.g., Test, ODI, T20)
    match_referees = Column(String(200))             # Match referees
    tv_umpires = Column(String(200))                 # TV umpires
    umpires = Column(String(200))                    # On-field umpires
    team_type = Column(String(50))                   # Type of teams (e.g., international, domestic)
    teams = Column(ARRAY(String), nullable=False)    # Teams playing in the match as an array of strings
    venue = Column(String(200))                      # Venue of the match
    players = Column(Text)                           # List of players (comma-separated)
    season = Column(String(20))                      