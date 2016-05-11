import { Router } from 'meteor/iron:router';
import { _ } from 'meteor/underscore';
import { Template } from 'meteor/templating';

import '../../ui/main.js';
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
  template: 'listPost'
});

Router.route('/admin/posts/add', {
  name: 'add-post',
  template: 'addPost'
});

Router.route('/admin/posts/:id/edit', {
  name: 'edit-post',
  template: 'editPost'
});

Router.route('/admin/projects', {
  name: 'list-project',
  template: 'listProject'
});

Router.route('/admin/projects/add', {
  name: 'add-project',
  template: 'addProject'
});

Router.route('/admin/projects/:id/edit', {
  name: 'edit-project',
  template: 'editProject'
});
