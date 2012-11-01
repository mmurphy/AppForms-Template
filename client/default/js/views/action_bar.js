ActionBarView = Backbone.View.extend({
  className: 'fh_action_bar',

  events: {
    'click button': 'buttonHandler'
  },

  initialize: function() {
    var self = this;

    this.model.on('change:active_page', function (model, page) {
      self.activePageChange.call(self, model, page);
    });
    this.render();
  },

  render: function() {
    this.$el.html('<button class="previous hidden">Previous</button><button class="next hidden">Next</button><button class="submit hidden">Submit</button>');
    this.options.parentEl.append(this.$el);
  },

  activePageChange: function (model, pageIndex) {
    // show/hide previous/next/submit buttons accordingly
    this.$el.find('button').addClass('hidden');
    var numPages = model.pages.length;
    if (numPages < 2) {
      // single-page. show submit button
      this.$el.find('.submit').removeClass('hidden');
    } else if (pageIndex === 0) {
      // multi-page, first page. show next button
      this.$el.find('.next').removeClass('hidden');
    } else if (pageIndex === (numPages - 1)) {
      // multi-page, last page. show submit button and previous
      this.$el.find('.submit').removeClass('hidden');
      this.$el.find('.previous').removeClass('hidden');
    } else {
      // multi-page, in-between page. show next & previous
      this.$el.find('.next').removeClass('hidden');
      this.$el.find('.previous').removeClass('hidden');
    }
  },

  // delegate events to form depending on button class
  buttonHandler: function (e) {
    var el = $(e.target);
    if (el.hasClass('previous')) {
      this.options.parentView.previousPage();
    } else if (el.hasClass('next')) {
      this.options.parentView.nextPage();
    } else {
      this.options.parentView.submit();
    }
  }
});