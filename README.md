Productivity Tracker – Chrome Extension--

Productivity Tracker is a full-stack Chrome Extension that monitors the time spent on websites, analyzes browsing behavior, highlights distractions, and allows blocking unproductive sites.
The project is built using Chrome Extension APIs for tracking and a Node.js + Express + MongoDB backend for storing and analyzing usage data.
This project focuses on real-time tracking, behavior analysis, background service workers, and building a small but complete product experience.

1. What This Project Does:-

-Tracks how long a user stays on each website
-Detects tab switches automatically
-Stores browsing duration in MongoDB
-Calculates total time spent
-Separates productive and distracting time
-Calculates a productivity score
-Shows most visited website
-Displays the currently active website
-Shows a live timer for the current tab
-Allows blocking of distracting websites
-Lets users toggle tracking ON/OFF
-This project is not just about storing data — it also interprets it and gives insights.

2. Tech Stack:-

Frontend (Chrome Extension)-

-Manifest V3
-JavaScript
-Chrome Tabs API
-Chrome Storage API

Backend-

-Node.js
-Express.js
-MongoDB
-Mongoose

3. How It Works:-

-The extension listens for active tab changes using the Chrome Tabs API.
-When the user switches tabs, the previous tab’s time is calculated.
-The extension sends the site name and duration to the backend.
-The backend stores this data in MongoDB.
-When the popup is opened, it fetches aggregated data from /api/report.
-The popup calculates:
1.Total time
2.Productive time
3.Distracting time
4.Productivity percentage
5.Most used site
6.If a site is blocked, the background script automatically redirects it.
7.The tracking logic runs in a background service worker, so it works even when the popup is closed.

4. Project Structure:-

Productivity-Tracker
│
├── chrome-extension
│ ├── manifest.json
│ ├── background.js
│ └── popup
│ ├── popup.html
│ ├── popup.js
│ └── popup.css
│
└── server
├── controllers
├── models
├── routes
└── server.js

5. Running the Project Locally:-

Step 1 – Start Backend

cd server  
npm install  
node server.js  
Backend runs at:
http://localhost:5000

Step 2 – Load the Extension

Open Chrome
Go to: chrome://extensions
Enable Developer Mode
Click “Load Unpacked”
Select the chrome-extension folder

Step 3 – Start Browsing

Visit different websites
Switch between tabs
Open the extension popup to see analytics

6. Features Implemented:-

-Real-time tab tracking
-Automatic duration calculation
-Backend aggregation using MongoDB
-Productivity score calculation
-Productive vs distracting classification
-Live current-site detection
-Website blocking
-Tracking toggle switch
-Auto-updating dashboard

7. Example Output:-

Total: 2h 10m
Productive: 1h 20m
Distracting: 50m
Score: 62%

Top Site → github.com

8. Possible Improvements:-

-Pie charts and visual graphs
-Weekly and monthly summaries
-Focus mode with time limits
-Smart auto-block after threshold
-User authentication system
-Cloud sync across devices
-AI-based productivity suggestions

9. Why I Built This

-This project was built to understand:
-Event-driven programming in browser extensions
-Background service workers in Manifest V3
-Real-time tracking logic
-Data aggregation in MongoDB
-Behavior classification
-Designing a small but complete product
-The goal was to build something practical, not just a CRUD application.