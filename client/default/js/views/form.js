FormView = Backbone.View.extend({
  el: $('#fh_wufoo_content'),

  viewMap: {
    "text": FieldTextView,
    "number": FieldNumberView,
    "date": FieldDateView,
    "textarea": FieldTextareaView,
    "radio": FieldRadioView,
    "checkbox": FieldCheckboxView,
    "select": FieldSelectView,
    "file": FieldFileView,
    "email": FieldEmailView,
    "time": FieldTimeView,
    "phone": FieldPhoneView,
    "shortname": FieldShortnameView,
    "address": FieldAddressView,
    "url": FieldUrlView,
    "money": FieldMoneyView,
    "likert": FieldLikertView,
    "fhgeo": FieldGeoView,
    "fhgeoEN": FieldGeoENView,
    "fhcam": FieldCameraView,
    "fhsig": FieldSignatureView,
    "fhmap": FieldMapView,
    "fhtime": FieldCustomTimeView,
    "fhdate": FieldCustomDateView
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    var self = this;
    App.views.header.hideAll();
    
    var form = $('<form>');
    this.$el.empty().append(form);
    form.validate();

// look at special rules & update field models accordingly
/*      var specialRules = this.model.get('Rules');
      var FieldRules = specialRules ? specialRules.FieldRules : null;
      if (FieldRules !== null) {
        _(FieldRules).each(function (fRule) {
          if ('Hide' === fRule.Type) {
            _(fRule.Conditions).each(function (condition) {
              var filter = condition.Filter;
              var value = condition.Value;
              var field = "Field" + condition.FieldName;
              
            });


          }
        });
      }*/

    this.model.fields.each(function (field, index) {
      var fieldType = field.getType();

      if (self.viewMap[fieldType]) {
        new self.viewMap[fieldType]({
          el: form[0],
          model: field
        });
        form.append('<br/>');
      } else {
        console.log('FIELD NOT SUPPORTED:' + fieldType);
      }
    });

    // temp butan to validate
    this.$el.append($('<button>', {
      "text": "Validate"
    }).bind('click', function (e) {
      e.preventDefault();
      form.valid();
    }));

    this.$el.show();
    console.log('***** Form View! *****');
  }

});