from rasa_nlu.training_data import load_data
from rasa_nlu.config import RasaNLUModelConfig
from rasa_nlu.model import Trainer
from rasa_nlu import config
from collections import OrderedDict
from pymongo import MongoClient
from pymongo import cursor
import json

client = MongoClient('mongodb://localhost:27017/')
db = client.SpringBoard


def trainKMSModel():
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
        json.dump(master_entity_synonyms,f)

    with open('./app/data/master_entity_synonyms.json','w') as f:
        json.dump(master_entity_synonyms,f)   

    return ({"results":"true"})

def updateSynonyms(synonymDict):

    reversedDict={}
    for k,v in synonymDict.items(): 
        for value in v:
            reversedDict[value] = k

    # get entity synonyms
    with open('./app/data/master_entity_synonyms.json') as f:
        master_entity_synonyms = json.load(f)

    master_entity_synonyms = {**master_entity_synonyms,**reversedDict}

    with open('./model/default/SpringBoardKMS/entity_synonyms.json', 'w') as f:
        json.dump(master_entity_synonyms,f)

    with open('./app/data/master_entity_synonyms.json','w') as f:
        json.dump(master_entity_synonyms,f)   
    
    return ({"results":"true"})

def retrieveSynonyms():
    # get entity synonyms
    with open('./app/data/master_entity_synonyms.json') as f:
        master_entity_synonyms = json.load(f)

    reversedDict={}
    for k,v in master_entity_synonyms.items(): 
        reversedDict[v]= reversedDict.get(v,[])
        reversedDict[v].append(k)

    return ({"results": OrderedDict(sorted(reversedDict.items(), key=lambda t: t[0]))})

def retrieveIntents():
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
    collection = db.KnowledgeBase

    table = collection.find({"intent" : intent},{"_id":0})
    qnaList = [item for item in table]

    client.close()
    return ({"results": qnaList})

# retrieve uncleaned qna (e.g. no intent) 5 at a time
def retrieveAllUnclean():
    collection = db.KnowledgeBase

    table = collection.find({"intent": { "$exists": False }},{"_id":0})
    qnaList = [item for item in table]

    results = {}
    results["results"] =  qnaList[0:5]
    results["numUnclean"] =  len(qnaList)

    client.close()
    return results