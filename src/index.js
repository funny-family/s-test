/**
 * @see https://www.freecodecamp.org/news/learn-javascript-reactivity-build-signals-from-scratch/
 * @see https://dev.to/ratiu5/implementing-signals-from-scratch-3e4c
 * @see https://dev.to/ryansolid/building-a-reactive-library-from-scratch-1i0p
 */
var signal = function (initialValuePredicate) {
    var value = initialValuePredicate();
    var getter = function () {
        return value;
    };
    var setter = function (predicate) {
        var newValue = predicate(value);
        // Prevent extra assignment to non "primitive" values.
        if (typeof value !== 'object') {
            value = newValue;
        }
        return newValue;
    };
    return [getter, setter];
};
// ------------------------------------ signal ------------------------------------
// ------------------------------------ effect ------------------------------------
var withEffect = function (signalReturnValue) {
    console.log({ signalReturnValue: signalReturnValue }, "".concat(signalReturnValue[1]));
    return signalReturnValue;
};
// TODO!
var effect = function () {
    //
};
// TODO!
var cleanup = function (fn) {
    //
};
// ------------------------------------  effect ------------------------------------
// ------------------------------------  memo ------------------------------------
// TODO!
var memo = function () {
    //
};
// ------------------------------------  memo ------------------------------------
{
    console.group('"count" signal:');
    var _a = signal(function () {
        return 1;
    }), count = _a[0], setCount = _a[1];
    console.log(count());
    setCount(function (prevuesValue) {
        return prevuesValue * 2;
    });
    console.log(count());
    setCount(function (prevuesValue) {
        return Math.pow(prevuesValue, 2);
    });
    console.log(count());
    setCount(function (prevuesValue) {
        return prevuesValue * 2;
    });
    console.log(count());
    console.groupEnd();
}
{
    console.group('"user" signal:');
    var _b = signal(function () {
        return {
            name: 'John Doe',
            age: 30,
            numbers: new Array(1, 2, 3),
        };
    }), user = _b[0], setUser = _b[1];
    console.log(user());
    setUser(function (value) {
        value.name = 'Bob';
        return value;
    });
    console.log(user());
    setUser(function (value) {
        value.numbers[0] = 69;
        return value;
    });
    console.log(user());
    console.groupEnd();
}
{
    console.group('"count" with effect:');
    var _signal = function (initialValuePredicate) {
        return withEffect(signal(initialValuePredicate));
    };
    var _c = _signal(function () {
        return 1;
    }), count = _c[0], setCount = _c[1];
    console.groupEnd();
}
