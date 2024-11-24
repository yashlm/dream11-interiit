from sqlalchemy import Column, Integer, String, ForeignKey
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
    name = Column(String, unique=True)
    url = Column(String, unique=True)


class Player(Base):
    __tablename__ = "players" 
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    team_id = Column(Integer, ForeignKey("teams.id"))
    url = Column(String, unique=True)

class Match(Base):
    __tablename__ = "matches" 
    id = Column(Integer, primary_key=True, index=True)
    team1_id = Column(Integer, ForeignKey("teams.id"))
    team2_id = Column(Integer, ForeignKey("teams.id"))
    winner = Column(Integer, ForeignKey("teams.id"))
    url = Column(String, unique=True)
