from flask import Flask, render_template, request, jsonify
from ast import literal_eval

app = Flask(__name__)
DATA_FILE = "team_data.py"

# Load team data
def load_team_data():
    with open(DATA_FILE, "r") as file:
        data_content = file.read()
        data_dict = literal_eval(data_content.split("=")[1].strip())
    for team in data_dict:
        if "colors_used" not in team or team["colors_used"] is None:
            team["colors_used"] = []
    return data_dict

# Save updated team data
def save_team_data(data):
    with open(DATA_FILE, "w") as file:
        file.write(f"TEAM_DATA = {data}")

# Load initial data
team_data = load_team_data()

@app.route("/")
def index():
    return render_template("index.html", teams=team_data)

@app.route("/update-color", methods=["POST"])
def update_color():
    data = request.json
    team_index = data.get("team_index")
    final_color = data.get("final_color")
    
    if team_index is not None and final_color:
        team_data[team_index]["final_color"] = final_color
        save_team_data(team_data)
        return jsonify({"message": "Color updated successfully!"}), 200
    
    return jsonify({"message": "Invalid data provided."}), 400

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)
