const titleId = "1978A1";
const sessionTicket = localStorage.getItem("sessionTicket");
const sessionStatus = document.getElementById("sessionStatus");

function logout() {
  localStorage.removeItem("sessionTicket");
  localStorage.removeItem("customId");
  window.location.href = "index.html";
}

if (!sessionTicket) {
  logout();
} else {
  // Optional: verify stored CustomId matches the PlayFab user
  const storedCustomId = localStorage.getItem("customId");

  fetch(`https://${titleId}.playfabapi.com/Client/GetAccountInfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": sessionTicket
    },
    body: JSON.stringify({})
  })
    .then(res => res.json())
    .then(data => {
      if (data.data && data.data.AccountInfo) {
        const customIdFromServer = data.data.AccountInfo.CustomId;

        if (storedCustomId && storedCustomId !== customIdFromServer) {
          console.warn("Custom ID mismatch.");
          logout();
          return;
        }

        sessionStatus.textContent = `Welcome, ${data.data.AccountInfo.Username || "Player"}!`;
      } else {
        logout();
      }
    })
    .catch(() => {
      logout();
    });
}
