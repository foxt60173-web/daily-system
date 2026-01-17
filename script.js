// جلب اسم الخدمة من الرابط
const params = new URLSearchParams(window.location.search);
const service = params.get("service");

document.getElementById("serviceName").innerText =
    "حجز خدمة: " + service;

// عند ارسال الفورم
document.getElementById("bookingForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("تم إرسال طلبك بنجاح 🔥");
});
