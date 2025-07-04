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
    senderadd = '1CyKBraiJ7yw7QQfjvDrVdH1ai9oroWCrDfxwX'
    receiveradd = '1Aej3ZBacU1JGtTTzAz4NfqvoanHrrN6Gaq3Ce'
    # client.sendPermi(add)
    client.receivePermi(receiveradd)
    print(f"Sender Balance: {client.getbalance(senderadd)}")
    print(f"Receiver Balance:{client.getbalance(receiveradd)}")
    client.transaction(senderadd,receiveradd,0.1)
    print(f"Sender Balance: {client.getbalance(senderadd)}")
    print(f"Receiver Balance:{client.getbalance(receiveradd)}")
def main():
    init()
if __name__ == "__main__":
    main()