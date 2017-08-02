var PsdUtil = require('./psd-util.js');


const psdFilePath = '/Users/bdhwan/Desktop/test.psd';

const applicationFolderPath = '/Users/bdhwan/Desktop/UntitledApplication';
const psdUtil = new PsdUtil();
psdUtil.parsePSD(psdFilePath, applicationFolderPath).then(function(result) {
    console.log("will return to web = " + result);
});