var vitalservice = null;

var stream1 = 'stream1';
	
var stream2 = 'stream2';

var stream3 = 'stream3';
	
$(function(){
	
	println('READY');
	
	VITAL_LOGGING = true

	vitalservice = new VitalService('vitalservice.app', null, function(){
		
		println('connected to endpoint, sessionID: ' + vitalservice.impl.sessionID);
		
		
		println('subscribing to ' +stream1 + '...');
		
		vitalservice.callFunction(VitalService.JS_REGISTER_STREAM_HANDLER, {streamName: stream1, handlerFunction: stream1Handler}, function(succsessObj){
			
			println2('registered handler to ' + stream1, succsessObj);
			
			onHandler1Registered();
			
		}, function(errorCB){
			err(msg);
		});
		
	}, function(error){
		err('couln\'t connect to endpoint -' + error);
	});
	
	initUI();
	
});

function initUI() {
	
	var streamNameEl = $('#stream-name');
	var sessionIDsEl = $('#session-ids');
	var sendButtonEl = $('#send-message');

	sendButtonEl.click(function(){
		
		var streamName = streamNameEl.val();
		var sessionIDsVal = sessionIDsEl.val();
		
		var sessionIDs = [];
		if(sessionIDsVal.length > 0) {
			sessionIDs = sessionIDsVal.split(/\\s+/)
		}
		
		println2('sending message to stream ' + streamName + " and sessionIDs: ", sessionIDs);
 
		var msg = {
			type: 'ResultList',
			results: []
		};
		
		vitalservice.callFunction('vertx-send-to-stream', {streamName: streamName, sessionIDs: sessionIDs, message : msg}, function(succsessObj){
			
			println2("message sent: ", succsessObj); 
			
		}, function(errorObj) {
			err2('failed to send message: ', errorObj);
		})
		
		
	});
	
	
}

function err(msg) {
	$('#console').append($('<p>', {style: 'color: #BB0000; background-color: #eee;'}).text(msg));
}

function err2(msg, obj) {
	$('#console').append($('<p>', {style: 'color: #BB0000; background-color: #eee;'}).text(msg + ' ' +  JSON.stringify(obj) ));
}

function println(msg) {

	$('#console').append($('<p>').text(msg));
	
}

function println2(msg, obj) {
	
	$('#console').append($('<p>').text(msg + ' ' +  JSON.stringify(obj) ));
	
}


function stream1Handler(msg) {
	
	println("Stream1 received message: " + JSON.stringify(msg) );
	
}

function stream2Handler(msg) {
	
	println("Stream2 received message: " + JSON.stringify(msg) );
	
}

function stream3Handler(msg) {
	
	println("Stream3 received message: " + JSON.stringify(msg) );
	
}

function listHandlers(nextCB) {
	
	
	vitalservice.callFunction(VitalService.JS_LIST_STREAM_HANDLERS, {}, function(succsessObj){
		
		println2('stream handlers list: ', succsessObj);
		
		nextCB();
		
	}, function(errorCB){
		err(errorCB);
		
		nextCB();
		
	});
	
}

function onHandler1Registered() {
	
	vitalservice.callFunction(VitalService.JS_REGISTER_STREAM_HANDLER, {streamName: stream1, handlerFunction: stream1Handler}, function(succsessObj){
		
		err('shouldn\'t get here!');
		
	}, function(errorCB){
		err(errorCB);
		
		listHandlers(subscribeStream1);
		
	});
	
}

function subscribeStream1() {
	
	println('subscribing to stream 1');
	
	vitalservice.callFunction(VitalService.VERTX_STREAM_SUBSCRIBE, {streamName: stream1}, function(succsessObj){
		
		println("subscribed stream1: ", succsessObj); 
		
		onSubscribedToStream1();
		
	}, function(errorObj) {
		err(errorObj);
	})
	
}

function onSubscribedToStream1() {

	
	vitalservice.callFunction(VitalService.JS_REGISTER_STREAM_HANDLER, {streamName: stream2, handlerFunction: stream2Handler}, function(succsessObj){
		
		println2('registered handler to ' + stream2, succsessObj);
		
		listHandlers(onStream2HandlerRegistered);
		
	}, function(errorCB){
		err(msg);
	});
}

function onStream2HandlerRegistered() {
	
	println('subscribing to stream 2');
	
	vitalservice.callFunction(VitalService.VERTX_STREAM_SUBSCRIBE, {streamName: stream2}, function(succsessObj){
		
		println("subscribed stream2: ", succsessObj); 
		
		onSubscribedToStream2();
		
	}, function(errorObj) {
		err(errorObj);
	})
	
}


function onSubscribedToStream2() {
	
	println("unregistering stream2 handler");
	
	vitalservice.callFunction(VitalService.JS_UNREGISTER_STREAM_HANDLER, {streamName: stream2}, function(succsessObj){
		
		println("unregistered stream2 handler: ", succsessObj); 
		
		onStream2UnregisterFail();
		
	}, function(errorObj) {
		err("failed to unregister stream2 handler: " + errorObj);
		onStream2UnregisterFail();
	})
}

function onStream2UnregisterFail() {

	vitalservice.callFunction(VitalService.JS_REGISTER_STREAM_HANDLER, {streamName: stream3, handlerFunction: stream3Handler}, function(succsessObj){
		
		println2('registered handler to ' + stream3, succsessObj);
		
		
		vitalservice.callFunction(VitalService.VERTX_STREAM_SUBSCRIBE, {streamName: stream3}, function(succsessObj2){
			
			println("subscribed stream3: ", succsessObj2); 
			
			listHandlers(onSubscribedToStream3);
			
		}, function(errorObj) {
			err(errorObj);
		})
		
	}, function(errorCB){
		err(msg);
	});
	
}

function onSubscribedToStream3() {
	
	vitalservice.callFunction(VitalService.VERTX_STREAM_UNSUBSCRIBE, {streamName: stream3}, function(succsessObj){
		
		println("unsubscribed from stream3: ", succsessObj); 
		
		vitalservice.callFunction(VitalService.JS_UNREGISTER_STREAM_HANDLER, {streamName: stream3}, function(succsessObj2){
			
			println("unregistered stream3 handler: ", succsessObj2); 
			
			listHandlers(onStream3HandlerRemoved);
			
		}, function(errorObj) {
			err("failed to unregister stream2 handler: " + errorObj);
		})
		
	}, function(errorObj) {
		err(errorObj);
	})
	
}

function onStream3HandlerRemoved() {

	
	
}
