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
db.Checklists.createIndex({ "clID": 1}, { unique: true })
db.Checklists.insertOne(
    {
        "name": "Account Opening (Individual)",
        "clID": "0",
        "version" : "1",
        "latestDocID" : "62",
        "status" : "valid",
        "requiredFields": [
            "Client Name",
            "RM Name",
            "Account Number",
            "Date of Submission"
        ],
        "conditions": {
            "Booking Centre": [
                "Singapore",
                "Hong Kong"
            ],
            "Business Centre": [
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
                    "docID" : "0",
                    "documentName" : "Account Opening Book (V6)",
                    "agmtCode" : "677",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "1",
                    "documentName" : "Letter of Authority",
                    "agmtCode" : "333",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "2",
                    "documentName" : "Risk Disclosure Statement (RDS)",
                    "agmtCode" : "302",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "3",
                    "documentName" : "Derivative Master Agreement (DMA)",
                    "agmtCode" : "585",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
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
                    "docID" : "4",
                    "documentName" : "Personal Data Privacy Ordinance (Wef Mar 2013) / Direct Marketing Opt Out",
                    "agmtCode" : "554/679",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Hong Kong"
                        }
                    ],
                    "docID" : "5",
                    "documentName" : "Waiver in relation to requirements under Securities and Futures (Contract Notes, Statements of Account and Receipts) Rules ",
                    "agmtCode" : "042",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Hong Kong"
                        }
                    ],
                    "docID" : "6",
                    "documentName" : "Notice to Customers  Acknowledgement - Deposit Covered by the Deposit Protection Scheme Form",
                    "agmtCode" : "760",
                    "signature" : false,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Hong Kong"
                        }
                    ],
                    "docID" : "7",
                    "documentName" : "Financial Intermediary Agreement",
                    "agmtCode" : "337",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "Ref: FIN INT AGT",
                    "changed": "0"
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Hong Kong"
                        }
                    ],
                    "docID" : "8",
                    "documentName" : "Capital Investment Entrant Scheme",
                    "agmtCode" : "750",
                    "signature" : false,
                    "canWaiver" : false,
                    "remarks" : "Ensure that the Financial Intermediary Agreement is in place\n\n",
                    "changed": "0"
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Singapore"
                        }
                    ],
                    "docID" : "9",
                    "documentName" : "Limited POA for Investment Purpose",
                    "agmtCode" : "598",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "For Third Party Manager's Account. In Standard Bank Format only.",
                    "changed": "0"
                }
    
            ],
            "optional": [
                {
                    "docID" : "10",
                    "documentName" : "Consent Letter for Referred Clients on Business Introducer referral fees",
                    "agmtCode" : "-",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "For referred client whose BI had signed agreement with WM HK branch or WM SG branch with HK referring activities",
                    "changed": "0"
                },
                {
                    "docID" : "11",
                    "documentName" : "Email Indemnity",
                    "agmtCode" : "029",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "12",
                    "documentName" : "Discretionary Portfolio Management Agreement",
                    "agmtCode" : "002",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "For DPM Service Only",
                    "changed": "0"
                },
                {
                    "docID" : "13",
                    "documentName" : "Letter of Instruction and Indemnity (Special Mailing Request) ",
                    "agmtCode" : "892 / 894 / 896",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "Check the provided reason for applying Special Mail service",
                    "changed": "0"
                },
                {
                    "docID" : "14",
                    "documentName" : "Letter to Open Subsequent Account",
                    "agmtCode" : "313",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "15",
                    "documentName" : "Internet Services Asia e-Banking",
                    "agmtCode" : "048",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "Incorporated in Account Opening Book",
                    "changed": "0"
                },
                {
                    "docID" : "16",
                    "documentName" : "Letter of Instructions & Indemnity (e-Document)",
                    "agmtCode" : "898",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "In Standard Bank Format only.",
                    "changed": "0"
                },
                {
                    "docID" : "17",
                    "documentName" : "Limited Power of Attorney (No Fund Transfer Out)",
                    "agmtCode" : "555",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "In Standard Bank Format only.",
                    "changed": "0"
                },
                {
                    "docID" : "18",
                    "documentName" : "Power of Attorney for Authorised Signatory",
                    "agmtCode" : "013 / 040",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "Incorporated in Account Opening Book.",
                    "changed": "0"
                },
                {
                    "docID" : "19",
                    "documentName" : "Acknowledgement for Subscription of Equity Linked Notes (\"ELN\")",
                    "agmtCode" : "689",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V1.2 (26052017)",
                    "changed": "0"
                },
                {
                    "docID" : "20",
                    "documentName" : "Acknowledgement for Subscription of Daily Accrual Callable Notes (\"DAC\")",
                    "agmtCode" : "690",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V1.2 (26052017",
                    "changed": "0"
                },
                {
                    "docID" : "21",
                    "documentName" : "Acknowledgement for Investments in Knock-Out Forward Options & Reverse Knock-Out Forward Options (collectively referred to as \"Forward Options\")",
                    "agmtCode" : "691",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V3.2b (15092017)",
                    "changed": "0"
                },
                {
                    "docID" : "22",
                    "documentName" : "Acknowledgement for Investments in Fixed Coupon Callable Notes (\"FCN\")",
                    "agmtCode" : "692",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V1.2 (26052017)",
                    "changed": "0"
                },
                {
                    "docID" : "23",
                    "documentName" : "Acknowledgement for Dual Currency Investments (\"DCI\")",
                    "agmtCode" : "693",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V2.2 (26052017)",
                    "changed": "0"
                },
                {
                    "docID" : "24",
                    "documentName" : "Acknowledgement for Investments in FX Accumulator Forwards",
                    "agmtCode" : "694",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V2.2 (26052017)",
                    "changed": "0"
                },
                {
                    "docID" : "25",
                    "documentName" : "Acknowledgement for Commodity Linked Investments (\"CLI\")",
                    "agmtCode" : "695",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V2.2 (26052017)",
                    "changed": "0"
                },
                {
                    "docID" : "26",
                    "documentName" : "Acknowledgement for Option (OTC and Listed)",
                    "agmtCode" : "696",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V1.2 (26052017)",
                    "changed": "0"
                },
                {
                    "docID" : "27",
                    "documentName" : "Acknowledgement for Contingent Convertible Bonds (\"Coco Bonds\") Transactions",
                    "agmtCode" : "747",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "28",
                    "documentName" : "Non-HK Resident Declaration Form (for open CNY Account)",
                    "agmtCode" : "629",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "29",
                    "documentName" : "Request for open CNY Account Form (for HKID Holders)",
                    "agmtCode" : "584",
                    "signature" : false,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "30",
                    "documentName" : "China Stock Connect",
                    "agmtCode" : "856",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "PRC passport holder or person holding a resident identification card or eqv governament issued identification of Mainland China is not allow.",
                    "changed": "0"
                }
    
            ]
        },
        "legalDocuments": {
            "mandatory": [
                {
                    "docID" : "31",
                    "documentName" : "Account Opening Book (V6)",
                    "agmtCode" : "677",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "32",
                    "documentName" : "Letter of Authority",
                    "agmtCode" : "333",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "33",
                    "documentName" : "Risk Disclosure Statement (RDS)",
                    "agmtCode" : "302",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "34",
                    "documentName" : "Derivative Master Agreement (DMA)",
                    "agmtCode" : "585",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
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
                    "docID" : "35",
                    "documentName" : "Personal Data Privacy Ordinance (Wef Mar 2013) / Direct Marketing Opt Out",
                    "agmtCode" : "554/679",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Hong Kong"
                        }
                    ],
                    "docID" : "36",
                    "documentName" : "Waiver in relation to requirements under Securities and Futures (Contract Notes, Statements of Account and Receipts) Rules ",
                    "agmtCode" : "042",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Hong Kong"
                        }
                    ],
                    "docID" : "37",
                    "documentName" : "Notice to Customers  Acknowledgement - Deposit Covered by the Deposit Protection Scheme Form",
                    "agmtCode" : "760",
                    "signature" : false,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Hong Kong"
                        }
                    ],
                    "docID" : "38",
                    "documentName" : "Financial Intermediary Agreement",
                    "agmtCode" : "337",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "Ref: FIN INT AGT",
                    "changed": "0"
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Hong Kong"
                        }
                    ],
                    "docID" : "39",
                    "documentName" : "Capital Investment Entrant Scheme",
                    "agmtCode" : "750",
                    "signature" : false,
                    "canWaiver" : false,
                    "remarks" : "Ensure that the Financial Intermediary Agreement is in place\n\n",
                    "changed": "0"
                },
                {
                    "conditions" : [
                        {
                            "conditionName" : "Booking Centre",
                            "conditionOption" : "Singapore"
                        }
                    ],
                    "docID" : "40",
                    "documentName" : "Limited POA for Investment Purpose",
                    "agmtCode" : "598",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "For Third Party Manager's Account. In Standard Bank Format only.",
                    "changed": "0"
                }
    
            ],
            "optional": [
                {
                    "docID" : "41",
                    "documentName" : "Consent Letter for Referred Clients on Business Introducer referral fees",
                    "agmtCode" : "-",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "For referred client whose BI had signed agreement with WM HK branch or WM SG branch with HK referring activities",
                    "changed": "0"
                },
                {
                    "docID" : "42",
                    "documentName" : "Email Indemnity",
                    "agmtCode" : "029",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "43",
                    "documentName" : "Discretionary Portfolio Management Agreement",
                    "agmtCode" : "002",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "For DPM Service Only",
                    "changed": "0"
                },
                {
                    "docID" : "44",
                    "documentName" : "Letter of Instruction and Indemnity (Special Mailing Request) ",
                    "agmtCode" : "892 / 894 / 896",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "Check the provided reason for applying Special Mail service",
                    "changed": "0"
                },
                {
                    "docID" : "45",
                    "documentName" : "Letter to Open Subsequent Account",
                    "agmtCode" : "313",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "46",
                    "documentName" : "Internet Services Asia e-Banking",
                    "agmtCode" : "048",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "Incorporated in Account Opening Book",
                    "changed": "0"
                },
                {
                    "docID" : "47",
                    "documentName" : "Letter of Instructions & Indemnity (e-Document)",
                    "agmtCode" : "898",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "In Standard Bank Format only.",
                    "changed": "0"
                },
                {
                    "docID" : "48",
                    "documentName" : "Limited Power of Attorney (No Fund Transfer Out)",
                    "agmtCode" : "555",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "In Standard Bank Format only.",
                    "changed": "0"
                },
                {
                    "docID" : "49",
                    "documentName" : "Power of Attorney for Authorised Signatory",
                    "agmtCode" : "013 / 040",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "Incorporated in Account Opening Book.",
                    "changed": "0"
                },
                {
                    "docID" : "50",
                    "documentName" : "Acknowledgement for Subscription of Equity Linked Notes (\"ELN\")",
                    "agmtCode" : "689",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V1.2 (26052017)",
                    "changed": "0"
                },
                {
                    "docID" : "51",
                    "documentName" : "Acknowledgement for Subscription of Daily Accrual Callable Notes (\"DAC\")",
                    "agmtCode" : "690",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V1.2 (26052017)",
                    "changed": "0"
                },
                {
                    "docID" : "52",
                    "documentName" : "Acknowledgement for Investments in Knock-Out Forward Options & Reverse Knock-Out Forward Options (collectively referred to as \"Forward Options\")",
                    "agmtCode" : "691",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V3.2b (15092017)",
                    "changed": "0"
                },
                {
                    "docID" : "53",
                    "documentName" : "Acknowledgement for Investments in Fixed Coupon Callable Notes (\"FCN\")",
                    "agmtCode" : "692",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V1.2 (26052017)",
                    "changed": "0"
                },
                {
                    "docID" : "54",
                    "documentName" : "Acknowledgement for Dual Currency Investments (\"DCI\")",
                    "agmtCode" : "693",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V2.2 (26052017)",
                    "changed": "0"
                },
                {
                    "docID" : "55",
                    "documentName" : "Acknowledgement for Investments in FX Accumulator Forwards",
                    "agmtCode" : "694",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V2.2 (26052017)",
                    "changed": "0"
                },
                {
                    "docID" : "56",
                    "documentName" : "Acknowledgement for Commodity Linked Investments (\"CLI\")",
                    "agmtCode" : "695",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V2.2 (26052017)",
                    "changed": "0"
                },
                {
                    "docID" : "57",
                    "documentName" : "Acknowledgement for Option (OTC and Listed)",
                    "agmtCode" : "696",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "V1.2 (26052017)",
                    "changed": "0"
                },
                {
                    "docID" : "58",
                    "documentName" : "Acknowledgement for Contingent Convertible Bonds (\"Coco Bonds\") Transactions",
                    "agmtCode" : "747",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "59",
                    "documentName" : "Non-HK Resident Declaration Form (for open CNY Account)",
                    "agmtCode" : "629",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "60",
                    "documentName" : "Request for open CNY Account Form (for HKID Holders)",
                    "agmtCode" : "584",
                    "signature" : false,
                    "canWaiver" : false,
                    "remarks" : "",
                    "changed": "0"
                },
                {
                    "docID" : "61",
                    "documentName" : "China Stock Connect",
                    "agmtCode" : "856",
                    "signature" : true,
                    "canWaiver" : false,
                    "remarks" : "PRC passport holder or person holding a resident identification card or eqv governament issued identification of Mainland China is not allow.",
                    "changed": "0"
                }
    
            ]
        },
        "dateCreated": "2018-08-07 08:06:56",
        "updatedBy": "Randy Lai YongHao"
    })
    
// set up checklistLigs table
db.ChecklistLogs.createIndex({ "clID": 1, "version": 1 }, { unique: true })

// set up checklist IDs
db.ChecklistCounter.insertOne ( {"_id": "clID" , "sequence_value" : 1 } )

// set up tokens table
db.Tokens.createIndex({ "username": 1, "token": 1 }, { unique: true })

// set up onboard IDs
db.OnboardCounter.insertOne({"_id":"obID", "sequence_value" : 1 })

// set up onboard table
db.Onboards.createIndex({"clientName":1,"RMName":1,"dateCreated":1},{unique: true})

// set up onboard checker urgent checker
db.OnboardUrgentChecker.createIndex({"obID":1,"Urgent":1},{unique: true})

//set up notification IDs
db.NotificationCounter.insertOne({"_id":"noID", "sequence_value" : 1 })

//set up notification table
db.Notifications.createIndex({"noID":1, "clID":1, "version":1,"docID":1})