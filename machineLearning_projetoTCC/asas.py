def redeNeural(data,dataTeste):
    # Dados fornecidos
    # data = [
    #     [
    #         {
    #             "_id": "663a9ff871921f6be0872201",
    #             "buildUpPlayDribbling": 45,
    #             "buildUpPlayDribblingClass": "Normal",
    #             "buildUpPlayPassing": 49,
    #             "buildUpPlayPassingClass": "Mixed",
    #             "buildUpPlayPositioningClass": "Organised",
    #             "buildUpPlaySpeed": 58,
    #             "buildUpPlaySpeedClass": "Balanced",
    #             "chanceCreationCrossing": 54,
    #             "chanceCreationCrossingClass": "Normal",
    #             "chanceCreationPassing": 47,
    #             "chanceCreationPassingClass": "Normal",
    #             "chanceCreationPositioningClass": "Organised",
    #             "chanceCreationShooting": 46,
    #             "chanceCreationShootingClass": "Normal",
    #             "date": "2015-09-10 00:00:00",
    #             "defenceAggression": 39,
    #             "defenceAggressionClass": "Press",
    #             "defenceDefenderLineClass": "Cover",
    #             "defencePressure": 41,
    #             "defencePressureClass": "Medium",
    #             "defenceTeamWidth": 51,
    #             "defenceTeamWidthClass": "Normal",
    #             "id": 898,
    #             "team_api_id": 10261,
    #             "team_fifa_api_id": 13
    #         }
    #     ],
    #     [
    #         {
    #             "_id": "663a9ff871921f6be0872145",
    #             "buildUpPlayDribbling": 45,
    #             "buildUpPlayDribblingClass": "Normal",
    #             "buildUpPlayPassing": 67,
    #             "buildUpPlayPassingClass": "Long",
    #             "buildUpPlayPositioningClass": "Organised",
    #             "buildUpPlaySpeed": 61,
    #             "buildUpPlaySpeedClass": "Balanced",
    #             "chanceCreationCrossing": 69,
    #             "chanceCreationCrossingClass": "Lots",
    #             "chanceCreationPassing": 67,
    #             "chanceCreationPassingClass": "Risky",
    #             "chanceCreationPositioningClass": "Organised",
    #             "chanceCreationShooting": 50,
    #             "chanceCreationShootingClass": "Normal",
    #             "date": "2015-09-10 00:00:00",
    #             "defenceAggression": 34,
    #             "defenceAggressionClass": "Press",
    #             "defenceDefenderLineClass": "Cover",
    #             "defencePressure": 36,
    #             "defencePressureClass": "Medium",
    #             "defenceTeamWidth": 41,
    #             "defenceTeamWidthClass": "Normal",
    #             "id": 341,
    #             "team_api_id": 9826,
    #             "team_fifa_api_id": 1799
    #         }
    #     ]
    # ]

    # Achatar a lista de listas para uma única lista
    flattened_data = [item for sublist in data for item in sublist]
    #print(flattened_data)
    # Converter para DataFrame
    dados = pd.DataFrame(flattened_data)
    #print(dados)
    # Exibir o DataFrame
    
    dados = dados.drop('date',axis=1)
    dados = dados.drop('team_fifa_api_id',axis=1)
    dados = dados.drop('team_api_id',axis=1)
    dados = dados.drop('id',axis=1)
    dados = dados.drop('_id',axis=1)
    dados = dados.drop('buildUpPlayDribbling',axis=1)
    dados = dados.drop('buildUpPlayDribblingClass',axis=1)
    #print(dados)
    atributos = dados.iloc[:,:].values
    #print(dados['buildUpPlayDribblingClass'].value_counts().size)
    labelencoder_atributos = LabelEncoder()
    atributos[:,1] = labelencoder_atributos.fit_transform(atributos[:,1]) # aplica o LabelEncoder, ou seja, tranforma a classe categorica em numero
    #atributos[:,3] = labelencoder_atributos.fit_transform(atributos[:,3])
    atributos[:,2] = labelencoder_atributos.fit_transform(atributos[:,2])
    atributos[:,4] = labelencoder_atributos.fit_transform(atributos[:,4])
    atributos[:,6] = labelencoder_atributos.fit_transform(atributos[:,6])
    atributos[:,8] = labelencoder_atributos.fit_transform(atributos[:,8])
    atributos[:,9] = labelencoder_atributos.fit_transform(atributos[:,9])
    atributos[:,11] = labelencoder_atributos.fit_transform(atributos[:,11])
    atributos[:,13] = labelencoder_atributos.fit_transform(atributos[:,13])
    atributos[:,14] = labelencoder_atributos.fit_transform(atributos[:,14])
    atributos[:,16] = labelencoder_atributos.fit_transform(atributos[:,16])
    atributos[:,18] = labelencoder_atributos.fit_transform(atributos[:,18])
    #print(atributos.cont)

    # oneColunas =[]
    # # if(dados['buildUpPlayDribblingClass'].value_counts().size > 2):
    # #     oneColunas.append(1)
    # if(dados['buildUpPlayPassingClass'].value_counts().size > 2):
    #     oneColunas.append(1)
    # if(dados['buildUpPlayPositioningClass'].value_counts().size > 2):
    #     oneColunas.append(2)
    # if(dados['buildUpPlaySpeedClass'].value_counts().size > 2):
    #     oneColunas.append(4)
    # if(dados['chanceCreationCrossingClass'].value_counts().size > 2):
    #     oneColunas.append(6)
    # if(dados['chanceCreationPassingClass'].value_counts().size > 2):
    #     oneColunas.append(8)
    # if(dados['chanceCreationPositioningClass'].value_counts().size > 2):
    #     oneColunas.append(9)
    # if(dados['chanceCreationShootingClass'].value_counts().size > 2):
    #     oneColunas.append(11)
    # if(dados['defenceAggressionClass'].value_counts().size > 2):
    #     oneColunas.append(13)
    # if(dados['defenceDefenderLineClass'].value_counts().size > 2):
    #     oneColunas.append(14)
    # if(dados['defencePressureClass'].value_counts().size > 2):
    #     oneColunas.append(16)
    # if(dados['defenceTeamWidthClass'].value_counts().size > 2):
    #     oneColunas.append(18)

    # #print(oneColunas)
    # # print(atributos[:,:])
    # onehotencoder = ColumnTransformer([('one_hot_encoder',OneHotEncoder(),oneColunas)], remainder='passthrough') # trasformas as colunas em 0 0 1.Ex golf = 001 ,grand = 010 ...
    # atributos = onehotencoder.fit_transform(atributos)
    atributos = atributos.astype(float)
    # print(atributos[:,:])
    # print(atributos.shape[1])

    # DERROTA - 0 EMPATE - 1 VITORIA - 2 
    # classe_saida = np.full(15, 2)
    classe_saida = np.full(atributos.shape[0], 2)
    #classe_saida =[2,1,2,1,1,2,2,2,2,1,1,2,2,2,1]
    classe_saida =[1,1,1,2,1,1,1,1,2,1,2,1,2,2,2]
    print(classe_saida)
    # classe_saida = pd.get_dummies(classe_saida).values  # Transformar em one-hot encoding
    classe_saida = np.eye(3)[classe_saida]
    print(classe_saida)

    # Criando um modelo sequencial
    model = Sequential()
    # Adicionando uma camada densa com 2 neurônios de entrada e 4 neurônios de saída
    model.add(Dense(15, input_shape=(atributos.shape[1],), activation='relu'))
    model.add(Dense(10, activation='relu'))
    model.add(Dense(10, activation='relu'))
    # Adicionando uma camada densa com 1 neurônio de saída
    model.add(Dense(3, activation='softmax'))

    # Compilando o modelo
    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

    # Treinando o modelo
    model.fit(atributos,classe_saida, epochs=230, verbose=1)

    #-----> TESTE   
    dtTeste=[]
    dtTeste.append(dataTeste)
    dadosteste = pd.DataFrame(dtTeste)
    #print(dadosteste)

    atributosTeste = dadosteste.iloc[:,:].values
    #print(dados['buildUpPlayDribblingClass'].value_counts().size)
    atributosTeste[:,1] = labelencoder_atributos.fit_transform(atributosTeste[:,1]) # aplica o LabelEncoder, ou seja, tranforma a classe categorica em numero
    #atributos[:,3] = labelencoder_atributos.fit_transform(atributos[:,3])
    atributosTeste[:,2] = labelencoder_atributos.fit_transform(atributosTeste[:,2])
    atributosTeste[:,4] = labelencoder_atributos.fit_transform(atributosTeste[:,4])
    atributosTeste[:,6] = labelencoder_atributos.fit_transform(atributosTeste[:,6])
    atributosTeste[:,8] = labelencoder_atributos.fit_transform(atributosTeste[:,8])
    atributosTeste[:,9] = labelencoder_atributos.fit_transform(atributosTeste[:,9])
    atributosTeste[:,11] = labelencoder_atributos.fit_transform(atributosTeste[:,11])
    atributosTeste[:,13] = labelencoder_atributos.fit_transform(atributosTeste[:,13])
    atributosTeste[:,14] = labelencoder_atributos.fit_transform(atributosTeste[:,14])
    atributosTeste[:,16] = labelencoder_atributos.fit_transform(atributosTeste[:,16])
    atributosTeste[:,18] = labelencoder_atributos.fit_transform(atributosTeste[:,18])

    # oneColunas =[]
    # if(dadosteste['buildUpPlayPassingClass'].value_counts().size > 2):
    #     oneColunas.append(1)
    # if(dadosteste['buildUpPlayPositioningClass'].value_counts().size > 2):
    #     oneColunas.append(2)
    # if(dadosteste['buildUpPlaySpeedClass'].value_counts().size > 2):
    #     oneColunas.append(4)
    # if(dadosteste['chanceCreationCrossingClass'].value_counts().size > 2):
    #     oneColunas.append(6)
    # if(dadosteste['chanceCreationPassingClass'].value_counts().size > 2):
    #     oneColunas.append(8)
    # if(dadosteste['chanceCreationPositioningClass'].value_counts().size > 2):
    #     oneColunas.append(9)
    # if(dadosteste['chanceCreationShootingClass'].value_counts().size > 2):
    #     oneColunas.append(11)
    # if(dadosteste['defenceAggressionClass'].value_counts().size > 2):
    #     oneColunas.append(13)
    # if(dadosteste['defenceDefenderLineClass'].value_counts().size > 2):
    #     oneColunas.append(14)
    # if(dadosteste['defencePressureClass'].value_counts().size > 2):
    #     oneColunas.append(16)
    # if(dadosteste['defenceTeamWidthClass'].value_counts().size > 2):
    #     oneColunas.append(18)

    # print(oneColunas)
   
    # onehotencoder = ColumnTransformer([('one_hot_encoder',OneHotEncoder(),oneColunas)], remainder='passthrough') # trasformas as colunas em 0 0 1.Ex golf = 001 ,grand = 010 ...
    # atributosTeste = onehotencoder.fit_transform(atributosTeste)
    atributosTeste = atributosTeste.astype(float)
   # print(atributos[:,:])
    classe_saidaTeste = np.full(1, 2)
    #print(classe_saidaTeste)
    classe_saidaTeste = np.eye(3)[classe_saidaTeste]
    print(classe_saidaTeste)
    # Avaliando o modelo
    # loss, accuracy = model.evaluate(atributosTeste, classe_saidaTeste)
    # print(f"Acurácia do modelo: {accuracy} e loss:{loss}")
    # Avaliar dados de teste
    predicoes = model.predict(atributosTeste)

    # Transformar probabilidades em escala de 0 a 100
    predicoes_percentuais = predicoes * 100

    print("Saída do modelo para os dados de teste (probabilidades em %):")
    print(predicoes_percentuais)

    # Para obter a classe com a maior probabilidade
    classe_predita = np.argmax(predicoes, axis=1)
    print("Classe prevista para os dados de teste:", classe_predita)
    print(predicoes_percentuais[0][0])

    resultado = {
        "derrota": str(float(predicoes_percentuais[0][0])),
        "empate": str(float(predicoes_percentuais[0][1])),
        "vitoria": str(float(predicoes_percentuais[0][2])),
    }

    return resultado


