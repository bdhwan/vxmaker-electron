var fs = require('fs');
var mkdirp = require('mkdirp');
const uuidv1 = require('uuid/v1');
var PSD = require('psd');


function PsdUtil() {

    this.parsePSD = function(file, applicationFolderPath) {


        let tempId = uuidv1();
        console.log("tempId = " + tempId);

        return tempId;





    }










}



module.exports = PsdUtil;