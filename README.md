# DreamAI Web App Developer Documentation

## 1. Overview
The DreamAI web app merges machine learning, natural language processing, and user-centric design to deliver a seamless predictive fantasy cricket experience. Key features include LLM-based Dream Team summarization, an AI Assistant Bot, and multilingual generative AI support.

---

## 2. Frontend Technical Architecture

### Frontend Architecture

- **React 18.3**: Utilizes the latest React features, including concurrent rendering for a smooth user experience.
- **Component Structure**: Modular design with reusable components to enhance maintainability and scalability.
- **State Management**: React Context for global state management, ensuring seamless data flow across components.

### UI Libraries & Integration
- **Material UI**: Provides a set of customizable UI components and a consistent theme across the app.
- **Tailwind CSS**: A utility-first CSS framework used for responsive and efficient styling.
- **Material Tailwind**: Enhances Material Design components with Tailwind CSS.
- **PrimeReact**: Advanced UI components to enhance the user interface.
- **Chart.js**: Used for visualizing match data, providing interactive charts and graphs.
- **React DnD**: Enables drag-and-drop functionality within the app for user interaction.
- **React Joyride**: Adds interactive user tours to guide users through the app.

### Data Flow
```bash
User Input → React Components → Context API → Data Processing → UI Update
```

### Project Structure

```plaintext
├── assets
│   └── (Folder for image assets)
├── component
│   ├── ImportCSV.jsx        	# Handles CSV file import functionality
│   ├── Loading.jsx          	# Displays a loading screen or indicator
│   ├── MatchDetailsCard.jsx 	# Displays match details in a card layout
│   ├── Navbar.jsx           	# Implements the navigation bar
│   ├── playerCard.jsx       	# Displays player information in a card
│   ├── Playerlist.jsx       	# Lists all players in the match
│   └── TeamSelection.jsx    	# Allows users to select teams for the match
├── HomePage
│   ├── AllMatches.jsx       	# Displays a list of all matches
│   ├── Calendar.jsx         	# Displays the match calendar
│   ├── Header.jsx           	# Displays the header of the homepage
│   ├── MatchCard.jsx        	# Displays match details in a compact card
│   ├── HowToPlay.jsx        	# Provides instructions on how to play
│   └── NoMatches.jsx        	# Displays a message when no matches are available
├── pages
│   ├── CustomMatchCSV.jsx   	# Handles custom match creation
│   ├── dreamTeam.jsx        	# Displays Playground (user's dream team)
│   ├── HomePage.jsx         	# Main homepage component
│   ├── MatchDetails.jsx     	# Displays detailed match information
│   └── Starterpage.jsx     	# Displays the starter page of the app
├── constants.jsx            	# Holds constant values used across the app
├── App.jsx
└── main.jsx
```

---

## 3. Routes

### 1. **Landing Page (/)**
- **Purpose**: Entry point to the application.
- **Key Features**:
  - About Us: Information about the platform, including its goals, features, and background.
  - FAQs: Frequently Asked Questions to help users understand how to use the platform.
  - Get Started: Prominent CTA to navigate users to the homepage (`/home`).

### 2. **Home Page (/home)**
- **Purpose**: The main hub for exploring matches, interacting with match data, and accessing other areas.
- **Key Features**:
  - Featured Matches: Top 20 matches with key information.
  - All Matches: List of all matches with initial 5 matches displayed.
  - Navigation: Access to other sections such as match details, team selection, and custom match features.
  ![Alt text](public\picsinteriit\home.jpg)

### 3. **Select Match (/teamSelect)**
- **Purpose**: Allows users to select two teams for comparison or simulation.
- **Key Features**:
  - Team Selection: Choose two teams.
  - Schedule Options: Pick an existing match or create a custom match.
  - Custom Match Page: Create unique team compositions and simulate matches.
  ![Alt text](public\picsinteriit\select-team.jpg)

### 4. **Match Details (/custommatch/:id)**
- **Purpose**: Provides detailed information about a specific match.
- **Key Features**:
  - Full Player Rosters: Displays all players with their statistics.
  - Custom Squad Creation: Combine players from different teams and analyze match performance.
  - Match Simulation: Simulate matches with different scenarios and strategies.
  ![Alt text](public/picsinteriit/custom-match.png)

