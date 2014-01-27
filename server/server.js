Meteor.publish('posts', function() {
    return Posts.find({}, {sort: {order: 1}});
});

Posts.allow({
  'insert':function(userId, doc) {
    return ((doc.body.length > 5) &&
            (doc.body.length < 1000) &&
            (doc.title.length > 5) &&
            (doc.body.length < 100));
  }, 
  'update':function(userId, doc) {
    return true;
  }
});

Meteor.users.allow({
  'update':function(userId, doc) {
    return true;
  }
});