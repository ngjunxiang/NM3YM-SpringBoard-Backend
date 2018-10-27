// reset database
use SpringBoard
db.dropDatabase()

// set up users table
db.Users.createIndex({ "username": 1 }, { unique: true })
db.Users.insertMany([
    { "username": "admin", "password": "$argon2i$v=19$m=512,t=2,p=2$DnsATHr7veqT+VB1hl6x8g$B9u6dgxpfnMnPT41sMgKNQ", "userType": "ADMIN", "name": "Admin Tan WeiMing", "email": "admin@email.com" },
    { "username": "RandyLai", "password": "$argon2i$v=19$m=512,t=2,p=2$8ph7QVLriA54gSK5vXochg$kXZc0gzl4EKtteyqeDe2Fg", "userType": "CM", "name": "Randy Lai YongHao", "email": "randy@email.com" },
    { "username": "LimPeiXuan", "password": "$argon2i$v=19$m=512,t=2,p=2$7NeenOtq2fEc12u1mjlUPw$IWHWu4LZFHtlXNTLlwkBGw", "userType": "RM", "name": "Lim Pei Xuan", "email": "peixuan@email.com" },
    { "username": "NgJunXiang", "password": "$argon2i$v=19$m=512,t=2,p=2$r2ZuDjspB02UKmaxCB1Dbg$A3vIULuZQ8LX+KwMOk+i3Q", "userType": "MA", "name": "Ng Jun Xiang", "email": "junxiang@email.com" }
])

