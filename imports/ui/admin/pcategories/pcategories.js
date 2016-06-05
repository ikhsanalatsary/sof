import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { FlashMessages } from 'meteor/mrt:flash-messages';
import { moment } from 'meteor/momentjs:moment';
import swal from 'sweetalert';

import { PostCategories } from '../../../api/collections.js';

import './add-category.html';
import './edit-category.html';
import './list-categories.html';

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD-MM-YYYY, h:mm:ss a');
});

Template.listPcategories.onCreated(function () {
  let template = this;
  this.autorun(function () {
    const skipCount = (currentPage() - 1) * Meteor.settings.public.recordsPerPage;
    template.subscribe('pcategories', skipCount);
  });
});

Template.listPcategories.helpers({
  prevPage() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    return Router.routes['list-pcategories'].path({page: previousPage});
  },
  nextPage() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    return Router.routes['list-pcategories'].path({page: nextPage});
  },
	prevPageClass() {
    return currentPage() <= 1 ? "disabled" : "";
  },
  nextPageClass() {
    return hasMorePages() ? "" : "disabled";
  }
});

Template.addPcategory.events({
  'submit .add-post-category'(event) {
    const target = event.target;
    const name = target.name.value;

    Meteor.call('create.pcategory', name, (error, result) => {
      if (error) {
        console.log(error.reason);
        FlashMessages.sendError(err.reason);
      } else {
        FlashMessages.sendSuccess("Post category Added");
        Router.go('/admin/pcategory');
      }
    });

    return false;
  },
});

Template.editPcategory.events({
  'submit .edit-post-category'(event) {
    const name = event.target.name.value;
    const categoryId = this._id;

    Meteor.call('edit.pcategory', name, categoryId, (err, result) => {
      if (err) {
        FlashMessages.sendError(err.reason);
      }
      FlashMessages.sendSuccess("Post category edited");
      Router.go('/admin/pcategory');
    });

    return false;
  }
});

Template.listPcategories.events({
  'click .delete_pcategory'(event) {
    event.preventDefault();
    const pcategory_id = this._id;
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
          Meteor.call('delete.pcategory', pcategory_id, (error, result) => {
            if (error) {
              console.log(error.reason);
              FlashMessages.sendError(err.reason);
              swal("Error!", err.reason, "error");
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
	var totalPcategories = Counts.get('pcategoryCount');
	return currentPage() * parseInt(Meteor.settings.public.recordsPerPage) < totalPcategories;
}

const currentPage = () => {
	return parseInt(Router.current().params.page) || 1;
}
