from pathlib import Path
import requests
def install_Client():
    base_path = Path(__file__).resolve().parent
    client = "multichain.py"
    client_path = base_path / client
    print(client_path)
    if(Path(client_path).exists()):
        print(".... .... Client requirement fulfilled .... ....")
    else:
        print(f"parents ? :{client_path.parent.exists()}")
        print("Installing BlockChain Client .......")
        request = requests.get("https://raw.githubusercontent.com/MultiChain/multichain-api-libraries/refs/heads/main/python/multichain.py")
        with open(client_path,"wb") as f:
            f.write(request.content)
        print("Installation Complete")