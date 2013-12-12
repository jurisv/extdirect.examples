var DXFormTest = {
    testMe: function(params, callback){
        callback({
            success:true,
            msg:'Hello world',
            params: params
        });
    },

    testException: function(params, callback){
        failedHere; // explicit typo
        callback({
            success:true
        });
    },


    load: function(params, callback){
        callback({
            success:true,
            data:{
                firstname:'John',
                lastname: 'Smith',
                email: 'john.smith@comapny.info'
            }
        });
    },

    submit: function(params,  callback/*formHandler*/){
        callback({
            success:true,
            params:params
        });

    },

    filesubmit: function(params, callback, sessionID, request, response/*formHandler*/){
        var files = request.files; //get files from request object
        // console.log(params, files)

        // Do something with uploaded file, e.g. move to another location
        var fs = require('fs'),
            file = files.photo,
            tmp_path = file.path;

        // set where the file should actually exists - in this case it is in the "demo" directory
        var target_path = './public/uploaded_images/' + file.name;

        var successfulUpload = function(cb){

        };

        var failedUpload = function(cd, error){

        };

        // move the file from the temporary location to the intended location
        // do it only if there is a file with size
        if(file.size > 0){
            try{
                fs.rename(tmp_path, target_path, function(err) {
                    if(err){
                        callback({
                            success: false,
                            msg: "Upload failed - can't rename the file",
                            errors: err.message
                        });
                    }
                    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                    fs.unlink(tmp_path, function() {
                        callback({
                            success: true,
                            msg: 'Uploaded successfully',
                            size: file.size,
                            name: file.name
                        });
                    });
                });
            }catch(e) {
//                callback({
//                    success: false,
//                    msg: "Upload failed - can't rename the file",
//                    errors: e.message
//                });
            }
        }else{
            callback({
                success: false,
                msg: "Upload failed - empty file",
                params: params,
                errors: {
                    clientCode: "File not found",
                    portOfLoading: "This field must not be null"
                }
            });
        }
    }
};

module.exports = DXFormTest;