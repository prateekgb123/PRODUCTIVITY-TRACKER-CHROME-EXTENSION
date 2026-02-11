let activeTab = null;
let startTime = null;

// detect active tab
chrome.tabs.onActivated.addListener(async (info) => {
  const tab = await chrome.tabs.get(info.tabId);
  handleChange(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    handleChange(tab);
  }
});

function handleChange(tab) {
  if (!tab.url) return;

  const now = Date.now();
  const hostname = new URL(tab.url).hostname;

  // ================= BLOCK CHECK =================
  chrome.storage.local.get(["blocked"], (data) => {
    const blocked = data.blocked || [];
    if (blocked.includes(hostname)) {
      chrome.tabs.update(tab.id, {
        url: "https://example.com"   // blocked redirect
      });
      return;
    }
  });

  // ================= SAVE TIME =================
  if (activeTab && startTime) {
    const duration = Math.floor((now - startTime) / 1000);

    chrome.storage.local.get(["tracking"], (data) => {
      if (data.tracking === false) return;

      fetch("http://localhost:5000/api/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site: activeTab, duration })
      });
    });
  }

  activeTab = hostname;
  startTime = now;
}
