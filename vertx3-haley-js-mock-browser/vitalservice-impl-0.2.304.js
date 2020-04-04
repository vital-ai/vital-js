/**
 * Set this property to redirect pages to maintenance page if vitalservice is unavailable
 */
var VITAL_SERVICE_UNAVAILABLE_URL = null;


/**
 * Set this callback to be notified when session expires
 * depending if returned value is true/false the default callback will be called afterwards
 */
var VITAL_SESSION_EXPIRED_CALLBACK = null;


/**
 * Set this callback to be notified of access to protected resource when no sessionid is given
 * depending if returned value is true/false the default callback will be called afterwards
 */
var VITAL_AUTHENTICATION_REQUIRED_CALLBACK = null;

/**
 * overridden cookie attributes
 */ 
var VITAL_COOKIE_ATTRS = {};

/**
 * use prefixed cookies if there are multiple apps with different logins hosted in same vital app 
 */
var VITAL_COOKIE_PREFIX = '';

//logging disabled by default, no longer in use!
var VITAL_LOGGING = false

/**
 * Websocket based implementation
 * @param address - vitalservice eventbus address, 'vitalservice' in most cases
 * @param eventBusURL - if null then current window url protocol://host:port/eventbus will be used 
 * @param successCB
 * @param errorCB
 * @returns
 */
VitalServiceWebsocketImpl = function(address, type, eventBusURL, successCB, errorCB, logger, loggingEnabled) {
	
	//default logger is console, but can be replaced with watson etc
	this.logger = logger != null ? logger : console;
	this.loggingEnabled = loggingEnabled != null ? loggingEnabled : VITAL_LOGGING;
	
	this.admin = false;
	this.superadmin = false;
	
	if(type == 'service') {
		
	} else if(type == 'admin') {
		this.admin = true;
	} else if(type == 'superadmin') {
		this.superadmin = true;
	} else {
		this.logger.error("Unhnown type: " + type);
		return
	}
	
	
	this.loginTypes = [
	  'http://vital.ai/ontology/vital#Login',
	  'http://vital.ai/ontology/vital#AdminLogin',
	  'http://vital.ai/ontology/vital#SuperAdminLogin'
	];
	
	//there's always a new session generated, it could be cached in localstorage/cookie etc
	this.sessionID = UUIDGenerator.generate();
	
	//obtained via authentication, appended to every request
	this.appSessionID  = null;
	
	this.login = null;
	
	if(this.loggingEnabled) { this.logger.info('sessionID: ' + this.sessionID); }

	this.address = address;
	
	//notified when reconnection event happens
	this.firstConnectionAttempt = true;
	this.reconnectHandler = null;
	
	//
	this.authAppID = null; 
	
	if(this.address.indexOf('endpoint.') == 0) {
		
		this.authAppID = this.address.substring('endpoint.'.length);
		
		this.COOKIE_SESSION_ID = VITAL_COOKIE_PREFIX + 'sessionID.' + this.authAppID;
		
		if(typeof($) !== 'undefined' && typeof($.cookie) !== 'undefined') {
			this.appSessionID = $.cookie(this.COOKIE_SESSION_ID);
		}
		
	} else {
		
		//no authentication enabled
		this.COOKIE_SESSION_ID = null;
	}
	
	
	this.vsJson = null;
	
	this.closed = false;
	
	//single use callbacks
	this.sH = successCB;
	this.eH = errorCB;
	
	if(eventBusURL != null) {
		this.url = eventBusURL
	} else {
		this.url = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/eventbus';
	}
	
	if(this.loggingEnabled) { this.logger.info("eventbus url", this.url); }
	
	this.windowKilled = false;
	
	this.recTimeout = null;
	
	
	this.eb = null;
	
	if(typeof( VitalServiceJson ) != 'undefined') {
		
		if(this.loggingEnabled) { this.logger.info("loading json validation module..."); }
		
		if(VitalServiceJson.SINGLETON != null) {
			
			if(this.loggingEnabled) { this.logger.info("json singleton already set - reusing"); }
			
		} else {
		
			if(this.loggingEnabled) { this.logger.info("Initializing new json singleton"); }
			
			VitalServiceJson.SINGLETON = new VitalServiceJson(this.logger, this.loggingEnabled);
			
		}
		
		this.vsJson = VitalServiceJson.SINGLETON;
		
		if(type == 'service') {
			
			vitaljs.vitalservice = this;
			
		}
		
	} else {
		
		this.logger.error("VitalServiceJson module not available, it's mandatory.");

		return;
	}
	

	this.registeredHandlers = {};

	this.currentHandlers = {};
	
	this.eventbusListenerActive = false;
	this.eventbusHandler = null;
	
	var _this = this;
	if(EventBus == null) {
		throw 'vertx.EventBus module not loaded!' 
	}
	
	if(typeof($) !== 'undefined') {
		$(window).bind('beforeunload', function(){
			_this.windowKilled = true;
		});
	}

	//handler notified when user is logged out
	this.authSessionExpiredHandler = null;

	//by default the client will keep reconnecting
	this.disconnectOnWebsocketLimitExceeded = false;
	//handler notified when no websocket connections are available
	this.websocketLimitExceededHandler = null;
	
}

