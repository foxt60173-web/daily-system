// ===== ربط العناصر =====
const username = document.getElementById("username");
const password = document.getElementById("password");
const msg = document.getElementById("msg");

// ===== تسجيل جديد =====
function register() {
  if (!username.value || !password.value) {
    msg.innerText = "اكتب اسم المستخدم وكلمة المرور";
    return;
  }

  localStorage.setItem("user_" + username.value, password.value);
  msg.innerText = "تم إنشاء الحساب بنجاح ✅";
}

// ===== تسجيل دخول =====
function login() {
  const savedPassword = localStorage.getItem("user_" + username.value);

  if (savedPassword === null) {
    msg.innerText = "المستخدم غير موجود ❌";
    return;
  }

  if (savedPassword === password.value) {
    localStorage.setItem("currentUser", username.value);
    window.location.href = "app.html";
  } else {
    msg.innerText = "كلمة المرور غلط ❌";
  }
}

// ===== حماية صفحة app.html =====
if (window.location.pathname.includes("app.html")) {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "index.html";
  }
}

// ===== تسجيل خروج =====
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
