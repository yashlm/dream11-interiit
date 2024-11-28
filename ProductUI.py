import subprocess
import os
import signal
import time
import sys

# Function to run docker-compose
def run_docker_compose():
    # Define the backend and frontend directory paths
    backend_dir = os.path.join(os.getcwd(), 'backend')
    frontend_dir = os.path.join(os.getcwd(), 'frontend')

    # Check if backend and frontend directories exist
    if not os.path.exists(backend_dir):
        print(f"Error: '{backend_dir}' directory does not exist.")
        return
    if not os.path.exists(frontend_dir):
        print(f"Error: '{frontend_dir}' directory does not exist.")
        return

    # Define the docker-compose.yml file path in the backend directory
    docker_compose_file = os.path.join(backend_dir, 'docker-compose.yaml')

    # Check if the docker-compose.yml file exists
    if not os.path.exists(docker_compose_file):
        print(f"Error: '{docker_compose_file}' does not exist.")
        return

    try:
        # Run docker-compose up (build and start both frontend and backend services)
        print("Running docker-compose up...")
        result = subprocess.run(
            ['docker-compose', '-f', docker_compose_file, 'up', '--build', '-d'],
            cwd=backend_dir,  # Set working directory to backend
            check=True,        # Raise an exception if the command fails
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )

        print("Docker Compose started successfully.")

        # Get the container ID or service name (e.g., 'backend' and 'frontend')
        backend_container_id = subprocess.check_output(
            ['docker', 'ps', '-q', '-f', 'name=backend'],
            cwd=backend_dir
        ).decode('utf-8').strip()

        frontend_container_id = subprocess.check_output(
            ['docker', 'ps', '-q', '-f', 'name=frontend'],
            cwd=backend_dir
        ).decode('utf-8').strip()

        print(f"Backend container started with ID: {backend_container_id}")
        print(f"Frontend container started with ID: {frontend_container_id}")

        # Create logs directory if it doesn't exist
        logs_dir = os.path.join(os.getcwd(), 'logs')
        if not os.path.exists(logs_dir):
            os.makedirs(logs_dir)

        # Define log file names based on container IDs
        backend_log_file_path = os.path.join(logs_dir, f'backend_logs_{backend_container_id}.txt')
        frontend_log_file_path = os.path.join(logs_dir, f'frontend_logs_{frontend_container_id}.txt')

        # Register a cleanup function to stop the containers and save logs when the script exits
        def stop_on_exit(signal, frame):
            stop_container(backend_container_id, backend_log_file_path)
            stop_container(frontend_container_id, frontend_log_file_path)
            sys.exit(0)  # Exit the script after stopping the containers
        
        # Handle SIGINT (Ctrl+C) gracefully
        signal.signal(signal.SIGINT, stop_on_exit)

        # Simple loop to keep the script running and wait for interruption
        print("Press Ctrl+C to stop the containers.")
        
        # Capture logs of the containers and save them to log files
        capture_logs(backend_container_id, backend_log_file_path)
        capture_logs(frontend_container_id, frontend_log_file_path)

        while True:
            time.sleep(1)

    except subprocess.CalledProcessError as e:
        print(f"Error running docker-compose: {e}")
        print("Output:", e.stdout.decode())
        print("Error:", e.stderr.decode())

# Function to stop the container and save logs
def stop_container(container_id, log_file_path):
    if container_id:
        try:
            # Capture logs of the container before stopping
            print(f"Capturing logs for container {container_id}...")
            capture_logs(container_id, log_file_path)

            print(f"Stopping container {container_id}...")
            subprocess.run(
                ['docker', 'stop', container_id],
                check=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            print(f"Container {container_id} stopped successfully.")

            # After stopping, show the log file path
            print(f"Logs saved to: {log_file_path}")

        except subprocess.CalledProcessError as e:
            print(f"Error stopping container {container_id}: {e}")

# Function to capture logs from the container
def capture_logs(container_id, log_file_path):
    try:
        # Get the logs of the container
        logs = subprocess.check_output(
            ['docker', 'logs', container_id],
            stderr=subprocess.PIPE
        ).decode('utf-8')

        # Save logs to a file
        with open(log_file_path, 'w') as log_file:
            log_file.write(logs)
        print(f"Logs saved to {log_file_path}")

    except subprocess.CalledProcessError as e:
        print(f"Error capturing logs: {e}")

if __name__ == "__main__":
    # Run the docker-compose for both frontend and backend
    run_docker_compose()
