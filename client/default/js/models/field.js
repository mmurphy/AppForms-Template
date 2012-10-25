// field model
FieldModel = Backbone.Model.extend({
  // Determine field type from special classes
  getType: function() {
    if (this.attributes.Type && this.attributes.ClassNames) {
      var special_type = this.attributes.ClassNames.split(" ")[1];
      return special_type;
    } else if (this.attributes.Type) {
      return this.attributes.Type;
    }
  }
});

// fields collection
var Fields = Backbone.Collection.extend({
  model: FieldModel,
  sync: function (method, model, options) {
    debugger;
    console.log('custom sync');
  }
});