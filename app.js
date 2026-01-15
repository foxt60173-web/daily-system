// ===== تسجيل الدخول =====
function register() {
  const u = username.value;
  const p = password.value;

  if (!u || !p) return msg.innerText = "اكتب البيانات";

  localStorage.setItem("user_" + u, p);
  msg.innerText = "تم إنشاء الحساب ✔";
}

function login() {
  const u = username.value;
  const p = password.value;

  if (localStorage.getItem("user_" + u) === p) {
    localStorage.setItem("currentUser", u);
    location.href = "app.html";
  } else {
    msg.innerText = "بيانات غلط ❌";
  }
}

// ===== حماية الصفحة =====
if (location.pathname.includes("app.html")) {
  if (!localStorage.getItem("currentUser")) {
    location.href = "login.html";
  }
}

// ===== عرض الأقسام =====
function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ===== المهام =====
const user = localStorage.getItem("currentUser");
let tasks = JSON.parse(localStorage.getItem(user + "_tasks")) || [];
let history = JSON.parse(localStorage.getItem(user + "_history")) || [];

function save() {
  localStorage.setItem(user + "_tasks", JSON.stringify(tasks));
  localStorage.setItem(user + "_history", JSON.stringify(history));
}

function addTask() {
  if (!taskInput.value) return;

  const date = new Date().toLocaleDateString();
  tasks.push({ text: taskInput.value, date });

  history.push("📋 مهمة: " + taskInput.value + " (" + date + ")");
  taskInput.value = "";
  save();
  render();
}

function deleteTask(i) {
  history.push("❌ حذف مهمة: " + tasks[i].text);
  tasks.splice(i, 1);
  save();
  render();
}

function render() {
  taskList.innerHTML = "";
  historyList.innerHTML = "";

  tasks.forEach((t, i) => {
    taskList.innerHTML += `
      <li>
        ${t.text} - ${t.date}
        <button onclick="deleteTask(${i})">❌</button>
      </li>
    `;
  });

  history.forEach(h => {
    historyList.innerHTML += `<li>${h}</li>`;
  });
}

function logout() {
  localStorage.removeItem("currentUser");
  location.href = "login.html";
}

render();
