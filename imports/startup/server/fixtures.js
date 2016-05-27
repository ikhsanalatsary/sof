import { Meteor } from 'meteor/meteor';
import { Projects, PostCategories, Posts } from '../../api/collections.js';

if (Projects.find().count() === 0) {
  let projectsDummy = [
    {
      _id: 'qwerty65',
      name: 'Project 1',
      description: 'Ini Proyek pertama',
      client: 'Studio 1',
      type: 'Audio',
      projectDate: '15/5/2016',
      projectImage: 'https://www.filestackapi.com/api/file/d315BhSuRqKqAjsGIrgf',
    },
    {
      _id: 'azerty65',
      name: 'Project 2',
      description: 'Ini Proyek kedua',
      client: 'Studio 2',
      type: 'Audio',
      projectDate: '20/5/2016',
      projectImage: 'https://www.filestackapi.com/api/file/d315BhSuRqKqAjsGIrgf',
    },
    {
      _id: 'qwertz65',
      name: 'Project 3',
      description: 'Ini Proyek ketiga',
      client: 'Studio 3',
      type: 'Audio',
      projectDate: '25/5/2016',
      projectImage: 'https://www.filestackapi.com/api/file/d315BhSuRqKqAjsGIrgf',
    },
    {
      _id: 'qwerty55',
      name: 'Project 4',
      description: 'Ini Proyek keempat',
      client: 'Studio 4',
      type: 'Audio',
      projectDate: '27/5/2016',
      projectImage: 'https://www.filestackapi.com/api/file/d315BhSuRqKqAjsGIrgf',
    },
    {
      _id: 'qzerty45',
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

if (PostCategories.find().count() === 0) {
  let PcategoryDummy = [
    {
    	"_id" : "oNPkYArFWpYymx7Kv",
    	"name" : "Category A"
    },
    {
    	"_id" : "ZTAtg35yhTFss6kKo",
    	"name" : "Category B"
    },
    {
    	"_id" : "HieRFjio4f7ZSQGWD",
    	"name" : "Category C"
    },
    {
    	"_id" : "DsYY6zbrEMjbs8LZj",
    	"name" : "Category D"
    },
    {
    	"_id" : "wqE7gvrcp6wLXRjX7",
    	"name" : "Category E"
    },
    {
    	"_id" : "gYEFN4N7KmaWue5mF",
    	"name" : "Category F"
    },
    {
    	"_id" : "Dv5JBYf45kFX38THm",
    	"name" : "Category G"
    },
    {
    	"_id" : "5qBu7SBNcsSecchRX",
    	"name" : "Category H"
    },
    {
    	"_id" : "4pf82GKiKPo3Kpr7u",
    	"name" : "Category I"
    },
    {
    	"_id" : "fGX9zuApCe5P4ERzS",
    	"name" : "Category J"
    },
    {
    	"_id" : "wauTkdcodeE292TYY",
    	"name" : "Category K"
    },
    {
    	"_id" : "7NZxAfJgySNBixTBR",
    	"name" : "Category M"
    },
    {
    	"_id" : "AucsrDJq3Hu63sc3n",
    	"name" : "Category L"
    },
    {
    	"_id" : "swa9peqRTCWyLmvyY",
    	"name" : "Category N"
    },
    {
    	"_id" : "bev9hgz7dnPuFowBw",
    	"name" : "Category O"
    },
    {
    	"_id" : "fT2yCgW74JwdN4F8D",
    	"name" : "Category P"
    },
    {
    	"_id" : "2iyvKcwFvZ8rkgCCQ",
    	"name" : "Category Q"
    },
    {
    	"_id" : "KTjPoYGWgnSoX57Zh",
    	"name" : "Category R"
    },
    {
    	"_id" : "2ks95B3CCvx4mKJkT",
    	"name" : "Category S"
    },
    {
    	"_id" : "6pswj3rRK3GEaGoDN",
    	"name" : "Category T"
    },
    {
    	"_id" : "cWWYfQ7CGo53RM9oD",
    	"name" : "Audio"
    },
    {
    	"_id" : "g5EPHtCWtEeuhrMNt",
    	"name" : "Category U"
    },
    {
    	"_id" : "yZs8KjE6tDwL5sbpk",
    	"name" : "Category V"
    }
  ];

  PcategoryDummy.forEach(function (postcategory) {
    return PostCategories.insert(postcategory);
  });
}

if (Posts.find().count() === 0) {
  let PostsDummy = [
    {
    	"_id" : "bvgGKPPTHCP6rDFbP",
    	"title" : "First Post",
    	"body" : "<p><span class=\"first-child-span\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></p>\n<p class=\"first-child\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text.</p>\n<p class=\"first-child\"><img src=\"https://www.filestackapi.com/api/file/VJ672SnqQSacMXyqy8Ki\" alt=\"\" width=\"200\" height=\"100\" /></p>\n<blockquote>\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text.</p>\n<div class=\"footer\">Jason Santa Maria</div>\n</blockquote>",
    	"pcategoryId" : "oNPkYArFWpYymx7Kv",
    	"tags" : [
    		"e",
    		"q",
    		"w"
    	]
    },
    {
    	"_id" : "4yC2P2yXahPhHt5bF",
    	"title" : "Third Post",
    	"body" : "<p><span class=\"first-child-span\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></p>\n<p class=\"first-child\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text.</p>\n<p class=\"first-child\"><img src=\"https://www.filestackapi.com/api/file/VJ672SnqQSacMXyqy8Ki\" alt=\"\" width=\"486\" height=\"243\" /></p>\n<blockquote>\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text.</p>\n<div class=\"footer\">Jason Santa Maria</div>\n</blockquote>",
    	"pcategoryId" : "HieRFjio4f7ZSQGWD",
    	"tags" : [
    		"e",
    		"q",
    		"w"
    	]
    },
    {
    	"_id" : "NSerg3QxECXWYXjTP",
    	"title" : "Fourth Post",
    	"body" : "<p><span class=\"first-child-span\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></p>\n<p class=\"first-child\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text.</p>\n<p class=\"first-child\"><img src=\"https://www.filestackapi.com/api/file/VJ672SnqQSacMXyqy8Ki\" alt=\"\" width=\"486\" height=\"243\" /></p>\n<blockquote>\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text.</p>\n<div class=\"footer\">Jason Santa Maria</div>\n</blockquote>",
    	"pcategoryId" : "DsYY6zbrEMjbs8LZj",
    	"tags" : [
    		"e",
    		"q",
    		"w"
    	]
    },
    {
    	"_id" : "wpySonRDtTeMaGZ7u",
    	"title" : "Fifth Post",
    	"body" : "<p><span class=\"first-child-span\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></p>\n<p class=\"first-child\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text.</p>\n<p class=\"first-child\"><img src=\"https://www.filestackapi.com/api/file/VJ672SnqQSacMXyqy8Ki\" alt=\"\" width=\"486\" height=\"243\" /></p>\n<blockquote>\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text.</p>\n<div class=\"footer\">Jason Santa Maria</div>\n</blockquote>",
    	"pcategoryId" : "wqE7gvrcp6wLXRjX7",
    	"tags" : [
    		"e",
    		"q",
    		"w"
    	]
    },
    {
    	"_id" : "hktHZv2tYq6GNNapM",
    	"title" : "Sixth Post",
    	"body" : "<p><span class=\"first-child-span\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></p>\n<p class=\"first-child\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text.</p>\n<p class=\"first-child\"><img src=\"https://www.filestackapi.com/api/file/VJ672SnqQSacMXyqy8Ki\" alt=\"\" width=\"486\" height=\"243\" /></p>\n<blockquote>\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text.</p>\n<div class=\"footer\">Jason Santa Maria</div>\n</blockquote>",
    	"pcategoryId" : "gYEFN4N7KmaWue5mF",
    	"tags" : [
    		"e",
    		"q",
    		"w"
    	]
    },
    {
    	"_id" : "YTCYapenBufQBAqFA",
    	"title" : "Seventh Post",
    	"body" : "<p><span class=\"first-child-span\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></p>\n<p class=\"first-child\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text.</p>\n<p class=\"first-child\"><img src=\"https://www.filestackapi.com/api/file/VJ672SnqQSacMXyqy8Ki\" alt=\"\" width=\"486\" height=\"243\" /></p>\n<blockquote>\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text.</p>\n<div class=\"footer\">Jason Santa Maria</div>\n</blockquote>",
    	"pcategoryId" : "Dv5JBYf45kFX38THm",
    	"tags" : [
    		"e",
    		"q",
    		"w"
    	]
    },
    {
    	"_id" : "kL64ZfwYceRHSksrB",
    	"title" : "Eighth Post",
    	"body" : "<p><span class=\"first-child-span\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></p>\n<p class=\"first-child\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text.</p>\n<p class=\"first-child\"><img src=\"https://www.filestackapi.com/api/file/VJ672SnqQSacMXyqy8Ki\" alt=\"\" width=\"486\" height=\"243\" /></p>\n<blockquote>\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text.</p>\n<div class=\"footer\">Jason Santa Maria</div>\n</blockquote>",
    	"pcategoryId" : "5qBu7SBNcsSecchRX",
    	"tags" : [
    		"e",
    		"q",
    		"w"
    	]
    },
    {
    	"_id" : "6LJDRrdofz8cZEAfM",
    	"title" : "Ninth Post",
    	"body" : "<p><span class=\"first-child-span\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></p>\n<p class=\"first-child\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text.</p>\n<p class=\"first-child\"><img src=\"https://www.filestackapi.com/api/file/VJ672SnqQSacMXyqy8Ki\" alt=\"\" width=\"486\" height=\"243\" /></p>\n<blockquote>\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text.</p>\n<div class=\"footer\">Jason Santa Maria</div>\n</blockquote>",
    	"pcategoryId" : "4pf82GKiKPo3Kpr7u",
    	"tags" : [
    		"e",
    		"q",
    		"w"
    	]
    },
    {
    	"_id" : "6wEwPyZqTiGZ2LjKH",
    	"title" : "Second Post",
    	"body" : "<p><span class=\"first-child-span\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></p>\n<p class=\"first-child\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text.</p>\n<p class=\"first-child\"><img src=\"https://www.filestackapi.com/api/file/VJ672SnqQSacMXyqy8Ki\" alt=\"\" width=\"486\" height=\"243\" /></p>\n<blockquote>\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text.</p>\n<div class=\"footer\">Jason Santa Maria</div>\n</blockquote>",
    	"pcategoryId" : "ZTAtg35yhTFss6kKo",
    	"tags" : [
    		"e",
    		"q",
    		"w"
    	]
    },
    {
    	"_id" : "Fs3h276oEm9pou7r8",
    	"title" : "Tenth Post",
    	"body" : "<p><span class=\"first-child-span\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></p>\n<p class=\"first-child\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text.</p>\n<p class=\"first-child\"><img src=\"https://www.filestackapi.com/api/file/VJ672SnqQSacMXyqy8Ki\" alt=\"\" width=\"486\" height=\"243\" /></p>\n<blockquote>\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text. Lorem Ipsum is simply dummy text.</p>\n<div class=\"footer\">Jason Santa Maria</div>\n</blockquote>",
    	"pcategoryId" : "fGX9zuApCe5P4ERzS",
    	"tags" : [
    		"e",
    		"q",
    		"w"
    	]
    }
  ];

  PostsDummy.forEach(function(post) {
    return Posts.insert(post);
  });
}
