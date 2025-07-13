from client import getClient

client = getClient()
db = client["EcoRoute"]
usersCollec = client["Users"]
driversCollec = client["Drivers"]
ordersCollec = client["Orders"]
catalogCollec = client["Catalog"]