from flask import jsonify
from Modelo import Country
from Persistencia.PlayerAttributesDAO import PlayerAttributesDAO
from Persistencia.TeamAttributesDAO import TeamAttributesDAO
from Persistencia.PlayerDAO import PlayerDAO
from Persistencia.TeamDAO import TeamDAO

class MatchesController:
    def __init__(self,matchesDAO):
        self.matches_dao = matchesDAO
    
    def consultar(self,request):
        if request.method == "GET":
            matches = self.matches_dao.find_all()
            if matches:
                return jsonify(matches), 200
            else:
                return jsonify({'error': 'Dados Não encontrados'}), 400
            
    def filtrar_knn(self,request, codigo):
        if request.method == "GET":
            matches = self.matches_dao.find_by_team(codigo)
            listPartidas = list()
            teamDAO = TeamAttributesDAO()
            #listPartidas =teamDAO.find_by_team_date(9930,"2015-09-11 00:00:00")
            #contD = contE =contV =0
            for match in matches:
                # Acessando os campos de cada documento
                if(len(listPartidas) <18):
                    time = match['home_team_api_id']
                    if(time == codigo):
                        if(match['home_team_goal'] <= match['away_team_goal'] ):
                            teams =teamDAO.find_by_team_date(match['away_team_api_id'],match["date"])                           
                            listPartidas.append(teams)
                            print(match['away_team_api_id'])
                    else:
                        if(match['away_team_goal'] <= match['home_team_goal'] ):
                            teams =teamDAO.find_by_team_date(match['home_team_api_id'],match["date"])
                            listPartidas.append(teams)
                            print(match['home_team_api_id'])
                else:
                    break
                
        print(listPartidas[13])
        if listPartidas:
            return jsonify(listPartidas), 200
        else:
            return jsonify({'error': 'Dados Não encontrados'}), 400
    
    def filtrar(self,request, codigo):
        if request.method == "GET":
            matches = self.matches_dao.find_by_team(codigo)
            listPartidas = list()
            teamDAO = TeamAttributesDAO()
            #listPartidas =teamDAO.find_by_team_date(9930,"2015-09-11 00:00:00")
            contD = contE =contV =0
            for match in matches:
                # Acessando os campos de cada documento
                if(len(listPartidas) <15):
                    time = match['home_team_api_id']
                    if(time == codigo):
                        teams =teamDAO.find_by_team_date(match['away_team_api_id'],match["date"])                           
                        if(match['home_team_goal'] < match['away_team_goal'] and contD<5):
                            print("D")
                            contD+=1
                            listPartidas.append(teams)
                        elif(match['home_team_goal'] > match['away_team_goal']and contV<5):
                            print("V")
                            contV+=1
                            listPartidas.append(teams)
                        elif(match['home_team_goal'] == match['away_team_goal']and contE<5):
                            print("E")
                            contE+=1
                            listPartidas.append(teams)

                        # if(match['home_team_goal'] <= match['away_team_goal'] ):
                        #     teams =teamDAO.find_by_team_date(match['away_team_api_id'],match["date"])                           
                        #     listPartidas.append(teams)
                        #     print(match['away_team_api_id'])
                    else:
                        teams =teamDAO.find_by_team_date(match['home_team_api_id'],match["date"]) 
                        if(match['home_team_goal'] > match['away_team_goal'] and  contD<5):
                            print("D")
                            contD+=1
                            listPartidas.append(teams)
                        elif(match['home_team_goal'] < match['away_team_goal'] and contV<5):
                            print("V")
                            contV+=1
                            listPartidas.append(teams)
                        elif(match['home_team_goal'] == match['away_team_goal']and contE<5):
                            print("E")
                            contE+=1
                            listPartidas.append(teams)

                        # if(match['away_team_goal'] <= match['home_team_goal'] ):
                        #     teams =teamDAO.find_by_team_date(match['home_team_api_id'],match["date"])
                        #     listPartidas.append(teams)
                        #     print(match['home_team_api_id'])
                else:
                    break
            #playerDAO = PlayerAttributesDAO()
            # players = playerDAO.find_by_player_date(19243,'2015-10-16 00:00:00')
            # for partidas in listPartidas:
            #     for i in range(1, 12):
                    # partidas['away_player_'+str(i)] = playerDAO.find_by_player_date(partidas['away_player_'+str(i)],partidas['date'])
                    # partidas['home_player_'+str(i)] = playerDAO.find_by_player_date(partidas['home_player_'+str(i)],partidas['date'])
                
        print(len(listPartidas))
        if listPartidas:
            return jsonify(listPartidas), 200
        else:
            return jsonify({'error': 'Dados Não encontrados'}), 400
    
    def filtrar_saida(self,request, codigo):
        if request.method == "GET":
            matches = self.matches_dao.find_by_team(codigo)
            listVDE = []
            teamDAO = TeamAttributesDAO()
            #listPartidas =teamDAO.find_by_team_date(9930,"2015-09-11 00:00:00")
            contD = contE =contV =0
            for match in matches:
                # Acessando os campos de cada documento
                if(len(listVDE) <15):
                    time = match['home_team_api_id']
                    if(time == codigo):
                                                
                        if(match['home_team_goal'] < match['away_team_goal'] and contD<5):
                            print("D")
                            contD+=1
                            listVDE.append(0)
                        elif(match['home_team_goal'] > match['away_team_goal']and contV<5):
                            print("V")
                            contV+=1
                            listVDE.append(2)
                        elif(match['home_team_goal'] == match['away_team_goal']and contE<5):
                            print("E")
                            contE+=1
                            listVDE.append(1)

                        # if(match['home_team_goal'] <= match['away_team_goal'] ):
                        #     teams =teamDAO.find_by_team_date(match['away_team_api_id'],match["date"])                           
                        #     listPartidas.append(teams)
                        #     print(match['away_team_api_id'])
                    else:
                     
                        if(match['home_team_goal'] > match['away_team_goal'] and  contD<5):
                            print("D")
                            contD+=1
                            listVDE.append(0)
                        elif(match['home_team_goal'] < match['away_team_goal'] and contV<5):
                            print("V")
                            contV+=1
                            listVDE.append(2)
                        elif(match['home_team_goal'] == match['away_team_goal']and contE<5):
                            print("E")
                            contE+=1
                            listVDE.append(1)

                        # if(match['away_team_goal'] <= match['home_team_goal'] ):
                        #     teams =teamDAO.find_by_team_date(match['home_team_api_id'],match["date"])
                        #     listPartidas.append(teams)
                        #     print(match['home_team_api_id'])
                else:
                    break
            #playerDAO = PlayerAttributesDAO()
            # players = playerDAO.find_by_player_date(19243,'2015-10-16 00:00:00')
            # for partidas in listPartidas:
            #     for i in range(1, 12):
                    # partidas['away_player_'+str(i)] = playerDAO.find_by_player_date(partidas['away_player_'+str(i)],partidas['date'])
                    # partidas['home_player_'+str(i)] = playerDAO.find_by_player_date(partidas['home_player_'+str(i)],partidas['date'])
                
        print(listVDE[13])
        if listVDE:
            return jsonify(listVDE), 200
        else:
            return jsonify({'error': 'Dados Não encontrados'}), 400


    def buscarTeamStageSeason(self,request):
        if request.method == "GET":

            # Obtendo os parâmetros da query string
            team =int( request.args.get('team'))
            stage = int(request.args.get('stage'))
            seaseon = request.args.get('season')
            print(seaseon)
            print(team)
            print(type(stage))
            matches = self.matches_dao.find_by_team_stage_season(team,stage,seaseon)
            #print(matches)
            playerDAO = PlayerDAO()
            for partidas in matches:
                for i in range(1, 12):
                    partidas['away_player_'+str(i)] = playerDAO.find_by_player(partidas['away_player_'+str(i)])
                    partidas['home_player_'+str(i)] = playerDAO.find_by_player(partidas['home_player_'+str(i)])

        if matches:
            return jsonify(matches), 200
        else:
            return jsonify({'error': 'Dados Não encontrados'}), 400
        
    def buscarStageSeason(self,request):
        if request.method == "GET":

            # Obtendo os parâmetros da query string
            stage = int(request.args.get('stage'))
            seaseon = request.args.get('season')
            print(seaseon)
            print(type(stage))
            matches = self.matches_dao.find_by_stage_season(stage,seaseon)
            #print(matches)
            teamDAO = TeamDAO()
            for partidas in matches:
                partidas['away_team_api_id'] = teamDAO.find_by_team(partidas['away_team_api_id'])
                partidas['home_team_api_id'] = teamDAO.find_by_team(partidas['home_team_api_id'])

        if matches:
            return jsonify(matches), 200
        else:
            return jsonify({'error': 'Dados Não encontrados'}), 400
        
    def buscarCharacteristicAdversario(self,request):
        if request.method == "GET":

            # Obtendo os parâmetros da query string
            team =int( request.args.get('team'))
            stage = int(request.args.get('stage'))
            seaseon = request.args.get('season')
            print(team)
            print(type(stage))
            matches = self.matches_dao.find_by_team_stage_season(team,stage,seaseon)
            #print(matches)
            playerDAO = PlayerAttributesDAO()
            #players = playerDAO.find_by_characteristic_order(19243,'2015-10-16 00:00:00')
            #print(players)
            contDef =contMei = contAta =0
            setorDefesa = {}
            setorMeio = {}
            setorOfensivo = {}
            for partidas in matches:
                print(partidas['away_team_api_id'])
                print(partidas['home_team_api_id'])
                if partidas['away_team_api_id'] !=team:
                    print("fora")
                    for i in range(1, 12):
                        #print(partidas['away_player_'+str(i)])
                        if partidas['away_player_Y'+str(i)] == 3:
                            players= playerDAO.find_by_characteristic_order(partidas['away_player_'+str(i)],'2015-10-16 00:00:00')
                            #print(players)
                            if players:
                                    contDef+=1
                                    for campo, valor in players.items():
                                        if campo in setorDefesa:
                                            setorDefesa[campo] += valor
                                        else:
                                            setorDefesa[campo] = valor
                        if partidas['away_player_Y'+str(i)]>= 5 and partidas['away_player_Y'+str(i)]<= 9 :
                            players= playerDAO.find_by_characteristic_order(partidas['away_player_'+str(i)],'2015-10-16 00:00:00')
                            if players:
                                    contMei+=1
                                    for campo, valor in players.items():
                                        if campo in setorMeio:
                                            setorMeio[campo] += valor
                                        else:
                                            setorMeio[campo] = valor
                        if partidas['away_player_Y'+str(i)]>= 10:
                            players= playerDAO.find_by_characteristic_order(partidas['away_player_'+str(i)],'2015-10-16 00:00:00')
                            if players:
                                    contAta+=1
                                    for campo, valor in players.items():
                                        if campo in setorOfensivo:
                                            setorOfensivo[campo] += valor
                                        else:
                                            setorOfensivo[campo] = valor
                                    
                        # partidas['away_player_'+str(i)] = playerDAO.find_by_characteristic_order(partidas['away_player_'+str(i)])
                        # partidas['home_player_'+str(i)] = playerDAO.find_by_characteristic_order(partidas['home_player_'+str(i)])
                else:
                    print("dentro")
                    for i in range(1, 12):
                        #print(partidas['away_player_'+str(i)])
                        if partidas['home_player_Y'+str(i)] == 3:
                            players= playerDAO.find_by_characteristic_order(partidas['home_player_'+str(i)],'2015-10-16 00:00:00')
                            #print(players)
                            if players:
                                    contDef+=1
                                    for campo, valor in players.items():
                                        if campo in setorDefesa:
                                            setorDefesa[campo] += valor
                                        else:
                                            setorDefesa[campo] = valor
                        if partidas['home_player_Y'+str(i)]>= 5 and partidas['home_player_Y'+str(i)]<= 9 :
                            players= playerDAO.find_by_characteristic_order(partidas['home_player_'+str(i)],'2015-10-16 00:00:00')
                            if players:
                                    contMei+=1
                                    for campo, valor in players.items():
                                        if campo in setorMeio:
                                            setorMeio[campo] += valor
                                        else:
                                            setorMeio[campo] = valor
                        if partidas['home_player_Y'+str(i)]>= 10:
                            players= playerDAO.find_by_characteristic_order(partidas['home_player_'+str(i)],'2015-10-16 00:00:00')
                            if players:
                                    contAta+=1
                                    for campo, valor in players.items():
                                        if campo in setorOfensivo:
                                            setorOfensivo[campo] += valor
                                        else:
                                            setorOfensivo[campo] = valor
                                    

            
        # print(setorDefesa)
        # print(setorMeio)
        # print(setorOfensivo)
        retorno = list()
        retorno.append({ 'setorOfensivo' : 0, 'setorMeio' : 0, 'setorDefensivo' : 0})
        retorno[0]['setorDefensivo'] =dict(sorted(setorDefesa.items(), key=lambda item: item[1], reverse=True)[:5])
        retorno[0]['setorMeio'] =dict(sorted(setorMeio.items(), key=lambda item: item[1], reverse=True)[:5])
        retorno[0]['setorOfensivo'] =dict(sorted(setorOfensivo.items(), key=lambda item: item[1], reverse=True)[:5])
        # print(contAta)
        # print(contDef)
        # print(contMei)
        #dividir por quantos jogadores tem em cada setor
        for setor in retorno[0]:
            if setor == 'setorOfensivo':
                for chave in retorno[0][setor]:
                    retorno[0][setor][chave] /= contAta
            if setor == 'setorMeio':
                for chave in retorno[0][setor]:
                    retorno[0][setor][chave] /= contMei
            if setor == 'setorDefensivo':
                for chave in retorno[0][setor]:
                    retorno[0][setor][chave] /= contDef
        print(retorno)
        if retorno:
            return jsonify(retorno), 200
        else:
            return jsonify({'error': 'Dados Não encontrados'}), 400
