vital-js
========

vitalservice javascript api


###Dependencies

Required:

    <script src="//cdnjs.cloudflare.com/ajax/libs/sockjs-client/0.3.4/sockjs.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/vertx/2.0.0/vertxbus.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <script type="text/javascript" src="vitalservice/vitalservice-0.2.252.js"></script>
    <script type="text/javascript" src="vitalservice/vitalservice-impl-0.2.252.js"></script>


Optional - JSON Schema validation

    <script type="text/javascript" src="tv4.min.js"></script>
    <script type="text/javascript" src="vitalservice-json-0.2.252.js"></script>
    <script type="text/javascript" src="vital-core-0.2.252.js"></script>
    <script type="text/javascript" src="vital-0.2.252.js"></script>


NOTE: vital-core-0.2.252.js and vital-0.2.252.js schemas are available in $VITAL_HOME/vital-json-schema/ directory


###Using the service:

    var vitalservice = new VitalService(function(){

        console.log('connected to endpoint');
  
	}, function(err){
		alert('couln\'t connect to vitalservice endpoint -' + err);
	});