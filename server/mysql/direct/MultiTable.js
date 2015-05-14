var MultiTable  = {

    read: function(params, callback){
        //@meta table
        var data,
            payload = {};

        if(params.metadata){
            if(params.metadata.table === 'customers'){

                 data = [
                    {
                        name: 'ABC Accounting',
                        revenue: 50000
                    },
                    {
                        name: 'Ezy Video Rental',
                        revenue: 106300
                    },{
                        name: 'Greens Fruit Grocery',
                        revenue: 120000
                    },{
                        name: 'Icecream Express',
                        revenue: 73000
                    },{
                        name: 'Ripped Gym',
                        revenue: 88400
                    },{
                        name: 'Smith Auto Mechanic',
                        revenue: 222980
                    }
                ];

            } else {

                 data = [
                    {
                        name: 'AT&T Inc.',
                        revenue: 10000000
                    },
                    {
                        name: 'General Electric',
                        revenue: 5000000
                    },{
                        name: 'Intel Corporation',
                        revenue: 150000000
                    },{
                        name: 'Verizon Communications',
                        revenue: 3000000
                    }
                ];

            }

            payload.data = data;
            payload.total = data.length;
        }

        callback(null, payload);
    }
};

module.exports = MultiTable;