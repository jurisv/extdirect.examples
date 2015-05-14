var Login  = {
    // method signature has 5 parameters
    /**
     *
     * @param params object with received parameters
     * @param callback callback function to call at the end of current method
     * @param sessionID - current session ID if "enableSessions" set to true, otherwise null
     * @param req only if "appendRequestResponseObjects" enabled
     * @param res only if "appendRequestResponseObjects" enabled
     */
    login: function(params, callback, sessionID, req, res){
        var username = params.username,
            password = params.password;

        // console.log(sessionID);
        // console.log(req);
        // console.log(res);

        /*
         You have full access to all request properties
         */
        //console.log(req.session);

        //response.header('My-Auth-Header', '1234567890');
        /*
         Some code here to check login
         */

        if(username === 'demo' && password === 'demo'){
            //store some data in session server-side
            req.session.authenticated = true;

            callback(null, {
                message: 'Login successful',
                auth: true,
                success: true, // optional
                data: {
                    firstName: 'Direct',
                    lastName: 'Demo',
                    cookie: req.session.cookie // demo only. Typically you won't send this to the client.
                }
            });
        } else {
            req.session.authenticated = false;

            callback(null, {
                message: 'Login failed',
                success: false
            });
        }
    },

    logout: function(params, callback, sessionID, req, res){
        req.session.authenticated = false;

        callback(null, {
            auth: false,
            message: 'Logout successful'
        });
    },

    checkLogin: function(params, callback, sessionID, req, res) {
        callback(null, {
            auth: req.session.authenticated,
            message: req.session.authenticated ? 'Access granted' : 'Access denied'
        });
    }
};

module.exports = Login;