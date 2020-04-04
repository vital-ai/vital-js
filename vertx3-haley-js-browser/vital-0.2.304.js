if(typeof(VITAL_JSON_SCHEMAS) == 'undefined') {
 throw ("No VITAL_JSON_SCHEMAS list defined - vital-core domain unavailable");
}

var vital_0_2_304_schema = {
  "domainURI" : "http://vital.ai/ontology/vital",
  "name" : "vital-0.2.304",
  "version" : "0.2.304",
  "domainOWLHash" : "b413e87660c8042b30281139409c033a",
  "vitalsignsVersion" : "0.2.304",
  "parents" : [ "http://vital.ai/ontology/vital-core" ],
  "schemas" : [ {
    "extends" : "http://vital.ai/ontology/vital-core#VITAL_Edge",
    "properties" : {
      "http://vital.ai/ontology/vital#hasAccountAccessURIs" : {
        "type" : "array",
        "items" : {
          "type" : "string"
        }
      },
      "http://vital.ai/ontology/vital#hasAccountOwnerURI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasLoginOwnerURI" : {
        "type" : "string"
      }
    }
  }, {
    "extends" : "http://vital.ai/ontology/vital-core#VITAL_HyperEdge",
    "properties" : {
      "http://vital.ai/ontology/vital#hasAccountAccessURIs" : {
        "type" : "array",
        "items" : {
          "type" : "string"
        }
      },
      "http://vital.ai/ontology/vital#hasAccountOwnerURI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasLoginOwnerURI" : {
        "type" : "string"
      }
    }
  }, {
    "extends" : "http://vital.ai/ontology/vital-core#VITAL_HyperNode",
    "properties" : {
      "http://vital.ai/ontology/vital#hasAccountAccessURIs" : {
        "type" : "array",
        "items" : {
          "type" : "string"
        }
      },
      "http://vital.ai/ontology/vital#hasAccountOwnerURI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasLoginOwnerURI" : {
        "type" : "string"
      }
    }
  }, {
    "extends" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/vital#hasAccountAccessURIs" : {
        "type" : "array",
        "items" : {
          "type" : "string"
        }
      },
      "http://vital.ai/ontology/vital#hasAccountOwnerURI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasCertainty" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasDegree" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasLoginOwnerURI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasPageRank" : {
        "type" : "number"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Account",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/vital#hasAccountID" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasAccountLoginSuffix" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasLocalLoginsType" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#isLocalLoginsValidated" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital#isLocked" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital#isRetired" : {
        "type" : "boolean"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#AdminLogin",
    "parent" : "http://vital.ai/ontology/vital#CredentialsLogin",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#BusinessOrganization",
    "parent" : "http://vital.ai/ontology/vital#Organization",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#CredentialsLogin",
    "parent" : "http://vital.ai/ontology/vital#UserLogin",
    "properties" : {
      "http://vital.ai/ontology/vital-core#hasPassword" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasUsername" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Currency",
    "parent" : "http://vital.ai/ontology/vital#Thing",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Datascript",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/vital#hasLastCompilationError" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasLastModifiedDate" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasScriptBody" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasScriptPath" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#isAdminScript" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital#isRegularScript" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital-core#hasAppID" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasOrganizationID" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#DatascriptInfo",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/vital#hasInfo" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#DatascriptRun",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/vital#hasJobID" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasJobStatus" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasLastModifiedDate" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasScriptPath" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Duration",
    "parent" : "http://vital.ai/ontology/vital#Thing",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Edge_hasLoginAuth",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Edge",
    "sourceDomains" : [ "http://vital.ai/ontology/vital#CredentialsLogin" ],
    "destinationDomains" : [ "http://vital.ai/ontology/vital#LoginAuth" ],
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Edge_hasNextElement",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_PeerEdge",
    "sourceDomains" : [ "http://vital.ai/ontology/vital#ListElement" ],
    "destinationDomains" : [ "http://vital.ai/ontology/vital#ListElement" ],
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Edge_hasUserLogin",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_TaxonomyEdge",
    "sourceDomains" : [ "http://vital.ai/ontology/vital#Account" ],
    "destinationDomains" : [ "http://vital.ai/ontology/vital#UserLogin" ],
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Edge_hasUserSession",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_TaxonomyEdge",
    "sourceDomains" : [ "http://vital.ai/ontology/vital#Account" ],
    "destinationDomains" : [ "http://vital.ai/ontology/vital#UserSession" ],
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#EmailAddress",
    "parent" : "http://vital.ai/ontology/vital#Identifier_Locator",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#ErrorFact",
    "parent" : "http://vital.ai/ontology/vital#VITAL_Fact",
    "properties" : {
      "http://vital.ai/ontology/vital#hasErrorMessage" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasErrorType" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#FileNode",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/vital#hasAccountURI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasExpirationDate" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasFileLength" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasFileName" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasFileScope" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasFileType" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasFileURL" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasProfileURI" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#GeographicRegion",
    "parent" : "http://vital.ai/ontology/vital#Thing",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#GovernmentOrganization",
    "parent" : "http://vital.ai/ontology/vital#Organization",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#HyperEdge_hasFact",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_HyperEdge",
    "sourceDomains" : [ "http://vital.ai/ontology/vital-core#VITAL_Edge", "http://vital.ai/ontology/vital-core#VITAL_HyperNode", "http://vital.ai/ontology/vital-core#VITAL_Node" ],
    "destinationDomains" : [ "http://vital.ai/ontology/vital#VITAL_Fact" ],
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#HyperEdge_hasHyperAnnotation",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_HyperEdge",
    "sourceDomains" : [ "http://vital.ai/ontology/vital-core#VITAL_Edge", "http://vital.ai/ontology/vital-core#VITAL_HyperEdge", "http://vital.ai/ontology/vital-core#VITAL_HyperNode", "http://vital.ai/ontology/vital-core#VITAL_Node" ],
    "destinationDomains" : [ "http://vital.ai/ontology/vital#VITAL_Annotation" ],
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#HyperEdge_hasReason",
    "parent" : "http://vital.ai/ontology/vital#HyperEdge_hasHyperAnnotation",
    "sourceDomains" : [ "http://vital.ai/ontology/vital-core#VITAL_Edge", "http://vital.ai/ontology/vital-core#VITAL_HyperEdge", "http://vital.ai/ontology/vital-core#VITAL_HyperNode", "http://vital.ai/ontology/vital-core#VITAL_Node" ],
    "destinationDomains" : [ "http://vital.ai/ontology/vital#VITAL_Reason" ],
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Identifier_Locator",
    "parent" : "http://vital.ai/ontology/vital#Thing",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Job",
    "parent" : "http://vital.ai/ontology/vital#Datascript",
    "properties" : {
      "http://vital.ai/ontology/vital#hasCronExpression" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasInterval" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasIntervalTimeUnit" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasLastExecutionTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasNextExecutionTime" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#isCallable" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital#isPaused" : {
        "type" : "boolean"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#ListElement",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/vital#isFirstElement" : {
        "type" : "boolean"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Location",
    "parent" : "http://vital.ai/ontology/vital#GeographicRegion",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Login",
    "parent" : "http://vital.ai/ontology/vital#CredentialsLogin",
    "properties" : {
      "http://vital.ai/ontology/vital#isServiceLogin" : {
        "type" : "boolean"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#LoginAuth",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/vital-core#hasPassword" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasUsername" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Media",
    "parent" : "http://vital.ai/ontology/vital#Thing",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Number",
    "parent" : "http://vital.ai/ontology/vital#Thing",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Organization",
    "parent" : "http://vital.ai/ontology/vital#Thing",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Person",
    "parent" : "http://vital.ai/ontology/vital#PhysicalThing",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#PhoneNumber",
    "parent" : "http://vital.ai/ontology/vital#Identifier_Locator",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#PhysicalThing",
    "parent" : "http://vital.ai/ontology/vital#Thing",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#PrivateOrganization",
    "parent" : "http://vital.ai/ontology/vital#Organization",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Product",
    "parent" : "http://vital.ai/ontology/vital#PhysicalThing",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Thing",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#Time",
    "parent" : "http://vital.ai/ontology/vital#Thing",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#URI",
    "parent" : "http://vital.ai/ontology/vital#Identifier_Locator",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#URL",
    "parent" : "http://vital.ai/ontology/vital#Identifier_Locator",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#UserLogin",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/vital#hasEmailAddress" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasVerificationCode" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#isEmailVerified" : {
        "type" : "boolean"
      },
      "http://vital.ai/ontology/vital#isLocked" : {
        "type" : "boolean"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#UserSession",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/vital#hasExpirationDate" : {
        "type" : "number"
      },
      "http://vital.ai/ontology/vital#hasLoginURI" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasSessionID" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital-core#hasSessionType" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#VITAL_Annotation",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_HyperNode",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#VITAL_Fact",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_HyperNode",
    "properties" : {
      "http://vital.ai/ontology/vital#isEnabled" : {
        "type" : "boolean"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#VITAL_Reason",
    "parent" : "http://vital.ai/ontology/vital#VITAL_Annotation",
    "properties" : {
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#VitalRule",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
      "http://vital.ai/ontology/vital#hasRuleBody" : {
        "type" : "string"
      },
      "http://vital.ai/ontology/vital#hasRuleSet" : {
        "type" : "string"
      }
    }
  }, {
    "id" : "http://vital.ai/ontology/vital#VitalRuleSet",
    "parent" : "http://vital.ai/ontology/vital-core#VITAL_Node",
    "properties" : {
    }
  } ],
  "properties" : [ {
    "URI" : "http://vital.ai/ontology/vital#hasAccountAccessURIs",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-core#VITAL_Edge", "http://vital.ai/ontology/vital-core#VITAL_HyperEdge", "http://vital.ai/ontology/vital-core#VITAL_HyperNode", "http://vital.ai/ontology/vital-core#VITAL_Node" ],
    "shortName" : "accountAccessURIs",
    "multipleValues" : true,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasAccountID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Account" ],
    "shortName" : "accountID",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasAccountLoginSuffix",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Account" ],
    "shortName" : "accountLoginSuffix",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasAccountOwnerURI",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-core#VITAL_Edge", "http://vital.ai/ontology/vital-core#VITAL_HyperEdge", "http://vital.ai/ontology/vital-core#VITAL_HyperNode", "http://vital.ai/ontology/vital-core#VITAL_Node" ],
    "shortName" : "accountOwnerURI",
    "multipleValues" : false,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasAccountURI",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#FileNode" ],
    "shortName" : "accountURI",
    "multipleValues" : false,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasCertainty",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-core#VITAL_Edge", "http://vital.ai/ontology/vital-core#VITAL_HyperEdge", "http://vital.ai/ontology/vital-core#VITAL_HyperNode", "http://vital.ai/ontology/vital-core#VITAL_Node" ],
    "shortName" : "certainty",
    "multipleValues" : false,
    "type" : "DoubleProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasCronExpression",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Job" ],
    "shortName" : "cronExpression",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasDegree",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-core#VITAL_Node" ],
    "shortName" : "degree",
    "multipleValues" : false,
    "type" : "IntegerProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasEmailAddress",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#UserLogin" ],
    "shortName" : "emailAddress",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasErrorMessage",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#ErrorFact" ],
    "shortName" : "errorMessage",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasErrorType",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#ErrorFact" ],
    "shortName" : "errorType",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasExpirationDate",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#FileNode", "http://vital.ai/ontology/vital#UserSession" ],
    "shortName" : "expirationDate",
    "multipleValues" : false,
    "type" : "DateProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasFileLength",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#FileNode" ],
    "shortName" : "fileLength",
    "multipleValues" : false,
    "type" : "LongProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasFileName",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#FileNode" ],
    "shortName" : "fileName",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasFileScope",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#FileNode" ],
    "shortName" : "fileScope",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasFileType",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#FileNode" ],
    "shortName" : "fileType",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasFileURL",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#FileNode" ],
    "shortName" : "fileURL",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasInfo",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#DatascriptInfo" ],
    "shortName" : "info",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasInterval",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Job" ],
    "shortName" : "interval",
    "multipleValues" : false,
    "type" : "IntegerProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasIntervalTimeUnit",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Job" ],
    "shortName" : "intervalTimeUnit",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasJobID",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#DatascriptRun" ],
    "shortName" : "jobID",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasJobStatus",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#DatascriptRun" ],
    "shortName" : "jobStatus",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasLastCompilationError",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Datascript" ],
    "shortName" : "lastCompilationError",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasLastExecutionTime",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Job" ],
    "shortName" : "lastExecutionTime",
    "multipleValues" : false,
    "type" : "DateProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasLastModifiedDate",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Datascript", "http://vital.ai/ontology/vital#DatascriptRun" ],
    "shortName" : "lastModifiedDate",
    "multipleValues" : false,
    "type" : "DateProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasLocalLoginsType",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Account" ],
    "shortName" : "localLoginsType",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasLoginOwnerURI",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-core#VITAL_Edge", "http://vital.ai/ontology/vital-core#VITAL_HyperEdge", "http://vital.ai/ontology/vital-core#VITAL_HyperNode", "http://vital.ai/ontology/vital-core#VITAL_Node" ],
    "shortName" : "loginOwnerURI",
    "multipleValues" : false,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasLoginURI",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#UserSession" ],
    "shortName" : "loginURI",
    "multipleValues" : false,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasNextExecutionTime",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Job" ],
    "shortName" : "nextExecutionTime",
    "multipleValues" : false,
    "type" : "DateProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasPageRank",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital-core#VITAL_Node" ],
    "shortName" : "pageRank",
    "multipleValues" : false,
    "type" : "DoubleProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasProfileURI",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#FileNode" ],
    "shortName" : "profileURI",
    "multipleValues" : false,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasRuleBody",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#VitalRule" ],
    "shortName" : "ruleBody",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasRuleSet",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#VitalRule" ],
    "shortName" : "ruleSet",
    "multipleValues" : false,
    "type" : "URIProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasScriptBody",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Datascript" ],
    "shortName" : "scriptBody",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasScriptPath",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Datascript", "http://vital.ai/ontology/vital#DatascriptRun" ],
    "shortName" : "scriptPath",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#hasVerificationCode",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#UserLogin" ],
    "shortName" : "verificationCode",
    "multipleValues" : false,
    "type" : "StringProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#isAdminScript",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Datascript" ],
    "shortName" : "adminScript",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#isCallable",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Job" ],
    "shortName" : "callable",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#isEmailVerified",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#UserLogin" ],
    "shortName" : "emailVerified",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#isEnabled",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#VITAL_Fact" ],
    "shortName" : "enabled",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#isFirstElement",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#ListElement" ],
    "shortName" : "firstElement",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#isLocalLoginsValidated",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Account" ],
    "shortName" : "localLoginsValidated",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#isLocked",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Account", "http://vital.ai/ontology/vital#UserLogin" ],
    "shortName" : "locked",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#isPaused",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Job" ],
    "shortName" : "paused",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#isRegularScript",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Datascript" ],
    "shortName" : "regularScript",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#isRetired",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Account" ],
    "shortName" : "retired",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  }, {
    "URI" : "http://vital.ai/ontology/vital#isServiceLogin",
    "domainClassesURIs" : [ "http://vital.ai/ontology/vital#Login" ],
    "shortName" : "serviceLogin",
    "multipleValues" : false,
    "type" : "BooleanProperty"
  } ]
};

VITAL_JSON_SCHEMAS.push(vital_0_2_304_schema);

if(typeof(module) !== 'undefined') {

  module.exports = vital_0_2_304_schema;

}