VitalServiceWebsocketImpl.JS_REGISTER_STREAM_HANDLER = 'js-register-stream-handler';

VitalServiceWebsocketImpl.JS_UNREGISTER_STREAM_HANDLER = 'js-unregister-stream-handler';

VitalServiceWebsocketImpl.JS_LIST_STREAM_HANDLERS = 'js-list-stream-handlers';


VitalServiceWebsocketImpl.VERTX_STREAM_SUBSCRIBE = 'vertx-stream-subscribe';

VitalServiceWebsocketImpl.VERTX_STREAM_UNSUBSCRIBE = 'vertx-stream-unsubscribe';

VitalServiceWebsocketImpl.DomainsManagerScript = 'commons/scripts/DomainsManagerScript';

VitalServiceWebsocketImpl.vitalauth_login = 'vitalauth.login';

VitalServiceWebsocketImpl.vitalauth_logout = 'vitalauth.logout';

VitalServiceWebsocketImpl.vitalauth_authorise = 'vitalauth.authorise';

VitalServiceWebsocketImpl.prototype.getAppSessionID = function() {
	
	if(this.COOKIE_SESSION_ID == null) {
		return null;
	}
	
	//check if cookie exists
	if(typeof($) !== 'undefined' && typeof($.cookie) !== 'undefined') {
		this.appSessionID = $.cookie(this.COOKIE_SESSION_ID);
	}
	
	if(this.appSessionID == null) {
		
		
		if(typeof($) !== 'undefined' && typeof($.cookie) !== 'undefined') {
			$.removeCookie(this.COOKIE_SESSION_ID, VITAL_COOKIE_ATTRS);
			$.removeCookie(this.COOKIE_SESSION_ID);
		}
		
		this.appSessionID = null;
		this.login = null;
		
		
	}
	
	return this.appSessionID;
	
}

