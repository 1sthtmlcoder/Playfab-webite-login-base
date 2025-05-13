const titleId = "1978A1"; // Your PlayFab title ID

function login(createAccount) {
  const customId = document.getElementById("customId").value.trim();
  const message = document.getElementById("message");

  message.textContent = "";
  message.style.color = "#4f46e5";

  if (!customId) {
    message.textContent = "Please enter a Custom ID.";
    message.style.color = "red";
    return;
  }

  fetch(`https://${titleId}.playfabapi.com/Client/LoginWithCustomID`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-PlayFabSDK": "JavaScriptSDK-1.0.0"
    },
    body: JSON.stringify({
      TitleId: titleId,
      CustomId: customId,
      CreateAccount: createAccount
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.data && data.data.SessionTicket) {
        localStorage.setItem("sessionTicket", data.data.SessionTicket); // Save token
        window.location.href = "home.html"; // Redirect to protected page
      } else {
        message.textContent = "Login failed.";
        message.style.color = "red";
      }
    })
    .catch(err => {
      message.textContent = "Network error.";
      message.style.color = "red";
    });
}
