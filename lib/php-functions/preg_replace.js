var preg_replace = function(pattern, replacement, subject, limit, count) {
    // @TODO: need to parse incoming regular expression for actual flags, strip
    // containing characters, etc.
    const regEx = new RegExp(pattern, 'g')

    return subject.replace(regEx, replacement)
}

module.exports = preg_replace;
