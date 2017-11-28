import Ember from 'ember';
const { $, computed, getOwner, Mixin } = Ember;

export default Mixin.create({
  fastboot: computed(function() {
    return getOwner(this).lookup('service:fastboot');
  }),
  /**
   * Scroll to top when route is entered.
   */
  activate(...args) {
    this._super(...args);
    if(!this.get('fastboot') || !this.get('fastboot.isFastBoot')) {
      $(window).scrollTop(0);
    }
  }
});
