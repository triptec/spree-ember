/* jshint node: true */
'use strict';

module.exports = {
  name: 'spree-ember-storefront',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app) {
    this._super.included(app);
    // Nested Addons don't contribute to the Host Application filestructure.
    // To ensure the initializers from core and checkouts are run, we include
    // them as dependencies rather than devDependencies, and manually invoke
    // the Addon included hooks as necessary.
    this.addons.forEach(function(addon){
      if (addon.name.substring(0, 11) === "spree-ember") {
        addon.included.apply(addon, [app]);
      }
    });

    app.import('vendor/register-storefront.js');
  }
};
