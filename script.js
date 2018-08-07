// reset database
use SpringBoard
db.dropDatabase()

// set up users table
db.Users.createIndex({ "username": 1 }, { unique: true })
db.Users.insertMany([
    { "username": "admin", "password": "$argon2i$v=19$m=512,t=2,p=2$0OvvCnGQIgmrBhzF1DzRJg$AndnHTRF7unXj/g4NYFhzA", "userType": "ADMIN", "email": "admin@email.com" },
    { "username": "RandyLai", "password": "$argon2i$v=19$m=512,t=2,p=2$xaPF+Umz4EJsi8KcfYcpFg$EYR0xPAIbJTLhmLU2IQC9A", "userType": "CM", "email": "randy@email.com" },
    { "username": "LimPeiXuan", "password": "$argon2i$v=19$m=512,t=2,p=2$dIR+gSEKdzNyfc4O6ywpSw$oeuv/geCe3jGIQ7A7U/dsA", "userType": "RM", "email": "peixuan@email.com" }
])

// set up checklists table
db.Checklists.createIndex({ "name": 1, "dateCreated": 1 }, { unique: true })
db.Checklists.insertOne(
    {
        "name": "Account Opening (Individual)",
        "requiredFields": [
            "F1",
            "F2"
        ],
        "conditions": {
            "BC": [
                "BC1",
                "BC2"
            ],
            "FO": [
                "FO1",
                "FO2",
                "FO3"
            ]
        },
        "complianceDocuments": {
            "mandatory": [
                {
                    "documentName": "CM1",
                    "agmtCode": "123",
                    "signature": true,
                    "remarks": ""
                }
            ],
            "conditional": [
                {
                    "conditions": [
                        {
                            "conditionName": "BC",
                            "conditionOption": "BC2"
                        },
                        {
                            "conditionName": "FO",
                            "conditionOption": "FO1"
                        }
                    ],
                    "documentName": "CC1",
                    "agmtCode": "111",
                    "signature": true,
                    "remarks": "TEST"
                }
            ],
            "optional": [
                {
                    "documentName": "CO1",
                    "agmtCode": "444",
                    "signature": true,
                    "remarks": "TEST"
                }
            ]
        },
        "legalDocuments": {
            "mandatory": [],
            "conditional": [
                {
                    "conditions": [
                        {
                            "conditionName": "FO",
                            "conditionOption": "FO3"
                        },
                        {
                            "conditionName": "BC",
                            "conditionOption": "BC1"
                        },
                        {
                            "conditionName": "FO",
                            "conditionOption": "FO1"
                        }
                    ],
                    "documentName": "LC1",
                    "agmtCode": "876",
                    "signature": true,
                    "canWaiver": true,
                    "remarks": "TESTING"
                }
            ],
            "optional": []
        },
        "dateCreated": "2018-08-07 08:06:56"
    })