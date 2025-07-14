import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:async';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Address {
  final String name;
  final double lat;
  final double lng;
  Address({required this.name, required this.lat, required this.lng});
}

class RoutePage extends StatefulWidget {
  const RoutePage({super.key});

  @override
  State<RoutePage> createState() => _RoutePageState();
}

class _RoutePageState extends State<RoutePage> {
  // Mock data with lat/lng
  final List<Address> addresses = [
    Address(name: '123 Main St', lat: 37.7749, lng: -122.4194),
    Address(name: '456 Oak Ave', lat: 37.7849, lng: -122.4094),
    Address(name: '789 Pine Rd', lat: 37.7949, lng: -122.4294),
    Address(name: '101 Maple Blvd', lat: 37.8049, lng: -122.4394),
    Address(name: '202 Elm St', lat: 37.8149, lng: -122.4494),
    Address(name: '303 Cedar Ct', lat: 37.8249, lng: -122.4594),
    Address(name: '404 Birch Ln', lat: 37.8349, lng: -122.4694),
    Address(name: '505 Walnut Dr', lat: 37.8449, lng: -122.4794),
    Address(name: '606 Chestnut Pl', lat: 37.8549, lng: -122.4894),
    Address(name: '707 Spruce Way', lat: 37.8649, lng: -122.4994),
  ];
  int currentDeliveryIndex = 1; // 0-based index of the next delivery

  void _onCurrentTileTap(Address address) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => AddressDetailPage(
          address: address,
          isLast: currentDeliveryIndex == addresses.length - 1,
        ),
      ),
    );
    if (result == true) {
      setState(() {
        currentDeliveryIndex++;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Route'),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 24),
        itemCount: addresses.length,
        separatorBuilder: (context, index) => Column(
          children: [
            const SizedBox(height: 8),
            Icon(Icons.arrow_downward, color: Colors.black87, size: 32),
            const SizedBox(height: 8),
          ],
        ),
        itemBuilder: (context, index) {
          final isDelivered = index < currentDeliveryIndex;
          final isCurrent = index == currentDeliveryIndex;
          final isUpcoming = index > currentDeliveryIndex;

          Color tileColor;
          Color textColor;
          Widget? trailing;

          if (isDelivered) {
            tileColor = Colors.grey[200]!;
            textColor = Colors.black54;
            trailing = Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.check_circle, color: theme.colorScheme.primary, size: 22),
                const SizedBox(width: 8),
                const Text('Delivered', style: TextStyle(fontWeight: FontWeight.w500)),
              ],
            );
          } else if (isCurrent) {
            tileColor = theme.colorScheme.primary.withOpacity(0.1);
            textColor = theme.colorScheme.primary;
            trailing = Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.delivery_dining, color: theme.colorScheme.primary, size: 22),
                const SizedBox(width: 8),
                const Text('Next Delivery', style: TextStyle(fontWeight: FontWeight.w500)),
              ],
            );
          } else {
            tileColor = Colors.grey[100]!;
            textColor = Colors.black26;
            trailing = const Text('Next Delivery', style: TextStyle(color: Colors.black26, fontWeight: FontWeight.w500));
          }

          return GestureDetector(
            onTap: isCurrent ? () => _onCurrentTileTap(addresses[index]) : null,
            child: AnimatedOpacity(
              duration: const Duration(milliseconds: 200),
              opacity: isDelivered || isCurrent ? 1.0 : 0.7,
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 16),
                decoration: BoxDecoration(
                  color: tileColor,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: isCurrent ? theme.colorScheme.primary : Colors.transparent,
                    width: isCurrent ? 2 : 1,
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      addresses[index].name,
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: textColor),
                    ),
                    trailing ?? const SizedBox.shrink(),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

class AddressDetailPage extends StatefulWidget {
  final Address address;
  final bool isLast;
  const AddressDetailPage({super.key, required this.address, required this.isLast});

  @override
  State<AddressDetailPage> createState() => _AddressDetailPageState();
}