def redeNeural2(data, dataTeste):

    # Achatar a lista de listas para uma única lista
    flattened_data = [item for sublist in data for item in sublist]
    dados = pd.DataFrame(flattened_data)
    dados = dados.drop(['date', 'team_fifa_api_id', 'team_api_id', 'id', '_id', 'buildUpPlayDribbling', 'buildUpPlayDribblingClass'], axis=1)

    atributos = dados.iloc[:, :].values
    labelencoder_atributos = LabelEncoder()
    atributos[:, 1] = labelencoder_atributos.fit_transform(atributos[:, 1])
    atributos[:, 2] = labelencoder_atributos.fit_transform(atributos[:, 2])
    atributos[:, 4] = labelencoder_atributos.fit_transform(atributos[:, 4])
    atributos[:, 6] = labelencoder_atributos.fit_transform(atributos[:, 6])
    atributos[:, 8] = labelencoder_atributos.fit_transform(atributos[:, 8])
    atributos[:, 9] = labelencoder_atributos.fit_transform(atributos[:, 9])
    atributos[:, 11] = labelencoder_atributos.fit_transform(atributos[:, 11])
    atributos[:, 13] = labelencoder_atributos.fit_transform(atributos[:, 13])
    atributos[:, 14] = labelencoder_atributos.fit_transform(atributos[:, 14])
    atributos[:, 16] = labelencoder_atributos.fit_transform(atributos[:, 16])
    atributos[:, 18] = labelencoder_atributos.fit_transform(atributos[:, 18])
    atributos = atributos.astype(float)

    #classe_saida = [2, 1, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1]
    #classe_saida = [1,1,1,2,1,1,1,1,2,1,2,1,2,2,2]
    #classe_saida = [1,0,0,1,1,0,2,1,1,1,1,2,0,1,2]
    classe_saida = [1,0,0,1,1,0,2,1,1,2,0,2,2,0,2]
    classe_saida = np.eye(3)[classe_saida]

    # Criando um modelo sequencial
    model = Sequential()
    model.add(Dense(15, input_shape=(atributos.shape[1],), activation='relu'))
    model.add(Dense(10, activation='relu'))
    #model.add(Dropout(0.2))
    model.add(Dense(10, activation='relu'))
    #model.add(Dropout(0.2))
    #model.add(Dense(10, activation='relu'))
    model.add(Dense(3, activation='softmax'))

    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

    # Callbacks para reduzir o learning rate e salvar o melhor modelo
    reduce_lr = ReduceLROnPlateau(monitor='loss', factor=0.15, patience=5, min_lr=0.001, verbose=1)
    model_checkpoint = ModelCheckpoint('best_model.keras', monitor='loss', save_best_only=True, verbose=1)

    # Treinando o modelo com callbacks
    #model.fit(atributos, classe_saida, epochs=600, verbose=1, callbacks=[reduce_lr, model_checkpoint])
    # Prever os resultados para os dados de treinamento
    predicoes = model.predict(atributos)

    # Exibir as predições antes de converter para classes
    print("Valores das predições (probabilidades para cada classe):")
    for i, pred in enumerate(predicoes):
        #print(f"Exemplo {i+1}: {pred*100}")
         # Multiplicar por 100 e formatar com 2 casas decimais
        pred_formatado = [f"{p * 100:.2f}%" for p in pred]
        print(f"Exemplo {i+1}: {pred_formatado}")

    # Converter as previsões em classes (a classe com maior probabilidade)
    classe_predita = np.argmax(predicoes, axis=1)

    # Converter as classes reais (one-hot encoded) de volta para valores originais
    classe_real = np.argmax(classe_saida, axis=1)

    # Exibir os resultados esperados (classe real) e os resultados previstos (classe predida)
    cont=0
    for i in range(len(classe_real)):
        print(f"Exemplo {i+1}: Classe Real = {classe_real[i]}, Classe Predita = {classe_predita[i]}")
        if classe_real[i] == classe_predita[i]:
            cont+=1
    print(f"{cont} de 15 são iguais. {(cont/15)*100}% de Acertos")

    # # Gerar a matriz de confusão
    # matriz_confusao = confusion_matrix(classe_real, classe_predita)

    # # Plotar a matriz de confusão
    # plt.figure(figsize=(8,6))
    # sns.heatmap(matriz_confusao, annot=True, fmt='g', cmap='Blues')
    # plt.xlabel('Classe Predita')
    # plt.ylabel('Classe Real')
    # plt.title('Matriz de Confusão')
    # plt.show()


    #-----> TESTE   
    dtTeste = []
    print(dataTeste)
    dtTeste.append(dataTeste)
    dadosteste = pd.DataFrame(dtTeste)
    atributosTeste = dadosteste.iloc[:, :].values
    atributosTeste[:, 1] = labelencoder_atributos.fit_transform(atributosTeste[:, 1])
    atributosTeste[:, 2] = labelencoder_atributos.fit_transform(atributosTeste[:, 2])
    atributosTeste[:, 4] = labelencoder_atributos.fit_transform(atributosTeste[:, 4])
    atributosTeste[:, 6] = labelencoder_atributos.fit_transform(atributosTeste[:, 6])
    atributosTeste[:, 8] = labelencoder_atributos.fit_transform(atributosTeste[:, 8])
    atributosTeste[:, 9] = labelencoder_atributos.fit_transform(atributosTeste[:, 9])
    atributosTeste[:, 11] = labelencoder_atributos.fit_transform(atributosTeste[:, 11])
    atributosTeste[:, 13] = labelencoder_atributos.fit_transform(atributosTeste[:, 13])
    atributosTeste[:, 14] = labelencoder_atributos.fit_transform(atributosTeste[:, 14])
    atributosTeste[:, 16] = labelencoder_atributos.fit_transform(atributosTeste[:, 16])
    atributosTeste[:, 18] = labelencoder_atributos.fit_transform(atributosTeste[:, 18])
    print(atributosTeste)
    atributosTeste = atributosTeste.astype(float)
    print(atributosTeste)

    classe_saidaTeste = np.full(1, 2)
    classe_saidaTeste = np.eye(3)[classe_saidaTeste]

    # Carregar o melhor modelo salvo
    model.load_weights('best_model.keras')

    # Avaliar dados de teste
    predicoes = model.predict(atributosTeste)
    predicoes_percentuais = predicoes * 100

    print("Saída do modelo para os dados de teste (probabilidades em %):")
    print(predicoes_percentuais)

    classe_predita = np.argmax(predicoes, axis=1)
    print("Classe prevista para os dados de teste:", classe_predita)
    print(predicoes_percentuais[0][0])

    resultado = {
        "derrota": str(float(predicoes_percentuais[0][0])),
        "empate": str(float(predicoes_percentuais[0][1])),
        "vitoria": str(float(predicoes_percentuais[0][2])),
    }

    return resultado

