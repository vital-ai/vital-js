vital-js
========

vitalservice javascript api


##Dependencies

### Vert.x 2.x

Required:

    <script type="text/javascript" src="jquery-2.0.3.min.js"></script>
    <script type="text/javascript" src="sockjs-0.3.4.min.js"></script>
    <script type="text/javascript" src="vitalservice/vertxbus-2.1.js"></script>
    <script type="text/javascript" src="jquery.cookie-1.4.0.js"></script>
    <script type="text/javascript" src="tv4.min.js"></script>
    <script type="text/javascript" src="vitalservice/vitalservice-0.2.303.js"></script>
    <script type="text/javascript" src="vitalservice/vitalservice-impl-0.2.303.js"></script>
    <script type="text/javascript" src="vitalservice-json-0.2.303.js"></script>
    <script type="text/javascript" src="vital-core-0.2.303.js"></script>
    <script type="text/javascript" src="vital-0.2.303.js"></script>

	 <!-- customer domain schemas here-->

### Vert.x 3.x

    <script type="text/javascript" src="jquery-2.0.3.min.js"></script>
    <script type="text/javascript" src="sockjs-0.3.4.min.js"></script>
    <script type="text/javascript" src="vertx-eventbus-3.2.1.js"></script>
    <script type="text/javascript" src="jquery.cookie-1.4.0.js"></script>
    <script type="text/javascript" src="tv4.min.js"></script>
    <script type="text/javascript" src="vitalservice/vitalservice-0.2.303.js"></script>
    <script type="text/javascript" src="vitalservice/vitalservice-impl-0.2.303.js"></script>
    <script type="text/javascript" src="vitalservice-json-0.2.303.js"></script>
    <script type="text/javascript" src="vital-core-0.2.303.js"></script>
    <script type="text/javascript" src="vital-0.2.303.js"></script>

	 <!-- customer domain schemas here-->

NOTE: vital-core-0.2.303.js and vital-0.2.303.js schemas are available in `$VITAL_HOME/vital-json-schema/` directory. Domain schemas are located in `$VITAL_HOME/domain-json-schema/`

###Using the service:

    var endpoint = 'endpoint.' + '<APP_ID>';

	 var eventbusURL = null; //null means default: <protocol>://<host>:<port>/eventbus 

    var vitalservice = new VitalService(endpoint, eventbusURL, function(){

        console.log('connected to endpoint');
  
	}, function(err){
	
		console.error('couldn\'t connect to vitalservice endpoint -' + err);
	});