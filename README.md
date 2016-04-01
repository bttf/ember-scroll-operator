# ember-scroll-operator

This ember-cli addon provides two route mixins that will handle scroll preservation and resetting. Read more for details.

## Theme music

<iframe width="420" height="315" src="https://www.youtube.com/embed/cA9gUspn6gc" frameborder="0" allowfullscreen></iframe>

Please mentally replace the word 'smooth' with 'scroll'.

## ScrollOperatorMixin

This will save the scrolling position of a route. When the route is re-entered, it will automatically scroll to the previously saved position *only if accessed by the browser's forward and back buttons*. Accessing the route via link-to or address bar will not trigger this behavior. This is by design in order to more closely emulate the HTML experience.

```
import ScrollOperatorMixin from 'ember-scroll-operator/mixins/scroll-operator';

export default Ember.Route.extend(ScrollOperatorMixin, {

  // If any of the following methods are implemented in your route, be sure to
  // include a call to the parent to make sure the mixin is included.

  activate() {
    this._super(...arguments);
    // existing code
  },

  deactivate() {
    this._super(...arguments);
    // existing code
  },

  beforeModel() {
    this._super(...arguments);
    // existing code
  },

  setupController() {
    this._super(...arguments);
    // existing code
  },

});
```

## ResetScrollMixin

A simple mixin to ensure that a route is always scrolled to the top when accessed.

```
import ResetScrollMixin from 'ember-scroll-operator/mixins/reset-scroll';

export default Ember.Route.extend(ResetScrollMixin, {

  // If the following methods are implemented in your route, be sure to include
  // a call to the parent to make sure the mixin is included.

  activate() {
    this._super(...arguments);
    // existing code
  },

});
```

# Development Setup

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

# Credits

Thanks to @gdub22 for their insight on determining when transitions are triggered by the browser's back/forward buttons ([related](https://github.com/emberjs/ember.js/issues/3087#issuecomment-22064811)).
