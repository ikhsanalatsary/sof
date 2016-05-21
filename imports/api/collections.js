import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { attachSchema } from 'meteor/aldeed:collection2';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';

export const PostCategories = new Mongo.Collection('pcategories');

const postCategoriesSchema = new SimpleSchema({
  name: {
    type: String,
    max: 100,
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
})

PostCategories.attachSchema(postCategoriesSchema);

export const Posts = new Mongo.Collection('posts');

Posts.attachSchema(new SimpleSchema({
  title: {
    type: String,
    max: 100,
  },
  body: {
    type: String,
    max: 100000,
  },
  tags:{
    type: [String],
    optional: true
  },
  pcategoryId: {
    type: String,
    max: 200,
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

export const Projects = new Mongo.Collection('projects');

Projects.attachSchema(new SimpleSchema({
  name: {
    type: String,
    max: 100,
  },
  description: {
    type: String,
    max: 1000,
  },
  client: {
    type: String,
    max: 100,
  },
  type: {
    type: String,
    max: 100,
  },
  projectDate: {
    type: String,
    max: 100,
    optional: true,
  },
  projectImage: {
    type: String,
    max: 100,
    optional: true,
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
