import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';
import { FlashMessages } from 'meteor/mrt:flash-messages';
import { moment } from 'meteor/momentjs:moment';
import swal from 'sweetalert';

import { Projects } from '../../../api/collections.js';

import './add-project.html';
import './edit-project.html';
import './list-projects.html';

var image = {};

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD-MM-YYYY, h:mm:ss a');
});

Template.addProject.onRendered(function() {
  $('#projectDate').datepicker({
    language: 'id'
  });
});

Template.editProject.onRendered(function() {
  $('#projectDate').datepicker({
    language: 'id'
  });
});

Template.addProject.events({
  'submit .add-form'(event) {
    event.preventDefault();
    // this.image = 'bla';
    const target = event.target;
    const name = target.name.value;
    const projectDate = target.projectDate.value;
    const client = target.client.value;
    const type = target.type.value;
    const description = target.description.value;
    const projectImage = image.url;
    console.log(image.url);

    if (typeof projectImage !== 'undefined') {
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

    FlashMessages.sendSuccess("Projects Added");
    Router.go('/admin/projects');

  },
  'click #projectImage'(event) {
    event.preventDefault();

    filepicker.pickMultiple(
      {
        mimetype: 'image/*',
        maxFiles: 3
      },
      function(Blobs){
        console.log(JSON.stringify(Blobs));
        return Blobs.forEach(function(Blob) {
          return image.url = Blob.url;
        });
      },
      function(error){
        console.log(JSON.stringify(error));
      }

    );
  }
});

Template.listProject.events({
  'click .delete_project'(event) {
    event.preventDefault();
    const project_id = this._id;
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
          Projects.remove(project_id, function(err) {
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
