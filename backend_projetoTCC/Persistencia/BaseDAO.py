from pymongo import MongoClient

class BaseDAO:
    def __init__(self, collection_name):
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client['projeto_TCC']
        self.collection = self.db[collection_name]

    def find_all(self):
        items = list(self.collection.find())
        for item in items:
            item['_id'] = str(item['_id'])  # Convertendo o ObjectId para string
        return items

    def insert(self, data):
        return self.collection.insert_one(data)