var fs = require('fs');
var mkdirp = require('mkdirp');
const uuidv1 = require('uuid/v1');
var PSD = require('psd');
var Promise = require('bluebird');
var util = require('util');
var path = require("path");
var trycatch = require('trycatch');


function PsdUtil() {

    this.rootData = {
        children: []
    };

    this.applicationFolderPath = null;
    this.file = null;
    this.fileList = [];
    this.newfileList = [];

    this.checkFileIndex = 0;



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
        this.rootData.name = "FrameLayout";



        if (root.hasChildren()) {
            var children = root.children().reverse();
            for (var i = 0; i < children.length; i++) {
                const aChild = this.createObjectNode(this.rootData, children[i], 0, 0);
                if (aChild) {
                    this.rootData.children.push(aChild);
                }

            }
        }

        // console.log("psd data = " + JSON.stringify(this.rootData));
    }



    this.createObjectNode = function(parent, node, parentX, parentY) {



        if (node.get("width") == 0 || node.get("height") == 0 || node.get("opacity") == 0 || !node.visible()) {
            return;
        }



        const id = uuidv1();
        const aData = { id: id };
        aData.parent = parent.id;
        aData.text = node.get('name').substring(0, 200);
        aData.name = aData.text;
        aData.children = [];

        aData.width = node.get("width");
        aData.height = node.get("height");

        var x = node.get("left") - parentX;
        var y = node.get("top") - parentY;


        aData.alpha = node.get("opacity") / 255;


        if (node.isGroup()) {
            aData.type = "FrameLayout";
            aData.marginLeft = x;
            aData.marginTop = y;

            if (node.hasChildren()) {
                var children = node.children().reverse();
                for (var i = 0; i < children.length; i++) {
                    const aChild = this.createObjectNode(aData, children[i], parentX + x, parentY + y);

                    if (aChild) {
                        aData.children.push(aChild);
                    }

                }
            }
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
        return aData;
    }


    this.makeSmallEnglish = function(origin) {
        var result = this.makeEnglish(origin.toLowerCase());
        if (!isNaN(parseInt(result[0], 10)) || result.length == 0 || result.startsWith('_')) {
            // Is a number
            result = "image" + result;
        }
        return result;
    }

    this.makeEnglish = function(origin) {
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
            this.checkFileIndex = 0;
            self.saveImageList(self.newfileList, resolve, reject);
        });
    }


    this.saveImageList = function(list, resolve, reject) {

        let size = list.length;
        var files = [];
        const self = this;
        const from = this.checkFileIndex;


        for (var i = from; i < size; i++) {
            console.log(i + ", " + list[i].filePath);
            files.push(self.createdPNGFile(list[i]));
            this.checkFileIndex = i;
        }
        if (size - 1 == this.checkFileIndex) {
            Promise.all(files).then(function() {
                resolve("done");
            });
        } else {
            Promise.all(files).then(function() {
                self.saveImageList(list, resolve, reject);
            });
        }
    }




    this.createdPNGFile = function(data) {
        const self = this;
        return new Promise(function(resolve, reject) {

            var filePath = data.filePath;

            trycatch(function() {
                // do something error-prone
                data.node.saveAsPng(filePath).then(function() {
                    console.log("save success - " + filePath);
                    resolve(filePath);
                });
            }, function(err) {
                console.log("error = " + err.stack);
                reject(err.stack);
            })


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