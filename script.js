// reset database
use SpringBoard
db.dropDatabase()

// set up users table
db.Users.createIndex({ "username": 1 }, { unique: true })
db.Users.insertMany([
    { "username": "admin", "password": "$argon2i$v=19$m=512,t=2,p=2$0OvvCnGQIgmrBhzF1DzRJg$AndnHTRF7unXj/g4NYFhzA", "userType": "ADMIN", "name": "Admin Tan WeiMing", "email": "admin@email.com" },
    { "username": "RandyLai", "password": "$argon2i$v=19$m=512,t=2,p=2$xaPF+Umz4EJsi8KcfYcpFg$EYR0xPAIbJTLhmLU2IQC9A", "userType": "CM", "name": "Randy Lai YongHao", "email": "randy@email.com" },
    { "username": "LimPeiXuan", "password": "$argon2i$v=19$m=512,t=2,p=2$dIR+gSEKdzNyfc4O6ywpSw$oeuv/geCe3jGIQ7A7U/dsA", "userType": "RM", "name" : "Lim Pei Xuan", "email": "peixuan@email.com" }
])

// set up checklists table
db.Checklists.createIndex({ "name": 1, "dateCreated": 1 }, { unique: true })
db.Checklists.insertOne(
    {
        "name": "Account Opening (Individual)",
        "requiredFields": [
            "Client Name",
            "RM Name"
        ],
        "conditions": {
            "Booking Centre": [
                "Singapore",
                "Hong Kong"
            ],
            "Place of Residence": [
                "Singapore",
                "Hong Kong",
                "Australia",
                "Others"
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
            "mandatory": [
                {
                    "documentName" : "Account Opening Book (V6)",
                    "agmtCode" : "677",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : ""
                },
                {
                    "documentName" : "Letter of Authority",
                    "agmtCode" : "333",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : ""
                },
                {
                    "documentName" : "Risk Disclosure Statement (RDS)",
                    "agmtCode" : "302",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : ""
                },
                {
                    "documentName" : "Derivative Master Agreement (DMA)",
                    "agmtCode" : "585",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : ""
                }
    
            ],
            "conditional": [
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Hong Kong"
                        }
                    ],
                    "documentName" : "Personal Data Privacy Ordinance (Wef Mar 2013) / Direct Marketing Opt Out",
                    "agmtCode" : "554/679",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : ""
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Hong Kong"
                        }
                    ],
                    "documentName" : "Waiver in relation to requirements under Securities and Futures (Contract Notes, Statements of Account and Receipts) Rules ",
                    "agmtCode" : "042",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : ""
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Hong Kong"
                        }
                    ],
                    "documentName" : "Notice to Customers  Acknowledgement - Deposit Covered by the Deposit Protection Scheme Form",
                    "agmtCode" : "760",
                    "signature" : false,
                    "canWaiver" : false,
                    "remarks" : ""
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Hong Kong"
                        }
                    ],
                    "documentName" : "Financial Intermediary Agreement",
                    "agmtCode" : "337",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "Ref: FIN INT AGT"
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Hong Kong"
                        }
                    ],
                    "documentName" : "Capital Investment Entrant Scheme",
                    "agmtCode" : "750",
                    "signature" : false,
                    "canWaiver" : false,
                    "remarks" : "Ensure that the Financial Intermediary Agreement is in place\n\n"
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Singapore"
                        }
                    ],
                    "documentName" : "Limited POA for Investment Purpose",
                    "agmtCode" : "598",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "For Third Party Manager's Account. In Standard Bank Format only."
                }
    
            ],
            "optional": [
                {
                    "documentName" : "Consent Letter for Referred Clients on Business Introducer referral fees",
                    "agmtCode" : "-",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "For referred client whose BI had signed agreement with WM HK branch or WM SG branch with HK referring activities"
                },
                {
                    "documentName" : "Email Indemnity",
                    "agmtCode" : "029",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : ""
                },
                {
                    "documentName" : "Discretionary Portfolio Management Agreement",
                    "agmtCode" : "002",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "For DPM Service Only"
                },
                {
                    "documentName" : "Letter of Instruction and Indemnity (Special Mailing Request) ",
                    "agmtCode" : "892 / 894 / 896",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "Check the provided reason for applying Special Mail service"
                },
                {
                    "documentName" : "Letter to Open Subsequent Account",
                    "agmtCode" : "313",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : ""
                },
                {
                    "documentName" : "Internet Services Asia e-Banking",
                    "agmtCode" : "048",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "Incorporated in Account Opening Book"
                },
                {
                    "documentName" : "Letter of Instructions & Indemnity (e-Document)",
                    "agmtCode" : "898",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "In Standard Bank Format only."
                },
                {
                    "documentName" : "Limited Power of Attorney (No Fund Transfer Out)",
                    "agmtCode" : "555",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "In Standard Bank Format only."
                },
                {
                    "documentName" : "Power of Attorney for Authorised Signatory",
                    "agmtCode" : "013 / 040",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "Incorporated in Account Opening Book."
                },
                {
                    "documentName" : "Acknowledgement for Subscription of Equity Linked Notes (\"ELN\")",
                    "agmtCode" : "689",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V1.2 (26052017)"
                },
                {
                    "documentName" : "Acknowledgement for Subscription of Daily Accrual Callable Notes (\"DAC\")",
                    "agmtCode" : "690",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V1.2 (26052017"
                },
                {
                    "documentName" : "Acknowledgement for Investments in Knock-Out Forward Options & Reverse Knock-Out Forward Options (collectively referred to as \"Forward Options\")",
                    "agmtCode" : "691",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V3.2b (15092017)"
                },
                {
                    "documentName" : "Acknowledgement for Investments in Fixed Coupon Callable Notes (\"FCN\")",
                    "agmtCode" : "692",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V1.2 (26052017)"
                },
                {
                    "documentName" : "Acknowledgement for Dual Currency Investments (\"DCI\")",
                    "agmtCode" : "693",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V2.2 (26052017)"
                },
                {
                    "documentName" : "Acknowledgement for Investments in FX Accumulator Forwards",
                    "agmtCode" : "694",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V2.2 (26052017)"
                },
                {
                    "documentName" : "Acknowledgement for Commodity Linked Investments (\"CLI\")",
                    "agmtCode" : "695",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V2.2 (26052017)"
                },
                {
                    "documentName" : "Acknowledgement for Option (OTC and Listed)",
                    "agmtCode" : "696",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V1.2 (26052017)"
                },
                {
                    "documentName" : "Acknowledgement for Contingent Convertible Bonds (\"Coco Bonds\") Transactions",
                    "agmtCode" : "747",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : ""
                },
                {
                    "documentName" : "Non-HK Resident Declaration Form (for open CNY Account)",
                    "agmtCode" : "629",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : ""
                },
                {
                    "documentName" : "Request for open CNY Account Form (for HKID Holders)",
                    "agmtCode" : "584",
                    "signature" : false,
                    "canWaiver" : false,
                    "remarks" : ""
                },
                {
                    "documentName" : "China Stock Connect",
                    "agmtCode" : "856",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "PRC passport holder or person holding a resident identification card or eqv governament issued identification of Mainland China is not allow."
                }
    
            ]
        },
        "dateCreated": "2018-08-07 08:06:56",
        "updatedBy": "Randy Lai YongHao"
    })