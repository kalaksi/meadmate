
// per mol
var MASS = {
    'water': (2 * 1.008 + 16.00),
    'carbon_dioxide': (12.01 + 2 * 16.00),
    'sucrose': (12 * 12.01 + 22 * 1.008 + 11 * 16.00),
    'ethanol': (2 * 12.01 + 5 * 1.008 + 16.00 + 1.008)
};

// g/cm^3
var DENSITY = {
    'water': 1,
    'ethanol': 0.79
};

// How much is ideally converted to ethanol
var SUCROSE_TO_ETHANOL_RATIO = 0.95;

// Ethanol vol-% 
var YEAST_SURVIVAL_LIMIT = 16.0

function update_result_box(ethanol_l, water_l, result_field) {

}

function update_calculation(parameter_fields, calculation_fields) {
    if (typeof parameter_fields.sucrose === 'undefined' ||
        typeof parameter_fields.water === 'undefined') {
        throw Error('Missing or undefined parameter fields');
    }
    if (typeof calculation_fields.sucrose === 'undefined' ||
        typeof calculation_fields.water === 'undefined' ||
        typeof calculation_fields.ethanol === 'undefined' ||
        typeof calculation_fields.result === 'undefined') {
        throw Error('Missing or undefined result fields');
    }

    var all_sugar_g = parseFloat($(parameter_fields.sucrose).val());

    // Other possible sucrose sources such as honey
    if (typeof parameter_fields.other_sucrose.amount !== 'undefined') {
        // content should be either a float or a field id
        if (!isNaN(parseFloat(parameter_fields.other_sucrose.content))) {
            sugar_content = parseFloat(parameter_fields.other_sucrose.content);
        }
        else {
            // Field value is a percentage
            sugar_content = parseFloat($(parameter_fields.other_sucrose.content).val()) / 100.0;
        }
        all_sugar_g += parseFloat($(parameter_fields.other_sucrose.amount).val()) * sugar_content;
    }

    // Water is in litres (dm^3)
    var all_water_l = parseFloat($(parameter_fields.water).val());
    var all_water_g = all_water_l * 1000 * DENSITY.water;
    var amount_sucrose = all_sugar_g / MASS.sucrose;
    var amount_water = all_water_g / MASS.water;

    // Consumption of the other depends on which is the bottleneck
    if (amount_water >= amount_sucrose) {
        amount_water = amount_sucrose;
    }
    else if (amount_water < amount_sucrose) {
        amount_sucrose = amount_water;
    }

    var amount_ethanol = amount_sucrose * 4.0;
    var consumed_water_g = amount_water * MASS.water;
    var water_left_l = (all_water_l - (consumed_water_g / DENSITY.water / 1000.0));
    var ethanol_g = (4.0 * SUCROSE_TO_ETHANOL_RATIO * amount_sucrose) * MASS.ethanol;
    var ethanol_l = (ethanol_g * DENSITY.ethanol) / 1000.0

    $(calculation_fields.sucrose).html(all_sugar_g.toFixed(2) + ' g');
    $(calculation_fields.water).html(consumed_water_g.toFixed(2) + ' g');
    $(calculation_fields.ethanol).html(ethanol_g.toFixed(2) + ' g' +
                                    ' (' + ethanol_l.toFixed(2) + ' litres)');

    update_result_box(ethanol_l, water_left_l, calculation_fields.result);
}

function fermentation_fields(source_fields, destination_fields, with_function) {
    if (typeof with_function === 'undefined') {
        with_function = update_calculation;
    }

    // Note that with_function still receives info of ALL fields, not only 1 source
    $.each(source_fields, function(key, source_id) {
        // Special case of 'other_sucrose'
        if (typeof source_id.amount !== 'undefined') {
            source_id = source_id.amount;
        }
        $(source_id).ready(function() { 
            with_function(source_fields, destination_fields)
        });
        $(source_id).change(function() { 
            with_function(source_fields, destination_fields)
        });
    });
}


