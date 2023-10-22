const modal = document.getElementById('myModal');

const modalImg = document.getElementById('modalImg');
const captionText = document.getElementById('caption');
document.getElementById("close").addEventListener('click', function () {
  modal.style.display = "none";
});

document.querySelectorAll('#gallery img').forEach(function (img) {
    img.addEventListener('click', function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    });
});