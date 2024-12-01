from sqlalchemy import Column, Integer, String, ForeignKey, ARRAY, Text, Float , Date, Boolean, Numeric,JSON,BigInteger
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
    # id = Column(Integer, primary_key=True, index=True)
    player_id = Column(String(50), primary_key=True, unique=True, nullable=False)
    unique_name = Column(String(100), nullable=False)
    key_cricinfo = Column(Float, nullable=True)
    full_name = Column(String(150), nullable=False)
    gender = Column(String(10), nullable=True)
    playing_role = Column(String(50), nullable=True)
    bg_image_url = Column(Text, nullable=True)
    img_src_url = Column(Text, nullable=True)

    def __repr__(self):
        return f"<PlayerDetails(player_id='{self.player_id}', unique_name='{self.unique_name}', full_name='{self.full_name}')>"

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
    isfeatured = Column(String, default="no")                    



class PlayerStats(Base):
    __tablename__ = 'player_stats'
    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(String(20), )
    full_name = Column(String(255))
    match_id = Column(String(20))
    match_type = Column(String(50))
    start_date = Column(Date)
    gender = Column(String(10))
    runs_scored = Column(Integer)
    fours_scored = Column(Integer)
    sixes_scored = Column(Integer)
    wickets_taken = Column(Integer)
    batting_style = Column(String(50))
    fantasy_score_batting = Column(Float)
    fantasy_score_bowling = Column(Float)
    fantasy_score_total = Column(Float)
    highest_runs = Column(Integer)
    highest_wickets = Column(Integer)
    centuries_cumsum = Column(Integer)
    half_centuries_cumsum = Column(Integer)
    bowling_average_10 = Column(Float)
    bowling_strike_rate_10 = Column(Float)
    bowling_style_left_arm_fast = Column(Boolean)
    bowling_style_left_arm_spin = Column(Boolean)
    bowling_style_left_others = Column(Boolean)
    bowling_style_others = Column(Boolean)
    bowling_style_right_arm_fast = Column(Boolean)
    bowling_style_right_arm_spin = Column(Boolean)
    bowling_style_right_others = Column(Boolean)
    economy_rate_10 = Column(Float)
    batting_average_10 = Column(Float)
    strike_rate_10 = Column(Float)
    boundary_percentage_10 = Column(Float)

class CricketersLifetimeStats(Base):
    __tablename__ = "cricketers_lifetime_stats"

    Unnamed_0 = Column(Integer, primary_key=True)  # Assuming "Unnamed: 0" is a primary key
    identifier = Column(String)
    name = Column(String)
    unique_name = Column(String)
    key_cricinfo = Column(Float)
    full_name = Column(String)
    batting_style = Column(String)
    bowling_style = Column(String)
    playing_role = Column(String)
    adaptability_test = Column(Float)
    adaptability_t20 = Column(Float)
    adaptability_it20 = Column(Float)
    adaptability_odi = Column(Float)
    adaptability_odm = Column(Float)
    adaptability_mdm = Column(Float)
    all_rounder_performance_IT20 = Column(Float)
    all_rounder_performance_MDM = Column(Float)
    all_rounder_performance_ODI = Column(Float)
    all_rounder_performance_ODM = Column(Float)
    all_rounder_performance_T20 = Column(Float)
    all_rounder_performance_Test = Column(Float)
    Bowling_test = Column(Float)
    Bowling_t20 = Column(Float)
    Bowling_it20 = Column(Float)
    Bowling_odi = Column(Float)
    Bowling_odm = Column(Float)
    Bowling_mdm = Column(Float)
    batting_consistency_IT20 = Column(Float)
    batting_consistency_MDM = Column(Float)
    batting_consistency_ODI = Column(Float)
    batting_consistency_ODM = Column(Float)
    batting_consistency_T20 = Column(Float)
    batting_consistency_Test = Column(Float)
    bowling_consistency_IT20 = Column(Float)
    bowling_consistency_MDM = Column(Float)
    bowling_consistency_ODI = Column(Float)
    bowling_consistency_ODM = Column(Float)
    bowling_consistency_T20 = Column(Float)
    bowling_consistency_Test = Column(Float)
    fielding_performance_IT20 = Column(Float)
    fielding_performance_MDM = Column(Float)
    fielding_performance_ODI = Column(Float)
    fielding_performance_ODM = Column(Float)
    fielding_performance_T20 = Column(Float)
    fielding_performance_Test = Column(Float)
    batting_form_IT20 = Column(Float)
    batting_form_MDM = Column(Float)
    batting_form_ODI = Column(Float)
    batting_form_ODM = Column(Float)
    batting_form_T20 = Column(Float)
    batting_form_Test = Column(Float)
    bowling_form_IT20 = Column(Float)
    bowling_form_MDM = Column(Float)
    bowling_form_ODI = Column(Float)
    bowling_form_ODM = Column(Float)
    bowling_form_T20 = Column(Float)
    bowling_form_Test = Column(Float)
    match_it20 = Column(Float)
    match_mdm = Column(Float)
    match_odi = Column(Float)
    match_odm = Column(Float)
    T20 = Column(Float)
    match_test = Column(Float)


