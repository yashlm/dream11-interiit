import importlib.util
import json

# Input Python file containing match data
input_python_file = "match_data.py"  # Replace with your file path
output_sql_file = "match_data.sql"   # Output SQL file
table_name = "matches"               # Table name for PostgreSQL


def load_python_data(file_path):
    """
    Dynamically import a Python file and retrieve the match_data variable.
    """
    try:
        spec = importlib.util.spec_from_file_location("module_name", file_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        # Access the match_data variable from the imported module
        return getattr(module, "match_data", [])
    except Exception as e:
        print(f"Error loading data from file: {e}")
        return []


import json

import json

def sanitize_value(value):
    """
    Convert Python values to SQL-safe string representations.
    """
    if value is None:
        return "NULL"
    
    if isinstance(value, str):
        # If the value contains commas (indicating it should be an array)
        if ',' in value or value.count('-') == 2:  # If it's a date or comma-separated string
            array_elements = value.split(", ") if ',' in value else [value]
            
            # Escape each value and wrap with single quotes for SQL
            array_elements_escaped = []
            for v in array_elements:
                # Escape single quotes for SQL and wrap in single quotes
                escaped_v = v.replace("'", "''")
                array_elements_escaped.append(f"'{escaped_v}'")
            
            # Return as a PostgreSQL array format
            return f"ARRAY[{', '.join(array_elements_escaped)}]"
        
        else:
            # Escape single quotes and wrap in single quotes for a single string value
            escaped_value = value.replace("'", "''")
            return f"'{escaped_value}'"
    
    if isinstance(value, (list, dict)):
        # Convert lists and dicts to JSON strings (escaping single quotes for SQL)
        json_value = json.dumps(value).replace("'", "''")
        return f"'{json_value}'"
    
    return str(value)  # For numbers and other types


def generate_sql(data, output_file, table_name):
    """
    Generate SQL insert statements for PostgreSQL from Python data.
    """
    try:
        with open(output_file, mode="w", encoding="utf-8") as file:
            # Start SQL output
            file.write(f"-- SQL dump for {table_name} table\n")
            file.write("BEGIN;\n")
            
            for record in data:
                # Generate column names and values for each record
                columns = ", ".join(record.keys())
                values = ", ".join(sanitize_value(value) for value in record.values())
                
                # Write the SQL insert statement
                file.write(f"INSERT INTO {table_name} ({columns}) VALUES ({values});\n")
            
            # End SQL output
            file.write("COMMIT;\n")
        
        print(f"SQL file '{output_file}' generated successfully.")
    except Exception as e:
        print(f"Error generating SQL file: {e}")


def main():
    # Load match data from the Python file
    match_data = load_python_data(input_python_file)
    if not match_data:
        print("No data found. Exiting.")
        return

    # Generate SQL file
    generate_sql(match_data, output_sql_file, table_name)


if __name__ == "__main__":
    main()