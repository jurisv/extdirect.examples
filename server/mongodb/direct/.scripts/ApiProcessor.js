var ApiProcessor  = {

    /**
     * Called before API generation.
     * Use this method to early terminate the API discovery by passing the error with message.
     * See the inline example
     *
     * @param callback
     */
    beforeApi: function(callback) {

        // If client side is expecting this type of response, it would be straight forward to to block access to the site.
        // Uncomment and try this with ExtJS example.
        // Note: This is not available in SA projects, as it's Direct implementation is based on auto Discovery,
        // thus currently you can't add extra logic
        //callback({
        //    message: 'Service is not available. Maintenance.',
        //    success: false,
        //    code: 200
        //});

        callback();
    },

    /**
     * Called after API is generated, but before any output is being sent to the client
     * Typically this would be the place where you determine which API's should be exposed to the client based on different rules
     * For example if user is not Authenticated, you expose only Login API's, otherwise follow some rules to filter out
     * those that apply only for particular Role
     *
     * @param api
     * @param callback
     */
    afterApi: function(api, callback) {

        //You can tweak API here, for example remove something
        //delete api.actions.MultiTable;

        //console.log(api);
        callback(null, api);
    }
};

module.exports = ApiProcessor;
