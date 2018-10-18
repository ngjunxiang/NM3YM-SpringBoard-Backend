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
db.Checklists.insertOne(
{
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
                                "documentName" : "ICE KYC Profile and Client Acceptance Form (including modifications since last CAC)",
                                "agmtCode" : "301",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "docID" : "0",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "FATCA Account Opening / Review Checklist (effective date : 1 July 2014)",
                                "agmtCode" : "285",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons and FATCA.&nbsp;<div><br></div><div>Please specify name of person(s) with US Indicia:<br></div>",
                                "docID" : "1",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "AEOI Individual Checklist (effective date : 1 Jan 2017)",
                                "agmtCode" : "189",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "docID" : "2",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Call Report",
                                "agmtCode" : "N.A.",
                                "signature" : false,
                                "remarks" : "<div>- Validated according to Bank's Standard</div><div>- Other than new account under existing relationship where face-to-face meeting has been conducted before and EAM account, the call report should demonstrate face-to-face meeting with account holders.</div><div>- Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div><div><br></div><div><br></div><div><div>□ Check that Call Report submitted was validated.</div><div>□ Check the Call Report that client was contacted within the past 1 year.</div><div>□ Check the Call Report indicate country and location for physical meeting.</div><div>□ Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div></div>",
                                "docID" : "3",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Clear unexpired Passport / ID copies or identification papers bearing clear photograph of accountholders",
                                "agmtCode" : "011",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "docID" : "62",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Proof(s) of Residential Address for all account holders and authorised signatories / LPOA",
                                "agmtCode" : "558",
                                "signature" : false,
                                "remarks" : "<div>- Bank staff to write \"original sighted\", staff's name, date and sign on the copy of the residential address proof, OR photocopy to be certified by suitable certifier*.</div><div>- Evidence should be issued within the last 3 months.&nbsp;</div><div>- Address proof and ID doc have to be 2 separate document.</div><div><br>□ Translation is required for non English document.<br></div>",
                                "docID" : "63",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "FATCA/AEOI self certification (effective date : 1 Jan 2017)",
                                "agmtCode" : "127 / 245",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons, FATCA and AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "docID" : "64",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "W9 - US Person declared with the IRS and Annex 2 , 3 or 4 (Whichever is appropriate). ",
                                "agmtCode" : "212",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "65",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "W8 - BEN  Foreign Person for US Fisc (For Treaty claim required or to cure US Indicia )",
                                "agmtCode" : "202 / 208",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "66",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Declaration of Tax Conformity (DTC)",
                                "agmtCode" : "887",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "67",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Tax Compliance Indicator Questionnaire  - Applicable for all client(s)",
                                "agmtCode" : "659",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "68",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Tax Indicator Checklist  (for French resident client)",
                                "agmtCode" : "--",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "69",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "MSC Self-Declaration or MSCQ",
                                "agmtCode" : "282 / 283",
                                "signature" : false,
                                "remarks" : "Ensure that all fields have been filled.",
                                "docID" : "70",
                                "changed" : "1"
                        },
                        {
                                "documentName" : "MLRA Simulation Form",
                                "agmtCode" : "---",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "71",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Evidence of Source of Wealth",
                                "agmtCode" : "870",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "72",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Investment Profile Questionnaire",
                                "agmtCode" : "964",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "73",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Internet search ",
                                "agmtCode" : "----",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "74",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "VIGILANCE printouts for persons new to the Bank",
                                "agmtCode" : "- ",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "75",
                                "changed" : "0"
                        }
                ],
                "conditional" : [
                        {
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
                                "documentName" : "Vulnerable Customer Assessment Form",
                                "agmtCode" : "983 / 984",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "87",
                                "changed" : "0"
                        },
                        {
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
                                "documentName" : "Account Opening Book (V6)",
                                "agmtCode" : "677",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "31",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Letter of Authority",
                                "agmtCode" : "333",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "32",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Risk Disclosure Statement (RDS)",
                                "agmtCode" : "302",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "33",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Derivative Master Agreement (DMA)",
                                "agmtCode" : "585",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "34",
                                "changed" : "0"
                        }
                ],
                "conditional" : [
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
                                "documentName" : "Consent Letter for Referred Clients on Business Introducer referral fees",
                                "agmtCode" : "-",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "For referred client whose BI had signed agreement with WM HK branch or WM SG branch with HK referring activities",
                                "docID" : "41",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Email Indemnity",
                                "agmtCode" : "029",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "42",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Discretionary Portfolio Management Agreement",
                                "agmtCode" : "002",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "For DPM Service Only",
                                "docID" : "43",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Letter of Instruction and Indemnity (Special Mailing Request) ",
                                "agmtCode" : "892 / 894 / 896",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "Check the provided reason for applying Special Mail service",
                                "docID" : "44",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Letter to Open Subsequent Account",
                                "agmtCode" : "313",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "45",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Internet Services Asia e-Banking",
                                "agmtCode" : "048",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "Incorporated in Account Opening Book",
                                "docID" : "46",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Letter of Instructions & Indemnity (e-Document)",
                                "agmtCode" : "898",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "In Standard Bank Format only.",
                                "docID" : "47",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Limited Power of Attorney (No Fund Transfer Out)",
                                "agmtCode" : "555",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "In Standard Bank Format only.",
                                "docID" : "48",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Power of Attorney for Authorised Signatory",
                                "agmtCode" : "013 / 040",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "Incorporated in Account Opening Book.",
                                "docID" : "49",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Subscription of Equity Linked Notes (\"ELN\")",
                                "agmtCode" : "689",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "50",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Subscription of Daily Accrual Callable Notes (\"DAC\")",
                                "agmtCode" : "690",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "51",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgmentc for Investments in Knock-Out Forward Options & Reverse Knock-Out Forward Options (collectively referred to as \"Forward Options\")",
                                "agmtCode" : "691",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V3.2b (15092017)",
                                "docID" : "52",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Investments in Fixed Coupon Callable Notes (\"FCN\")",
                                "agmtCode" : "692",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "53",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Dual Currency Investments (\"DCI\")",
                                "agmtCode" : "693",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V2.2 (26052017)",
                                "docID" : "54",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Investments in FX Accumulator Forwards",
                                "agmtCode" : "694",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V2.2 (26052017)",
                                "docID" : "55",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Commodity Linked Investments (\"CLI\")",
                                "agmtCode" : "695",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V2.2 (26052017)",
                                "docID" : "56",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Option (OTC and Listed)",
                                "agmtCode" : "696",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "57",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Contingent Convertible Bonds (\"Coco Bonds\") Transactions",
                                "agmtCode" : "747",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "58",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Non-HK Resident Declaration Form (for open CNY Account)",
                                "agmtCode" : "629",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "59",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Request for open CNY Account Form (for HKID Holders)",
                                "agmtCode" : "584",
                                "signature" : false,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "60",
                                "changed" : "0"
                        },
                        {
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
        "dateCreated" : "2018-09-17 15:00:53",
        "dateUpdated" : "2018-10-09 11:00:38",
        "createdBy" : "Randy Lai YongHao",
        "updatedBy" : "Randy Lai YongHao"
}
)


// set up checklistLigs table
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
                                "documentName" : "ICE KYC Profile and Client Acceptance Form (including modifications since last CAC)",
                                "agmtCode" : "301",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "docID" : "0",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "FATCA Account Opening / Review Checklist (effective date : 1 July 2014)",
                                "agmtCode" : "285",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons and FATCA.&nbsp;<div><br></div><div>Please specify name of person(s) with US Indicia:<br></div>",
                                "docID" : "1",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "AEOI Individual Checklist (effective date : 1 Jan 2017)",
                                "agmtCode" : "189",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "docID" : "2",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Call Report",
                                "agmtCode" : "N.A.",
                                "signature" : false,
                                "remarks" : "<div>- Validated according to Bank's Standard</div><div>- Other than new account under existing relationship where face-to-face meeting has been conducted before and EAM account, the call report should demonstrate face-to-face meeting with account holders.</div><div>- Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div><div><br></div><div><br></div><div><div>□ Check that Call Report submitted was validated.</div><div>□ Check the Call Report that client was contacted within the past 1 year.</div><div>□ Check the Call Report indicate country and location for physical meeting.</div><div>□ Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div></div>",
                                "docID" : "3",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Clear unexpired Passport / ID copies or identification papers bearing clear photograph of accountholders",
                                "agmtCode" : "011",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "docID" : "62",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Proof(s) of Residential Address for all account holders and authorised signatories / LPOA",
                                "agmtCode" : "558",
                                "signature" : false,
                                "remarks" : "<div>- Bank staff to write \"original sighted\", staff's name, date and sign on the copy of the residential address proof, OR photocopy to be certified by suitable certifier*.</div><div>- Evidence should be issued within the last 3 months.&nbsp;</div><div>- Address proof and ID doc have to be 2 separate document.</div><div><br>□ Translation is required for non English document.<br></div>",
                                "docID" : "63",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "FATCA/AEOI self certification (effective date : 1 Jan 2017)",
                                "agmtCode" : "127 / 245",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons, FATCA and AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "docID" : "64",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "W9 - US Person declared with the IRS and Annex 2 , 3 or 4 (Whichever is appropriate). ",
                                "agmtCode" : "212",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "65",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "W8 - BEN  Foreign Person for US Fisc (For Treaty claim required or to cure US Indicia )",
                                "agmtCode" : "202 / 208",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "66",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Declaration of Tax Conformity (DTC)",
                                "agmtCode" : "887",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "67",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Tax Compliance Indicator Questionnaire  - Applicable for all client(s)",
                                "agmtCode" : "659",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "68",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Tax Indicator Checklist  (for French resident client)",
                                "agmtCode" : "--",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "69",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "MSC Self-Declaration or MSCQ",
                                "agmtCode" : "282 / 283",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "70",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "MLRA Simulation Form",
                                "agmtCode" : "---",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "71",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Evidence of Source of Wealth",
                                "agmtCode" : "870",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "72",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Investment Profile Questionnaire",
                                "agmtCode" : "964",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "73",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Internet search ",
                                "agmtCode" : "----",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "74",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "VIGILANCE printouts for persons new to the Bank",
                                "agmtCode" : "- ",
                                "signature" : true,
                                "remarks" : "",
                                "docID" : "75",
                                "changed" : "0"
                        }
                ],
                "conditional" : [
                        {
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
                                "documentName" : "Vulnerable Customer Assessment Form",
                                "agmtCode" : "983 / 984",
                                "signature" : false,
                                "remarks" : "",
                                "docID" : "87",
                                "changed" : "0"
                        },
                        {
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
                                "documentName" : "Account Opening Book (V6)",
                                "agmtCode" : "677",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "31",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Letter of Authority",
                                "agmtCode" : "333",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "32",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Risk Disclosure Statement (RDS)",
                                "agmtCode" : "302",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "33",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Derivative Master Agreement (DMA)",
                                "agmtCode" : "585",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "34",
                                "changed" : "0"
                        }
                ],
                "conditional" : [
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
                                "documentName" : "Consent Letter for Referred Clients on Business Introducer referral fees",
                                "agmtCode" : "-",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "For referred client whose BI had signed agreement with WM HK branch or WM SG branch with HK referring activities",
                                "docID" : "41",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Email Indemnity",
                                "agmtCode" : "029",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "42",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Discretionary Portfolio Management Agreement",
                                "agmtCode" : "002",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "For DPM Service Only",
                                "docID" : "43",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Letter of Instruction and Indemnity (Special Mailing Request) ",
                                "agmtCode" : "892 / 894 / 896",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "Check the provided reason for applying Special Mail service",
                                "docID" : "44",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Letter to Open Subsequent Account",
                                "agmtCode" : "313",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "45",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Internet Services Asia e-Banking",
                                "agmtCode" : "048",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "Incorporated in Account Opening Book",
                                "docID" : "46",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Letter of Instructions & Indemnity (e-Document)",
                                "agmtCode" : "898",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "In Standard Bank Format only.",
                                "docID" : "47",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Limited Power of Attorney (No Fund Transfer Out)",
                                "agmtCode" : "555",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "In Standard Bank Format only.",
                                "docID" : "48",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Power of Attorney for Authorised Signatory",
                                "agmtCode" : "013 / 040",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "Incorporated in Account Opening Book.",
                                "docID" : "49",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Subscription of Equity Linked Notes (\"ELN\")",
                                "agmtCode" : "689",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "50",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Subscription of Daily Accrual Callable Notes (\"DAC\")",
                                "agmtCode" : "690",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "51",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgmentc for Investments in Knock-Out Forward Options & Reverse Knock-Out Forward Options (collectively referred to as \"Forward Options\")",
                                "agmtCode" : "691",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V3.2b (15092017)",
                                "docID" : "52",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Investments in Fixed Coupon Callable Notes (\"FCN\")",
                                "agmtCode" : "692",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "53",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Dual Currency Investments (\"DCI\")",
                                "agmtCode" : "693",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V2.2 (26052017)",
                                "docID" : "54",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Investments in FX Accumulator Forwards",
                                "agmtCode" : "694",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V2.2 (26052017)",
                                "docID" : "55",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Commodity Linked Investments (\"CLI\")",
                                "agmtCode" : "695",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V2.2 (26052017)",
                                "docID" : "56",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Option (OTC and Listed)",
                                "agmtCode" : "696",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "V1.2 (26052017)",
                                "docID" : "57",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Acknowledgement for Contingent Convertible Bonds (\"Coco Bonds\") Transactions",
                                "agmtCode" : "747",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "58",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Non-HK Resident Declaration Form (for open CNY Account)",
                                "agmtCode" : "629",
                                "signature" : true,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "59",
                                "changed" : "0"
                        },
                        {
                                "documentName" : "Request for open CNY Account Form (for HKID Holders)",
                                "agmtCode" : "584",
                                "signature" : false,
                                "canWaiver" : false,
                                "remarks" : "",
                                "docID" : "60",
                                "changed" : "0"
                        },
                        {
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
        "createdBy" : "Randy Lai YongHao",
        "updatedBy" : "Randy Lai YongHao"
}
)

// set up checklist IDs
db.ChecklistCounter.insertOne({ "_id": "clID", "sequence_value": 1 })

// set up tokens table
db.Tokens.createIndex({ "username": 1, "token": 1 }, { unique: true })

// set up onboard IDs
db.OnboardCounter.insertOne({ "_id": "obID", "sequence_value": 5 })

// set up onboard table
db.Onboards.createIndex({ "clientName": 1, "RMName": 1, "dateCreated": 1 }, { unique: true })

// insert into onboards
db.Onboards.insertMany([
	{
        "_id" : ObjectId("5bbc1392073526264465e164"),
        "clID" : "0",
        "complianceDocuments" : {
                "mandatory" : [
                        {
                                "documentName" : "ICE KYC Profile and Client Acceptance Form (including modifications since last CAC)",
                                "agmtCode" : "301",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "0"
                        },
                        {
                                "documentName" : "FATCA Account Opening / Review Checklist (effective date : 1 July 2014)",
                                "agmtCode" : "285",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons and FATCA.&nbsp;<div><br></div><div>Please specify name of person(s) with US Indicia:<br></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "1"
                        },
                        {
                                "documentName" : "AEOI Individual Checklist (effective date : 1 Jan 2017)",
                                "agmtCode" : "189",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "2"
                        },
                        {
                                "documentName" : "Call Report",
                                "agmtCode" : "N.A.",
                                "signature" : false,
                                "remarks" : "<div>- Validated according to Bank's Standard</div><div>- Other than new account under existing relationship where face-to-face meeting has been conducted before and EAM account, the call report should demonstrate face-to-face meeting with account holders.</div><div>- Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div><div><br></div><div><br></div><div><div>□ Check that Call Report submitted was validated.</div><div>□ Check the Call Report that client was contacted within the past 1 year.</div><div>□ Check the Call Report indicate country and location for physical meeting.</div><div>□ Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "3"
                        },
                        {
                                "documentName" : "Clear unexpired Passport / ID copies or identification papers bearing clear photograph of accountholders",
                                "agmtCode" : "011",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "62"
                        },
                        {
                                "documentName" : "Proof(s) of Residential Address for all account holders and authorised signatories / LPOA",
                                "agmtCode" : "558",
                                "signature" : false,
                                "remarks" : "<div>- Bank staff to write \"original sighted\", staff's name, date and sign on the copy of the residential address proof, OR photocopy to be certified by suitable certifier*.</div><div>- Evidence should be issued within the last 3 months.&nbsp;</div><div>- Address proof and ID doc have to be 2 separate document.</div><div><br>□ Translation is required for non English document.<br></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "63"
                        },
                        {
                                "documentName" : "FATCA/AEOI self certification (effective date : 1 Jan 2017)",
                                "agmtCode" : "127 / 245",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons, FATCA and AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "64"
                        },
                        {
                                "documentName" : "W9 - US Person declared with the IRS and Annex 2 , 3 or 4 (Whichever is appropriate). ",
                                "agmtCode" : "212",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "65"
                        },
                        {
                                "documentName" : "W8 - BEN  Foreign Person for US Fisc (For Treaty claim required or to cure US Indicia )",
                                "agmtCode" : "202 / 208",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "66"
                        },
                        {
                                "documentName" : "Declaration of Tax Conformity (DTC)",
                                "agmtCode" : "887",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "67"
                        },
                        {
                                "documentName" : "Tax Compliance Indicator Questionnaire  - Applicable for all client(s)",
                                "agmtCode" : "659",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "68"
                        },
                        {
                                "documentName" : "Tax Indicator Checklist  (for French resident client)",
                                "agmtCode" : "--",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "69"
                        },
                        {
                                "documentName" : "MSC Self-Declaration or MSCQ",
                                "agmtCode" : "282 / 283",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "70"
                        },
                        {
                                "documentName" : "MLRA Simulation Form",
                                "agmtCode" : "---",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "71"
                        },
                        {
                                "documentName" : "Evidence of Source of Wealth",
                                "agmtCode" : "870",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "72"
                        },
                        {
                                "documentName" : "Investment Profile Questionnaire",
                                "agmtCode" : "964",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "73"
                        },
                        {
                                "documentName" : "Internet search ",
                                "agmtCode" : "----",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "74"
                        },
                        {
                                "documentName" : "VIGILANCE printouts for persons new to the Bank",
                                "agmtCode" : "- ",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "75"
                        }
                ],
                "conditional" : [
                        {
                                "documentName" : "Client Request Evidence Form",
                                "conditions" : [
                                        {
                                                "conditionName" : "Place of Residence",
                                                "conditionOption" : "Taiwan"
                                        }
                                ],
                                "agmtCode" : "855",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "78"
                        },
                        {
                                "documentName" : "Accredited Investor ",
                                "conditions" : [
                                        {
                                                "conditionName" : "SG booking Personal Investor",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "agmtCode" : "-   ",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "84"
                        }
                ],
                "optional" : [
                        {
                                "documentName" : "Vulnerable Customer Assessment Form",
                                "agmtCode" : "983 / 984",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "87"
                        },
                        {
                                "documentName" : "Other documents as required by the Bank",
                                "agmtCode" : "-------",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "88"
                        }
                ]
        },
        "conditions" : [
                {
                        "conditionName" : "Booking Centre",
                        "conditionOption" : "Hong Kong"
                },
                {
                        "conditionName" : "Business Centre",
                        "conditionOption" : "Singapore"
                },
                {
                        "conditionName" : "Place of Residence",
                        "conditionOption" : "Taiwan"
                },
                {
                        "conditionName" : "Insider of Listed Company",
                        "conditionOption" : "No"
                },
                {
                        "conditionName" : "SG booking Personal Investor",
                        "conditionOption" : "Yes"
                },
                {
                        "conditionName" : "Employees of HKMA/SFC ",
                        "conditionOption" : "No"
                },
                {
                        "conditionName" : "Walk-In Client",
                        "conditionOption" : "No"
                }
        ],
        "dateCreated" : "2018-10-09 10:33:53",
        "legalDocuments" : {
                "mandatory" : [
                        {
                                "documentName" : "Account Opening Book (V6)",
                                "agmtCode" : "677",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "31"
                        },
                        {
                                "documentName" : "Letter of Authority",
                                "agmtCode" : "333",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "32"
                        },
                        {
                                "documentName" : "Risk Disclosure Statement (RDS)",
                                "agmtCode" : "302",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "33"
                        },
                        {
                                "documentName" : "Derivative Master Agreement (DMA)",
                                "agmtCode" : "585",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "34"
                        }
                ],
                "conditional" : [
                        {
                                "documentName" : "Personal Data Privacy Ordinance (Wef Mar 2013) / Direct Marketing Opt Out",
                                "conditions" : [
                                        {
                                                "conditionName" : "Booking Centre",
                                                "conditionOption" : "Hong Kong"
                                        }
                                ],
                                "agmtCode" : "554/679",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "35"
                        },
                        {
                                "documentName" : "Waiver in relation to requirements under Securities and Futures (Contract Notes, Statements of Account and Receipts) Rules ",
                                "conditions" : [
                                        {
                                                "conditionName" : "Booking Centre",
                                                "conditionOption" : "Hong Kong"
                                        }
                                ],
                                "agmtCode" : "042",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "36"
                        },
                        {
                                "documentName" : "Notice to Customers  Acknowledgement - Deposit Covered by the Deposit Protection Scheme Form",
                                "conditions" : [
                                        {
                                                "conditionName" : "Booking Centre",
                                                "conditionOption" : "Hong Kong"
                                        }
                                ],
                                "agmtCode" : "760",
                                "signature" : false,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "37"
                        },
                        {
                                "documentName" : "Financial Intermediary Agreement",
                                "conditions" : [
                                        {
                                                "conditionName" : "Booking Centre",
                                                "conditionOption" : "Hong Kong"
                                        }
                                ],
                                "agmtCode" : "337",
                                "signature" : true,
                                "remarks" : "Ref: FIN INT AGT",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "38"
                        },
                        {
                                "documentName" : "Capital Investment Entrant Scheme",
                                "conditions" : [
                                        {
                                                "conditionName" : "Booking Centre",
                                                "conditionOption" : "Hong Kong"
                                        }
                                ],
                                "agmtCode" : "750",
                                "signature" : false,
                                "remarks" : "Ensure that the Financial Intermediary Agreement is in place\n\n",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "39"
                        }
                ],
                "optional" : [
                        {
                                "documentName" : "Consent Letter for Referred Clients on Business Introducer referral fees",
                                "agmtCode" : "-",
                                "signature" : true,
                                "remarks" : "For referred client whose BI had signed agreement with WM HK branch or WM SG branch with HK referring activities",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "41"
                        },
                        {
                                "documentName" : "Email Indemnity",
                                "agmtCode" : "029",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "42"
                        },
                        {
                                "documentName" : "Discretionary Portfolio Management Agreement",
                                "agmtCode" : "002",
                                "signature" : true,
                                "remarks" : "For DPM Service Only",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "43"
                        },
                        {
                                "documentName" : "Letter of Instruction and Indemnity (Special Mailing Request) ",
                                "agmtCode" : "892 / 894 / 896",
                                "signature" : true,
                                "remarks" : "Check the provided reason for applying Special Mail service",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "44"
                        },
                        {
                                "documentName" : "Letter to Open Subsequent Account",
                                "agmtCode" : "313",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "45"
                        },
                        {
                                "documentName" : "Internet Services Asia e-Banking",
                                "agmtCode" : "048",
                                "signature" : true,
                                "remarks" : "Incorporated in Account Opening Book",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "46"
                        },
                        {
                                "documentName" : "Letter of Instructions & Indemnity (e-Document)",
                                "agmtCode" : "898",
                                "signature" : true,
                                "remarks" : "In Standard Bank Format only.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "47"
                        },
                        {
                                "documentName" : "Limited Power of Attorney (No Fund Transfer Out)",
                                "agmtCode" : "555",
                                "signature" : true,
                                "remarks" : "In Standard Bank Format only.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "48"
                        },
                        {
                                "documentName" : "Power of Attorney for Authorised Signatory",
                                "agmtCode" : "013 / 040",
                                "signature" : true,
                                "remarks" : "Incorporated in Account Opening Book.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "49"
                        },
                        {
                                "documentName" : "Acknowledgement for Subscription of Equity Linked Notes (\"ELN\")",
                                "agmtCode" : "689",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "50"
                        },
                        {
                                "documentName" : "Acknowledgement for Subscription of Daily Accrual Callable Notes (\"DAC\")",
                                "agmtCode" : "690",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "51"
                        },
                        {
                                "documentName" : "Acknowledgmentc for Investments in Knock-Out Forward Options & Reverse Knock-Out Forward Options (collectively referred to as \"Forward Options\")",
                                "agmtCode" : "691",
                                "signature" : true,
                                "remarks" : "V3.2b (15092017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "52"
                        },
                        {
                                "documentName" : "Acknowledgement for Investments in Fixed Coupon Callable Notes (\"FCN\")",
                                "agmtCode" : "692",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "53"
                        },
                        {
                                "documentName" : "Acknowledgement for Dual Currency Investments (\"DCI\")",
                                "agmtCode" : "693",
                                "signature" : true,
                                "remarks" : "V2.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "54"
                        },
                        {
                                "documentName" : "Acknowledgement for Investments in FX Accumulator Forwards",
                                "agmtCode" : "694",
                                "signature" : true,
                                "remarks" : "V2.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "55"
                        },
                        {
                                "documentName" : "Acknowledgement for Commodity Linked Investments (\"CLI\")",
                                "agmtCode" : "695",
                                "signature" : true,
                                "remarks" : "V2.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "56"
                        },
                        {
                                "documentName" : "Acknowledgement for Option (OTC and Listed)",
                                "agmtCode" : "696",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "57"
                        },
                        {
                                "documentName" : "Acknowledgement for Contingent Convertible Bonds (\"Coco Bonds\") Transactions",
                                "agmtCode" : "747",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "58"
                        },
                        {
                                "documentName" : "Non-HK Resident Declaration Form (for open CNY Account)",
                                "agmtCode" : "629",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "59"
                        },
                        {
                                "documentName" : "Request for open CNY Account Form (for HKID Holders)",
                                "agmtCode" : "584",
                                "signature" : false,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "60"
                        },
                        {
                                "documentName" : "China Stock Connect",
                                "agmtCode" : "856",
                                "signature" : true,
                                "remarks" : "PRC passport holder or person holding a resident identification card or eqv governament issued identification of Mainland China is not allow.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "61"
                        }
                ]
        },
        "name" : "Account Opening (Individual)",
        "obID" : "1",
        "progress" : 69,
        "version" : "1",
        "requiredFields" : [
                {
                        "Client Name" : "David Seattle "
                },
                {
                        "RM Name" : "Lim Pei Xuan"
                },
                {
                        "Account Number" : "123-4123-511"
                },
                {
                        "Date of Submission" : "02/10/2018"
                }
        ],
        "urgent" : {
                "error" : "Invalid Onboard ID"
        },
        "createdBy" : "Lim Pei Xuan"
}
{
        "_id" : ObjectId("5bbc13f4073526264465e167"),
        "clID" : "0",
        "name" : "Account Opening (Individual)",
        "version" : "1",
        "requiredFields" : [
                {
                        "Client Name" : "Low Chun Fatt"
                },
                {
                        "RM Name" : "Lim Pei Xuan"
                },
                {
                        "Account Number" : "231-21321-41"
                },
                {
                        "Date of Submission" : "04/10/2018"
                }
        ],
        "conditions" : [
                {
                        "conditionName" : "Booking Centre",
                        "conditionOption" : "Hong Kong"
                },
                {
                        "conditionName" : "Business Centre",
                        "conditionOption" : "Hong Kong"
                },
                {
                        "conditionName" : "Place of Residence",
                        "conditionOption" : "Hong Kong"
                },
                {
                        "conditionName" : "Insider of Listed Company",
                        "conditionOption" : "No"
                },
                {
                        "conditionName" : "SG booking Personal Investor",
                        "conditionOption" : "No"
                },
                {
                        "conditionName" : "Employees of HKMA/SFC ",
                        "conditionOption" : "No"
                },
                {
                        "conditionName" : "Walk-In Client",
                        "conditionOption" : "No"
                }
        ],
        "complianceDocuments" : {
                "mandatory" : [
                        {
                                "documentName" : "ICE KYC Profile and Client Acceptance Form (including modifications since last CAC)",
                                "agmtCode" : "301",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "0"
                        },
                        {
                                "documentName" : "FATCA Account Opening / Review Checklist (effective date : 1 July 2014)",
                                "agmtCode" : "285",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons and FATCA.&nbsp;<div><br></div><div>Please specify name of person(s) with US Indicia:<br></div>",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "1"
                        },
                        {
                                "documentName" : "AEOI Individual Checklist (effective date : 1 Jan 2017)",
                                "agmtCode" : "189",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "2"
                        },
                        {
                                "documentName" : "Call Report",
                                "agmtCode" : "N.A.",
                                "signature" : false,
                                "remarks" : "<div>- Validated according to Bank's Standard</div><div>- Other than new account under existing relationship where face-to-face meeting has been conducted before and EAM account, the call report should demonstrate face-to-face meeting with account holders.</div><div>- Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div><div><br></div><div><br></div><div><div>□ Check that Call Report submitted was validated.</div><div>□ Check the Call Report that client was contacted within the past 1 year.</div><div>□ Check the Call Report indicate country and location for physical meeting.</div><div>□ Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "3"
                        },
                        {
                                "documentName" : "Clear unexpired Passport / ID copies or identification papers bearing clear photograph of accountholders",
                                "agmtCode" : "011",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "62"
                        },
                        {
                                "documentName" : "Proof(s) of Residential Address for all account holders and authorised signatories / LPOA",
                                "agmtCode" : "558",
                                "signature" : false,
                                "remarks" : "<div>- Bank staff to write \"original sighted\", staff's name, date and sign on the copy of the residential address proof, OR photocopy to be certified by suitable certifier*.</div><div>- Evidence should be issued within the last 3 months.&nbsp;</div><div>- Address proof and ID doc have to be 2 separate document.</div><div><br>□ Translation is required for non English document.<br></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "63"
                        },
                        {
                                "documentName" : "FATCA/AEOI self certification (effective date : 1 Jan 2017)",
                                "agmtCode" : "127 / 245",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons, FATCA and AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "64"
                        },
                        {
                                "documentName" : "W9 - US Person declared with the IRS and Annex 2 , 3 or 4 (Whichever is appropriate). ",
                                "agmtCode" : "212",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "65"
                        },
                        {
                                "documentName" : "W8 - BEN  Foreign Person for US Fisc (For Treaty claim required or to cure US Indicia )",
                                "agmtCode" : "202 / 208",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "66"
                        },
                        {
                                "documentName" : "Declaration of Tax Conformity (DTC)",
                                "agmtCode" : "887",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "67"
                        },
                        {
                                "documentName" : "Tax Compliance Indicator Questionnaire  - Applicable for all client(s)",
                                "agmtCode" : "659",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "68"
                        },
                        {
                                "documentName" : "Tax Indicator Checklist  (for French resident client)",
                                "agmtCode" : "--",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "69"
                        },
                        {
                                "documentName" : "MSC Self-Declaration or MSCQ",
                                "agmtCode" : "282 / 283",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "70"
                        },
                        {
                                "documentName" : "MLRA Simulation Form",
                                "agmtCode" : "---",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "71"
                        },
                        {
                                "documentName" : "Evidence of Source of Wealth",
                                "agmtCode" : "870",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "72"
                        },
                        {
                                "documentName" : "Investment Profile Questionnaire",
                                "agmtCode" : "964",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "73"
                        },
                        {
                                "documentName" : "Internet search ",
                                "agmtCode" : "----",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "74"
                        },
                        {
                                "documentName" : "VIGILANCE printouts for persons new to the Bank",
                                "agmtCode" : "- ",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "75"
                        }
                ],
                "conditional" : [ ],
                "optional" : [
                        {
                                "documentName" : "Vulnerable Customer Assessment Form",
                                "agmtCode" : "983 / 984",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "87"
                        },
                        {
                                "documentName" : "Other documents as required by the Bank",
                                "agmtCode" : "-------",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "88"
                        }
                ]
        },
        "legalDocuments" : {
                "mandatory" : [
                        {
                                "documentName" : "Account Opening Book (V6)",
                                "agmtCode" : "677",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "31"
                        },
                        {
                                "documentName" : "Letter of Authority",
                                "agmtCode" : "333",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "32"
                        },
                        {
                                "documentName" : "Risk Disclosure Statement (RDS)",
                                "agmtCode" : "302",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "33"
                        },
                        {
                                "documentName" : "Derivative Master Agreement (DMA)",
                                "agmtCode" : "585",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "34"
                        }
                ],
                "conditional" : [
                        {
                                "documentName" : "Personal Data Privacy Ordinance (Wef Mar 2013) / Direct Marketing Opt Out",
                                "conditions" : [
                                        {
                                                "conditionName" : "Booking Centre",
                                                "conditionOption" : "Hong Kong"
                                        }
                                ],
                                "agmtCode" : "554/679",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "35"
                        },
                        {
                                "documentName" : "Waiver in relation to requirements under Securities and Futures (Contract Notes, Statements of Account and Receipts) Rules ",
                                "conditions" : [
                                        {
                                                "conditionName" : "Booking Centre",
                                                "conditionOption" : "Hong Kong"
                                        }
                                ],
                                "agmtCode" : "042",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "36"
                        },
                        {
                                "documentName" : "Notice to Customers  Acknowledgement - Deposit Covered by the Deposit Protection Scheme Form",
                                "conditions" : [
                                        {
                                                "conditionName" : "Booking Centre",
                                                "conditionOption" : "Hong Kong"
                                        }
                                ],
                                "agmtCode" : "760",
                                "signature" : false,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "37"
                        },
                        {
                                "documentName" : "Financial Intermediary Agreement",
                                "conditions" : [
                                        {
                                                "conditionName" : "Booking Centre",
                                                "conditionOption" : "Hong Kong"
                                        }
                                ],
                                "agmtCode" : "337",
                                "signature" : true,
                                "remarks" : "Ref: FIN INT AGT",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "38"
                        },
                        {
                                "documentName" : "Capital Investment Entrant Scheme",
                                "conditions" : [
                                        {
                                                "conditionName" : "Booking Centre",
                                                "conditionOption" : "Hong Kong"
                                        }
                                ],
                                "agmtCode" : "750",
                                "signature" : false,
                                "remarks" : "Ensure that the Financial Intermediary Agreement is in place\n\n",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "39"
                        }
                ],
                "optional" : [
                        {
                                "documentName" : "Consent Letter for Referred Clients on Business Introducer referral fees",
                                "agmtCode" : "-",
                                "signature" : true,
                                "remarks" : "For referred client whose BI had signed agreement with WM HK branch or WM SG branch with HK referring activities",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "41"
                        },
                        {
                                "documentName" : "Email Indemnity",
                                "agmtCode" : "029",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "42"
                        },
                        {
                                "documentName" : "Discretionary Portfolio Management Agreement",
                                "agmtCode" : "002",
                                "signature" : true,
                                "remarks" : "For DPM Service Only",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "43"
                        },
                        {
                                "documentName" : "Letter of Instruction and Indemnity (Special Mailing Request) ",
                                "agmtCode" : "892 / 894 / 896",
                                "signature" : true,
                                "remarks" : "Check the provided reason for applying Special Mail service",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "44"
                        },
                        {
                                "documentName" : "Letter to Open Subsequent Account",
                                "agmtCode" : "313",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "45"
                        },
                        {
                                "documentName" : "Internet Services Asia e-Banking",
                                "agmtCode" : "048",
                                "signature" : true,
                                "remarks" : "Incorporated in Account Opening Book",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "46"
                        },
                        {
                                "documentName" : "Letter of Instructions & Indemnity (e-Document)",
                                "agmtCode" : "898",
                                "signature" : true,
                                "remarks" : "In Standard Bank Format only.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "47"
                        },
                        {
                                "documentName" : "Limited Power of Attorney (No Fund Transfer Out)",
                                "agmtCode" : "555",
                                "signature" : true,
                                "remarks" : "In Standard Bank Format only.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "48"
                        },
                        {
                                "documentName" : "Power of Attorney for Authorised Signatory",
                                "agmtCode" : "013 / 040",
                                "signature" : true,
                                "remarks" : "Incorporated in Account Opening Book.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "49"
                        },
                        {
                                "documentName" : "Acknowledgement for Subscription of Equity Linked Notes (\"ELN\")",
                                "agmtCode" : "689",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "50"
                        },
                        {
                                "documentName" : "Acknowledgement for Subscription of Daily Accrual Callable Notes (\"DAC\")",
                                "agmtCode" : "690",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "51"
                        },
                        {
                                "documentName" : "Acknowledgmentc for Investments in Knock-Out Forward Options & Reverse Knock-Out Forward Options (collectively referred to as \"Forward Options\")",
                                "agmtCode" : "691",
                                "signature" : true,
                                "remarks" : "V3.2b (15092017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "52"
                        },
                        {
                                "documentName" : "Acknowledgement for Investments in Fixed Coupon Callable Notes (\"FCN\")",
                                "agmtCode" : "692",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "53"
                        },
                        {
                                "documentName" : "Acknowledgement for Dual Currency Investments (\"DCI\")",
                                "agmtCode" : "693",
                                "signature" : true,
                                "remarks" : "V2.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "54"
                        },
                        {
                                "documentName" : "Acknowledgement for Investments in FX Accumulator Forwards",
                                "agmtCode" : "694",
                                "signature" : true,
                                "remarks" : "V2.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "55"
                        },
                        {
                                "documentName" : "Acknowledgement for Commodity Linked Investments (\"CLI\")",
                                "agmtCode" : "695",
                                "signature" : true,
                                "remarks" : "V2.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "56"
                        },
                        {
                                "documentName" : "Acknowledgement for Option (OTC and Listed)",
                                "agmtCode" : "696",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "57"
                        },
                        {
                                "documentName" : "Acknowledgement for Contingent Convertible Bonds (\"Coco Bonds\") Transactions",
                                "agmtCode" : "747",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "58"
                        },
                        {
                                "documentName" : "Non-HK Resident Declaration Form (for open CNY Account)",
                                "agmtCode" : "629",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "59"
                        },
                        {
                                "documentName" : "Request for open CNY Account Form (for HKID Holders)",
                                "agmtCode" : "584",
                                "signature" : false,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "60"
                        },
                        {
                                "documentName" : "China Stock Connect",
                                "agmtCode" : "856",
                                "signature" : true,
                                "remarks" : "PRC passport holder or person holding a resident identification card or eqv governament issued identification of Mainland China is not allow.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "61"
                        }
                ]
        },
        "obID" : "2",
        "dateCreated" : "2018-10-09 10:35:32",
        "progress" : 74.1,
        "createdBy" : "Lim Pei Xuan"
}
{
        "_id" : ObjectId("5bbc1463073526264465e16a"),
        "clID" : "0",
        "name" : "Account Opening (Individual)",
        "version" : "1",
        "requiredFields" : [
                {
                        "Client Name" : "Hannah Baker "
                },
                {
                        "RM Name" : "Lim Pei Xuan"
                },
                {
                        "Account Number" : "123-2122-4123"
                },
                {
                        "Date of Submission" : "05/10/2018"
                }
        ],
        "conditions" : [
                {
                        "conditionName" : "Booking Centre",
                        "conditionOption" : "Singapore"
                },
                {
                        "conditionName" : "Business Centre",
                        "conditionOption" : "Singapore"
                },
                {
                        "conditionName" : "Place of Residence",
                        "conditionOption" : "Singapore"
                },
                {
                        "conditionName" : "Insider of Listed Company",
                        "conditionOption" : "Yes"
                },
                {
                        "conditionName" : "SG booking Personal Investor",
                        "conditionOption" : "Yes"
                },
                {
                        "conditionName" : "Employees of HKMA/SFC ",
                        "conditionOption" : "No"
                },
                {
                        "conditionName" : "Walk-In Client",
                        "conditionOption" : "No"
                }
        ],
        "complianceDocuments" : {
                "mandatory" : [
                        {
                                "documentName" : "ICE KYC Profile and Client Acceptance Form (including modifications since last CAC)",
                                "agmtCode" : "301",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "0"
                        },
                        {
                                "documentName" : "FATCA Account Opening / Review Checklist (effective date : 1 July 2014)",
                                "agmtCode" : "285",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons and FATCA.&nbsp;<div><br></div><div>Please specify name of person(s) with US Indicia:<br></div>",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "1"
                        },
                        {
                                "documentName" : "AEOI Individual Checklist (effective date : 1 Jan 2017)",
                                "agmtCode" : "189",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "2"
                        },
                        {
                                "documentName" : "Call Report",
                                "agmtCode" : "N.A.",
                                "signature" : false,
                                "remarks" : "<div>- Validated according to Bank's Standard</div><div>- Other than new account under existing relationship where face-to-face meeting has been conducted before and EAM account, the call report should demonstrate face-to-face meeting with account holders.</div><div>- Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div><div><br></div><div><br></div><div><div>□ Check that Call Report submitted was validated.</div><div>□ Check the Call Report that client was contacted within the past 1 year.</div><div>□ Check the Call Report indicate country and location for physical meeting.</div><div>□ Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "3"
                        },
                        {
                                "documentName" : "Clear unexpired Passport / ID copies or identification papers bearing clear photograph of accountholders",
                                "agmtCode" : "011",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "62"
                        },
                        {
                                "documentName" : "Proof(s) of Residential Address for all account holders and authorised signatories / LPOA",
                                "agmtCode" : "558",
                                "signature" : false,
                                "remarks" : "<div>- Bank staff to write \"original sighted\", staff's name, date and sign on the copy of the residential address proof, OR photocopy to be certified by suitable certifier*.</div><div>- Evidence should be issued within the last 3 months.&nbsp;</div><div>- Address proof and ID doc have to be 2 separate document.</div><div><br>□ Translation is required for non English document.<br></div>",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "63"
                        },
                        {
                                "documentName" : "FATCA/AEOI self certification (effective date : 1 Jan 2017)",
                                "agmtCode" : "127 / 245",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons, FATCA and AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "64"
                        },
                        {
                                "documentName" : "W9 - US Person declared with the IRS and Annex 2 , 3 or 4 (Whichever is appropriate). ",
                                "agmtCode" : "212",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "65"
                        },
                        {
                                "documentName" : "W8 - BEN  Foreign Person for US Fisc (For Treaty claim required or to cure US Indicia )",
                                "agmtCode" : "202 / 208",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "66"
                        },
                        {
                                "documentName" : "Declaration of Tax Conformity (DTC)",
                                "agmtCode" : "887",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "67"
                        },
                        {
                                "documentName" : "Tax Compliance Indicator Questionnaire  - Applicable for all client(s)",
                                "agmtCode" : "659",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "68"
                        },
                        {
                                "documentName" : "Tax Indicator Checklist  (for French resident client)",
                                "agmtCode" : "--",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "69"
                        },
                        {
                                "documentName" : "MSC Self-Declaration or MSCQ",
                                "agmtCode" : "282 / 283",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "70"
                        },
                        {
                                "documentName" : "MLRA Simulation Form",
                                "agmtCode" : "---",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "71"
                        },
                        {
                                "documentName" : "Evidence of Source of Wealth",
                                "agmtCode" : "870",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "72"
                        },
                        {
                                "documentName" : "Investment Profile Questionnaire",
                                "agmtCode" : "964",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "73"
                        },
                        {
                                "documentName" : "Internet search ",
                                "agmtCode" : "----",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "74"
                        },
                        {
                                "documentName" : "VIGILANCE printouts for persons new to the Bank",
                                "agmtCode" : "- ",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "75"
                        }
                ],
                "conditional" : [
                        {
                                "documentName" : "Insider Representation Form",
                                "conditions" : [
                                        {
                                                "conditionName" : "Insider of Listed Company",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "agmtCode" : "561",
                                "signature" : false,
                                "remarks" : "- applicable for client who is an insider of a listed company (ref. Procedures for Clients Connected to Listed Companies)",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "76"
                        },
                        {
                                "documentName" : "Accredited Investor ",
                                "conditions" : [
                                        {
                                                "conditionName" : "SG booking Personal Investor",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "agmtCode" : "-   ",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "84"
                        }
                ],
                "optional" : [
                        {
                                "documentName" : "Vulnerable Customer Assessment Form",
                                "agmtCode" : "983 / 984",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "87"
                        },
                        {
                                "documentName" : "Other documents as required by the Bank",
                                "agmtCode" : "-------",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "88"
                        }
                ]
        },
        "legalDocuments" : {
                "mandatory" : [
                        {
                                "documentName" : "Account Opening Book (V6)",
                                "agmtCode" : "677",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "31"
                        },
                        {
                                "documentName" : "Letter of Authority",
                                "agmtCode" : "333",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "32"
                        },
                        {
                                "documentName" : "Risk Disclosure Statement (RDS)",
                                "agmtCode" : "302",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "33"
                        },
                        {
                                "documentName" : "Derivative Master Agreement (DMA)",
                                "agmtCode" : "585",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "34"
                        }
                ],
                "conditional" : [
                        {
                                "documentName" : "Limited POA for Investment Purpose",
                                "conditions" : [
                                        {
                                                "conditionName" : "Booking Centre",
                                                "conditionOption" : "Singapore"
                                        }
                                ],
                                "agmtCode" : "598",
                                "signature" : true,
                                "remarks" : "For Third Party Manager's Account. In Standard Bank Format only.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "40"
                        }
                ],
                "optional" : [
                        {
                                "documentName" : "Consent Letter for Referred Clients on Business Introducer referral fees",
                                "agmtCode" : "-",
                                "signature" : true,
                                "remarks" : "For referred client whose BI had signed agreement with WM HK branch or WM SG branch with HK referring activities",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "41"
                        },
                        {
                                "documentName" : "Email Indemnity",
                                "agmtCode" : "029",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "42"
                        },
                        {
                                "documentName" : "Discretionary Portfolio Management Agreement",
                                "agmtCode" : "002",
                                "signature" : true,
                                "remarks" : "For DPM Service Only",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "43"
                        },
                        {
                                "documentName" : "Letter of Instruction and Indemnity (Special Mailing Request) ",
                                "agmtCode" : "892 / 894 / 896",
                                "signature" : true,
                                "remarks" : "Check the provided reason for applying Special Mail service",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "44"
                        },
                        {
                                "documentName" : "Letter to Open Subsequent Account",
                                "agmtCode" : "313",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "45"
                        },
                        {
                                "documentName" : "Internet Services Asia e-Banking",
                                "agmtCode" : "048",
                                "signature" : true,
                                "remarks" : "Incorporated in Account Opening Book",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "46"
                        },
                        {
                                "documentName" : "Letter of Instructions & Indemnity (e-Document)",
                                "agmtCode" : "898",
                                "signature" : true,
                                "remarks" : "In Standard Bank Format only.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "47"
                        },
                        {
                                "documentName" : "Limited Power of Attorney (No Fund Transfer Out)",
                                "agmtCode" : "555",
                                "signature" : true,
                                "remarks" : "In Standard Bank Format only.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "48"
                        },
                        {
                                "documentName" : "Power of Attorney for Authorised Signatory",
                                "agmtCode" : "013 / 040",
                                "signature" : true,
                                "remarks" : "Incorporated in Account Opening Book.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "49"
                        },
                        {
                                "documentName" : "Acknowledgement for Subscription of Equity Linked Notes (\"ELN\")",
                                "agmtCode" : "689",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "50"
                        },
                        {
                                "documentName" : "Acknowledgement for Subscription of Daily Accrual Callable Notes (\"DAC\")",
                                "agmtCode" : "690",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "51"
                        },
                        {
                                "documentName" : "Acknowledgmentc for Investments in Knock-Out Forward Options & Reverse Knock-Out Forward Options (collectively referred to as \"Forward Options\")",
                                "agmtCode" : "691",
                                "signature" : true,
                                "remarks" : "V3.2b (15092017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "52"
                        },
                        {
                                "documentName" : "Acknowledgement for Investments in Fixed Coupon Callable Notes (\"FCN\")",
                                "agmtCode" : "692",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "53"
                        },
                        {
                                "documentName" : "Acknowledgement for Dual Currency Investments (\"DCI\")",
                                "agmtCode" : "693",
                                "signature" : true,
                                "remarks" : "V2.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "54"
                        },
                        {
                                "documentName" : "Acknowledgement for Investments in FX Accumulator Forwards",
                                "agmtCode" : "694",
                                "signature" : true,
                                "remarks" : "V2.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "55"
                        },
                        {
                                "documentName" : "Acknowledgement for Commodity Linked Investments (\"CLI\")",
                                "agmtCode" : "695",
                                "signature" : true,
                                "remarks" : "V2.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "56"
                        },
                        {
                                "documentName" : "Acknowledgement for Option (OTC and Listed)",
                                "agmtCode" : "696",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "57"
                        },
                        {
                                "documentName" : "Acknowledgement for Contingent Convertible Bonds (\"Coco Bonds\") Transactions",
                                "agmtCode" : "747",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "58"
                        },
                        {
                                "documentName" : "Non-HK Resident Declaration Form (for open CNY Account)",
                                "agmtCode" : "629",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "59"
                        },
                        {
                                "documentName" : "Request for open CNY Account Form (for HKID Holders)",
                                "agmtCode" : "584",
                                "signature" : false,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "60"
                        },
                        {
                                "documentName" : "China Stock Connect",
                                "agmtCode" : "856",
                                "signature" : true,
                                "remarks" : "PRC passport holder or person holding a resident identification card or eqv governament issued identification of Mainland China is not allow.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "61"
                        }
                ]
        },
        "obID" : "3",
        "dateCreated" : "2018-10-09 10:37:23",
        "progress" : 32,
        "createdBy" : "Lim Pei Xuan"
}
{
        "_id" : ObjectId("5bbc14d1073526264465e16d"),
        "clID" : "0",
        "name" : "Account Opening (Individual)",
        "version" : "1",
        "requiredFields" : [
                {
                        "Client Name" : "Melvin Loong "
                },
                {
                        "RM Name" : "Lim Pei Xuan"
                },
                {
                        "Account Number" : "2323-41-231"
                },
                {
                        "Date of Submission" : "09/10/2018"
                }
        ],
        "conditions" : [
                {
                        "conditionName" : "Booking Centre",
                        "conditionOption" : "Singapore"
                },
                {
                        "conditionName" : "Business Centre",
                        "conditionOption" : "Singapore"
                },
                {
                        "conditionName" : "Place of Residence",
                        "conditionOption" : "Singapore"
                },
                {
                        "conditionName" : "Insider of Listed Company",
                        "conditionOption" : "Yes"
                },
                {
                        "conditionName" : "SG booking Personal Investor",
                        "conditionOption" : "Yes"
                },
                {
                        "conditionName" : "Employees of HKMA/SFC ",
                        "conditionOption" : "No"
                },
                {
                        "conditionName" : "Walk-In Client",
                        "conditionOption" : "Yes"
                }
        ],
        "complianceDocuments" : {
                "mandatory" : [
                        {
                                "documentName" : "ICE KYC Profile and Client Acceptance Form (including modifications since last CAC)",
                                "agmtCode" : "301",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "0"
                        },
                        {
                                "documentName" : "FATCA Account Opening / Review Checklist (effective date : 1 July 2014)",
                                "agmtCode" : "285",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons and FATCA.&nbsp;<div><br></div><div>Please specify name of person(s) with US Indicia:<br></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "1"
                        },
                        {
                                "documentName" : "AEOI Individual Checklist (effective date : 1 Jan 2017)",
                                "agmtCode" : "189",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "2"
                        },
                        {
                                "documentName" : "Call Report",
                                "agmtCode" : "N.A.",
                                "signature" : false,
                                "remarks" : "<div>- Validated according to Bank's Standard</div><div>- Other than new account under existing relationship where face-to-face meeting has been conducted before and EAM account, the call report should demonstrate face-to-face meeting with account holders.</div><div>- Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div><div><br></div><div><br></div><div><div>□ Check that Call Report submitted was validated.</div><div>□ Check the Call Report that client was contacted within the past 1 year.</div><div>□ Check the Call Report indicate country and location for physical meeting.</div><div>□ Check the face to face&nbsp; meeting date should be within below period.</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ High Risk / PEP&nbsp; : 1 year</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Medium Risk&nbsp; : 2 years</div><div>&nbsp; &nbsp; &nbsp; &nbsp; ○ Low Risk&nbsp; : 3 years</div></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "3"
                        },
                        {
                                "documentName" : "Clear unexpired Passport / ID copies or identification papers bearing clear photograph of accountholders",
                                "agmtCode" : "011",
                                "signature" : false,
                                "remarks" : "<div>NOTE :</div><div>- Individual profiles must be completed for all account holders and all persons with a role in the account i.e. Authorised Signatory/POA/LPOA (where applicable).</div><div><br></div><div>- RM signed CAF must be received by Client Management Team no later than 1 month after ICE print date.</div><div><br></div><div><div>□ Check that a complete set of CAF document was submitted which includes:</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ KYC Folder &amp; Account Root profile are submitted for the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○ Individual profiles of all account holders</div><div>□ Individual profile(s) of all persons with a role in the account</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Limited Power of Attorney&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ○ Authorised Signatory/POA&nbsp;</div><div><br></div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;○&nbsp; Persons who signed as BO in the Declaration of Beneficial Ownership&nbsp; &nbsp;&nbsp;</div><div>□ CAF signed and dated (within 1 month from submission) by RM</div><div><br></div></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "62"
                        },
                        {
                                "documentName" : "Proof(s) of Residential Address for all account holders and authorised signatories / LPOA",
                                "agmtCode" : "558",
                                "signature" : false,
                                "remarks" : "<div>- Bank staff to write \"original sighted\", staff's name, date and sign on the copy of the residential address proof, OR photocopy to be certified by suitable certifier*.</div><div>- Evidence should be issued within the last 3 months.&nbsp;</div><div>- Address proof and ID doc have to be 2 separate document.</div><div><br>□ Translation is required for non English document.<br></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "63"
                        },
                        {
                                "documentName" : "FATCA/AEOI self certification (effective date : 1 Jan 2017)",
                                "agmtCode" : "127 / 245",
                                "signature" : false,
                                "remarks" : "- Refer to policies relating to US Persons, FATCA and AEOI.<div><br></div><div>Please specify name of person(s) with the relevant Indicia:<br></div>",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "64"
                        },
                        {
                                "documentName" : "W9 - US Person declared with the IRS and Annex 2 , 3 or 4 (Whichever is appropriate). ",
                                "agmtCode" : "212",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "65"
                        },
                        {
                                "documentName" : "W8 - BEN  Foreign Person for US Fisc (For Treaty claim required or to cure US Indicia )",
                                "agmtCode" : "202 / 208",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "66"
                        },
                        {
                                "documentName" : "Declaration of Tax Conformity (DTC)",
                                "agmtCode" : "887",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "67"
                        },
                        {
                                "documentName" : "Tax Compliance Indicator Questionnaire  - Applicable for all client(s)",
                                "agmtCode" : "659",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "68"
                        },
                        {
                                "documentName" : "Tax Indicator Checklist  (for French resident client)",
                                "agmtCode" : "--",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "69"
                        },
                        {
                                "documentName" : "MSC Self-Declaration or MSCQ",
                                "agmtCode" : "282 / 283",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "70"
                        },
                        {
                                "documentName" : "MLRA Simulation Form",
                                "agmtCode" : "---",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "71"
                        },
                        {
                                "documentName" : "Evidence of Source of Wealth",
                                "agmtCode" : "870",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "72"
                        },
                        {
                                "documentName" : "Investment Profile Questionnaire",
                                "agmtCode" : "964",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "73"
                        },
                        {
                                "documentName" : "Internet search ",
                                "agmtCode" : "----",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "74"
                        },
                        {
                                "documentName" : "VIGILANCE printouts for persons new to the Bank",
                                "agmtCode" : "- ",
                                "signature" : true,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "75"
                        }
                ],
                "conditional" : [
                        {
                                "documentName" : "Insider Representation Form",
                                "conditions" : [
                                        {
                                                "conditionName" : "Insider of Listed Company",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "agmtCode" : "561",
                                "signature" : false,
                                "remarks" : "- applicable for client who is an insider of a listed company (ref. Procedures for Clients Connected to Listed Companies)",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "76"
                        },
                        {
                                "documentName" : "Accredited Investor ",
                                "conditions" : [
                                        {
                                                "conditionName" : "SG booking Personal Investor",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "agmtCode" : "-   ",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "84"
                        },
                        {
                                "documentName" : "Bank Reference Letter ",
                                "conditions" : [
                                        {
                                                "conditionName" : "Walk-In Client",
                                                "conditionOption" : "Yes"
                                        }
                                ],
                                "agmtCode" : "-    ",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "86"
                        }
                ],
                "optional" : [
                        {
                                "documentName" : "Vulnerable Customer Assessment Form",
                                "agmtCode" : "983 / 984",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "87"
                        },
                        {
                                "documentName" : "Other documents as required by the Bank",
                                "agmtCode" : "-------",
                                "signature" : false,
                                "remarks" : "",
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "88"
                        }
                ]
        },
        "legalDocuments" : {
                "mandatory" : [
                        {
                                "documentName" : "Account Opening Book (V6)",
                                "agmtCode" : "677",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "31"
                        },
                        {
                                "documentName" : "Letter of Authority",
                                "agmtCode" : "333",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "32"
                        },
                        {
                                "documentName" : "Risk Disclosure Statement (RDS)",
                                "agmtCode" : "302",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "33"
                        },
                        {
                                "documentName" : "Derivative Master Agreement (DMA)",
                                "agmtCode" : "585",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "34"
                        }
                ],
                "conditional" : [
                        {
                                "documentName" : "Limited POA for Investment Purpose",
                                "conditions" : [
                                        {
                                                "conditionName" : "Booking Centre",
                                                "conditionOption" : "Singapore"
                                        }
                                ],
                                "agmtCode" : "598",
                                "signature" : true,
                                "remarks" : "For Third Party Manager's Account. In Standard Bank Format only.",
                                "canWaiver" : false,
                                "checked" : true,
                                "changed" : "0",
                                "docID" : "40"
                        }
                ],
                "optional" : [
                        {
                                "documentName" : "Consent Letter for Referred Clients on Business Introducer referral fees",
                                "agmtCode" : "-",
                                "signature" : true,
                                "remarks" : "For referred client whose BI had signed agreement with WM HK branch or WM SG branch with HK referring activities",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "41"
                        },
                        {
                                "documentName" : "Email Indemnity",
                                "agmtCode" : "029",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "42"
                        },
                        {
                                "documentName" : "Discretionary Portfolio Management Agreement",
                                "agmtCode" : "002",
                                "signature" : true,
                                "remarks" : "For DPM Service Only",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "43"
                        },
                        {
                                "documentName" : "Letter of Instruction and Indemnity (Special Mailing Request) ",
                                "agmtCode" : "892 / 894 / 896",
                                "signature" : true,
                                "remarks" : "Check the provided reason for applying Special Mail service",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "44"
                        },
                        {
                                "documentName" : "Letter to Open Subsequent Account",
                                "agmtCode" : "313",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "45"
                        },
                        {
                                "documentName" : "Internet Services Asia e-Banking",
                                "agmtCode" : "048",
                                "signature" : true,
                                "remarks" : "Incorporated in Account Opening Book",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "46"
                        },
                        {
                                "documentName" : "Letter of Instructions & Indemnity (e-Document)",
                                "agmtCode" : "898",
                                "signature" : true,
                                "remarks" : "In Standard Bank Format only.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "47"
                        },
                        {
                                "documentName" : "Limited Power of Attorney (No Fund Transfer Out)",
                                "agmtCode" : "555",
                                "signature" : true,
                                "remarks" : "In Standard Bank Format only.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "48"
                        },
                        {
                                "documentName" : "Power of Attorney for Authorised Signatory",
                                "agmtCode" : "013 / 040",
                                "signature" : true,
                                "remarks" : "Incorporated in Account Opening Book.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "49"
                        },
                        {
                                "documentName" : "Acknowledgement for Subscription of Equity Linked Notes (\"ELN\")",
                                "agmtCode" : "689",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "50"
                        },
                        {
                                "documentName" : "Acknowledgement for Subscription of Daily Accrual Callable Notes (\"DAC\")",
                                "agmtCode" : "690",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "51"
                        },
                        {
                                "documentName" : "Acknowledgmentc for Investments in Knock-Out Forward Options & Reverse Knock-Out Forward Options (collectively referred to as \"Forward Options\")",
                                "agmtCode" : "691",
                                "signature" : true,
                                "remarks" : "V3.2b (15092017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "52"
                        },
                        {
                                "documentName" : "Acknowledgement for Investments in Fixed Coupon Callable Notes (\"FCN\")",
                                "agmtCode" : "692",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "53"
                        },
                        {
                                "documentName" : "Acknowledgement for Dual Currency Investments (\"DCI\")",
                                "agmtCode" : "693",
                                "signature" : true,
                                "remarks" : "V2.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "54"
                        },
                        {
                                "documentName" : "Acknowledgement for Investments in FX Accumulator Forwards",
                                "agmtCode" : "694",
                                "signature" : true,
                                "remarks" : "V2.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "55"
                        },
                        {
                                "documentName" : "Acknowledgement for Commodity Linked Investments (\"CLI\")",
                                "agmtCode" : "695",
                                "signature" : true,
                                "remarks" : "V2.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "56"
                        },
                        {
                                "documentName" : "Acknowledgement for Option (OTC and Listed)",
                                "agmtCode" : "696",
                                "signature" : true,
                                "remarks" : "V1.2 (26052017)",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "57"
                        },
                        {
                                "documentName" : "Acknowledgement for Contingent Convertible Bonds (\"Coco Bonds\") Transactions",
                                "agmtCode" : "747",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "58"
                        },
                        {
                                "documentName" : "Non-HK Resident Declaration Form (for open CNY Account)",
                                "agmtCode" : "629",
                                "signature" : true,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "59"
                        },
                        {
                                "documentName" : "Request for open CNY Account Form (for HKID Holders)",
                                "agmtCode" : "584",
                                "signature" : false,
                                "remarks" : "",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "60"
                        },
                        {
                                "documentName" : "China Stock Connect",
                                "agmtCode" : "856",
                                "signature" : true,
                                "remarks" : "PRC passport holder or person holding a resident identification card or eqv governament issued identification of Mainland China is not allow.",
                                "canWaiver" : false,
                                "checked" : false,
                                "changed" : "0",
                                "docID" : "61"
                        }
                ]
        },
        "obID" : "4",
        "dateCreated" : "2018-10-09 10:39:13",
        "progress" : 100,
        "createdBy" : "Lim Pei Xuan",
        "dateCompleted" : "2018-10-09 10:39:13"
}
])

// set up onboard checker urgent checker
db.OnboardUrgentChecker.createIndex({ "obID": 1, "Urgent": 1 }, { unique: true })

//set up notification IDs
db.NotificationCounter.insertOne({ "_id": "noID", "sequence_value": 3 })

//set up notification table
db.Notifications.createIndex({ "noID": 1, "clID": 1, "version": 1, "docID": 1 })

db.Notifications.insertMany([
	{
        "_id" : ObjectId("5bbc19d7073526264465e182"),
        "noID" : 1,
        "clID" : "0",
        "version" : "2",
        "docID" : "70",
        "RMs" : [
                {
                        "username" : "LimPeiXuan",
                        "changed" : 1,
                        "checked" : false
                },
                {
                        "username" : "NgJunXiang",
                        "changed" : 1,
                        "checked" : false
                }
        ],
        "usernameList" : [
                "LimPeiXuan",
                "NgJunXiang"
        ]
}
{
        "_id" : ObjectId("5bbc19d7073526264465e183"),
        "noID" : 2,
        "clID" : "0",
        "version" : "2",
        "docID" : "84",
        "RMs" : [
                {
                        "username" : "LimPeiXuan",
                        "changed" : 1,
                        "checked" : false
                },
                {
                        "username" : "NgJunXiang",
                        "changed" : 1,
                        "checked" : false
                }
        ],
        "usernameList" : [
                "LimPeiXuan",
                "NgJunXiang"
        ]
}
])

// set up agmt code table
db.AgmtCodes.createIndex({ "code": 1 }, { unique: true })

// set up knowledgeBase table
db.KnowledgeBase.insertMany([
    {
        "qnID" : 1,
        "username" : "LimPeiXuan",
        "question": "What are the documents required for opening of Sub-Account?",
        "answer": "(1) Refer to COB website (under FORMS): (a) obtain the relevant Sub-Account Opening Form (Individual / Corporate), & (b) Open New Account in the same name as existing (For same booking centre) (2) Refer to COB website (under LEGAL & COMPLIANCE CHECKLISTS): (a) Regional Sub-Account Opening Checklist",
        "intent": "AccountOpeningIndDocuments",
        "entities": {
            "Account": ["Sub-Account"],
            "Document": ["Document"],
            "Action": ["open"]
        }
    },
    {   
        "qnID" : 2,
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
        "question": "What is the list of acceptable address proofs?",
        "answer": "Refer to REG 51 page A9 - A10",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
          "Document": ["Address Proof"]
        }
    },
    {
        "qnID" : 5,
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
        "question": "Where to find the new SOP for AOR?",
        "answer": "Please refer to the following link: http://b2e.group.echonet/cid1507835-pid13291-lid2/Account-Opening-and-recertification.html",
        "intent": "AccountOpeningInfo",
        "entities": {
          "Proced   ure": ["SOP","AOR"]
        }
    },
    {
        "qnID" : 10,
        "question": "What are indicators of dual nationality?",
        "answer": "Refer to REG51 page A8 and A41",
        "intent": "AccountOpeningInfo",
        "entities": {
          "Nat  ionality": ["Dual Nationality"]
        }
    },
    {
        "qnID" : 11,
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
        "question": "Why do we need to confirm dual nationality if the client is a Singapore Citizen?",
        "answer": "Refer to REG 51 page A8 - A9",
        "intent": "AccountOpeningInfo",
        "entities": {
             "Nationality": ["Dual Nationality","Singapore Citizen"]
        }
    },
    {
        "qnID" : 14,
        "question": "Where can I get a copy of the MSCQ form?",
        "answer": "Refer to AOR 2.5",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
            "Document": ["MSCQ"]
        }
    },
    {
        "qnID" : 15,
        "question": "What if the Client Acceptance Form has more telephone numbers than the Account Opening Booklet?",
        "answer": "The FO has to submit \"Change of Address/ Telephone numbers\" for deletion of extra phone numbers.",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
            "Document": ["CAF","Account Opening Booklet"]
        }
    },
    {"qnID" : 16,
        "question": "Do we only submit pages of pages of AEOI Self Cert & IPQ that require client action?",
        "answer": "No, please submit the full set of documents.",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
            "Document": ["AEOI","IPQ"]
        }
    },
    {"qnID" : 17,
        "question": "What if Address Proof submitted differs from Account Opening Booklet?",
        "answer": "Follow the address stated on the address proof.",
        "intent": "AccountOpeningIndDocumentInfo",
        "entities": {
            "Document": ["Address Proof","Account Opening Booklet"]
        }
    },
    {
        "qnID" : 18,
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