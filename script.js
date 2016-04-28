var Cat = function(name, img) {
    this.name = name;
    this.img = img;
    this.clicks = 0;
}

// Manager that controls flow od data between views and model
var CatManager = function() {
    this.cats = [];
    this.selected = -1;
    this.listView = new ListView(this);
    this.detailView = new DetailView(this);
};

CatManager.prototype.add = function(name, pic) {
    this.cats.push(new Cat(name, pic));
    // this.listView.init(this.cats);
};

CatManager.prototype.init = function() {
    var catNames = this.cats.map(function(cat) {
        return cat.name;
    })
    this.listView.init(catNames);
    this.detailView.init();
};

// The callback to be called when list item is clicked.
CatManager.prototype.listCallback = function(index) {
    this.selected = index;
    this.detailView.render();
};

// Increment the clicks value of the cat and re-render the details.
CatManager.prototype.detailsCallback = function() {
    this.cats[this.selected].clicks++;
    this.detailView.render();
}

// Returns the currently selected cat object.
CatManager.prototype.getCurrentCat = function() {
    if(this.selected < 0 || this.selected >= this.cats.length) {
        return null;
    }

    return this.cats[this.selected];
}


// The view responsible for constructing and displaying the list
var ListView = function(controller) {
    this.listElem = document.getElementById('catsList');
    this.controller = controller;
}

// Construct the HTML List of cat names and set items listeners to the callback function
ListView.prototype.init = function(names) {
    var index = 0;
    var self = this;
    this.listElem.innerHTML = '';
    names.forEach(function(name) {
        var item = document.createElement('li');
        item.textContent = name;
        self.listElem.appendChild(item);
        item.addEventListener('click', (function(curIndex, controller) {
            return function() {
                controller.listCallback(curIndex);
            };
        })(index, self.controller));
        index++;
    });
};

// The view responsible for rendering the Cat details
var DetailView = function(controller) {
    this.detailsElem = document.getElementById('details');
    this.nameElem = document.getElementById('name');
    this.picElem = document.getElementById('pic');
    this.clicksElem = document.getElementById('clicks');
    this.controller = controller;
}

// Initially hide the details section and attach listener to click event
DetailView.prototype.init = function() {
    this.detailsElem.style.display = 'none';
    this.picElem.addEventListener('click', (function(controller) {
        return function() {
            controller.detailsCallback();
        };
    })(this.controller));
};

// Render the details into the details section
DetailView.prototype.render = function() {
    var cat = this.controller.getCurrentCat();
    if(cat) {
        this.detailsElem.style.display = 'block';
        this.nameElem.textContent = cat.name;
        this.picElem.setAttribute('src', cat.img);
        this.picElem.setAttribute('alt', cat.name);
        this.clicksElem.textContent = cat.clicks;
    } else {
        this.detailsElem.style.display = 'none';
    }
};

// Main Entry Point to Creating and handling the cats list.
function initPage() {
    var catImages = [
        'img/cat1.jpg',
        'img/cat2.jpg',
        'img/itza.jpg',
        'img/taj.jpg',
        'img/pyramids.jpg'
    ];
    var catNames = ['First Cat', 'Second Cat', 'Itza', 'Taj Mahal', 'Pyramids of Giza'];
    var controller = new CatManager();
    for(var i=0; i < catImages.length; i++) {
        controller.add(catNames[i], catImages[i]);
    }

    controller.init();
}

document.addEventListener('DOMContentLoaded', initPage, false);