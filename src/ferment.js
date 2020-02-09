// Copyright (C) 2016 kalaksi@users.noreply.github.com
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// g/mol
const MASS_PER_MOL = {
    'water': (2 * 1.008 + 16.00),
    'carbon_dioxide': (12.01 + 2 * 16.00),
    'sucrose': (12 * 12.01 + 22 * 1.008 + 11 * 16.00),
    'ethanol': (2 * 12.01 + 5 * 1.008 + 16.00 + 1.008)
};
// g/cm^3
const DENSITY = {
    'water': 1,
    'ethanol': 0.79
};
// How much is ideally converted to ethanol
const SUCROSE_TO_ETHANOL_RATIO = 0.95;
// Ethanol vol-% 
const YEAST_SURVIVAL_LIMIT = 15.0

/**
 * Find the closest numeric key to `target` in a hash without exceeding `target`.
 * @param {*} target Target number to look for in hash keys.
 * @param {*} hash The key-value store we're looking the keys in. Keys must be numeric.
 * @return The hash key.
 */
function select_response(target, hash) {
    let hash_keys = Object.keys(hash);

    let selected = hash_keys.reduce(function(previous, current) {
        if (target - parseFloat(current) > 0) {
            return current;
        }
        else {
            return previous;
        }
    });
    return selected;
}

/**
 * 
 * @param {*} ethanol_amount Amount of ethanol, in litres.
 * @param {*} water_amount Amount of water, in litres.
 */
function rate_my_mead(ethanol_amount, water_amount) {

    // vol-%
    let percentage = (ethanol_amount / water_amount) * 100.0;
    let litres = ethanol_amount + water_amount;

    if (isNaN(percentage)) {
        percentage = 0.0;
    }
    else if (percentage > 99.99) {
        percentage = 100.0;
    }

    let responses = {
        'amount': {
            '0': 'Barely a crappy ' + litres.toFixed(1) + ' litres',
            '2': litres.toFixed(1) + ' litres',
            '30': 'A crazy ' + litres.toFixed(1) + ' litres',
        },
        'percentage': {
            '0': 'lame and watery mead with only ' + percentage.toFixed(1) + ' % of alcohol',
            '2': 'awesome and sweet mead with ' + percentage.toFixed(1) + ' % of alcohol',
            '9': 'pretty strong but fine mead with ' + percentage.toFixed(1) + ' % of alcohol',
            '15': 'mead-booze with ' + percentage.toFixed(1) + ' % of alcohol and DEAD YEAST',
            '19': 'actually impossible-to-ferment mead with ' + percentage.toFixed(1) + ' % of alcohol and DEAD YEAST',
        },
        'status': {
            '0': 'success',
            '9': 'warning',
            '15': 'danger',
        },
    }

    return {
        'message': responses.amount[select_response(litres, responses.amount)] +
                   ' of ' + responses.percentage[select_response(percentage, responses.percentage)],
        'status': responses.status,
    };
}

/** 
 * 
 * @param sucrose Sucrose, in grams.
 * @param water Amount of water, in litres (dm^3).
 */
export default function ferment(all_sucrose, all_water, units_in_mols=false) {
    // Begin with optimistic values. Units in mols.
    let consumption = {
        'sucrose': all_sucrose / MASS_PER_MOL.sucrose,
        'water': (all_water * 1000 * DENSITY.water) / MASS_PER_MOL.water,
    };

    // Consumption of the other depends directly on which is the bottleneck
    consumption.sucrose = Math.min(consumption.water, consumption.sucrose);
    // Not 100% is usually converted to ethanol.
    consumption.sucrose *= SUCROSE_TO_ETHANOL_RATIO;

    consumption.water = consumption.sucrose;


    // in mols
    let product = {
        'ethanol': consumption.sucrose * 4,
        'carbon_dioxide': consumption.sucrose * 4
    };

    if (units_in_mols === false) {
        consumption.sucrose *= MASS_PER_MOL.sucrose; // grams
        consumption.water = consumption.water * MASS_PER_MOL.water / DENSITY.water / 1000; // litres
        product.ethanol *= MASS_PER_MOL.ethanol; // grams
        product.water = product.water * MASS_PER_MOL.water / DENSITY.ethanol / 1000; // litres
        product.carbon_dioxide *= MASS_PER_MOL.carbon_dioxide; // grams
    }
    
    console.log(consumption);

    return {
        'consumption': consumption,
        'product': product
    };
}
