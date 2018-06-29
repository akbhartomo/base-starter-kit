$(function() {
  'use-strict';

  let bootstrapFunction = {
    init: function() {
      this.part();
      this.external();
      // this.external();
    },

    external: function() {
      // $.getScript('./component.js');
      // component.helloComponent();
    },

    part: function() {
      console.log('\'Allo \'Allo!');
    }
  };

  $(document).ready(function() {
    // Render all objects literal
    bootstrapFunction.init();
  });
});
