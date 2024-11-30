import requests
from bs4 import BeautifulSoup
from player_details_unique import player_details_unique  # Import the player details
from requests.exceptions import Timeout, RequestException
from concurrent.futures import ThreadPoolExecutor

# Function to extract image URLs
def extract_image_urls(url, div_class):
    try:
        response = requests.get(url, timeout=10)  # Set timeout for requests
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

    except Timeout:
        print(f"Timeout while fetching {url}")
        return None, None
    except RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None, None

# Function to process player details and fetch image URLs
def fetch_and_save(player, div_class):
    try:
        # Generate the URL
        unique_name = player['full_name'].replace(" ", "-")
        key_cricinfo = str(int(float(player['key_cricinfo'])))  # Remove decimal part
        player_url = f"https://www.espncricinfo.com/cricketers/{unique_name}-{key_cricinfo}"

        print(f"Fetching images for {player['full_name']} from {player_url}")
        bg_image_url, img_src_url = extract_image_urls(player_url, div_class)

        # Add new fields
        player['bg_image_url'] = bg_image_url
        player['img_src_url'] = img_src_url

        # Append player data to file incrementally
        with open("player_details_with_images.py", "a") as f:
            f.write(f"{repr(player)},\n")

    except Exception as e:
        print(f"Error processing player {player['full_name']}: {e}")

# Main script execution
if __name__ == "__main__":
    div_class = "ds-bg-cover ds-bg-center"  # Define the target div class

    # Initialize the file with a list declaration
    with open("player_details_with_images.py", "w") as f:
        f.write("player_details_with_images = [\n")

    # Use ThreadPoolExecutor for controlled threading
    max_threads = 10  # Adjust based on system resources
    with ThreadPoolExecutor(max_threads) as executor:
        for player in player_details_unique:
            executor.submit(fetch_and_save, player, div_class)

    # Close the list in the file
    with open("player_details_with_images.py", "a") as f:
        f.write("]\n")

    print("Updated player details with images saved to player_details_with_images.py")
