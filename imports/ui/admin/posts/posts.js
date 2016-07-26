import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { FlashMessages } from 'meteor/mrt:flash-messages';
import { moment } from 'meteor/momentjs:moment';
import swal from 'sweetalert';

import { Posts, PostCategories, Tags } from '../../../api/collections.js';

import 'filepicker-js';
import '../../../../node_modules/sweetalert/dist/sweetalert.css';
import './add-post.html';
import './edit-post.html';
import './list-posts.html';

// Global helper
filepicker.setKey("AXYh60O8qQ1SFWA3lvR4kz");

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD-MM-YYYY, h:mm:ss a');
});

Template.registerHelper('categoryName', function(pcategoryId) {
  // teknik guarding
  // http://seanmonstar.com/post/707078771/guard-and-default-operators
  // http://stackoverflow.com/questions/25758476/exception-in-template-helper-typeerror-cannot-read-property-profile-of-undef
  var category = PostCategories.findOne({_id: pcategoryId});
  var name = category && category.name;
  return name;
});

Template.registerHelper('getTagName', function(arrTag) {
  if (typeof arrTag !== 'undefined') {
    return getTagNames(arrTag);
  }
    return 'UNDEFINED';
});

Template.listPost.onCreated(function() {
  let template = this;
  this.autorun(function () {
    const skipCount = (currentPage() - 1) * Meteor.settings.public.recordsPerPage;
    template.subscribe('posts', skipCount);
  });
});

Template.addPost.onCreated(function() {
  let template = this;
  this.autorun(function () {
    template.showTag = new ReactiveDict();
  });
});

Template.editPost.onCreated(function() {
  let template = this;
  this.autorun(function () {
    template.showTag = new ReactiveDict();
  });
});

// Render Template
var renderTimeout = false;
Template.addPost.onRendered(function() {
  const template = this;
  template.autorun(function() {
    template.$(function () {
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

    template.tags = Tags.find({}).fetch();
    if (renderTimeout !== false) {
      Meteor.clearTimeout(renderTimeout);
    }
    renderTimeout = Meteor.setTimeout(function() {
      template.$('.selectpicker').selectpicker("refresh");
      renderTimeout = false;
    }, 10);

    template.showTag.set('tags', template.tags);
  });
});

Template.editPost.onRendered(function() {
  const template = this;
  template.autorun(function() {
    template.$(function () {
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
    template.tags = Tags.find({}).fetch();
    if (renderTimeout !== false) {
      Meteor.clearTimeout(renderTimeout);
    }
    renderTimeout = Meteor.setTimeout(function() {
      template.$('.selectpicker').selectpicker("refresh");
      renderTimeout = false;
    }, 10);

    template.showTag.set('tags', template.tags);
  });
});

// Template Helper
Template.listPost.helpers({
  prevPage() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    return Router.routes['list-post'].path({page: previousPage});
  },
  nextPage() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    return Router.routes['list-post'].path({page: nextPage});
  },
	prevPageClass() {
    return currentPage() <= 1 ? "disabled" : "";
  },
  nextPageClass() {
    return hasMorePages() ? "" : "disabled";
  }
});

Template.addPost.helpers({
  'pCategories'() {
    return PostCategories.find({});
  },
  'showTag'() {
    return Template.instance().showTag.get('tags');
  }
});

Template.editPost.helpers({
  'pCategories'() {
    return PostCategories.find({});
  },
  'showTag'() {
    return Template.instance().showTag.get('tags');
  }
});

// Events
Template.addPost.events({
  'submit .add-form'(event) {
    event.preventDefault();
    const target = event.target;
    const title = target.title.value;
    const body = target.body.value;
    const pcategoryId = target.pcategory.value;
    var tags = $('.selectpicker').val();

    const posting = {
      title,
      body,
      pcategoryId,
      tags,
    }

    Meteor.call('create.post', posting, (err, _id) => {
      if (!err) {
        console.log(_id);
        FlashMessages.sendSuccess("Post Added");
        Router.go('/admin/posts');
      } else {
        console.log(err.reason);
        FlashMessages.sendError(err.reason);
      }
    });

    return false;
  },
  'click .reload'() {
    location.reload(true);

    return false;
  },
  'click #addtag'(event) {
    event.preventDefault();
    var tag = $('#tag').val();
    const tags = tag.toLowerCase().trim().split(',');

    Meteor.callPromise('create.tag', tags)
      .then((result) => {
        $('#myModal').modal('hide');
        $('#tag').val('');
        FlashMessages.sendSuccess("Tag Added");
      })
      .catch((error) => console.error(error));

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
          Meteor.call('delete.post', post_id, (err, result) => {
            if (!err) {
              FlashMessages.sendSuccess("Post deleted");
              swal("Success", "Your post deleted!", "success");
            } else {
              FlashMessages.sendError(err.reason);
              swal("Error!", err.reason, "error");
            }
          });
        } else {
          swal("Cancelled", "Your post is safe :)", "error");
          return;
        }
      });
  },
  'click .reload'() {
    location.reload(true);

    return false;
  },
});

Template.editPost.events({
  'submit .edit-form'(event) {
    const post_id = this._id;
    const title = event.target.title.value;
    const body = document.getElementById('edit').value;
    const pcategoryId = event.target.pcategory.value;
    var oldtags = $('#oldvals').val();
    var newtags = $('.selectpicker').val();
    var tags = oldtags.split(',');
    tags = tags.concat(newtags);

    const posting = {
      title,
      body,
      pcategoryId,
      tags
    }

    Meteor.call('edit.post', post_id, posting, (err, result) => {
      if (err) {
        console.log(err.reason);
        FlashMessages.sendError(err.reason);
      } else {
        console.log(result);
        FlashMessages.sendSuccess("Post Edited");
        Router.go('/admin/posts');
      }
    });

    return false;
  },
  'click #addtag'(event) {
    event.preventDefault();
    var tag = $('#tag').val();
    const tags = tag.toLowerCase().trim().split(',');

    Meteor.callPromise('create.tag', tags)
      .then((result) => {
        $('#myModal').modal('hide');
        $('#tag').val('');
        FlashMessages.sendSuccess("Tag Added");
      })
      .catch((error) => console.error(error));

    return false;
  },
  'click .reload'() {
    location.reload(true);

    return false;
  }
});

const hasMorePages = () => {
	var totalPosts = Counts.get('postCount');
	return currentPage() * parseInt(Meteor.settings.public.recordsPerPage) < totalPosts;
}

const currentPage = () => {
	return parseInt(Router.current().params.page) || 1;
}

$('#myModal').modal();

function getTagNames(allTags) {
  return allTags.map(function(tagId) {
    var tagName = Tags.findOne({_id: tagId});
    return tagName.tag;
  });
}
