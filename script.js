var clickCount = 0;
var countElem;
function initPage() {
    countElem = document.getElementById('clickCount');
    countElem.innerHTML = clickCount;
    var catElem = document.getElementById('cat');
    catElem.addEventListener('click', function() {
        clickCount++;
        countElem.innerHTML = clickCount;
    });
}

document.addEventListener('DOMContentLoaded', initPage, false);