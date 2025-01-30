from flask import jsonify
from Modelo import Country

class TeamAttributesController:
    def __init__(self,teamAttrDAO):
        self.teamAttr_dao = teamAttrDAO
    
    def consultar(self,request):
        if request.method == "GET":
            teamAttr = self.teamAttr_dao.find_all()
            if teamAttr:
                return jsonify(teamAttr), 200
            else:
                return jsonify({'error': 'Dados Não encontrados'}), 400