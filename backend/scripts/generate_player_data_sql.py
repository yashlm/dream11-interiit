import csv

# File paths
input_csv = "player_data.csv"  # Path to your input CSV file
output_sql = "player_data_dump.sql"  # Path to the output SQL dump file

# Column names (Ensure these match the CSV header, spaces replaced with underscores)
columns = [
    "player_id", "full_name", "match_id", "match_type", "start_date", "gender",
    "runs_scored", "fours_scored", "sixes_scored", "wickets_taken", "batting_style",
    "fantasy_score_batting", "fantasy_score_bowling", "fantasy_score_total",
    "highest_runs", "highest_wickets", "centuries_cumsum", "half_centuries_cumsum",
    "bowling_average_10", "bowling_strike_rate_10", "bowling_style_left_arm_fast",
    "bowling_style_left_arm_spin", "bowling_style_left_others", "bowling_style_others",
    "bowling_style_right_arm_fast", "bowling_style_right_arm_spin", "bowling_style_right_others",
    "economy_rate_10", "batting_average_10", "strike_rate_10", "boundary_percentage_10"
]

# Table name
table_name = "player_stats"

# Function to clean column names by replacing spaces with underscores and converting to lowercase
def clean_column_name(col_name):
    return col_name.replace(" ", "_").lower()

# Function to escape SQL values
def escape_sql(value, col_name):
    if col_name in [
        "bowling_style_left_arm_fast", "bowling_style_left_arm_spin", "bowling_style_left_others",
        "bowling_style_others", "bowling_style_right_arm_fast", "bowling_style_right_arm_spin",
        "bowling_style_right_others"
    ]:
        # Convert 0 to FALSE, 1 to TRUE for boolean columns
        return "TRUE" if value == '1' else "FALSE"
    
    if value == "" or value is None:
        return "NULL"  # NULL for empty or None values
    
    # If the column is numeric, return the value without quotes (ensure it's treated as string)
    try:
        if '.' in value:  # It's a float
            return str(value)  # No quotes needed for floats
        else:
            return str(int(value))  # For integers, return as integer (without quotes)
    except ValueError:
        pass

    # Otherwise, escape string and return with single quotes
    return f"'{value.replace('\'', '\'\'')}'"

# Generating the SQL dump
with open(input_csv, "r") as csv_file, open(output_sql, "w") as sql_file:
    reader = csv.DictReader(csv_file)
    
    # Write table creation statement with cleaned column names
    create_table_statement = f"""CREATE TABLE IF NOT EXISTS {table_name} (
        player_id VARCHAR(20),
        full_name VARCHAR(255),
        match_id INT,
        match_type VARCHAR(50),
        start_date DATE,
        gender VARCHAR(10),
        runs_scored INT,
        fours_scored INT,
        sixes_scored INT,
        wickets_taken INT,
        batting_style VARCHAR(50),
        fantasy_score_batting FLOAT,
        fantasy_score_bowling FLOAT,
        fantasy_score_total FLOAT,
        highest_runs INT,
        highest_wickets INT,
        centuries_cumsum INT,
        half_centuries_cumsum INT,
        bowling_average_10 FLOAT,
        bowling_strike_rate_10 FLOAT,
        bowling_style_left_arm_fast BOOLEAN,
        bowling_style_left_arm_spin BOOLEAN,
        bowling_style_left_others BOOLEAN,
        bowling_style_others BOOLEAN,
        bowling_style_right_arm_fast BOOLEAN,
        bowling_style_right_arm_spin BOOLEAN,
        bowling_style_right_others BOOLEAN,
        economy_rate_10 FLOAT,
        batting_average_10 FLOAT,
        strike_rate_10 FLOAT,
        boundary_percentage_10 FLOAT
    );\n\n"""
    sql_file.write(create_table_statement)

    # Write INSERT statements with cleaned column names
    for row in reader:
        # Map each column to the correct cleaned column name for the row
        cleaned_row = {clean_column_name(col): row[col] for col in row}
        
        # Ensure each value is correctly escaped
        values = [escape_sql(cleaned_row[clean_column_name(col)], clean_column_name(col)) for col in columns]
        
        # Format the INSERT statement
        insert_statement = f"INSERT INTO {table_name} ({', '.join([clean_column_name(col) for col in columns])}) VALUES ({', '.join(values)});\n"
        sql_file.write(insert_statement)

print(f"SQL dump file '{output_sql}' created successfully.")
