# 🚀 Productivity Tracker Chrome Extension

A full-stack productivity monitoring system that tracks time spent on websites, analyzes behavior, highlights distractions, and allows smart blocking.

Built using **Chrome Extension APIs + Node.js + Express + MongoDB**.

This project demonstrates real-time activity tracking, backend aggregation, analytics generation, and enforcement features similar to commercial tools like RescueTime.

---

## 1. Features

### 1.1 Time Tracking
1. Automatically tracks time spent on each website.
2. Detects tab switching in real time.
3. Stores usage duration in MongoDB.

### 1.2 Productivity Analytics
1. Total browsing time.
2. Productive vs distracting time.
3. Productivity score (%).
4. Most visited website.
5. Sorted ranking.

### 1.3 Live Monitoring
1. Displays the current active site.
2. Shows live timer.

### 1.4 Website Blocking
1. Block the current site with one click.
2. Background service worker enforces redirection.

### 1.5 Control
1. Toggle tracking ON / OFF anytime.

### 1.6 Auto Updates
1. Dashboard refreshes automatically.

---

## 2. How It Works

Browser Activity
Chrome Extension (background.js)
POST → Backend API
MongoDB stores activity
Popup fetches /report
Analytics + UI rendering


---

## 3. Tech Stack

### 3.1 Frontend (Chrome Extension)
1. Chrome Manifest v3  
2. JavaScript  
3. Chrome Tabs API  
4. Chrome Storage API  

### 3.2 Backend
1. Node.js  
2. Express.js  
3. MongoDB (Mongoose)  

---

## 4. Project Structure

productivity-tracker/
│
├── chrome-extension/
│ ├── manifest.json
│ ├── background.js
│ └── popup/
│ ├── popup.html
│ ├── popup.js
│ └── popup.css
│
└── server/
├── controllers/
├── models/
├── routes/
└── server.js


---

## 5. Setup Instructions

### 5.1 Start Backend

```bash
cd server
npm install
node server.js
Server runs at:
http://localhost:5000

5.2 Load Extension in Chrome

Open
chrome://extensions

Enable Developer Mode.
Click Load Unpacked.
Select the chrome-extension folder.

5.3 Start Browsing

Visit websites.
Activity will automatically start saving.

5.4 View Dashboard

Click the extension icon to see:
Total time
Productivity score
Top site
Ranked website list
Live timer
Block button

6. API Endpoints

6.1 Save Activity
POST /api/activity
6.2 Get Report
GET /api/report

7. What Makes This Project Strong

This is not just a CRUD app.
It demonstrates:
->Event-driven browser tracking
->Background workers
->Real-time analytics
->Behavioral classification
->Client ↔ server communication
->Database aggregation
->Enforcement via blocking
->Automatic UI updates

8. Example Output
Total: 2h 10m  
Productive: 1h 20m  
Distracting: 50m  
Score: 62%  

Top Site → github.com
9. Future Enhancements

->Pie charts & visual graphs
->Weekly/monthly trends
->AI productivity suggestions
->Focus sessions
->Temporary unblock
->Cloud sync
->Multi-user system

10. Author
Prateek