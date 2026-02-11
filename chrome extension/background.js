let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (info) => {
  const tab = await chrome.tabs.get(info.tabId);
  handleChange(tab.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    handleChange(tab.url);
  }
});

function handleChange(url) {
  if (!url) return;

  const now = Date.now();

  if (activeTab && startTime) {
    const duration = Math.floor((now - startTime) / 1000);

    chrome.storage.local.get(["token"], (result) => {
      const token = result.token;
      if (!token) return;

      fetch("http://localhost:5000/api/activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          site: activeTab,
          duration
        })
      });
    });
  }

  activeTab = new URL(url).hostname;
  startTime = now;
}
