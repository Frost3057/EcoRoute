# import multichain
from BlockChain.Api.api import install_Client,load_env
from BlockChain.Api.multichain import MultiChainClient
from BlockChain import blockChain
def init():
    install_Client()
    rpchost='127.0.0.1'
    rpcport=1234
    creds = load_env()
    mc=MultiChainClient(rpchost, rpcport, creds[0], creds[1])
    result = mc.getinfo()
    print(f"Block chain details -> Chain Name = {result["chainname"]} || Description = {result["description"]}") 
    client = blockChain.blockChain(model = mc)
    return client
def main():
    init()
if __name__ == "__main__":
    main()