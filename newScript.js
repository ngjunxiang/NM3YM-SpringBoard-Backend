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

// set up checklistLogs table
db.ChecklistLogs.createIndex({ "clID": 1, "version": 1 }, { unique: true })

// set up checklist IDs
db.ChecklistCounter.insertOne({ "_id": "clID", "sequence_value": 0 })

// set up tokens table
db.Tokens.createIndex({ "username": 1, "token": 1 }, { unique: true })

// set up onboard IDs
db.OnboardCounter.insertOne({ "_id": "obID", "sequence_value": 0 })

// set up onboard table
db.Onboards.createIndex({ "clientName": 1, "RMName": 1, "dateCreated": 1 }, { unique: true })

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
            "Action": ["open"]
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