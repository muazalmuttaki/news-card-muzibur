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
// Download as PNG (Sharp)
// ----------------------------
function downloadPNG() {
    const card = document.getElementById('card');
    html2canvas(card, {
        scale: 5,
        useCORS: true,
        allowTaint: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'news-card.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}
// html2canvas(card, { scale: 4, useCORS: true }).then(...)

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

// Load date on page load
updateFooterDate();
setInterval(updateFooterDate, 60*60*1000); // auto-update