// set up checklists table
db.Checklists.createIndex({ "clID": 1 }, { unique: true })
db.Checklists.insertOne({
        "_id" : ObjectId("5bbc19d7073526264465e184"),
        "name" : "Account Opening (Individual)",
        "requiredFields" : [
                "Client Name",
                "RM Name",
                "Account Number",
                "Date of Submission"
        ],
        "conditions" : {
                "Booking Centre" : [
                        "Singapore",
                        "Hong Kong"
                ],
                "Business Centre" : [
                        "Singapore",
                        "Hong Kong"
                ],
                "Place of Residence" : [
                        "Singapore",
                        "Hong Kong",
                        "Australia",
                        "China",
                        "Taiwan",
                        "United Kingdom",
                        "Philippines",
                        "Thailand"
                ],
                "Insider of Listed Company" : [
                        "Yes",
                        "No"
                ],
                "SG booking Personal Investor" : [
                        "Yes",
                        "No"
                ],
                "Employees of HKMA/SFC " : [
                        "Yes",
                        "No"
                ],
                "Walk-In Client" : [
                        "Yes",
                        "No"
                ]
        },
        "complianceDocuments" : {
                "mandatory" : [
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "ICE KYC Profile and Client Acceptance Form (including modifications since last CAC)",
                                "agmtCode" : "301",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "docID" : "0",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "FATCA Account Opening / Review Checklist (effective date : 1 July 2014)",
                                "agmtCode" : "285",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons and FATCA.&nbsp;<div><br></div><div>Please specify name of person(s) with US Indicia:<br></div>",
                                "docID" : "1",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "AEOI Individual Checklist (effective date : 1 Jan 2017)",
                                "agmtCode" : "189",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "docID" : "2",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Call Report",
                                "agmtCode" : "N.A.",
                                "signature" : false,
                                "remarks" : "<div>- Validated according to Bank's Standard</div><div>- Other than new account under existing relationship where face-to-face meeting has been conducted before and EAM account, the call report should demonstrate face-to-face meeting with account holders.</div><div>- Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div><div><br></div><div><br></div><div><div>□ Check that Call Report submitted was validated.</div><div>□ Check the Call Report that client was contacted within the past 1 year.</div><div>□ Check the Call Report indicate country and location for physical meeting.</div><div>□ Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div></div>",
                                "docID" : "3",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Clear unexpired Passport / ID copies or identification papers bearing clear photograph of accountholders",
                                "agmtCode" : "011",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "docID" : "62",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Proof(s) of Residential Address for all account holders and authorised signatories / LPOA",
                                "agmtCode" : "558",
                                "signature" : false,
                                "remarks" : "<div>- Bank staff to write \"original sighted\", staff's name, date and sign on the copy of the residential address proof, OR photocopy to be certified by suitable certifier*.</div><div>- Evidence should be issued within the last 3 months.&nbsp;</div><div>- Address proof and ID doc have to be 2 separate document.</div><div><br>□ Translation is required for non English document.<br></div>",
                                "docID" : "63",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "FATCA/AEOI self certification (effective date : 1 Jan 2017)",
                                "agmtCode" : "127 / 245",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons, FATCA and AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "docID" : "64",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "W9 - US Person declared with the IRS and Annex 2 , 3 or 4 (Whichever is appropriate). ",
                                "agmtCode" : "212",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "65",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "W8 - BEN  Foreign Person for US Fisc (For Treaty claim required or to cure US Indicia )",
                                "agmtCode" : "202 / 208",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "66",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Declaration of Tax Conformity (DTC)",
                                "agmtCode" : "887",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "67",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Tax Compliance Indicator Questionnaire  - Applicable for all client(s)",
                                "agmtCode" : "659",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "68",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Tax Indicator Checklist  (for French resident client)",
                                "agmtCode" : "--",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "69",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "MSC Self-Declaration or MSCQ",
                                "agmtCode" : "282 / 283",
                                "signature" : false,
                                "remarks" : "Ensure that all fields have been filled.",
                                "docID" : "70",
                                "changed" : "1"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "MLRA Simulation Form",
                                "agmtCode" : "---",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "71",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Evidence of Source of Wealth",
                                "agmtCode" : "870",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "72",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Investment Profile Questionnaire",
                                "agmtCode" : "964",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "73",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Internet search ",
                                "agmtCode" : "----",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "74",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "VIGILANCE printouts for persons new to the Bank",
                                "agmtCode" : "- ",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "75",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Insider of Listed Company",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "documentName" : "Insider Representation Form",
                                "agmtCode" : "561",
                                "signature" : false,
                                "remarks" : "- applicable for client who is an insider of a listed company (ref. Procedures for Clients Connected to Listed Companies)",
                                "docID" : "76",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "Australia"
                                        }
                                ],
                                "documentName" : "Australian CPA’s certification",
                                "agmtCode" : "035",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "77",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "Taiwan"
                                        }
                                ],
                                "documentName" : "Client Request Evidence Form",
                                "agmtCode" : "855",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "78",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "United Kingdom"
                                        }
                                ],
                                "documentName" : "UK Declaration for Self Certified Sophisticated Investors ",
                                "agmtCode" : "645",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "79",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "United Kingdom"
                                        }
                                ],
                                "documentName" : "UK Declaration for HNW individuals \t\t\t\t\t\t",
                                "agmtCode" : "646",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "80",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "United Kingdom"
                                        }
                                ],
                                "documentName" : "UK Overseas Oral Comm. Letter\t\t\t\t\t\t",
                                "agmtCode" : "647",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "81",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "Philippines"
                                        }
                                ],
                                "documentName" : "Philippines Reverse Solicitation Letter\t\t\t\t\t\t",
                                "agmtCode" : "648",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "82",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "China"
                                        }
                                ],
                                "documentName" : "China Reverse Solicitation Letter",
                                "agmtCode" : "619",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "83",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "SG booking Personal Investor",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "documentName" : "Accredited Investor ",
                                "agmtCode" : "-   ",
                                "signature" : true,
                                "remarks" : "Requires Signature by FO.",
                                "docID" : "84",
                                "changed" : "1"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Employees of HKMA/SFC ",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "documentName" : "Employer's consent letter ",
                                "agmtCode" : "568",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "85",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Walk-In Client",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "documentName" : "Bank Reference Letter ",
                                "agmtCode" : "-    ",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "86",
                                "changed" : "0"
                        }
                ],
                "optional" : [
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Not Applicable",
                                "documentName" : "Vulnerable Customer Assessment Form",
                                "agmtCode" : "983 / 984",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "87",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Not Applicable",
                                "documentName" : "Other documents as required by the Bank",
                                "agmtCode" : "-------",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "88",
                                "changed" : "0"
                        }
                ]
        },
        "legalDocuments" : {
                "mandatory" : [
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Account Opening Book (V6)",
                                "agmtCode" : "677",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "31",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Letter of Authority",
                                "agmtCode" : "333",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "32",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Risk Disclosure Statement (RDS)",
                                "agmtCode" : "302",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "33",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Derivative Master Agreement (DMA)",
                                "agmtCode" : "585",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "34",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
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
                                "remarks" : "",
                                "docID" : "35",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
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
                                "remarks" : "",
                                "docID" : "36",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
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
                                "remarks" : "",
                                "docID" : "37",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
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
                                "remarks" : "Ref: FIN INT AGT",
                                "docID" : "38",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
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
                                "remarks" : "Ensure that the Financial Intermediary Agreement is in place\n\n",
                                "docID" : "39",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
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
                                "remarks" : "For Third Party Manager's Account. In Standard Bank Format only.",
                                "docID" : "40",
                                "changed" : "0"
                        }
                ],
                "optional" : [
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Consent Letter for Referred Clients on Business Introducer referral fees",
                                "agmtCode" : "-",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "For referred client whose BI had signed agreement with WM HK branch or WM SG branch with HK referring activities",
                                "docID" : "41",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Email Indemnity",
                                "agmtCode" : "029",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "42",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Discretionary Portfolio Management Agreement",
                                "agmtCode" : "002",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "For DPM Service Only",
                                "docID" : "43",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Letter of Instruction and Indemnity (Special Mailing Request) ",
                                "agmtCode" : "892 / 894 / 896",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "Check the provided reason for applying Special Mail service",
                                "docID" : "44",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Letter to Open Subsequent Account",
                                "agmtCode" : "313",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "45",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Internet Services Asia e-Banking",
                                "agmtCode" : "048",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "Incorporated in Account Opening Book",
                                "docID" : "46",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Letter of Instructions & Indemnity (e-Document)",
                                "agmtCode" : "898",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "In Standard Bank Format only.",
                                "docID" : "47",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Limited Power of Attorney (No Fund Transfer Out)",
                                "agmtCode" : "555",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "In Standard Bank Format only.",
                                "docID" : "48",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Power of Attorney for Authorised Signatory",
                                "agmtCode" : "013 / 040",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "Incorporated in Account Opening Book.",
                                "docID" : "49",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Subscription of Equity Linked Notes (\"ELN\")",
                                "agmtCode" : "689",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "50",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Subscription of Daily Accrual Callable Notes (\"DAC\")",
                                "agmtCode" : "690",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "51",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgmentc for Investments in Knock-Out Forward Options & Reverse Knock-Out Forward Options (collectively referred to as \"Forward Options\")",
                                "agmtCode" : "691",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V3.2b (15092017)",
                                "docID" : "52",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Investments in Fixed Coupon Callable Notes (\"FCN\")",
                                "agmtCode" : "692",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "53",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Dual Currency Investments (\"DCI\")",
                                "agmtCode" : "693",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V2.2 (26052017)",
                                "docID" : "54",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Investments in FX Accumulator Forwards",
                                "agmtCode" : "694",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V2.2 (26052017)",
                                "docID" : "55",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Commodity Linked Investments (\"CLI\")",
                                "agmtCode" : "695",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V2.2 (26052017)",
                                "docID" : "56",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Option (OTC and Listed)",
                                "agmtCode" : "696",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "57",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Contingent Convertible Bonds (\"Coco Bonds\") Transactions",
                                "agmtCode" : "747",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "58",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Non-HK Resident Declaration Form (for open CNY Account)",
                                "agmtCode" : "629",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "59",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Request for open CNY Account Form (for HKID Holders)",
                                "agmtCode" : "584",
                                "signature" : false,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "60",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "China Stock Connect",
                                "agmtCode" : "856",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "PRC passport holder or person holding a resident identification card or eqv governament issued identification of Mainland China is not allow.",
                                "docID" : "61",
                                "changed" : "0"
                        }
                ]
        },
        "latestDocID" : "89",
        "clID" : "0",
        "version" : "2",
        "dateCreated" : "2018-09-17",
        "dateUpdated" : "2018-10-09",
        "createdBy" : "Randy Lai YongHao",
        "updatedBy" : "Randy Lai YongHao"
})

// set up checklistLogs table
db.ChecklistLogs.createIndex({ "clID": 1, "version": 1 }, { unique: true })
db.ChecklistLogs.insertOne(
	{
        "_id" : ObjectId("5bbc19d6073526264465e181"),
        "name" : "Account Opening (Individual)",
        "requiredFields" : [
                "Client Name",
                "RM Name",
                "Account Number",
                "Date of Submission"
        ],
        "conditions" : {
                "Booking Centre" : [
                        "Singapore",
                        "Hong Kong"
                ],
                "Business Centre" : [
                        "Singapore",
                        "Hong Kong"
                ],
                "Place of Residence" : [
                        "Singapore",
                        "Hong Kong",
                        "Australia",
                        "China",
                        "Taiwan",
                        "United Kingdom",
                        "Philippines",
                        "Thailand"
                ],
                "Insider of Listed Company" : [
                        "Yes",
                        "No"
                ],
                "SG booking Personal Investor" : [
                        "Yes",
                        "No"
                ],
                "Employees of HKMA/SFC " : [
                        "Yes",
                        "No"
                ],
                "Walk-In Client" : [
                        "Yes",
                        "No"
                ]
        },
        "complianceDocuments" : {
                "mandatory" : [
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "ICE KYC Profile and Client Acceptance Form (including modifications since last CAC)",
                                "agmtCode" : "301",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "docID" : "0",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "FATCA Account Opening / Review Checklist (effective date : 1 July 2014)",
                                "agmtCode" : "285",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons and FATCA.&nbsp;<div><br></div><div>Please specify name of person(s) with US Indicia:<br></div>",
                                "docID" : "1",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "AEOI Individual Checklist (effective date : 1 Jan 2017)",
                                "agmtCode" : "189",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "docID" : "2",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Call Report",
                                "agmtCode" : "N.A.",
                                "signature" : false,
                                "remarks" : "<div>- Validated according to Bank's Standard</div><div>- Other than new account under existing relationship where face-to-face meeting has been conducted before and EAM account, the call report should demonstrate face-to-face meeting with account holders.</div><div>- Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div><div><br></div><div><br></div><div><div>□ Check that Call Report submitted was validated.</div><div>□ Check the Call Report that client was contacted within the past 1 year.</div><div>□ Check the Call Report indicate country and location for physical meeting.</div><div>□ Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div></div>",
                                "docID" : "3",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Clear unexpired Passport / ID copies or identification papers bearing clear photograph of accountholders",
                                "agmtCode" : "011",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "docID" : "62",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Proof(s) of Residential Address for all account holders and authorised signatories / LPOA",
                                "agmtCode" : "558",
                                "signature" : false,
                                "remarks" : "<div>- Bank staff to write \"original sighted\", staff's name, date and sign on the copy of the residential address proof, OR photocopy to be certified by suitable certifier*.</div><div>- Evidence should be issued within the last 3 months.&nbsp;</div><div>- Address proof and ID doc have to be 2 separate document.</div><div><br>□ Translation is required for non English document.<br></div>",
                                "docID" : "63",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "FATCA/AEOI self certification (effective date : 1 Jan 2017)",
                                "agmtCode" : "127 / 245",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons, FATCA and AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "docID" : "64",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "W9 - US Person declared with the IRS and Annex 2 , 3 or 4 (Whichever is appropriate). ",
                                "agmtCode" : "212",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "65",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "W8 - BEN  Foreign Person for US Fisc (For Treaty claim required or to cure US Indicia )",
                                "agmtCode" : "202 / 208",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "66",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Declaration of Tax Conformity (DTC)",
                                "agmtCode" : "887",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "67",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Tax Compliance Indicator Questionnaire  - Applicable for all client(s)",
                                "agmtCode" : "659",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "68",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Tax Indicator Checklist  (for French resident client)",
                                "agmtCode" : "--",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "69",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "MSC Self-Declaration or MSCQ",
                                "agmtCode" : "282 / 283",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "70",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "MLRA Simulation Form",
                                "agmtCode" : "---",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "71",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Evidence of Source of Wealth",
                                "agmtCode" : "870",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "72",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Investment Profile Questionnaire",
                                "agmtCode" : "964",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "73",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "Internet search ",
                                "agmtCode" : "----",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "74",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "conditions": [],
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "documentName" : "VIGILANCE printouts for persons new to the Bank",
                                "agmtCode" : "- ",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "75",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Insider of Listed Company",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "documentName" : "Insider Representation Form",
                                "agmtCode" : "561",
                                "signature" : false,
                                "remarks" : "- applicable for client who is an insider of a listed company (ref. Procedures for Clients Connected to Listed Companies)",
                                "docID" : "76",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "Australia"
                                        }
                                ],
                                "documentName" : "Australian CPA’s certification",
                                "agmtCode" : "035",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "77",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "Taiwan"
                                        }
                                ],
                                "documentName" : "Client Request Evidence Form",
                                "agmtCode" : "855",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "78",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "United Kingdom"
                                        }
                                ],
                                "documentName" : "UK Declaration for Self Certified Sophisticated Investors ",
                                "agmtCode" : "645",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "79",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "United Kingdom"
                                        }
                                ],
                                "documentName" : "UK Declaration for HNW individuals \t\t\t\t\t\t",
                                "agmtCode" : "646",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "80",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "United Kingdom"
                                        }
                                ],
                                "documentName" : "UK Overseas Oral Comm. Letter\t\t\t\t\t\t",
                                "agmtCode" : "647",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "81",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "Philippines"
                                        }
                                ],
                                "documentName" : "Philippines Reverse Solicitation Letter\t\t\t\t\t\t",
                                "agmtCode" : "648",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "82",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "China"
                                        }
                                ],
                                "documentName" : "China Reverse Solicitation Letter",
                                "agmtCode" : "619",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "83",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "SG booking Personal Investor",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "documentName" : "Accredited Investor ",
                                "agmtCode" : "-   ",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "84",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Employees of HKMA/SFC ",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "documentName" : "Employer's consent letter ",
                                "agmtCode" : "568",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "85",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Not Applicable",
                                "conditions" : [
                                        {
                                                "conditionName" : "Walk-In Client",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "documentName" : "Bank Reference Letter ",
                                "agmtCode" : "-    ",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "86",
                                "changed" : "0"
                        }
                ],
                "optional" : [
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Vulnerable Customer Assessment Form",
                                "agmtCode" : "983 / 984",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "87",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Other documents as required by the Bank",
                                "agmtCode" : "-------",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "88",
                                "changed" : "0"
                        }
                ]
        },
        "legalDocuments" : {
                "mandatory" : [
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Account Opening Book (V6)",
                                "agmtCode" : "677",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "31",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Letter of Authority",
                                "agmtCode" : "333",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "32",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Risk Disclosure Statement (RDS)",
                                "agmtCode" : "302",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "33",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Derivative Master Agreement (DMA)",
                                "agmtCode" : "585",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "34",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
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
                                "remarks" : "",
                                "docID" : "35",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
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
                                "remarks" : "",
                                "docID" : "36",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
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
                                "remarks" : "",
                                "docID" : "37",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
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
                                "remarks" : "Ref: FIN INT AGT",
                                "docID" : "38",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
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
                                "remarks" : "Ensure that the Financial Intermediary Agreement is in place\n\n",
                                "docID" : "39",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": true,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
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
                                "remarks" : "For Third Party Manager's Account. In Standard Bank Format only.",
                                "docID" : "40",
                                "changed" : "0"
                        }
                ],
                "optional" : [
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Consent Letter for Referred Clients on Business Introducer referral fees",
                                "agmtCode" : "-",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "For referred client whose BI had signed agreement with WM HK branch or WM SG branch with HK referring activities",
                                "docID" : "41",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Email Indemnity",
                                "agmtCode" : "029",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "42",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Discretionary Portfolio Management Agreement",
                                "agmtCode" : "002",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "For DPM Service Only",
                                "docID" : "43",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Letter of Instruction and Indemnity (Special Mailing Request) ",
                                "agmtCode" : "892 / 894 / 896",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "Check the provided reason for applying Special Mail service",
                                "docID" : "44",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Letter to Open Subsequent Account",
                                "agmtCode" : "313",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "45",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Internet Services Asia e-Banking",
                                "agmtCode" : "048",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "Incorporated in Account Opening Book",
                                "docID" : "46",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Letter of Instructions & Indemnity (e-Document)",
                                "agmtCode" : "898",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "In Standard Bank Format only.",
                                "docID" : "47",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Limited Power of Attorney (No Fund Transfer Out)",
                                "agmtCode" : "555",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "In Standard Bank Format only.",
                                "docID" : "48",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Power of Attorney for Authorised Signatory",
                                "agmtCode" : "013 / 040",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "Incorporated in Account Opening Book.",
                                "docID" : "49",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Subscription of Equity Linked Notes (\"ELN\")",
                                "agmtCode" : "689",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "50",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Subscription of Daily Accrual Callable Notes (\"DAC\")",
                                "agmtCode" : "690",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "51",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgmentc for Investments in Knock-Out Forward Options & Reverse Knock-Out Forward Options (collectively referred to as \"Forward Options\")",
                                "agmtCode" : "691",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V3.2b (15092017)",
                                "docID" : "52",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Investments in Fixed Coupon Callable Notes (\"FCN\")",
                                "agmtCode" : "692",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "53",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Dual Currency Investments (\"DCI\")",
                                "agmtCode" : "693",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V2.2 (26052017)",
                                "docID" : "54",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Investments in FX Accumulator Forwards",
                                "agmtCode" : "694",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V2.2 (26052017)",
                                "docID" : "55",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Commodity Linked Investments (\"CLI\")",
                                "agmtCode" : "695",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V2.2 (26052017)",
                                "docID" : "56",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Option (OTC and Listed)",
                                "agmtCode" : "696",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "57",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Acknowledgement for Contingent Convertible Bonds (\"Coco Bonds\") Transactions",
                                "agmtCode" : "747",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "58",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Non-HK Resident Declaration Form (for open CNY Account)",
                                "agmtCode" : "629",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "59",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "Request for open CNY Account Form (for HKID Holders)",
                                "agmtCode" : "584",
                                "signature" : false,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "60",
                                "changed" : "0"
                        },
                        {
                                "hasConditions": false,
                                "documentType": "Non-Deferrable Mandatory (NDM)",
                                "conditions": [],
                                "documentName" : "China Stock Connect",
                                "agmtCode" : "856",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "PRC passport holder or person holding a resident identification card or eqv governament issued identification of Mainland China is not allow.",
                                "docID" : "61",
                                "changed" : "0"
                        }
                ]
        },
        "latestDocID" : "89",
        "clID" : "0",
        "version" : "1",
        "status" : "valid",
        "dateCreated" : "2018-09-17",
        "dateUpdated" : "2018-09-17",
        "createdBy" : "Randy Lai YongHao",
        "updatedBy" : "Randy Lai YongHao"
}
)

// set up checklist IDs
db.ChecklistCounter.insertOne({ "_id": "clID", "sequence_value": 1 })

// set up tokens table
db.Tokens.createIndex({ "username": 1, "token": 1 }, { unique: true })

// set up onboard IDs
db.OnboardCounter.insertOne({ "_id": "obID", "sequence_value": 0 })

// set up onboard table
db.Onboards.createIndex({ "clientName": 1, "RMName": 1, "dateCreated": 1 }, { unique: true })

// set up onboard checker urgent checker
db.OnboardUrgentChecker.createIndex({ "obID": 1, "Urgent": 1 }, { unique: true })

//set up notification IDs
db.NotificationCounter.insertOne({ "_id": "noID", "sequence_value": 0 })

//set up notification table
db.Notifications.createIndex({ "noID": 1, "clID": 1, "version": 1, "docID": 1 })

// set up agmt code table
db.AgmtCodes.createIndex({ "code": 1 }, { unique: true })

// set up knowledgeBase table
db.KnowledgeBase.insertMany([
    {
        "qnID" : 1,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "What are the documents required for opening of Sub-Account?",
        "answer": "(1) Refer to COB website (under FORMS): (a) obtain the relevant Sub-Account Opening Form (Individual / Corporate), & (b) Open New Account in the same name as existing (For same booking centre) (2) Refer to COB website (under LEGAL & COMPLIANCE CHECKLISTS): (a) Regional Sub-Account Opening Checklist",
        "intent": "AccountOpeningIndDocuments",
        "entities": {
            "Account": ["Sub-Account"],
            "Document": ["Document"],
            "Action": ["Open"]
        }
    },
    {   
        "qnID" : 2,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "If an additional LPOA is added to an account, does the existing LPOA need to sign on the LPOA letter?",
        "answer": "Yes, if the existing LPOA is still valid. If you refer to the LPOA letter, the new letter will supersede and replace all authorisation letters previously issued by the client.",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
            "Entity": ["LPOA"],
            "Document": ["LPOA letter"],
            "Account": ["Account"]
        }
    },
    {
        "qnID" : 3,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "If the new role of account A is in our existing account B, can we refer to his address proof from account B?",
        "answer": "Yes, if his address proof in account B is valid within 3 months and is also acceptable under current guidelines. If not, the address proof needs to be refreshed.",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
            "Document": ["Address Proof"],
            "Account": ["Account","Existing Account"]
        }
    },
    {
        "qnID" : 4,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "What is the list of acceptable address proofs?",
        "answer": "Refer to REG 51 page A9 - A10",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
          "Document": ["Address Proof"]
        }
    },
    {
        "qnID" : 5,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "How many signers are needed for an account?",
        "answer": "Refer to DMS, Pearl or ICE",
        "intent": "AccountOpeningInfo",
        "entities": {
            "Entity": ["Signers"],
            "Account": ["Account"]
        }
    },
    {
        "qnID" : 6,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "What documents are required to add authorized signers?",
        "answer": "Updated board resolution / change of mandate, Passport copy and address proof of the new authorised signer/s",
        "intent": "AccountOpeningIndDocuments",
        "entities": {
            "Document": ["Document"],
            "Entity": ["Authorized Signers"]
        }
    },
    {
        "qnID" : 7,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "What are the NDM/NCF documents?",
        "answer": "Please refer to REG 51 section 1.6.2",
        "intent": "AccountOpeningIndDocuments",
        "entities": {
            "DocumentType": ["NDM","NCF"],
            "Document": ["Document"]
        }
    },
    {
        "qnID" : 8,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "Can a Relationship Manager open an account for another market?",
        "answer": "The RM will have to approach the respective market and obtain the necessary approval before proceeding.",
        "intent": "AccountOpeningInfo",
        "entities": {
            "Entity": "RM",
            "Account": ["Account"],
            "Action": ["Open"]
        }
    },
    {
        "qnID" : 9,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "Where to find the new SOP for AOR?",
        "answer": "Please refer to the following link: http://b2e.group.echonet/cid1507835-pid13291-lid2/Account-Opening-and-recertification.html",
        "intent": "AccountOpeningInfo",
        "entities": {
          "Proced   ure": ["SOP","AOR"]
        }
    },
    {
        "qnID" : 10,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "What are indicators of dual nationality?",
        "answer": "Refer to REG51 page A8 and A41",
        "intent": "AccountOpeningInfo",
        "entities": {
          "Nat  ionality": ["Dual Nationality"]
        }
    },
    {
        "qnID" : 11,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "Is the Insider representation form a Non-Deferrable Mandatory document?",
        "answer": "No it is not. Refer to the Account opening checklist on COB onboarding website.",
        "intent": "AccountOpeningIndDocuments",
        "entities": {
            "Document": ["Insider Representation Form", "Document"],
            "DocumentType": ["NDM"]
        }
    },
    {
        "qnID" : 12,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "Is IPQ an Non-Deferrable Mandatory document?",
        "answer": "No it is not. The account will not be blocked, but no investment will be allowed except for spot FX, Loan and deposit until the IPQ is received.",
        "intent": "AccountOpeningIndDocuments",
        "entities": {
            "Document": ["IPQ","Document"],
            "DocumentType": ["NDM"]
        }
    },
    {
        "qnID" : 13,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "Why do we need to confirm dual nationality if the client is a Singapore Citizen?",
        "answer": "Refer to REG 51 page A8 - A9",
        "intent": "AccountOpeningInfo",
        "entities": {
             "Nationality": ["Dual Nationality","Singapore Citizen"]
        }
    },
    {
        "qnID" : 14,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "Where can I get a copy of the MSCQ form?",
        "answer": "Refer to AOR 2.5",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
            "Document": ["MSCQ"]
        }
    },
    {
        "qnID" : 15,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "What if the Client Acceptance Form has more telephone numbers than the Account Opening Booklet?",
        "answer": "The FO has to submit \"Change of Address/ Telephone numbers\" for deletion of extra phone numbers.",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
            "Document": ["CAF","Account Opening Booklet"]
        }
    },
    {
        "qnID" : 16,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "Do we only submit pages of pages of AEOI Self Cert & IPQ that require client action?",
        "answer": "No, please submit the full set of documents.",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
            "Document": ["AEOI","IPQ"]
        }
    },
    {
        "qnID" : 17,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "What if Address Proof submitted differs from Account Opening Booklet?",
        "answer": "Follow the address stated on the address proof.",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
            "Document": ["Address Proof","Account Opening Booklet"]
        }
    },
    {
        "qnID" : 18,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "It is difficult to obtain address proof under individual's name in Dubai. Can a visitation call report by RM confirming the members live together suffice?",
        "answer": "We will still need them to provide a form of address proof together with the call report as a supplementary document, instead of a stand alone call report.",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
            "Document": ["Call Report","Address Proof"],
            "Country": ["Dubai"],
            "Entity": ["RM"]
        }
    },
    {
        "qnID" : 19,
        "username" : "FO",
        "dateAsked": "2018-10-09",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09",
        "views" : 0,
        "question": "Who is eligible to act as a Legal Representative to sign off the UBO form?",
        "answer": "Legal representative refers to Authorized signatories as per mandate.",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
            "Entity": ["Legal Representative"],
            "Document": ["UBO"]
        }
    }
])

