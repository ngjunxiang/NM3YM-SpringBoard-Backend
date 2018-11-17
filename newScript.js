// reset database
use SpringBoard

// set up checklists table
db.Checklists.drop()
db.Checklists.createIndex({ "clID": 1 }, { unique: true })
db.Checklists.insertMany([
  {
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
                            "documentType": "Not Applicable",
                            "documentName" : "ICE KYC Profile and Client Acceptance Form (including modifications since last CAC)",
                            "agmtCode" : "301",
                            "signature" : false,
                            "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>â–¡ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;â—‹ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;â—‹ Individual profiles of all account holders</div><div>â–¡ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; â—‹ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; â—‹ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;â—‹&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>â–¡ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                            "docID" : "0",
                            "changed" : "0"
                    },
                    {
                            "hasConditions": false,
                            "conditions": [],
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
                            "documentName" : "Call Report",
                            "agmtCode" : "N.A.",
                            "signature" : false,
                            "remarks" : "<div>- Validated according to Bank's Standard</div><div>- Other than new account under existing relationship where face-to-face meeting has been conducted before and EAM account, the call report should demonstrate face-to-face meeting with account holders.</div><div>- Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; â—‹ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; â—‹ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; â—‹ Low Risk&nbsp; : 3 years</div><div><br></div><div><br></div><div><div>â–¡ Check that Call Report submitted was validated.</div><div>â–¡ Check the Call Report that client was contacted within the past 1 year.</div><div>â–¡ Check the Call Report indicate country and location for physical meeting.</div><div>â–¡ Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; &nbsp; â—‹ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; â—‹ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; â—‹ Low Risk&nbsp; : 3 years</div></div>",
                            "docID" : "3",
                            "changed" : "0"
                    },
                    {
                            "hasConditions": false,
                            "conditions": [],
                            "documentType": "Not Applicable",
                            "documentName" : "Clear unexpired Passport / ID copies or identification papers bearing clear photograph of accountholders",
                            "agmtCode" : "011",
                            "signature" : false,
                            "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>â–¡ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;â—‹ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;â—‹ Individual profiles of all account holders</div><div>â–¡ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; â—‹ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; â—‹ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;â—‹&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>â–¡ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                            "docID" : "62",
                            "changed" : "0"
                    },
                    {
                            "hasConditions": false,
                            "conditions": [],
                            "documentType": "Not Applicable",     
                            "documentName" : "Proof(s) of Residential Address for all account holders and authorised signatories / LPOA",
                            "agmtCode" : "558",
                            "signature" : false,
                            "remarks" : "<div>- Bank staff to write \"original sighted\", staff's name, date and sign on the copy of the residential address proof, OR photocopy to be certified by suitable certifier*.</div><div>- Evidence should be issued within the last 3 months.&nbsp;</div><div>- Address proof and ID doc have to be 2 separate document.</div><div><br>â–¡ Translation is required for non English document.<br></div>",
                            "docID" : "63",
                            "changed" : "0"
                    },
                    {
                            "hasConditions": false,
                            "conditions": [],
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",    
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",      
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",    
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
                            "documentType": "Not Applicable",
                            "documentName" : "VIGILANCE printouts for persons new to the Bank",
                            "agmtCode" : "- ",
                            "signature" : true,
                            "remarks" : "",
                            "docID" : "75",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Insider of Listed Company",
                                            "conditionOption" : "Yes"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Insider Representation Form",
                            "agmtCode" : "561",
                            "signature" : false,
                            "remarks" : "- applicable for client who is an insider of a listed company (ref. Procedures for Clients Connected to Listed Companies)",
                            "docID" : "76",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Place of Residence",
                                            "conditionOption" : "Australia"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Australian CPAâ€™s certification",
                            "agmtCode" : "035",
                            "signature" : false,
                            "remarks" : "",
                            "docID" : "77",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Place of Residence",
                                            "conditionOption" : "Taiwan"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Client Request Evidence Form",
                            "agmtCode" : "855",
                            "signature" : false,
                            "remarks" : "",
                            "docID" : "78",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Place of Residence",
                                            "conditionOption" : "United Kingdom"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "UK Declaration for Self Certified Sophisticated Investors ",
                            "agmtCode" : "645",
                            "signature" : false,
                            "remarks" : "",
                            "docID" : "79",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Place of Residence",
                                            "conditionOption" : "United Kingdom"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "UK Declaration for HNW individuals \t\t\t\t\t\t",
                            "agmtCode" : "646",
                            "signature" : false,
                            "remarks" : "",
                            "docID" : "80",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Place of Residence",
                                            "conditionOption" : "United Kingdom"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "UK Overseas Oral Comm. Letter\t\t\t\t\t\t",
                            "agmtCode" : "647",
                            "signature" : false,
                            "remarks" : "",
                            "docID" : "81",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Place of Residence",
                                            "conditionOption" : "Philippines"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Philippines Reverse Solicitation Letter\t\t\t\t\t\t",
                            "agmtCode" : "648",
                            "signature" : false,
                            "remarks" : "",
                            "docID" : "82",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Place of Residence",
                                            "conditionOption" : "China"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "China Reverse Solicitation Letter",
                            "agmtCode" : "619",
                            "signature" : false,
                            "remarks" : "",
                            "docID" : "83",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "SG booking Personal Investor",
                                            "conditionOption" : "Yes"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Accredited Investor ",
                            "agmtCode" : "-   ",
                            "signature" : false,
                            "remarks" : "",
                            "docID" : "84",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Employees of HKMA/SFC ",
                                            "conditionOption" : "Yes"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Employer's consent letter ",
                            "agmtCode" : "568",
                            "signature" : true,
                            "remarks" : "",
                            "docID" : "85",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Walk-In Client",
                                            "conditionOption" : "Yes"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",  
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",      
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
                            "documentType": "Not Applicable",      
                            "documentName" : "Derivative Master Agreement (DMA)",
                            "agmtCode" : "585",
                            "signature" : true,
                            "canWaiver" : false,
                            "remarks" : "",
                            "docID" : "34",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Booking Centre",
                                            "conditionOption" : "Hong Kong"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Personal Data Privacy Ordinance (Wef Mar 2013) / Direct Marketing Opt Out",
                            "agmtCode" : "554/679",
                            "signature" : true,
                            "canWaiver" : false,
                            "remarks" : "",
                            "docID" : "35",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Booking Centre",
                                            "conditionOption" : "Hong Kong"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Waiver in relation to requirements under Securities and Futures (Contract Notes, Statements of Account and Receipts) Rules ",
                            "agmtCode" : "042",
                            "signature" : true,
                            "canWaiver" : false,
                            "remarks" : "",
                            "docID" : "36",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Booking Centre",
                                            "conditionOption" : "Hong Kong"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Notice to Customers  Acknowledgement - Deposit Covered by the Deposit Protection Scheme Form",
                            "agmtCode" : "760",
                            "signature" : false,
                            "canWaiver" : false,
                            "remarks" : "",
                            "docID" : "37",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Booking Centre",
                                            "conditionOption" : "Hong Kong"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Financial Intermediary Agreement",
                            "agmtCode" : "337",
                            "signature" : true,
                            "canWaiver" : false,
                            "remarks" : "Ref: FIN INT AGT",
                            "docID" : "38",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Booking Centre",
                                            "conditionOption" : "Hong Kong"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Capital Investment Entrant Scheme",
                            "agmtCode" : "750",
                            "signature" : false,
                            "canWaiver" : false,
                            "remarks" : "Ensure that the Financial Intermediary Agreement is in place\n\n",
                            "docID" : "39",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Booking Centre",
                                            "conditionOption" : "Singapore"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
                            "documentType": "Not Applicable",
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
    "dateCreated" : "2018-09-17 15:00:53",
    "dateUpdated" : "2018-09-17 15:00:53",
    "createdBy" : "CM",
    "updatedBy" : "CM"
  },
  {
      "name" : "Account Opening (Legal Entity)",
      "requiredFields" : [
              "Client Name",
              "RM Name",
              "Client A/C Number",
              "Date of Submission"
      ],
      "conditions" : {
              "Legal Entity Type" : [
                      "Corporates",
                      "Trust",
                      "Foundation, Societies, and Charitable Organization",
                      "Domiciliary PIC",
                      "Domiciliary PIC with underlying Trust",
                      "BNP Related Entity"
              ],
              "Booking Centre" : [
                      "Singapore",
                      "Hong Kong"
              ]
      },
      "complianceDocuments" : {
              "mandatory" : [
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",
                              "documentName" : "Account Opening Booklet",
                              "agmtCode" : "677 (v6)",
                              "signature" : true,
                              "remarks" : "",
                              "docID" : "0",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",      
                              "documentName" : "Letter of Authority",
                              "agmtCode" : "333",
                              "signature" : true,
                              "remarks" : "",
                              "docID" : "1",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",   
                              "documentName" : "Residential Proof",
                              "agmtCode" : "558",
                              "signature" : true,
                              "remarks" : "<span style=\"line-height: 23.3333px;\">Identity proof must be collected for:&nbsp;</span><div><ol style=\"line-height: 23.3333px;\"><li>all AUTHORISED SIGNATORIES&nbsp;</li><li>the DIRECTORS who signed the account opening book and in any case at least 2 directors</li><li>all PRINCIPAL SHAREHOLDERS having 10% or more interest (for Low &amp; Medium risk accounts - a threshold of 25% applies&nbsp;</li><li>all BENEFICIAL OWNERS</li><li>LIMITED POWER of ATTORNEY</li></ol><div><ul><li><span style=\"line-height: 23.3333px;\">Bank staff to write \"original sighted\", staff's name, date and sign on the copy of the residential address proof, OR photocopy to be certified by suitable certifier*.</span></li><li><span style=\"line-height: 23.3333px;\">Evidence should be issued within the last 3 months.&nbsp;</span></li><li><span style=\"line-height: 23.3333px;\">Address proof and ID doc have to be 2 separate document.</span></li><li><span style=\"line-height: 23.3333px;\">For MSC nationals non-resident: 2 different official proofs of residence or equivalent documents issued by the country of residency dated less than 3 months at onboarding.</span></li></ul></div></div>",
                              "docID" : "3",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",        
                              "documentName" : "Board Resolution",
                              "agmtCode" : "303",
                              "signature" : true,
                              "remarks" : "<div>Board Resolution</div><div>- Incorporated in Account Opening Booklet</div>",
                              "docID" : "4",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",        
                              "documentName" : "Memorandum & Articles of Association",
                              "agmtCode" : "305",
                              "signature" : true,
                              "remarks" : "<div>Memorandum &amp; Articles of Association / Bye Laws or its equivalent&nbsp;</div><div><span style=\"line-height: 1.5;\">- Certified \"True, complete and valid copy\" by Company Director OR suitable certifier</span><br></div>",
                              "docID" : "5",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "ICE KYC Profile and Client Acceptance Form",
                              "agmtCode" : "301",
                              "signature" : true,
                              "remarks" : "<div>ICE KYC Profile and Client Acceptance Form (including modifications since last CAC)</div><div><br></div><div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. &nbsp;Limited Power of Attorney and Authorised Signatory/POA (where applicable).</div><div><span style=\"line-height: 1.5;\">- RM signed CAF must be received by Client Services Team no later than 1 month after &nbsp;ICE print date.</span><br></div>",
                              "docID" : "6",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Call Report",
                              "agmtCode" : "301_To be verified duplicate",
                              "signature" : false,
                              "remarks" : "<div><ul><li><span style=\"line-height: 1.5;\">Validated according to Bank's Standard</span><br></li><li><span style=\"line-height: 1.5;\">Other than new account under existing relationship where face-to-face meeting has been conducted before and EAM account, the call report should demonstrate face-to-face meeting with account holders.</span><br></li><li><span style=\"line-height: 1.5;\">Check the face to face &nbsp;meeting date should be within below period.</span><br></li></ul></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- High Risk / PEP &nbsp;: 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- Medium Risk &nbsp;: 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- Low Risk &nbsp;: 3 years</div><div><br></div><div><ul><li><span style=\"line-height: 1.5;\">For the case of P0 /MSC resident , face-face annual meeting is required.</span><br></li></ul></div>",
                              "docID" : "7",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Certificate of Incorporation",
                              "agmtCode" : "348",
                              "signature" : false,
                              "remarks" : "<div>Certificate of Incorporation OR</div><div><span style=\"line-height: 1.5;\"><br></span></div><div><ul><li><span style=\"line-height: 1.5;\">&nbsp;HKBC: Bank staff to write \"original sighted\", staff's name, date and sign, OR photocopy to be certified by suitable certifier*.&nbsp;</span></li><li><span style=\"line-height: 1.5;\">SGBC: Certified by director OR suitable certifier OR RM to write 'original sighted', RM name, date and sign.</span></li></ul></div>",
                              "docID" : "8",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Identity Proof",
                              "agmtCode" : "011",
                              "signature" : false,
                              "remarks" : "<span style=\"line-height: 1.5;\">Identity proof must be collected for:&nbsp;</span><div style=\"line-height: 23.3333px;\"><ol><li><span style=\"line-height: 1.5;\">all AUTHORISED SIGNATORIES&nbsp;</span></li><li><span style=\"line-height: 1.5;\">the DIRECTORS who signed the account opening book and in any case at least 2 directors</span></li><li><span style=\"line-height: 1.5;\">all PRINCIPAL SHAREHOLDERS having 10% or more interest (for Low &amp; Medium risk accounts - a threshold of 25% applies&nbsp;</span></li><li><span style=\"line-height: 1.5;\">all BENEFICIAL OWNERS</span></li><li><span style=\"line-height: 1.5;\">LIMITED POWER of ATTORNEY</span></li></ol><ul><li><span style=\"line-height: 1.5;\">Clear unexpired Passport / ID copies or identification papers bearing clear photograph of&nbsp;</span><span style=\"line-height: 1.5;\">all AUTHORISED SIGNATORIES*&nbsp;</span><br></li><li><span style=\"line-height: 1.5;\">Bank staff to write \"original sighted\", staff's name, date and sign on the copy of the passport / ID, OR photocopy to be certified by suitable certifier*.</span><br></li><li><span style=\"line-height: 1.5;\">HK and Macau permanent ID card are acceptable only for HK booking. Singapore Identity card is acceptable for both HK and SG booking. However, passport copy is still required if ID card does not show the place of birth (eg. born 'overseas').</span><br></li><li><span style=\"line-height: 1.5;\">Where indicators of dual nationality are present (country of birth different from country of nationality, permanent activity in a country different from primary residence, extended sojourn in another country, family ties, etc.), RM must inquire whether the client has two or more nationalities, document in call report, and obtain all the nationality proof documentation (e.g. passport copy)</span></li></ul></div>",
                              "docID" : "12",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "W9 - US Person Declaration",
                              "agmtCode" : "212",
                              "signature" : true,
                              "remarks" : "<div>W9 - US Person declared with the IRS and Annex 2 , 3 or 4 (Whichever is appropriate).&nbsp;</div><div><span style=\"font-size: 14px; line-height: 1.5;\">- Please see WM Business policy on American Customers (US persons).</span><br></div>",
                              "docID" : "20",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Declaration of Tax Conformity (DTC)",
                              "agmtCode" : "887",
                              "signature" : true,
                              "remarks" : "<div>Declaration of Tax Conformity (DTC)</div><div><br></div><div>- Applicable for &nbsp;all client(s)</div><div><div>- Each impacted account holder to complete a separate form</div><div>- For PIVs of EU/OECD residents permitted, tax evidence is required together with the DTC and TCI. At each recertification, current tax evidence must be provided by the Client.</div></div>",
                              "docID" : "21",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Tax Compliance Indicator Questionnaire (TCI)",
                              "agmtCode" : "659",
                              "signature" : true,
                              "remarks" : "<div>Tax Compliance Indicator Questionnaire (TCI)</div><div><br></div><div>- Applicable for all clients</div><div>- High Tax Acceptance Form is required if DTC Committee required.<br></div>",
                              "docID" : "22",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Risk Disclosure Statement (RDS)",
                              "agmtCode" : "302",
                              "signature" : true,
                              "remarks" : "<div>Risk Disclosure Statement (RDS)</div><div><span style=\"font-size: 14px; line-height: 1.5;\">- Incorporated in Account Opening Booklet</span><br></div>",
                              "docID" : "28",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Derivative Master Agreement (DMA)",
                              "agmtCode" : "585",
                              "signature" : false,
                              "remarks" : "<div>Derivative Master Agreement (DMA)</div><div><span style=\"font-size: 14px; line-height: 1.5;\">- Incorporated in Account Opening Booklet</span><br></div>",
                              "docID" : "29",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Evidence of Source of Wealth",
                              "agmtCode" : "870",
                              "signature" : false,
                              "remarks" : "<div>Evidence of Source of Wealth</div><div><span style=\"font-size: 14px; line-height: 1.5;\">- Documentary proof of employment</span><br></div><div>- Documentary proof of Business (e.g. Company Search or Constitution Documents)</div>",
                              "docID" : "30",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Investment Profile Questionnaire",
                              "agmtCode" : "964",
                              "signature" : true,
                              "remarks" : "<div>Investment Profile Questionnaire (IPQ)&nbsp;<span style=\"font-size: 14px; line-height: 1.5;\">(Jun 2017)</span></div><div>- All account holder(s) to sign.&nbsp;</div><div>- Highlight if invesment profile on IPQ form differs from CAF.&nbsp;</div><div>- Not required for TPM account</div><div>- JU 959 for DPM IPQ &nbsp; &nbsp;&nbsp;</div>",
                              "docID" : "31",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "MLRA Simulation Form",
                              "agmtCode" : "301 - to be validated",
                              "signature" : false,
                              "remarks" : "MLRA Simulation Form",
                              "docID" : "32",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Internet Services Asia e-Banking",
                              "agmtCode" : "048",
                              "signature" : false,
                              "remarks" : "<div>Internet Services Asia e-Banking</div><div><span style=\"font-size: 14px; line-height: 1.5;\">- Incorporated in Account Opening Book</span><br></div>",
                              "docID" : "38",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Board Resolution for e-banking Application",
                              "agmtCode" : "-- TBC",
                              "signature" : false,
                              "remarks" : "<div>Board Resolution for e-banking Application&nbsp;</div><div><br></div><div>- Incorporated in Account Opening Book</div>",
                              "docID" : "39",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Letter of Instructions and Indemnity (eDocuments)",
                              "agmtCode" : "899",
                              "signature" : false,
                              "remarks" : "",
                              "docID" : "40",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Power of Attorney for  LIMITED POWER OF ATTORNEY  (No Fund Transfer Out)",
                              "agmtCode" : "555",
                              "signature" : false,
                              "remarks" : "",
                              "docID" : "41",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Vulnerable Client Assessment Form",
                              "agmtCode" : "983",
                              "signature" : false,
                              "remarks" : "<div>Form to assess if any of the clients in the account qualify as VC</div><div><span style=\"font-size: 14px; line-height: 1.5;\">- To be completed by each authorised trader who is aged 65 or above</span><br></div>",
                              "docID" : "42",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Genuine Vulnerable Client Assessment Form",
                              "agmtCode" : "984",
                              "signature" : false,
                              "remarks" : "<div>Form to assess if any of the clients in the account qualify as VC</div><div><br></div><div>- To be completed by each authorised trader who is aged 65 or above and declared he/she is a genuine vulnerable client.</div>",
                              "docID" : "43",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "US FATCA/AEOI self certification (CORP)",
                              "agmtCode" : "126",
                              "signature" : false,
                              "remarks" : "",
                              "docID" : "44",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "conditions": [],
                              "documentType": "Not Applicable",         
                              "documentName" : "Non-US FATCA/AEOI self certification (CORP)",
                              "agmtCode" : "244",
                              "signature" : false,
                              "remarks" : "",
                              "docID" : "45",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC with underlying Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "BNP Related Entity"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Identity Proof",
                              "agmtCode" : "011 - Trust & BNP Related",
                              "signature" : false,
                              "remarks" : "<div style=\"line-height: 23.3333px;\"><span style=\"line-height: 1.5;\">Identity proof must be collected for:&nbsp;</span><div style=\"line-height: 23.3333px;\"><ol><li><span style=\"line-height: 1.5;\">Settlor/ Asset Contributor</span><br></li><li><span style=\"line-height: 1.5;\">Protector/ Enforcers (if any)</span></li><li><span style=\"line-height: 1.5;\">Known Beneficiaries (if individual names are identified), and</span></li><li><span style=\"line-height: 1.5;\">any other natural person who exercises ultimate effective control over the trust</span><br></li></ol><ul><li><span style=\"line-height: 1.5;\">Clear unexpired Passport / ID copies or identification papers bearing clear photograph of&nbsp;</span><span style=\"line-height: 1.5;\">all AUTHORISED SIGNATORIES*&nbsp;</span></li><li><span style=\"line-height: 1.5;\">Bank staff to write \"original sighted\", staff's name, date and sign on the copy of the passport / ID, OR photocopy to be certified by suitable certifier*.</span><br></li><li><span style=\"line-height: 1.5;\">HK and Macau permanent ID card are acceptable only for HK booking. Singapore Identity card is acceptable for both HK and SG booking. However, passport copy is still required if ID card does not show the place of birth (eg. born 'overseas').</span><br></li><li><span style=\"line-height: 1.5;\">Where indicators of dual nationality are present (country of birth different from country of nationality, permanent activity in a country different from primary residence, extended sojourn in another country, family ties, etc.), RM must inquire whether the client has two or more nationalities, document in call report, and obtain all the nationality proof documentation (e.g. passport copy)</span></li></ul>Specific to (7) Protector/ Enforcers (if any) (8) Known Beneficiaries (if individual names are identified) (9) any other natural person who exercises ultimate effective control over the trust, the below is applicable:</div><div style=\"line-height: 23.3333px;\"><ul><li><span style=\"line-height: 1.5;\">For MSC nationals non-resident: 2 different official proofs of residence or equivalent documents issued by the country of residency dated less than 3 months at onboarding.</span></li></ul></div></div>",
                              "docID" : "11",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Corporates"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Foundation, Societies, and Charitable Organization"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Commercial Registration",
                              "agmtCode" : "349",
                              "signature" : false,
                              "remarks" : "<div style=\"line-height: 23.3333px;\">Commercial Registration OR</div><div style=\"line-height: 23.3333px;\"><ul><li>HKBC: Bank staff to write \"original sighted\", staff name, date and sign, OR photocopy to be certified by suitable certifier*.&nbsp;<br></li><li>SGBC: Certified by director OR suitable certifier OR RM to write 'original sighted', RM name, date and sign.</li></ul></div>",
                              "docID" : "13",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Corporates"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Foundation, Societies, and Charitable Organization"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Surat Izin Usaha Perdagangan (SIUP) & Tentang Pembuatan Izin Usaha Industri or equivalent",
                              "agmtCode" : "350",
                              "signature" : false,
                              "remarks" : "<div><span style=\"font-size: 14px; line-height: 1.5;\">HKBC: Bank staff to write \"original sighted\", staff name, date and sign, OR photocopy to be certified by suitable certifier*.&nbsp;</span><br></div><div><br></div>",
                              "docID" : "14",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Corporates"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Foundation, Societies, and Charitable Organization"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC with underlying Trust"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Company Search",
                              "agmtCode" : "326",
                              "signature" : false,
                              "remarks" : "<div>Company Search OR</div><div><span style=\"font-size: 14px; line-height: 1.5;\">- For list of company directors, shareholders and secretary.</span><br></div><div>- HKBC: Performed by the Bank. If provided by client, must obtain copy certified by suitable certifier*.</div>",
                              "docID" : "15",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Corporates"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Foundation, Societies, and Charitable Organization"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC with underlying Trust"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Original Certificate of Incumbency / Certificate of Registered Agent or equivalent",
                              "agmtCode" : "306",
                              "signature" : false,
                              "remarks" : "<div>Original Certificate of Incumbency / Certificate of Registered Agent or equivalent&nbsp;</div><div><span style=\"font-size: 14px; line-height: 1.5;\">- Obtain if Company Search is not available.</span><br></div><div>- Issued within the last 3 months from date of signing account opening doc.</div><div>- Stating name of the company, details of directors &nbsp;/ officer, details of shareholders, date of incorporation. &nbsp;&nbsp;</div><div><br></div><div>- HKBC: Bank staff to write \"original sighted\", staff's name, date and sign, OR photocopy be certified by suitable certifier*.&nbsp;</div><div>- SGBC: Certified by director OR suitable certifier OR RM to write 'original sighted', RM name, date and sign.</div><div><br></div><div>- Not required if it is an offshore investment vehicle created by BNPP Related Entity or if RM was involved in the purchase of the company (in which case RM to indicate in the CAF, provide list of shareholders and directors at a/c opening; then provide COI at first account review.</div>",
                              "docID" : "16",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Corporates"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Foundation, Societies, and Charitable Organization"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC with underlying Trust"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Original Certificate of Good Standing",
                              "agmtCode" : "307",
                              "signature" : false,
                              "remarks" : "<div>Original Certificate of Good Standing,&nbsp;</div><div><br></div><div>- Only required if company has been incorporated over 12 months and its status of good standing is not mentioned in Certificate of Incumbency&nbsp;</div><div>- Confirming date of &nbsp;incorporation, good standing of company, government fees paid to date and company is not in the process of winding up.</div><div><br></div>",
                              "docID" : "17",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Corporates"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Foundation, Societies, and Charitable Organization"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC with underlying Trust"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Certificate of Guarantee of Quality or equivalent",
                              "agmtCode" : "329",
                              "signature" : false,
                              "remarks" : "<div>Certificate of Guarantee of Quality or equivalent</div><div><br></div><div>- Only required if company has been incorporated over 12 months and its status of good standing is not mentioned in Certificate of Incumbency&nbsp;</div><div>- Confirming date of &nbsp;incorporation, good standing of company, government fees paid to date and company is not in the process of winding up.</div>",
                              "docID" : "18",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Corporates"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Business Registration Certificate/ Business Renewal Receipt/ Kantu Nomor Pokok Wojib Pajak (NPWP)",
                              "agmtCode" : "347",
                              "signature" : false,
                              "remarks" : "<div>Valid Business Registration Certificate / Business Renewal Receipt (where applicable) or Kantu Nomor Pokok Wajib Pajak (NPWP) or its equivalent</div><div><br></div><div>- HKBC: Bank staff to write \"original sighted\", staff name, date and sign, OR photocopy be certified by suitable certifier*.&nbsp;</div><div>- SGBC: Certified by director OR suitable certifier OR RM to write 'original sighted', RM name, date and sign.</div>",
                              "docID" : "19",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Corporates"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Foundation, Societies, and Charitable Organization"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Declaration of Beneficial Ownership",
                              "agmtCode" : "308",
                              "signature" : false,
                              "remarks" : "<div>Declaration of Beneficial Ownership&nbsp;</div><div><span style=\"font-size: 14px; line-height: 1.5;\">- For all companies except where Trustee Declaration Letter is provided. if all the required information in the form can be ontained through another document signed by the client or legal representative(s)</span><br></div><div><span style=\"font-size: 14px; line-height: 1.5;\">- Undertaking by beneficial owners and counter-sign by director declaring their beneficial ownership and undertaking to inform the bank of any changes to their status. &nbsp;</span><br></div><div><span style=\"font-size: 14px; line-height: 1.5;\">- In Standard Bank format.</span><br></div>",
                              "docID" : "23",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Corporates"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Foundation, Societies, and Charitable Organization"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC with underlying Trust"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Bank Reference Letter",
                              "agmtCode" : "301- Validation required",
                              "signature" : true,
                              "remarks" : "<div>Bank Reference Letter&nbsp;<span style=\"font-size: 14px; line-height: 1.5;\">(Applicable to Walk-In Clients)</span></div><div>- Only from reputable bank</div>",
                              "docID" : "24",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC with underlying Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "BNP Related Entity"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Professional Trustee confirmation Letter",
                              "agmtCode" : "346",
                              "signature" : true,
                              "remarks" : "<div>Professional Trustee confirmation Letter &nbsp;settlor(s), asset contributor in case of nominee settlor, any protector(s), enforcers, and any other natural person who exercises ultimate effective control over the trust, known beneficiaries, and Trust Details</div><div><br></div><div>- In Standard Bank Format or equivalent &nbsp; &nbsp;</div>",
                              "docID" : "25",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC with underlying Trust"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "ID of Third Party Trustee (not applicable to BNPP related entities)",
                              "agmtCode" : "TBC",
                              "signature" : false,
                              "remarks" : "<div>ID of Third Party Trustee (not applicable to BNPP related entities)</div><div><br></div><div>- Corporate trustee: Certificate of Incorporation, Certificate of Incumbency or equivalent, M&amp;A. If representative of the trustee sign on account opening doc or operate the account, provide list of authorised signatories of trustee (certified by Director), ID/passport copy and address proof of the relevant representatives.</div><div><br></div><div>- Individual trustee: Unexpired passport / ID copies AND address proof</div>",
                              "docID" : "26",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "BNP Related Entity"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Company Background Confirmation / Declaration",
                              "agmtCode" : "581",
                              "signature" : false,
                              "remarks" : "<div>Company Background Confirmation / Declaration&nbsp;</div><div>(Only applicable for offshore vehicles created by BNPP Related Entities)</div><div><br></div><div>- Should be provided if Certificate of Incumbency and Good Standing are not provided. &nbsp;</div>",
                              "docID" : "27",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Booking Centre",
                                              "conditionOption" : "Hong Kong"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Waiver in relation to requirements under Securities and Futures",
                              "agmtCode" : "042",
                              "signature" : false,
                              "remarks" : "<div>Waiver in relation to requirements under Securities and Futures (Contract Notes, Statements of Account and Receipts) Rules&nbsp;</div><div>- applicable to accounts booked in HK</div>",
                              "docID" : "33",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Booking Centre",
                                              "conditionOption" : "Hong Kong"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Notice to Customers  Acknowledgement - Deposit Covered by the Deposit Protection Scheme Form ",
                              "agmtCode" : "760",
                              "signature" : false,
                              "remarks" : "<div>Notice to Customers&nbsp;</div><div>Acknowledgement - Deposit Covered by the Deposit Protection Scheme Form&nbsp;</div><div>(HK Booking only)</div>",
                              "docID" : "34",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC with underlying Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "BNP Related Entity"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Trustee Letter - Instruction to open account",
                              "agmtCode" : "345",
                              "signature" : false,
                              "remarks" : "",
                              "docID" : "35",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Booking Centre",
                                              "conditionOption" : "Hong Kong"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Employer's Consent Letter",
                              "agmtCode" : "568",
                              "signature" : false,
                              "remarks" : "<div>Employer's consent letter&nbsp;</div><div>(Applicable to employees of HKMA/SFC regulated financial institutions)</div><div><br></div><div>- Must be signed by the Employer's HR or Compliance or Responsible Officer of the regulated entity, but not by the client him/herself.</div>",
                              "docID" : "36",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Booking Centre",
                                              "conditionOption" : "Singapore"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Limited POA for Investment Purpose (SG Booking Only - For Third Party Manager's Account)",
                              "agmtCode" : "598",
                              "signature" : false,
                              "remarks" : "<div>Limited POA for Investment Purpose (SG Booking Only - For Third Party Manager's Account)</div><div><span style=\"font-size: 14px; line-height: 1.5;\">- In Standard Bank Format only.</span><br></div>",
                              "docID" : "37",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC with underlying Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "BNP Related Entity"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Lawyer confirmation Letter for Private Trustee",
                              "agmtCode" : "346 - TBC",
                              "signature" : false,
                              "remarks" : "<div>Lawyer confirmation Letter for Private Trustee - settlor(s), asset contributor in case of nominee settlor, any protector(s), enforcers, and any other natural person who exercises ultimate effective control over the trust, known beneficiaries, and Trust Details</div><div><br></div><div>- In Standard Bank Format or equivalent &nbsp; &nbsp;</div>",
                              "docID" : "46",
                              "changed" : "0"
                      },
                      {
                              "conditions" : [
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "Domiciliary PIC with underlying Trust"
                                      },
                                      {
                                              "conditionName" : "Legal Entity Type",
                                              "conditionOption" : "BNP Related Entity"
                                      }
                              ],
                              "hasConditions": true,
                              "documentType": "Not Applicable",
                              "documentName" : "Trust Deed",
                              "agmtCode" : "344",
                              "signature" : true,
                              "remarks" : "<div>Trust Deed</div><div><span style=\"font-size: 14px; line-height: 1.5;\">-RM &nbsp;confirm review the original trust instrument and &nbsp;write \"original sighted\", RM name, date and sign on a redacted copy&nbsp;</span><br></div>",
                              "docID" : "47",
                              "changed" : "0"
                      }
              ],
              "optional" : [
                      {
                              "hasConditions": false,
                              "documentType": "Not Applicable",
                              "conditions": [],      
                              "documentName" : "FATCA Account Opening / Review Checklist",
                              "agmtCode" : "285",
                              "signature" : false,
                              "remarks" : "<div>FATCA Account Opening / Review Checklist</div><div><span style=\"font-size: 14px; line-height: 1.5;\">- Refer to policies relating to US Persons and FATCA.&nbsp;</span><br></div>",
                              "docID" : "48",
                              "changed" : "0"
                      }
              ]
      },
      "legalDocuments" : {
              "mandatory" : [
                      {
                              "hasConditions": false,
                              "documentType": "Not Applicable",
                              "conditions": [],       
                              "documentName" : "Account Opening Booklet",
                              "agmtCode" : "677 (v6)",
                              "signature" : true,
                              "canWaiver" : false,
                              "remarks" : "<div>Account Opening Book</div><div><span style=\"font-size: 14px; line-height: 1.5;\">Version Jun 2017</span><br></div>",
                              "docID" : "49",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "documentType": "Not Applicable",
                              "conditions": [],             
                              "documentName" : "Letter of Authority",
                              "agmtCode" : "333",
                              "signature" : true,
                              "canWaiver" : false,
                              "remarks" : "",
                              "docID" : "50",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "documentType": "Not Applicable",
                              "conditions": [],             
                              "documentName" : "Board Resolution",
                              "agmtCode" : "303",
                              "signature" : true,
                              "canWaiver" : false,
                              "remarks" : "<div style=\"font-size: 14px; line-height: 21.2121px;\">Board Resolution</div><div style=\"font-size: 14px; line-height: 21.2121px;\">- Incorporated in Account Opening Booklet</div>",
                              "docID" : "51",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "documentType": "Not Applicable",
                              "conditions": [],             
                              "documentName" : "Memorandum & Articles of Association / Bye Laws or its equivalent ",
                              "agmtCode" : "305",
                              "signature" : true,
                              "canWaiver" : false,
                              "remarks" : "<div style=\"font-size: 14px; line-height: 21.2121px;\">Memorandum &amp; Articles of Association / Bye Laws or its equivalent&nbsp;</div><div style=\"font-size: 14px; line-height: 21.2121px;\">- Certified \"True, complete and valid copy\" by Company Director OR suitable certifier</div>",
                              "docID" : "52",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "documentType": "Not Applicable",
                              "conditions": [],             
                              "documentName" : "Risk Disclosure Statement (RDS)",
                              "agmtCode" : "302",
                              "signature" : true,
                              "canWaiver" : false,
                              "remarks" : "<div style=\"font-size: 14px; line-height: 21.2121px;\">Risk Disclosure Statement (RDS)</div><div style=\"font-size: 14px; line-height: 21.2121px;\">- Incorporated in Account Opening Booklet</div>",
                              "docID" : "53",
                              "changed" : "0"
                      },
                      {
                              "hasConditions": false,
                              "documentType": "Not Applicable",
                              "conditions": [],         
                              "documentName" : "Derivative Master Agreement (DMA)",
                              "agmtCode" : "585",
                              "signature" : true,
                              "canWaiver" : false,
                              "remarks" : "<div>Derivative Master Agreement (DMA)</div><div><span style=\"font-size: 14px; line-height: 1.5;\">- Incorporated in Account Opening Booklet</span><br></div>",
                              "docID" : "54",
                              "changed" : "0"
                      }
              ],
              "optional" : [ ]
      },
      "latestDocID" : "55",
      "clID" : "1",
      "version" : "1",
      "status" : "valid",
      "dateCreated" : "2018-10-03 17:45:32",
      "dateUpdated" : "2018-10-03 17:45:32",
      "createdBy" : "Chantelle Chiew",
      "updatedBy" : "Chantelle Chiew"
  },
  {
    "name" : "Transaction Monitoring",
    "requiredFields" : [
            "Client Name",
            "RM Name",
            "Account Number",
            "Date of Submission",
            "Is the transaction incoming or outgoing?",
            "Transaction Amount in USD",
            "Transaction Amount in Original Currency",
            "What is the name of Counterparty?",
            "What is the Counterparty Bank?",
            "What is the country of origin/ destination of fund?"
    ],
    "conditions" : {
            "Is the transaction incoming or outgoing" : [
                    "Incoming",
                    "Outgoing"
            ],
            "What type of transaction is it?" : [
                    "Fund Transfer",
                    "Securities Transfer",
                    "Cheque Deposit/ Inward Clearing Cheque",
                    "Internal Transfer",
                    "Cashier Order/Bank Draft",
                    "Cash"
            ],
            "What is the MLRA Score of Client's Account?" : [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7"
            ],
            "What is the client risk rating?" : [
                    "PEP",
                    "Very Sensitive",
                    "Sensitive",
                    "Standard Sensitive"
            ],
            "Is it a transaction to/from the client's same name account?" : [
                    "Yes",
                    "No"
            ],
            "If the transaction is NOT to/from client's same name account, is the counterpart a natural person or a legal entity? " : [
                    "Natural person",
                    "Legal Entity"
            ],
            "Is this a 3rd Party Transaction?" : [
                    "Yes",
                    "No"
            ],
            "Is this a very high risk, high risk, MSC, P0, P1, tax haven or non-AEOI country?" : [
                    "Yes",
                    "No"
            ],
            "What is the purpose of this transaction? " : [
                    "Investments of Securities",
                    "Deposit Placement",
                    "Related to Loans",
                    "Property Investments or related transactions",
                    "Personal Expenses",
                    "Bank Internal fees, Charges, Credit Loans in BNPP and Corporate Actions",
                    "Investment dividend in large amount or recurring pattern",
                    "Inheritance",
                    "Asset Consolidation/ Reallocation from/to same UBO(s) account",
                    "Initial Fund Injection into newly opened account",
                    "Account Closure",
                    "Transactions related to money changes, alternative remittance systems or commercial flows",
                    "Others"
            ],
            "For supporting document(s) obtained and reviewed, do the details in the document(s) match with client's explanation?" : [
                    "Yes",
                    "No"
            ]
    },
    "complianceDocuments" : {
            "mandatory" : [
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is the transaction incoming or outgoing",
                                            "conditionOption" : "Incoming"
                                    },
                                    {
                                            "conditionName" : "What type of transaction is it?",
                                            "conditionOption" : "Cashier Order/Bank Draft"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Cashier Order/ Bank Draft",
                            "agmtCode" : "xxx",
                            "signature" : false,
                            "remarks" : "Please attach the receipt from the counterparty bank, showing the issuer's name",
                            "docID" : "0",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "What type of transaction is it?",
                                            "conditionOption" : "Cash"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Cash Deposit/ Withdrawal Declaration",
                            "agmtCode" : "yyyyy",
                            "signature" : false,
                            "remarks" : "Please attach the Cash Deposit/ Withdrawal Declaration and Approval Form",
                            "docID" : "1",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is it a transaction to/from the client's same name account?",
                                            "conditionOption" : "Yes"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Counter Party Name",
                            "agmtCode" : "---",
                            "signature" : false,
                            "remarks" : "What is the counterparty bank?",
                            "docID" : "2",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is it a transaction to/from the client's same name account?",
                                            "conditionOption" : "No"
                                    },
                                    {
                                            "conditionName" : "If the transaction is NOT to/from client's same name account, is the counterpart a natural person or a legal entity? ",
                                            "conditionOption" : "Natural person"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Relationship",
                            "agmtCode" : "--",
                            "signature" : false,
                            "remarks" : "What is the relationship between the client and the counterparty?<div><br></div><div><ol><li>Family members, business partners or any other generic terms are not sufficient, please specify as much as possible possible their relationship</li><li>If same BO or Others is indicated, please elaborate on the relationship between counterparty and client. Example 1: The counterparty is a PIC solely owned by the client as evidenced by the COI. Both the PIC and client's account share the fact same UBO. Example 2: The counterparty distributing dividend is the operating company owned by the client. The audited Annual Report evidences the ownership and the percentage of dividend distributed</li></ol></div>",
                            "docID" : "3",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "If the transaction is NOT to/from client's same name account, is the counterpart a natural person or a legal entity? ",
                                            "conditionOption" : "Legal Entity"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Documents to demonstrate current ownership of the legal entity",
                            "agmtCode" : "----",
                            "signature" : false,
                            "remarks" : "Please state she is the UBO(s) of the legal entity?<div>Please provide supporting documents to demonstrate current ownership of the legal entity eg. Certificate of Incumbency, Company Search Report.</div>",
                            "docID" : "4",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is this a 3rd Party Transaction?",
                                            "conditionOption" : "Yes"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Purpose and Nature of 3rd Party Transaction",
                            "agmtCode" : "TM15.1",
                            "signature" : false,
                            "remarks" : "Please take note that 3rd Party Transaction is high risk and strongly discouraged. As such, purpose and nature of the transaction and reaction with our client must be established and justified with no exceptions. Otherwise, please consider escalating to TH/MH and Compliance.",
                            "docID" : "5",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is this a 3rd Party Transaction?",
                                            "conditionOption" : "Yes"
                                    },
                                    {
                                            "conditionName" : "What type of transaction is it?",
                                            "conditionOption" : "Securities Transfer"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "3rd Party Securities Transfer",
                            "agmtCode" : "TM15.2",
                            "signature" : false,
                            "remarks" : "For securities transfer involving 3rd parties, please attach evidence of Compliance pre-approval with supporting documents and justifications that there is no ML risk.",
                            "docID" : "6",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is this a very high risk, high risk, MSC, P0, P1, tax haven or non-AEOI country?",
                                            "conditionOption" : "Yes"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "MSC or Others",
                            "agmtCode" : "TM17,18,19",
                            "signature" : false,
                            "remarks" : "Note:<div><ul><li>For the list of very high risk, high risk, MSC, P0, and P1 countries, please refer to http://mediab2e.group.echonet/file/37/2/3236372.pdf</li><li>For the list of tax haven countries, please refer to http://mediab2e.group.echonet/file/73/5/3334735.xlsx</li><li>For AEOI countries, please refer to https://oecd.org/tax/transparency/AEOI-commitment.pdf</li></ul>If it is a MSC country, please consider immediate escalation to TH/MH and Compliance. Please attach TH/MH and Compliance's pre-approval evidence.</div><div><br></div><div>If It is a very high risk, high risk, P0, P1, tax haven or non-AEOI country, justification that there is no ML/tax evasion risk concerns is required.</div>",
                            "docID" : "7",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "What is the purpose of this transaction? ",
                                            "conditionOption" : "Investments of Securities"
                                    },
                                    {
                                            "conditionName" : "Is the transaction incoming or outgoing",
                                            "conditionOption" : "Incoming"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Source of Funds for Investments of Securities",
                            "agmtCode" : "TM21.1.1",
                            "signature" : false,
                            "remarks" : "Please state source of fund for investments of securities.",
                            "docID" : "8",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is the transaction incoming or outgoing",
                                            "conditionOption" : "Outgoing"
                                    },
                                    {
                                            "conditionName" : "What is the purpose of this transaction? ",
                                            "conditionOption" : "Investments of Securities"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Outgoing Transaction for Investments of Securities",
                            "agmtCode" : "TM21.1.2",
                            "signature" : false,
                            "remarks" : "For this outgoing transactions for investments of securities, please state:<div>(1) type(s) of investment products involved</div><div>(2) issues of the securities</div><div>(3) name of fund manager (if applicable)</div><div>(4) quantity of securities</div><div>(5) ISIN code of the securities</div><div>(6) whether the issuer of securities are subject to sanctions.&nbsp;</div><div>If YES, please attach evidence of compliance's pre-approval.&nbsp;</div><div>If NO, pease state&nbsp;</div><div><ul><li>Is this transaction in line with the expected transaction profile in CAF, or is it a known transaction? If NO, please consider updating CAF and escalating to th/MH and Compliance.<br></li><li>Please elaborate, for example, the transaction is from the same bank account as documented in CAF; th transaction is known ie.e already recurring; or it is a one-off transaction, etc</li></ul></div>",
                            "docID" : "9",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is the transaction incoming or outgoing",
                                            "conditionOption" : "Incoming"
                                    },
                                    {
                                            "conditionName" : "What is the purpose of this transaction? ",
                                            "conditionOption" : "Related to Loans"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Granting loans/ Paying out loan repayment",
                            "agmtCode" : "TM22.1, 22.2, 22.4",
                            "signature" : false,
                            "remarks" : "<div>Please determine what type of loan-related transaction is this?&nbsp;</div><div>(1) Granting a loan</div><div>(2) Paying out loan repayment</div><div><br></div>If the transaction is for (1) granting a loan, please<div>1(a) explain why client's liquid net worth is sufficient for loan granting<div>1(b) advise whether the loan is expected to be repaid back to this account? If yes, pease provide the repayment schedule expected</div><div>1(c) provide understanding of what the loan is to be used for; and</div><div>1(d) attach a signed copy of the finalised loan agreement</div></div><div><br></div><div>If the transaction is for (2) paying out loan repayment, please</div><div>2(a) provide understanding of what the loan is to be used for;</div><div>2(b) attach a signed copy of the finalised loan agreement;</div><div>2(c) attach a copy of statement/SWIFT message to evidence the initial loan granted;</div><div>2(d) advise if the payment matches with the repayment schedule. If yes, explain how;</div><div>2(e) advise if the loan has been granted in same currency as repayment; and</div><div>2(f) advise if the loan has been granted from he bank account and bank location/ country as repayment.</div><div><br></div><div>If the answer to 2(d), 2(d), 2(f) is 'No', please provide</div><div>3(a) what is the reason for the difference?</div><div>3(b) Is this a compensation payment? If YES, please note that compensation payment is forbidden. As such, please reject if funds have not been credited or executed. Otherwise, escalate to MH/TH and Compliance. If NO, please state what type(s) of supporting document(s) has/have been obtained and reviewed?</div><div>3(c) Consider escalating to compliance if the transaction is deemed suspicious/ unusual</div><div><br></div>",
                            "docID" : "10",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is the transaction incoming or outgoing",
                                            "conditionOption" : "Incoming"
                                    },
                                    {
                                            "conditionName" : "What is the purpose of this transaction? ",
                                            "conditionOption" : "Related to Loans"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Receiving loans/ Receiving loans repayment",
                            "agmtCode" : "TM22.1, 22.3, 22.4",
                            "signature" : false,
                            "remarks" : "Please determine what type of loan-related transaction is this?<div>(1) Receiving Loans</div><div>(2) Receiving Loan Repayment</div><div><br></div><div>If the transaction is for the purpose of (1) Receiving Loans, please</div><div>(1)a. advise why the client requires the loans;</div><div>(1)b. provide understanding of what the loan is to used for; and</div><div>(1)c. attach a signed copy of the finalised loan agreement.</div><div><br></div><div>If the transaction is for the purpose of (2) Receiving Loan Repayment, please</div><div>(2)a. provide understanding of what the loan is to be used for;</div><div>(2)b. attach a signed copy of the finalised loan agreement;</div><div>(2)c. attach a copy of statement/SWIFT message to evidence the initial loan granted;</div><div>(2)d. advise if the payment matches with the repayment schedule. If yes, explain how;</div><div>(2)e. advise if the loan has been granted in the same currency as repayment; and</div><div>(2)f. &nbsp;advise if the loan has been granted from the bank account and bank location/country as repayment.</div><div><br></div><div>If the answer to (2)d, 2(e), and/or 2(f) is 'No', please stat</div><div>(3)a. What is the reason for the difference?</div><div>(3)b. Is this a compensation payment? If YES, please note that compensation payment is forbidden. As such, please reject if funds have not been credited or executed. Otherwise, escalate to MH/TH and compliance. If NO, please state what type(s) of supporting document(s) has/have been obtained and reviewed?</div><div>(3)c. Consider escalating to Compliance if the transaction is deemed suspicious/ unusual.</div>",
                            "docID" : "11",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is the transaction incoming or outgoing",
                                            "conditionOption" : "Incoming"
                                    },
                                    {
                                            "conditionName" : "What is the purpose of this transaction? ",
                                            "conditionOption" : "Property Investments or related transactions"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Incoming transaction for property investments or related transactions",
                            "agmtCode" : "TM23.1",
                            "signature" : false,
                            "remarks" : "Please advise the source of fund for this incoming transaction for property investment or related transactions.",
                            "docID" : "12",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is the transaction incoming or outgoing",
                                            "conditionOption" : "Outgoing"
                                    },
                                    {
                                            "conditionName" : "What is the purpose of this transaction? ",
                                            "conditionOption" : "Property Investments or related transactions"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Outgoing transaction for property investments or related transactions",
                            "agmtCode" : "TM23.2",
                            "signature" : false,
                            "remarks" : "Please attach a signed copy of the finalised invoice sales and purchase agreement, detailing the location/address, type (commercial/residential) and size of the property.",
                            "docID" : "13",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is the transaction incoming or outgoing",
                                            "conditionOption" : "Outgoing"
                                    },
                                    {
                                            "conditionName" : "What is the purpose of this transaction? ",
                                            "conditionOption" : "Personal Expenses"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Personal Expenses",
                            "agmtCode" : "TM24",
                            "signature" : false,
                            "remarks" : "Please elaborate on the details of expenses e.g. the type of expenses and when it was incurred, and attach supporting documents.",
                            "docID" : "14",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is the transaction incoming or outgoing",
                                            "conditionOption" : "Outgoing"
                                    },
                                    {
                                            "conditionName" : "What is the purpose of this transaction? ",
                                            "conditionOption" : "Bank Internal fees, Charges, Credit Loans in BNPP and Corporate Actions"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Transaction fo bank internal fees, charges, credit loans in BNPP and corporate actions",
                            "agmtCode" : "TM25",
                            "signature" : false,
                            "remarks" : "Please elaborate on the details of expenses e.g. the type of expenses and when it was incurred, and attach supporting documents.",
                            "docID" : "15",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is the transaction incoming or outgoing",
                                            "conditionOption" : "Incoming"
                                    },
                                    {
                                            "conditionName" : "What is the purpose of this transaction? ",
                                            "conditionOption" : "Investment dividend in large amount or recurring pattern"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Receipt of investment dividend in large amount or recurring pattern",
                            "agmtCode" : "TM26",
                            "signature" : false,
                            "remarks" : "Please attach the investment contract or any legal documents to verify the source of funds e.g. legal/ contractual link between client and counterparty.",
                            "docID" : "16",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is the transaction incoming or outgoing",
                                            "conditionOption" : "Incoming"
                                    },
                                    {
                                            "conditionName" : "What is the purpose of this transaction? ",
                                            "conditionOption" : "Inheritance"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Inheritance",
                            "agmtCode" : "TM27",
                            "signature" : false,
                            "remarks" : "Please attach a signed copy of probate.",
                            "docID" : "17",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "Is the transaction incoming or outgoing",
                                            "conditionOption" : "Incoming"
                                    },
                                    {
                                            "conditionName" : "What is the purpose of this transaction? ",
                                            "conditionOption" : "Transactions related to money changes, alternative remittance systems or commercial flows"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Transactions related to money changes, alternative remittance systems or commercial flows",
                            "agmtCode" : "TM28",
                            "signature" : false,
                            "remarks" : "Transactions related to money changes, alternative remittance systems or commercial flows are strictly forbidden. As such, please reject if funds have not been credited or executed. Otherwise, escalate to MH/TH and Compliance.",
                            "docID" : "18",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "For supporting document(s) obtained and reviewed, do the details in the document(s) match with client's explanation?",
                                            "conditionOption" : "Yes"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "CAF Profile",
                            "agmtCode" : "TM30, 33",
                            "signature" : false,
                            "remarks" : "(1) Is the transaction in line with the expected transaction profile in CAF, or is it a known transaction? If NO, please consider updating CAF and escalating to TH/MH and compliance.<div>(2) Please elaborate, for example, the transaction is from the same bank account as documented in CAF; the transaction is known e.g. already recurring; or it is a one-off transaction, etc.</div>",
                            "docID" : "19",
                            "changed" : "0"
                    },
                    {
                            "conditions" : [
                                    {
                                            "conditionName" : "For supporting document(s) obtained and reviewed, do the details in the document(s) match with client's explanation?",
                                            "conditionOption" : "No"
                                    }
                            ],
                            "hasConditions": true,
                            "documentType": "Not Applicable",
                            "documentName" : "Supporting document(s) do not match with client's explanation",
                            "agmtCode" : "TM30",
                            "signature" : false,
                            "remarks" : "Please provide justifications and consider escalating to TH/MH and Compliance.",
                            "docID" : "20",
                            "changed" : "0"
                    }
            ],
            "optional" : [ ]
    },
    "legalDocuments" : {
            "mandatory" : [ ],
            "optional" : [ ]
    },
    "latestDocID" : "21",
    "clID" : "2",
    "version" : "1",
    "status" : "valid",
    "dateCreated" : "2018-11-08 00:08:26",
    "dateUpdated" : "2018-11-08 00:08:26",
    "createdBy" : "Chantelle Chiew",
    "updatedBy" : "Chantelle Chiew"
  }
])