def knn_regression(data, dataTeste):
    # Achatar a lista de listas para uma única lista
    flattened_data = [item for sublist in data for item in sublist]
    dados = pd.DataFrame(flattened_data)

    # Remover colunas desnecessárias
    dados = dados.drop(['date', 'team_fifa_api_id', 'team_api_id', 'id', '_id', 'buildUpPlayDribbling', 'buildUpPlayDribblingClass'], axis=1)


    # Codificar colunas categóricas
    labelencoder = LabelEncoder()
    for column in dados.select_dtypes(include=['object']).columns:
        dados[column] = labelencoder.fit_transform(dados[column])
    
    atributos = dados.values
    print(dados[['buildUpPlayPassing']].values)
    # Definindo as variáveis alvo (exemplo)
    y = dados[['buildUpPlayPassing', 'chanceCreationCrossing']].values  # Vários alvos para regressão

    # Criar e treinar o modelo KNN
    model = KNeighborsRegressor(n_neighbors=5)
    model.fit(atributos, y)

    # Preparando os dados de teste para previsão
    dtTeste = []
    dtTeste.append(dataTeste)
    dados_teste = pd.DataFrame(dtTeste)
    #dados_teste = dados_teste.drop(['date', 'team_fifa_api_id', 'team_api_id', 'id', '_id'], axis=1)

    # Codificando as mesmas colunas categóricas
    for column in dados_teste.select_dtypes(include=['object']).columns:
        dados_teste[column] = labelencoder.fit_transform(dados_teste[column])
    
    atributosTeste = dados_teste.values

    # Prever os resultados para os dados de teste
    previsao_teste = model.predict(atributosTeste)
    print(previsao_teste[0][0])
    resultado = {
        "buildUpPlayPassing": str(float(previsao_teste[0][0])),
        "chanceCreationCrossing": str(float(previsao_teste[0][1])),
        # Adicione outros atributos conforme necessário
    }
    print(resultado)
    resultado2 = {
        "derrota": 50,
        "empate": 50,
        "vitoria": 50,
    }

    return resultado2    


