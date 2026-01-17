const params = new URLSearchParams(window.location.search);
const service = params.get("service");

document.getElementById("serviceName").innerText =
    service ? "حجز خدمة: " + service : "حجز خدمة";

document.getElementById("bookingForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("تم إرسال طلبك بنجاح");
});
