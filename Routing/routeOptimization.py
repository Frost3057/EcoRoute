import ortools
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
import mapApi
from mapApi import get_dist_matrix
def create_data_model():
    data = get_dist_matrix()
    data["demands"] = [0, 1, 1, 2, 4, 2, 4, 8, 8, 1, 2, 1, 2, 4, 4, 8, 8]
    data["vehicle_capacities"] = [15, 15, 15, 15]
    data["num_vehicles"] = 4
    data["depot"] = 0
    print(f"Number of addresses to ship: {len(data["addresses"])}")
    return data

def getRouteData(data, manager, routing, solution):
    print(f"Objective: {solution.ObjectiveValue()}")
    routes = []
    for vehicle_id in range(data["num_vehicles"]):
        if not routing.IsVehicleUsed(solution, vehicle_id):
            continue
        index = routing.Start(vehicle_id)
        routeData = {}
        routeData["vehicle_id"] = vehicle_id
        route_distance = 0
        load = []
        route_index = []
        while not routing.IsEnd(index):
            node_index = manager.IndexToNode(index)
            route_index.append(node_index)
            load.append(data["demands"][node_index])
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id
            )
        load.append(manager.IndexToNode(index))
        routeData["load"] = load
        routeData["route_index"] = route_index
        routeData["Distance_of_the_route"] = route_distance
        routes.append(routeData)
    return routes

def getRoutes():
    data = create_data_model()
    manager = pywrapcp.RoutingIndexManager(
        len(data["distance_matrix"]), data["num_vehicles"], data["depot"]
    )
    routing = pywrapcp.RoutingModel(manager)
    def distance_callback(from_index, to_index):
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data["distance_matrix"][from_node][to_node]
    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
    def demand_callback(from_index):
        from_node = manager.IndexToNode(from_index)
        return data["demands"][from_node]
    demand_callback_index = routing.RegisterUnaryTransitCallback(demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0,
        data["vehicle_capacities"],
        True,
        "Capacity",
    )
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
    )
    search_parameters.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH
    )
    search_parameters.time_limit.FromSeconds(1)
    solution = routing.SolveWithParameters(search_parameters)
    if solution:
        return getRouteData(data,manager,routing,solution)
def main():
    getRoutes()
if __name__ == "__main__":
    main()