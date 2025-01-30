from flask import jsonify
from Modelo import Country

class LeagueController:
    def __init__(self,leagueDAO):
        self.league_dao = leagueDAO
    
    def consultar(self,request):
        if request.method == "GET":
            league = self.league_dao.find_all()
            if league:
                return jsonify(league), 200
            else:
                return jsonify({'error': 'Dados Não encontrados'}), 400