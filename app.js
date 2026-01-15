// تسجيل مستخدم
function register() {
  const u = username.value;
  const p = password.value;

  if (!u || !p) return msg.innerText = "املأ البيانات";

  localStorage.setItem("user_" + u, p);
  msg.innerText = "تم التسجيل بنجاح";
}

// تسجيل دخول
function login() {
  const u = username.value;
  const p = password.value;

  if (localStorage.getItem("user_" + u) === p) {
    localStorage.setItem("currentUser", u);
    location.href = "app.html";
  } else {
    msg.innerText = "بيانات خاطئة";
  }
}

// حماية الصفحة
if (location.pathname.includes("app.html")) {
  if (!localStorage.getItem("currentUser")) {
    location.href = "index.html";
  }
}

const user = localStorage.getItem("currentUser");
let tasks = JSON.parse(localStorage.getItem(user + "_tasks")) || [];
let history = JSON.parse(localStorage.getItem(user + "_history")) || [];

// عرض الأقسام
function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// إضافة مهمة
function addTask() {
  if (!taskInput.value) return;
  tasks.push(taskInput.value);
  save();
  render();
  taskInput.value = "";
}

// حفظ
function save() {
  localStorage.setItem(user + "_tasks", JSON.stringify(tasks));
  localStorage.setItem(user + "_history", JSON.stringify(history));
}

// عرض
function render() {
  taskList.innerHTML = "";
  historyList.innerHTML = "";

  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.innerHTML = t + " <button onclick='done(" + i + ")'>✔</button>";
    taskList.appendChild(li);
  });

  history.forEach(h => {
    const li = document.createElement("li");
    li.innerText = h;
    historyList.appendChild(li);
  });
}

// إنهاء مهمة
function done(i) {
  history.push(tasks[i]);
  tasks.splice(i, 1);
  save();
  render();
}

// خروج
function logout() {
  localStorage.removeItem("currentUser");
  location.href = "index.html";
}

render();
