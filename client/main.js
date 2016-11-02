import { Template } from 'meteor/templating';
import '../lib/router.js';
import './main.html';
// import { ReactiveVar } from 'meteor/reactive-var';

Template.prayerRequestForm.events({
  'submit .prayer-form' (event) {
    event.preventDefault();
		var newPrayer = {
    	request: event.target.prayer_request.value,
    	user_id: Meteor.userId(),
    	createdAt: new Date()
    };
    Prayers.insert(newPrayer);
    event.target.prayer_request.value = "";
  }
});

Template.prayersList.helpers({
  prayers: function() {
    return Prayers.find({}, { sort: { createdAt: -1 } });
  }
});

Template.recentThreePrayers.helpers({
  recentThreePrayers: function(){
    return Prayers.find({}, { sort: { createdAt: -1 }, limit: 3 });
  }
});

Template.users.helpers({
  userslist: function(){
    return Users.find({}, { sort: { createdAt: -1 } });
  }
});

Template.registerHelper("currentUser", function() {
  return Meteor.user();
});

Template.registerHelper("removeElement", function(selector) {
	document.querySelector(selector).remove();
});

Template.body.events({
	'click a.get-in' (event){
		event.preventDefault();
		console.log("I am clicked");
		UI.insert(UI.render(Template.login), document.body)
	},
	'click a.logout'(event){
		event.preventDefault();
		Meteor.logout();
	}
});

Template.signup.events({
  'submit form': function(event) {
    event.preventDefault();
    var emailVar = event.target.signupEmail.value;
    var passwordVar = event.target.signupPassword.value;
    Accounts.createUser({
      email: emailVar,
      password: passwordVar

    }, function(error){
    	console.log(error);
    });
  },
  'click a.backto-login'(event){
  	event.preventDefault();
  	document.querySelector('.signup-wrapper').remove();
  	UI.insert(UI.render(Template.login), document.body);
  },
  'click a.signup-close' (event){
  	event.preventDefault();
  	console.log("close login form");
  	// removeElement('.login-wrapper');
  	document.querySelector('.signup-wrapper').remove();
  },
});

Template.login.events({
  'submit form' (event) {
    event.preventDefault();
    var emailVar = event.target.loginEmail.value;
    var passwordVar = event.target.loginPassword.value;
    Meteor.loginWithPassword(emailVar, passwordVar, function(error){
    	if(error){
    		console.log(error);
    	} else{
    		document.querySelector('.login-wrapper').remove();
    	}
    });
  },
  'click a.login-close' (event){
  	event.preventDefault();
  	console.log("close login form");
  	// removeElement('.login-wrapper');
  	document.querySelector('.login-wrapper').remove();
  },
  'click a.new-account' (event){
		event.preventDefault();
		console.log("new account");
		document.querySelector('.login-wrapper').remove();
		UI.insert(UI.render(Template.signup), document.body);
	}
});