// set up checklistLogs table
db.ChecklistLogs.drop()
db.ChecklistLogs.createIndex({ "clID": 1, "version": 1 }, { unique: true })

// set up checklist IDs
db.ChecklistCounter.drop()
db.ChecklistCounter.insertOne({ "_id": "clID", "sequence_value": 3 })

// set up tokens table
db.Tokens.drop()
db.Tokens.createIndex({ "username": 1, "token": 1 }, { unique: true })

// set up onboard IDs
db.OnboardCounter.drop()
db.OnboardCounter.insertOne({ "_id": "obID", "sequence_value": 0 })

// set up onboard table
db.Onboards.drop()

//set up notification IDs
db.NotificationCounter.drop()
db.NotificationCounter.insertOne({ "_id": "noID", "sequence_value": 0 })

//set up notification table
db.Notifications.drop()
db.createCollection("Notifications", {capped: true, max : 10000})
db.Notifications.createIndex({ "noID": 1, "clID": 1, "version": 1, "docID": 1 })

// set up agmt code table
db.AgmtCodes.drop()
db.AgmtCodes.createIndex({ "code": 1 }, { unique: true })

// set up knowledgeBase table
db.KnowledgeBase.drop()
db.KnowledgeBase.insertMany([
    {
        "qnID" : 1,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "What are the documents required for opening of Sub-Account?",
        "answer": "(1) Refer to COB website (under FORMS): (a) obtain the relevant Sub-Account Opening Form (Individual / Corporate), & (b) Open New Account in the same name as existing (For same booking centre) (2) Refer to COB website (under LEGAL & COMPLIANCE CHECKLISTS): (a) Regional Sub-Account Opening Checklist",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Account": ["Sub-Account"],
            "Document": ["Document"],
            "Action": ["Open"]
        }
    },
    {   
        "qnID" : 2,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "If an additional LPOA is added to an account, does the existing LPOA need to sign on the LPOA letter?",
        "answer": "Yes, if the existing LPOA is still valid. If you refer to the LPOA letter, the new letter will supersede and replace all authorisation letters previously issued by the client.",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Entity": ["LPOA"],
            "Document": ["LPOA letter"],
            "Account": ["Account"]
        }
    },
    {
        "qnID" : 3,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "If the new role of account A is in our existing account B, can we refer to his address proof from account B?",
        "answer": "Yes, if his address proof in account B is valid within 3 months and is also acceptable under current guidelines. If not, the address proof needs to be refreshed.",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Document": ["Address Proof"],
            "Account": ["Account","Existing Account"]
        }
    },
    {
        "qnID" : 4,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "What is the list of acceptable address proofs?",
        "answer": "Refer to REG 51 page A9 - A10",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
          "Document": ["Address Proof"]
        }
    },
    {
        "qnID" : 5,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "How many signers are needed for an account?",
        "answer": "Refer to DMS, Pearl or ICE",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Entity": ["Signers"],
            "Account": ["Account"]
        }
    },
    {
        "qnID" : 6,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "What documents are required to add authorized signers?",
        "answer": "Updated board resolution / change of mandate, Passport copy and address proof of the new authorised signer/s",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Document": ["Document"],
            "Entity": ["Authorized Signers"]
        }
    },
    {
        "qnID" : 7,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "What are the NDM/NCF documents?",
        "answer": "Please refer to REG 51 section 1.6.2",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "DocumentType": ["NDM","NCF"],
            "Document": ["Document"]
        }
    },
    {
        "qnID" : 8,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "Can a Relationship Manager open an account for another market?",
        "answer": "The RM will have to approach the respective market and obtain the necessary approval before proceeding.",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Entity": ["RM"],
            "Account": ["Account"],
            "Action": ["Open"]
        }
    },
    {
        "qnID" : 9,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "Where to find the new SOP for AOR?",
        "answer": "Please refer to the following link: http://b2e.group.echonet/cid1507835-pid13291-lid2/Account-Opening-and-recertification.html",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
          "Procedure": ["SOP","AOR"]
        }
    },
    {
        "qnID" : 10,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "What are indicators of dual nationality?",
        "answer": "Refer to REG51 page A8 and A41",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
          "Nationality": ["Dual Nationality"]
        }
    },
    {
        "qnID" : 11,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "Is the Insider representation form a Non-Deferrable Mandatory document?",
        "answer": "No it is not. Refer to the Account opening checklist on COB onboarding website.",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Document": ["Insider Representation Form", "Document"],
            "DocumentType": ["NDM"]
        }
    },
    {
        "qnID" : 12,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "Is IPQ an Non-Deferrable Mandatory document?",
        "answer": "No it is not. The account will not be blocked, but no investment will be allowed except for spot FX, Loan and deposit until the IPQ is received.",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Document": ["IPQ","Document"],
            "DocumentType": ["NDM"]
        }
    },
    {
        "qnID" : 13,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "Why do we need to confirm dual nationality if the client is a Singapore Citizen?",
        "answer": "Refer to REG 51 page A8 - A9",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
             "Nationality": ["Dual Nationality","Singapore Citizen"]
        }
    },
    {
        "qnID" : 14,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "Where can I get a copy of the MSCQ form?",
        "answer": "Refer to AOR 2.5",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Document": ["MSCQ"]
        }
    },
    {
        "qnID" : 15,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "What if the Client Acceptance Form has more telephone numbers than the Account Opening Booklet?",
        "answer": "The FO has to submit \"Change of Address/ Telephone numbers\" for deletion of extra phone numbers.",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Document": ["CAF","Account Opening Booklet"]
        }
    },
    {
        "qnID" : 16,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "Do we only submit pages of pages of AEOI Self Cert & IPQ that require client action?",
        "answer": "No, please submit the full set of documents.",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Document": ["AEOI","IPQ"]
        }
    },
    {
        "qnID" : 17,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "What if Address Proof submitted differs from Account Opening Booklet?",
        "answer": "Follow the address stated on the address proof.",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Document": ["Address Proof","Account Opening Booklet"]
        }
    },
    {
        "qnID" : 18,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "It is difficult to obtain address proof under individual's name in Dubai. Can a visitation call report by RM confirming the members live together suffice?",
        "answer": "We will still need them to provide a form of address proof together with the call report as a supplementary document, instead of a stand alone call report.",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Document": ["Call Report","Address Proof"],
            "Country": ["Dubai"],
            "Entity": ["RM"]
        }
    },
    {
        "qnID" : 19,
        "username" : "FO",
        "dateAsked": "2018-10-09 00:00",
        "CMusername" : "CM",
        "dateAnswered": "2018-10-09 00:00",
        "views" : 0,
        "question": "Who is eligible to act as a Legal Representative to sign off the UBO form?",
        "answer": "Legal representative refers to Authorized signatories as per mandate.",
        "refPages": [],
        "intent": "AccountOpeningInd",
        "entities": {
            "Entity": ["Legal Representative"],
            "Document": ["UBO"]
        }
    },
    {
        "question" : "What documents are needed for a change of directors?",
        "answer" : "Updated COI Passport copy and address proof of the new director/s.",
        "qnID" : 20,
        "username" : "FO",
        "dateAsked" : "2018-11-10 22:42",
        "CMusername" : "CM",
        "dateAnswered" : "2018-11-10 22:42",
        "views" : 0,
        "refPages": [],
        "entities" : {
          "Document" : ["Document"],
          "Entity" : ["Directors"],
          "Action" : ["Change"]
        },
        "intent" : "AccountOpeningCorp"
    },
    {
        "question" : "Can we open accounts for Non-Profit Organizations?",
        "answer" : "Please refer to below link and familiar yourself with the policy: <a href=\"https://socialbusiness-site.group.echonet/sites/proceduresgroupe/dirgroup/Lists/Referentiel/DispForm.aspx?ID=6252\">https://socialbusiness-site.group.echonet/sites/proceduresgroupe/dirgroup/Lists/Referentiel/DispForm.aspx?ID=6252</a>",
        "qnID" : 21,
        "username" : "FO",
        "dateAsked" : "2018-11-10 22:44",
        "CMusername" : "CM",
        "dateAnswered" : "2018-11-10 22:44",
        "views" : 0,
        "refPages": [],
        "entities" : {
          "Account" : ["Account"],
          "Action" : ["Open"],
          "Entity" : ["NPO"]
        },
        "intent" : "AccountOpeningCorp"
    },
    {
        "question" : "Who to original sight or certify corporate documents?",
        "answer" : "Refer to REG 51 page A18 - A19",
        "qnID" : 22,
        "username" : "FO",
        "dateAsked" : "2018-11-10 22:46",
        "CMusername" : "CM",
        "dateAnswered" : "2018-11-10 22:46",
        "views" : 0,
        "refPages": [],
        "entities" : {
          "Action" : ["Original Sight","Certify"],
          "Document" : ["Corporate Document"]
        },
        "intent" : "AccountOpeningCorp"
    },
    {
      "question" : "For account opening booklet, if a company has more than 4 individual directors what should I do?",
      "answer" : "Please fill up a list of director form for the remaining directors and get the director to sign off on that form. Please obtain a form from <a href=\"http://fps-co-asia.is.echonet/public/en/corporate-trust-pic-tpm\">http://fps-co-asia.is.echonet/public/en/corporate-trust-pic-tpm</a>",
      "qnID" : 23,
      "username" : "FO",
      "dateAsked" : "2018-11-10 22:53",
      "CMusername" : "CM",
      "dateAnswered" : "2018-11-10 22:53",
      "views" : 0,
      "entities" : {
        "Document" : ["Account Opening Booklet"],
        "Entity" : ["Directors","Company"]
      },
      "intent" : "AccountOpeningCorp"
    }
])

