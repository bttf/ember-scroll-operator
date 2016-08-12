import Ember from 'ember';
const { $, Mixin } = Ember;

export default Mixin.create({
  /**
   * Scroll to top when route is entered.
   */
  activate(...args) {
    this._super(...args);
    $(window).scrollTop(0);
  }
});
