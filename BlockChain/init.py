# import multichain
import Api
from Api.api import install_Client,load_env
from Api.multichain import MultiChainClient
def init():
    install_Client()
    rpchost='192.168.1.8'
    rpcport=7754
    creds = load_env()
    mc=MultiChainClient(rpchost, rpcport, creds[0], creds[1])

def main():
    init()
if __name__ == "__main__":
    main()