def knn_regression2(data):

    # Achatar a lista de listas para uma única lista
    flattened_data = [item for sublist in data for item in sublist]
    dados = pd.DataFrame(flattened_data)

    # Remover colunas desnecessárias
    dados = dados.drop(['date', 'team_fifa_api_id', 'team_api_id', 'id', '_id', 'buildUpPlayDribbling', 'buildUpPlayDribblingClass'], axis=1)

    # Codificar colunas categóricas
    labelencoder = LabelEncoder()
    for column in dados.select_dtypes(include=['object']).columns:
        dados[column] = labelencoder.fit_transform(dados[column])
    
    # Definindo as variáveis alvo
    X = dados.drop(columns=['buildUpPlayPassing', 'defenceTeamWidthClass']).values  # Atributos de entrada
    #X = dados.values
    y = dados[['buildUpPlayPassing']].values  # Variáveis alvo
    

    # Dividindo em conjunto de treino e teste (70% treino, 30% teste)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # Normalizar os dados (opcional, mas recomendado para KNN)
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    # Criar e treinar o modelo KNN
    model = KNeighborsRegressor(n_neighbors=5)
    model.fit(X_train, y_train)

    # Prever os resultados para o conjunto de teste
    previsao_teste = model.predict(X_test)
    
    # Exibindo os resultados para as primeiras previsões
    print(f"Previsões no conjunto de teste: {previsao_teste[:5]}")

    media_previsoes = previsao_teste.mean(axis=0)
    
    # Exibir a média das previsões
    print(f"Média das previsões no conjunto de teste: {media_previsoes}")

    # Retornar a média da previsão
    resultado = {
            "buildUpPlayPassing": str(float(media_previsoes[0])),
            #"chanceCreationCrossing": str(float(media_previsoes[1])),
    }
    print(resultado)
    resultado2 = {
        "derrota": 50,
        "empate": 50,
        "vitoria": 50,
    }

    return resultado2  