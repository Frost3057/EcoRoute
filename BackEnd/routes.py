from fastapi import APIRouter
from database import database
import sys
import os
from serialization import list_deserial_item,list_deserial_order

# Add parent directory to Python path to import BlockChain module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from BlockChain.blockChain import blockChain
from BlockChain.init import init

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