VitalServiceWebsocketImpl.prototype.newConnection = function() {
    

	if(this.recTimeout != null) {
		clearInterval(this.recTimeout);
		this.recTimeout = null;
	}
	
	var _this = this;
    var options = {};
    
    /*
    if(configService.protocols_whitelist != null && configService.protocols_whitelist.length > 0 ) {
    		
    		var s = ''
    			
    		configService.protocols_whitelist.splice(0, 2);
    			
    		for(var v = 0; v < configService.protocols_whitelist.length; v++) {
    			if(s.length > 0) s+= ', ';
    			s += configService.protocols_whitelist[v];
    		}
    		
    		
    		
    	options.protocols_whitelist = configService.protocols_whitelist;
    }
    */

    if(this.eb != null) {
    	
    	if(this.loggingEnabled) { this.logger.info("closing existing evenbus connection"); }
    	try {
    		this.eb.close();
    	} catch(e) {
    		this.logger.error('error when closing existing websocket', e);
    	}
    }
    
    this.eb = new EventBus(this.url, options);
    if(this.eb.addErrorListener != null) {
        this.eb.addErrorListener(function(error){
        	
        	_this.logger.error("Vertx eventbus error", error);
        	
        	if(error.failureType === "MAX_CONNECTIONS_EXCEEDED") {
        		
        		_this.logger.error('max active websocket connections limit has been exceeded');
        		
        		if(_this.disconnectOnWebsocketLimitExceeded) {
        			_this.logger.info("not retrying - marking client as closed");
        			_this.closed = true;
        		}

        		if(_this.websocketLimitExceededHandler != null) {
        			_this.websocketLimitExceededHandler();
        		}
        	}
        	
        });    	
    } else {
    	this.logger.warn("eventbus additional listeners not available");
    }

    this.eb.onopen = function() {

    	if(_this.recTimeout != null) {
    			
//   		clearTimeout(_this.recTimeout);
   			clearInterval(_this.recTimeout);
   			_this.recTimeout = null;
    			
   		}
    		
    	
    	var currentKeys = [];
    	
    	for ( var key in _this.currentHandlers ) {
    		currentKeys.push(key);
    	}
    	
    	if(currentKeys.length > 0) {
    		
    		if(_this.loggingEnabled) { _this.logger.info('refreshing session handlers: ', currentKeys); }
    		
    		var args = [VitalServiceWebsocketImpl.VERTX_STREAM_SUBSCRIBE, {streamNames: currentKeys, sessionID: _this.sessionID}];
    		if(_this.admin) {
    			//insert null app
    			args.splice(0, 0, null);
    		}
    		//re-register it ?
    		_this.callMethod('callFunction', args, function(successRL){
    			
    			if(true /*!_this.eventbusListenerActive*/) {
    				
    				_this.eventbusHandler = _this.createNewHandler();
    				_this.eb.registerHandler('stream.'+ _this.sessionID, _this.eventbusHandler);
    				_this.eventbusListenerActive = true;
    				
    			}
    			
    			
    		}, function(errorResponse){
    			_this.logger.error(errorResponse);
    		});
    			
    	}
    		
    		
    	if(_this.windowKilled) {
    		_this.logger.error("sockjstransport, opened - but window killed!");
    		return;
    	}
    		
    	if(_this.loggingEnabled) { _this.logger.info('sockjstransport, transport ready'); }
    		
    	if(_this.sH != null) {
    		
    		if(_this.appSessionID != null) {
    			
    			_this.initialSessionCheck();
    			
    		} else {
    			_this.sH();
    			_this.sH = null;
    			_this.eH = null;
    		}
    	}
    	
    	if(_this.firstConnectionAttempt) {
    		_this.firstConnectionAttempt = false;
    	} else {
    		if(_this.reconnectHandler != null) {
    			if(_this.loggingEnabled) { _this.logger.info("Notifying reconnect handler"); }
    			_this.reconnectHandler();
    		} else {
    			if(_this.loggingEnabled) { _this.logger.info("No reconnect handler to notify"); }
    		}
    	}
    		
    };
    	
    this.eb.onclose = function() {

    	if(_this.closed) {
    		if(_this.loggingEnabled) {
    			_this.logger.info("client already closed");
    		}
    		return;
    	}
    	
    	_this.logger.warn('sockjstransport, transport closed, ');

    	if(_this.recTimeout != null) {
    		clearInterval(_this.recTimeout);
    		_this.recTimeout = null;
    	}
    		
    	if(_this.eH != null) {
    		_this.eH('e');
    	}
    	_this.eH = null;
    		
    	if(_this.windowKilled) {
    		_this.logger.warn("window killed, don't show popup, or try to reconnect");
    		return
    	}
    	
    	_this.eventbusListenerActive = false;
    		
//   		_this.recTimeout = setTimeout(function () {
    	_this.recTimeout = setInterval(function () {
   			_this.newConnection();
   		}, 3000);
   		
    };
    	
}

VitalServiceWebsocketImpl.prototype.initialSessionCheck = function() {
	
	var _this = this;
	
	var args = [];
	
	
	if(this.admin) {
		args.push(null);
	}
	
	args.push(VitalServiceWebsocketImpl.vitalauth_authorise);
	
	args.push({sessionID: this.appSessionID});
	
	this.callMethod('callFunction', args, function(authResults){
		
		for(var i = 0 ; i < authResults.results.length; i++) {
			
			var g = authResults.results[i].graphObject;
			
			if(_this.loginTypes.indexOf(g.type) >= 0) {
				_this.login = g;
			}
			
		}
		
		_this.sH();
		_this.eH = null;
		_this.sH = null;		
		
	}, function(errorMsg){
		
		_this.logger.warn(errorMsg);
		
		if(typeof($) !== 'undefined' && typeof($.cookie) !== 'undefined') {
			$.removeCookie(_this.COOKIE_SESSION_ID, VITAL_COOKIE_ATTRS);
			$.removeCookie(_this.COOKIE_SESSION_ID);
		}
		_this.appSessionID = null;
		_this.login = null;
		
		_this.sH();
		_this.eH = null;
		_this.sH = null;
		
		
	});
	
}