//set up Questions IDs
db.QuestionCounter.insertOne({ "_id": "qnID", "sequence_value": 20 })

//set up Questions notification IDs
db.QuestionNotificationCounter.insertOne({ "_id": "noID", "sequence_value": 1 })

//set up Questions notification table
db.QuestionNotifications.createIndex({ "noID": 1, "question": 1 })

//set up Answers notification IDs
db.AnswerNotificationCounter.insertOne({ "_id": "noID", "sequence_value": 1 })

//set up Answers notification table
db.AnswerNotifications.createIndex({ "noID": 1, "question": 1, "answer": 1 })

//Set up Store intents table
db.StoreIntents.insertMany(
    [
      {
        "text": "What are the documents required for opening of Sub-Account?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(47),
            "end": NumberInt(58),
            "value": "Sub-Account",
            "entity": "Account"
          },
          {
            "start": NumberInt(13),
            "end": NumberInt(22),
            "value": "Document",
            "entity": "Document"
          },
          {
            "start": NumberInt(36),
            "end": NumberInt(43),
            "value": "open",
            "entity": "Action"
          }
        ]
      },
      {
        "text": "What is needed for opening of sub-account?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(30),
            "end": NumberInt(41),
            "value": "Sub-Account",
            "entity": "Account"
          },
          {
            "start": NumberInt(19),
            "end": NumberInt(26),
            "value": "open",
            "entity": "Action"
          }
        ]
      },
      {
        "text": "To open a sub-account what is needed?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(10),
            "end": NumberInt(21),
            "value": "Sub-Account",
            "entity": "Account"
          },
          {
            "start": NumberInt(3),
            "end": NumberInt(7),
            "value": "open",
            "entity": "Action"
          }
        ]
      },
      {
        "text": "What are the document requirements for opening of sub-account?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(50),
            "end": NumberInt(61),
            "value": "Sub-Account",
            "entity": "Account"
          },
          {
            "start": NumberInt(13),
            "end": NumberInt(21),
            "value": "Document",
            "entity": "Document"
          },
          {
            "start": NumberInt(39),
            "end": NumberInt(46),
            "value": "open",
            "entity": "Action"
          }
        ]
      },
      {
        "text": "Which documents are required for the opening of sub-account?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(48),
            "end": NumberInt(59),
            "value": "Sub-Account",
            "entity": "Account"
          },
          {
            "start": NumberInt(6),
            "end": NumberInt(15),
            "value": "Document",
            "entity": "Document"
          },
          {
            "start": NumberInt(37),
            "end": NumberInt(44),
            "value": "open",
            "entity": "Action"
          }
        ]
      },
      {
        "text": "If an account adds another new LPOA, does the existing Limited Power of Attorney need to sign on the LPOA letter?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(31),
            "end": NumberInt(35),
            "value": "LPOA",
            "entity": "Entity"
          },
          {
            "start": NumberInt(55),
            "end": NumberInt(80),
            "value": "LPOA",
            "entity": "Entity"
          },
          {
            "start": NumberInt(101),
            "end": NumberInt(112),
            "value": "LPOA letter",
            "entity": "Document"
          },
          {
            "start": NumberInt(6),
            "end": NumberInt(13),
            "value": "Account",
            "entity": "Account"
          }
        ]
      },
      {
        "text": "If an account adds another new LPOA, is the existing LPOA's signature required?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(31),
            "end": NumberInt(35),
            "value": "LPOA",
            "entity": "Entity"
          },
          {
            "start": NumberInt(53),
            "end": NumberInt(57),
            "value": "LPOA",
            "entity": "Entity"
          },
          {
            "start": NumberInt(6),
            "end": NumberInt(13),
            "value": "Account",
            "entity": "Account"
          }
        ]
      },
      {
        "text": "If an additional LPOA is added to an account, does the existing LPOA need to sign on the LPOA letter?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(17),
            "end": NumberInt(21),
            "value": "LPOA",
            "entity": "Entity"
          },
          {
            "start": NumberInt(64),
            "end": NumberInt(68),
            "value": "LPOA",
            "entity": "Entity"
          },
          {
            "start": NumberInt(89),
            "end": NumberInt(100),
            "value": "LPOA letter",
            "entity": "Document"
          },
          {
            "start": NumberInt(37),
            "end": NumberInt(44),
            "value": "Account",
            "entity": "Account"
          }
        ]
      },
      {
        "text": "If account has another new Limited Power of Attorney, does the current LPOA need to sign on the LPOA letter as well?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(27),
            "end": NumberInt(52),
            "value": "LPOA",
            "entity": "Entity"
          },
          {
            "start": NumberInt(71),
            "end": NumberInt(75),
            "value": "LPOA",
            "entity": "Entity"
          },
          {
            "start": NumberInt(96),
            "end": NumberInt(107),
            "value": "LPOA letter",
            "entity": "Document"
          },
          {
            "start": NumberInt(3),
            "end": NumberInt(10),
            "value": "Account",
            "entity": "Account"
          }
        ]
      },
      {
        "text": "If the new role of account A is in our existing account B, can we refer to his address proof from account B?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(79),
            "end": NumberInt(92),
            "value": "Address Proof",
            "entity": "Document"
          },
          {
            "start": NumberInt(19),
            "end": NumberInt(26),
            "value": "Account",
            "entity": "Account"
          },
          {
            "start": NumberInt(39),
            "end": NumberInt(55),
            "value": "Existing Account",
            "entity": "Account"
          }
        ]
      },
      {
        "text": "If a new role exists in another account, can we refer to his address proof from the other account?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(61),
            "end": NumberInt(74),
            "value": "Address Proof",
            "entity": "Document"
          },
          {
            "start": NumberInt(32),
            "end": NumberInt(39),
            "value": "Account",
            "entity": "Account"
          }
        ]
      },
      {
        "text": "If an address proof for a person exists in another account, can we still use it?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(6),
            "end": NumberInt(19),
            "value": "Address Proof",
            "entity": "Document"
          },
          {
            "start": NumberInt(51),
            "end": NumberInt(58),
            "value": "Account",
            "entity": "Account"
          }
        ]
      },
      {
        "text": "If the added new role of account A is in our existing account B, can we refer to the existing address proof?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(94),
            "end": NumberInt(107),
            "value": "Address Proof",
            "entity": "Document"
          },
          {
            "start": NumberInt(25),
            "end": NumberInt(32),
            "value": "Account",
            "entity": "Account"
          },
          {
            "start": NumberInt(54),
            "end": NumberInt(61),
            "value": "Account",
            "entity": "Account"
          }
        ]
      },
      {
        "text": "What is the list of acceptable address proofs?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(31),
            "end": NumberInt(45),
            "value": "Address Proof",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "Is an electrical bill acceptable as address proof?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(36),
            "end": NumberInt(49),
            "value": "Address Proof",
            "entity": "Document"
          },
          {
            "start": NumberInt(6),
            "end": NumberInt(21),
            "value": "Electrical Bill",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "Is a Mobile Phone Statement acceptable as address proof?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(42),
            "end": NumberInt(55),
            "value": "Address Proof",
            "entity": "Document"
          },
          {
            "start": NumberInt(5),
            "end": NumberInt(27),
            "value": "Mobile Phone Statement",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "Are Bank Statements with addresses acceptable as address proofs?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(4),
            "end": NumberInt(19),
            "value": "Bank Statement",
            "entity": "Document"
          },
          {
            "start": NumberInt(49),
            "end": NumberInt(63),
            "value": "Address Proof",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "How many signers in an account?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(9),
            "end": NumberInt(16),
            "value": "Signers",
            "entity": "Entity"
          },
          {
            "start": NumberInt(23),
            "end": NumberInt(30),
            "value": "Account",
            "entity": "Account"
          }
        ]
      },
      {
        "text": "How many signers are needed for an account?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(9),
            "end": NumberInt(16),
            "value": "Signers",
            "entity": "Entity"
          },
          {
            "start": NumberInt(35),
            "end": NumberInt(42),
            "value": "Account",
            "entity": "Account"
          }
        ]
      },
      {
        "text": "What are the docs required to add authorized signers?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(13),
            "end": NumberInt(17),
            "value": "Document",
            "entity": "Document"
          },
          {
            "start": NumberInt(34),
            "end": NumberInt(52),
            "value": "Authorized Signers",
            "entity": "Entity"
          }
        ]
      },
      {
        "text": "What documents are required to add authorized signers?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(5),
            "end": NumberInt(14),
            "value": "Document",
            "entity": "Document"
          },
          {
            "start": NumberInt(35),
            "end": NumberInt(53),
            "value": "Authorized Signers",
            "entity": "Entity"
          }
        ]
      },
      {
        "text": "What is the list of Non-Deferrable Mandatory documents/ Non-Compliant File documents?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(20),
            "end": NumberInt(44),
            "value": "NDM",
            "entity": "DocumentType"
          },
          {
            "start": NumberInt(56),
            "end": NumberInt(74),
            "value": "NCF",
            "entity": "DocumentType"
          },
          {
            "start": NumberInt(45),
            "end": NumberInt(54),
            "value": "Document",
            "entity": "Document"
          },
          {
            "start": NumberInt(75),
            "end": NumberInt(84),
            "value": "Document",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "What are the NDM/NCF documents?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(13),
            "end": NumberInt(16),
            "value": "NDM",
            "entity": "DocumentType"
          },
          {
            "start": NumberInt(17),
            "end": NumberInt(20),
            "value": "NCF",
            "entity": "DocumentType"
          },
          {
            "start": NumberInt(21),
            "end": NumberInt(30),
            "value": "Document",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "What documents are NDM?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(5),
            "end": NumberInt(14),
            "value": "Document",
            "entity": "Document"
          },
          {
            "start": NumberInt(19),
            "end": NumberInt(22),
            "value": "NDM",
            "entity": "DocumentType"
          }
        ]
      },
      {
        "text": "What documents are considered as NDM?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(33),
            "end": NumberInt(36),
            "value": "NDM",
            "entity": "DocumentType"
          },
          {
            "start": NumberInt(5),
            "end": NumberInt(14),
            "value": "Document",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "What documents are NCF?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(5),
            "end": NumberInt(14),
            "value": "Document",
            "entity": "Document"
          },
          {
            "start": NumberInt(19),
            "end": NumberInt(22),
            "value": "NCF",
            "entity": "DocumentType"
          }
        ]
      },
      {
        "text": "What documents are considered as NCF?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(33),
            "end": NumberInt(36),
            "value": "NCF",
            "entity": "DocumentType"
          },
          {
            "start": NumberInt(5),
            "end": NumberInt(14),
            "value": "Document",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "Can a Relationship Manager open account for another market?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(6),
            "end": NumberInt(26),
            "value": "RM",
            "entity": "Entity"
          },
          {
            "start": NumberInt(32),
            "end": NumberInt(39),
            "value": "Account",
            "entity": "Account"
          },
          {
            "start": NumberInt(27),
            "end": NumberInt(31),
            "value": "Open",
            "entity": "Action"
          }
        ]
      },
      {
        "text": "Can an RM from Singapore open an account for Hong Kong?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(7),
            "end": NumberInt(9),
            "value": "RM",
            "entity": "Entity"
          },
          {
            "start": NumberInt(15),
            "end": NumberInt(24),
            "value": "Singapore",
            "entity": "Country"
          },
          {
            "start": NumberInt(45),
            "end": NumberInt(54),
            "value": "Hong Kong",
            "entity": "Country"
          },
          {
            "start": NumberInt(33),
            "end": NumberInt(40),
            "value": "Account",
            "entity": "Account"
          },
          {
            "start": NumberInt(25),
            "end": NumberInt(29),
            "value": "open",
            "entity": "Action"
          }
        ]
      },
      {
        "text": "Can an RM from Hong Kong open an account for Singapore?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(7),
            "end": NumberInt(9),
            "value": "RM",
            "entity": "Entity"
          },
          {
            "start": NumberInt(15),
            "end": NumberInt(24),
            "value": "Hong Kong",
            "entity": "Country"
          },
          {
            "start": NumberInt(45),
            "end": NumberInt(54),
            "value": "Singapore",
            "entity": "Country"
          },
          {
            "start": NumberInt(33),
            "end": NumberInt(40),
            "value": "Account",
            "entity": "Account"
          },
          {
            "start": NumberInt(25),
            "end": NumberInt(29),
            "value": "open",
            "entity": "Action"
          }
        ]
      },
      {
        "text": "Can an RM from another Market open an account?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(7),
            "end": NumberInt(9),
            "value": "RM",
            "entity": "Entity"
          },
          {
            "start": NumberInt(30),
            "end": NumberInt(34),
            "value": "open",
            "entity": "Action"
          },
          {
            "start": NumberInt(38),
            "end": NumberInt(45),
            "value": "Account",
            "entity": "Account"
          }
        ]
      },
      {
        "text": "Can an RM from a different Market open an account?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(7),
            "end": NumberInt(9),
            "value": "RM",
            "entity": "Entity"
          },
          {
            "start": NumberInt(34),
            "end": NumberInt(38),
            "value": "open",
            "entity": "Action"
          },
          {
            "start": NumberInt(42),
            "end": NumberInt(49),
            "value": "account",
            "entity": "Account"
          }
        ]
      },
      {
        "text": "Where to find the new SOP for AOR?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(22),
            "end": NumberInt(25),
            "value": "SOP",
            "entity": "Procedure"
          },
          {
            "start": NumberInt(30),
            "end": NumberInt(33),
            "value": "AOR",
            "entity": "Procedure"
          }
        ]
      },
      {
        "text": "Where can I find the latest Standard Operating Procedure for Account Opening Recertification Procedure?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(28),
            "end": NumberInt(56),
            "value": "SOP",
            "entity": "Procedure"
          },
          {
            "start": NumberInt(61),
            "end": NumberInt(92),
            "value": "Account Opening Recertification",
            "entity": "Procedure"
          }
        ]
      },
      {
        "text": "How do I obtain the latest standard operating procedure for AOR?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(27),
            "end": NumberInt(55),
            "value": "SOP",
            "entity": "Procedure"
          },
          {
            "start": NumberInt(60),
            "end": NumberInt(63),
            "value": "AOR",
            "entity": "Procedure"
          }
        ]
      },
      {
        "text": "What is the latest SOP for account opening recertification?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(19),
            "end": NumberInt(22),
            "value": "SOP",
            "entity": "Procedure"
          },
          {
            "start": NumberInt(27),
            "end": NumberInt(58),
            "value": "account opening recertification",
            "entity": "Procedure"
          }
        ]
      },
      {
        "text": "What are indicators of dual nationality?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(23),
            "end": NumberInt(39),
            "value": "Dual Nationality",
            "entity": "Nationality"
          }
        ]
      },
      {
        "text": "How do we tell if the client holds dual nationality?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(35),
            "end": NumberInt(51),
            "value": "dual nationality",
            "entity": "Nationality"
          }
        ]
      },
      {
        "text": "What are the signs of dual nationality?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(22),
            "end": NumberInt(38),
            "value": "dual nationality",
            "entity": "Nationality"
          }
        ]
      },
      {
        "text": "Is the Insider representation form a Non-Deferrable Mandatory document?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(7),
            "end": NumberInt(34),
            "value": "Insider Representation Form",
            "entity": "Document"
          },
          {
            "start": NumberInt(37),
            "end": NumberInt(61),
            "value": "NDM",
            "entity": "DocumentType"
          },
          {
            "start": NumberInt(62),
            "end": NumberInt(70),
            "value": "Document",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "Is the insider rep form considered an NDM?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(7),
            "end": NumberInt(23),
            "value": "Insider Representation Form",
            "entity": "Document"
          },
          {
            "start": NumberInt(38),
            "end": NumberInt(41),
            "value": "NDM",
            "entity": "DocumentType"
          }
        ]
      },
      {
        "text": "Is IPQ an Non-Deferrable Mandatory document?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(3),
            "end": NumberInt(6),
            "value": "IPQ",
            "entity": "Document"
          },
          {
            "start": NumberInt(10),
            "end": NumberInt(34),
            "value": "NDM",
            "entity": "DocumentType"
          },
          {
            "start": NumberInt(35),
            "end": NumberInt(43),
            "value": "Document",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "Is the Investment Profile Questionnaire considered an NDM?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(7),
            "end": NumberInt(39),
            "value": "IPQ",
            "entity": "Document"
          },
          {
            "start": NumberInt(54),
            "end": NumberInt(57),
            "value": "NDM",
            "entity": "DocumentType"
          }
        ]
      },
      {
        "text": "Is the invesment profile questionnaire form an NDM?",
        "intent": "AccountOpeningIndDocuments",
        "entities": [
          {
            "start": NumberInt(7),
            "end": NumberInt(38),
            "value": "IPQ",
            "entity": "Document"
          },
          {
            "start": NumberInt(47),
            "end": NumberInt(50),
            "value": "NDM",
            "entity": "DocumentType"
          }
        ]
      },
      {
        "text": "Why do we need to confirm dual nationality if the client is a Singapore Citizen?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(26),
            "end": NumberInt(42),
            "value": "Dual Nationality",
            "entity": "Nationality"
          },
          {
            "start": NumberInt(62),
            "end": NumberInt(79),
            "value": "Singapore Citizen",
            "entity": "Nationality"
          }
        ]
      },
      {
        "text": "Why is there a need to confirm that the client is holding dual nationality when he is a Singaporean?",
        "intent": "AccountOpeningInfo",
        "entities": [
          {
            "start": NumberInt(58),
            "end": NumberInt(74),
            "value": "Dual Nationality",
            "entity": "Nationality"
          },
          {
            "start": NumberInt(88),
            "end": NumberInt(99),
            "value": "Singapore Citizen",
            "entity": "Nationality"
          }
        ]
      },
      {
        "text": "Where to get the Major Sanction Countries Questionnaire?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(17),
            "end": NumberInt(55),
            "value": "MCSQ",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "Where can I get a copy of the MSCQ form?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(30),
            "end": NumberInt(34),
            "value": "MSCQ",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "How do I obtain an MSCQ form?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(19),
            "end": NumberInt(23),
            "value": "MSCQ",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "Who can I get the MSCQ form from?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(18),
            "end": NumberInt(22),
            "value": "MSCQ",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "What if the Client Acceptance Form has more telephone numbers than Acc Opening Booklet?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(12),
            "end": NumberInt(34),
            "value": "CAF",
            "entity": "Document"
          },
          {
            "start": NumberInt(67),
            "end": NumberInt(86),
            "value": "Account Opening Booklet",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "The CAF has more telephone numbers than the Account Opening Booklet?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(4),
            "end": NumberInt(7),
            "value": "CAF",
            "entity": "Document"
          },
          {
            "start": NumberInt(44),
            "end": NumberInt(67),
            "value": "Account Opening Booklet",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "Do we only submit pages of Automatic Exchange of Information & Investment Profile Questionnaire that require client action?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(27),
            "end": NumberInt(60),
            "value": "AEOI",
            "entity": "Document"
          },
          {
            "start": NumberInt(63),
            "end": NumberInt(95),
            "value": "IPQ",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "Only pages of AEOI Self Cert & IPQ that require client action need to be submitted?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(14),
            "end": NumberInt(18),
            "value": "AEOI",
            "entity": "Document"
          },
          {
            "start": NumberInt(31),
            "end": NumberInt(34),
            "value": "IPQ",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "Pages of AEOI Self Cert & IPQ are only submitted if it requires client action?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(9),
            "end": NumberInt(13),
            "value": "AEOI",
            "entity": "Document"
          },
          {
            "start": NumberInt(26),
            "end": NumberInt(29),
            "value": "IPQ",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "What if Address Proof submitted differs from Account Opening Booklet?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(8),
            "end": NumberInt(21),
            "value": "Address Proof",
            "entity": "Document"
          },
          {
            "start": NumberInt(45),
            "end": NumberInt(68),
            "value": "Account Opening Booklet",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "What if the Address Proof is different from the one in the Acc Opening booklet?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(12),
            "end": NumberInt(25),
            "value": "Address Proof",
            "entity": "Document"
          },
          {
            "start": NumberInt(59),
            "end": NumberInt(78),
            "value": "Account Opening Booklet",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "What should I do if address proof submitted is different from account opening booklet?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(20),
            "end": NumberInt(33),
            "value": "Address Proof",
            "entity": "Document"
          },
          {
            "start": NumberInt(62),
            "end": NumberInt(85),
            "value": "Account Opening Booklet",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "Can a visitation call report count as address proof?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(17),
            "end": NumberInt(28),
            "value": "Call Report",
            "entity": "Document"
          },
          {
            "start": NumberInt(38),
            "end": NumberInt(51),
            "value": "Address Proof",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "It is difficult to obtain address proof under individual's name in Dubai. Can a visitation call report by RM confirming the members live together suffice?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(91),
            "end": NumberInt(102),
            "value": "Call Report",
            "entity": "Document"
          },
          {
            "start": NumberInt(26),
            "end": NumberInt(39),
            "value": "Address Proof",
            "entity": "Document"
          },
          {
            "start": NumberInt(67),
            "end": NumberInt(72),
            "value": "Dubai",
            "entity": "Country"
          },
          {
            "start": NumberInt(106),
            "end": NumberInt(108),
            "value": "RM",
            "entity": "Entity"
          }
        ]
      },
      {
        "text": "Who are the Legal representatives to sign off the Ultimate Beneficial Owner form?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(50),
            "end": NumberInt(75),
            "value": "UBO",
            "entity": "Document"
          },
          {
            "start": NumberInt(12),
            "end": NumberInt(33),
            "value": "Legal Representative",
            "entity": "Entity"
          }
        ]
      },
      {
        "text": "Who is eligible to act as a Legal Rep to sign off the UBO form?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(28),
            "end": NumberInt(37),
            "value": "Legal Representative",
            "entity": "Entity"
          },
          {
            "start": NumberInt(54),
            "end": NumberInt(57),
            "value": "UBO",
            "entity": "Document"
          }
        ]
      },
      {
        "text": "For the UBO form, who can act as a legal representative?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(8),
            "end": NumberInt(11),
            "value": "UBO",
            "entity": "Document"
          },
          {
            "start": NumberInt(35),
            "end": NumberInt(55),
            "value": "Legal Representative",
            "entity": "Entity"
          }
        ]
      },
      {
        "text": "Who is considered a legal representative in the UBO form?",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": [
          {
            "start": NumberInt(20),
            "end": NumberInt(40),
            "value": "Legal Representative",
            "entity": "Entity"
          },
          {
            "start": NumberInt(48),
            "end": NumberInt(51),
            "value": "UBO",
            "entity": "Document"
          }
        ]
      }
    ]
)