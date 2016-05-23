import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { FlashMessages } from 'meteor/mrt:flash-messages';

import { Posts } from '../api/collections.js';

import './layout.html';
import './navbar.html';
import './login.html';
import './home.html';
import './footer.html';

Template.registerHelper('indoDate', function(date) {
  return moment(date).format('ll');
});

Template.registerHelper('getAuthor', function(authorId) {
  return Meteor.users.findOne(authorId).username;
});

Template.body.onRendered(function() {
  require('../lib/jquery.counterup.min.js');
  require('../lib/jquery.nav.js');
  require('../lib/jquery.mixitup.js');
});

Template.layout.onRendered(function() {
  require('../lib/html5lightbox.js');
  require('../lib/main.js');
});

Template.home.onRendered(function() {
  var _this = this;
  this.autorun(function(c) {
    if (Posts.find().count() > 0) {
      var owl = _this.$("#blog-post");
      owl.owlCarousel({
        autoPlay : 5000,
				items : 3,
				responsiveClass:true,
				responsive: {
					0:{
							items : 1
					},
					480:{
							items : 1
					},
					768:{
							items : 3
					},
					1200:{
							items: 3
					}
				}
      });
      c.stop();
    }
  });
});

Template.login.events({
  'submit .login-form'(event) {

    const target = event.target;
    const username = target.username.value;
    const password = target.password.value;

    Meteor.loginWithPassword(username, password, function login(err) {
      if (err) {
        target.username.value = username;
        target.password.value = password;
        FlashMessages.sendError(err.reason);
        console.error(err.reason);
      } else {
        FlashMessages.sendSuccess("You are now logged in");
        Router.go('/admin/projects');
      }

      target.username.value = '';
      target.password.value = '';
    });

    return false;
  }
});

Template.layout.events({
  'click .logout'(event) {
    Meteor.logout();
    Router.go('/');
    return false
  },
});


moment().format('ll');