VitalServiceWebsocketImpl.prototype.loadDynamicOntologies = function(successCB, errorCB) {
	
	var _this = this;
	
	this.callMethod('callFunction', ['commons/scripts/DomainsManagerScript', {action: 'listJsonSchemas'}], function(domainsRL){

		if(_this.loggingEnabled) { _this.logger.info("domainsRL: ", domainsRL); }
		
		_this.vsJson.reloadOntologies(domainsRL);
		
		successCB(domainsRL);
		
	}, errorCB);
	
}
	
	
/**
 * Calls the service method, all input parameters are validated against json schema - same 
 */
VitalServiceWebsocketImpl.prototype.callMethod = function(method, args, successCB, errorCB) {
	
	if(this.loggingEnabled) { this.logger.debug("service call " + method + " args:", args); }
	
	if(typeof(successCB) != "function") {
		this.logger.error("method: " + method + " - Success callback not a function, arguments list invalid");
		return;
	}
	
	if(typeof(errorCB) != "function") {
		this.logger.error("method: " + method + " - Error callback not a function, arguments list invalid");
		return;
	}
	
	var data = {
		method: method,
		args: args,
		sessionID: this.appSessionID
	};
	
	var _this = this;
	
	var __ignoreJsonValidationErrors = false; 
	
	
	var functionName = null;
	
	if(method == 'callFunction') {
		
		//determine the functionName based on params count
		if(args.length >= 2) {
			functionName = args[args.length - 2];
			
			var params = args[args.length - 1];
			
			__ignoreJsonValidationErrors = params && params.__ignoreJsonValidationErrors == true;
			
			//set the sessionID param
			if(functionName == VitalServiceWebsocketImpl.vitalauth_logout) {
				params.sessionID = this.appSessionID;
			}
			
		} else {
			this.logger.error("method : " + method + " requires at least two arguments");
			return
		}
		
		
	}
	
	
	try {
	
	this.eb.send(this.address, data, function(err, result) {
		
		if(err != null) {
			
			_this.logger.error("ERROR:", err);
			
			if(typeof(err) === 'object' && err.message != null) {
				err = err.message;
			}
			
			result = { status: 'error', message: err };
			
		} else {
			
			//unpack result object
			result = result.body
			
		}
		
		if(result == null) {
			result = { status: 'error', message: 'request timed out' };
		}
		
		if(_this.loggingEnabled) { _this.logger.debug(method + ' result: ', result); }
		
		
		//check the status, then object
		
		if(result.status == 'ok') {
			
			//validate response
			
			var response = result.response;
			
			if(response != null) {
				
				//check response type
				if(_this.vsJson != null) {
					var validationError = _this.vsJson.validateResponse(response);
					
					if(validationError != null) {
						if(!__ignoreJsonValidationErrors) {
							errorCB(validationError);
							return;
						} else {
							_this.logger.warn("json schema validation error ignored - ", validationError);
						}
						
					}
					
				} else {
					
					errorCB("No VitalServiceJson module loaded - it's mandatory.");
					return;
					
				}
				
				
				//sessionID filter - get the session from positive authentication
				if(functionName == VitalServiceWebsocketImpl.vitalauth_login && _this.COOKIE_SESSION_ID != null) {
					for(var i = 0 ; i < response.results.length; i++) {
						var g = response.results[i].graphObject;
						if(g.type == 'http://vital.ai/ontology/vital#UserSession') {
							_this.appSessionID = g.get('sessionID');
							if(_this.loggingEnabled) { _this.logger.info('new auth session: ', g.get('sessionID')); }
							//store it in cookie
							var attrs = {expires: 7};
							_this.extend(attrs, VITAL_COOKIE_ATTRS);
							if(typeof($) !== 'undefined' && typeof($.cookie) !== 'undefined') {
								$.cookie(_this.COOKIE_SESSION_ID, g.get('sessionID'), attrs);
							}
						} else if(_this.loginTypes.indexOf(g.type) >= 0) {
							_this.login = g;
						}
					}
					
				}
				
				if(functionName == VitalServiceWebsocketImpl.vitalauth_logout && _this.COOKIE_SESSION_ID != null) {
					
					_this.appSessionID = null
					_this.login = null;
					if(typeof($) !== 'undefined' && typeof($.cookie) !== 'undefined') {
						$.removeCookie(_this.COOKIE_SESSION_ID, VITAL_COOKIE_ATTRS);
						$.removeCookie(_this.COOKIE_SESSION_ID);
					}
					if(_this.loggingEnabled) { _this.logger.info("session cookie removed"); }
					
				}
				
			}
			
			successCB(result.response);
			
		} else {
			
			
			if(functionName == VitalServiceWebsocketImpl.vitalauth_logout && _this.COOKIE_SESSION_ID != null) {
				//no matter what, always remove the cookie and notify callback
				if(typeof($) !== 'undefined' && typeof($.cookie) !== 'undefined') {
					$.removeCookie(_this.COOKIE_SESSION_ID, VITAL_COOKIE_ATTRS);
					$.removeCookie(_this.COOKIE_SESSION_ID);
				}
				_this.login = null;
				_this.appSessionID = null;
			}
			
			if(result.message != null && typeof(result.message.indexOf) === 'function') {
				
				if( result.message.indexOf('java.net.ConnectException') >= 0 && VITAL_SERVICE_UNAVAILABLE_URL != null ) {
					
					window.location.href = VITAL_SERVICE_UNAVAILABLE_URL;
					return;
					
				}
				
			}
			
			var callErrorCB = true;
			
			//this is thrown when session expired / not found
			if(result.status == 'error_denied') {

				if(typeof($) !== 'undefined' && typeof($.cookie) !== 'undefined') {
					$.removeCookie(_this.COOKIE_SESSION_ID, VITAL_COOKIE_ATTRS);
					$.removeCookie(_this.COOKIE_SESSION_ID);
				}
				_this.appSessionID = null;
				_this.login = null;
				
				if(_this.authSessionExpiredHandler != null) {
					
					callErrorCB = _this.authSessionExpiredHandler(result.message);
					
				} else if( VITAL_SESSION_EXPIRED_CALLBACK != null) {
				
					callErrorCB = VITAL_SESSION_EXPIRED_CALLBACK(result.message);
				}
				
			} else if(result.status == 'error_authentication_required') {
				
				//this happens when no session / user is set and protected endpoint is called
				if( VITAL_AUTHENTICATION_REQUIRED_CALLBACK != null ) {
					callErrorCB = VITAL_AUTHENTICATION_REQUIRED_CALLBACK(result.message);
				}
				
			}
			
			if(callErrorCB == true) {
				errorCB(result.message)
			}
			
			
		}
		
	});
	
	
	} catch(e) {
		
		_this.logger.error(e);
		
		errorCB('' + e);
		
	}
}

