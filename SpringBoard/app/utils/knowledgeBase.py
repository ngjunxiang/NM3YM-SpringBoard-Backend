from pymongo import MongoClient
from pymongo import cursor
from rasa_nlu.model import Metadata, Interpreter
from difflib import SequenceMatcher

from app.utils.userCRUD import *
import json

def getAnswer(question):

    collection = db.knowledgeBase

    #get intents and entities
    interpreter = Interpreter.load('./model')
    intentEntity = interpreter.parse(question)

    intent = intentEntity["intent"]["name"]

    entities = {}
    for entity in intentEntity["entities"]:
        entities[entity["entity"]] = entity["value"]

    table = collection.find({"intent": intent},{"_id":0})
    faqList = [item for item in table]
    match = []

    for q in faqList:
        for entity,value in entities.items():
            if q["entities"].get(entity) != None:
                if value in q["entities"][entity]:
                    q["similarity"] = SequenceMatcher(None, question, q["question"]).ratio()
                    match.append(q)

    match = sortBySimilarity(match)

    results = {
        "results": match
    }

    client.close()
    return results

def sortBySimilarity(match):
    retMatch = []
    if not match:
        return retMatch
    
    retMatch.append(match[0])
    for i in range(1,len(match)):
        matchVal = match[i]
        matchSim = matchVal.get("similarity")
        print(matchSim)
        for j, retMatchValue in enumerate(retMatch):
            retMatchSim = retMatchValue.get("similarity")
            if matchSim > retMatchSim:
                retMatch.insert(j,match[i])
                break
            else:
                retMatch.append(match[i])
                break
            

    return retMatch
