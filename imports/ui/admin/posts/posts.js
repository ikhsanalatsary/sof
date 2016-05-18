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
  return moment(date).format('DD-MM-YYYY, h:mm:ss a');
});

// Render Template
Template.addPost.onRendered(function() {
  tinymce.init({
    selector: 'textarea',
    plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table contextmenu paste"
    ],
    image_caption: true,
    file_browser_callback: function(field_name, url, type, win) {
      if(type =='image') {
        filepicker.pick(function(Blob){
          win.document.getElementById(field_name).value = Blob.url;
          console.log(Blob.url);
        });
      }
    },
    skin_url: '/packages/teamon_tinymce/skins/lightgray',
  });
});

Template.editPost.onRendered(function() {
  tinymce.init({
    selector: 'textarea',
    plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table contextmenu paste"
    ],
    image_caption: true,
    file_browser_callback: function(field_name, url, type, win) {
      if(type =='image') {
        filepicker.pick(function(Blob){
          win.document.getElementById(field_name).value = Blob.url;
          console.log(Blob.url);
        });
      }
    },
    skin_url: '/packages/teamon_tinymce/skins/lightgray',
  });
});

// Events
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
  },
  'click .reload'() {
    location.reload(true);

    return false;
  }
});

Template.listPost.events({
  'click .delete_post'(event) {
    event.preventDefault();
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
