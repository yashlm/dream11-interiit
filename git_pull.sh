#!/bin/bash

# Use the GitHub token from the environment variable
REPO_URL="https://github.com/akshatgupta15/dream11-interiit.git"

# Run git pull with authentication using the environment variable
git pull https://${GITHUB_TOKEN}@${REPO_URL}