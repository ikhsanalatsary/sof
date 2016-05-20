import { Router } from 'meteor/iron:router';
import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';

import { Posts, Projects, PostCategories } from '../../api/collections.js';

import '../../ui/main.js';
import '../../ui/admin/pcategories/pcategories.js';
import '../../ui/admin/posts/posts.js';
import '../../ui/admin/projects/projects.js';

Router.configure({
  layoutTemplate: 'layout',
  yieldTemplates: {
    navbar: {to: 'navbar'},
    footer: {to: 'footer'},
  }
});

Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/admin/posts', {
  name: 'list-post',
  template: 'listPost',
  data() {
    let templateData = {
      posts: Posts.find({}, {sort: {updatedAt: -1}})
    }
    return templateData;
  },
  onBeforeAction() {
    if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('Login');
    } else {
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
    }
  }
});

Router.route('/admin/posts/add', {
  name: 'add-post',
  template: 'addPost',
  onBeforeAction() {
    if (!Meteor.userId()) {
      // if the user is not logged in, render the Login template
      this.render('Login');
    } else {
      this.next();
    }


  }
});

Router.route('/admin/posts/:_id/edit', {
  name: 'edit-post',
  template: 'editPost',
  data() {
    const post_id = this.params._id;
    return Posts.findOne({_id: post_id});
  },
  onBeforeAction() {
    if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('Login');
    } else {
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
    }
  }
});

Router.route('/admin/projects', {
  name: 'list-project',
  template: 'listProject',
  data() {
    let templateData = {
      projects: Projects.find({}, {sort: {updatedAt: -1}})
    }
    return templateData;
  },
  onBeforeAction() {
    if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('Login');
    } else {
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
    }
  }
});

Router.route('/admin/projects/add', {
  name: 'add-project',
  template: 'addProject',
  onBeforeAction() {
    if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('Login');
    } else {
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
    }
  }
});

Router.route('/admin/projects/:_id/edit', {
  name: 'edit-project',
  template: 'editProject',
  data() {
    const project_id = this.params._id;
    return Projects.findOne({_id: project_id});
  },
  onBeforeAction() {
    if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('Login');
    } else {
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
    }
  }
});

Router.route('admin/pcategory/', {
  name: 'list-pcategories',
  template: 'listPcategories',
  data() {
    let templateData = {
      postCategories: PostCategories.find({}, {sort: {updatedAt: -1}})
    }
    return templateData;
  },
});

Router.route('/admin/pcategory/add', {
  name: 'add-pcategory',
  template: 'addPcategory',
  onBeforeAction() {
    if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('Login');
    } else {
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
    }
  }
});

Router.route('/admin/pcategory/:_id/edit', {
  name: 'edit-pcategory',
  template: 'editPcategory',
  data() {
    const pcategory_id = this.params._id;
    return PostCategories.findOne({_id: pcategory_id});
  },
  onBeforeAction() {
    if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('Login');
    } else {
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
    }
  }
});


Router.route('/admin', {
  name: 'login',
  template: 'login'
})
