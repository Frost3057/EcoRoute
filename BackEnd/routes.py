from fastapi import APIRouter
from database import database
from serialization import list_deserial_item,list_deserial_order,list_deserial_drivers
from BlockChain.blockChain import blockChain
from BlockChain.init import init
from llm.main import getResponse

router = APIRouter()
db = database()
blockChain = init()

@router.get("/ecoCoin/getbalance/{address}")
def get_balance(address):
    balance = blockChain.getbalance(add=address)
    return {
        "data":balance
    }

@router.get("/catalog")
async def get_catalog():
    catalog = db.getcatalogCollec()
    item_tensor = catalog.find()
    items = await item_tensor.to_list()
    return list_deserial_item(items)

@router.get("/orders")
async def get_orderhist():
    orders = db.getordersCollec()
    item_tensor = orders.find()
    items = await item_tensor.to_list()
    d_order = list_deserial_order(items)
    return d_order
@router.get("/orders/{customer_id}")

async def get_orderhist(customer_id):
    orderCollec = db.getordersCollec()
    item_tensor = orderCollec.find()
    items = await item_tensor.to_list()
    d_order = list_deserial_order(items)
    orders = []
    for order in d_order:
        if order["cust_id"] == customer_id:
            orders.append(order)
    return orders

@router.post("/order/place_order")
async def place_order(order:dict):
    orderCollec = db.getordersCollec()
    result = await orderCollec.insert_one(order)
    return {"message":str(result.inserted_id)}

@router.post("/EcoAgent")
def getLLMResponse(input:dict):
    inp = input["question"]
    response = getResponse(inp)
    return {
        "response":response
    }

@router.post("/drivers/add_driver")
async def add_driver(driver:dict):
    driverCollec = db.getdriversCollec()
    result = await driverCollec.insert_one(driver)
    return {"message":str(result.inserted_id)}

@router.get("/drivers")
async def get_drivers():
    coll = db.getdriversCollec()
    item_tensor = coll.find()
    items = await item_tensor.to_list()
    d_driver = list_deserial_drivers(items)
    return d_driver