### 5. **Custom Match Input (/custommatch)**
- **Purpose**: Dedicated page for creating matches from scratch.
- **Key Features**:
  - CSV Upload: Upload a CSV file with player and team data.
  - Match Customization: Set match details like date, format, and team composition.
  - Simulate and Explore: Simulate matches and explore different outcomes.
  ![Alt text](public\picsinteriit\custom-csv.jpg)

### 6. **Playground (/dreamTeam)**
- **Purpose**: Central interactive feature for exploring curated teams, analyzing players, and experimenting with strategies.
- **Key Features**:
  - Dream Team: AI-curated teams with Dream Scores to visualize player potential.
  - GenAI Description: Explains team composition and predicts player performance.
  - Match Insights: Additional match details like pitch conditions and weather forecasts.
  - Player Profiles: Interactive player cards with career stats and achievements.
  ![Alt text](public\picsinteriit\playground.jpg)

---

## 4. Features

### Select Match
- **Purpose**: Compare or simulate two teams.
- **Key Features**:
  - **Team Selection**: Choose two teams from the list.
  - **Schedule Options**: Pick an existing match or create a custom match.
  - **Custom Match Creation**: Build and simulate unique matches by selecting teams and analyzing player data.

### Custom Match
- **Purpose**: Create and simulate custom matches with full player rosters.
- **Key Features**:
  - **View Player Rosters**: Displays all players in selected teams.
  - **Create Custom Squads**: Combine players from different teams.
  - **Simulate Fantasy Matches**: Experiment with different strategies and player combinations.

### Custom Input
- **Purpose**: Allows users to upload CSV files for custom team creation.
- **Key Features**:
  - **CSV File Format**: Includes player names, squad details, match dates, and format information.
  - **Match Customization**: Users can customize teams, set match dates, and configure simulation formats.
  

### Playground (Dream Team)
- **Purpose**: Interactive feature for exploring curated teams and strategies.
- **Key Features**:
  - **Dream Team**: AI-generated teams with Dream Scores.
  - **GenAI Description**: Explains team composition and projected performance.
  - **Match Insights**: Includes pitch conditions, weather forecasts, and more.
  - **Player Profiles**: Interactive cards with player career stats and achievements.
  ![Alt text](public\picsinteriit\player-profile.jpg)
  
---

## 5. API Documentation

### **Teams**

1. **Get All Teams**
   - **Endpoint**: `GET /team/`
   - **Response**: A list of all teams in the system.

2. **Get Team By Name**
   - **Endpoint**: `GET /team/{team_name}`
   - **Path Parameter**: `team_name` (required)
   - **Response**: Details of the team.

3. **Get Matches By Team Name**
   - **Endpoint**: `GET /match/team/{team_name}`
   - **Path Parameter**: `team_name` (required)
   - **Response**: List of matches.

4. **Get Player Lifetime Stats**
   - **Endpoint**: `GET /player/cricketers_lifetime_stats/{player_id}`
   - **Path Parameter**: `player_id` (required)
   - **Response**:
     - `200 OK`: Returns the lifetime statistics for the player.
     - `422 Validation Error`: If the player ID is invalid.

5. **Get Player Stats for Multiple Players**
   - **Endpoint**: `POST /player/player_stats/all`
   - **Request Body**:
     - `match_id` (required): The match ID.
     - `player_ids` (required): A list of player IDs.
   - **Response**:
     - `200 OK`: Returns the stats for the specified players.
     - `422 Validation Error`: If the request body is invalid or if any player ID is incorrect.

6. **Search Players by Team Name**
   - **Endpoint**: `GET /player/search_players/{team_name}`
   - **Path Parameter**: `team_name` (required)
   - **Response**:
     - `200 OK`: Returns a list of players in the specified team.
     - `422 Validation Error`: If the team name is invalid.

### **AI**

1. **Chat**
   - **Endpoint**: `POST /ai/chat`
   - **Request Body**:
     - `message` (required): The message to send to the AI.
   - **Response**:
     - `200 OK`: Returns the AI's response to the message.
     - `422 Validation Error`: If the request body is invalid or missing the message parameter.

