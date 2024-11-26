# match_id
# innings
# batting_team
# city
# dates
# event_name
# match_number
# gender
# match_type
# match_referees
# tv_umpires
# umpires
# team_type
# teams
# venue
# players
# season


import csv
import os
from datetime import datetime

# Input CSV file path
csv_file = "final_matchdata_with_inning.csv"  # Replace with your actual CSV file path
output_file = "match_data.py"  # File to store the extracted data

# List of required columns
required_columns = [
    "match_id", "innings", "batting_team", "city", "dates", "event_name",
    "match_number", "gender", "match_type", "match_referees", "tv_umpires",
    "umpires", "team_type", "teams", "venue", "players", "season"
]

# Date threshold (only include rows with dates after this)
date_threshold = datetime(2024, 7, 1)

def extract_columns_with_date_filter(csv_file, required_columns, date_threshold):
    extracted_data = []

    try:
        # Open and read the CSV file
        with open(csv_file, mode="r", encoding="utf-8") as file:
            reader = csv.DictReader(file)

            # Verify if all required columns exist
            missing_columns = [col for col in required_columns if col not in reader.fieldnames]
            if missing_columns:
                raise ValueError(f"Missing required columns in the CSV file: {missing_columns}")
            
            # Extract rows with only the required columns and filter by date
            for row in reader:
                # Parse and validate the "dates" column
                date_strings = row["dates"].split(",")  # Split multiple dates by comma
                valid_dates = []
                
                # Check each date
                for date_str in date_strings:
                    try:
                        parsed_date = datetime.strptime(date_str.strip(), "%Y-%m-%d")
                        if parsed_date > date_threshold:
                            valid_dates.append(parsed_date)
                    except ValueError:
                        # Skip invalid date formats
                        continue
                
                if valid_dates:
                    # If at least one date is valid, include the row
                    filtered_row = {col: row[col] for col in required_columns}
                    extracted_data.append(filtered_row)

    except FileNotFoundError:
        print(f"Error: The file '{csv_file}' was not found.")
        return []
    except Exception as e:
        print(f"Error while processing the file: {e}")
        return []
    
    return extracted_data

def save_data_to_python_file(data, output_file):
    try:
        # Save the extracted data to a Python file
        with open(output_file, mode="w", encoding="utf-8") as file:
            file.write("# This file contains extracted match data\n\n")
            file.write("match_data = ")
            file.write(repr(data))  # Save data as a Python-compatible representation
        print(f"Data successfully saved to '{output_file}'")
    except Exception as e:
        print(f"Error while saving data to file: {e}")

def main():
    # Extract the data with date filtering
    extracted_data = extract_columns_with_date_filter(csv_file, required_columns, date_threshold)
    if not extracted_data:
        print("No data extracted. Exiting.")
        return

    # Save the data to a Python file
    save_data_to_python_file(extracted_data, output_file)

if __name__ == "__main__":
    main()
