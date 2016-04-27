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
    catDiv.id = 'cat_' + this.id;
    var name = document.createElement('div');
    name.innerHTML = this.name;
    catDiv.appendChild(name);
    catDiv.style.display = 'none';
    var img = document.createElement('img');
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

// Class for Cat List Generator
var CatList = function(names, images) {
    this.cats = [];
    for(var i=0; i < names.length; i++) {
        this.cats.push(new Cat(i, names[i], images[i]));
    }

    this.selectedIndex = -1;
    // Initialize Cat List
    this._init();
}

// Initialize the Ordered List of Cats and add event listeners.
CatList.prototype._init = function() {
    var listElem = document.getElementById('catsList');
    var self = this;
    this.cats.forEach(function(cat) {
        var item = document.createElement('li');
        item.textContent = cat.name;
        listElem.appendChild(item);
        item.addEventListener('click', function() {
            self._renderCat(cat);
        });
    });
}

// Renders the cat details
CatList.prototype._renderCat = function(cat) {
    if(this.selectedIndex >= 0) {
        // Hide the current cat.
        this._hideCat(this.cats[this.selectedIndex])
    }
    if(cat) {
        console.log(cat);
        var catElem = document.getElementById('cat_' + cat.id);
        catElem.style.display = 'block';
    }
    this.selectedIndex = cat ? cat.id : -1;
};

// Hide the cat div if another cat is selected
CatList.prototype._hideCat = function(cat) {
    if(cat) {
        var catElem = document.getElementById('cat_' + cat.id);
        catElem.style.display = 'none';
    }
}

// Main Entry Point to Creating and handling the cats list.
function initPage() {
    var catImages = ['img/cat1.jpg', 'img/cat2.jpg'];
    var catNames = ['First Cat', 'Second Cat'];
    var catList = new CatList(catNames, catImages);
}

document.addEventListener('DOMContentLoaded', initPage, false);