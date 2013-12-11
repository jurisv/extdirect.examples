var DXLogin  = {
    // method signature has 5 parameters
    /**
     *
     * @param params object with received parameters
     * @param callback callback function to call at the end of current method
     * @param sessionID - current session ID if "enableSessions" set to true, otherwise null
     * @param request only if "appendRequestResponseObjects" enabled
     * @param response only if "appendRequestResponseObjects" enabled
     */
    authenticate: function(params, callback, sessionID, request, response){
        var username = params.username,
            password = params.password;

        //console.log(sessionID);
        //console.log(request);
        //console.log(response);

        /*
         You have full access to all request properties
         */
        //console.log(request.session); //e.g. retrieve session data


        response.header('My-Custom-Header ', '1234567890');
        /*
         Some code here to check login
         */
        callback({
            success: true,
            message: 'Login successful',
            data: {
                firstName: 'Juris',
                lastName: 'Vecvanags',
                cookie: request.session.cookie
            }
        });
    }
};

module.exports = DXLogin;