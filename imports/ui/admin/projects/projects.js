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

Template.listProject.onCreated(function() {
  let template = this;
  this.autorun(function() {
    const skipCount = (currentPage() - 1) * Meteor.settings.public.recordsPerPage;
    template.subscribe('projects', skipCount);
  })
});

Template.listProject.helpers({
  prevPage() {
    var previousPage = currentPage() === 1 ? 1 : currentPage() - 1;
    return Router.routes['list-project'].path({page: previousPage});
  },
  nextPage() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    return Router.routes['list-project'].path({page: nextPage});
  },
	prevPageClass() {
    return currentPage() <= 1 ? "disabled" : "";
  },
  nextPageClass() {
    return hasMorePages() ? "" : "disabled";
  }
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

    Meteor.call('create.project', name, projectDate, client, type, description, projectImage, (err, result) => {
      if (!err) {
        FlashMessages.sendSuccess("Projects Added");
        Router.go('/admin/projects');
      } else {
        FlashMessages.sendError(err.reason);
        console.error(err.reason);
      }
    });
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

    const project_id = this._id;
    const target = event.target;
    const name = target.name.value;
    const projectDate = target.projectDate.value;
    const client = target.client.value;
    const type = target.type.value;
    const description = target.description.value;
    const projectImage = target.projectImage.value;
    console.log(projectImage);

    Meteor.call('edit.project',project_id, name, projectDate, client, type, description, projectImage, (err, result) => {
      if (!err) {
        FlashMessages.sendSuccess("Projects Edited");
        Router.go('/admin/projects');
      } else {
        FlashMessages.sendError(err.reason);
        console.error(err.reason);
      }
    });
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
          Meteor.call('delete.project', project_id, (err, result) => {
            if (!err) {
              FlashMessages.sendSuccess("Project deleted");
              swal("Success", "Your project deleted!", "success");
            } else {
              FlashMessages.sendError(err.reason);
              swal("Error!", err.reason, "error");
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

const hasMorePages = () => {
	var totalProjects = Counts.get('projectCount');
	return currentPage() * parseInt(Meteor.settings.public.recordsPerPage) < totalProjects;
}

const currentPage = () => {
	return parseInt(Router.current().params.page) || 1;
}
