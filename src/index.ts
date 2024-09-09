/**
 * @see https://www.freecodecamp.org/news/learn-javascript-reactivity-build-signals-from-scratch/
 * @see https://dev.to/ratiu5/implementing-signals-from-scratch-3e4c
 * @see https://dev.to/ryansolid/building-a-reactive-library-from-scratch-1i0p
 */

// ------------------------------------ signal ------------------------------------
type SignalGetter<TValue extends any> = () => TValue;
type SignalSetter<TValue extends any> = (predicate: (prevuesValue: TValue) => TValue) => TValue;
type InitialValuePredicate<TValue extends any> = () => TValue;
type Signal<TValue extends any> = (
  initialValuePredicate: InitialValuePredicate<TValue>
) => [SignalGetter<TValue>, SignalSetter<TValue>];

var signal = <TValue extends any>(
  initialValuePredicate: InitialValuePredicate<TValue>
): [SignalGetter<TValue>, SignalSetter<TValue>] => {
  var value = initialValuePredicate();

  const getter: SignalGetter<TValue> = () => {
    return value;
  };

  const setter: SignalSetter<TValue> = (predicate) => {
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
var withEffect = <TValue extends any>(signalReturnValue: ReturnType<Signal<TValue>>) => {
  console.log({ signalReturnValue }, `${signalReturnValue[1]}`);

  return signalReturnValue;
};

type Effect = (fn: () => void) => void;
// TODO!
var effect: Effect = () => {
  //
};

type Cleanup = (fn: () => void) => void;
// TODO!
var cleanup: Cleanup = (fn) => {
  //
};
// ------------------------------------  effect ------------------------------------

// ------------------------------------  memo ------------------------------------
// TODO!
var memo = () => {
  //
};
// ------------------------------------  memo ------------------------------------

{
  console.group('"count" signal:');
  var [count, setCount] = signal(() => {
    return 1;
  });

  console.log(count());

  setCount((prevuesValue) => {
    return prevuesValue * 2;
  });

  console.log(count());

  setCount((prevuesValue) => {
    return prevuesValue ** 2;
  });

  console.log(count());

  setCount((prevuesValue) => {
    return prevuesValue * 2;
  });

  console.log(count());
  console.groupEnd();
}

{
  console.group('"user" signal:');
  var [user, setUser] = signal(() => {
    return {
      name: 'John Doe',
      age: 30,
      numbers: new Array(1, 2, 3),
    };
  });

  console.log(user());

  setUser((value) => {
    value.name = 'Bob';

    return value;
  });

  console.log(user());

  setUser((value) => {
    value.numbers[0] = 69;

    return value;
  });

  console.log(user());
  console.groupEnd();
}

{
  console.group('"count" with effect:');
  var _signal = <TValue extends any>(initialValuePredicate: InitialValuePredicate<TValue>) => {
    return withEffect(signal(initialValuePredicate));
  };

  var [count, setCount] = _signal(() => {
    return 1;
  });
  console.groupEnd();
}
