from pymongo import MongoClient
from .BaseDAO import BaseDAO

class MatchesDAO(BaseDAO):
    def __init__(self):
        super().__init__('matches')

    def find_by_team(self, teamID):
        items = list(self.collection.find({'$or': [{'home_team_api_id': teamID }, {'away_team_api_id': teamID }]}).sort('date',-1))
        for item in items:
            item['_id'] = str(item['_id'])  # Convertendo o ObjectId para string
        return items
    
    def find_by_team_stage_season(self, teamID,stage,season):
        # Construa a consulta com $or e $and
        query = {
            '$and': [
                {'$or': [{'home_team_api_id': teamID}, {'away_team_api_id': teamID}]},
                {'stage': stage },
                {'season': season}
            ]
        }
        items = list(self.collection.find(query))
        #print(items)
        for item in items:
            item['_id'] = str(item['_id'])  # Convertendo o ObjectId para string
        return items
    
    def find_by_stage_season(self,stage,season):
        # Buscar  os jogos da Temporada e da rodada
        query = {
            '$and': [
                {'stage': stage },
                {'season': season}
            ]
        }
        items = list(self.collection.find(query))
        #print(items)
        for item in items:
            item['_id'] = str(item['_id'])  # Convertendo o ObjectId para string
        return items
    
    def find_by_team_season(self,teamID,season):
        # Buscar  os jogos da Temporada e da rodada
        query = {
            '$and': [
               {'$or': [{'home_team_api_id': teamID}, {'away_team_api_id': teamID}]},
                {'season': season}
            ]
        }
        items = list(self.collection.find(query))
        #print(items)
        for item in items:
            item['_id'] = str(item['_id'])  # Convertendo o ObjectId para string
        return items