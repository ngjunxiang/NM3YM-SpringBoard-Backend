// reset database
use SpringBoard
db.dropDatabase()

// set up users table
db.Users.createIndex({ "username": 1 }, { unique: true })
db.Users.insertMany([
    { "username": "admin", "password": "$argon2i$v=19$m=512,t=2,p=2$DnsATHr7veqT+VB1hl6x8g$B9u6dgxpfnMnPT41sMgKNQ", "userType": "ADMIN", "name": "Admin Tan WeiMing", "email": "admin@email.com" },
    { "username": "RandyLai", "password": "$argon2i$v=19$m=512,t=2,p=2$8ph7QVLriA54gSK5vXochg$kXZc0gzl4EKtteyqeDe2Fg", "userType": "CM", "name": "Randy Lai YongHao", "email": "randy@email.com" },
    { "username": "LimPeiXuan", "password": "$argon2i$v=19$m=512,t=2,p=2$7NeenOtq2fEc12u1mjlUPw$IWHWu4LZFHtlXNTLlwkBGw", "userType": "RM", "name": "Lim Pei Xuan", "email": "peixuan@email.com" },
    { "username": "NgJunXiang", "password": "$argon2i$v=19$m=512,t=2,p=2$r2ZuDjspB02UKmaxCB1Dbg$A3vIULuZQ8LX+KwMOk+i3Q", "userType": "CM", "name": "Ng Jun Xiang", "email": "junxiang@email.com" }
])

// set up checklists table
db.Checklists.createIndex({ "clID": 1 }, { unique: true })
db.Checklists.insertMany([
  {
    "name" : "Account Opening",
    "requiredFields" : [
      "Client Name",
      "RM Name",
      "Client A/C Number",
      "Date of Submission"
    ],
    "conditions" : {
      "Country of Birth" : [
        "Singapore",
        "Others"
      ],
      "Country of Residence" : [
        "Singapore",
        "Others"
      ]
    },
    "complianceDocuments" : {
      "mandatory" : [
        {
          "hasConditions" : false,
          "conditions" : [ ],
          "documentName" : "Address Proof",
          "documentType" : "Non-Deferrable Mandatory (NDM)",
          "agmtCode" : "1",
          "signature" : false,
          "canWaiver" : false,
          "remarks" : "To ensure full address is visible",
          "docID" : "0",
          "changed" : "0"
        },
        {
          "hasConditions" : false,
          "conditions" : [ ],
          "documentName" : "Passport",
          "documentType" : "Non-Deferrable Mandatory (NDM)",
          "agmtCode" : "2",
          "signature" : false,
          "canWaiver" : false,
          "remarks" : "Coloured scan/photocopy",
          "docID" : "1",
          "changed" : "0"
        },
        {
          "hasConditions" : true,
          "conditions" : [
            {
              "conditionName" : "Country of Birth",
              "conditionOption" : "Others"
            },
            {
              "conditionName" : "Country of Residence",
              "conditionOption" : "Singapore"
            }
          ],
          "documentName" : "Proof of Residence",
          "documentType" : "Non-Deferrable Mandatory (NDM)",
          "agmtCode" : "6",
          "signature" : true,
          "canWaiver" : false,
          "remarks" : "To show proof if Client is not born in Singapore but lives here",
          "docID" : "2",
          "changed" : "0"
        }
      ],
      "optional" : [
        {
          "hasConditions" : false,
          "conditions" : [ ],
          "documentName" : "Sub-Account Details",
          "documentType" : "Non-Compliant (NC)",
          "agmtCode" : "7",
          "signature" : true,
          "canWaiver" : false,
          "remarks" : "Only if sub-account exists",
          "docID" : "3",
          "changed" : "0"
        }
      ]
    },
    "legalDocuments" : {
      "mandatory" : [
        {
          "hasConditions" : false,
          "conditions" : [ ],
          "documentName" : "Income Statement",
          "documentType" : "Non-Compliant (NC)",
          "agmtCode" : "4",
          "signature" : true,
          "canWaiver" : true,
          "remarks" : "Full scan required",
          "docID" : "4",
          "changed" : "0"
        }
      ],
      "optional" : [
        {
          "hasConditions" : false,
          "conditions" : [ ],
          "documentName" : "Tax Statement",
          "documentType" : "Non-Compliant (NC)",
          "agmtCode" : "5",
          "signature" : true,
          "canWaiver" : true,
          "remarks" : "Not required if Income Statement is provided",
          "docID" : "5",
          "changed" : "0"
        }
      ]
    },
    "latestDocID" : "6",
    "clID" : "1",
    "version" : "1",
    "status" : "valid",
    "dateCreated" : "2018-11-12 17:08",
    "dateUpdated" : "2018-11-12 17:08",
    "createdBy" : "Randy Lai YongHao",
    "updatedBy" : "Randy Lai YongHao"
  },
  {
    "name" : "Corporate Account Opening",
    "requiredFields" : [
      "Client Name",
      "RM Name",
      "Client A/C Number",
      "Date of Submission"
    ],
    "conditions" : {
      "Company Type" : [
        "Corporation",
        "Sole Proprietorship",
        "Partnership"
      ],
      "Country of Origin" : [
        "Singapore",
        "Others"
      ]
    },
    "complianceDocuments" : {
      "mandatory" : [
        {
          "hasConditions" : false,
          "conditions" : [ ],
          "documentName" : "Address Proof",
          "documentType" : "Non-Deferrable Mandatory (NDM)",
          "agmtCode" : "1",
          "signature" : false,
          "canWaiver" : false,
          "remarks" : "To ensure full address is visible",
          "docID" : "0",
          "changed" : "0"
        },
        {
          "hasConditions" : false,
          "conditions" : [ ],
          "documentName" : "ACRA Form",
          "documentType" : "Non-Deferrable Mandatory (NDM)",
          "agmtCode" : "9",
          "signature" : false,
          "canWaiver" : false,
          "remarks" : "Clearly shows Company name and Registration Number",
          "docID" : "1",
          "changed" : "0"
        }
      ],
      "optional" : [
        {
          "hasConditions" : false,
          "conditions" : [ ],
          "documentName" : "List of Directors",
          "documentType" : "Non-Compliant (NC)",
          "agmtCode" : "11",
          "signature" : false,
          "canWaiver" : false,
          "remarks" : "To be given if different from registration",
          "docID" : "2",
          "changed" : "0"
        }
      ]
    },
    "legalDocuments" : {
      "mandatory" : [
        {
          "hasConditions" : false,
          "conditions" : [ ],
          "documentName" : "Bank Statement",
          "documentType" : "Both",
          "agmtCode" : "12",
          "signature" : true,
          "canWaiver" : false,
          "remarks" : "Clearly shows details of past financial year",
          "docID" : "3",
          "changed" : "0"
        }
      ],
      "optional" : [
        {
          "hasConditions" : false,
          "conditions" : [ ],
          "documentName" : "Financial Statement",
          "documentType" : "Not Applicable",
          "agmtCode" : "10",
          "signature" : true,
          "canWaiver" : false,
          "remarks" : "Clearly shows last fiscal year",
          "docID" : "4",
          "changed" : "0"
        }
      ]
    },
    "latestDocID" : "5",
    "clID" : "2",
    "version" : "1",
    "status" : "valid",
    "dateCreated" : "2018-11-12 18:18",
    "dateUpdated" : "2018-11-12 18:18",
    "createdBy" : "Randy Lai YongHao",
    "updatedBy" : "Randy Lai YongHao"
  }
])

