FormView = Backbone.View.extend({
  el: $('#fh_wufoo_content'),

  templates: {
    heading: '<header class="info"><h2 class="form_title"><%= form_title %></h2></header>'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.pages = [];
    this.render();
  },

  render: function() {
    var self = this;
    App.views.header.hideAll();

    this.$el.empty();
    
    var form = $('<form>').addClass('wufoo');
    // Add form heading
    var heading = _.template(this.templates.heading, {
      "form_title": this.model.get('Name')
    });
    form.append(heading);

    // need to call validate before adding rules one by one. Alternative to adding all rules at once
    this.$el.append(form);
    form.validate();

    this.model.pages.each(function (page, index) {
      self.pages.push(new PageView({
        parentEl: form, // pass in form for adding sub views
        parentView: self,
        model: page
      }));
    });


    // TODO: Move to tpl
    var action_bar = $('<div>').addClass('fh_action_bar');

    // temp butan to validate
    action_bar.append($('<button>', {
      "text": "Validate"
    }).bind('click', function (e) {
      e.preventDefault();
      form.valid();
    }));

    // add to DOM
    this.$el.append(action_bar);

    this.$el.show();
  },

  showField: function (id) {
    // call hideField on all pages as field should exist in one
    _(this.pages).forEach(function (page, index) {
      page.showField(id);
    });
  },

  hideField: function (id) {
    // call hideField on all pages as field should exist in one
    _(this.pages).forEach(function (page, index) {
      page.hideField(id);
    });
  }

});