VitalServiceWebsocketImpl.prototype.close = function(successCB, errorCB){
	
	var _this = this;
	
	this.closed = true;
	if(this.eb != null) {
		try {
			this.eb.close()
		} catch(e) {
			_this.logger.error(e);
		}
		this.eb = null;
	}
	
	if(successCB != null) {
		successCB();
	}
	
	
}

VitalServiceWebsocketImpl.prototype.listStreamHandlers = function(paramsMap, successCB, errorCB) {
	
	var results = [];
	
	for(var key in this.registeredHandlers) {
		
		var g = {
			URI: 'handler:' + key,
			type: 'http://vital.ai/ontology/vital-core#VITAL_Node',
			"http://vital.ai/ontology/vital-core#isActive": this.currentHandlers[key] != null,
			"http://vital.ai/ontology/vital-core#hasName": key
		};
		
		results.push({
			_type: 'ai.vital.vitalservice.query.ResultElement',
			score: 1.0,
			graphObject: g
		});
		
	}
	
	
	var res = {
		_type: 'ai.vital.vitalservice.query.ResultList',
		results: results
	};
	
	var errorMsg = this.vsJson.validateResponse(res);
	
	if(errorMsg != null) {
		errorCB(errorMsg);
		return;
	}
	
	successCB(res);
	
	
}

VitalServiceWebsocketImpl.prototype.registerStreamHandler = function(paramsMap, successCB, errorCB) {
	
	var streamName = paramsMap.streamName;
	
	var handlerFunction = paramsMap.handlerFunction;
	
	if(streamName == null) {
		errorCB("No 'streamName' param");
		return;
	}
	
	if(handlerFunction == null) {
		errorCB("No 'handlerFunction' param");
		return;
	}
	
	if( typeof(handlerFunction) != 'function') {
		errorCB("handlerFunction must be a function");
		return;
	}
	
	
	if( this.registeredHandlers[streamName] != null ) {
		errorCB("Handler for stream " + streamName + " already registered.");
		return;
	}
	
	this.registeredHandlers[streamName] = handlerFunction;
	
	successCB({
		_type: 'ai.vital.vitalservice.query.ResultList',
		status: {
			_type: 'ai.vital.vitalservice.VitalStatus',
			status: 'ok',
			message: 'Handler for stream ' + streamName + ' registered successfully'
		}
	});
	
}



