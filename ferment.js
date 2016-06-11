
// per mol
var MASS = {
    'water': (2 * 1.008 + 16.00),
    'carbon_dioxide': (12.01 + 2 * 16.00),
    'sucrose': (12 * 12.01 + 22 * 1.008 + 11 * 16.00),
    'ethanol': (2 * 12.01 + 5 * 1.008 + 16.00 + 1.008)
};

// g/cm^3
var DENSITY = {
    'ethanol': 0.79
};

function update_calculation(parameter_fields, equation_fields) {
    if (typeof parameter_fields.sucrose === 'undefined' ||
        typeof parameter_fields.water === 'undefined') {
        throw Error('Missing or undefined parameter fields');
    }
    if (typeof equation_fields.sucrose === 'undefined' ||
        typeof equation_fields.water === 'undefined' ||
        typeof equation_fields.ethanol === 'undefined') {
        throw Error('Missing or undefined equation fields');
    }

    var all_sugar = parseFloat($(parameter_fields.sucrose).val());

    // Other possible sucrose sources such as honey
    if (typeof parameter_fields.other_sucrose.amount !== 'undefined') {
        // content should be either a float or a field id
        if (!isNaN(parseFloat(parameter_fields.other_sucrose.content))) {
            sugar_content = parseFloat(parameter_fields.other_sucrose.content);
        }
        else {
            sugar_content = parseFloat($(parameter_fields.other_sucrose.content).val());
        }
        all_sugar += parseFloat($(parameter_fields.other_sucrose.amount).val()) * sugar_content;
    }

    var amount_sucrose = all_sugar / MASS.sucrose;
    var amount_water = parseFloat($(parameter_fields.water).val()) * 1000.0 / MASS.water;
    var amount_ethanol = amount_sucrose * 4.0;

    // Consumption of the other depends on which is the bottleneck
    if (amount_water >= amount_sucrose) {
        amount_water = amount_sucrose;
    }
    else if (amount_water < amount_sucrose) {
        amount_sucrose = amount_water;
    }

    var ethanol_g = (4.0 * amount_sucrose) * MASS.ethanol;
    var ethanol_l = (ethanol_g * DENSITY.ethanol) / 1000.0

    $(equation_fields.sucrose).html(amount_sucrose.toFixed(2) + ' g');
    $(equation_fields.water).html(amount_water.toFixed(2) + ' g');
    $(equation_fields.ethanol).html(ethanol_g.toFixed(2) + ' g' +
                                    ' (' + ethanol_l.toFixed(2) + ' litres)');
}

function bind_fields(source_fields, destination_fields, with_function) {
    if (typeof with_function === 'undefined') {
        with_function = update_calculation;
    }

    // Note that with_function still receives info of ALL fields, not only 1 source
    $.each(source_fields, function(key, source_id) {
        $(source_id).ready(function() { 
            with_function(source_fields, destination_fields)
        });
        $(source_id).change(function() { 
            with_function(source_fields, destination_fields)
        });
    });
}

$(document).ready(function() {
    bind_fields({'sucrose': '#sugar', 'water': '#water', 'other_sucrose': {'amount': '#honey', 'content': 0.83}},
                {'sucrose': '#equation_sugar', 'water': '#equation_water', 'ethanol': '#equation_ethanol'});
});


