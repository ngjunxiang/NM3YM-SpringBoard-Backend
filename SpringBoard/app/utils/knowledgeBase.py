from pymongo import MongoClient
from pymongo import cursor

from app.utils.userCRUD import *
import json

def getAnswer(question):

    collection = db.knowledgeBase

    results = {
        [
            {"question":"What is the list of NDM/ NCF documents?","answer":"Please refer to REG 51 section 1.6.2"},
            {"question":"Can a RM open an account for another market?","answer":"The RM will have to approach the respective market and obtain the necessary approval before proceeding."}
        ]
    }

    client.close()
    return results