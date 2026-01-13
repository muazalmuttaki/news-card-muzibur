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

// Copy-paste safe: সব text bold
headline.addEventListener('paste', function(e) {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertHTML', false, `<span style="font-weight:bold;">${text}</span>`);
});

// Auto-height adjust
headline.addEventListener('input', () => {
    headline.style.height = 'auto';
    headline.style.height = headline.scrollHeight + 'px';
});

// Download as PNG
function downloadPNG() {
    const card = document.getElementById('card');
    html2canvas(card, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'news-card.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}