VitalServiceWebsocketImpl.prototype.unregisterStreamHandler = function(paramsMap, successCB, errorCB) {
	
	var streamName = paramsMap.streamName;
	if(streamName == null) {
		errorCB("No 'streamName' param");
		return;
	}
	
	var currentHandler = this.registeredHandlers[streamName];
	
	if(currentHandler == null) {
		errorCB("No handler for stream " + streamName + " registered");
		return;
	}
	
	if(this.currentHandlers[streamName] != null) {
		errorCB("Handler in use " + streamName);
		return;
	}
	
	
	delete this.registeredHandlers[streamName];
	
	successCB({
		_type: 'ai.vital.vitalservice.query.ResultList',
		status: {
			_type: 'ai.vital.vitalservice.VitalStatus',
			status: 'ok',
			message: 'Handler for stream ' + streamName + ' unregistered successfully'
		}
	});
	
}

VitalServiceWebsocketImpl.prototype.streamSubscribe = function(paramsMap, successCB, errorCB) {
	
	//first check if we are able to
	
	var streamName = paramsMap.streamName;
	if(streamName == null) {
		errorCB("No 'streamName' param");
		return;
	}
	
	var currentHandler = this.registeredHandlers[streamName];
	
	if(currentHandler == null) {
		errorCB("No handler for stream " + streamName + " registered");
		return;
	}
	
	var activeHandler = this.currentHandlers[streamName]
	
	if(activeHandler != null) {
		errorCB("Handler for stream " + streamName + " already subscribed");
		return;
	}
	
	var args = [VitalServiceWebsocketImpl.VERTX_STREAM_SUBSCRIBE, {streamNames: [streamName], sessionID: this.sessionID}];
	
	if(this.admin) {
		//insert null app
		args.splice(0, 0, null);
	}
	
	
	//first call the server side, on success register
	
	var _this = this;
	
	this.callMethod('callFunction', args, function(successRL){
		
		if(!_this.eventbusListenerActive) {
			
			_this.eventbusHandler = _this.createNewHandler();
			_this.eb.registerHandler('stream.'+ _this.sessionID, _this.eventbusHandler);
			_this.eventbusListenerActive = true;
		}
		
		
		_this.currentHandlers[streamName] = currentHandler;
		
		successCB({
			_type: 'ai.vital.vitalservice.query.ResultList',
			status: {
				_type: 'ai.vital.vitalservice.VitalStatus',
				status: 'ok',
				message: 'Successfully Subscribe to stream ' + streamName
			}
		});
		
	}, function(errorResponse){
		errorCB(errorResponse);
	});
	
	
}


Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

VitalServiceWebsocketImpl.prototype.streamUnsubscribe = function(paramsMap, successCB, errorCB) {

	var streamName = paramsMap.streamName;
	if(streamName == null) {
		errorCB("No 'streamName' param");
		return;
	}
	
	var activeHandler = this.currentHandlers[streamName]
	
	if( activeHandler == null ) {
		errorCB("No handler subscribed to stream " + streamName);
		return;
	}
	
	var _this = this;
	
	var args = [VitalServiceWebsocketImpl.VERTX_STREAM_UNSUBSCRIBE, {streamNames: [streamName], sessionID: this.sessionID}];
	
	if(this.admin) {
		//insert null app
		args.splice(0, 0, null);
	}
	
	this.callMethod('callFunction', args, function(successRL){
		
		delete _this.currentHandlers[streamName];

		if(Object.size( _this.currentHandlers) < 1) {
			_this.eb.unregisterHandler('stream.'+ _this.sessionID, _this.eventbusHandler);
			_this.eventbusListenerActive = false;
		}
		
		successCB({
			_type: 'ai.vital.vitalservice.query.ResultList',
			status: {
				_type: 'ai.vital.vitalservice.VitalStatus',
				status: 'ok',
				message: 'Successfully unsubscribe from stream ' + streamName
			}
		});
		
	}, function(errorResponse){
		errorCB(errorResponse);
	});
	
}


