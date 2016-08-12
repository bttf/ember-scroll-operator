import Ember from 'ember';
const { $, Mixin, run } = Ember;

export default Mixin.create({
  _scrollingTimeout: 100,

  /**
   * Attach on-scroll handler to window/document. Handler will call _scrollTop
   * on scroll.
   */
  activate(...args) {
    this._super(...args);

    this._attachEvents();
  },

  /**
   * Detach on-scroll handlers on route exit.
   */
  deactivate(...args) {
    this._super(...args);

    this._detachEvents();
  },

  /**
   * On entering route, decide whether we want to resume previous scrolling
   * position or not based on transition. Also detachEvents to ignore any
   * scrolling that may happen between now and setupController.
   */
  beforeModel(...args) {
    const [ transition ] = args;

    this._super(...args);

    if (!this._didTransitionViaBackOrForward(transition) && this.controller) {
      this.controller.set('currentPosition', 0);
    }

    this._detachEvents();
  },

  /**
   * Scroll to currentPosition value. Uses run-loop's next helper to ensure it
   * happens after model hooks have been fully executed. Also re-attachEvents
   * now to resume watching scroll position.
   */
  setupController(...args) {
    const [ controller ] = args;

    this._super(...args);

    if (controller) {
      run.schedule('afterRender', null, () => {
        $(window).scrollTop(controller.getWithDefault('currentPosition', 0));
        this._attachEvents();
      });
    }
  },

  _attachEvents() {
    const onScroll = () => {
      run.debounce(this, this._setScrollTop, this._scrollingTimeout);
    };
    $(document).on('touchmove.scrollable', onScroll);
    $(window).on('scroll.scrollable', onScroll);
  },

  /**
   * Determine if transition is triggered by browser forward/back buttons.
   * Credit: https://github.com/emberjs/ember.js/issues/3087
   */
  _didTransitionViaBackOrForward(transition) {
    return transition && transition.sequence > 1 && transition.hasOwnProperty('urlMethod');
  },

  _detachEvents() {
    $(document).off('.scrollable');
    $(window).off('.scrollable');
  },

  /**
   * Set currentPosition to $(window).scrollTop value.
   */
  _setScrollTop() {
    this.set('controller.currentPosition', $(window).scrollTop());
  }
});
