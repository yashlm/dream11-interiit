import csv

file_path = 'final_total_data.csv'
unique_teams = set()

with open(file_path, mode='r', newline='', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)  # Using DictReader to access columns by name
    count=0
    for row in csv_reader:
        value = row.get('player_team')
        if value:
            unique_teams.add(value) 

unique_teams_list = list(unique_teams)


unique_teams_list.sort()
print(len(unique_teams_list))


py_content = f"""
# This is an auto-generated file containing unique team names from the CSV data

unique_teams = {unique_teams_list}
"""

py_file_path = 'unique_teams.py'

with open(py_file_path, 'w') as py_file:
    py_file.write(py_content)

print(f"Data has been exported to {py_file_path}")
