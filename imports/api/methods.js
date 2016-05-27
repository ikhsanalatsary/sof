import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { PostCategories, Posts, Projects } from './collections.js';

Meteor.methods({
  // Post categories Method
  'create.pcategory'(name) {
    check(name, String);

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
  'create.post'(title, body, pcategoryId, tags) {
    check(title, String);
    check(body, String);
    check(pcategoryId, String);
    check(tags, [String]);

    var posting = {
      title,
      body,
      pcategoryId,
      tags,
    }

    Posts.insert(posting);
  },
  'edit.post'(postId, title, body, pcategoryId, tags) {
    check(postId, String);
    check(title, String);
    check(body, String);
    check(pcategoryId, String);
    check(tags, [String]);

    Posts.update(postId, {
      $set: {
        title,
        body,
        pcategoryId,
        tags,
      }
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
  }
});
