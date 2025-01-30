
from flask import jsonify
from Modelo import Country
from Persistencia.MatchesDAO import MatchesDAO
from Persistencia.PlayerAttributesDAO import PlayerAttributesDAO


class PlayerController:
    def __init__(self,playerDAO):
        self.player_dao = playerDAO
    
    def consultar(self,request):
        if request.method == "GET":
            player = self.player_dao.find_all()
            if player:
                return jsonify(player), 200
            else:
                return jsonify({'error': 'Dados Não encontrados'}), 400
    
    def buscarPlayerTeam(self,request):
        if request.method == "GET":
            # Obtendo os parâmetros da query string
            team =int( request.args.get('team'))
            seaseon = request.args.get('season')


            matches_dao = MatchesDAO()
            playerAtriDAO = PlayerAttributesDAO()
            

            listaJogadores ={}
            matches = matches_dao.find_by_team_season(team, seaseon)
            for match in matches:
                time = match['home_team_api_id']
                if len(listaJogadores) < 22 :
                    if(time == team):
                        for i in range(1, 12):                     
                            player = self.player_dao.find_by_player(match['home_player_'+str(i)])
                            #print(playersAtr)
                            if (player[0]['player_name'] not in listaJogadores) and len(listaJogadores) < 22:
                                playersAtr= playerAtriDAO.find_by_characteristic_order(match['home_player_'+str(i)],'2015-10-16 00:00:00')
                                listaJogadores[player[0]['player_name']] = dict(playersAtr)
                                print(player[0]['player_name'])
                else:
                    break
                       
                
            if listaJogadores:
                return jsonify(listaJogadores), 200
            else:
                return jsonify({'error': 'Dados Não encontrados'}), 400