import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
def getClient():
  # Replace the placeholder with your Atlas connection string
  load_dotenv()
  uri = os.getenv("mongo_db_connection")

  # Set the Stable API version when creating a new client
  client = AsyncIOMotorClient(uri, server_api=ServerApi('1'))
  return client