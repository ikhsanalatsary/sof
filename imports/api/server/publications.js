import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { FindFromPublication } from 'meteor/percolate:find-from-publication';
import { PostCategories, Posts, Projects, Tags } from '../collections.js';

if (Meteor.isServer) {
  // This code only runs on the server
  FindFromPublication.publish('pcategories', function publications(skipCount) {
    Meteor._sleepForMs(500);
    const positiveIntegerCheck = Match.Where(function(x) {
      check(x, Match.Integer);
      return x >= 0;
    });

    check(skipCount, positiveIntegerCheck);

    Counts.publish(this, 'pcategoryCount', PostCategories.find(), {
      noReady: true
    });

    return PostCategories.find({}, {
      limit: parseInt(Meteor.settings.public.recordsPerPage),
      skip:skipCount
    });
  });

  FindFromPublication.publish('editPcategory', function publications() {
    return PostCategories.find();
  });

  FindFromPublication.publish('posts', function publications(skipCount) {
    Meteor._sleepForMs(500);
    const positiveIntegerCheck = Match.Where(function(x) {
      check(x, Match.Integer);
      return x >= 0;
    });

    check(skipCount, positiveIntegerCheck);

    Counts.publish(this, 'postCount', Posts.find(), {
      noReady: true
    });

    return Posts.find({}, {
      limit: parseInt(Meteor.settings.public.recordsPerPage),
      skip:skipCount
    });
  });

  Meteor.publish('editPosts', function publications() {
    return Posts.find();
  });


  FindFromPublication.publish('projects', function publications(skipCount) {
    Meteor._sleepForMs(500);
    const positiveIntegerCheck = Match.Where(function(x) {
      check(x, Match.Integer);
      return x >= 0;
    });

    check(skipCount, positiveIntegerCheck);

    Counts.publish(this, 'projectCount', Projects.find(), {
      noReady: true
    });

    return Projects.find({}, {
      limit: parseInt(Meteor.settings.public.recordsPerPage),
      skip:skipCount
    });
  });

  Meteor.publish('editProjects', function publications() {
    return Projects.find();
  });

  FindFromPublication.publish('tags', function publications(skipCount) {
    Meteor._sleepForMs(500);
    const positiveIntegerCheck = Match.Where(function(x) {
      check(x, Match.Integer);
      return x >= 0;
    });

    check(skipCount, positiveIntegerCheck);

    Counts.publish(this, 'tagsCount', Tags.find(), {
      noReady: true
    });

    return Tags.find({}, {
      limit: parseInt(Meteor.settings.public.recordsPerPage),
      skip:skipCount
    });
  });

  Meteor.publish('editTags', function publications() {
    return Tags.find();
  });
}
