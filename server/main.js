import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import User from '../users-config.json';

Meteor.startup(() => {
  // code to run on server at startup
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser(User);
  }
});
