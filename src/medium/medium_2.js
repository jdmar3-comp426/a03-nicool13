import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";
import { maxAndMin } from "../mild/mild_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: getAvgMpg(),
    /*
    get avgMpg() {
        var citySum = 0
        var hwaySum = 0
        for (var i = 0; i < mpg_data.length; i++) {
            citySum += mpg_data[i].city_mpg
            hwaySum += mpg_data[i].highway_mpg
        }
        var cityavg = citySum / mpg_data.length
        var hwayavg = hwaySum / mpg_data.length
        return {city: cityavg, highway: hwayavg}
    },
    */
    allYearStats: getYearStats(),
    /*
    get allYearStats() {
        var years = []
        for (var i = 0; i < mpg_data.length; i++) {
            years.push(mpg_data[i].year)
        }
        return getStatistics(years)
    },
    */
    ratioHybrids: getRatio(),
    /*
    get ratioHybrids() {
        var numHyb = 0
        for (var i = 0; i < mpg_data.length; i++) {
            if(mpg_data[i].hybrid) {
                numHyb += 1
            }
        }
        return numHyb/mpg_data.length
    }
    */
};

function getAvgMpg() {
    var citySum = 0
        var hwaySum = 0
        for (var i = 0; i < mpg_data.length; i++) {
            citySum += mpg_data[i].city_mpg
            hwaySum += mpg_data[i].highway_mpg
        }
        var cityavg = citySum / mpg_data.length
        var hwayavg = hwaySum / mpg_data.length
        return {city: cityavg, highway: hwayavg}
}

function getYearStats() {
    var years = []
        for (var i = 0; i < mpg_data.length; i++) {
            years.push(mpg_data[i].year)
        }
        return getStatistics(years)
}

function getRatio() {
    var numHyb = 0
        for (var i = 0; i < mpg_data.length; i++) {
            if(mpg_data[i].hybrid) {
                numHyb += 1
            }
        }
        return numHyb/mpg_data.length
}


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: getHybrids(),
    avgMpgByYearAndHybrid: getAvgMpgByYearAndHybrid()
};

function getHybrids() {
    var hybrids = mpg_data.prototype.filter(checkhybrid)
    var tmp = []
    for (var i = 0; i < hybrids.length; i++) {
        if (tmp.prototype.forEach(this.make != hybrids[i].make)) {
            var ids = [hybrids[i].id]
            tmp.push({make: hybrids[i].make, hybrids: ids})
        } else {
            idx = tmp.prototype.findIndex(this.make == hybrids[i].make)
            tmp[idx].hybrids.push(hybrids[i].id)
        }
    }
    tmp.sort(function(a, b) {
        if (a.hybrids.length > b.hybrids.length) {
            return -1
        } else {
            return 1
        }
    })
    return tmp 
}

function checkhybrid() {
    return this.hybrid
}

function getAvgMpgByYearAndHybrid() {
    var years = new Object()
    var hybs = 0
    var nonhybs = 0
    for (var i = 0; i < mpg_data; i++) {
        if (years.hasOwnProperty(mpg_data[i].year)) {
            if (mpg_data[i].hybrid) {
                hybs += 1
                years[mpg_data[i].year].hybrid.city += mpg_data[i].city_mpg
                years[mpg_data[i].year].hybrid.highway += mpg_data[i].highway_mpg
            } else {
                nonhybs += 1
                years[mpg_data[i].year].notHybrid.city += mpg_data[i].city_mpg
                years[mpg_data[i].year].notHybrid.highway += mpg_data[i].highway_mpg
            }
        } else {
            if (mpg_data[i].hybrid) {
                hybs += 1
                years[mpg_data[i].year] = {hybrid: {city: mpg_data[i].city_mpg, highway: mpg_data[i].highway_mpg}, notHybrid: {city: 0, highway: 0}}
            } else {
                nonhybs += 1
                years[mpg_data[i].year] = {hybrid: {city: 0, highway: 0}, notHybrid: {city: mpg_data[i].city_mpg, highway: mpg_data[i].highway_mpg}}
            }
        }
    }
    years.prototype.forEach(
        makeaverages(this) 
    )
    return years
}

function makeaverages(year) {
    year.hybrid.city = year.hybrid.city / hybs
    year.hybrid.highway = year.hybrid.highway / hybs
    year.notHybrid.city = year.notHybrid.city / nonhybs
    year.notHybrid.highway = year.notHybrid.highway / nonhybs
}