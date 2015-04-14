var DXTree = {

    getTree: function(params, callback){

        //generating dummy dynamic tree
        var out = [], num, i;
        if(params.node === "root"){
            for(i = 1; i <= 5; ++i){
                out.push({
                    'id': 'n'+ i,
                    'text': 'Node ' + i,
                    'leaf': false

                });
            }
        }else if(params.node.length === 2){
            num = params.node.substr(0, 1);
            for(i = 1; i <= 5; ++i){
                out.push({
                    'id': params.node + i,
                    'text': 'Node ' + num  +  '.'  + i,
                    'leaf': true
                });
            }
        }

        callback(out);
    }
};

module.exports = DXTree;