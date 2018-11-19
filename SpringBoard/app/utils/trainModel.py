from rasa_nlu.training_data import load_data
from rasa_nlu.config import RasaNLUModelConfig
from rasa_nlu.model import Trainer
from rasa_nlu import config
from collections import OrderedDict
from pymongo import MongoClient
from pymongo import cursor
from app.utils.knowledgeBase import initialiseModel
from background_task import background

import json
import re
import subprocess

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard

def createTrainingFile():
    """Creates files required to train the model."""

    collection = db.StoreIntents

    training_data = collection.find({},{"_id":0,"qnID":0})

    training_data_file = "./app/data/training_data.json"

    to_json = {}
    rasa_nlu_data = {}
    commExamplesList = [item for item in training_data]
    rasa_nlu_data["common_examples"] = commExamplesList
    to_json["rasa_nlu_data"] = rasa_nlu_data

    with open(training_data_file,'w') as fp:
        json.dump(to_json,fp,indent=4)

@background(schedule=5)
def trainModel():
    """Schedules training."""    
    try:
        # train model
        training_data = load_data('./app/data/training_data.json')
        trainer = Trainer(config.load('./app/data/config_spacy.yml'))
        trainer.train(training_data)
        model_directory = trainer.persist('./model', fixed_model_name='SpringBoardKMS') 

    except Exception as e:
        return({"error":str(e)})

    # update entity synonyms
    with open('./model/default/SpringBoardKMS/entity_synonyms.json') as f:
        entity_synonyms = json.load(f)

    with open('./app/data/master_entity_synonyms.json') as f:
        master_entity_synonyms = json.load(f)

    master_entity_synonyms = {**master_entity_synonyms,**entity_synonyms}

    with open('./model/default/SpringBoardKMS/entity_synonyms.json', 'w') as f:
        json.dump(master_entity_synonyms,f,indent=4)

    with open('./app/data/master_entity_synonyms.json','w') as f:
        json.dump(master_entity_synonyms,f,indent=4)   
    # re-initialise interpreter
    initialiseModel()


def trainKMSModel():
    """Creates training file and schedules training."""

    createTrainingFile()
    trainModel()

    return ({"results":"model is currently training"})

def updateSynonyms(synonymDict):
    """Updates synonym mapping.
    
    Args:
    synonymDict (dict) : updated synonym map

    """

    # value -> synonyms to synonym -> value
    reversedDict={}
    for k,v in synonymDict.items(): 
        for value in v:
            reversedDict[value] = k

    # get entity synonyms
    master_entity_synonyms = {**reversedDict}

    with open('./model/default/SpringBoardKMS/entity_synonyms.json', 'w') as f:
        json.dump(master_entity_synonyms,f,indent=4)

    with open('./app/data/master_entity_synonyms.json','w') as f:
        json.dump(master_entity_synonyms,f,indent=4)   
    
    return ({"results":"true"})

def retrieveSynonyms():
    """Retrieves synonym mapping."""

    # get entity synonyms
    with open('./app/data/master_entity_synonyms.json') as f:
        master_entity_synonyms = json.load(f)

    reversedDict={}
    for k,v in master_entity_synonyms.items(): 
        reversedDict[v]= reversedDict.get(v,[])
        reversedDict[v].append(k)

    return (OrderedDict(sorted(reversedDict.items(), key=lambda t: t[0])))

def retrieveEntities():
    """Retrieves all existing entities."""

    collection = db.KnowledgeBase

    table = collection.find({},{"_id":0})
    qnaList = [item for item in table]

    entityDict = {}

    for qna in qnaList:
        entities = qna.get("entities")
        if entities == None:
            continue
        for entity,value in entities.items():
            if entityDict.get(entity) == None :
                entityDict[entity] = []
            for item in value:
                if item not in entityDict[entity]:
                    entityDict[entity].append(item)

    for entity,entities in entityDict.items():
        entities.sort()

    client.close()
    return ({"results": OrderedDict(sorted(entityDict.items(), key=lambda t: t[0]))})

def retrieveIntents():
    """Retrieves all existing intents."""
    collection = db.KnowledgeBase

    table = collection.find({},{"_id":0})
    qnaList = [item for item in table]

    intentList = []
    intentSet = set(intentList)

    for qna in qnaList:
        intent = qna.get("intent")
        if (intent != None) and (intent not in intentSet):
            intentSet.add(intent)
            intentList.append(intent)

    client.close()
    return ({"results": intentList})

# retrieve questions by intent
def retrieveByIntent(intent):
    """Retrieves questions with given intent.
    
    Args:
    intent (str) : intent

    """

    collection = db.KnowledgeBase

    table = collection.find({"intent" : intent},{"_id":0})
    qnaList = [item for item in table]

    client.close()
    return ({"results": qnaList})

# retrieve uncleaned qna (e.g. no intent) one at a time
def retrieveAllUnclean():
    """Retrieves one unclean QNA."""

    collection = db.KnowledgeBase

    table = collection.find({"intent": { "$exists": False }},{"_id":0}).limit(1)
    qnaList = [item for item in table]

    results = {}
    results["results"] =  qnaList
    results["numUnclean"] =  table.count()

    client.close()
    return results

# retrieve all cleaned qna
def retrieveAllClean():
    """Retrieves all cleaned QNA."""

    collection = db.KnowledgeBase

    table = collection.find({"intent": { "$exists": True }},{"_id":0})
    qnaList = [item for item in table]

    results = {}
    results["results"] =  qnaList

    client.close()
    return results

def storeCleanedQNA(cleanedQNA):
    """Stores clean QNA.
    
    Args:
    cleanedQNA (list) : cleaned QNAs

    """

    collection = db.StoreIntents
    kbCollection = db.KnowledgeBase

    storeCounter = 0
    failedQnNums = []
    success = False
    toStore = {}

    # manipulate QNA object
    for item in cleanedQNA:
        intent = item["intent"]
        question = item["question"]
        qnID = item["qnID"]
        toStore["qnID"] = qnID
        toStore["text"] = question
        toStore["intent"] = intent
        toStore["entities"] = []
        entities = item["entities"]
        storedEntities = {}
        
        for entity in entities:
            word = entity["word"]
            index = question.find(word)
            endOfIndex = index + len(word)
            entityObj = {}
            entityObj["start"] = index
            entityObj["end"] = endOfIndex
            ent = entity["entity"]
            val = entity["value"]
            entityObj["value"] = val
            entityObj["entity"] = ent
            entitiesList = toStore["entities"]
            entitiesList.append(entityObj)
            toStore["entities"] = entitiesList
            
            if ent in storedEntities:
                entList = storedEntities[ent]
                entList.append(val)
                storedEntities[ent] = entList
            else:
                newList = []
                newList.append(val)
                storedEntities[ent] = newList
        
        try:
            collection.insert_one(toStore)
            storeCounter += 1
            success = True
        except:
            failedQnNums.append(question)
        
        if success:
            kbCollection.update_one({'qnID':qnID},{"$set" : {'intent':intent,'entities':storedEntities}})
            success = False
        toStore = {}

    results = {}
    results["StoredCount"] = storeCounter
    results["failedQnNums"] = failedQnNums
    
    return results
