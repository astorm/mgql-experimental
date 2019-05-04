module.exports = function(string, mask) {
    //@TODO: https://stackoverflow.com/questions/26156292/trim-specific-character-from-a-string
    while(string.charAt(0)==mask) {
        string = string.substring(1);
    }

    while(string.charAt(string.length-1)==mask) {
        string = string.substring(0,string.length-1);
    }

    return string;
}
