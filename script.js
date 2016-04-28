var Cat = function(name, img) {
    this.name = name;
    this.img = img;
    this.clicks = 0;
}

CatsModel = function() {
    this._cats = [
        new Cat('First Cat', 'img/cat1.jpg'),
        new Cat('Second Cat', 'img/cat2.jpg'),
        new Cat('Itza', 'img/itza.jpg'),
        new Cat('Taj Mahal', 'img/taj.jpg'),
        new Cat('Giza Pyramids', 'img/pyramids.jpg')
    ];
    this._selected = -1;
}

CatsModel.prototype.getCats = function() {
    return this._cats;
}

CatsModel.prototype.getSelected = function() {
    return this._cats[this._selected];
}

CatsModel.prototype.setSelected = function(index) {
    this._selected = index;
}

CatsModel.prototype.incrementClicks = function() {
    this._cats[this._selected].clicks++;
}

// Manager that controls flow od data between views and model
var CatManager = function() {
    this.model = new CatsModel();
    this.listView = new ListView(this);
    this.detailView = new DetailView(this);
};

CatManager.prototype.init = function() {
    this.listView.render();
    this.detailView.init();
};

CatManager.prototype.getCatNames = function() {
    return this.model.getCats().map(function(cat) {
        return cat.name;
    });
}

// The callback to be called when list item is clicked.
CatManager.prototype.listCallback = function(index) {
    this.model.setSelected(index);
    this.detailView.render();
};

// Increment the clicks value of the cat and re-render the details.
CatManager.prototype.detailsCallback = function() {
    this.model.incrementClicks();
    this.detailView.render();
}

// Returns the currently selected cat object.
CatManager.prototype.getCurrentCat = function() {
    return this.model.getSelected();
}


// The view responsible for constructing and displaying the list
var ListView = function(controller) {
    this.listElem = document.getElementById('catsList');
    this.controller = controller;
}

// Construct the HTML List of cat names and set items listeners to the callback function
ListView.prototype.render = function() {
    var names = this.controller.getCatNames();
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

var controller = new CatManager();
controller.init();