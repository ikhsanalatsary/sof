import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { PostCategories, Posts, Projects, Tags } from './collections.js';

Meteor.methods({
  // Post categories Method
  'create.pcategory'(name) {
    check(name, String);

    const author = this.userId;

    var category = {
      name
    }

    if (category.name === '') {
      let nextLetter = 'A';
      category.name = 'Category ' + nextLetter;
      while (PostCategories.findOne({ name: category.name, author })) {
        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        category.name  = 'Category ' + nextLetter;
      }
    }

    PostCategories.insert(category);
  },
  'delete.pcategory'(categoryId) {
    check(categoryId, String);

    PostCategories.remove(categoryId);
  },
  'edit.pcategory'(name, categoryId) {
    check(name, String);
    check(categoryId, String);

    PostCategories.update(categoryId, {
      $set: {
        name
      }
    });
  },
  // Posts Method
  'create.post'(post) {
    var pattern = {
      title: String,
      body: String,
      pcategoryId: String,
      tags: [String]
    }
    check(post, pattern);

    Posts.insert(post);
  },
  'edit.post'(postId, post) {
    var pattern = {
      title: String,
      body: String,
      pcategoryId: String,
      tags: [String]
    }
    check(post, pattern);
    check(postId, String);

    Posts.update(postId, {
      $set: post
    });
  },
  'delete.post'(postId) {
    check(postId, String);

    Posts.remove(postId);
  },
  // Projects Method
  'create.project'(name, projectDate, client, type, description, projectImage) {
    check(name, String);
    check(projectDate, String);
    check(client, String);
    check(type, String);
    check(description, String);
    check(projectImage, String);

    if (projectImage !== '') {
      Projects.insert({
        name,
        description,
        client,
        type,
        projectDate,
        projectImage
      });
    } else {
      Projects.insert({
        name,
        description,
        client,
        type,
        projectDate
      });
    }
  },
  'edit.project'(projectId, name, projectDate, client, type, description, projectImage) {
    check(projectId, String);
    check(name, String);
    check(projectDate, String);
    check(client, String);
    check(type, String);
    check(description, String);
    check(projectImage, String);

    if (projectImage !== '') {
      Projects.update(projectId, {
        $set: {
          name,
          description,
          client,
          type,
          projectDate,
          projectImage,
        }
      });
    } else {
      Projects.update(projectId, {
        $set: {
          name,
          description,
          client,
          type,
          projectDate,
        }
      });
    }
  },
  'delete.project'(projectId) {
    check(projectId, String);

    Projects.remove(projectId);
  },
  // Tags Method
  'create.tag'(tags) {
    check(tags, [String]);

    return tags.forEach((tag) => {
      return Tags.insert({ tag });
    });
  },
  'delete.tag'(tagId) {
    check(tagId, String);

    Tags.remove(tagId);
  },
  'edit.tag'(tag, tagId) {
    check(tag, String);
    check(tagId, String);

    Tags.update(tagId, {
      $set: {
        tag
      }
    });
  }
});
