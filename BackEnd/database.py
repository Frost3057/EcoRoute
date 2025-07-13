from client import getClient

class database:
    def __init__(self):
        self.client = getClient()
        self.db = self.client["EcoRoute"]
    def getusersCollec(self):
        return self.db["Users"]
    def getdriversCollec(self):
        return self.db["Drivers"]
    def getordersCollec(self):
        return self.db["Orders"]
    def getcatalogCollec(self):
        return self.db["Catalog"]