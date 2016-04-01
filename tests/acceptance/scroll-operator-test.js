import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | scroll operator');

/**
 * This test is seemingly impossible right now. Unable to successfully emulate
 * hitting the browser back/forward button due to acceptance tests using
 * locationType 'none'. Setting to 'hash' does not seem to help. Need to
 * revisit.
 *
 * test('scroll operator works', function(assert) {
 *   // Configure location type to simulate browser back button
 *   this.application.Router.reopen({
 *     location: 'hash',
 *   });

 *   const viewportHeight = Ember.$(window).height();
 *   const testScrollTop = viewportHeight + 5;
 *
 *   visit('/').then(() => {
 *     // Modify page to have scrollable content
 *     const tallDiv = Ember.$('<div></div>').css({ height: viewportHeight * 2 });
 *     Ember.$(document.body).append(tallDiv);

 *     // scroll to a position
 *     Ember.$(window).scrollTop(testScrollTop);
 *   });

 *
 *   // navigate away from page and change scrollTop
 *   visit('/route-a').then(() => {
 *     Ember.$(window).scrollTop(0);
 *   });
 *
 *   // use browser's native back functionality to navigate to previous route
 *   //window.history.back();
 *   visit('/');
 *
 *   // assert that previous position is preserved
 *   andThen(function() {
 *     assert.equal(currentURL(), '/');
 *     assert.equal(Ember.$(window).scrollTop(), testScrollTop);
 *   });
 * });
 **/

test('scroll operator does not resume scroll for non-browser triggered transitions', function(assert) {
  // get viewport height
  const viewportHeight = Ember.$(window).height();

  // create arbitrary scrollTo value
  const testScrollTop = viewportHeight + 5;

  visit('/').then(() => {
    // create and append div of 'tall' height
    const tallDiv = Ember.$('<div></div>').css({ height: viewportHeight * 2 });
    Ember.$(document.body).append(tallDiv);

    // scroll to a position
    Ember.$(window).scrollTop(testScrollTop);
  });

  // navigate away from page and ensure scroll
  visit('/route-a').then(() => {
    Ember.$(window).scrollTop(testScrollTop);
  });

  // visit index via app
  visit('/');

  // assert that previous position is reset (equal to 0)
  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(Ember.$(window).scrollTop(), 0);
  });
});

test('reset scroll will reset scroll position to 0', function(assert) {
  visit('/').then(() => {
    // get viewport height
    const viewportHeight = Ember.$(window).height();

    // create arbitrary scrollTo value
    const testScrollTop = viewportHeight + 5;

    // create and append div of 'tall' height
    const tallDiv = Ember.$('<div></div>').css({ height: viewportHeight * 2 });
    Ember.$(document.body).append(tallDiv);

    // scroll to a position
    Ember.$(window).scrollTop(testScrollTop);
  });

  visit('/reset-route');

  andThen(function() {
    assert.equal(currentURL(), '/reset-route');
    assert.equal(Ember.$(window).scrollTop(), 0);
  });
});
