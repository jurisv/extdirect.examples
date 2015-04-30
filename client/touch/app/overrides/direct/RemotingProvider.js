Ext.define('Demo.overrides.direct.RemotingProvider', {
    override : 'Ext.direct.RemotingProvider',

    /**
     * Get nested namespace by property.
     *
     * @private
     */
    getNamespaceExt: function(root, action) {
        var parts, ns, i, len;

        root  = root || Ext.global;
        parts = action.toString().split('.');

        for (i = 0, len = parts.length; i < len; i++) {
            ns   = parts[i];
            root = root[ns];

            if (typeof root === 'undefined') {
                return root;
            }
        }

        return root;
    },

    /**
     * Create nested namespaces. Unlike {@link Ext#ns} this method supports
     * nested objects as root of the namespace, not only Ext.global (window).
     *
     * @private
     */
    createNamespacesExt: function(root, action) {
        var parts, ns, i, len;

        root  = root || Ext.global;
        parts = action.toString().split('.');

        for (i = 0, len = parts.length; i < len; i++) {
            ns = parts[i];

            root[ns] = root[ns] || {};
            root     = root[ns];
        }

        return root;
    },

    /**
     * Initialize the API
     * @private
     */
    initAPI : function() {
        var me = this;
        var actions = this.getActions(),
            namespace = this.getNamespace(),
            action, cls, methods,
            i, ln, method;

        for (action in actions) {
            if (actions.hasOwnProperty(action)) {
                //cls = namespace[action];
                //if (!cls) {
                //    cls = namespace[action] = {};
                //}

                if (me.disableNestedActions) {
                    cls = namespace[action];

                    if (!cls) {
                        cls = namespace[action] = {};
                    }
                }
                else {
                    cls = me.getNamespaceExt(namespace, action);

                    if (!cls) {
                        cls = me.createNamespacesExt(namespace, action);
                    }
                }

                methods = actions[action];

                for (i = 0, ln = methods.length; i < ln; ++i) {
                    method = Ext.create('Ext.direct.RemotingMethod', methods[i]);
                    cls[method.getName()] = this.createHandler(action, method);
                }
            }
        }
    }
});