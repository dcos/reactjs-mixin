jest.dontMock("../Util");

var Util = require("../Util");

describe('Util', function () {
  describe('#extend', function () {
    beforeEach(function () {
      this.originalObj = {
        a: 5,
        b: 10,
        c: 15
      };
    });

    it('should not change any properties if passed a single argument', function () {
      var newObj = Util.extend(this.originalObj);

      for (var key in this.originalObj) {
        expect(newObj[key]).toEqual(this.originalObj[key]);
      }
    });

    it('should combine properties with the source', function () {
      var source = {
        a: 'changed prop'
      };

      var newObj = Util.extend(this.originalObj, source);
      expect(newObj.a).toEqual('changed prop');
    });

    it('should handle multiple arguments', function () {
      var obj1 = {
        a: 'changed prop',
        b: 'changed prop'
      };

      var obj2 = {
        a: 'overrode prop'
      };

      var newObj = Util.extend(this.originalObj, obj1, obj2);
      expect(newObj.a).toEqual('overrode prop');
      expect(newObj.b).toEqual('changed prop');
    });

    it('should not do anything if not passed an obj', function () {
      var string = 'string';
      var func = function () {};
      func.fakeProp = 'faked prop';
      var nullVal = null;

      var newObj = Util.extend(this.originalObj, string, func, nullVal);

      for (var key in newObj) {
        expect(newObj[key]).toEqual(this.originalObj[key]);
      }
    });
  });

  describe('#exclude', function () {
    beforeEach(function () {
      this.object = {
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      };
    });

    it('doesn\'t exclude any properties', function () {
      var expectedResult = {
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      };
      expect(Util.exclude(this.object, [])).toEqual(expectedResult);
    });

    it('excludes one property', function () {
      var expectedResult = {
        foo: 'foo',
        baz: 'baz'
      };
      expect(Util.exclude(this.object, ['bar'])).toEqual(expectedResult);
    });

    it('excludes multiple properties', function () {
      var expectedResult = {
        baz: 'baz'
      };
      expect(Util.exclude(this.object, ['foo', 'bar', 'qux']))
        .toEqual(expectedResult);
    });

    it('doesn\'t modify the original object', function () {
      var expectedResult = {
        foo: 'foo',
        bar: 'bar',
        baz: 'baz'
      };
      Util.exclude(this.object, ['bar']);
      expect(this.object).toEqual(expectedResult);
    });
  });
});
