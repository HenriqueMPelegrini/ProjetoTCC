
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense,Dropout
import pandas as pd
from sklearn.preprocessing import LabelEncoder
#one hot encoding
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.metrics import confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# #---> Exemplos treinamento


from tensorflow.keras.callbacks import ReduceLROnPlateau, ModelCheckpoint

def redeNeural2(data, dataTeste, dataSaida):
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
    classe_saida = dataSaida
    classe_saida = np.eye(3)[classe_saida]

    # Criando um modelo sequencial
    model = Sequential()
    model.add(Dense(15, input_shape=(atributos.shape[1],), activation='relu'))
    model.add(Dense(10, activation='relu'))
    model.add(Dropout(0.1))
    model.add(Dense(10, activation='relu'))
    #model.add(Dropout(0.2))
    #model.add(Dense(10, activation='relu'))
    model.add(Dense(3, activation='softmax'))

    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

    # Callbacks para reduzir o learning rate e salvar o melhor modelo
    reduce_lr = ReduceLROnPlateau(monitor='loss', factor=0.15, patience=5, min_lr=0.001, verbose=1)
    model_checkpoint = ModelCheckpoint('best_model.keras', monitor='accuracy', save_best_only=True, verbose=1)

    # Treinando o modelo com callbacks
    model.fit(atributos, classe_saida, epochs=600, verbose=1, callbacks=[reduce_lr, model_checkpoint])
    #model.fit(atributos, classe_saida, epochs=600, verbose=1, callbacks=[reduce_lr, model_checkpoint])


    # Prever os resultados para os dados de treinamento
    predicoes = model.predict(atributos)
    #

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

    # Gerar a matriz de confusão
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

from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import GridSearchCV
from scipy.stats import zscore
def knn_regression_multitarget(data,colunas_alvo):
    flattened_data = [item for sublist in data for item in sublist]
    dados = pd.DataFrame(flattened_data)

    # Remover colunas desnecessárias
    dados = dados.drop(['date', 'team_fifa_api_id', 'team_api_id', 'id', '_id', 'buildUpPlayDribbling', 'buildUpPlayDribblingClass'], axis=1)

    # Codificar colunas categóricas
    labelencoder = LabelEncoder()
    for column in dados.select_dtypes(include=['object']).columns:
        dados[column] = labelencoder.fit_transform(dados[column])
       

    resultados = {}
    # Dicionário para armazenar os erros médios absolutos de cada variável alvo
    erros = []
    # Para cada coluna (variável alvo), remover ela de X e prever com base nas outras
    for target_col in colunas_alvo:
        print(f"Prevendo para a variável alvo: {target_col}")
        
        # X é todos os dados menos a coluna alvo atual
        X = dados.drop(columns=[target_col]).values
        # y é a coluna alvo
        y = dados[target_col].values

        # X são todos os dados menos a coluna alvo atual
        # X = dados_com_substituicao.drop(columns=[target_col]).values  # Usando dados com outliers substituídos
        # y = dados_com_substituicao[target_col].values  # Variável alvo
        
        # Dividindo em treino e teste
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
        # Normalizar os dados (opcional, mas recomendado para KNN)
        scaler = StandardScaler()
        X_train = scaler.fit_transform(X_train)
        X_test = scaler.transform(X_test)

        #Procurar o melhor número de vizinhos
        # param_grid = {'n_neighbors': range(1, 21)}
        # grid_search = GridSearchCV(KNeighborsRegressor(metric='euclidean'), param_grid, cv=9, scoring='neg_mean_absolute_error')
        # grid_search.fit(X_train, y_train)

        # # Melhor K
        # best_k = grid_search.best_params_['n_neighbors']
        # print("Melhor 1° K:", best_k)

         ## Gerar gráfico de Erro vs. k
        k_values = range(1, 12)
        k_errors = []

        for k in k_values:
            model = KNeighborsRegressor(n_neighbors=k, metric='euclidean')
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            mae = mean_absolute_error(y_test, y_pred)
            k_errors.append(mae)

        #Plotar o gráfico para a variável alvo atual
        # plt.figure(figsize=(10, 6))
        # plt.plot(k_values, k_errors, marker='o', linestyle='-', color='b')
        # plt.title(f"Erro vs. Número de Vizinhos (k) para {target_col}")
        # plt.xlabel("Número de Vizinhos (k)")
        # plt.ylabel("Erro Médio Absoluto (MAE)")
        # plt.xticks(k_values)
        # plt.grid(alpha=0.5)
       

        # Melhor K com menor erro
        best_k = k_values[np.argmin(k_errors)]
        print(f"Melhor K para {target_col}: {best_k}")
        #plt.show()
        # Criar e treinar o modelo KNN
        model = KNeighborsRegressor(n_neighbors=best_k, metric='euclidean')
        model.fit(X_train, y_train)

        # Prever o conjunto de teste
        previsao_teste = model.predict(X_test)

        # Visualizar os resultados: Real vs. Previsto
        # plt.scatter(y_test, previsao_teste, alpha=0.5)
        # plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], color='red', lw=2)
        # plt.title(f"Real vs. Previsto para {target_col}")
        # plt.xlabel("Real")
        # plt.ylabel("Previsto")
        # plt.show()
        # print(y_test)
        # print(previsao_teste)
        # Calcular o erro médio absoluto para a variável atual
        #erro = mean_absolute_error(y_test, previsao_teste)
        # Calcular a média de y_test e previsao_teste
        # print(y_test)
        # media_y_test = y_test.mean()
        # media_previsao_teste = previsao_teste.mean()
        # # mediana_y_test = np.median(y_test)
        # # mediana_previsao_teste = np.median(previsao_teste)

        # # # Calcular o erro médio absoluto entre as médias
        # #erro = mean_absolute_error([mediana_y_test], [mediana_previsao_teste])
        # erro = mean_absolute_error([media_y_test], [media_previsao_teste])
        # erros.append(erro)  # Armazenar o erro no dicionário
    

        # Calcular a média das previsões
        media_previsao = previsao_teste.mean(axis=0)

        # Calcular a média das previsões e arredondar para um número inteiro
        media_previsao = int(round(previsao_teste.mean()))

        # Guardar a previsão da coluna
        resultados[target_col] = media_previsao


    # Após o loop: Exibir gráfico de barras dos erros médios
    # print(colunas_alvo)
    # colunas_alvo_traduzir = ['Passe(CHE)', 'Velocidade(CHE)', 'Cruzamento(CRI)', 'Passe(CRI)', 'Finalização(CRI)', 'Agressividade(DEF)', 'Pressão(DEF)', 'A. do Time(DEF)']
    # plt.bar(colunas_alvo_traduzir, erros, color='blue', alpha=0.7)
    # plt.title("Erro Médio Absoluto por Variável Alvo")
    # plt.ylabel("Erro Médio Absoluto (MAE)")
    # plt.xlabel("Variável Alvo")
    # plt.show()

    print("Resultados finais para cada atributo previsto:")
    print(resultados)
    # resultado2 = {
    #     "derrota": 50,
    #     "empate": 50,
    #     "vitoria": 50,
    # }

    return resultados



