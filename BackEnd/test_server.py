import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

async def ping_server():
  # Replace the placeholder with your Atlas connection string
  load_dotenv()
  uri = os.getenv("mongo_db_connection")

  # Set the Stable API version when creating a new client
  client = AsyncIOMotorClient(uri, server_api=ServerApi('1'))

  # Send a ping to confirm a successful connection
  try:
      await client.admin.command('ping')
      print("Pinged your deployment. You successfully connected to MongoDB!")
  except Exception as e:
      print(e)
      
asyncio.run(ping_server())