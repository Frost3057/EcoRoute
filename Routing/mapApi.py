import urllib.request
import requests
import json
import urllib
import os
from dotenv import load_dotenv,find_dotenv

def load_env(data):
  try:
    dotenvPath = find_dotenv()
    load_dotenv(dotenv_path=dotenvPath)
    data['API_key'] = os.getenv("MAP_DIST_MATRIX_API")
  except:
    print("Error in finding env")

def create_data():
  """Creates the data."""
  data = {}
  load_env(data=data)
  data['addresses'] = ['3610+Hacks+Cross+Rd+Memphis+TN', #depo
                       '1921+Elvis+Presley+Blvd+Memphis+TN',
                       '149+Union+Avenue+Memphis+TN',
                       '1034+Audubon+Drive+Memphis+TN',
                       '1532+Madison+Ave+Memphis+TN',
                       '706+Union+Ave+Memphis+TN',
                       '3641+Central+Ave+Memphis+TN',
                       '926+E+McLemore+Ave+Memphis+TN',
                       '4339+Park+Ave+Memphis+TN',
                       '600+Goodwyn+St+Memphis+TN',
                       '2000+North+Pkwy+Memphis+TN',
                       '262+Danny+Thomas+Pl+Memphis+TN',
                       '125+N+Front+St+Memphis+TN',
                       '5959+Park+Ave+Memphis+TN',
                       '814+Scott+St+Memphis+TN',
                       '1005+Tillman+St+Memphis+TN'
                      ]
  return data

def create_distance_matrix(data):
  addresses = data["addresses"]
  API_key = data["API_key"]
  max_elements = 100
  num_addresses = len(addresses)
  max_rows = max_elements // num_addresses
  q, r = divmod(num_addresses, max_rows)
  dest_addresses = addresses
  distance_matrix = []
  for i in range(q):
    origin_addresses = addresses[i * max_rows: (i + 1) * max_rows]
    response = send_request(origin_addresses, dest_addresses, API_key)
    distance_matrix += build_distance_matrix(response)
  if r > 0:
    origin_addresses = addresses[q * max_rows: q * max_rows + r]
    response = send_request(origin_addresses, dest_addresses, API_key)
    distance_matrix += build_distance_matrix(response)
  return distance_matrix

def send_request(origin_addresses, dest_addresses, API_key):
  """ Build and send request for the given origin and destination addresses."""
  def build_address_str(addresses):
    address_str = ''
    for i in range(len(addresses) - 1):
      address_str += addresses[i] + '|'
    address_str += addresses[-1]
    return address_str

  request = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial'
  origin_address_str = build_address_str(origin_addresses)
  dest_address_str = build_address_str(dest_addresses)
  request = request + '&origins=' + origin_address_str + '&destinations=' + \
                       dest_address_str + '&key=' + API_key
  jsonResult = urllib.request.urlopen(request).read()
  response = json.loads(jsonResult)
  return response

def build_distance_matrix(response):
  distance_matrix = []
  for row in response['rows']:
    row_list = [row['elements'][j]['distance']['value'] for j in range(len(row['elements']))]
    distance_matrix.append(row_list)
  return distance_matrix

def get_dist_matrix():
  data = create_data()
  data['distance_matrix'] = create_distance_matrix(data)
  return data

def main():
  """Entry point of the program"""
  data = create_data()
  distance_matrix = create_distance_matrix(data)
  print(distance_matrix)
if __name__ == '__main__':
  main()