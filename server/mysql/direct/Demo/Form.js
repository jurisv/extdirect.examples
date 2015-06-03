var Form = {

    role: 'admin',

    testMe: function(params, callback) {
        callback(null, {
            randomNumber: 20,
            msg: 'Hello world',
            params: params
        });
    },

    testFalse: function(params, callback) {
        callback(null, false);
    },

    testException: function(params, callback) {
        throw {message: 'Error captured'};
    },

    load: function(params, callback) {
        callback(null, {
            data: {
                firstname: 'John',
                lastname: 'Smith',
                email: 'john.smith@company.info'
            }
        });
    },

    submit: function(params,  callback) {
        //@formHandler
        callback(null, {
            msg: 'User data updated',
            params: params
        });
    },

    filesubmit: function(params, callback, sessionID, request, response) {
        //@formHandler
        var files = request.files; //get files from request object
        // console.log(params, files)

        // Do something with uploaded file, e.g. move to another location
        var fs = require('fs'),
            file = files.photo,
            tmp_path = file.path;

        // set where the file should actually exists - in this case it is in the "demo" directory
        var target_path = './public/uploaded_images/' + file.name;

        var successfulUpload = function(cb) {

        };

        var failedUpload = function(cd, error) {

        };

        // move the file from the temporary location to the intended location
        // do it only if there is a file with size
        if(file.size > 0){
            try{
                fs.rename(tmp_path, target_path, function(err) {
                    if(err){

                        callback({
                            errors: err.message,
                            message: "Upload failed - can't rename the file"
                        });
                    }
                    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                    fs.unlink(tmp_path, function() {
                        callback(null, {
                            message: 'Uploaded successfully',
                            size: file.size,
                            name: file.name
                        });
                    });
                });
            }catch(e) {
//                callback({
//                    errors: err.message,
//                    message: "Upload failed - can't rename the file"
//                });
            }
        }else{
            callback({
                //success: false, // will be set to false automatically as we have configured our server with responseHelper: true
                message: "Upload failed - empty file",
                params: params,
                errors: {
                    clientCode: "File not found",
                    portOfLoading: "This field must not be null"
                }
            });
        }
    }
};

module.exports = Form;
