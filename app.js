// ====================================================
// إعداد المستخدمين
// ====================================================
let users = JSON.parse(localStorage.getItem("users") || "[]");
let loggedUser = localStorage.getItem("loggedUser") || null;

// ====================================================
// التشفير البسيط (Base64)
function encryptPass(pass){
  return CryptoJS.SHA256(pass).toString();
}

// ====================================================
// التسجيل
function register(){
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  if(!u || !p){
    msg.innerText = "املأ البيانات";
    return;
  }

  if(users.find(user => user.username === u)){
    msg.innerText = "اسم المستخدم موجود بالفعل";
    return;
  }

  users.push({username:u, password:encryptPass(p), role:"User", tasks:[]});
  localStorage.setItem("users", JSON.stringify(users));
  msg.innerText = "تم التسجيل ✔";
}

// ====================================================
// تسجيل الدخول
function login(){
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  const user = users.find(user => user.username === u && user.password === encryptPass(p));
  if(user){
    loggedUser = u;
    localStorage.setItem("loggedUser", loggedUser);
    location.href = "app.html";
  } else {
    msg.innerText = "بيانات غلط ❌";
  }
}

// ====================================================
// تسجيل خروج
function logout(){
  localStorage.removeItem("loggedUser");
  location.href = "index.html";
}

// ====================================================
// حماية صفحة الداشبورد
if(location.pathname.includes("app.html")){
  if(!loggedUser){
    location.href = "index.html";
  } else {
    document.getElementById("user").innerText = loggedUser;
  }
}

// ====================================================
// المهام
function showTasks(){
  document.getElementById("taskSection").style.display = "block";
  document.getElementById("settingsSection").style.display = "none";
  renderTasks();
}

function addTask(){
  const input = document.getElementById("newTask");
  if(!input.value) return;
  const user = users.find(u => u.username === loggedUser);
  user.tasks.push(input.value);
  localStorage.setItem("users", JSON.stringify(users));
  input.value = "";
  renderTasks();
}

function renderTasks(){
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  const user = users.find(u => u.username === loggedUser);
  user.tasks.forEach((task, idx)=>{
    const li = document.createElement("li");
    li.innerText = task;
    li.onclick = ()=>{ removeTask(idx); };
    list.appendChild(li);
  });
}

function removeTask(idx){
  const user = users.find(u => u.username === loggedUser);
  user.tasks.splice(idx,1);
  localStorage.setItem("users", JSON.stringify(users));
  renderTasks();
}

// ====================================================
// الإعدادات
function showSettings(){
  document.getElementById("settingsSection").style.display = "block";
  document.getElementById("taskSection").style.display = "none";
}

// ====================================================
// Dark Mode
function toggleTheme(){
  document.body.classList.toggle("dark");
}
