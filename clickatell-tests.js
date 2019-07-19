// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from 'meteor/tinytest';

// Import and rename a variable exported by clickatell.js.
import { name as packageName } from 'meteor/daveff:clickatell';

// Write your tests here!
// Here is an example.
Tinytest.add('clickatell - example', test => {
  test.equal(packageName, 'clickatell');
});