VitalServiceWebsocketImpl.prototype.createNewHandler = function() {
	
	var _this = this;
	
	var wrapperHandler = function(err, json) {
		
		if(err) {
			_this.logger.error("ERROR:", err);
			return;
		}
		
		json = json.body;
		
		if(json._type != 'ai.vital.vitalservice.query.ResultList' ) {
			_this.logger.error("only ai.vital.vitalservice.query.ResultList type messages accepted");
			return
		}
		
		var stream = json.streamName;
		
		if(stream == null) {
			_this.logger.error('No streamName property in json message');
			return;
		}
		
		
		var handlerFunction = _this.currentHandlers[stream];
		
		if(handlerFunction == null) {
			_this.logger.warn("Received a message for nonexisting stream handler: " + stream)
			return;
		}
		
		//check response type
		if(_this.vsJson != null) {
			var validationError = _this.vsJson.validateResponse(json);
				
			if(validationError != null) {
				_this.logger.error("Async message json validation failed: ", validationError);
				return;
			}
			
			handlerFunction(json);
				
		} else {
				
			_this.logger.error("No VitalServiceJson module loaded - cannot parse async message.");
			return;
				
		}
			
	};
	
	return wrapperHandler;
	
}


/*
 * Returns the result list of all schemas available remotely
 * @returns array of DomainModel objects
 */
VitalServiceWebsocketImpl.prototype.getSchemaList = function(successCB, errorCB) {

	var _this = this;
	
	this.callMethod('callFunction', [VitalServiceWebsocketImpl.DomainsManagerScript, {action: 'listJsonSchemas'}], function(domainsRL){
	
		if(_this.loggingEnabled) { _this.logger.info("remote domains list", domainsRL); }
		
		var r = [];
		
		for(var i = 0 ; i < domainsRL.results.length; i++) {
			var g = domainsRL.results[i].graphObject;
			r.push(g);
		}
		
		successCB(r);
		
	}, errorCB);
	
}


/*
 * Returns dependencies of a schema, parents or all ancestors based on recursive flag
 * @returns array of DomainModel objects
 */
VitalServiceWebsocketImpl.prototype.getDependenciesOfSchema = function(schemaName, recursive, successCB, errorCB) {
	
	var _this = this;
	
	this.callMethod('callFunction', [VitalServiceWebsocketImpl.DomainsManagerScript, {action: 'getDependenciesOfSchema', schemaName: schemaName, recursive: recursive}], function(domainsRL){
		
		if(_this.loggingEnabled) { _this.logger.info("schema dependencies list", domainsRL); }
		
		var r = [];
		
		for(var i = 0 ; i < domainsRL.results.length; i++) {
			var g = domainsRL.results[i].graphObject;
			r.push(g);
		}
		
		successCB(r);
		
	}, errorCB);
}

/*
 * Returns an array of json schema objects, the original array is wrapped with {name:, URI:, schema: [] }, the order is preserved
 */
VitalServiceWebsocketImpl.prototype.getSchemas = function(schemaNamesArray, successCB, errorCB) {
	
	this.getNextSchema(schemaNamesArray, 0, [], successCB, errorCB);
	
}

VitalServiceWebsocketImpl.prototype.getNextSchema = function(schemaNamesArray, index, output, successCB, errorCB) {

	if(index >= schemaNamesArray.length) {
		var parsedOutput = [];
		for(var i = 0; i < output.length; i++) {
			var c = output[i];
			var schemaArray = JSON.parse(c);
//			var name = schemaNamesArray[i];
//			var uri = this.vsJson.getSchemaURI(schemaArray);
			parsedOutput.push(schemaArray);
			
		}
		successCB(parsedOutput);
		return
	}
	
	this.getNextSchemaPart(schemaNamesArray, index, output, 1, successCB, errorCB);
	
}


VitalServiceWebsocketImpl.prototype.getNextSchemaPart = function(schemaNamesArray, index, output, part, successCB, errorCB) {

	var _this = this;
	
	this.callMethod('callFunction', [VitalServiceWebsocketImpl.DomainsManagerScript, {action: 'getJsonSchema', schemaName: schemaNamesArray[index], part: part, size: 6000}], function(partRL){
		
		var content = partRL.results[0].graphObject.get('name');
		
		if(part == 1) {
			output.push(content);
		} else {
			output[output.length-1] = output[output.length-1] + content;
		}
		
		if(part >= partRL.totalResults) {
			//no more parts
			_this.getNextSchema(schemaNamesArray, index + 1, output, successCB, errorCB);
		} else {
			_this.getNextSchemaPart(schemaNamesArray, index, output, part + 1, successCB, errorCB);
		}
		
	}, errorCB);
	
}


/*
 * Loads given schema objects ( {name:, URI:, schema: [] } in the given order
 */
