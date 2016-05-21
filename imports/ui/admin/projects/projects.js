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

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD-MM-YYYY, h:mm:ss a');
});

Template.addProject.onRendered(function() {
  require('filepicker-js');
  filepicker.setKey("AXYh60O8qQ1SFWA3lvR4kz");
  $('#projectDate').datepicker({
    language: 'id'
  });
});

Template.editProject.onRendered(function() {
  require('filepicker-js');
  filepicker.setKey("AXYh60O8qQ1SFWA3lvR4kz");
  $('#projectDate').datepicker({
    language: 'id'
  });
});

Template.addProject.events({
  'submit .add-form'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.name.value;
    const projectDate = target.projectDate.value;
    const client = target.client.value;
    const type = target.type.value;
    const description = target.description.value;
    const projectImage = target.projectImage.value;
    console.log(projectImage);

    if (projectImage !== '') {
      Projects.insert({
        name,
        description,
        client,
        type,
        projectDate,
        projectImage
      }, function(err, _id) {
        if (!err) {
          console.log(_id + ' image');
          FlashMessages.sendSuccess("Projects Added");
          Router.go('/admin/projects');
        } else {
          FlashMessages.sendError(err.toString());
        }
      });
    } else {
      Projects.insert({
        name,
        description,
        client,
        type,
        projectDate
      },function(err, _id) {
        if (!err) {
          console.log(_id + ' noimage');
          FlashMessages.sendSuccess("Projects Added without upload image");
          Router.go('/admin/projects');
        } else {
          FlashMessages.sendError(err.toString());
        }
      });
    }
  },
  'click .reload'() {
    location.reload(true);

    return false;
  },
  'change #projectImage'(event) {
    event.preventDefault();

    var img = document.createElement("img");
    img.src = event.originalEvent.fpfile.url;
    var tag = document.getElementById("showImage");
    tag.appendChild(img);
  },
});

Template.editProject.events({
  'submit .edit_project_form'(event) {
    event.preventDefault();

    const target = event.target;
    const name = target.name.value;
    const projectDate = target.projectDate.value;
    const client = target.client.value;
    const type = target.type.value;
    const description = target.description.value;
    const projectImage = target.projectImage.value;
    console.log(projectImage);

    if (projectImage !== '') {
      Projects.update(this._id, {
        $set: {
          name,
          description,
          client,
          type,
          projectDate,
          projectImage,
        }
      }, function(err, num) {
        if (!err) {
          console.log(num + 'field update image');
          FlashMessages.sendSuccess("Projects edited!");
          Router.go('/admin/projects');
        } else {
          FlashMessages.sendError(err.toString());
        }
      });
    } else {
      Projects.update(this._id, {
        $set: {
          name,
          description,
          client,
          type,
          projectDate,
        }
      },function(err, num) {
        if (!err) {
          console.log(num + 'field update noimage');
          FlashMessages.sendSuccess("Projects edited without upload image");
          Router.go('/admin/projects');
        } else {
          FlashMessages.sendError(err.toString());
        }
      });
    }
  },
  'click .reload'() {
    location.reload(true);

    return false;
  },
  'change #projectImage'(event) {
    event.preventDefault();
    var tag = document.getElementById("showImage");
    if (tag.childNodes.length === 3 && tag.getElementsByTagName('img')) {
      tag.removeChild(tag.childNodes[1]);
    }

    var img = document.createElement("img");
    img.src = event.originalEvent.fpfile.url;
    tag.appendChild(img);
  },
});


Template.listProject.events({
  'click .delete_project'(event) {
    event.preventDefault();
    const project_id = this._id;
    swal({
        title: "Are you sure?",
        text: "You will delete this Project!",
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
              swal("Success", "Your project deleted!", "success");
            } else {
              swal("Error!", err.toString(), "error");
            }
          });
        } else {
          swal("Cancelled", "Your project is safe :)", "error");
          return;
        }
      });
  },
  'click .reload'() {
    location.reload(true);

    return false;
  },
});
