document.addEventListener("DOMContentLoaded", function () {
    // تفعيل الوضع الداكن إذا كان مفعلًا من قبل
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    // تحديث الساعة بتنسيق 12 ساعة
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let period = "AM";

        // تحويل إلى تنسيق 12 ساعة
        if (hours >= 12) {
            period = "PM";
            if (hours > 12) {
                hours -= 12; // تحويل من 24 ساعة إلى 12 ساعة
            }
        } else if (hours === 0) {
            hours = 12; // الساعة 12 مساءً وليس 0
        }

        // إضافة صفر أمام الأرقام الصغيرة
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;

        // تجميع الوقت مع إضافة AM/PM
        const timeString = `${hours}:${minutes}:${seconds} ${period}`;

        // تحديث محتوى الساعة
        document.getElementById('clock').textContent = timeString;
    }

    // تحديث الساعة فور تحميل الصفحة
    updateClock();  // التحديث الأول مباشرة
    setInterval(updateClock, 1000);  // التحديث كل ثانية

    // تفعيل الوضع الداكن عند الضغط على الزر
    const toggleDarkMode = document.getElementById("toggleDarkMode");
    if (toggleDarkMode) {
        toggleDarkMode.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        });
    }

    // إظهار زر الرجوع للأعلى عند التمرير للأسفل
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        window.addEventListener("scroll", function () {
            backToTop.style.display = window.scrollY > 200 ? "block" : "none";
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // تشغيل AOS إذا كانت المكتبة محملة
    if (typeof AOS !== "undefined") {
        AOS.init();
    } else {
        console.error("❌ خطأ: مكتبة AOS غير محملة. تأكد من تحميلها في <head> بملف HTML.");
    }

    // تحديد جميع الروابط في شريط التنقل
    const bodyClass = document.body.classList[0]; // الحصول على الـ class الأول (مثل page-services)
    const navLinks = document.querySelectorAll(".nav-links a");

    // إزالة الفئة "active" من جميع الروابط
    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    // إضافة الفئة "active" للرابط الذي يتوافق مع الـ class الحالي للـ body
    navLinks.forEach(link => {
        if (link.href.includes(bodyClass)) {
            link.classList.add("active");
        }
    });
});