// set up checklistLogs table
db.ChecklistLogs.createIndex({ "clID": 1, "version": 1 }, { unique: true })

// set up checklist IDs
db.ChecklistCounter.insertOne({ "_id": "clID", "sequence_value": 3})

// set up tokens table
db.Tokens.createIndex({ "username": 1, "token": 1 }, { unique: true })

// set up onboard IDs
db.OnboardCounter.insertOne({ "_id": "obID", "sequence_value": 4 })

// set up onboard table
db.Onboards.insertMany([
  {
    "clID" : "1",
    "name" : "Account Opening",
    "version" : "1",
    "requiredFields" : [
      {
        "Client Name" : "Melvin Ng"
      },
      {
        "RM Name" : "Lim Pei Xuan"
      },
      {
        "Client A/C Number" : "123 456 789"
      },
      {
        "Date of Submission" : "12/11/2018"
      }
    ],
    "conditions" : [
      {
        "conditionName" : "Country of Birth",
        "conditionOption" : "Others"
      },
      {
        "conditionName" : "Country of Residence",
        "conditionOption" : "Singapore"
      }
    ],
    "complianceDocuments" : {
      "mandatory" : [
        {
          "hasConditions" : false,
          "documentName" : "Address Proof",
          "documentType" : "Non-Deferrable Mandatory (NDM)",
          "conditions" : [ ],
          "agmtCode" : "1",
          "signature" : false,
          "remarks" : "To ensure full address is visible",
          "checked" : false,
          "changed" : "0",
          "docID" : "0"
        },
        {
          "hasConditions" : false,
          "documentName" : "Passport",
          "documentType" : "Non-Deferrable Mandatory (NDM)",
          "conditions" : [ ],
          "agmtCode" : "2",
          "signature" : false,
          "remarks" : "Coloured scan/photocopy",
          "checked" : false,
          "changed" : "0",
          "docID" : "1"
        },
        {
          "hasConditions" : true,
          "documentName" : "Proof of Residence",
          "documentType" : "Non-Deferrable Mandatory (NDM)",
          "conditions" : [
            {
              "conditionName" : "Country of Birth",
              "conditionOption" : "Others"
            },
            {
              "conditionName" : "Country of Residence",
              "conditionOption" : "Singapore"
            }
          ],
          "agmtCode" : "6",
          "signature" : true,
          "remarks" : "To show proof if Client is not born in Singapore but lives here",
          "checked" : false,
          "changed" : "0",
          "docID" : "2"
        },
        {
          "hasConditions" : true,
          "documentName" : "Proof of Residence",
          "documentType" : "Non-Deferrable Mandatory (NDM)",
          "conditions" : [
            {
              "conditionName" : "Country of Birth",
              "conditionOption" : "Others"
            },
            {
              "conditionName" : "Country of Residence",
              "conditionOption" : "Singapore"
            }
          ],
          "agmtCode" : "6",
          "signature" : true,
          "remarks" : "To show proof if Client is not born in Singapore but lives here",
          "checked" : false,
          "changed" : "0",
          "docID" : "2"
        }
      ],
      "optional" : [
        {
          "hasConditions" : false,
          "documentName" : "Sub-Account Details",
          "documentType" : "Non-Compliant (NC)",
          "conditions" : [ ],
          "agmtCode" : "7",
          "signature" : true,
          "remarks" : "Only if sub-account exists",
          "checked" : false,
          "changed" : "0",
          "docID" : "3"
        }
      ]
    },
    "legalDocuments" : {
      "mandatory" : [
        {
          "hasConditions" : false,
          "documentName" : "Income Statement",
          "documentType" : "Non-Compliant (NC)",
          "conditions" : [ ],
          "agmtCode" : "4",
          "signature" : true,
          "remarks" : "Full scan required",
          "checked" : false,
          "changed" : "0",
          "docID" : "4"
        }
      ],
      "optional" : [
        {
          "hasConditions" : false,
          "documentName" : "Tax Statement",
          "documentType" : "Non-Compliant (NC)",
          "conditions" : [ ],
          "agmtCode" : "5",
          "signature" : true,
          "remarks" : "Not required if Income Statement is provided",
          "checked" : false,
          "changed" : "0",
          "docID" : "5"
        }
      ]
    },
    "obID" : "1",
    "dateCreated" : "2018-11-12 17:09",
    "progress" : 0,
    "createdBy" : "Lim Pei Xuan"
  },
  {
    "clID" : "2",
    "complianceDocuments" : {
      "mandatory" : [
        {
          "hasConditions" : false,
          "documentName" : "Address Proof",
          "documentType" : "Non-Deferrable Mandatory (NDM)",
          "conditions" : [ ],
          "agmtCode" : "1",
          "signature" : false,
          "remarks" : "To ensure full address is visible",
          "checked" : true,
          "changed" : "0",
          "docID" : "0"
        },
        {
          "hasConditions" : false,
          "documentName" : "ACRA Form",
          "documentType" : "Non-Deferrable Mandatory (NDM)",
          "conditions" : [ ],
          "agmtCode" : "9",
          "signature" : false,
          "remarks" : "Clearly shows Company name and Registration Number",
          "checked" : true,
          "changed" : "0",
          "docID" : "1"
        }
      ],
      "optional" : [
        {
          "hasConditions" : false,
          "documentName" : "List of Directors",
          "documentType" : "Non-Compliant (NC)",
          "conditions" : [ ],
          "agmtCode" : "11",
          "signature" : false,
          "remarks" : "To be given if different from registration",
          "checked" : false,
          "changed" : "0",
          "docID" : "2"
        }
      ]
    },
    "conditions" : [
      {
        "conditionName" : "Company Type",
        "conditionOption" : "Corporation"
      },
      {
        "conditionName" : "Country of Origin",
        "conditionOption" : "Singapore"
      }
    ],
    "dateCreated" : "2018-11-12 18:21",
    "legalDocuments" : {
      "mandatory" : [
        {
          "hasConditions" : false,
          "documentName" : "Bank Statement",
          "documentType" : "Both",
          "conditions" : [ ],
          "agmtCode" : "12",
          "signature" : true,
          "remarks" : "Clearly shows details of past financial year",
          "checked" : false,
          "changed" : "0",
          "docID" : "3"
        }
      ],
      "optional" : [
        {
          "hasConditions" : false,
          "documentName" : "Financial Statement",
          "documentType" : "Not Applicable",
          "conditions" : [ ],
          "agmtCode" : "10",
          "signature" : true,
          "remarks" : "Clearly shows last fiscal year",
          "checked" : false,
          "changed" : "0",
          "docID" : "4"
        }
      ]
    },
    "name" : "Corporate Account Opening",
    "obID" : "2",
    "progress" : 40,
    "version" : "1",
    "requiredFields" : [
      {
        "Client Name" : "NM3YM Holdings"
      },
      {
        "RM Name" : "Lim Pei Xuan"
      },
      {
        "Client A/C Number" : "987 654 321"
      },
      {
        "Date of Submission" : "11/11/2018"
      }
    ],
    "createdBy" : "Lim Pei Xuan"
  },
  {
    "clID" : "2",
    "name" : "Corporate Account Opening",
    "version" : "1",
    "requiredFields" : [
      {
        "Client Name" : "SMU LLP"
      },
      {
        "RM Name" : "Lim Pei Xuan"
      },
      {
        "Client A/C Number" : "456 123 789"
      },
      {
        "Date of Submission" : "02/11/2018"
      }
    ],
    "conditions" : [
      {
        "conditionName" : "Company Type",
        "conditionOption" : "Sole Proprietorship"
      },
      {
        "conditionName" : "Country of Origin",
        "conditionOption" : "Others"
      }
    ],
    "complianceDocuments" : {
      "mandatory" : [
        {
          "hasConditions" : false,
          "documentName" : "Address Proof",
          "documentType" : "Non-Deferrable Mandatory (NDM)",
          "conditions" : [ ],
          "agmtCode" : "1",
          "signature" : false,
          "remarks" : "To ensure full address is visible",
          "checked" : false,
          "changed" : "0",
          "docID" : "0"
        },
        {
          "hasConditions" : false,
          "documentName" : "ACRA Form",
          "documentType" : "Non-Deferrable Mandatory (NDM)",
          "conditions" : [ ],
          "agmtCode" : "9",
          "signature" : false,
          "remarks" : "Clearly shows Company name and Registration Number",
          "checked" : false,
          "changed" : "0",
          "docID" : "1"
        }
      ],
      "optional" : [
        {
          "hasConditions" : false,
          "documentName" : "List of Directors",
          "documentType" : "Non-Compliant (NC)",
          "conditions" : [ ],
          "agmtCode" : "11",
          "signature" : false,
          "remarks" : "To be given if different from registration",
          "checked" : false,
          "changed" : "0",
          "docID" : "2"
        }
      ]
    },
    "legalDocuments" : {
      "mandatory" : [
        {
          "hasConditions" : false,
          "documentName" : "Bank Statement",
          "documentType" : "Both",
          "conditions" : [ ],
          "agmtCode" : "12",
          "signature" : true,
          "remarks" : "Clearly shows details of past financial year",
          "checked" : true,
          "changed" : "0",
          "docID" : "3"
        }
      ],
      "optional" : [
        {
          "hasConditions" : false,
          "documentName" : "Financial Statement",
          "documentType" : "Not Applicable",
          "conditions" : [ ],
          "agmtCode" : "10",
          "signature" : true,
          "remarks" : "Clearly shows last fiscal year",
          "checked" : false,
          "changed" : "0",
          "docID" : "4"
        }
      ]
    },
    "obID" : "3",
    "dateCreated" : "2018-11-12 18:21",
    "progress" : 20,
    "createdBy" : "Lim Pei Xuan"
  }  
])
//set up notification IDs
db.NotificationCounter.insertOne({ "_id": "noID", "sequence_value": 1 })

