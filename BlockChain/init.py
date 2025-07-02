# import multichain
# from multichain import MultiChainClient
import Api.api
from Api.api import install_Client
def init():
    install_Client()
    # rpchost='192.168.1.8' # change if multichaind is not running locally
    # rpcport=7754 # usually default-rpc-port in blockchain parameters
    # rpcuser='multichainrpc' # see multichain.conf in blockchain directory
    # rpcpassword='CowAa1xM47GVrasYq71UU2KfhNV9fCuba28WkoiZmCa3' # see multichain.conf in blockchain directory
    # mc=MultiChainClient(rpchost, rpcport, rpcuser, rpcpassword)

def main():
    init()
if __name__ == "__main__":
    main()