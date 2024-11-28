#!/bin/bash

# Database credentials
DB_NAME="Dream11"
DB_USER="postgres"
DB_HOST="localhost"
DB_PORT="5432"
OUTPUT_FILE="dumped_data.sql"

# Run pg_dump
pg_dump -U "$DB_USER" -h "$DB_HOST" -p "$DB_PORT" "$DB_NAME" > "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
    echo "Data dumped successfully to $OUTPUT_FILE"
else
    echo "Failed to dump data"
fi
