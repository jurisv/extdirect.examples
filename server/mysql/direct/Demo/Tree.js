var Tree = {

    getTree: function(params, callback) {

        //generating dummy dynamic tree
        var out = [], num, i;
        if(params.node === "root") {
            for(i = 1; i <= 5; ++i) {
                out.push({
                    id: 'n'+ i,
                    text: 'Scenario ' + i,
                    currentTest: 2,
                    testStatus: 1,
                    totalTests: 10,
                    ignoredTests: 1,
                    leaf: false

                });
            }
        } else if (params.node.length === 2) {
            //num = params.node.substr(0, 1);
            for(i = 1; i <= 5; ++i) {
                out.push({
                    id: params.node + i,
                    text: 'test-folder-' + i,
                    leaf: false
                });
            }
        } else if (params.node.length === 3) {
            //num = params.node.substr(0, 1);
            for(i = 1; i <= 5; ++i) {
                out.push({
                    id: params.node + i,
                    text: 'test-file-' + i,
                    leaf: true
                });
            }
        }

        callback(null, out);
    }
};

module.exports = Tree;