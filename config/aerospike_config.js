var aerospikeClusterIP  = '137.112.40.132';
var aerospikeClusterPort = 3000;

exports.aerospikeConfig = function()    {
	 return  {
     	hosts: [ { addr: aerospikeClusterIP, port: aerospikeClusterPort } ]
 	};
};

exports.aerospikeDBParams = function()  {
 	return {
    	defaultNamespace: 'test',
    	defaultSet: 'test'
 	};
};