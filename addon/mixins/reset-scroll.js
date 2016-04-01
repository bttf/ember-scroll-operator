import Ember from 'ember';

export default Ember.Mixin.create({
  /**
   * Scroll to top when route is entered.
   */
  activate() {
    Ember.$(window).scrollTop(0);
  },
});
