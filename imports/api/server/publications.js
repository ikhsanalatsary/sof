import { Meteor } from 'meteor/meteor';
import { PostCategories, Posts, Projects } from '../collections.js';

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('pcategories', function publications() {
    return PostCategories.find();
  });

  Meteor.publish('posts', function publications() {
    return Posts.find();
  });

  Meteor.publish('projects', function publications() {
    return Projects.find();
  });

}
