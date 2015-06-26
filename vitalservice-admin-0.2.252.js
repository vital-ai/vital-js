/**
 * VitalService javascript interface
 */
VitalServiceAdmin = function(successCB, errorCB) {
	
	//the vitalservice is initialized asynchronously
	this.impl = new VitalServiceWebsocketImpl('vitalserviceadmin', successCB, errorCB);
	
}


/**
 * Adds app
 * returns VitalStatus
 */
VitalServiceAdmin.prototype.addApp = function(app, successCB, errorCB) {
	this.impl.callMethod('addApp', [app], successCB, errorCB);
}


/**
 * Adds segment
 * returns segment
 */
VitalServiceAdmin.prototype.addSegment = function(app, segment, createIfNotExists, successCB, errorCB) {
	this.impl.callMethod('addSegment', [app, segment, createIfNotExists], successCB, errorCB);
}



//bulkExport(VitalSegment, OutputStream)
//bulkImport(VitalSegment, InputStream)

/**
* Calls datascript with name and params
* returns ResultList
*/
VitalServiceAdmin.prototype.callFunction = function(app,functionName, paramsMap, successCB, errorCB) {
	this.impl.callMethod('callFunction', [app, functionName, paramsMap], successCB, errorCB);
}

//close()


VitalServiceAdmin.prototype.commitTransaction = function(transaction, successCB, errorCB) {
	this.impl.callMethod('commitTransaction', [transaction], successCB, errorCB);
}

VitalServiceAdmin.prototype.createTransaction = function(successCB, errorCB) {
	this.impl.callMethod('createTransaction', [], successCB, errorCB);
}


/**
* Deletes a single URIProperty or List of URIProperty objects
* returns VitalStatus
* 
*/
VitalServiceAdmin.prototype.delete_ = function(app, URIPropertyOrList, successCB, errorCB) {
	this.impl.callMethod('delete', [app, URIPropertyOrList], successCB, errorCB);
}


/**
* Deletes expanded single URIProperty or List of URIProperty objects
*/
VitalServiceAdmin.prototype.deleteExpanded = function(app, URIPropertyorList, successCB, errorCB) {
	this.impl.callMethod('deleteExpanded', [app, URIPropertyorList], successCB, errorCB);

}

/**
* Deletes expanded single URIProperty or List of URIProperty objects with VitalPathQuery
*/
VitalServiceAdmin.prototype.deleteExpanded = function(app, URIPropertyorList, vitalPathQueryString, successCB, errorCB) {
	this.impl.callMethod('deleteExpanded', [app, URIPropertyorList, vitalPathQueryString], successCB, errorCB);
}


/**
* Deletes expanded a single graph object
*/
VitalServiceAdmin.prototype.deleteExpandedObject = function(app, graphObject, successCB, errorCB) {
	this.impl.callMethod('deleteExpandedObject', [app, graphObject], successCB, errorCB);
}

/**
* Deletes expanded a list of graph object with vital path query string
*/
VitalServiceAdmin.prototype.deleteExpandedObject = function(app, graphObject, vitalPathQueryString, successCB, errorCB) {
	this.impl.callMethod('deleteExpandedObjects', [app, graphObject, vitalPathQueryString], successCB, errorCB);
}


//deleteFile(App, URIProperty, String)

/**
* Deletes a single graph object
*/
VitalServiceAdmin.prototype.deleteObject = function(app, graphObject, successCB, errorCB) {
	this.impl.callMethod('deleteObject', [app, graphObject], successCB, errorCB);
}

/**
* Deletes a list of graph objects
*/
VitalServiceAdmin.prototype.deleteObjects = function(app, graphObjectsList, successCB, errorCB) {
	this.impl.callMethod('deleteObjects', [app, graphObjectsList], successCB, errorCB);
}


//doOperations(App ServiceOperations)

//downloadFile(App URIProperty, String, OutputStream, boolean)

//fileExists(App, URIProperty, String)



/**
* Generates a new URI for given class (class object)
* returns URIProperty
*/
VitalServiceAdmin.prototype.generateURI = function(app, classObject, successCB, errorCB) {
	this.impl.callMethod('generateURI', [app, classObject], successCB, errorCB);
}

/**
* Gets a GraphObject or list, input is either URIProperty or list of URIProperty objects accordingly
*/
VitalServiceAdmin.prototype.get = function(app, URIPropertyOrList, successCB, errorCB) {
	//always service wide context!
	this.impl.callMethod('get', [app, {type: 'GraphContext', value: 'ServiceWide'}, URIPropertyOrList], successCB, errorCB);
}

