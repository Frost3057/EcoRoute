import 'package:flutter/material.dart';

class OrderCard extends StatelessWidget {
  final String name;
  final String address;
  final String phoneNumber;
  final int itemCount;

  const OrderCard({
    super.key,
    required this.name,
    required this.address,
    required this.phoneNumber,
    required this.itemCount,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                const SizedBox(height: 4),
                Text(address, style: const TextStyle(fontSize: 14, color: Colors.black54)),
                const SizedBox(height: 4),
                Text('Phone: $phoneNumber', style: const TextStyle(fontSize: 14)),
              ],
            ),
            Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                const Text('Items', style: TextStyle(fontSize: 14, color: Colors.black54)),
                Text('$itemCount', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
              ],
            ),
          ],
        ),
      ),
    );
  }
} 