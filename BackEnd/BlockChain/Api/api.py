from pathlib import Path
import requests
from dotenv import load_dotenv,find_dotenv
import os
def load_env():
    try:
        env_path = find_dotenv()
        load_dotenv(dotenv_path=env_path)
        rpcuser = os.getenv('rpc_user')
        rpcpass = os.getenv('rpc_password')
        return [rpcuser,rpcpass]
    except:
        print("Error in finding environmental variables")

def install_Client():
    base_path = Path(__file__).resolve().parent
    client = "multichain.py"
    client_path = base_path / client
    if(Path(client_path).exists()):
        print(".... .... Client requirement fulfilled .... ....")
    else:
        print(f"parents ? :{client_path.parent.exists()}")
        print("Installing BlockChain Client .......")
        request = requests.get("https://raw.githubusercontent.com/MultiChain/multichain-api-libraries/refs/heads/main/python/multichain.py")
        with open(client_path,"wb") as f:
            f.write(request.content)
        print("Installation Complete")