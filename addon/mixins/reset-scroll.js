import Ember from 'ember';
const { $, inject: { service }, Mixin } = Ember;

export default Mixin.create({
  fastboot: service(),
  /**
   * Scroll to top when route is entered.
   */
  activate(...args) {
    this._super(...args);
    if (!this.get('fastboot.isFastBoot')) {
      $(window).scrollTop(0);
    }
  }
});
