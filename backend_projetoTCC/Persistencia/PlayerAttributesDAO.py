from pymongo import MongoClient
from .BaseDAO import BaseDAO

class PlayerAttributesDAO(BaseDAO):
    def __init__(self):
        super().__init__('player_attributes')

    def find_by_player_date(self, playerID, date):
        items = list(self.collection.find({'player_api_id': playerID, 'date': {'$lt': date}}).sort('date', -1).limit(1)) #pegar o id do player e tem que ser menor que a data do jogo
        for item in items:
            item['_id'] = str(item['_id'])  # Convertendo o ObjectId para string
        return items
    
    def find_by_characteristic_order(self,playerID,date):
        items = list(self.collection.find({'player_api_id': playerID, 'date': {'$lt': date}}).sort('date', -1).limit(1))
        if not items:
            return None  # Se nenhum documento for encontrado
        # Supondo que sempre retornará um único documento
        documento = items[0]
        # Remover o campo '_id' para não ser considerado
        documento.pop('_id', None)
        documento.pop('id', None)
        documento.pop('player_fifa_api_id', None)
        documento.pop('player_api_id', None)
        documento.pop('date', None)
        documento.pop('preferred_foot', None)
        documento.pop('attacking_work_rate', None)
        documento.pop('defensive_work_rate', None)
        documento.pop('overall_rating', None)
        documento.pop('potential', None)
        
        #print(documento)
        # Ordenar os campos pelo valor (do maior para o menor)
        campos_ordenados = sorted(documento.items(), key=lambda item: item[1], reverse=True)

        return dict(campos_ordenados)