//set up Questions IDs
db.QuestionCounter.drop()
db.QuestionCounter.insertOne({ "_id": "qnID", "sequence_value": 24 })

//set up Questions notification IDs
db.QuestionNotificationCounter.drop()
db.QuestionNotificationCounter.insertOne({ "_id": "noID", "sequence_value": 1 })

//set up Questions notification table
db.QuestionNotifications.drop()
db.createCollection("QuestionNotifications", {capped: true, max : 10000})
db.QuestionNotifications.createIndex({ "noID": 1, "question": 1 })

//set up Answers notification IDs
db.AnswerNotificationCounter.drop()
db.AnswerNotificationCounter.insertOne({ "_id": "noID", "sequence_value": 1 })

//set up Answers notification table
db.AnswerNotifications.drop()
db.createCollection("AnswerNotifications", {capped: true, max : 10000})
db.AnswerNotifications.createIndex({ "noID": 1, "question": 1, "answer": 1 })

//set up QnA notification IDs
db.QnANotificationCounter.drop()
db.QnANotificationCounter.insertOne({ "_id": "noID", "sequence_value": 1 })

//set up QnA notification table
db.QnANotifications.drop()
db.createCollection("QnANotifications", {capped: true, max : 10000})
db.QnANotifications.createIndex({ "noID": 1})

