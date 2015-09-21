'use strict';

var expect = chai.expect;
describe('Student Unit Tests', function() {
    it('Some tests', function() {
        /*
         We're using Mocha and Chai to do unit testing.

         Mocha is what sets up the tests (the "describe" and "it" portions), while
         Chai does the assertion/expectation checking.

         Links:
         Mocha: http://mochajs.org
         Chai: http://chaijs.com

         Note: This is a bunch of tests in one it; you'll probably want to separate them
         out into separate groups to make debugging easier. It's also more satisfying
         to see a bunch of unit tests pass on the results page :)
        */

        // Here is the most basic test you could think of:
        expect(1==1, '1==1').to.be.ok;

        // You can also for equality:
        expect(1, '1 should equal 1').to.equal(1);

        // JavaScript can be tricky with equality tests
        expect(1=='1', "1 should == '1'").to.be.true;

        // Make sure you understand the differences between == and ===
        expect(1==='1', "1 shouldn't === '1'").to.be.false;

        // Use eql for deep comparisons
        expect([1] == [1], "[1] == [1] should be false because they are different objects").to.be.false;

        expect([1], "[1] eqls [1] should be true").to.eql([1]);
    });

    it('Callback demo unit test', function() {
        /*
        Suppose you have a function or object that accepts a callback function,
        which should be called at some point in time (like, for example, a model
        that will notify listeners when an event occurs). Here's how you can test
        whether the callback is ever called.
         */

        // First, we'll create a function that takes a callback, which the function will
        // later call with a single argument. In tests below, we'll use models that
        // take listeners that will be later called
        var functionThatTakesCallback = function(callbackFn) {
            return function(arg) {
                callbackFn(arg);
            };
        };

        // Now we want to test if the function will ever call the callbackFn when called.
        // To do so, we'll use Sinon's spy capability (http://sinonjs.org/)
        var spyCallbackFn = sinon.spy();

        // Now we'll create the function with the callback
        var instantiatedFn = functionThatTakesCallback(spyCallbackFn);

        // This instantiated function should take a single argument and call the callbackFn with it:
        instantiatedFn("foo");

        // Now we can check that it was called:
        expect(spyCallbackFn.called, 'Callback function should be called').to.be.ok;

        // We can check the number of times called:
        expect(spyCallbackFn.callCount, 'Number of times called').to.equal(1);

        // And we can check that it got its argument correctly:
        expect(spyCallbackFn.calledWith('foo'), 'Argument verification').to.be.true;

        // Or, equivalently, get the first argument of the first call:
        expect(spyCallbackFn.args[0][0], 'Argument verification 2').to.equal('foo');
    });
});


describe('Student Unit Tests', function() {   
    // Your tests starts here.
    var activityCollectionModel;

    beforeEach(function() {
      activityCollectionModel = new ActivityCollectionModel();
    });

    afterEach(function() {
      activityCollectionModel = undefined;
    });

    it('Add listener activityCollectionModel unit test', function() {
      var listener_fn = sinon.spy();
      var addListenerSpy = sinon.spy(activityCollectionModel, "addListener");
      activityCollectionModel.addListener(listener_fn);

      expect(addListenerSpy.calledWith(listener_fn), 'addListener should have been called with listener_fn.').to.be.true;
      expect(addListenerSpy.calledOnce, 'addListener should have been called once.').to.be.true;
      expect(activityCollectionModel.listeners.length, 'listeners.length should be one.').to.be.equal(1); 
    });

    it('Remove listener activityCollectionModel unit test', function() {
      var listener_fn = sinon.spy();
      var addListenerSpy = sinon.spy(activityCollectionModel, "addListener");
      var removeListenerSpy = sinon.spy(activityCollectionModel, "removeListener");
      activityCollectionModel.addListener(listener_fn);  
      activityCollectionModel.removeListener(listener_fn);

      expect(removeListenerSpy.calledWith(listener_fn), 'removeListener should have been called with listener_fn.').to.be.true;
      expect(removeListenerSpy.calledOnce, 'removeListener should have been called once.').to.be.true;
      expect(activityCollectionModel.listeners.length, 'listeners.length should be zero.').to.be.equal(0);

      activityCollectionModel.removeListener(listener_fn);
      expect(activityCollectionModel.listeners.length, 'listeners.length should still be zero.').to.be.equal(0);  
    });

    it('Data stored correctly', function() {
        var ad1 = new ActivityData('attending lecture', 
                                   {energylevel: 2, stresslevel: 3, happinesslevel: 4},
                                    10);
        var ad2 = new ActivityData('writing code', 
                                   {energylevel: 5, stresslevel: 3, happinesslevel: 2},
                                    20);
        var ad3 = new ActivityData('playing sport', 
                                   {energylevel: 2, stresslevel: 1, happinesslevel: 4},
                                    30);
        activityCollectionModel.addActivityDataPoint(ad1);
        activityCollectionModel.addActivityDataPoint(ad2);
        activityCollectionModel.addActivityDataPoint(ad3);

        var dps = activityCollectionModel.getActivityDataPoints();
        expect(dps.length, 'should be 3 items').to.be.equal(3);
        expect(dps[0].activityType, 'should be attending lecture').to.be.equal('attending lecture');
        expect(dps[1].activityType, 'should be writing code').to.be.equal('writing code');
        expect(dps[2].activityType, 'should be playing sport').to.be.equal('playing sport');

        expect(dps[0].activityDurationInMinutes, 'should be 20').to.be.equal(10);
        expect(dps[1].activityDurationInMinutes, 'should be 20').to.be.equal(20);
        expect(dps[2].activityDurationInMinutes, 'should be 20').to.be.equal(30);

        expect(dps[0].activityDataDict['energylevel'], 'should be 2').to.be.equal(2);
        expect(dps[0].activityDataDict['stresslevel'], 'should be 3').to.be.equal(3);
        expect(dps[0].activityDataDict['happinesslevel'], 'should be 4').to.be.equal(4);

        expect(dps[1].activityDataDict['energylevel'], 'should be 5').to.be.equal(5);
        expect(dps[1].activityDataDict['stresslevel'], 'should be 3').to.be.equal(3);
        expect(dps[1].activityDataDict['happinesslevel'], 'should be 2').to.be.equal(2);

        expect(dps[2].activityDataDict['energylevel'], 'should be 2').to.be.equal(2);
        expect(dps[2].activityDataDict['stresslevel'], 'should be 1').to.be.equal(1);
        expect(dps[2].activityDataDict['happinesslevel'], 'should be 4').to.be.equal(4);

    });
});
