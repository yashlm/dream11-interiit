import csv

def extract_player_details(input_csv_path, output_py_path):
    # List of required columns
    required_columns = ['player_id', 'unique_name', 'key_cricinfo', 'full_name', 'gender', 'playing_role']
    
    player_details = []
    
    # Open the CSV file and read data
    with open(input_csv_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        
        # Loop through each row and extract the required fields
        for row in reader:
            player_data = {}
            for col in required_columns:
                # Ensure each required column exists in the row
                if col in row:
                    player_data[col] = row[col]
            player_details.append(player_data)

    # Now let's write the extracted data to a Python file
    with open(output_py_path, 'w', encoding='utf-8') as pyfile:
        pyfile.write("player_details = [\n")
        for player in player_details:
            pyfile.write(f"    {player},\n")
        pyfile.write("]\n")
    
    print(f"Player details saved to {output_py_path}")


# Paths for the input CSV and output Python file
input_csv_path = 'final_total_data2.csv'  # Replace with your CSV file path
output_py_path = 'player_details.py'  # Replace with the desired output Python file path

# Call the function to extract and save player details
extract_player_details(input_csv_path, output_py_path)
