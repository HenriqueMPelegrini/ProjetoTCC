from pymongo import MongoClient
from .BaseDAO import BaseDAO

class CountryDAO(BaseDAO):
    def __init__(self):
        super().__init__('country')