import Ember from 'ember';

export default Ember.Mixin.create({
  scrollingTimeout: 100,

  /**
   * Attach on-scroll handler to window/document. Handler will call _scrollTop
   * on scroll.
   */
  activate() {
    const onScroll = () => {
      Ember.run.debounce(this, this._setScrollTop, this.scrollingTimeout);
    };
    Ember.$(document).on('touchmove.scrollable', onScroll);
    Ember.$(window).on('scroll.scrollable', onScroll);
  },

  /**
   * Detach on-scroll handlers on route exit.
   */
  deactivate() {
    Ember.$(document).off('.scrollable');
    Ember.$(window).off('.scrollable');
  },

  /**
   * On entering route, decide whether we want to resume previous scrolling
   * position or not based on transition.
   */
  beforeModel(transition) {
    if (!this._didTransitionViaBackOrForward(transition) && this.controller) {
      this.controller.set('currentPosition', 0);
    }
  },

  /**
   * Scroll to currentPosition value. Uses run-loop's next helper to ensure it
   * happens after model hooks have been fully executed.
   */
  setupController(controller) {
    Ember.run.next(null, () => {
      Ember.$(window).scrollTop(controller.getWithDefault('currentPosition', 0));
    });
  },

  /**
   * Set currentPosition to $(window).scrollTop value.
   */
  _setScrollTop() {
    this.set('controller.currentPosition', Ember.$(window).scrollTop());
  },

  /**
   * Determine if transition is triggered by browser forward/back buttons.
   * Credit: https://github.com/emberjs/ember.js/issues/3087
   */
  _didTransitionViaBackOrForward(transition) {
    return transition && transition.sequence > 1 && transition.hasOwnProperty('urlMethod');
  },
});
