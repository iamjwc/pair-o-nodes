//% views/tests/basicClass.js

"BasicClass".should("have an instance method to do basic things", function() {
  var bc = new BasicClass();

  bc.shouldHaveKey('basicStuff');
  bc.basicStuff.shouldBeA(Function);
});
