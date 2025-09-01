function loadFooter() {
    fetch('footer.html')
        .then(r => r.text())
        .then(html => {
            document.getElementById('footer-placeholder').innerHTML = html;
        })
        .catch(e => console.error('Footer failed:', e));
}

window.addEventListener('DOMContentLoaded', loadFooter);
