####Code examples
========
This repository contains example Ext.Direct applications in ExtJs and Sencha Touch for node.js
Please navigate down to source tree, to find the one you are interested.

Prerequisites after checking out:

    * node.js servers require to run 'npm install' to retrieve dependent modules. Then run via 'node server.js'

ExtJs/touch workspaces are self contained. It means that they are created using Sencha CMD , and contain all source files for framework.
Sencha Cmd v4.0.0.203 must be installed on development machine.

To run any examples contained within workspace:
from commandline(must be in extjs4-nodejs-extdirect or touch23-nodejs-extdirect folder depending on which project are you building):
    * 'sencha app refresh'
    * 'sencha app build'

Point your webserver to workspace folder.
Please note that node.js server must be run at the same time, otherwise you will end up receiving 404 errors.


Currently finished and available examples - others may work, but are not finished unless listed here:
ExtJs:

    * Application structure with API provider
    * Grid CRUD Master-detail

Sencha Touch:

    * Application structure with API provider
    * List read using directFn

