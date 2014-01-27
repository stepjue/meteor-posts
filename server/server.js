Meteor.publish('posts', function() {
    return Posts.find({}, {sort: {order: 1}});
});

// facebook account service configuration
Accounts.loginServiceConfiguration.remove({
  service: "facebook"
});
Accounts.loginServiceConfiguration.insert({
    service: "facebook",
    appId: "250849994963069",
    secret: "a0e5b3d30e772b2b3c78468b478db1d3"
});

// basically database schemas
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