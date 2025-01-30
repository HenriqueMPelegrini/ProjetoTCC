from flask import jsonify
from Modelo import Country

class PlayerAttributesController:
    def __init__(self,playerAttrDAO):
        self.playerAttr_dao = playerAttrDAO
    
    def consultar(self,request):
        if request.method == "GET":
            playerAttr = self.playerAttr_dao.find_all()
            if playerAttr:
                return jsonify(playerAttr), 200
            else:
                return jsonify({'error': 'Dados Não encontrados'}), 400
            