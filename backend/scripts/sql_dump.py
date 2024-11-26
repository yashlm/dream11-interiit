import importlib.util
import os

# Load team_data from the .py file
def load_team_data(file_path):
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"The file '{file_path}' does not exist.")
    spec = importlib.util.spec_from_file_location("team_data", file_path)
    if spec is None:
        raise ImportError(f"Could not load the module from '{file_path}'.")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    if not hasattr(module, 'team_data'):
        raise AttributeError(f"The module '{file_path}' does not contain 'team_data'.")
    return module.team_data

# Convert team_data to SQL dump
def generate_sql_dump(team_data, output_file):
    with open(output_file, 'w') as f:
        # Write table schema
        f.write("""
        CREATE TABLE IF NOT EXISTS teams (
            id SERIAL PRIMARY KEY,
            name VARCHAR UNIQUE,
            url TEXT UNIQUE,
            colors_used TEXT[],
            final_colors VARCHAR
        );
        \n""")

        # Write INSERT statements
        for team in team_data:
            name = team["team_name"].replace("'", "''")  # Escape single quotes
            url = team["logo_url"].replace("'", "''")
            colors_used = "{" + ",".join(f'"{color}"' for color in team["colors_used"]) + "}"  # PostgreSQL array format
            final_colors = team["final_color"]

            f.write(f"INSERT INTO teams (name, url, colors_used, final_colors) VALUES ('{name}', '{url}', '{colors_used}', '{final_colors}');\n")

# Main execution
if __name__ == "__main__":
    file_path = "team_data2.py"  # Path to your .py file
    output_file = "team_data.sql"  # Path to the output SQL file

    try:
        team_data = load_team_data(file_path)
        generate_sql_dump(team_data, output_file)
        print(f"SQL dump file created: {output_file}")
    except (FileNotFoundError, ImportError, AttributeError) as e:
        print(f"Error: {e}")
