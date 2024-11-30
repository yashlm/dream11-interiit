#!/bin/bash

# Docker cleanup script
# This script will prompt the user to delete containers, images, and volumes
# It will list all containers, images, and volumes and ask the user for input
# The user can choose to delete all containers, images, and volumes, or select specific ones to delete

# Usage:
# Give Permission to execute the script using "" chmod +x docker_cleanup_selective.sh ""
# Run the script using "" ./docker_cleanup_selective.sh ""


# List all containers (running and stopped)
list_containers() {
    echo "List of containers:"
    docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"
}

# List all images
list_images() {
    echo "List of images:"
    docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}\t{{.Size}}"
}

# List all volumes
list_volumes() {
    echo "List of volumes:"
    docker volume ls --format "table {{.Name}}"
}

# Delete all containers
delete_all_containers() {
    echo "Deleting all containers..."
    docker rm -f $(docker ps -a -q)
}

# Delete all images
delete_all_images() {
    echo "Deleting all images..."
    docker rmi -f $(docker images -q)
}

# Delete all volumes
delete_all_volumes() {
    echo "Deleting all volumes..."
    docker volume rm $(docker volume ls -q)
}

# Delete specific containers
delete_containers() {
    container_ids=$1
    for container_id in $(echo $container_ids | tr "," "\n"); do
        echo "Deleting container $container_id..."
        docker rm -f $container_id
    done
}

# Delete specific images
delete_images() {
    image_ids=$1
    for image_id in $(echo $image_ids | tr "," "\n"); do
        echo "Deleting image $image_id..."
        docker rmi -f $image_id
    done
}

# Delete specific volumes

delete_volumes() {
    volume_names=$1
    for volume_name in $(echo $volume_names | tr "," "\n"); do
        # Check if volume is in use by any container
        container_using_volume=$(docker ps -a --filter volume=$volume_name -q)
        if [ -n "$container_using_volume" ]; then
            echo "Volume $volume_name is still in use by container(s) $container_using_volume. Skipping deletion."
        else
            echo "Deleting volume $volume_name..."
            docker volume rm $volume_name
        fi
    done
}

# Main menu
echo "Docker Cleanup Options:"
echo "1. Delete all containers, images, and volumes"
echo "2. Delete specific containers"
echo "3. Delete specific images"
echo "4. Delete specific volumes"
echo "5. Delete specific containers, images, and volumes"
echo "6. Skip all and exit"
echo "7. Delete all containers and volumes (No images)"

# Prompt the user for action
read -p "Please select an option (1-7): " option

case $option in
    1)
        # Option to delete everything
        read -p "Are you sure you want to delete ALL containers, images, and volumes? (y/n): " confirm
        if [ "$confirm" == "y" ]; then
            delete_all_containers
            delete_all_images
            delete_all_volumes
            echo "All containers, images, and volumes have been deleted."
        else
            echo "Deletion aborted. Exiting."
        fi
        ;;
    2)
        # Option to delete specific containers
        list_containers
        read -p "Enter the container IDs or Names you want to delete (comma separated): " container_ids
        if [ ! -z "$container_ids" ]; then
            delete_containers "$container_ids"
        fi
        ;;
    3)
        # Option to delete specific images
        list_images
        read -p "Enter the image IDs or Repository:Tag you want to delete (comma separated): " image_ids
        if [ ! -z "$image_ids" ]; then
            delete_images "$image_ids"
        fi
        ;;
    4)
        # Option to delete specific volumes
        list_volumes
        read -p "Enter the volume names you want to delete (comma separated): " volume_names
        if [ ! -z "$volume_names" ]; then
            delete_volumes "$volume_names"
        fi
        ;;
    5)
        # Option to delete containers, images, and volumes
        list_containers
        read -p "Enter the container IDs or Names you want to delete (comma separated): " container_ids
        if [ ! -z "$container_ids" ]; then
            delete_containers "$container_ids"
        fi

        list_images
        read -p "Enter the image IDs or Repository:Tag you want to delete (comma separated): " image_ids
        if [ ! -z "$image_ids" ]; then
            delete_images "$image_ids"
        fi

        list_volumes
        read -p "Enter the volume names you want to delete (comma separated): " volume_names
        if [ ! -z "$volume_names" ]; then
            delete_volumes "$volume_names"
        fi
        ;;
    6)
        # Option to skip
        echo "Exiting without deleting anything."
        ;;
    7)
        # Option to delete only containers and volumes
        read -p "Are you sure you want to delete ALL containers and volumes? (y/n): " confirm
        if [ "$confirm" == "y" ]; then
            delete_all_containers
            delete_all_volumes
            echo "All containers and volumes have been deleted. Images remain untouched."
        else
            echo "Deletion aborted. Exiting."
        fi
        ;;
    *)
        echo "Invalid option selected. Please choose a valid option (1-7)."
        ;;
esac

echo "Docker cleanup process complete!"
