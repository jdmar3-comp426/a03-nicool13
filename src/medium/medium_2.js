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
    var hybrids = mpg_data.filter(r => r.hybrid)
    var tmp = []
    for (var i = 0; i < hybrids.length; i++) {
        if (tmp.every(element => element.make !== hybrids[i].make) || tmp.length == 0) {
            var ids = [hybrids[i].id]
            tmp.push({make: hybrids[i].make, hybrids: ids})
        } else {
            var idx = tmp.findIndex(element => element.make === hybrids[i].make)
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
    console.log(tmp)
    return tmp 
}


function getAvgMpgByYearAndHybrid() {
    var years = new Object()
    var ans = new Object()
    for (var i = 0; i < mpg_data.length; i++) {
        if (years.hasOwnProperty(mpg_data[i].year)) {
            var curYearData = mpg_data.filter(elt => elt.year === mpg_data[i].year)
                        
            var hcity = 0
            var nhcity = 0
            var hhighway = 0
            var nhhighway = 0

            var hybs = 0
            var nonhybs = 0

            for (var j = 0; j < curYearData.length; j++) {
                if (curYearData[j].hybrid) {
                    hybs += 1
                    hcity += curYearData[j].city_mpg
                    hhighway += curYearData[j].highway_mpg
                } else {
                    nonhybs += 1
                    nhcity += curYearData[j].city_mpg
                    nhhighway += curYearData[j].highway_mpg
                }
            }

            hcity = hcity / hybs
            hhighway = hhighway / hybs
            nhcity = nhcity / nonhybs
            nhhighway = nhhighway / nonhybs

            var hybrid = new Object()
            Object.defineProperties(hybrid, {"city": {value: hcity, enumarable: true}, 
            "highway": {value: hhighway, enumarable: true}})
            var notHybrid = new Object()
            Object.defineProperties(notHybrid, {"city": {value: nhcity, enumarable: true}, 
            "highway": {value: nhhighway, enumarable: true}})

            var year = new Object()
            Object.defineProperties(year, {"hybrid": {value: hybrid, enumarable: true},
            "notHybrid": {value: notHybrid, enumarable: true}})

            years.mpg_data[i].year = year

            //Object.defineProperty(ans, mpg_data[i].year, {value: year, enumerable: true})


        } else {
            Object.defineProperty(years, mpg_data[i].year)
        }
    }

    return ans

} 
