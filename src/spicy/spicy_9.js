/**************************************************************************
 *
 * Functions as first-class citizens
 *
 **************************************************************************/

/**
 * Write and export a function named "repeat" that calls a given function
 *   over and over a specified number of times.
 *
 * @param fn      The function to repetitively call
 * @param n       The number of times to call the function
 * @param params  An array of parameters to pass to every function invocation
 * @return        Returns an array containing the return values obtained
 *                from calling the function
 */
export const repeat = (fn, n, ...params) => {
    var returns = []
    for (var i = 0; i < n; i++) {
        returns[i] = fn(...params)
    }
    return returns
};


/**
 * Use the repeat function to log the string "Hello, world!" to the console
 *   10 times.
 */
export const repeatDemo = () => {
    function fun(arr) {
        console.log(arr[0])
    }
    var arr = ["Hello, world!"]
    repeat(fun, 10, arr)
};


/**************************************************************************
 *
 * Function currying
 *
 **************************************************************************/

/**
 * Write and export a function named "multiplyBy" which takes a single number
 *   parameter "num1" and returns a function that takes a different number
 *   parameter "num2". The returned function should calculate and return the
 *   product of num1 and num2.
 */
export const multiplyBy = (num1) => {
    return function multiplier(num2) {
        return num1 * num2
    }
};


/**
 * Use the multiplyBy function to create and export a function named
 *   "tenTimes" that multiplies a number by 10.
 */
export const tenTimes = (num) => {
    return multiplyBy(num)(10);
} 


/**
 * Write and export a function named "tenTimesFifty" which uses the tenTimes
 *   function to multiply 50 by 10 and returns the result.
 */
export const tenTimesFifty = () => {
    return tenTimes(50)
};


/**************************************************************************
 *
 * Array callback filtering
 *
 **************************************************************************/

/**
 * Write and export a function named "everyEven" which takes an array and a test
 *   function for checking individual elements of the array. The "everyEven"
 *   function should test the even elements of the array and return true only
 *   if at least one of the even elements passes the test.
 *
 * @param arr   An array whose even elements should be tested
 * @param test  A function which takes as input a single element of the array
 *              and returns true or false, such that true means the element
 *              passed the test and false means it failed
 * @return      boolean true if at every even-indexed element passes the test
 *              function
 *
 * Example usage:
 *    everyEven([1, 5, 1, 0, 1], x => x === 1)  <--  returns true
 *    everyEven([1, 1, 0, 1, 1], x => x === 1)  <--  returns false
 */
export const everyEven = (arr, test) => {
    var any = true
    for (var i = 0; i < arr.length; i = i+2) {
        if (test(arr[i])) {
        } else {
            any = false
        }
    }
    return any
};


/**
 * Write and export a function named "someEven" which takes an array and a test
 *   function for checking individual elements of the array. The "someEven"
 *   function should test the even elements of the array and return true only
 *   if at least one of the even elements passes the test.
 *
 * @param arr   An array whose even elements should be tested
 * @param test  A function which takes as input a single element of the array
 *              and returns true or false, such that true means the element
 *              passed the test and false means it failed
 * @return      boolean true if at least one even-indexed element passes the
 *              test function
 *
 * Example usage:
 *    someEven([4, 3, 2, 1, 0], x => x === 3)  <--  returns false
 *    someEven([1, 0, 1, 0, 1], x => x === 0)  <--  returns false
 *    someEven([1, 1, 1, 1, 0], x => x === 0)  <--  returns true
 *    someEven([0, 0, 0, 0, 0], x => x === 0)  <--  returns true
 */
export const someEven = (arr, test) => {
    var any = false
    for (var i = 0; i < arr.length; i = i+2) {
        if (test(arr[i])) {
            any = true
        }
    }
    return any
};


/**
 * Write and export a function named "filter" which takes an array and a test
 *   function for checking individual elements of the array. The "filter"
 *   function should test the elements of the array and return true only
 *   if all of the odd elements pass the test.
 *
 * @param arr   An array whose elements should be tested
 * @param test  A function which takes as input a single element of the array
 *              and returns true or false, such that true means the element
 *              passes the test and false means it fails the test
 * @return      {fail: [], pass: []} an object with two keys: "pass" and "fail". The value
 *              of "pass" should be an array containing all the elements of arr
 *              which passed the test. The value of "fail" should be an array
 *              containing all the elements of arr which failed the test.
 *
 * Example usage:
 *    filter(['yes', 'nope', 'maybe', 'yellow'], x => x[0] === 'y')
 *       -->  { pass: ['yes', 'yellow'], fail: ['nope', 'maybe'] }
 *    filter([1, 90, 5, 31], x => x % 2 === 1)
 *       -->  { pass: [1, 5, 31], fail: [90] }
 */
export const filter = (arr, test) => {
    var pass = []
    var fai = []

    for (var i = 0; i < arr.length; i++) {
        if (test(arr[i])) {
            pass.push(arr[i])
        } else {
            fai.push(arr[i])
        }
    }

    return {"pass": pass, "fail": fai}
};

function testOdds(num) {
        if (num % 2 == 0) {
            return false
        } else {
            return true
        }
}

/**
 * Write and export a function named "allEvensAreOdd" which takes as input an
 *   array and returns true only if all of the even elements in the array are
 *   odd numbers. Use the "everyEven" function in this function.
 */
export const allEvensAreOdd = (arr) => {
    return everyEven(arr, testOdds)
};


/**
 * Write and export a function named "anEvenIsOdd" which takes as input an
 *   array and returns true if at least one of the even-indexed elements in the
 *   array is an odd number. Use the "someEven" function in this function.
 */
export const anEvenIsOdd = (arr) => {
    return someEven(arr, testOdds)
};


/**
 * Write and export a function named "hasExactly" which takes an array, a test
 *   function for checking individual elements of the array, and a number n.
 *   The "hasExactly" function should return true only if exactly n elements
 *   pass the test. You must use the filter function.
 */
export const hasExactly = (arr, test, n) => {
    var returnedObj = filter(arr, test)
    if (returnedObj.pass.length == n) {
        return true
    } else {
        return false
    }
};
