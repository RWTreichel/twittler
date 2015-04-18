(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    }  else if (n === 0) {
      return [];
    } else {
      return array.slice(-n);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // Set iterator's default, in case an iterator is not provided.
    var iterator = iterator || _.identity;

    if (Array.isArray(collection)) {
      for (var i = 0, len = collection.length; i < len; i ++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var prop in collection) {
        iterator(collection[prop], prop, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];

    _.each(collection, function(item, index, collection) {
      if (test(item, index, collection)) {
        result.push(item);
      }
    });

    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item) {
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    return _.filter(array, function(item, index, arr) {
      return _.indexOf(arr, item) === index;
    });
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];

    _.each(collection, function(item, index, collection) {
      result.push(iterator(item, index, collection));
    });

    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // Check if accumulator was provided.
    if (typeof accumulator === "undefined") {
      if (Array.isArray(collection)) {
        accumulator = collection[0];
        collection = collection.slice(1);
      } else {
        var keys = Object.keys(collection);
        
        accumulator = collection[keys[0]];
        delete collection[keys[0]];
      }
    }

    _.each(collection, function(item) {
      accumulator = iterator(accumulator, item);
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    // Set iterator to default function if iterator is not provided.
    iterator = typeof iterator === "function" ? iterator : _.identity;

    return _.reduce(collection, function(allTrue, item) {
      // Once a false value has been found, no further inspection is needed.
      if (!allTrue) {
        return false;
      } else {
        // Using the double-not operator trick to cast to Boolean.
        return !!iterator(item);
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = typeof iterator === "function" ? iterator : _.identity;

    return _.reduce(collection, function(oneTrue, item) {
      // Once any item is evaluated as true, no further inspection is needed.
      if (oneTrue) {
        return true;
      } else {
        // Using the double-not operator trick to cast to Boolean.
        return !!iterator(item);
      }
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // First object will be the one that is modified.
    // Avoid writing to it unnecessarily (Note i starts at 1, not 0).
    var args = [];

    for (var i = 1, len = arguments.length; i < len; i++) {
      args[i-1] = arguments[i];
    }

    // 1. Unpack each object parameter into item.
    // 2. Extract item's keys.
    // 3. Unpack the keys array into name.
    // 4. Write item's property value at name to obj at name.

    return _.reduce(args, function(obj, item) {
      var keys = Object.keys(item);

      _.each(keys, function(name) {
        obj[name] = item[name];
      });

      return obj;
    }, obj);
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    // First object will be the one that is modified.
    // Avoid writing to it unnecessarily (Note i starts at 1, not 0).
    var args = [];

    for (var i = 1, len = arguments.length; i < len; i++) {
      args[i-1] = arguments[i];
    }

    return _.reduce(args, function(obj, item) {
      var keys = Object.keys(item);

      _.each(keys, function(name) {
        // Write to obj only if obj does not already have a key called 'name'.
        if (!(name in obj)) {
          obj[name] = item[name];
        }
      });

      return obj;
    }, obj);
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var previousArgSets = [];
    var results = {};

    return function() {
      var args = [];
      var repeated;

      // Unpack arguments into Array object args, for simplicity.
      for (var i = 0, len = arguments.length; i < len; i++) {
        args[i] = arguments[i];
      }

      // Investigate if the current set of arguments has been called before.
      repeated = _.some(previousArgSets, function(argSet) {
        return _.equalContents(argSet, args);
      });

      // If a new set of arguments is encountered, store them as well as
      // the function's return value.
      if (!repeated) {
        previousArgSets.push(args);
        results[args[0]] = func.apply(this, args);
      } 

      // A hash table probably has to be implemented to avoid storing results
      // only by first argument value.
      return results[args[0]];
    };
  };

  // Compares the contents of two collections, returning true only if each
  // item in collectionA can be found somewhere within collectionB, and
  // only if collectionA's length according to _.len is the same as collectionB.

  _.equalContents = function(collectionA, collectionB) {
    // Ensure one collection is not a subset of the other. Then compare
    // their contents.
    if (_.len(collectionA) !== _.len(collectionB)) {
      return false;
    } else {
      return _.every(collectionA, function(item) {
        return _.contains(collectionB, item);
      });
    }
  };

  // Returns the length of collection if it is an array, or the number of keys
  // according to Object.keys if collection is an object.
  _.len = function(collection) {
    if (Array.isArray(collection)) {
      return collection.length;
    } else {
      return Object.keys(collection).length;
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // Create copy of arguments and then slice off the func and wait parameters.
    var args = _.toArray(arguments).slice(2);

    // Call 'func' with the supplied arguments after 'wait' milliseconds.
    setTimeout(function() {
      return func.apply(this, args);
    }, wait);
  };

  // Returns a new array where each element is a property of obj.
  _.toArray = function(obj) {
    var result = [];
    var keys = Object.keys(obj);
    var len = keys.length;

    for (var i = 0; i < len; i++) {
      result[i] = obj[keys[i]];
    }

    return result;
  }
  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var original = array.slice(0, array.length);
    var result = [];

    // For convenience / readability.
    var randomIndex = function(arr) {
      return Math.floor(Math.random() * arr.length);
    }

    for (var i = 0, len = original.length; i < len; i++) {
      // Extract a single-element array randomly from 'original', then
      // access that element and store it in 'next'.
      var next = original.splice(randomIndex(original),1)[0];

      result.push(next);
    }

    return result;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    if (!result) {
      result = [];
    }

    if (Array.isArray(nestedArray)) {
      _.each(nestedArray, function(item) {
        if (Array.isArray(item)) {
          result.concat(_.flatten(item, result));
        } else {
          result.push(item);
        }
      });
    }

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = _.filter(arguments, function(item) {
      return Array.isArray(item);
    });
   
    var start = args[0] || [];

    return _.reduce(args, function(accumulator, arr) {
      return _.filter(accumulator, function(item) {
        return _.contains(arr, item);
      });
    }, start);
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = _.toArray(arguments).slice(1);
    var combined = _.flatten(args);

    return _.reject(array, function(item) {
      return _.contains(combined, item);
    });
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());