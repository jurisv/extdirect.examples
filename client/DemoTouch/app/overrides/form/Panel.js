Ext.define('DemoTouch.overrides.form.Panel', {
    override : 'Ext.form.Panel',

    load : function(options) {
        options = options || {};

        var me = this,
            api = me.getApi(),
            url = me.getUrl() || options.url,
            waitMsg = options.waitMsg,
            successFn = function(response, data) {
                me.setValues(data.data);

                if (Ext.isFunction(options.success)) {
                    options.success.call(options.scope || me, me, response, data);
                }

                me.fireEvent('load', me, response);
            },
            failureFn = function(response, data) {
                if (Ext.isFunction(options.failure)) {
                    options.failure.call(scope, me, response, data);
                }

                me.fireEvent('exception', me, response);
            },
            load, method, args;

        if (options.waitMsg) {
            if (typeof waitMsg === 'string') {
                waitMsg = {
                    xtype   : 'loadmask',
                    message : waitMsg
                };
            }

            me.setMasked(waitMsg);
        }

        if (api) {
            load = api.load;

            if (typeof load === 'string') {
                load = Ext.direct.Manager.parseMethod(load);

                if (load) {
                    api.load = load;
                }
            }

            if (load) {
                method = load.directCfg.method;
                args = method.getArgs(me.getParams(options.params), me.getParamOrder(), me.getParamsAsHash());

                args.push(function(data, response, success) {
                    me.setMasked(false);

                    if (success) {
                        successFn(response, data);
                    } else {
                        failureFn(response, data);
                    }
                }, me);

                return load.apply(window, args);
            }
        } else if (url) {
            return Ext.Ajax.request({
                url: url,
                timeout: (options.timeout || this.getTimeout()) * 1000,
                method: options.method || 'GET',
                autoAbort: options.autoAbort,
                headers: Ext.apply(
                    {
                        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    options.headers || {}
                ),
                callback: function(callbackOptions, success, response) {
                    var responseText = response.responseText,
                        statusResult = Ext.Ajax.parseStatus(response.status, response);

                    me.setMasked(false);

                    if (success) {
                        if (statusResult && responseText.length == 0) {
                            success = true;
                        } else {
                            response = Ext.decode(responseText);
                            success = !!response.success;
                        }

                        if (success) {
                            successFn(response, responseText);
                        } else {
                            failureFn(response, responseText);
                        }
                    }
                    else {
                        failureFn(response, responseText);
                    }
                }
            });
        }
    },

    submit: function(options, e) {
        options = options || {};

        var me = this,
            formValues = me.getValues(me.getStandardSubmit() || !options.submitDisabled),
            form = me.element.dom || {};

        if(this.getEnableSubmissionForm()) {
            form = this.createSubmissionForm(form, formValues);
        }

        options = Ext.apply({
            url : me.getUrl() || form.action,
            submit: false,
            form: form,
            method : me.getMethod() || form.method || 'post',
            autoAbort : false,
            params : null,
            waitMsg : null,
            headers : null,
            success : null,
            failure : null
        }, options || {});

        return me.fireAction('beforesubmit', [me, formValues, options, e], 'doBeforeSubmit');
    }

});