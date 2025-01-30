
from flask import jsonify
from Modelo import Country

class CountryController:
    def __init__(self,countryDAO):
        self.country_dao = countryDAO
    
    def consultar(self,request):
        if request.method == "GET":
            country = self.country_dao.find_all()
            if country:
                return jsonify(country), 200
            else:
                return jsonify({'error': 'Dados Não encontrados'}), 400