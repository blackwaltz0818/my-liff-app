const liffId = "2006803441-xV1l56qn"; // 替換為您的 LIFF ID

document.addEventListener("DOMContentLoaded", () => {
  // 初始化 LIFF
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

  // 登入按鈕
  document.getElementById("loginButton").addEventListener("click", () => {
    liff.login();
  });

  // 登出按鈕
  document.getElementById("logoutButton").addEventListener("click", () => {
    liff.logout();
    window.location.reload();
  });

  // 發送訊息按鈕
  document.getElementById("sendButton").addEventListener("click", () => {
    // 確認是否授權發送訊息
    if (!liff.isApiAvailable("chat_message.write")) {
      alert("chat_message.write 功能未啟用，請確認設定！");
      return;
    }
    liff
      .sendMessages([
        {
          type: "text",
          text: "這是一則來自 LIFF 應用的測試訊息！",
        },
      ])
      .then(() => {
        alert("訊息發送成功！");
      })
      .catch((err) => {
        console.error("訊息發送失敗：", err);
        alert(`訊息發送失敗：${err.message}`);
      });
  });
});

// 顯示使用者個人資訊
function displayUserProfile() {
  liff
    .getProfile()
    .then((profile) => {
      // 隱藏登入按鈕，顯示其他按鈕
      document.getElementById("loginButton").style.display = "none";
      document.getElementById("logoutButton").style.display = "block";
      document.getElementById("sendButton").style.display = "block";
      document.getElementById("userProfile").style.display = "block";

      // 更新使用者資訊
      document.getElementById("userPicture").src = profile.pictureUrl;
      document.getElementById(
        "userId"
      ).textContent = `User ID: ${profile.userId}`;
      document.getElementById(
        "userName"
      ).textContent = `Name: ${profile.displayName}`;
      document.getElementById("userStatus").textContent = `Status: ${
        profile.statusMessage || "No status message"
      }`;
    })
    .catch((err) => console.error("Error getting profile", err));
}
