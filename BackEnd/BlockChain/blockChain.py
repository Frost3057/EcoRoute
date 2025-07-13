class blockChain:
    def __init__(self,model):
        self.model = model
    def createStream(self,streamName):
        #this is open to all,will need to change the True condition for increasing security of the stream.
        txid = self.model.create('stream',streamName,True)
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
    def createAddress(self):
        address = self.model.getnewaddress()
        return address
    def issueEcoCoin(self,add):
        txid = self.model.issue(add,{"name":"EcoCoin","open":True},1000000,0.01)
        if(self.model.success()):
            print("Issued 1000000 EcoCoins Successfully")
        else:
            print(f"Error {self.model.errorcode()}")
            print(f"Error {self.model.errormessage()}")
        return txid
    def getbalance(self,add):
        self.model.subscribe('EcoCoin')
        balance = self.model.getaddressbalances(add)
        return balance
    def sendPermi(self,add):
        self.model.grant(add,'send')
        if(self.model.success()):
            print("Permission Updated Successfully")
        else:
            print(f"Error {self.model.errorcode()}")
            print(f"Error {self.model.errormessage()}")
    def receivePermi(self,add):
        self.model.grant(add,'receive')
        if(self.model.success()):
            print("Permission Updated Successfully")
        else:
            print(f"Error {self.model.errorcode()}")
            print(f"Error {self.model.errormessage()}")
    def transaction(self,sender,receiver,qty):
        txid = self.model.sendassetfrom(sender,receiver,'EcoCoin',qty)
        if(self.model.success()):
            print(f"Transaction successfull -> txid => {txid}")
        else:
            print(f"Error {self.model.errorcode()}")
            print(f"Error {self.model.errormessage()}")
    def getaddresses(self):
        return self.model.listaddresses()


