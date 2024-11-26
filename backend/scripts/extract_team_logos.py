import os
import requests
from googleapiclient.discovery import build
from PIL import Image
from io import BytesIO
from colorthief import ColorThief
from dotenv import load_dotenv

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_SEARCH_API_KEY")
CSE_ID = os.getenv("CSI_SEARCH_ENGINE_ID")

def download_image(image_url, team, folder='images'):
    try:
        # Send a GET request to the image URL
        response = requests.get(image_url)
        response.raise_for_status()  # Check if the request was successful

        # Validate that the response contains an image
        if 'image' in response.headers['Content-Type']:
            # Determine the file format from the content type
            content_type = response.headers['Content-Type']
            format_map = {
                'image/jpeg': 'JPEG',
                'image/png': 'PNG',
                'image/gif': 'GIF',
                'image/webp': 'WEBP',
                'image/svg+xml': 'SVG',
                'image/bmp': 'BMP',
                # Add other formats if necessary
            }
            image_format = format_map.get(content_type, None)

            if not image_format:
                print(f"Unsupported image format: {content_type}")
                return None
            
            # Create the folder if it doesn't exist
            if not os.path.exists(folder):
                os.makedirs(folder)

            # Set the image path
            image_path = os.path.join(folder, f"{team}.{image_format.lower()}")

            # Save the image
            with BytesIO(response.content) as img_data:
                image = Image.open(img_data)
                image.save(image_path, format=image_format)

            print(f"Downloaded: {team} -> {image_path}")
            return image_path  # Return the local path of the image

        else:
            print(f"URL does not contain an image: {image_url}")
            return None

    except Exception as e:
        print(f"Error downloading {image_url}: {e}")
        return None
    
# Function to extract dominant colors from the image
def extract_colors(image_path, color_count=5):
    try:
        color_thief = ColorThief(image_path)
        # Get the color palette
        color_palette = color_thief.get_palette(color_count=color_count)
        return color_palette
    except Exception as e:
        print(f"Error extracting colors from {image_path}: {e}")
        return []

# Function to search images using Google Custom Search API
def google_image_search(query, num_results=1):
    # Build the Google API client
    service = build("customsearch", "v1", developerKey=GOOGLE_API_KEY)
    
    # Perform the search and retrieve the image URLs
    res = service.cse().list(
        q=f"{query} site:en.wikipedia.org",  # Restrict search to Wikipedia
        cx=CSE_ID,
        searchType='image',
        num=num_results
    ).execute()

    image_urls = [item['link'] for item in res.get('items', [])]
    return image_urls

# Main function to process teams and collect data
def process_teams(unique_teams, folder='team_logos'):
    data = []
    
    for team in unique_teams:
        try:
            search_query = f"cricket {team} logo"
            image_urls = google_image_search(search_query, num_results=1)
            
            if not image_urls:
                print(f"No image found for: {team}")
                data.append({"team_name": team, "logo_url": None, "colors_used": None})
            else:
                logo_url = image_urls[0]
                print(f"Processing: {team} - {logo_url}")
                image_path = download_image(logo_url,team, folder)
                
                if image_path:
                    colors = extract_colors(image_path)
                    data.append({"team_name": team, "logo_url": logo_url, "colors_used": colors, "final_color": None})
                else:
                    data.append({"team_name": team, "logo_url": logo_url, "colors_used": None, "final_color": None})
        except Exception as e:
             # Handle quota exceeded errors
            if e.resp.status == 429:  # HTTP 429 Too Many Requests
                print("Quota exceeded! Saving progress and exiting.")
                save_data_to_file(data, 'team_data.py')
                break
            else:
                print(f"HTTP Error: {e}")
        
    return data
# Function to save data to a file
def save_data_to_file(data, filename):
    try:
        with open(filename, 'w') as file:
            file.write("team_data = ")
            file.write(repr(data))  # Write the Python representation of the list
            print(f"Progress saved to {filename}")
    except Exception as e:
        print(f"Error saving data: {e}")

# Example usage
if __name__ == "__main__":
    unique_teams = [ 'Western Storm', 'Windward Islands', 'Worcestershire', 'Yorkshire', 'Yorkshire Diamonds', 'Zambia', 'Zimbabwe']
    team_data = process_teams(unique_teams, folder='team_logos')
    save_data_to_file(team_data, 'team_data.py')
    print("Team data has been saved to team_data.py")


