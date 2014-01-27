Router.configure({
  layout: 'layout',
  loadingTemplate: 'spinner',
  notFoundTemplate: 'notFound'  
});

Router.map(function() {
  this.route('posts', {
    path: '/',
    controller: 'PostsController'
  });

  this.route('postShow', {
    path: '/posts/:slug',
    controller: 'PostShowController'
  });
});

PostsController = RouteController.extend({ 
  waitOn: function() {
    return App.subs.posts;
  },
  data: {
     posts: function() {
       return Posts.find({}, {sort: {order: 1}});
     }
  }
});

PostShowController = RouteController.extend({
  before: function() {
    console.log(this.params.slug);
  },
  waitOn: function() {
    return App.subs.post;
  },
  data: function() {
    return Posts.findOne({slug:this.params.slug});
  }
});