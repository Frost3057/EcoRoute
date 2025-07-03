# import multichain
import Api
from Api.api import install_Client,load_env
from Api.multichain import MultiChainClient
import blockChain
from blockChain import blockChain
import json
def init():
    install_Client()
    rpchost='127.0.0.1'
    rpcport=1234
    creds = load_env()
    mc=MultiChainClient(rpchost, rpcport, creds[0], creds[1])
    result = mc.getinfo()
    print(f"Block chain details -> Chain Name = {result["chainname"]} || Description = {result["description"]}") 
    client = blockChain(model = mc)
    client.getItems('Inventory')
def main():
    init()
if __name__ == "__main__":
    main()