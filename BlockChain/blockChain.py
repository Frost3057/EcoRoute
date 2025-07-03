class blockChain:
    def __init__(self,model):
        self.model = model
    def createStream(self):
        #this is open to all,will need to change the True condition for increasing security of the stream.
        txid = self.model.create('stream','Invent',True)
        if(self.model.success()):
            print(f"Stream Created Successfully : {txid}")
        else:
            print(f"Error {self.model.errorcode()}")
            print(f"Error {self.model.errormessage()}")
    def addItem(self,item,stream,key1):
        txid = self.model.publish(stream,key1,{"json":item})
        if(self.model.success()):
            print(f"Item published Successfully : {txid}")
        else:
            print(f"Error {self.model.errorcode()}")
            print(f"Error {self.model.errormessage()}")
    def getItems(self,stream):
        self.model.subscribe(stream)
        results = self.model.liststreamitems("Inventory")
        for i in range(len(results)):
            data = results[i]['data']
            jsonData = data['json']
            print(f"{jsonData}")
