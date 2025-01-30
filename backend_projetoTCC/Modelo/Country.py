class Country:
    def __init__(self, id=0, name=""):
        self.__id = id
        self.__name = name

    @property
    def id(self):
        return self.__id

    @id.setter
    def id(self, id):
        self.__id = id

    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, name):
        self.__name = name

    def toJSON(self):
        return {
            "id": self.__id,
            "name": self.__name
        }