2. **Text to Speech**
   - **Endpoint**: `POST /ai/audio`
   - **Request Body**:
     - `message` (required): The text message to convert to speech.
     - `target_language_code` (required): The language code (e.g., "en" for English).
   - **Response**:
     - `200 OK`: Returns an audio file created from the text.
     - `422 Validation Error`: If the request body is invalid, or the language code is not supported.

3. **Get Match Description**
   - **Endpoint**: `POST /ai/description`
   - **Request Body**:
     - `match_type` (required): The type of the match (e.g., Test, ODI, T20).
     - `player_ids` (required): A list of player IDs involved in the match.
   - **Response**:
     - `200 OK`: Returns a description of the match, including insights and potential strategies based on the players and match type.
     - `422 Validation Error`: If the request body is malformed, or if player IDs or match type are incorrect.

### **Error Responses**

- **422 Validation Error**: This error occurs when a request contains invalid or missing parameters, such as invalid IDs or incorrectly formatted data. The response body will include an error message describing the issue.

**Example Response**:
```json
{
  "error": "Invalid player ID or match type."
}
```

---

## 6. GenAI Features

### **LLM-Based Dream Team Summarization**

**Objective**: Generate detailed summaries to explain the logic behind Dream Team creation.
- **Core Inputs**: SHAP values, historical player statistics, and top features identified by the trained models.
- **Integration**:
  - Backend API processes machine learning model outputs.
  - Frontend presents structured summaries in a user-friendly format.

### **DreamAI Assistant BOT**

**Objective**: Address user queries, provide cricket insights, and simplify app interactions.
- **Architecture**:
  - **RAG-Based Agents**: Retrieve relevant information for system-related queries.
  - **Database Query Agents**: Translate user questions into SQL queries, fetch data, and present answers in a structured format.
  - **General LLM Agents**: Enable smooth, conversational interactions.
- **Integration**:
  - Backend microservices for each agent type.
  - Interactive chatbot interface on the frontend.
  - **RAG-Based Chatbot** was curated and trained for our specific use-case from scratch, trained on match data statistics according to the defined time periods: Before 2024-06-30. Hence, online search is disabled to adhere to app-specific constraints.

### **Multilingual Generative AI Support**

**Objective**: Provide inclusive support by breaking language barriers through speech generation in various Indian languages.
- **Integration**:
  - **Sarvam AI model** processes text-to-speech tasks (though limited by lifetime credit limits).
  - **Dynamic language selection** incorporated in the frontend.
## 7. Performance and Scalability

The DreamAI Web App has been designed with a robust architecture to deliver lightning-fast responses and seamlessly handle the demands of an expanding user base. Built for peak efficiency, it ensures both individual user satisfaction and the capacity to support a thriving community of fantasy cricket enthusiasts. Here's how DreamAI tackles performance and scalability:

### 1. Streamlined Query Processing
- **Single Endpoint Efficiency**: By centralizing all interactions to a single endpoint, `/api/chat`, we reduce network overhead and minimize processing latency.  
  We run two separate models with a single endpoint:
  - One model handles intelligent response generation based on user queries.
  - The other model is responsible for making Endpoint-to-DB calls to retrieve player statistic data.
  
- **Asynchronous Task Handling**: Non-blocking requests allow multiple processes, like data retrieval and audio generation, to run concurrently, ensuring a smooth user experience.

### 2. AI Acceleration
- **Pre-trained Model Caching**: Frequently used models, such as SHAP for explainability and RAG for retrieval, are cached in memory to avoid repetitive initializations, speeding up response times.
  
- **Dynamic Resource Allocation**: Critical tasks, such as multilingual audio snippet generation, are prioritized dynamically based on user demand to maintain rapid response times.

### 3. Minimal Latency Visualizations
- **Client-Side Rendering**: Graphs and charts are generated on the client side using pre-fetched JSON data, reducing server load and improving perceived speed.
  
- **React-Window Loading**: Prioritizes critical information first while loading additional insights in the background, ensuring that users can interact with the app while other data continues to load.

- **Local Storage Utilization**: Saved and unsaved data are stored in local storage to avoid unnecessary API calls, enhancing performance by reducing network load.
