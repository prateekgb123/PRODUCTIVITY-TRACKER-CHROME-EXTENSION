// ================= ELEMENTS =================
const reportDiv = document.getElementById("report");
const toggleBtn = document.getElementById("toggleTracking");

const totalEl = document.getElementById("total");
const productiveEl = document.getElementById("productive");
const distractingEl = document.getElementById("distracting");
const scoreEl = document.getElementById("score");
const topEl = document.getElementById("top");

const currentSiteEl = document.getElementById("currentSite");
const liveTimeEl = document.getElementById("liveTime");
const blockBtn = document.getElementById("blockBtn");


// ================= CONFIG =================
const productiveSites = ["github.com", "stackoverflow.com"];
const distractingSites = ["youtube.com", "instagram.com", "facebook.com"];

let currentSite = null;
let startTime = Date.now();


// ================= HELPERS =================
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function classify(site) {
  if (productiveSites.includes(site)) return "productive";
  if (distractingSites.includes(site)) return "distracting";
  return "neutral";
}


// ================= CURRENT TAB =================
function detectCurrentTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0] || !tabs[0].url) return;

    const newSite = new URL(tabs[0].url).hostname;

    if (newSite !== currentSite) {
      currentSite = newSite;
      startTime = Date.now();
    }

    if (currentSiteEl) currentSiteEl.innerText = currentSite;
  });
}

// update every 2 seconds
setInterval(detectCurrentTab, 2000);


// ================= LIVE TIMER =================
setInterval(() => {
  if (!currentSite || !liveTimeEl) return;

  const seconds = Math.floor((Date.now() - startTime) / 1000);
  liveTimeEl.innerText = "Time here: " + formatTime(seconds);
}, 1000);


// ================= LOAD REPORT =================
async function loadReport() {
  try {
    const res = await fetch("http://localhost:5000/api/report");
    const data = await res.json();

    if (!data || !data.length) {
      if (reportDiv) reportDiv.innerHTML = "<p>No activity yet</p>";
      if (totalEl) totalEl.innerText = "0m";
      if (productiveEl) productiveEl.innerText = "0m";
      if (distractingEl) distractingEl.innerText = "0m";
      if (scoreEl) scoreEl.innerText = "0%";
      if (topEl) topEl.innerText = "-";
      return;
    }

    let total = 0, productive = 0, distracting = 0;

    data.forEach(item => {
      total += item.total;
      const type = classify(item._id);
      if (type === "productive") productive += item.total;
      if (type === "distracting") distracting += item.total;
    });

    if (totalEl) totalEl.innerText = formatTime(total);
    if (productiveEl) productiveEl.innerText = formatTime(productive);
    if (distractingEl) distractingEl.innerText = formatTime(distracting);

    const percent = total ? Math.round((productive / total) * 100) : 0;
    if (scoreEl) scoreEl.innerText = percent + "%";

    if (topEl) topEl.innerText = data[0]._id;

    if (reportDiv) {
      reportDiv.innerHTML = data.map(item => {
        const type = classify(item._id);

        return `
          <div class="card ${type}">
            <div class="site">${item._id}</div>
            <div class="time">${formatTime(item.total)}</div>
          </div>
        `;
      }).join("");
    }

  } catch (err) {
    console.log("Report error:", err);
  }
}

// auto refresh every 5s
setInterval(loadReport, 5000);


// ================= TOGGLE TRACKING =================
chrome.storage.local.get(["tracking"], (data) => {
  const isOn = data.tracking !== false;
  updateButton(isOn);
});

function updateButton(isOn) {
  if (!toggleBtn) return;
  toggleBtn.textContent = isOn ? "Tracking ON" : "Tracking OFF";
}

if (toggleBtn) {
  toggleBtn.onclick = () => {
    chrome.storage.local.get(["tracking"], (data) => {
      const newState = !(data.tracking !== false);
      chrome.storage.local.set({ tracking: newState });
      updateButton(newState);
    });
  };
}


// ================= BLOCK SITE =================
if (blockBtn) {
  blockBtn.onclick = () => {
    if (!currentSite) return;

    chrome.storage.local.get(["blocked"], (data) => {
      const blocked = data.blocked || [];

      if (!blocked.includes(currentSite)) {
        blocked.push(currentSite);
        chrome.storage.local.set({ blocked });
        alert(currentSite + " will now be blocked!");
      }
    });
  };
}


// ================= INITIAL LOAD =================
detectCurrentTab();
loadReport();
