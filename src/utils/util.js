
exports.convertDateToUTC = (date) => { 
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); 
}

exports.isNumeric = (str) => {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

exports.getPkgJsonDir = async () => {
    const { dirname } = require ( 'path' );
    const { constants, promises: { access } } = require ( 'fs' );

    for ( let path of module.paths ) {
        try {
            let prospectivePkgJsonDir = dirname ( path );
            await access ( path, constants.F_OK );
            return prospectivePkgJsonDir;
        } catch ( e ) {}
    }
    
}

exports.replaceAll = function(texto, search, replacement) {
    var target = texto;
    return target.replace(new RegExp(search, 'g'), replacement);
};
