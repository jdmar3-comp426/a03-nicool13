import {variance} from "./data/stats_helpers.js";
import { maxAndMin } from "../mild/mild_1.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    var sum = 0
    for (var i = 0; i<array.length; i++) {
        sum += array[i]
    }
    return sum
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    array.sort((a,b) => a-b)
    var med
    if (array.length % 2 == 0) {
        var hiidx = array.length/2
        var loidx = (array.length/2) - 1
        med = (array[hiidx] + array[loidx])/2 
    } else {
        med = array[(array.length-1)/2]
    }
    return med
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    var len = array.length
    var su = getSum(array)
    var me = su/len
    var med = getMedian(array)
    var str = maxAndMin(array)
    var mi = str.min
    var ma = str.max
    var vari = variance(array, me)
    var sd = Math.sqrt(vari)

    return {
        length: len,
        sum: su,
        mean: me,
        median: med,
        min: mi,
        max: ma,
        variance: vari,
        standard_deviation: sd 
    }
}