//Set up Store intents table
db.StoreIntents.drop()
db.StoreIntents.insertMany(
    [
      {
        "text": "What are the documents required for opening of Sub-Account?",
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
        "intent": "AccountOpeningInd",
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
      },
      {
        "text" : "What documents are needed for a change of directors?",
        "intent" : "AccountOpeningCorp",
        "entities" : [
          {
            "start" : NumberInt(5),
            "end" : NumberInt(14),
            "value" : "Document",
            "entity" : "Document"
          },
          {
            "start" : NumberInt(42),
            "end" : NumberInt(51),
            "value" : "Directors",
            "entity" : "Entity"
          },
          {
            "start" : NumberInt(32),
            "end" : NumberInt(38),
            "value" : "Change",
            "entity" : "Action"
          }
        ]
      },
      {
        "text" : "What is needed if there is a change of directors?",
        "intent" : "AccountOpeningCorp",
        "entities" : [
          {
            "start" : NumberInt(39),
            "end" : NumberInt(48),
            "value" : "Directors",
            "entity" : "Entity"
          },
          {
            "start" : NumberInt(29),
            "end" : NumberInt(35),
            "value" : "Change",
            "entity" : "Action"
          }
        ]
      },
      {
        "text" : "What are the necessary documents to change directors?",
        "intent" : "AccountOpeningCorp",
        "entities" : [
          {
            "start" : NumberInt(23),
            "end" : NumberInt(32),
            "value" : "Document",
            "entity" : "Document"
          },
          {
            "start" : NumberInt(43),
            "end" : NumberInt(52),
            "value" : "Directors",
            "entity" : "Entity"
          },
          {
            "start" : NumberInt(36),
            "end" : NumberInt(42),
            "value" : "Change",
            "entity" : "Action"
          }
        ]
      },
      {
        "text" : "Can we open accounts for Non-Profit Organizations?",
        "intent" : "AccountOpeningCorp",
        "entities" : [
          {
            "start" : NumberInt(12),
            "end" : NumberInt(20),
            "value" : "Account",
            "entity" : "Account"
          },
          {
            "start" : NumberInt(7),
            "end" : NumberInt(11),
            "value" : "Open",
            "entity" : "Action"
          },
          {
            "start" : NumberInt(25),
            "end" : NumberInt(49),
            "value" : "NPO",
            "entity" : "Entity"
          }
        ]
      },
      {
        "text" : "Who to original sight or certify corporate documents?",
        "intent" : "AccountOpeningCorp",
        "entities" : [
          {
            "start" : NumberInt(7),
            "end" : NumberInt(21),
            "value" : "Original Sight",
            "entity" : "Action"
          },
          {
            "start" : NumberInt(25),
            "end" : NumberInt(32),
            "value" : "Certify",
            "entity" : "Action"
          },
          {
            "start" : NumberInt(33),
            "end" : NumberInt(52),
            "value" : "Corporate Document",
            "entity" : "Document"
          }
        ]
      },
      {
        "text" : "Who needs to original sight corporate document?",
        "intent" : "AccountOpeningCorp",
        "entities" : [
          {
            "start" : NumberInt(13),
            "end" : NumberInt(27),
            "value" : "Original Sight",
            "entity" : "Action"
          },
          {
            "start" : NumberInt(28),
            "end" : NumberInt(46),
            "value" : "Corporate Document",
            "entity" : "Document"
          }
        ]
      },
      {
        "text" : "What are the procedures to certify corporate documents?",
        "intent" : "AccountOpeningCorp",
        "entities" : [
          {
            "start" : NumberInt(27),
            "end" : NumberInt(34),
            "value" : "Certify",
            "entity" : "Action"
          },
          {
            "start" : NumberInt(35),
            "end" : NumberInt(54),
            "value" : "Corporate Document",
            "entity" : "Document"
          }
        ]
      },
      {
        "text" : "For account opening booklet, if a company has more than 4 individual directors what should I do?",
        "intent" : "AccountOpeningCorp",
        "entities" : [
          {
            "start" : NumberInt(4),
            "end" : NumberInt(27),
            "value" : "Account Opening Booklet",
            "entity" : "Document"
          },
          {
            "start" : NumberInt(69),
            "end" : NumberInt(78),
            "value" : "Directors",
            "entity" : "Entity"
          },
          {
            "start" : NumberInt(34),
            "end" : NumberInt(41),
            "value" : "Company",
            "entity" : "Entity"
          }
        ]
      },
      {
        "text" : "What if a company has more than 4 individual directors?",
        "intent" : "AccountOpeningCorp",
        "entities" : [
          {
            "start" : NumberInt(10),
            "end" : NumberInt(17),
            "value" : "Company",
            "entity" : "Entity"
          },
          {
            "start" : NumberInt(45),
            "end" : NumberInt(54),
            "value" : "Directors",
            "entity" : "Entity"
          }
        ]
      },
      {
        "text" : "Can we open account for NPO?",
        "intent" : "AccountOpeningCorp",
        "entities" : [
          {
            "start" : NumberInt(12),
            "end" : NumberInt(19),
            "value" : "Account",
            "entity" : "Account"
          },
          {
            "start" : NumberInt(7),
            "end" : NumberInt(11),
            "value" : "Open",
            "entity" : "Action"
          },
          {
            "start" : NumberInt(24),
            "end" : NumberInt(27),
            "value" : "NPO",
            "entity" : "Entity"
          }
        ]
      },
      {
        "text" : "Where do I find information about opening of accounts for non-profit organizations?",
        "intent" : "AccountOpeningCorp",
        "entities" : [
          {
            "start" : NumberInt(34),
            "end" : NumberInt(41),
            "value" : "Open",
            "entity" : "Action"
          },
          {
            "start" : NumberInt(45),
            "end" : NumberInt(53),
            "value" : "Account",
            "entity" : "Account"
          },
          {
            "start" : NumberInt(58),
            "end" : NumberInt(82),
            "value" : "NPO",
            "entity" : "Entity"
          }
        ]
      }      
    ]
)