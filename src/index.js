/**
 * @see https://www.freecodecamp.org/news/learn-javascript-reactivity-build-signals-from-scratch/
 * @see https://dev.to/ratiu5/implementing-signals-from-scratch-3e4c
 * @see https://dev.to/ryansolid/building-a-reactive-library-from-scratch-1i0p
 */
var $PROXYFIED_VALUE = Symbol('PROXYFIED_VALUE');
// var SIGNAL_VALUE_PROXY_HANDLER = {}
var signal = function (initialValuePredicate) {
    var value = initialValuePredicate();
    var proxyfiedValue = new Proxy({
        value: value,
    }, {
        get: function (target, property, receiver) {
            console.log('proxyfiedValue "get":', { target: target, property: property, value: value, receiver: receiver });
            return Reflect.get(target, property, receiver);
        },
        set: function (target, property, value, receiver) {
            console.log('proxyfiedValue "set":', { target: target, property: property, value: value, receiver: receiver });
            return Reflect.set(target, property, value, receiver);
        },
    });
    // var executeAssignment = typeof value !== 'object' && value !== null;
    var getter = function () {
        return proxyfiedValue.value;
    };
    var setter = function (predicate) {
        var newValue = predicate(value);
        // // Prevent extra assignment to non "primitive" values.
        // if (executeAssignment) {
        //   value = newValue;
        // }
        value = newValue;
        return newValue;
    };
    var result = new Array(getter, setter);
    result[$PROXYFIED_VALUE] = proxyfiedValue;
    return result;
};
// ------------------------------------ signal ------------------------------------
// ------------------------------------ effect ------------------------------------
var withEffect = function (signalTuple) {
    var _getter = signalTuple[0];
    var getter = function () {
        console.log('withEffect: "getter"');
        return _getter();
    };
    var _setter = signalTuple[1];
    var setter = function (predicate) {
        console.log('withEffect: "setter"');
        return _setter(predicate);
    };
    console.log({ signalTuple: signalTuple, getter: getter, setter: setter });
    signalTuple[0] = getter;
    signalTuple[1] = setter;
    return signalTuple;
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
    console.log(count());
    setCount(function () {
        return 1337;
    });
    console.log(count());
    console.groupEnd();
}
