const API_URL = 'http://localhost:3030'; // URL base do backend

const serviceSelecaoTime = {
 
  buscarTimes: async (stage, season) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/team/ordenado`);

      if (!response.ok) {
        throw new Error('Erro ao obter Partidas');
      }

      return response.json();
    } catch (error) {
      throw new Error('Erro ao obter Partidas');
    }
  }
};


export default serviceSelecaoTime;