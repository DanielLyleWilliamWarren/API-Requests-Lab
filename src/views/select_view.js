const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (dropDown) {
  this.dropDown = dropDown;
};

SelectView.prototype.bindingEvents = function () {
  PubSub.subscribe(`Countries:All-countries-ready`, (evt) => {
    const countries = evt.detail;
    this.populate(countries);
    this.dropDown.addEventListener('change', (evt) => {
      const selectedIndex = evt.target.value;
      PubSub.publish('SelectView:country-selected', selectedIndex);
    });
  });
};

SelectView.prototype.populate = function (countries) {
  countries.forEach( (country, index) => {
    const entry = document.createElement(`option`);
    entry.textContent = country.name;
    entry.value = index;
    this.dropDown.appendChild(entry);
  });
};




module.exports = SelectView;