//set up notification table
db.Notifications.createIndex({ "noID": 1, "clID": 1, "version": 1, "docID": 1 })

// set up agmt code table
db.AgmtCodes.createIndex({ "code": 1 }, { unique: true })
db.AgmtCodes.insertMany([
  {
    "code" : NumberInt(1),
    "document" : "Address Proof"
  },
  {
    "code" : NumberInt(2),
    "document" : "Passport"
  },
  {
    "code" : NumberInt(3),
    "document" : "Identification Card"
  },
  {
    "code" : NumberInt(4),
    "document" : "Income Statement"
  },
  {
    "code" : NumberInt(5),
    "document" : "Tax Statement"
  },
  {
    "code" : NumberInt(6),
    "document" : "Proof of Residence"
  },
  {
    "code" : NumberInt(7),
    "document" : "Sub-Account Details"
  },
  {
    "code" : NumberInt(8),
    "document" : "Next-Of-Kin Details"
  },
  {
    "code" : NumberInt(9),
    "document" : "ACRA Form"
  },
  {
    "code" : NumberInt(10),
    "document" : "Financial Statement"
  },
  {
    "code" : NumberInt(11),
    "document" : "List of Directors"
  },
  {
    "code" : NumberInt(12),
    "document" : "Bank Statement"
  }
])

