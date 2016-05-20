import { Template } from 'meteor/templating';
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

Template.addPcategory.events({
  'submit .add-post-category'(event) {
    const target = event.target;
    const name = target.name.value;

    PostCategories.insert({
      name
    }, function(err, _id) {
      if (!err) {
        console.log(_id);
        FlashMessages.sendSuccess("Post Category Added");
        Router.go('/admin/pcategory');
      } else {
        FlashMessages.sendError(err.reason);
      }
    });


    return false;
  },
});

Template.editPcategory.events({
  'submit .edit-post-category'(event) {
    const name = event.target.name.value;
    PostCategories.update(this._id, {
      $set: {
        name,
      }
    }, function (err, result) {
      if (err) {
        FlashMessages.sendError(err.reason);
      }
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
          PostCategories.remove(pcategory_id, function(err) {
            if (!err) {
              swal("Success", "Your post category deleted!", "success");
            } else {
              swal("Error!", err.reason, "error");
            }
          });
        } else {
          swal("Cancelled", "Your post category is safe :)", "error");
          return;
        }
      });
  },
});
