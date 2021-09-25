/**
 * Mock vitalservice implementation
 * @param type
 * @param successCB
 * @param errorCB
 * @param logger
 * @returns
 */
 VitalServiceMockImpl = function(type, successCB, errorCB, logger) {
	
	//default logger is console, but can be replaced with watson etc
	this.logger = logger != null ? logger : console;
	
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
	this.sessionID = 'mock-' + new Date().getTime();
	
	//obtained via authentication, appended to every request
	this.appSessionID  = null;
	
	//this is returned immediately
	this.mockLogin = null;
	this.login = null;
	
	this.logger.info('sessionID: ' + this.sessionID);

	this.authAppID = null; 
	
	this.vsJson = null;
	
	this.closed = false;
	
	this.url = "http://example.org/mocked-vitalservice-endpoint";
	
	if(typeof( VitalServiceJson ) != 'undefined') {
		
		this.logger.info("loading json validation module...");
		
		if(VitalServiceJson.SINGLETON != null) {
			
			this.logger.info("json singleton already set - reusing");
			
		} else {
		
			this.logger.info("Initializing new json singleton");
			
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
	
	
	//
	this.successCB = successCB;
	this.callFunctionHandlers = {};
	
}

VitalServiceMockImpl.prototype.connect = function(){
	this.successCB();
}

VitalServiceMockImpl.JS_REGISTER_STREAM_HANDLER = 'js-register-stream-handler';

VitalServiceMockImpl.JS_UNREGISTER_STREAM_HANDLER = 'js-unregister-stream-handler';

VitalServiceMockImpl.JS_LIST_STREAM_HANDLERS = 'js-list-stream-handlers';


VitalServiceMockImpl.VERTX_STREAM_SUBSCRIBE = 'vertx-stream-subscribe';

VitalServiceMockImpl.VERTX_STREAM_UNSUBSCRIBE = 'vertx-stream-unsubscribe';

VitalServiceMockImpl.DomainsManagerScript = 'commons/scripts/DomainsManagerScript';

VitalServiceMockImpl.vitalauth_login = 'vitalauth.login';

VitalServiceMockImpl.vitalauth_logout = 'vitalauth.logout';

VitalServiceMockImpl.vitalauth_authorise = 'vitalauth.authorise';

VitalServiceMockImpl.prototype.getAppSessionID = function() {
	return this.appSessionID;
}



/**
 * Calls the service method, all input parameters are validated against json schema - same 
 */
VitalServiceMockImpl.prototype.callMethod = function(method, args, successCB, errorCB) {
	
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
		} else {
			this.logger.error("method : " + method + " requires at least two arguments");
			return
		}

		
		if(functionName == VitalServiceMockImpl.vitalauth_login) {
			
			if(this.mockLogin == null) {
				throw "mock login not set!";
			}
			
			this.login = this.mockLogin;
			this.appSessionID = 'Login-mock-' + new Date().getTime();
			
			var rl = vitaljs.resultList();
			rl.addResult(this.login);
			
			successCB(rl);
			return;
			
		}
		
		if(functionName == VitalServiceMockImpl.vitalauth_authorise) {
			
			throw "not implemented: " + functionName;
			
		}
		
		
		if(functionName == VitalServiceMockImpl.vitalauth_logout) {
			this.login = null;
			this.appSessionID = null;
			var rl = vitaljs.resultList();
			successCB(rl);
		}
		
		var handler = this.callFunctionHandlers[functionName];
		if(handler == null) {
			throw "No mock handler for function name: " + functionName;
		}
		
		var rl = handler(args[1]);
		
		this.logger.info("handler for function: " + functionName + " returned", rl);
		
		if(rl.timeout) {
			
			setTimeout(function(){
				successCB(rl);
			}, rl.timeout);
			
		} else {
			
			successCB(rl);
			
		}
		
		
		
	} else {
		throw "method not supported by mocked client: " + method;
	}
	
}

VitalServiceMockImpl.prototype.close = function(successCB, errorCB){
	
	var _this = this;
	
	this.closed = true;
	
	if(successCB != null) {
		successCB();
	}
	
	
}

VitalServiceMockImpl.prototype.listStreamHandlers = function(paramsMap, successCB, errorCB) {
	
	var res = vitaljs.resultList();
	
	successCB(res);
	
}

VitalServiceMockImpl.prototype.registerStreamHandler = function(paramsMap, successCB, errorCB) {
	
	var streamName = paramsMap.streamName;
	
	successCB({
		_type: 'ai.vital.vitalservice.query.ResultList',
		status: {
			_type: 'ai.vital.vitalservice.VitalStatus',
			status: 'ok',
			message: 'MOCK Handler for stream ' + streamName + ' registered successfully'
		}
	});
	
}



VitalServiceMockImpl.prototype.unregisterStreamHandler = function(paramsMap, successCB, errorCB) {
	
	var streamName = paramsMap.streamName;
	
	successCB({
		_type: 'ai.vital.vitalservice.query.ResultList',
		status: {
			_type: 'ai.vital.vitalservice.VitalStatus',
			status: 'ok',
			message: 'MOCK Handler for stream ' + streamName + ' unregistered successfully'
		}
	});
	
}

VitalServiceMockImpl.prototype.streamSubscribe = function(paramsMap, successCB, errorCB) {
	
	var streamName = paramsMap.streamName;
	
	successCB({
		_type: 'ai.vital.vitalservice.query.ResultList',
		status: {
			_type: 'ai.vital.vitalservice.VitalStatus',
			status: 'ok',
			message: 'MOCK Successfully Subscribe to stream ' + streamName
		}
	});
		
	
}


Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

VitalServiceMockImpl.prototype.streamUnsubscribe = function(paramsMap, successCB, errorCB) {

	var streamName = paramsMap.streamName;
	
	successCB({
		_type: 'ai.vital.vitalservice.query.ResultList',
		status: {
			_type: 'ai.vital.vitalservice.VitalStatus',
			status: 'ok',
			message: 'MOCK Successfully unsubscribe from stream ' + streamName
		}
	});
	
}


if(typeof(module) !== 'undefined') {

	module.exports = {
		VitalServiceMockImpl: VitalServiceMockImpl
	};
	
}