class _AddressDetailPageState extends State<AddressDetailPage> {
  Completer<GoogleMapController> _controller = Completer();
  Position? _currentPosition;
  String? _distance;
  String? _duration;
  Set<Polyline> _polylines = {};
  bool _sliderComplete = false;

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      await Geolocator.openLocationSettings();
      return;
    }
    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return;
      }
    }
    if (permission == LocationPermission.deniedForever) {
      return;
    }
    final position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    setState(() {
      _currentPosition = position;
    });
    _fetchRouteAndDistance(position.latitude, position.longitude);
  }

  Future<void> _recenterMap() async {
    if (_currentPosition == null) return;
    final GoogleMapController controller = await _controller.future;
    await controller.animateCamera(
      CameraUpdate.newLatLngBounds(_getBounds(), 80),
    );
  }

  LatLngBounds _getBounds() {
    final LatLng from = LatLng(_currentPosition!.latitude, _currentPosition!.longitude);
    final LatLng to = LatLng(widget.address.lat, widget.address.lng);
    double southWestLat = from.latitude < to.latitude ? from.latitude : to.latitude;
    double southWestLng = from.longitude < to.longitude ? from.longitude : to.longitude;
    double northEastLat = from.latitude > to.latitude ? from.latitude : to.latitude;
    double northEastLng = from.longitude > to.longitude ? from.longitude : to.longitude;
    return LatLngBounds(
      southwest: LatLng(southWestLat, southWestLng),
      northeast: LatLng(northEastLat, northEastLng),
    );
  }

  Future<void> _fetchRouteAndDistance(double fromLat, double fromLng) async {
    final toLat = widget.address.lat;
    final toLng = widget.address.lng;
    final apiKey = 'AIzaSyDoM0KocxJb6gyy9w4W3yvPrBC7UqAqApc'; // Your API key
    final url = 'https://maps.googleapis.com/maps/api/directions/json?origin=$fromLat,$fromLng&destination=$toLat,$toLng&key=$apiKey&mode=driving';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      if (data['routes'] != null && data['routes'].isNotEmpty) {
        final route = data['routes'][0];
        final leg = route['legs'][0];
        setState(() {
          _distance = leg['distance']['text'];
          _duration = leg['duration']['text'];
          _polylines = {
            Polyline(
              polylineId: const PolylineId('route'),
              color: Theme.of(context).colorScheme.primary,
              width: 5,
              points: _decodePolyline(route['overview_polyline']['points']),
            ),
          };
        });
      }
    }
  }

  List<LatLng> _decodePolyline(String encoded) {
    List<LatLng> polyline = [];
    int index = 0, len = encoded.length;
    int lat = 0, lng = 0;
    while (index < len) {
      int b, shift = 0, result = 0;
      do {
        b = encoded.codeUnitAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      int dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.codeUnitAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      int dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
      lng += dlng;
      polyline.add(LatLng(lat / 1E5, lng / 1E5));
    }
    return polyline;
  }

  void _onDeliveryComplete() async {
    setState(() {
      _sliderComplete = true;
    });
    await Future.delayed(const Duration(milliseconds: 300));
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(widget.isLast ? 'All deliveries complete!' : 'Delivery Status Updated'),
          backgroundColor: Theme.of(context).colorScheme.primary,
          duration: const Duration(seconds: 1),
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      );
      await Future.delayed(const Duration(seconds: 1));
      if (mounted) Navigator.pop(context, true);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final height = MediaQuery.of(context).size.height;
    return Scaffold(
      appBar: AppBar(title: Text(widget.address.name)),
      body: _currentPosition == null
          ? const Center(child: CircularProgressIndicator())
          : Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Stack(
                  children: [
                    SizedBox(
                      height: height * 0.6,
                      width: double.infinity,
                      child: GoogleMap(
                        initialCameraPosition: CameraPosition(
                          target: LatLng(widget.address.lat, widget.address.lng),
                          zoom: 13,
                        ),
                        markers: {
                          Marker(
                            markerId: const MarkerId('destination'),
                            position: LatLng(widget.address.lat, widget.address.lng),
                            infoWindow: InfoWindow(title: widget.address.name),
                          ),
                          Marker(
                            markerId: const MarkerId('current'),
                            position: LatLng(_currentPosition!.latitude, _currentPosition!.longitude),
                            infoWindow: const InfoWindow(title: 'Your Location'),
                            icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueAzure),
                          ),
                        },
                        polylines: _polylines,
                        onMapCreated: (GoogleMapController controller) async {
                          _controller.complete(controller);
                          // Optionally recenter to fit both markers
                          await Future.delayed(const Duration(milliseconds: 300));
                          if (_currentPosition != null) {
                            controller.animateCamera(
                              CameraUpdate.newLatLngBounds(_getBounds(), 80),
                            );
                          }
                        },
                        myLocationEnabled: true,
                        myLocationButtonEnabled: false,
                        zoomControlsEnabled: false,
                      ),
                    ),
                    // Floating info card
                    Positioned(
                      left: 32,
                      right: 32,
                      top: 32,
                      child: Material(
                        elevation: 4,
                        borderRadius: BorderRadius.circular(14),
                        color: Colors.white,
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 13),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(14),
                            color: Colors.white,
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.06),
                                blurRadius: 10,
                                offset: const Offset(0, 2),
                              ),
                            ],
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  const Icon(Icons.access_time, color: Colors.blue, size: 18),
                                  const SizedBox(width: 5),
                                  Text(_duration ?? '...', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                                ],
                              ),
                              Row(
                                children: [
                                  const Icon(Icons.route, color: Colors.blue, size: 18),
                                  const SizedBox(width: 5),
                                  Text(_distance ?? '...', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                                ],
                              ),
                              Row(
                                children: [
                                  const Icon(Icons.location_on, color: Colors.blue, size: 18),
                                  const SizedBox(width: 5),
                                  SizedBox(
                                    width: 70,
                                    child: Text(
                                      widget.address.name,
                                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    // Recenter FAB
                    Positioned(
                      bottom: 32,
                      right: 24,
                      child: FloatingActionButton(
                        onPressed: _recenterMap,
                        backgroundColor: theme.colorScheme.primary,
                        child: const Icon(Icons.my_location, color: Colors.white),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                // Order summary placeholder
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 0),
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.primary.withOpacity(0.08),
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.person, color: Colors.blue, size: 20),
                            const SizedBox(width: 8),
                            Text(
                              'John Doe',
                              style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                        const SizedBox(height: 8,width: 32),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.attach_money, color: Colors.blue, size: 20),
                            const SizedBox(width: 8),
                            Text(
                              '123.45',
                              style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                if (!_sliderComplete)
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
                    child: _SwipeToCompleteSlider(
                      onComplete: _onDeliveryComplete,
                      color: theme.colorScheme.primary,
                    ),
                  ),
                if (_sliderComplete)
                  const SizedBox(height: 64),
              ],
            ),
    );
  }
}

