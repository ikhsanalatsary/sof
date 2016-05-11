import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';

import './layout.html';
import './navbar.html';
import './home.html';
import './footer.html';

Template.body.onRendered(function() {
  require('../lib/jquery.counterup.min.js');
  require('../lib/jquery.nav.js');
  require('../lib/jquery.mixitup.js');
});

Template.layout.onRendered(function() {
  require('../lib/html5lightbox.js');
  require('../lib/main.js');
});
