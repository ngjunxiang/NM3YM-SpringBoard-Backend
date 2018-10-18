from rasa_nlu.training_data import load_data
from rasa_nlu.config import RasaNLUModelConfig
from rasa_nlu.model import Trainer
from rasa_nlu import config

def trainKMSModel():
    try:
        training_data = load_data('./app/data/training_data.json')
        trainer = Trainer(config.load('./app/data/config_spacy.yml'))
        trainer.train(training_data)
        model_directory = trainer.persist('./model', fixed_model_name='SpringBoardKMS')
    except Exception as e:
        return({"error":str(e)})
    return ({"Success":"Model Trained!"})