/**
* Gets a GraphObject or list, input is either URIProperty or list of URIProperty objects accordingly
* Flag controls whether to cache object on the server side
*/
VitalServiceAdmin.prototype.get = function(app, URIPropertyOrList, doCache, successCB, errorCB) {
	//always service wide context!
	this.impl.callMethod('get', [app, {type: 'GraphContext', value: 'ServiceWide'}, URIPropertyOrList, doCache], successCB, errorCB);
}


/**
* returns EndpointType
*/
VitalServiceAdmin.prototype.getEndpointType = function(successCB, errorCB) {
	this.impl.callMethod('getEndpointType', [], successCB, errorCB);
}

VitalServiceAdmin.prototype.getExpanded = function(app, URIProperty, doCache, successCB, errorCB) {
	this.impl.callMethod('getExpanded', [app, URIProperty, doCache], successCB, errorCB);
}

VitalServiceAdmin.prototype.getExpanded = function(app, URIProperty, VitalPathQueryString, doCache, successCB, errorCB) {
	this.impl.callMethod('getExpanded', [app, URIProperty, VitalPathQueryString, doCache], successCB, errorCB);
}

VitalServiceAdmin.prototype.getOrganization = function(successCB, errorCB) {
	this.impl.callMethod('getOrganization', [], successCB, errorCB);
}

VitalServiceAdmin.prototype.getTransactions = function(successCB, errorCB) {
	this.impl.callMethod('getTransactions', [], successCB, errorCB);
}

VitalServiceAdmin.prototype.insert = function(app, vitalSegment, graphObjectOrList, successCB, errorCB) {
	this.impl.callMethod('insert', [app, vitalSegment, graphObject], successCB, errorCB);
}

VitalServiceAdmin.prototype.listApps = function(successCB, errorCB) {
	this.impl.callMethod('listApps', [], successCB, errorCB);
}
//listFiles(String)

VitalServiceAdmin.prototype.listSegments = function(app, successCB, errorCB) {
	this.impl.callMethod('listSegments', [app], successCB, errorCB);
}

/**
* Pings the service 
* returns VitalStatus
*/
VitalServiceAdmin.prototype.ping = function(successCB, errorCB) {
	this.impl.callMethod('ping', [], successCB, errorCB);
}

/**
* Queries the vitalservice
*/
VitalServiceAdmin.prototype.query = function(app, vitalQueryString, successCB, errorCB) {
	this.impl.callMethod('query', [app, vitalQueryString], successCB, errorCB);
}

/**
* Queries the vitalservice
*/
VitalServiceAdmin.prototype.queryLocal = function(app, vitalQueryString, successCB, errorCB) {
	this.impl.callMethod('queryLocal', [app, vitalQueryString], successCB, errorCB);
}


VitalServiceAdmin.prototype.removeApp = function(app, successCB, errorCB) {
	this.impl.callMethod('removeApp', [app], successCB, errorCB);
}

VitalServiceAdmin.prototype.removeSegment = function(app, segment, deleteData, successCB, errorCB) {
	this.impl.callMethod('removeSegment', [app, segment, deleteData], successCB, errorCB);
}


VitalServiceAdmin.prototype.rollbackTransaction = function(transaction, successCB, errorCB) {
	this.impl.callMethod('rollbackTransaction', [transaction], successCB, errorCB);
}


/**
* Saves a graph object or objects list in default segment 
*/
VitalServiceAdmin.prototype.save = function(app, graphObjectOrList, createFlag, successCB, errorCB) {
	this.impl.callMethod('save', [app, graphObjectOrList, createFlag], successCB, errorCB);
}

/**
* Saves a graph object or objects list 
*/
VitalServiceAdmin.prototype.save = function(app, segment, graphObjectOrList, createFlag, successCB, errorCB) {
	this.impl.callMethod('save', [app, segment, graphObjectOrList, createFlag], successCB, errorCB);
}

VitalServiceAdmin.prototype.sendEvent = function(app, VITAL_Event, waitForDelivery, successCB, errorCB) {
	this.impl.callMethod('sendEvent', [app, VITAL_Event, waitForDelivery], successCB, errorCB);
}

VitalServiceAdmin.prototype.sendEvents = function(app, ListOfVITAL_Events, waitForDelivery, successCB, errorCB) {
	this.impl.callMethod('sendEvents', [app, ListOfVITAL_Events, waitForDelivery], successCB, errorCB);
}

VitalServiceAdmin.prototype.setDefaultSegmentName = function(defaultsegment, successCB, errorCB) {
	this.impl.callMethod('setDefaultSegmentName', [defaultsegment], successCB, errorCB);
}

VitalServiceAdmin.prototype.setTransaction = function(transaction, successCB, errorCB) {
	this.impl.callMethod('setTransaction', [transaction], successCB, errorCB);
}

//uploadFile(URIProperty, String, InputStream, boolean)

VitalServiceAdmin.prototype.validate = function(successCB, errorCB) {
	this.impl.callMethod('validate', [], successCB, errorCB);
}
