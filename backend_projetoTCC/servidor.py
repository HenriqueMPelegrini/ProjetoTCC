from flask import Flask, request, jsonify
from flask_cors import CORS
from Controle.CountryController import CountryController
from Persistencia.CountryDAO import CountryDAO

from Controle.TeamController import TeamController
from Persistencia.TeamDAO import TeamDAO

from Controle.TeamAttributesController import TeamAttributesController
from Persistencia.TeamAttributesDAO import TeamAttributesDAO

from Controle.PlayerController import PlayerController
from Persistencia.PlayerDAO import PlayerDAO

from Controle.PlayerAttributesController import PlayerAttributesController
from Persistencia.PlayerAttributesDAO import PlayerAttributesDAO

from Controle.LeagueController import LeagueController
from Persistencia.LeagueDAO import LeagueDAO

from Controle.MatchesController import MatchesController
from Persistencia.MatchesDAO import MatchesDAO


app = Flask(__name__)
CORS(app)

country_controller = CountryController(CountryDAO())
team_controller = TeamController(TeamDAO())
player_controller = PlayerController(PlayerDAO())
playerAttr_controller = PlayerAttributesController(PlayerAttributesDAO())
teamAttr_controller = TeamAttributesController(TeamAttributesDAO())
league_controller = LeagueController(LeagueDAO())
matches_controller = MatchesController(MatchesDAO())



@app.route('/country', methods=['GET'])
def ConsultarCountry():
    return country_controller.consultar(request)

@app.route('/team', methods=['GET'])
def ConsultarTeam():
    return team_controller.consultar(request)
@app.route('/team/id/<int:codigo>', methods=['GET'])
def ConsultarID(codigo):
    return team_controller.consultarID(request,codigo)

@app.route('/team/ordenado', methods=['GET'])
def ConsultarTeamOrdenado():
    return team_controller.consultarOrdenado(request)

@app.route('/team_attributes', methods=['GET'])
def ConsultarTeamAttributes():
    return teamAttr_controller.consultar(request)

@app.route('/player', methods=['GET'])
def ConsultarPlayer():
    return player_controller.consultar(request)

@app.route('/player/team', methods=['GET'])
def ConsultarPlayerTeam():
    return player_controller.buscarPlayerTeam(request)

@app.route('/player_attributes', methods=['GET'])
def ConsultarPlayerAttributes():
    return playerAttr_controller.consultar(request)


@app.route('/league', methods=['GET'])
def ConsultarLeague():
    return league_controller.consultar(request)

@app.route('/matches', methods=['GET'])
def ConsultarMatches():
    return matches_controller.consultar(request)

@app.route('/matches/filtro/<int:codigo>', methods=['GET'])
def ConsultarMatchesFiltros(codigo):
    return matches_controller.filtrar(request, codigo)

@app.route('/matches/filtro_saida/<int:codigo>', methods=['GET'])
def ConsultarMatchesFiltrosSaida(codigo):
    return matches_controller.filtrar_saida(request, codigo)

@app.route('/matches/filtro_knn/<int:codigo>', methods=['GET'])
def ConsultarMatchesFiltrosKNN(codigo):
    return matches_controller.filtrar_knn(request, codigo)

@app.route('/matches/game', methods=['GET'])
def ConsultarMatchesGame():
    print("DEuu")
    return matches_controller.buscarTeamStageSeason(request)

@app.route('/matches/partidas', methods=['GET'])
def ConsultarJogos():
    print("Du")
    return matches_controller.buscarStageSeason(request)

@app.route('/matches/characteristic', methods=['GET'])
def ConsultarCharacteristicPlayer():
    print("assa")
    return matches_controller.buscarCharacteristicAdversario(request)


# @app.route('/users', methods=['POST'])
# def create_user():
#     data = request.json
#     if not data.get('username') or not data.get('email'):
#         return jsonify({'error': 'Dados incompletos'}), 400
    
#     user_controller.create_user(data['username'], data['email'])
#     return jsonify({'message': 'Usuário criado com sucesso'}), 201

if __name__ == '__main__':
    app.run(debug=True)
