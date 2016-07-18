import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';
import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';

import { Posts, Projects, PostCategories, Tags } from '../../api/collections.js';

import '../../ui/main.js';
import '../../ui/admin';

Router.configure({
  layoutTemplate: 'layout',
  yieldTemplates: {
    navbar: {to: 'navbar'},
    footer: {to: 'footer'},
  }
});

Router.route('/', {
  name: 'home',
  template: 'home',
  data() {
    let templateData = {
      posts: Posts.find({}, {sort: {updatedAt: -1}}),
      projects: Projects.find({}, {sort: {updatedAt: -1}})
    }
    return templateData;
  },
});

Router.route('/post/:_id', {
  name: 'post',
  template: 'post',
  data() {
    post_id = this.params._id;
    return Posts.findOne({_id: post_id})
  }
});

Router.route('/admin/posts/:page?', {
  name: 'list-post',
  template: 'listPost',
  layoutTemplate: 'adminLayout',
  data() {
    let templateData = {
      posts: Posts.findFromPublication('posts')
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

Router.route('/admin/posts/add/new', {
  name: 'add-post',
  template: 'addPost',
  layoutTemplate: 'adminLayout',
  onBeforeAction() {
    if (!Meteor.userId()) {
      // if the user is not logged in, render the Login template
      this.render('Login');
    } else {
      this.next();
    }
  },
  subscriptions() {
    return [Meteor.subscribe('editPcategory'), Meteor.subscribe('editTags')];
  },
});

Router.route('/admin/posts/:_id/edit', {
  name: 'edit-post',
  template: 'editPost',
  layoutTemplate: 'adminLayout',
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
  },
  subscriptions() {
    return [Meteor.subscribe('editPosts'), Meteor.subscribe('editPcategory'), Meteor.subscribe('editTags')];
  }
});

Router.route('/admin/projects/:page?', {
  name: 'list-project',
  template: 'listProject',
  layoutTemplate: 'adminLayout',
  data() {
    let templateData = {
      projects: Projects.findFromPublication('projects')
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

Router.route('/admin/projects/add/new', {
  name: 'add-project',
  template: 'addProject',
  layoutTemplate: 'adminLayout',
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
  layoutTemplate: 'adminLayout',
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
  },
  subscriptions() {
    return Meteor.subscribe('editProject');
  }
});

Router.route('admin/pcategory/:page?', {
  name: 'list-pcategories',
  template: 'listPcategories',
  layoutTemplate: 'adminLayout',
  data() {
    let templateData = {
      postCategories: PostCategories.findFromPublication('pcategories')
    }
    return templateData;
  }
});

Router.route('/admin/pcategory/add/new', {
  name: 'add-pcategory',
  template: 'addPcategory',
  layoutTemplate: 'adminLayout',
  onBeforeAction() {
    if (!Meteor.userId()) {
    // if the user is not loggedin, render the Login template
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
  layoutTemplate: 'adminLayout',
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
  },
  subscriptions() {
    return Meteor.subscribe('editPcategory');
  }
});

Router.route('/admin/tag/:page?', {
  name: 'list-tags',
  template: 'listTags',
  layoutTemplate: 'adminLayout',
  data() {
    let templateData = {
      tags: Tags.findFromPublication('tags')
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

Router.route('/admin/tag/add/new', {
  name: 'add-tag',
  template: 'addTag',
  layoutTemplate: 'adminLayout',
  onBeforeAction() {
    if (!Meteor.userId()) {
    // if the user is not loggedin, render the Login template
    this.render('Login');
    } else {
      // otherwise don't hold up the rest of hooks or our route/action function
      // from running
      this.next();
    }
  }
});

Router.route('/admin/tag/:_id/edit', {
  name: 'edit-tag',
  template: 'editTag',
  layoutTemplate: 'adminLayout',
  data() {
    const tag_id = this.params._id;
    return Tags.findOne({_id: tag_id});
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
  },
  subscriptions() {
    return Meteor.subscribe('editTags');
  }
});

Router.route('/admin', {
  name: 'login',
  template: 'login'
});
