from rasa_nlu.training_data import load_data
from rasa_nlu.config import RasaNLUModelConfig
from rasa_nlu.model import Trainer
from rasa_nlu import config
import json

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
    
    return ({"results": reversedDict})