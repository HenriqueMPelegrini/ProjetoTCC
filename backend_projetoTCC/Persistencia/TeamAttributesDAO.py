from pymongo import MongoClient
from .BaseDAO import BaseDAO

class TeamAttributesDAO(BaseDAO):
    def __init__(self):
        super().__init__('team_attributes')

    def find_by_team_date(self, teamID, date):
        items = list(self.collection.find({'team_api_id': teamID, 'date': {'$lt': date}}).sort('date', -1).limit(1)) #pegar o id do tema e tem que ser menor que a data do jogo
        for item in items:
            item['_id'] = str(item['_id'])  # Convertendo o ObjectId para string
        return items