FlowRouter.route('/', {
  name: 'prayers.show',
  action(params, queryParams) {
    BlazeLayout.render( 'applicationLayout', {
      main: 'intervene'
    });
  }
});

FlowRouter.route('/users', {
  name: 'Users List',
  action(params, queryParams) {
    BlazeLayout.render("applicationLayout", {main: "users"});
  }
});