// set up knowledgeBase table
db.KnowledgeBase.insertMany([
  {
    "question" : "I would like to find out more about the tuition fees",
    "answer" : "Please refer to the document for more information.",
    "refPages" : [1],
    "qnID" : 0,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:33",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:33",
    "views" : 0,
    "entities" : {
      "Fees" : [
        "Tuition Fee"
      ]
    },
    "intent" : "ScholarshipsAndFees"
  },
  {
    "question" : "Does SMU offer any financial aid?",
    "answer" : "SMU has a comprehensive range of financial aid schemes to help students in the payment of their tuition fees. These schemes cover only the subsidised tuition fees. They do not cover the miscellaneous fees charged by SMU.",
    "refPages" : [ ],
    "qnID" : 1,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:33",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:33",
    "views" : 0,
    "entities" : {
      "Scholarship" : [
        "FA"
      ]
    },
    "intent" : "ScholarshipsAndFees"
  },
  {
    "question" : "How do I know if I am eligible for financial aid?",
    "answer" : "You may use the Student Financial Needs Calculator to help determine if you are eligible and to find out the type and quantum of financial aid that you may qualify for.",
    "refPages" : [ ],
    "qnID" : 2,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:33",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:33",
    "views" : 0,
    "entities" : {
      "Scholarship" : [
        "FA"
      ]
    },
    "intent" : "ScholarshipsAndFees"
  },
  {
    "question" : "How do I pay my tuition fees? Can I pay in instalments?",
    "answer" : "Fees are payable in two instalments in a year – at the beginning of the first and second semesters. Fees for special term courses are payable separately.",
    "refPages" : [ ],
    "qnID" : 3,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:34",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:34",
    "views" : 0,
    "entities" : {
      "Fees" : [
        "Tuition Fee"
      ],
      "Payment" : [
        "Pay",
        "Instalment"
      ]
    },
    "intent" : "ScholarshipsAndFees"
  },
  {
    "question" : "What are the miscellaneous fees and how often do I have to pay?",
    "answer" : "Miscellaneous fees are fees charged for registration, information technology, library, sports-related, student activity, insurance and other orientation and academic-related services. They are compulsory and are payable prior to the start of the new academic year.",
    "refPages" : [ ],
    "qnID" : 4,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:34",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:34",
    "views" : 0,
    "entities" : {
      "Fees" : [
        "Miscellaneous Fee"
      ],
      "Payment" : [
        "Pay"
      ]
    },
    "intent" : "ScholarshipsAndFees"
  },
  {
    "question" : "Will students paying unsubsidised tuition fees be eligible for any financial aid or scholarships?",
    "answer" : "Students paying unsubsidised tuition fees are not eligible for any financial aid or scholarships administered by Singapore Ministry of Education (MOE) or SMU.",
    "refPages" : [ ],
    "qnID" : 5,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:35",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:35",
    "views" : 0,
    "entities" : {
      "Fees" : [
        "Unsubsidised Tuition Fee"
      ],
      "Scholarship" : [
        "FA",
        "Scholarship"
      ],
      "Payment" : [
        "Pay"
      ]
    },
    "intent" : "ScholarshipsAndFees"
  },
  {
    "question" : "What would be my tuition fees if I am admitted to the Double Degree Programme?",
    "answer" : "DDP students are required to pay the higher of the tuition fees if both degree programmes are priced differently e.g. Law students pay the higher tuition fees.",
    "refPages" : [ ],
    "qnID" : 6,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:35",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:35",
    "views" : 4,
    "entities" : {
      "Fees" : [
        "Tuition Fee"
      ],
      "Programme" : [
        "DDP"
      ]
    },
    "intent" : "ScholarshipsAndFees"
  },
  {
    "question" : "Does tuition fees include accommodation and living expenses?",
    "answer" : "Tuition fees do not include accommodation, miscellaneous fees, cost of books and study materials and living expenses.",
    "refPages" : [ ],
    "qnID" : 7,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:36",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:36",
    "views" : 0,
    "entities" : {
      "Fees" : [
        "Tuition Fee"
      ]
    },
    "intent" : "ScholarshipsAndFees"
  },
  {
    "question" : "When can I apply for financial aid?",
    "answer" : "You may apply for bursaries after submitting your online application for admissions by logon to the Applicant's Self Service . Applications for bursaries for Academic Year 2019-20 open on 2 January 2019 and close on 31 May 2019.",
    "refPages" : [ ],
    "qnID" : 8,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:36",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:36",
    "views" : 3,
    "entities" : {
      "Scholarship" : [
        "FA"
      ],
      "Action" : [
        "Apply"
      ]
    },
    "intent" : "ScholarshipsAndFees"
  },
  {
    "question" : "Where can I find information on scholarships?",
    "answer" : "Please refer to the document for details on scholarships.",
    "refPages" : [4],
    "qnID" : 9,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:36",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:36",
    "views" : 0,
    "entities" : {
      "Scholarship" : [
        "Scholarship"
      ]
    },
    "intent" : "ScholarshipsAndFees"
  },
  {
    "question" : "How do I apply for scholarships?",
    "answer" : "<div>You will be asked to indicate your choices of scholarships in the online application form for admission. If you have submitted an online application for admission without having indicated your choices of scholarships, you may do so by applying for scholarships through Applicant's Self Service.</div><div>&nbsp;</div>",
    "refPages" : [ ],
    "qnID" : 10,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:37",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:37",
    "views" : 0,
    "entities" : {
      "Action" : [
        "Apply"
      ],
      "Scholarship" : [
        "Scholarship"
      ]
    },
    "intent" : "ScholarshipsAndFees"
  },
  {
    "question" : "When can I apply for admisson?",
    "answer" : "<div>For the Academic Year 2019-20, applications opened on 16 October 2018 and will close on 19 March 2019, 11.59pm Singapore Time.&nbsp;&nbsp;</div><div><br></div><div>Please click here for more information.</div>",
    "refPages" : [ ],
    "qnID" : 11,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:37",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:37",
    "views" : 0,
    "entities" : {
      "Action" : [
        "Apply"
      ],
      "Applications" : [
        "Admission"
      ]
    },
    "intent" : "Admissions"
  },
  {
    "question" : "What are the admissions requirements?",
    "answer" : "At SMU, we are committed to holistic admissions, where we look for students who have not only been successful academically but who also possess qualities that we value.&nbsp; Applicants are selected on the basis of their strong academic and co-curricular records as well as evidence of qualities such as critical thinking, communication skills and aptitude/positive attitude.",
    "refPages" : [ ],
    "qnID" : 12,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:38",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:38",
    "views" : 0,
    "entities" : {
      "Applications" : [
        "Admission"
      ]
    },
    "intent" : "Admissions"
  },
  {
    "question" : "What are the important dates I should take note of for applications?",
    "answer" : "Please click here for information on the important dates that you should take note of.",
    "refPages" : [ ],
    "qnID" : 13,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:39",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:39",
    "views" : 0,
    "entities" : {
      "Applications" : [
        "Application"
      ]
    },
    "intent" : "Admissions"
  },
  {
    "question" : "Where can I view a sample of the online application form?",
    "answer" : "Please click here for a sample of the online application form.",
    "refPages" : [ ],
    "qnID" : 14,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:39",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:39",
    "views" : 0,
    "entities" : {
      "Forms" : [
        "Online Application Form"
      ]
    },
    "intent" : "Admissions"
  },
  {
    "question" : "How do I cancel my application?",
    "answer" : "Please email us at admissions@smu.edu.sg on your decision to cancel or withdraw your application. Kindly indicate your full name and application number in your email.",
    "refPages" : [ ],
    "qnID" : 15,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:40",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:40",
    "views" : 0,
    "entities" : {
      "Applications" : [
        "Application"
      ],
      "Action" : [
        "Cancel"
      ]
    },
    "intent" : "Admissions"
  },
  {
    "question" : "How many degree programmes can I select in the online application?",
    "answer" : "You may select up to 5 degree programmes, in order of preference.",
    "refPages" : [ ],
    "qnID" : 16,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:40",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:40",
    "views" : 0,
    "entities" : {
      "Programme" : [
        "Degree"
      ],
      "Forms" : [
        "Online Application Form"
      ]
    },
    "intent" : "Admissions"
  },
  {
    "question" : "My application was unsuccessful, can I appeal to be reconsidered?",
    "answer" : "If your application has not been successful or you have not been offered your first choice of programme or you have been offered admission to a single degree but would like to appeal for a double degree programme, you may submit an appeal for reconsideration.",
    "refPages" : [ ],
    "qnID" : 17,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:41",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:41",
    "views" : 0,
    "entities" : {
      "Applications" : [
        "Application",
        "Appeal"
      ]
    },
    "intent" : "Admissions"
  },
  {
    "question" : "I have not been offered a place in my programmes of choice, can I appeal for another programme?",
    "answer" : "You may appeal for a programme that you had not opted previously.",
    "refPages" : [ ],
    "qnID" : 18,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:42",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:42",
    "views" : 0,
    "entities" : {
      "Programme" : [
        "Degree",
        "Degree"
      ],
      "Applications" : [
        "Appeal"
      ]
    },
    "intent" : "Admissions"
  },
  {
    "question" : "I am still waiting for my appeal outcome, but I am asked to matriculate now. What should I do?",
    "answer" : "If you have received our email on matriculation, you may wish to matriculate for the programme which you had already accepted. If your appeal is successful, we will make the necessary amendments on our system and your student records to reflect the latest status.",
    "refPages" : [ ],
    "qnID" : 19,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:42",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:42",
    "views" : 0,
    "entities" : {
      "Applications" : [
        "Appeal"
      ],
      "Action" : [
        "Matriculate"
      ]
    },
    "intent" : "Admissions"
  },
  {
    "question" : "How do I submit an appeal to change programme?",
    "answer" : "<div>Please kindly email (admissions@smu.edu.sg) to express your interest to appeal with the following details :</div><div><br></div><div>(i)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Your full name</div><div><br></div><div>(ii)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Application No.</div><div><br></div><div>(iii)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Programme you intend to change to&nbsp;&nbsp;</div><div><br></div><div>(iv)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Reasons for change of programme (a write-up is preferred; 1000-word limit)</div><div><br></div><div>&nbsp;</div><div><br></div><div>We will inform you on the outcome of your appeal. Please check the status of your appeal online via Applicant’s Self Service. If your appeal for course change is not successful, you will still keep your place in the degree programme that you have previously accepted.&nbsp;</div>",
    "refPages" : [ ],
    "qnID" : 20,
    "username" : "CM",
    "dateAsked" : "2018-11-12 21:43",
    "CMusername" : "RandyLai",
    "dateAnswered" : "2018-11-12 21:43",
    "views" : 0,
    "entities" : {
      "Action" : [
        "Submit"
      ],
      "Applications" : [
        "Appeal"
      ],
      "Programme" : [
        "Degree"
      ]
    },
    "intent" : "Admissions"
  }    
])

