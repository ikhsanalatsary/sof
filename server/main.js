import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import User from '../users-config.json';

import { PostCategories, Posts, Projects } from '../imports/api/collections.js'

Meteor.startup(() => {
  // code to run on server at startup
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser(User);
  }
});
