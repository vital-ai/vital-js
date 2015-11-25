vital-js
========

vitalservice javascript api


###Dependencies

Required:

    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/sockjs-client/0.3.4/sockjs.min.js"></script>
    <script type="text/javascript" src="vitalservice/vertxbus-2.1.js"></script>
    <script type="text/javascript" src="jquery.cookie-1.4.0.js"></script>
    <script type="text/javascript" src="tv4.min.js"></script>
    <script type="text/javascript" src="vitalservice/vitalservice-0.2.301.js"></script>
    <script type="text/javascript" src="vitalservice/vitalservice-impl-0.2.301.js"></script>
    <script type="text/javascript" src="vitalservice-json-0.2.301.js"></script>
    <script type="text/javascript" src="vital-core-0.2.301.js"></script>
    <script type="text/javascript" src="vital-0.2.301.js"></script>

	 <!-- customer domain schemas here-->

NOTE: vital-core-0.2.301.js and vital-0.2.301.js schemas are available in $VITAL_HOME/vital-json-schema/ directory
      domain schemas are located in $VITAL_HOME/domain-json-schema/

###Using the service:

    var endpoint = 'endpoint.' + '<APP_ID>';

    var vitalservice = new VitalService(endpoint, function(){

        console.log('connected to endpoint');
  
	}, function(err){
	
		alert('couln\'t connect to vitalservice endpoint -' + err);
	});