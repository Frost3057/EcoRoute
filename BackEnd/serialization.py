def deserilize_user(user)->dict:
    return {
        "id":user["_id"],
        "User": user["name"],
        "email":user["email"],
        "phone":user["phone"],
        "address":user["address"],
        "block_chain_add":user["block_chain_add"],
        "age":user["age"],
        "gender":user["gender"],
        "createdAt":user["createdAt"]
    }
def deserilalize_order(order)->dict:
    return {
        "id":order["_id"],
        "cust_id":order["cust_id"],
        "status": order["status"],
        "createdAt":order["createdAt"],
        "totalAmount":order["totalAmount"],
        "address":order["address"],
        "name":order["name"],
        "phone":order["phone"],
        "edta" : order["edta"]
    }
def deserilalize_item(item)->dict:
    return{
        "id":item["_id"],
        "name":item["name"],
        "description":item["description"],
        "link":item["link"],
        "category":item["category"],
        "label":item["label"],
        "ecoPlus":item["ecoPlus"]
    }
def deserialize_driver(driver) -> dict:
    return {
        "name":driver["name"],
        "phone":driver["phone"],
        "email":driver["email"],
        "license_number":driver["license_number"],
        "vehicle_type":driver["driver_type"]
    }
def list_deserial_user(users)->list:
    return [deserilize_user(user) for user in users]
def list_deserial_order(orders)->list:
    return [deserilalize_order(order) for order in orders]
def list_deserial_item(items)->list:
    return [deserilalize_item(item) for item in items]
def list_deserial_drivers(drivers)->list:
    return [deserilize_user(driver) for driver in drivers]
