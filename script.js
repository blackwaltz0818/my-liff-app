const liffId = "2006803441-xV1l56qn"; // 替換為您的 LIFF ID

document.addEventListener("DOMContentLoaded", () => {
  liff
    .init({ liffId })
    .then(() => {
      console.log("LIFF initialized");
      if (liff.isLoggedIn()) {
        displayUserProfile();
      } else {
        document.getElementById("loginButton").style.display = "block";
      }
    })
    .catch((err) => console.error("LIFF initialization failed", err));

  document.getElementById("loginButton").addEventListener("click", () => {
    liff.login();
  });

  document.getElementById("logoutButton").addEventListener("click", () => {
    liff.logout();
    window.location.reload();
  });

  // 發送訊息
  document.getElementById("sendButton").addEventListener("click", () => {
    liff
      .sendMessages([
        {
          type: "text",
          text: "這是一則來自 LIFF 應用的訊息！",
        },
      ])
      .then(() => {
        alert("訊息發送成功！");
      })
      .catch((err) => {
        console.error("訊息發送失敗：", err);
      });
  });
});

function displayUserProfile() {
  liff
    .getProfile()
    .then((profile) => {
      document.getElementById("loginButton").style.display = "none";
      document.getElementById("logoutButton").style.display = "block";
      document.getElementById("sendButton").style.display = "block";
      document.getElementById("userProfile").style.display = "block";
      document.getElementById("userPicture").src = profile.pictureUrl;
      document.getElementById(
        "userId"
      ).textContent = `userId: ${profile.userId}`;

      document.getElementById(
        "userName"
      ).textContent = `Name: ${profile.displayName}`;
      document.getElementById("userStatus").textContent = `Status: ${
        profile.statusMessage || "No status message"
      }`;
    })
    .catch((err) => console.error("Error getting profile", err));
}
