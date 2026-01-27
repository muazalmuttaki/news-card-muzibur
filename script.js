// ----------------------------
// Image Upload
// ----------------------------
const imgInput = document.getElementById('imgInput');
const mainImage = document.getElementById('mainImage');
const headline = document.querySelector('.headline');

function uploadImage() {
    imgInput.click();
}

imgInput.addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        mainImage.src = e.target.result;
        mainImage.classList.remove('placeholder');
    }
    reader.readAsDataURL(file);
});

// ----------------------------
// Headline: Paste Bold + Auto Height
// ----------------------------
headline.addEventListener('paste', function(e) {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertHTML', false, `<span style="font-weight:bold;">${text}</span>`);
});

headline.addEventListener('input', () => {
    headline.style.height = 'auto';
    headline.style.height = headline.scrollHeight + 'px';
});

// ----------------------------
// Download as PNG (Mobile-Safe)
// ----------------------------
function downloadPNG() {
    const card = document.getElementById('card');
    
    // ১. ডাউনলোডের জন্য সাময়িকভাবে ফিক্সড উইডথ সেট করা
    // যাতে মোবাইল স্ক্রিন ছোট হলেও কার্ডের রেশিও ঠিক থাকে
    const originalStyleWidth = card.style.width;
    card.style.width = '400px'; 

    html2canvas(card, {
        scale: 5,             // ছবির কোয়ালিটি অনেক শার্প আসবে
        useCORS: true,        // অনলাইন ইমেজ সাপোর্ট করবে
        allowTaint: false,
        logging: false,
        backgroundColor: null // ট্রান্সপারেন্সি বজায় রাখবে
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'news-card.png';
        link.href = canvas.toDataURL("image/png");
        link.click();

        // ২. ডাউনলোড শেষে আবার আগের (Responsive) অবস্থায় ফিরিয়ে নেওয়া
        card.style.width = originalStyleWidth;
    }).catch(err => {
        console.error("Download Error:", err);
        card.style.width = originalStyleWidth;
    });
}

// ----------------------------
// Dynamic Bengali Date (২৬ জানুয়ারি ২০২৬)
// ----------------------------
function toBengaliNumber(num) {
    const en = "0123456789";
    const bn = "০১২৩৪৫৬৭৮৯";
    return num.toString().split("").map(d => bn[en.indexOf(d)]).join("");
}

const bengaliMonths = [
    "জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন",
    "জুলাই","অগাস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"
];

function updateFooterDate() {
    const footerSpan = document.querySelector(".footer span[contenteditable='true']");
    if (!footerSpan) return;

    const today = new Date();
    const day = toBengaliNumber(today.getDate());
    const month = bengaliMonths[today.getMonth()];
    const year = toBengaliNumber(today.getFullYear());

    footerSpan.textContent = `${day} ${month} ${year}`;
}

// পেজ লোড হলে এবং প্রতি ঘন্টায় তারিখ আপডেট হবে
updateFooterDate();
setInterval(updateFooterDate, 60 * 60 * 1000);