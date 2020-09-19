export const schema = {
    "models": {
        "SmartMeter": {
            "name": "SmartMeter",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "unit": {
                    "name": "unit",
                    "isArray": false,
                    "type": {
                        "enum": "MeterUnit"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "MeterType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "role": {
                    "name": "role",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "profile": {
                    "name": "profile",
                    "isArray": false,
                    "type": {
                        "model": "LoadProfile"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "meter"
                    }
                }
            },
            "syncable": true,
            "pluralName": "SmartMeters",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "LoadProfile": {
            "name": "LoadProfile",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "unit": {
                    "name": "unit",
                    "isArray": false,
                    "type": {
                        "enum": "MeterUnit"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "MeterType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "meter": {
                    "name": "meter",
                    "isArray": false,
                    "type": {
                        "model": "SmartMeter"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "loadProfileMeterId"
                    }
                },
                "dataPoints": {
                    "name": "dataPoints",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "LoadProfiles",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "DataPoint": {
            "name": "DataPoint",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "timestamp": {
                    "name": "timestamp",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "time": {
                    "name": "time",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": true,
                    "attributes": []
                },
                "hour": {
                    "name": "hour",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "minutes": {
                    "name": "minutes",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "value": {
                    "name": "value",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "unit": {
                    "name": "unit",
                    "isArray": false,
                    "type": {
                        "enum": "DataPointUnit"
                    },
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "DataPoints",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        }
    },
    "enums": {
        "MeterUnit": {
            "name": "MeterUnit",
            "values": [
                "kW",
                "kWh",
                "m3",
                "celsius"
            ]
        },
        "MeterType": {
            "name": "MeterType",
            "values": [
                "ELECTRICITY",
                "WATER",
                "GAS",
                "TEMPERATURE"
            ]
        },
        "DataPointUnit": {
            "name": "DataPointUnit",
            "values": [
                "kW",
                "kWh",
                "m3",
                "celsius"
            ]
        }
    },
    "nonModels": {},
    "version": "3ad2d6abe30cde5c14625bce438421e2"
};