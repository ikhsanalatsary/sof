import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { attachSchema, SimpleSchema } from 'meteor/aldeed:collection2';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String,
    max: 100,
  },
  body: {
    type: String,
    max: 1000,
  },
  tags:{
    type: [String],
    optional: true
  },
  author: {
    type: String,
    autoValue() {
      return Meteor.userId();
    },
  },
  updatedAt: {
    type: Date,
    autoValue() {
      return new Date();
    },
  },
}));
