const API_URL = 'http://localhost:3030'; // URL base do backend

const serviceInicio = {
  //   cadastrarEmpresa: async (dadosEmpresa) => {
  //     try {
  //       console.log(JSON.stringify(dadosEmpresa))
  //       let request = new XMLHttpRequest()
  //       request.open("POST", "https://bringnfe.bringcommerce.com.br/empresa", false)
  //       request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //       request.send(JSON.stringify(dadosEmpresa))

  //       if (!response.ok) {
  //         throw new Error('Erro ao cadastrar empresa');
  //       }

  //       return response.json();
  //     } catch (error) {
  //       throw new Error('Erro ao cadastrar empresa');
  //     }
  //   },


  //    // Buscar empresas
  //    buscarEmpresa: async () => {
  //     try {
  //       let request = new XMLHttpRequest()
  //       request.open('GET', 'https://bringnfe.bringcommerce.com.br/buscaempresas', false)
  //       request.send()
  //       let empresas = JSON.parse(request.responseText)
  //       return empresas

  //       if (!response.ok) {
  //         throw new Error('Erro ao obter empresas');
  //       }

  //       return response.json();
  //     } catch (error) {
  //       throw new Error('Erro ao obter empresas');
  //     }
  //   },
  cadastrarTatica: async (dados) => {
    try {
      const response = await fetch('http://127.0.0.1:8080/ml/teste', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      if (!response.ok) {
        throw new Error('Erro ao obter Jogo');
      }

      return response.json();
    } catch (error) {
      throw new Error('Erro ao obter Jogo');
    }
  },
  treinarMLP: async (dados) => {
    try {
      const response = await fetch('http://127.0.0.1:8080/ml/treino', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });

      if (!response.ok) {
        throw new Error('Erro ao obter Jogo');
      }

      return response.json();
    } catch (error) {
      throw new Error('Erro ao obter Jogo');
    }
  },

  buscarJogo: async (team, stage, season) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/matches/game?team=${team}&stage=${stage}&season=${season}`);

      if (!response.ok) {
        throw new Error('Erro ao obter Jogo');
      }

      return response.json();
    } catch (error) {
      throw new Error('Erro ao obter Jogo');
    }
  },

  buscarCaracteristicaAdversario: async (team,stage, season) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000//matches/characteristic?team=${team}&stage=${stage}&season=${season}`);

      if (!response.ok) {
        throw new Error('Erro ao obter Jogo');
      }

      return response.json();
    } catch (error) {
      throw new Error('Erro ao obter Jogo');
    }
  },

  buscarJogadores: async (team, season) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000//player/team?team=${team}&season=${season}`);

      if (!response.ok) {
        throw new Error('Erro ao obter Jogo');
      }

      return response.json();
    } catch (error) {
      throw new Error('Erro ao obter Jogo');
    }
  },

  buscarProvavelTatica: async (codigo) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/ml/knn/`+codigo);

      if (!response.ok) {
        throw new Error('Erro ao tatica do Jogo');
      }

      return response.json();
    } catch (error) {
      throw new Error('Erro ao tatica do Jogo');
    }
  },
  buscarTimeID: async (codigo) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/team/id/`+codigo);

      if (!response.ok) {
        throw new Error('Erro ao  do Buscar time id ');
      }

      return response.json();
    } catch (error) {
      throw new Error('Erro ao  do Buscar time id ');
    }
  }
};

  


export default serviceInicio;