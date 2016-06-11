

function ferment(sucrose, water) {
    if (sucrose === undefined || water === undefined) {
        throw Error('Not enough parameters for fermentation');
    }
    else if (isNaN(parseFloat(sucrose)) || isNan(parseFloat(water))) {
        throw Error('ferment() needs numbers as parameters');
    }

    // per mol
    var water_mass = (2 * 1.008 + 16.00);
    var carbon_dioxide_mass = (12.01 + 2 * 16.00); 
    var sucrose_mass = (12 * 12.01 + 22 * 1.008 + 11 * 16.00);
    var ethanol_mass = (2 * 12.01 + 5 * 1.008 + 16.00 + 1.008);

    var ethanol_density = 0.79; // g/cm^3
}

function update_fields(readonly_fields) {
    readonly_fields.forEach(function(value, index) {
        $(value).html(index);
    });
}

function watch_fields(parameter_fields, readonly_fields) {
    if (parameter_fields.constructor !== Array) {
        throw Error('watch_fields() needs an array as a parameter');
    }

    parameter_fields.forEach(function(value, index) {
        $(value).change(function() {
            update_fields(readonly_fields);
        });
    });
}

function bind_field(parameter_field, equation_field) {
    $(parameter_field).change(function() {
        $(equation_field).html(parameter_field.value);
    });
}

bind_field('#sugar', '#equation_sugar');
