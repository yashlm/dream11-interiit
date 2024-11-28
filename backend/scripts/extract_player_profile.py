import requests
from bs4 import BeautifulSoup
from player_details_unique import player_details_unique   # Import the player details

# Function to extract image URLs
def extract_image_urls(url, div_class):
    try:
        # Fetch the page content
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find the div with the specified class
        target_div = soup.find('div', class_=div_class)
        if not target_div:
            print(f"No div with class '{div_class}' found at {url}.")
            return None, None

        # Extract `background-image` URL from the `style` attribute
        style = target_div.get('style', '')
        bg_image_url = None
        if 'background-image' in style:
            start = style.find('url(') + len('url(')
            end = style.find(')', start)
            if start != -1 and end != -1:
                bg_image_url = style[start:end].strip('\'"')

        # Extract `src` URL from the `img` tag
        img_tag = target_div.find('img')
        img_src_url = None
        if img_tag and img_tag.get('src'):
            img_src_url = img_tag['src']

        return bg_image_url, img_src_url

    except Exception as e:
        print(f"Error fetching images from {url}: {e}")
        return None, None

# Function to process player details and fetch image URLs
def process_player_details():
    updated_players = []
    div_class = "ds-bg-cover ds-bg-center"

    for player in player_details_unique:
        try:
            # Generate the URL
            unique_name = player['full_name'].replace(" ", "-")
            key_cricinfo = str(int(float(player['key_cricinfo'])))  # Remove decimal part
            player_url = f"https://www.espncricinfo.com/cricketers/{unique_name}-{key_cricinfo}"

            # Fetch image URLs
            print(f"Fetching images for {player['full_name']} from {player_url}")
            bg_image_url, img_src_url = extract_image_urls(player_url, div_class)

            # Add new fields
            player['bg_image_url'] = bg_image_url
            player['img_src_url'] = img_src_url

            updated_players.append(player)

        except Exception as e:
            print(f"Error processing player {player['full_name']}: {e}")
            continue

    return updated_players

# Main script execution
if __name__ == "__main__":
    updated_player_details = process_player_details()

    # Save to a new file
    with open("player_details_with_images.py", "w") as f:
        f.write("player_details_with_images = ")
        f.write(repr(updated_player_details))

    print("Updated player details with images saved to player_details_with_images.py")