class TeamPlayed(Base):
    __tablename__ = 'team_played'

    player_id = Column(String(255), primary_key=True, nullable=False)
    teams = Column(ARRAY(String), nullable=False)

    def __repr__(self):
        return f"<TeamPlayed(player_id='{self.player_id}', teams={self.teams})>"
    

class PlayerBattingStats(Base):
    __tablename__ = 'player_batting_stats'

    player_id = Column(String, primary_key=True)
    test_total_runs = Column(Numeric)
    test_total_matches = Column(Numeric)
    test_highest_score = Column(Numeric)
    test_strike_rate = Column(Numeric)
    test_avg = Column(Numeric)
    test_last_10_avg = Column(Numeric)
    test_last_10_sr = Column(Numeric)
    test_fifties = Column(Numeric)
    test_hundreds = Column(Numeric)
    test_fours = Column(Numeric)
    test_sixes = Column(Numeric)
    test_stumpings = Column(Numeric)
    test_catches = Column(Numeric)
    t20_total_runs = Column(Numeric)
    t20_total_matches = Column(Numeric)
    t20_highest_score = Column(Numeric)
    t20_strike_rate = Column(Numeric)
    t20_avg = Column(Numeric)
    t20_last_10_avg = Column(Numeric)
    t20_last_10_sr = Column(Numeric)
    t20_fifties = Column(Numeric)
    t20_hundreds = Column(Numeric)
    t20_fours = Column(Numeric)
    t20_sixes = Column(Numeric)
    t20_stumpings = Column(Numeric)
    t20_catches = Column(Numeric)
    it20_total_runs = Column(Numeric)
    it20_total_matches = Column(Numeric)
    it20_highest_score = Column(Numeric)
    it20_strike_rate = Column(Numeric)
    it20_avg = Column(Numeric)
    it20_last_10_avg = Column(Numeric)
    it20_last_10_sr = Column(Numeric)
    it20_fifties = Column(Numeric)
    it20_hundreds = Column(Numeric)
    it20_fours = Column(Numeric)
    it20_sixes = Column(Numeric)
    it20_stumpings = Column(Numeric)
    it20_catches = Column(Numeric)
    odi_total_runs = Column(Numeric)
    odi_total_matches = Column(Numeric)
    odi_highest_score = Column(Numeric)
    odi_strike_rate = Column(Numeric)
    odi_avg = Column(Numeric)
    odi_last_10_avg = Column(Numeric)
    odi_last_10_sr = Column(Numeric)
    odi_fifties = Column(Numeric)
    odi_hundreds = Column(Numeric)
    odi_fours = Column(Numeric)
    odi_sixes = Column(Numeric)
    odi_stumpings = Column(Numeric)
    odi_catches = Column(Numeric)
    mdm_total_runs = Column(Numeric)
    mdm_total_matches = Column(Numeric)
    mdm_highest_score = Column(Numeric)
    mdm_strike_rate = Column(Numeric)
    mdm_avg = Column(Numeric)
    mdm_last_10_avg = Column(Numeric)
    mdm_last_10_sr = Column(Numeric)
    mdm_fifties = Column(Numeric)
    mdm_hundreds = Column(Numeric)
    mdm_fours = Column(Numeric)
    mdm_sixes = Column(Numeric)
    mdm_stumpings = Column(Numeric)
    mdm_catches = Column(Numeric)
    odm_total_runs = Column(Numeric)
    odm_total_matches = Column(Numeric)
    odm_highest_score = Column(Numeric)
    odm_strike_rate = Column(Numeric)
    odm_avg = Column(Numeric)
    odm_last_10_avg = Column(Numeric)
    odm_last_10_sr = Column(Numeric)
    odm_fifties = Column(Numeric)
    odm_hundreds = Column(Numeric)
    odm_fours = Column(Numeric)
    odm_sixes = Column(Numeric)
    odm_stumpings = Column(Numeric)
    odm_catches = Column(Numeric)


