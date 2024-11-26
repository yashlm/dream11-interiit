import os
import subprocess

# Configurations
docker_container_name = "db"  # Name of your PostgreSQL Docker container
database_name = "dream11"  # Database name
username = "postgres"  # PostgreSQL username
password = "Ak@123"  # PostgreSQL password
sql_file = "team_data.sql"  # Path to the .sql file

# Export the password for psql (avoids interactive prompt)
os.environ["PGPASSWORD"] = password

def load_sql_to_docker():
    try:
        # Check if Docker container is running
        result = subprocess.run(
            ["docker", "ps", "-q", "-f", f"name={docker_container_name}"],
            stdout=subprocess.PIPE,
            text=True
        )
        if not result.stdout.strip():
            raise RuntimeError(f"Container '{docker_container_name}' is not running.")

        # Copy the SQL file into the Docker container
        print("Copying SQL file into Docker container...")
        subprocess.run(
            ["docker", "cp", sql_file, f"{docker_container_name}:/tmp/{sql_file}"],
            check=True
        )

        # Execute the SQL file inside the Docker container
        print("Executing SQL file...")
        subprocess.run(
            [
                "docker", "exec", "-i", docker_container_name, 
                "psql", "-U", username, "-d", database_name, 
                "-f", f"/tmp/{sql_file}"
            ],
            check=True
        )

        print("SQL file loaded successfully into the database.")

    except subprocess.CalledProcessError as e:
        print(f"Error during SQL execution: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    load_sql_to_docker()
