document.getElementById("report").addEventListener("click", async () => {
  const res = await fetch("http://localhost:5000/api/report", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  const data = await res.json();
  alert(JSON.stringify(data, null, 2));
});

document.getElementById("logout").onclick = () => {
  localStorage.removeItem("token");
  alert("Logged out");
};
