import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { FlashMessages } from 'meteor/mrt:flash-messages';
import { moment } from 'meteor/momentjs:moment';

import { Posts } from '../../../api/collections.js';

import './add-post.html';
import './edit-post.html';
import './list-posts.html';

// Global helper
Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD-MM-YYYY');
});

Template.addPost.events({
  'submit .add-form'(event) {
    const target = event.target;
    const title = target.title.value;
    const body = target.body.value;
    var tags = target.tags.value;
    tags = tags.split(', ');
    console.log(tags);

    var posting = {
      title,
      body,
      tags,
    }

    Posts.insert(posting);

    FlashMessages.sendSuccess("Post Added");
    Router.go('/admin/posts');


    return false;
  }
});
