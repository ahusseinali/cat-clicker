var Cat = function(id, name, img) {
    this.name = name;
    this.id = id;
    this.img = img;
    this.clicks = 0;

    // Initialize DOM Tree with Cat Information.
    var catImgElem = this._init();
    var self = this;
    // Listen to click event on the cat image
    catImgElem.addEventListener('click', function() {
        self._clicked();
    });
}

// Construct DOM elements for the cat
// Element Should look like this:
// <div>
//     <div>Cat Name</div>
//     <img src="cat_image_file" alt="Cat Name">
//     <div>Number of Clicks <span id="some_id">NumOfClicks</span>
// </div>
//
// Returns: The Image to be listened to when clicked.
Cat.prototype._init = function() {
    var catDiv = document.createElement('div');
    var name = document.createElement('div');
    name.innerHTML = this.name;
    catDiv.appendChild(name);

    var img = document.createElement('img');
    img.id = this.id;
    img.setAttribute('src', this.img);
    img.setAttribute('alt', this.name);
    catDiv.appendChild(img);

    var clicksDiv = document.createElement('div');
    var clicksText = document.createTextNode('Number of Clicks ');
    var clicksCount = document.createElement('span');
    clicksCount.id = 'click_' + this.id;
    clicksCount.innerHTML = this.clicks;
    clicksDiv.appendChild(clicksText);
    clicksDiv.appendChild(clicksCount);
    catDiv.appendChild(clicksDiv);

    document.body.appendChild(catDiv);
    return img;
}

// handler for the clicked event of the Cat object
Cat.prototype._clicked = function() {
    this.clicks++;
    var catElem = document.getElementById('click_' + this.id);
    catElem.innerHTML = this.clicks;
};

function initPage() {
    var cat1 = new Cat('cat1', 'First Cat', 'img/cat1.jpg');
    var cat2 = new Cat('cat2', 'Second Cat', 'img/cat2.jpg');
}

document.addEventListener('DOMContentLoaded', initPage, false);