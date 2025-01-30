from pymongo import MongoClient
from .BaseDAO import BaseDAO

class PlayerDAO(BaseDAO):
    def __init__(self):
        super().__init__('player')

    def find_by_player(self, playerID):
        items = list(self.collection.find({'player_api_id': playerID})) #pegar o id do player 
        for item in items:
            item['_id'] = str(item['_id'])  # Convertendo o ObjectId para string
        return items
    
    