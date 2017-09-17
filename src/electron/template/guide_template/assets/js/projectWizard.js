function ProjectWizard() {

    this.applicationData;
    this.activityData;
    this.activityMeta;

    this.lastId = 0;
    this.idHash = {};
    this.activityDataHash = {};
    this.retryCount = {};
    this.imageCount = 0;


    this.initApplicationData = function(applicationData) {
        this.applicationData = applicationData;
        //make activity name
        for (var i = 0; i < this.applicationData.activityList.length; i++) {
            var activity = this.applicationData.activityList[i];
            activity.activityName = this.getUniqueActivityName(activity.activityName);
            activity.layoutName = this.getUniqueLayoutName(activity.activityName);
        }
    };

    this.initActivityData = function(activityData) {





    }












    this.makeSmallEnglish = function(origin) {
        console.log("makeSmallEnglish =" + origin);
        return this.makeEnglish(origin.toLowerCase());
    }

    this.makeEnglish = function(origin) {
        console.log("makeEnglish =" + origin);
        return origin.trim().replace(/\s/gi, '_').replace(/[^a-zA-Z0-9]/g, '_').replace('-', '_');
    }


    this.getUniqueActivityName = function(origin) {
        var result = this.makeEnglish(origin);
        if (!isNaN(parseInt(result[0], 10)) || result.length == 0 || result.startsWith('_')) {
            // Is a number
            result = "Activity" + result;
        }
        return this.getUniqueName(result);
    }


    this.getUniqueResourceName = function(origin) {

        var result = this.makeSmallEnglish(origin);
        if (!isNaN(parseInt(result[0], 10)) || result.length == 0 || result.startsWith('_')) {
            // Is a number
            result = "resource" + result;
        }
        return this.getUniqueName(result);
    }

    this.getUniqueLayoutName = function(origin) {

        var result = this.makeSmallEnglish(origin);
        if (!isNaN(parseInt(result[0], 10)) || result.length == 0 || result.startsWith('_')) {
            // Is a number
            result = "activity_" + result;
        }
        return this.getUniqueName(result);
    }


    this.getUniqueName = function(origin) {
        var result = origin;
        while (this.idHash[result]) {
            result = origin + "_" + this.lastId;
            this.lastId++;
        }
        this.idHash[result] = true;
        return result;
    }




}