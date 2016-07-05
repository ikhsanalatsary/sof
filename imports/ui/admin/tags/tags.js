import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { FlashMessages } from 'meteor/mrt:flash-messages';
import { moment } from 'meteor/momentjs:moment';
import swal from 'sweetalert';

import { Tags } from '../../../api/collections.js';

import './add-tag.html';
import './edit-tag.html';
import './list-tags.html';

Template.listTags.onCreated(function () {
  let template = this;
  this.autorun(function () {
    const skipCount = (currentPage() - 1) * Meteor.settings.public.recordsPerPage;
    template.subscribe('tags', skipCount);
  });
});

Template.listTags.helpers({
  prevPage() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    return Router.routes['list-tags'].path({page: previousPage});
  },
  nextPage() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    return Router.routes['list-tags'].path({page: nextPage});
  },
	prevPageClass() {
    return currentPage() <= 1 ? "disabled" : "";
  },
  nextPageClass() {
    return hasMorePages() ? "" : "disabled";
  }
});

Template.addTag.events({
  'submit .add-tag'(event) {
    const target = event.target;
    const tag = target.tag.value;
    console.log(tag);

    Meteor.call('create.tag', tag, (error, result) => {
      if (error) {
        console.log(error.reason);
        FlashMessages.sendError(error.reason);
      } else {
        FlashMessages.sendSuccess("Tag Added");
        Router.go('/admin/tag');
      }
    });

    return false;
  },
});

Template.editTag.events({
  'submit .edit-tag'(event) {
    const tag = event.target.tag.value;
    const tag_id = this._id;

    Meteor.call('edit.tag', tag, tag_id, (err, result) => {
      if (err) {
        FlashMessages.sendError(err.reason);
      }
      FlashMessages.sendSuccess("Tag edited");
      Router.go('/admin/tag');
    });

    return false;
  }
});

Template.listTags.events({
  'click .delete_tag'(event) {
    event.preventDefault();
    const tag_id = this._id;
    swal({
        title: "Are you sure?",
        text: "You will delete this Post Category!",
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
          Meteor.call('delete.tag', tag_id, (error, result) => {
            if (error) {
              console.log(error.reason);
              FlashMessages.sendError(error.reason);
              swal("Error!", error.reason, "error");
            } else {
              FlashMessages.sendSuccess("Post category deleted");
              swal("Success", "Your post category deleted!", "success");
            }
          });
        } else {
          swal("Cancelled", "Your post category is safe :)", "error");
          return;
        }
      });
  }
});

const hasMorePages = () => {
	var totalPcategories = Counts.get('tagsCount');
	return currentPage() * parseInt(Meteor.settings.public.recordsPerPage) < totalPcategories;
}

const currentPage = () => {
	return parseInt(Router.current().params.page) || 1;
}
