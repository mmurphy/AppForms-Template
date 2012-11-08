FieldDateView = FieldView.extend({
  template:['<label for="<%= id %>"><%= title %></label>', '<input id="<%= id %>" name="<%= id %>" type="date">'],

  // TODO: do we need validation? how is this inputted by user?

  value: function(value) {
    if (value && !_.isEmpty(value)) {
      $.each(value, function(id, val) {
        $("#" + id).val(val);
      });
    }
    var val = $('#' + this.model.get('ID')).val();
    value = {};
    if(val !== "") {
      value[this.model.get('ID')] = new moment(value).format('YYYYMMDD');
    }
    return value;
  }
});