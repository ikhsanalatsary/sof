import { Template } from 'meteor/templating';

import './style.css';
import './admin-layout.html';
import './sidenav.html';
import './projects/projects.js';
import './posts/posts.js';
import './pcategories/pcategories.js';

Template.adminLayout.onRendered(function() {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
      isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {

      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }

  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });
});

Template.adminLayout.events({
  'click .logout'(event) {
    Meteor.logout();
    Router.go('/');
    return false
  },
});
