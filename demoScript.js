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
    "code" : 1,
    "document" : "Address Proof"
  },
  {
    "code" : 2,
    "document" : "Passport"
  },
  {
    "code" : 3,
    "document" : "Identification Card"
  },
  {
    "code" : 4,
    "document" : "Income Statement"
  },
  {
    "code" : 5,
    "document" : "Tax Statement"
  },
  {
    "code" : 6,
    "document" : "Proof of Residence"
  },
  {
    "code" : 7,
    "document" : "Sub-Account Details"
  },
  {
    "code" : 8,
    "document" : "Next-Of-Kin Details"
  },
  {
    "code" : 9,
    "document" : "ACRA Form"
  },
  {
    "code" : 10,
    "document" : "Financial Statement"
  },
  {
    "code" : 11,
    "document" : "List of Directors"
  },
  {
    "code" : 12,
    "document" : "Bank Statement"
  }
])

//set up Questions IDs
db.QuestionCounter.insertOne({ "_id": "qnID", "sequence_value": 0 })

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
