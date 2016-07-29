import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-dict';
import { $ } from 'meteor/jquery';
import { FlashMessages } from 'meteor/mrt:flash-messages';

import { Posts, Projects, PostCategories, Tags } from '../api/collections.js';

import './layout.html';
import './navbar.html';
import './login.html';
import './home.html';
import './posts.html';
import './post.html';
import './footer.html';

Template.registerHelper('indoDate', function(date) {
  return moment(date).format('ll');
});

Template.registerHelper('getAuthor', function(authorId) {
  var user = Meteor.users.findOne(authorId);
  var profile = user && user.profile && user.profile.name
  return profile;
});

Template.registerHelper('summary', function(body) {
  if (body.length > 1000) {
    return body = body.slice(0, -1000);
  }
  return body;
});

Template.home.onCreated(function subscriptions() {
  return [Meteor.subscribe('editPosts'), Meteor.subscribe('editProjects')];
});

Template.posts.onCreated(function() {
  let template = this;
  this.autorun(function () {
    template.limitPosts = new ReactiveDict();
  });
});

Template.posts.onRendered(function() {
  let template = this;
  this.autorun(function () {
    template.limitPosts.set('postsLimit', 10);
    function showMoreVisible() {
      var threshold, target = $("#show-post");
      if (!target.length) return;

      threshold = $(window).scrollTop() + $(window).height() - target.height();

      if (target.offset().top < threshold) {
        if (!target.data("visible")) {
          // console.log("target became visible (inside viewable area)");
          target.data("visible", true);
          template.limitPosts.set('postsLimit', template.limitPosts.get('postsLimit') + 5);
        }
      } else {
        if (target.data("visible")) {
          // console.log("target became invisible (below viewable area)");
          target.data("visible", false);
        }
      }
    }
    $(window).scroll(showMoreVisible);
  });
});

Template.posts.helpers({
  posts() {
    return Posts.find({}, {sort: {createdAt: -1}, limit: Template.instance().limitPosts.get('postsLimit')})
  }
});

Template.post.helpers({
  pcategories() {
    return PostCategories.find();
  },
  tagNames() {
    const taglist = this.tags;
    return taglist.map(function(tagId) {
      const query = Tags.findOne({_id: tagId});
      return query;
    });
  },
  Tags() {
    return Tags.find({});
  }
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
    if (Projects.find().count() > 0) {
      _this.$('#mixed-items').mixItUp();
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
