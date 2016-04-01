import Ember from 'ember';
import ScrollOperatorMixin from 'ember-scroll-operator/mixins/scroll-operator';
import { module, test } from 'qunit';

module('Unit | Mixin | scroll operator');

// Replace this with your real tests.
test('it works', function(assert) {
  let ScrollOperatorObject = Ember.Object.extend(ScrollOperatorMixin);
  let subject = ScrollOperatorObject.create();
  assert.ok(subject);
});
