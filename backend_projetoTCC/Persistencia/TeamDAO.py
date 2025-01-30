from pymongo import MongoClient
from .BaseDAO import BaseDAO

class TeamDAO(BaseDAO):
    def __init__(self):
        super().__init__('team')

    def find_by_team(self, teamID):
        items = list(self.collection.find({'team_api_id': teamID})) #pegar o id do time 
        for item in items:
            item['_id'] = str(item['_id'])  # Convertendo o ObjectId para string
        return items
    
    def find_all_ordenado(self):
        items = list(self.collection.find())
        for item in items:
            item['_id'] = str(item['_id'])  # Convertendo o ObjectId para string
        
        # Ordenar a lista de itens pela chave "team_long_name" em ordem alfabética
        items.sort(key=lambda x: x.get("team_long_name", "").lower())  # Considera a chave e ignora maiúsculas/minúsculas
        
        return items
