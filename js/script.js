var Cat = function(name, img) {
    this.name = ko.observable(name);
    this.img = ko.observable(img);
    this.clicks = ko.observable(0);
}

Cat.prototype.copyTo = function(obj) {
    obj.name = ko.observable(this.name());
    obj.img = ko.observable(this.img());
    obj.clicks = ko.observable(this.clicks());
}

Cat.prototype.copyFrom = function(obj) {
    this.name(obj.name());
    this.img(obj.img());
    this.clicks(parseInt(obj.clicks()));
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
    this.isAdminOn = ko.observable(false);
    this.adminCat = ko.observable(null);

};

CatViewModel.prototype.checkCatSelected = function() {
    return this.selected() > -1;
};

CatViewModel.prototype.selectCat = function(index) {
    this.selected(index);
    this.currentCat(this.cats()[this.selected()]);
    var catCopy = {};
    this.currentCat().copyTo(catCopy);
    this.adminCat(catCopy);

};

CatViewModel.prototype.incrementClicks = function() {
    if(this.selected() == -1) {
        return;
    }
    this.currentCat().clicks(this.currentCat().clicks() + 1);
    this.adminCat().clicks(this.currentCat().clicks());
};

CatViewModel.prototype.showAdmin = function() {
    this.isAdminOn(true);
}

CatViewModel.prototype.hideAdmin = function() {
    this.isAdminOn(false);
}

CatViewModel.prototype.saveAdmin = function() {
    this.currentCat().copyFrom(this.adminCat());
    this.hideAdmin();
}

var viewModel = new CatViewModel();
ko.applyBindings(viewModel);