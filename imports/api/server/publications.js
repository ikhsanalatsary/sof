import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { FindFromPublication } from 'meteor/percolate:find-from-publication';
import { PostCategories, Posts, Projects } from '../collections.js';

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

  Meteor.publish('posts', function publications() {
    return Posts.find();
  });

  Meteor.publish('projects', function publications() {
    return Projects.find();
  });

}