class _SwipeToCompleteSlider extends StatefulWidget {
  final VoidCallback onComplete;
  final Color color;
  const _SwipeToCompleteSlider({required this.onComplete, required this.color});

  @override
  State<_SwipeToCompleteSlider> createState() => _SwipeToCompleteSliderState();
}

class _SwipeToCompleteSliderState extends State<_SwipeToCompleteSlider> {
  double _dragPercent = 0.0;
  bool _completed = false;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width - 48;
    return GestureDetector(
      onHorizontalDragUpdate: (details) {
        setState(() {
          _dragPercent = (_dragPercent + details.primaryDelta! / width).clamp(0.0, 1.0);
        });
      },
      onHorizontalDragEnd: (details) {
        if (_dragPercent > 0.8 && !_completed) {
          setState(() {
            _completed = true;
          });
          widget.onComplete();
        } else {
          setState(() {
            _dragPercent = 0.0;
          });
        }
      },
      child: Stack(
        children: [
          // Progress fill
          AnimatedContainer(
            duration: const Duration(milliseconds: 80),
            height: 56,
            width: _dragPercent * (width - 56) + 56,
            decoration: BoxDecoration(
              color: widget.color.withOpacity(0.35),
              borderRadius: BorderRadius.circular(24),
            ),
          ),
          Container(
            height: 56,
            decoration: BoxDecoration(
              color: widget.color.withOpacity(0.12),
              borderRadius: BorderRadius.circular(24),
            ),
            alignment: Alignment.center,
            child: AnimatedOpacity(
              duration: const Duration(milliseconds: 80),
              opacity: 1.0 - _dragPercent.clamp(0.0, 1.0),
              child: Text(
                'Swipe to complete delivery',
                style: TextStyle(
                  color: widget.color,
                  fontWeight: FontWeight.w600,
                  fontSize: 16,
                ),
              ),
            ),
          ),
          AnimatedPositioned(
            duration: const Duration(milliseconds: 80),
            left: _dragPercent * (width - 56),
            top: 0,
            child: Container(
              height: 56,
              width: 56,
              decoration: BoxDecoration(
                color: widget.color,
                borderRadius: BorderRadius.circular(24),
                boxShadow: [
                  BoxShadow(
                    color: widget.color.withOpacity(0.18),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: const Icon(Icons.chevron_right, color: Colors.white, size: 32),
            ),
          ),
        ],
      ),
    );
  }
}
// TODO: Insert your Google Maps API key in the appropriate place in your Android/iOS project files.
// See: https://pub.dev/packages/google_maps_flutter#android
// and: https://pub.dev/packages/google_maps_flutter#ios 