//set up Questions IDs
db.QuestionCounter.insertOne({ "_id": "qnID", "sequence_value": 21 })

//set up Questions notification IDs
db.QuestionNotificationCounter.insertOne({ "_id": "noID", "sequence_value": 1 })

//set up Questions notification table
db.QuestionNotifications.createIndex({ "noID": 1, "question": 1 })

//set up Answers notification IDs
db.AnswerNotificationCounter.insertOne({ "_id": "noID", "sequence_value": 1 })

//set up Answers notification table
db.AnswerNotifications.createIndex({ "noID": 1, "question": 1, "answer": 1 })

//set up QnA notification IDs
db.QnANotificationCounter.insertOne({ "_id": "noID", "sequence_value": 1 })

//set up QnA notification table
db.QnANotifications.createIndex({ "noID": 1})

db.StoreIntents.insertMany([
  {
    "qnID" : 0,
    "text" : "I would like to find out more about the tuition fees",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(40),
        "end" : NumberInt(52),
        "value" : "Tuition Fee",
        "entity" : "Fees"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "What are the tuition fees?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(13),
        "end" : NumberInt(25),
        "value" : "Tuition Fee",
        "entity" : "Fees"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "How much are the tuition fees?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(17),
        "end" : NumberInt(29),
        "value" : "Tuition Fee",
        "entity" : "Fees"
      }
    ]
  },
  {
    "qnID" : 1,
    "text" : "Does SMU offer any financial aid?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(19),
        "end" : NumberInt(32),
        "value" : "FA",
        "entity" : "Scholarship"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "What are the financial aid options?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(13),
        "end" : NumberInt(26),
        "value" : "FA",
        "entity" : "Scholarship"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "What kind of Financial Aid is available?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(13),
        "end" : NumberInt(26),
        "value" : "FA",
        "entity" : "Scholarship"
      }
    ]
  },
  {
    "qnID" : 2,
    "text" : "How do I know if I am eligible for financial aid?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(35),
        "end" : NumberInt(48),
        "value" : "FA",
        "entity" : "Scholarship"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "Am I eligible for financial aid?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(18),
        "end" : NumberInt(31),
        "value" : "ScholarshipsAndFees",
        "entity" : "Scholarship"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "Who is eligible for financial aid?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(20),
        "end" : NumberInt(33),
        "value" : "FA",
        "entity" : "Scholarship"
      }
    ]
  },
  {
    "qnID" : 3,
    "text" : "How do I pay my tuition fees? Can I pay in instalments?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(16),
        "end" : NumberInt(28),
        "value" : "Tuition Fee",
        "entity" : "Fees"
      },
      {
        "start" : NumberInt(9),
        "end" : NumberInt(12),
        "value" : "Pay",
        "entity" : "Payment"
      },
      {
        "start" : NumberInt(43),
        "end" : NumberInt(54),
        "value" : "Instalment",
        "entity" : "Payment"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "Can I pay the tuition fees in instalments?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(14),
        "end" : NumberInt(26),
        "value" : "Tuition Fee",
        "entity" : "Fees"
      },
      {
        "start" : NumberInt(6),
        "end" : NumberInt(9),
        "value" : "Pay",
        "entity" : "Payment"
      },
      {
        "start" : NumberInt(30),
        "end" : NumberInt(41),
        "value" : "Instalment",
        "entity" : "Payment"
      }
    ]
  },
  {
    "qnID" : 4,
    "text" : "What are the miscellaneous fees and how often do I have to pay?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(13),
        "end" : NumberInt(31),
        "value" : "Miscellaneous Fee",
        "entity" : "Fees"
      },
      {
        "start" : NumberInt(59),
        "end" : NumberInt(62),
        "value" : "Pay",
        "entity" : "Payment"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "How often do I need to pay the miscellaneous fee?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(23),
        "end" : NumberInt(26),
        "value" : "Pay",
        "entity" : "Payment"
      },
      {
        "start" : NumberInt(31),
        "end" : NumberInt(48),
        "value" : "Miscellaneous Fee",
        "entity" : "Fees"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "What are the misc fees for?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(13),
        "end" : NumberInt(22),
        "value" : "Miscellaneous Fee",
        "entity" : "Fees"
      }
    ]
  },
  {
    "qnID" : 5,
    "text" : "Will students paying unsubsidised tuition fees be eligible for any financial aid or scholarships?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(21),
        "end" : NumberInt(46),
        "value" : "Unsubsidised Tuition Fee",
        "entity" : "Fees"
      },
      {
        "start" : NumberInt(67),
        "end" : NumberInt(80),
        "value" : "FA",
        "entity" : "Scholarship"
      },
      {
        "start" : NumberInt(84),
        "end" : NumberInt(96),
        "value" : "Scholarship",
        "entity" : "Scholarship"
      },
      {
        "start" : NumberInt(14),
        "end" : NumberInt(20),
        "value" : "Pay",
        "entity" : "Payment"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "Are students paying unsubsidised tuition fees eligible for any financial aid or scholarships?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(13),
        "end" : NumberInt(19),
        "value" : "Pay",
        "entity" : "Payment"
      },
      {
        "start" : NumberInt(20),
        "end" : NumberInt(45),
        "value" : "Unsubsidised Tuition Fee",
        "entity" : "Fees"
      },
      {
        "start" : NumberInt(63),
        "end" : NumberInt(76),
        "value" : "FA",
        "entity" : "Scholarship"
      },
      {
        "start" : NumberInt(80),
        "end" : NumberInt(92),
        "value" : "Scholarship",
        "entity" : "Scholarship"
      }
    ]
  },
  {
    "qnID" : 6,
    "text" : "What would be my tuition fees if I am admitted to the Double Degree Programme?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(17),
        "end" : NumberInt(29),
        "value" : "Tuition Fee",
        "entity" : "Fees"
      },
      {
        "start" : NumberInt(54),
        "end" : NumberInt(77),
        "value" : "DDP",
        "entity" : "Programme"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "What are the tuition fees for DDP?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(13),
        "end" : NumberInt(25),
        "value" : "Tuition Fee",
        "entity" : "Fees"
      },
      {
        "start" : NumberInt(30),
        "end" : NumberInt(33),
        "value" : "DDP",
        "entity" : "Programme"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "How much is the double degree tuition fee?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(16),
        "end" : NumberInt(29),
        "value" : "DDP",
        "entity" : "Programme"
      },
      {
        "start" : NumberInt(30),
        "end" : NumberInt(41),
        "value" : "Tuition Fee",
        "entity" : "Fees"
      }
    ]
  },
  {
    "qnID" : 7,
    "text" : "Does tuition fees include accommodation and living expenses?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(5),
        "end" : NumberInt(17),
        "value" : "Tuition Fee",
        "entity" : "Fees"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "Are accommodation and living expenses included in the tuition fee?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(54),
        "end" : NumberInt(65),
        "value" : "Tuition Fee",
        "entity" : "Fees"
      }
    ]
  },
  {
    "qnID" : 8,
    "text" : "When can I apply for financial aid?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(21),
        "end" : NumberInt(34),
        "value" : "FA",
        "entity" : "Scholarship"
      },
      {
        "start" : NumberInt(11),
        "end" : NumberInt(16),
        "value" : "Apply",
        "entity" : "Action"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "When can I start applying for financial aid?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(17),
        "end" : NumberInt(25),
        "value" : "Apply",
        "entity" : "Action"
      },
      {
        "start" : NumberInt(30),
        "end" : NumberInt(43),
        "value" : "FA",
        "entity" : "Scholarship"
      }
    ]
  },
  {
    "qnID" : 9,
    "text" : "Where can I find information on scholarships?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(32),
        "end" : NumberInt(44),
        "value" : "Scholarship",
        "entity" : "Scholarship"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "Where can I find out more about scholarships?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(32),
        "end" : NumberInt(44),
        "value" : "Scholarship",
        "entity" : "Scholarship"
      }
    ]
  },
  {
    "qnID" : 10,
    "text" : "How do I apply for scholarships?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(9),
        "end" : NumberInt(14),
        "value" : "Apply",
        "entity" : "Action"
      },
      {
        "start" : NumberInt(19),
        "end" : NumberInt(31),
        "value" : "Scholarship",
        "entity" : "Scholarship"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "How do I start applying for scholarships?",
    "intent" : "ScholarshipsAndFees",
    "entities" : [
      {
        "start" : NumberInt(28),
        "end" : NumberInt(40),
        "value" : "Scholarship",
        "entity" : "Scholarship"
      },
      {
        "start" : NumberInt(15),
        "end" : NumberInt(23),
        "value" : "Apply",
        "entity" : "Action"
      }
    ]
  },
  {
    "qnID" : 11,
    "text" : "When can I apply for admission?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(11),
        "end" : NumberInt(16),
        "value" : "Apply",
        "entity" : "Action"
      },
      {
        "start" : NumberInt(21),
        "end" : NumberInt(30),
        "value" : "Admission",
        "entity" : "Applications"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "When can I start applying for admissions?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(17),
        "end" : NumberInt(25),
        "value" : "Apply",
        "entity" : "Action"
      }
    ]
  },
  {
    "qnID" : 12,
    "text" : "What are the admissions requirements?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(13),
        "end" : NumberInt(23),
        "value" : "Admission",
        "entity" : "Applications"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "What are the requirements for admission?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(30),
        "end" : NumberInt(39),
        "value" : "Admission",
        "entity" : "Applications"
      }
    ]
  },
  {
    "qnID" : 13,
    "text" : "What are the important dates I should take note of for applications?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(55),
        "end" : NumberInt(67),
        "value" : "Application",
        "entity" : "Applications"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "What are the important admission application dates?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(33),
        "end" : NumberInt(44),
        "value" : "Application",
        "entity" : "Applications"
      },
      {
        "start" : NumberInt(23),
        "end" : NumberInt(32),
        "value" : "Admission",
        "entity" : "Applications"
      }
    ]
  },
  {
    "qnID" : 14,
    "text" : "Where can I view a sample of the online application form?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(33),
        "end" : NumberInt(56),
        "value" : "Online Application Form",
        "entity" : "Forms"
      }
    ]
  },
  {
    "qnID" : 15,
    "text" : "How do I cancel my application?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(19),
        "end" : NumberInt(30),
        "value" : "Application",
        "entity" : "Applications"
      },
      {
        "start" : NumberInt(9),
        "end" : NumberInt(15),
        "value" : "Cancel",
        "entity" : "Action"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "Cancelling my application",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(0),
        "end" : NumberInt(10),
        "value" : "Cancel",
        "entity" : "Action"
      },
      {
        "start" : NumberInt(14),
        "end" : NumberInt(25),
        "value" : "Application",
        "entity" : "Applications"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "How to cancel application?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(7),
        "end" : NumberInt(13),
        "value" : "Cancel",
        "entity" : "Action"
      },
      {
        "start" : NumberInt(14),
        "end" : NumberInt(25),
        "value" : "Admissions",
        "entity" : "Applications"
      }
    ]
  },
  {
    "qnID" : 16,
    "text" : "How many degree programmes can I select in the online application?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(9),
        "end" : NumberInt(26),
        "value" : "Degree",
        "entity" : "Programme"
      },
      {
        "start" : NumberInt(47),
        "end" : NumberInt(65),
        "value" : "Online Application Form",
        "entity" : "Forms"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "How many degree programmes can I apply for?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(9),
        "end" : NumberInt(26),
        "value" : "Degree",
        "entity" : "Programme"
      },
      {
        "start" : NumberInt(33),
        "end" : NumberInt(38),
        "value" : "Apply",
        "entity" : "Action"
      }
    ]
  },
  {
    "qnID" : 17,
    "text" : "My application was unsuccessful, can I appeal to be reconsidered?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(3),
        "end" : NumberInt(14),
        "value" : "Application",
        "entity" : "Applications"
      },
      {
        "start" : NumberInt(39),
        "end" : NumberInt(45),
        "value" : "Appeal",
        "entity" : "Applications"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "Can I appeal if my application was rejected?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(6),
        "end" : NumberInt(12),
        "value" : "Appeal",
        "entity" : "Applications"
      },
      {
        "start" : NumberInt(19),
        "end" : NumberInt(30),
        "value" : "Application",
        "entity" : "Applications"
      }
    ]
  },
  {
    "qnID" : 18,
    "text" : "I have not been offered a place in my programmes of choice, can I appeal for another programme?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(38),
        "end" : NumberInt(48),
        "value" : "Degree",
        "entity" : "Programme"
      },
      {
        "start" : NumberInt(38),
        "end" : NumberInt(47),
        "value" : "Degree",
        "entity" : "Programme"
      },
      {
        "start" : NumberInt(66),
        "end" : NumberInt(72),
        "value" : "Appeal",
        "entity" : "Applications"
      }
    ]
  },
  {
    "qnID" : "",
    "text" : "Can I appeal for a different degree programme?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(6),
        "end" : NumberInt(12),
        "value" : "Appeal",
        "entity" : "Applications"
      },
      {
        "start" : NumberInt(29),
        "end" : NumberInt(45),
        "value" : "Degree",
        "entity" : "Programme"
      }
    ]
  },
  {
    "qnID" : 19,
    "text" : "I am still waiting for my appeal outcome, but I am asked to matriculate now. What should I do?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(26),
        "end" : NumberInt(32),
        "value" : "Appeal",
        "entity" : "Applications"
      },
      {
        "start" : NumberInt(60),
        "end" : NumberInt(71),
        "value" : "Matriculate",
        "entity" : "Action"
      }
    ]
  },
  {
    "qnID" : 20,
    "text" : "How do I submit an appeal to change programme?",
    "intent" : "Admissions",
    "entities" : [
      {
        "start" : NumberInt(9),
        "end" : NumberInt(15),
        "value" : "Submit",
        "entity" : "Action"
      },
      {
        "start" : NumberInt(19),
        "end" : NumberInt(25),
        "value" : "Appeal",
        "entity" : "Applications"
      },
      {
        "start" : NumberInt(36),
        "end" : NumberInt(45),
        "value" : "Degree",
        "entity" : "Programme"
      }
    ]
  }      
])