VitalServiceWebsocketImpl.prototype.loadSchemas = function(jsonSchemasArray, successCB, errorCB) {
	try {
		this.vsJson.loadSchemas(jsonSchemasArray);
		successCB();
	} catch(e) {
		errorCB(e);
	}
}


/*
 * Purges currently loaded schemas
 */
VitalServiceWebsocketImpl.prototype.purgeSchemas = function(successCB, errorCB) {

	try {
		this.vsJson.purgeSchemas();
		successCB();
	} catch(e) {
		errorCB(e);
	}
	
}

/*
 * Returns locally loaded domains
 */
VitalServiceWebsocketImpl.prototype.getLocalSchemaList = function(successCB, errorCB) {
	try {
		successCB(this.vsJson.getLocalSchemaList());
	} catch(e) {
		errorCB(e);
	}
}


/*
 * Unloads schema with given URI, a simple validation is performed to check
 */
VitalServiceWebsocketImpl.prototype.unloadSchema = function(schemaURI, successCB, errorCB) {
	
	var _this = this;
	
	try {
		this.vsJson.unloadSchema(schemaURI);
		successCB();
	} catch(e) {
		_this.logger.error(e);
		errorCB(e);
	}
}


VitalServiceWebsocketImpl.prototype.processGraphQueryResults = function(results, _resultsGetter, successCB, errorCB) {
	
	var urisSet = [];
	var urisToGet = [];
	
	//process results
	for(var i = 0 ; i < results.results.length; i++) {
		
		var g = results.results[i].graphObject;
		
		if(g.type != 'http://vital.ai/ontology/vital-core#GraphMatch') {
			errorCB('query_error expected GraphMatch objects only, found: ' + g.type);
			return;
		}
		
		for(var p in g) {
			
			if(!g.hasOwnProperty(p)) continue;
			
			var v = g[p];
			
			if(typeof(v) == 'object') {
				
				if(v._type == 'ai.vital.vitalsigns.model.property.URIProperty') {
					var uri = v.value;
					if(uri != null && urisSet.indexOf(uri) < 0) {
						urisSet.push(uri);
						urisToGet.push(v);
					}
				}
				
			}
			
		}
		
	}
	
	if(urisToGet.length == 0) {
		successCB(results);
		return;
	}
	
	_resultsGetter(urisToGet, function(getResults){

		var resMap = {};
		
		for(var i = 0; i < getResults.results.length; i++) {
			
			var g = getResults.results[i].graphObject;
		
			resMap[g.URI] = g;
			
		}
		
		//augment the graphmatch instances now
		for(var i = 0 ; i < results.results.length; i++) {
			
			var g = results.results[i].graphObject;
			
			var thisURIs = [];
			
			for(var p in g) {
				
				if(!g.hasOwnProperty(p)) continue;
				
				var v = g[p];
				
				if(typeof(v) == 'object') {
					
					if(v._type == 'ai.vital.vitalsigns.model.property.URIProperty') {
						var uri = v.value;
						if(thisURIs.indexOf(uri) < 0) {
							thisURIs.push(uri);
						}
					}
					
				}
				
			}
			
			for( var u = 0 ; u < thisURIs.length; u++ ) {
				
				var uri = thisURIs[u];
				
				var x = resMap[uri];
				
				g[uri] = x;
			}
			
		}

		successCB(results);
		
	}, function(getError){
		
		errorCB("query_error Query succeeded but there was an error when getting graph match results: " + getError);
		
	});
	
}

VitalServiceWebsocketImpl.prototype.destroySessionCookie = function(){
	
	if(this.COOKIE_SESSION_ID != null && typeof($) !== 'undefined' && typeof($.cookie) !== 'undefined') {
		$.removeCookie(this.COOKIE_SESSION_ID, VITAL_COOKIE_ATTRS);
		$.removeCookie(this.COOKIE_SESSION_ID);
	}
	
}

//substitute for jquery.extend, source: http://stackoverflow.com/a/11197343
VitalServiceWebsocketImpl.prototype.extend = function extend(a, b){
    for(var key in b)
        if(b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}


UUIDGenerator = {};

UUIDGenerator.generate = function() {
	
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
	
}


if(typeof(module) !== 'undefined') {

	//SockJS = require(__dirname + '/sockjs-0.3.4.min.js');
	
	EventBus = require(__dirname + '/vertx-eventbus-3.2.1.js');
	
	module.exports = {
		UUIDGenerator: UUIDGenerator,
		VitalServiceWebsocketImpl: VitalServiceWebsocketImpl
	};
	
}