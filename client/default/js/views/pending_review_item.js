PendingReviewItemView = PendingItemView.extend({
  templates: {
    item: '<span class="name"><%= name %></span><br/><span class="ts">Submitted At: <br/><%= timestamp %></span><br/><span class="pending_review_type"><%= error_type %></span><button class="button button-negative delete-item second_button">Delete</button><span class="chevron"></span>',
  },

  render: function() {
    var time = new moment(this.model.get('submittedAt')).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('Name'),
      timestamp: time,
      error_type: "Validation Error"
    });

    $(this.el).html(item);
    return this;
  }
});