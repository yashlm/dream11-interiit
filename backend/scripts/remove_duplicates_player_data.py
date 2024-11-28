from player_details import player_details  # Import the player details

# Function to remove duplicates based on 'player_id'
def remove_duplicates(player_data):
    unique_players = {}
    
    # Loop through the player data
    for player in player_data:
        # Add each player to the dictionary, using player_id as the key
        # If a player_id already exists, it will overwrite the previous one, thus removing duplicates
        unique_players[player['player_id']] = player
    
    # Return the list of unique players
    return list(unique_players.values())

# Main script execution
if __name__ == "__main__":
    # Remove duplicates
    unique_player_details = remove_duplicates(player_details)
    
    # Save the updated list of unique players to a new file
    with open("player_details_unique.py", "w") as f:
        f.write("player_details_unique = ")
        f.write(repr(unique_player_details))

    print("Player details with duplicates removed saved to player_details_unique.py")
