import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { FlashMessages } from 'meteor/mrt:flash-messages';
import { moment } from 'meteor/momentjs:moment';
import swal from 'sweetalert';

import { Posts } from '../../../api/collections.js';

import '../../../../node_modules/sweetalert/dist/sweetalert.css';
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
    tags = tags.toLowerCase().trim().split(',');
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

Template.listPost.events({
  'click .create'(event) {
    Router.go('/admin/posts/add');
    setTimeout(() => {
      location.reload(true);
    }, 100);

    return false;
  },
  'click .delete_post'() {
    const post_id = this._id;
    swal({
        title: "Are you sure?",
        text: "You will delete this Post!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: "No, cancel it!",
        closeOnConfirm: true,
        closeOnCancel: false
    },
      (isConfirm) => {
        if (isConfirm) {
          Posts.remove(post_id, function(err) {
            if (!err) {
              swal("Success", "Your post deleted!", "success");
            } else {
              swal("Error!", err.reason, "error");
            }
          });
        } else {
          swal("Cancelled", "Your post is safe :)", "error");
          return;
        }
      });

    return false;
  },
  'click .edit_post'() {
    Router.go('/admin/posts/' + this._id + '/edit');
    setTimeout(() => {
      document.location.reload(true);
    }, 500);

    return false;
  },
});

Template.editPost.events({
  'submit .edit-form'(event) {
    const title = event.target.title.value;
    const body = document.getElementById('edit').value;
    var tags = event.target.tags.value;
    tags = tags.toLowerCase().trim().split(',');

    Posts.update(this._id, {
      $set: {
        title,
        body,
        tags,
      }
    }, function (err, result) {
      if (err) {
        FlashMessages.sendError(err.reason);
      }
      Router.go('/admin/posts');
    });


    return false;
  },
  'click .reload'() {
    location.reload(true);

    return false;
  }
});