#---> Exemplos pegar dados
import requests
def controlRedeNeural(dataTeste) :
    url = "http://127.0.0.1:5000/matches/filtro/8472"
    response = requests.get(url)
    url_saida = "http://127.0.0.1:5000/matches/filtro_saida/8472"
    response_saida = requests.get(url_saida)
   # print(response_saida)
    print(response_saida.json())
    if response.status_code == 200:
        data = response.json()
        print(data)
        data_saida = response_saida.json()
        # Faça algo com os dados retornados pela API
        #print(data)
        retorno = redeNeural2(data,dataTeste,data_saida)
        # retorno = {
        #         "derrota": "10",
        #         "empate": "50",
        #         "vitoria": "40",
        #     }

        return  retorno
    else:
        print(f"Erro ao fazer a requisição: {response.status_code}")


def controlKnn(codigo) :
    print(codigo)
    url = "http://127.0.0.1:5000/matches/filtro_knn/"+str(codigo)
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        # Faça algo com os dados retornados pela API
        colunas_alvo = ['buildUpPlayPassing', 'buildUpPlaySpeed', 'chanceCreationCrossing','chanceCreationPassing',
                        'chanceCreationShooting','defenceAggression','defencePressure','defenceTeamWidth']
        retorno = knn_regression_multitarget(data,colunas_alvo)
        return  retorno
    else:
        print(f"Erro ao fazer a requisição: {response.status_code}")




# ROTAS
app = Flask(__name__)
CORS(app)

@app.route('/ml/teste', methods=['POST'])
def rotaRedeNeural():
    data = request.json  # Obtém os dados do corpo da solicitação POST
    #print(data)
    retorno = controlRedeNeural(data)
    #print(retorno)
    return jsonify(retorno)



@app.route('/ml/knn/<int:codigo>', methods=['GET'])
def routaKnn(codigo):
    #data = request.json  # Obtém os dados do corpo da solicitação POST
    #print(data)
    retorno = controlKnn(codigo)
    #print(retorno)
    return jsonify(retorno)


if __name__ == '__main__':
    app.run(debug=True,port=8080)






