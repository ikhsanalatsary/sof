import { Meteor } from 'meteor/meteor';
import { Projects, PostCategories, Posts } from '../../api/collections.js';

if (Projects.find().count() === 0) {
  var projectsDummy = [
    {
      name: 'Project 1',
      description: 'Ini Proyek pertama',
      client: 'Studio 1',
      type: 'Audio',
      projectDate: '15/5/2016',
      projectImage: 'https://www.filestackapi.com/api/file/d315BhSuRqKqAjsGIrgf',
    },
    {
      name: 'Project 2',
      description: 'Ini Proyek kedua',
      client: 'Studio 2',
      type: 'Audio',
      projectDate: '20/5/2016',
      projectImage: 'https://www.filestackapi.com/api/file/d315BhSuRqKqAjsGIrgf',
    },
    {
      name: 'Project 3',
      description: 'Ini Proyek ketiga',
      client: 'Studio 3',
      type: 'Audio',
      projectDate: '25/5/2016',
      projectImage: 'https://www.filestackapi.com/api/file/d315BhSuRqKqAjsGIrgf',
    },
    {
      name: 'Project 4',
      description: 'Ini Proyek keempat',
      client: 'Studio 4',
      type: 'Audio',
      projectDate: '27/5/2016',
      projectImage: 'https://www.filestackapi.com/api/file/d315BhSuRqKqAjsGIrgf',
    },
    {
      name: 'Project 5',
      description: 'Ini Proyek kelima',
      client: 'Studio 5',
      type: 'Audio',
      projectDate: '31/5/2016',
      projectImage: 'https://www.filestackapi.com/api/file/d315BhSuRqKqAjsGIrgf',
    },
];

  projectsDummy.forEach(function (project) {
    return Projects.insert(project);
  });
}