class PlayerBowlingStats(Base):
    __tablename__ = 'player_bowling_stats'

    player_id = Column(String, primary_key=True)
    test_total_matches = Column(Numeric)
    test_total_wickets = Column(Numeric)
    test_economy_rate = Column(Numeric)
    test_bowling_avg = Column(Numeric)
    test_strike_rate = Column(Numeric)
    test_last_10_avg = Column(Numeric)
    test_last_10_sr = Column(Numeric)
    test_last_10_eco = Column(Numeric)
    test_4_wicket_hauls = Column(Numeric)
    test_5_wicket_hauls = Column(Numeric)
    test_best_bowling_figures = Column(String)  # Bowling figures as text
    test_catches = Column(Numeric)
    test_maiden_overs = Column(Numeric)
    t20_total_matches = Column(Numeric)
    t20_total_wickets = Column(Numeric)
    t20_economy_rate = Column(Numeric)
    t20_bowling_avg = Column(Numeric)
    t20_strike_rate = Column(Numeric)
    t20_last_10_avg = Column(Numeric)
    t20_last_10_sr = Column(Numeric)
    t20_last_10_eco = Column(Numeric)
    t20_4_wicket_hauls = Column(Numeric)
    t20_5_wicket_hauls = Column(Numeric)
    t20_best_bowling_figures = Column(String)
    t20_catches = Column(Numeric)
    t20_maiden_overs = Column(Numeric)
    it20_total_matches = Column(Numeric)
    it20_total_wickets = Column(Numeric)
    it20_economy_rate = Column(Numeric)
    it20_bowling_avg = Column(Numeric)
    it20_strike_rate = Column(Numeric)
    it20_last_10_avg = Column(Numeric)
    it20_last_10_sr = Column(Numeric)
    it20_last_10_eco = Column(Numeric)
    it20_4_wicket_hauls = Column(Numeric)
    it20_5_wicket_hauls = Column(Numeric)
    it20_best_bowling_figures = Column(String)
    it20_catches = Column(Numeric)
    it20_maiden_overs = Column(Numeric)
    odi_total_matches = Column(Numeric)
    odi_total_wickets = Column(Numeric)
    odi_economy_rate = Column(Numeric)
    odi_bowling_avg = Column(Numeric)
    odi_strike_rate = Column(Numeric)
    odi_last_10_avg = Column(Numeric)
    odi_last_10_sr = Column(Numeric)
    odi_last_10_eco = Column(Numeric)
    odi_4_wicket_hauls = Column(Numeric)
    odi_5_wicket_hauls = Column(Numeric)
    odi_best_bowling_figures = Column(String)
    odi_catches = Column(Numeric)
    odi_maiden_overs = Column(Numeric)
    mdm_total_matches = Column(Numeric)
    mdm_total_wickets = Column(Numeric)
    mdm_economy_rate = Column(Numeric)
    mdm_bowling_avg = Column(Numeric)
    mdm_strike_rate = Column(Numeric)
    mdm_last_10_avg = Column(Numeric)
    mdm_last_10_sr = Column(Numeric)
    mdm_last_10_eco = Column(Numeric)
    mdm_4_wicket_hauls = Column(Numeric)
    mdm_5_wicket_hauls = Column(Numeric)
    mdm_best_bowling_figures = Column(String)
    mdm_catches = Column(Numeric)
    mdm_maiden_overs = Column(Numeric)
    odm_total_matches = Column(Numeric)
    odm_total_wickets = Column(Numeric)
    odm_economy_rate = Column(Numeric)
    odm_bowling_avg = Column(Numeric)
    odm_strike_rate = Column(Numeric)
    odm_last_10_avg = Column(Numeric)
    odm_last_10_sr = Column(Numeric)
    odm_last_10_eco = Column(Numeric)
    odm_4_wicket_hauls = Column(Numeric)
    odm_5_wicket_hauls = Column(Numeric)
    odm_best_bowling_figures = Column(String)
    odm_catches = Column(Numeric)
    odm_maiden_overs = Column(Numeric)


class WeatherData(Base):
    __tablename__ = 'weather_data'
    
    match_id = Column(BigInteger, primary_key=True, nullable=False)
    weather = Column(JSON, nullable=True)
