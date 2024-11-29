#!/bin/bash

# Set the PostgreSQL password environment variable
export PGPASSWORD="Ak@123"

# Wait for the PostgreSQL container to be ready
until psql -h db -U postgres -d dream11 -c '\q'; do
  echo "Waiting for database to be ready..."
  sleep 2
done

# Check if the database is empty
echo "Checking if the database is empty..."
result=$(psql -h db -U postgres -d dream11 -t -c "SELECT COUNT(*) FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';")

if [[ "$result" -eq 0 ]]; then
    echo "Database is empty, importing data..."
    # Run the SQL dump files from the /app/sql folder
    for file in /app/sql/*.sql; do
        echo "Executing $file..."
        psql -h db -U postgres -d dream11 -f $file
    done
else
    echo "Database already contains data. Skipping SQL dump."
fi

# Start the FastAPI application
echo "Starting the FastAPI application..."
uvicorn main:app --host 0.0.0.0 --port 80
