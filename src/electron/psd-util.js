var fs = require('fs');
var mkdirp = require('mkdirp');
const uuidv1 = require('uuid/v1');
var PSD = require('psd');
var Promise = require('bluebird');
var util = require('util');
var path = require("path");

function PsdUtil() {

    this.rootData = {
        children: []
    };

    this.applicationFolderPath = null;
    this.file = null;
    this.fileList = [];
    this.newfileList = [];



    this.parsePSD = function(file, applicationFolderPath) {

        const self = this;
        this.applicationFolderPath = applicationFolderPath;
        this.file = file;


        this.rootData.text = path.parse(file).name;
        this.rootData.marginLeft = 0;
        this.rootData.marginTop = 0;


        const imageFolder = applicationFolderPath + "/image";

        fs.readdirSync(imageFolder).forEach(file => {
            console.log(path.parse(file).name);
            self.fileList.push(path.parse(file).name);
        })


        return new Promise(function(resolve, reject) {
            PSD.open(file).then(function(psd) {
                const root = psd.tree();
                self.createRootNode(root);
                return null;
            }).then(function(result) {
                console.log("data = " + JSON.stringify(result));
                return self.saveImage();
            }).then(function(result) {
                console.log("done create images=" + JSON.stringify(self.rootData));
                resolve(JSON.stringify(self.rootData));
            }).catch(function(err) {
                console.log("erro = " + JSON.stringify(err));
                reject(err);
            });
        })
    }

    this.createRootNode = function(root) {
        // console.log("width =" + root.get("width"));
        // console.log("height =" + root.get("height"));
        this.rootData.id = uuidv1();
        this.rootData.width = root.get("width");
        this.rootData.height = root.get("height");
        this.rootData.type = "FrameLayout";


        if (root.hasChildren()) {
            var children = root.children().reverse();
            for (var i = 0; i < children.length; i++) {
                this.createObjectNode(this.rootData, children[i], 0, 0);
            }
        }
    }



    this.createObjectNode = function(parent, node, parentX, parentY) {

        if (node.get("width") == 0 || node.get("height") == 0 || node.get("opacity") == 0 || !node.visible()) {
            return;
        }

        var id = uuidv1();
        var aData = { id: id };
        aData.parent = parent.id;
        aData.text = node.get('name').substring(0, 200);
        aData.children = [];

        aData.width = node.get("width");
        aData.height = node.get("height");

        var x = node.get("left") - parentX;
        var y = node.get("top") - parentY;

        if (node.isGroup()) {
            aData.type = "FrameLayout";
            aData.marginLeft = x;
            aData.marginTop = y;

        } else {
            aData.type = "ImageView";

            aData.marginLeft = x;
            aData.marginTop = y;

            var fileName = "image/" + this.getUniuqeId(aData.text) + ".png";
            var filePath = this.applicationFolderPath + "/" + fileName;

            aData.dataUrl = fileName;

            var aNode = {
                name: fileName,
                filePath: filePath,
                node: node
            }
            this.newfileList.push(aNode);
        }

        aData.alpha = node.get("opacity") / 255;
        parent.children.push(aData);
        if (node.hasChildren()) {
            var children = node.children().reverse();
            for (var i = 0; i < children.length; i++) {
                this.createObjectNode(aData, children[i], parentX + x, parentY + y);
            }
        }
    }


    this.makeSmallEnglish = function(origin) {
        console.log("makeSmallEnglish =" + origin);
        var result = this.makeEnglish(origin.toLowerCase());
        if (!isNaN(parseInt(result[0], 10)) || result.length == 0 || result.startsWith('_')) {
            // Is a number
            result = "image" + result;
        }
        return result;
    }

    this.makeEnglish = function(origin) {
        console.log("makeEnglish =" + origin);
        return origin.trim().replace(/\s/gi, '_').replace(/[^a-zA-Z0-9]/g, '_').replace('-', '_');
    }

    this.getUniuqeId = function(prefix) {
        if (prefix) {
            return this.getUniqueName(this.makeSmallEnglish(prefix));
        } else {
            return this.getUniqueName("id_");
        }
    }


    this.getUniqueName = function(origin) {
        var result = origin;
        var indexId = 0;
        while (this.fileList.contains(result)) {
            result = origin + "_" + indexId;
            indexId++;
        }
        this.fileList.push(result);
        return result;
    }

    this.saveImage = function() {


        const self = this;

        return new Promise(function(resolve, reject) {
            var files = [];
            for (var i = 0; i < self.newfileList.length; i++) {
                files.push(self.createdPNGFile(self.newfileList[i]));
            }
            Promise.all(files).then(function() {
                console.log("all the files were created");
                resolve("done");
            });
        });
    }


    this.createdPNGFile = function(data) {
        return new Promise(function(resolve, reject) {

            var filePath = data.filePath;
            try {
                data.node.saveAsPng(filePath).then(function(data) {
                    console.log("save success - " + filePath);
                    resolve(filePath);
                });

            } catch (err) {
                console.log("err = " + JSON.stringify(err));
                reject(err);
            }
        });
    }


    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }




}


module.exports = PsdUtil;