from pymongo import MongoClient

class LeagueDAO:
    def __init__(self):
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client['projeto_TCC']
        self.user_collection = self.db['league']
        

    def find_all(self):
        leagues = list(self.user_collection.find())
        for league in leagues:
            league['_id'] = str(league['_id'])  # Convertendo o ObjectId para string
        return leagues

    def insert(self, user_data):
        return self.user_collection.insert_one(user_data)