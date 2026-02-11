const list = document.getElementById("list");

document.getElementById("add").onclick = () => {
  const site = document.getElementById("site").value;

  chrome.storage.sync.get(["blocked"], (data) => {
    const blocked = data.blocked || [];
    blocked.push(site);
    chrome.storage.sync.set({ blocked });
    render(blocked);
  });
};

function render(arr) {
  list.innerHTML = arr.map(s => `<li>${s}</li>`).join("");
}

chrome.storage.sync.get(["blocked"], (data) => {
  render(data.blocked || []);
});
