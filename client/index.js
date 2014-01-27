Template.postForm.events({
  'click .addPost': function(e) {
    e.preventDefault();

    // first check if user is logged in
    if(Meteor.user()) {
      var title = $('input#inputTitle').val();
      var body = $('textarea#inputBody').val();

      // replaces spaces and special characters with an empty string
      var slug = title.toLowerCase().replace(/[^a-z0-9]/gi, '');
      Session.set('slug', slug);

      // if slug already exists, append a number to it
      if(Posts.findOne({slug:slug})) {
        var newSlug = slug;
        var i = 1;
        while(Posts.findOne({slug:newSlug})) {
          newSlug = slug + String(i++);
        }
        Session.set('slug', newSlug);
      }

      // insert a new post
      Posts.insert({
        'title':title,
        'body':body,
        'slug':Session.get('slug'),
        'author':Meteor.userId()
      }, function(err, _id) {
        if(!err) {
          $('div.formError').addClass('hidden');
          Meteor.users.update({_id:Meteor.userId()},
                              {$push:{"profile.posts":Session.get('slug')}});
        } else {
          $('div.formError').removeClass('hidden');
          console.log(err);
        }
      });
    }
  }
});