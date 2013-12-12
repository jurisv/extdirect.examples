###Warning!
We are doing major overhaul of examples, so they might be broken!
Please don't report any issues while this message is here.

-

###Code examples


This repository contains example Ext.Direct applications in ExtJs and Sencha Touch for node.js
Please navigate down to source tree to find the one you are interested.

Prerequisites after checking out:

node.js servers require to run 'npm install' to retrieve dependent modules. Then run via 'node server.js'

###Frameworks


Important: Sample project you are downloading does not have framework!
You have to download it and place inside sample folders.

For ExtJs it will be:  client/DemoExtJs/ext (Expects version 4.2.1.883 +)

For Sencha Touch :  client/DemoTouch/touch (Expects version 2.3.1+)

###Sencha CMD


Sencha Cmd v4.0.1.45 must be installed on development machine.

###Building

To run any examples contained within workspace:
from commandline(must be in client/DemoExtJS or client/DemoTouch folder depending on which project are you building):

    * 'sencha app refresh'
    * 'sencha app build'

Point your webserver to client workspace folder.
Please note that node.js server must be run at the same time, otherwise you will end up receiving 404 errors.

###Contents


Currently finished and available examples - others may work, but are not finished unless listed below.

ExtJs:

    * Application structure with API provider
    * Grid CRUD Master-detail
    * Cookie / Session
    * Direct method call, shows regular call and onw that has hard exception (syntax error)
    * Form Load / Submit
    * Form file upload (Cross domain upload is not supported!)

Sencha Touch:

    * Application structure with API provider
    * List read using directFn

###Coming soon: Architect 3 sample project using CRUD and form binding