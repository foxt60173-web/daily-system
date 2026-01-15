// تسجيل
function register() {
  const u = username.value;
  const p = password.value;
  localStorage.setItem("user", JSON.stringify({ u, p }));
  msg.innerText = "تم التسجيل ✔";
}

// دخول
function login() {
  const data = JSON.parse(localStorage.getItem("user"));
  if (!data) return msg.innerText = "مفيش حساب";
  if (username.value === data.u && password.value === data.p) {
    location.href = "app.html";
  } else {
    msg.innerText = "بيانات غلط";
  }
}

// خروج
function logout() {
  location.href = "index.html";
}

// مهام
function addTask() {
  const ul = document.getElementById("taskList");
  const li = document.createElement("li");
  li.innerHTML = `${taskInput.value} <button onclick="this.parentElement.remove()">❌</button>`;
  ul.appendChild(li);
  taskInput.value = "";
}

// مصروفات
function addExpense() {
  const ul = document.getElementById("expenseList");
  const li = document.createElement("li");
  li.innerHTML = `${expenseName.value} - ${expenseAmount.value} جنيه <button onclick="this.parentElement.remove()">❌</button>`;
  ul.appendChild(li);
  expenseName.value = expenseAmount.value = "";
}

// دخل
function addIncome() {
  const ul = document.getElementById("incomeList");
  const li = document.createElement("li");
  li.innerHTML = `${incomeName.value} + ${incomeAmount.value} جنيه <button onclick="this.parentElement.remove()">❌</button>`;
  ul.appendChild(li);
  incomeName.value = incomeAmount.value = "";
}
