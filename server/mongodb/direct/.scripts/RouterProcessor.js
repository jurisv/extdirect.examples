var RouterProcessor  = {

    beforeTransaction: function(req, res, callback) {
        //Implement any logic that should be carried prior to execution
        //Example: open database connection
        //console.log('before');

        callback();
    },

    afterTransaction: function(req, res, batch, callback) {
        //Implement any logic that should be carried after to execution
        //Example: close database connection
        //console.log('after', batch);

        callback(null, batch);
    }
};

module.exports = RouterProcessor;
