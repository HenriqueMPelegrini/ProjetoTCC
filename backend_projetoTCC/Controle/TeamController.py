from flask import jsonify
from Modelo import Country

class TeamController:
    def __init__(self,teamDAO):
        self.team_dao = teamDAO
    
    def consultar(self,request):
        if request.method == "GET":
            team = self.team_dao.find_all()
            if team:
                return jsonify(team), 200
            else:
                return jsonify({'error': 'Dados Não encontrados'}), 400
            
    def consultarOrdenado(self,request):
        if request.method == "GET":
            team = self.team_dao.find_all_ordenado()
            if team:
                return jsonify(team), 200
            else:
                return jsonify({'error': 'Dados Não encontrados'}), 400
            
    def consultarID(self,request, codigo):
        if request.method == "GET":
            team = self.team_dao.find_by_team(codigo)
            if team:
                return jsonify(team), 200
            else:
                return jsonify({'error': 'Dados Não encontrados'}), 400