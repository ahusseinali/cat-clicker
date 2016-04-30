var Cat = function(name, img) {
    this.name = ko.observable(name);
    this.img = ko.observable(img);
    this.clicks = ko.observable(0);
}

var CatViewModel = function() {
    this.cats = ko.observableArray([
        new Cat('First Cat', 'img/cat1.jpg'),
        new Cat('Second Cat', 'img/cat2.jpg'),
        new Cat('Itza', 'img/itza.jpg'),
        new Cat('Taj Mahal', 'img/taj.jpg'),
        new Cat('Giza Pyramids', 'img/pyramids.jpg')
    ]);
    this.selected = ko.observable(-1);
    this.isCatSelected = ko.computed(this.checkCatSelected, this);
    this.currentCat = ko.observable(null);
}

CatViewModel.prototype.checkCatSelected = function() {
    return this.selected() > -1;
}

CatViewModel.prototype.selectCat = function(index) {
    this.selected(index);
    this.currentCat(this.cats()[this.selected()]);
}

CatViewModel.prototype.incrementClicks = function() {
    if(this.selected() == -1) {
        return;
    }
    this.currentCat().clicks(this.currentCat().clicks() + 1);
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
    this.adminBtn = document.getElementById('adminBtn');
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

    this.adminBtn.addEventListener('click', (function(controller) {
        return function() {
            controller.adminClicked();
        }
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

AdminView = function(controller) {
    this.admin = document.getElementById('admin');
    this.nameTxt = document.getElementById('nameTxt');
    this.imgTxt = document.getElementById('imgTxt');
    this.clicksTxt = document.getElementById('clicksTxt');
    this.save = document.getElementById('save');
    this.cancel = document.getElementById('cancel');
    this.controller = controller;
};

// Add Event Listeners to Save and Cancel
AdminView.prototype.init = function() {
    this.cancel.addEventListener('click', (function(view) {
        return function() {
            view._hide();
        };
    })(this));
    this.save.addEventListener('click', (function(view) {
        return function() {
            view._save();
        };
    })(this));
};

AdminView.prototype.render = function() {
    var cat = this.controller.getCurrentCat();
    this.nameTxt.value = cat.name;
    this.imgTxt.value = cat.img;
    this.clicksTxt.value = cat.clicks;
    this.admin.style.display = 'block';
};

// Clear all text information and hide panel
AdminView.prototype._hide = function() {
    this.nameTxt.value = '';
    this.imgTxt.value = '';
    this.clicksTxt.value = '';
    this.admin.style.display = 'none';
    this.controller.adminHidden();
};

AdminView.prototype._save = function() {
    var cat = {};
    cat.name = this.nameTxt.value;
    cat.img = this.imgTxt.value;
    cat.clicks = this.clicksTxt.value;
    this.controller.updateSelected(cat);
    this._hide();
};

var viewModel = new CatViewModel();
ko.applyBindings(viewModel);