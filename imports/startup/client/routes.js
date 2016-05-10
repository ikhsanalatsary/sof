import { Router } from 'meteor/iron:router';
import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';

import '../../ui/main.js';

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'home',
  template: 'home'
});
