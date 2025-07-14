import 'package:flutter/material.dart';

class OrderDetailPage extends StatelessWidget {
  final String name;
  final String address;
  final String phoneNumber;
  final List<OrderItem> items;

  const OrderDetailPage({
    super.key,
    required this.name,
    required this.address,
    required this.phoneNumber,
    required this.items,
  });

  @override
  Widget build(BuildContext context) {
    int totalItems = items.fold(0, (sum, item) => sum + item.quantity);
    double totalAmount = items.fold(0, (sum, item) => sum + item.price * item.quantity);
    final theme = Theme.of(context);
    return Scaffold(
      appBar: AppBar(
        title: Text(name),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Customer Info Card
            Card(
              elevation: 1,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 28,
                      backgroundColor: theme.colorScheme.primary.withOpacity(0.1),
                      child: Icon(Icons.person, size: 32, color: theme.colorScheme.primary),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(name, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 8),
                          Row(
                            children: [
                              Icon(Icons.phone, size: 18, color: theme.colorScheme.primary),
                              const SizedBox(width: 6),
                              Text(phoneNumber, style: const TextStyle(fontSize: 15)),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Icon(Icons.location_on, size: 18, color: theme.colorScheme.primary),
                              const SizedBox(width: 6),
                              Expanded(child: Text(address, style: const TextStyle(fontSize: 15))),
                            ],
                          ),
                          
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),
            // Items List Card
            Expanded(
              child: Card(
                elevation: 2,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Items ($totalItems)', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 12),
                      Expanded(
                        child: ListView.separated(
                          itemCount: items.length,
                          separatorBuilder: (context, index) => const Divider(height: 16),
                          itemBuilder: (context, index) {
                            final item = items[index];
                            return Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Expanded(child: Text(item.name, style: const TextStyle(fontSize: 15))),
                                Text('x${item.quantity}', style: const TextStyle(fontSize: 15)),
                                const SizedBox(width: 10),
                                Text('₹${(item.price * item.quantity).toStringAsFixed(2)}', style: TextStyle(fontSize: 15, color: theme.colorScheme.primary, fontWeight: FontWeight.w600)),
                              ],
                            );
                          },
                        ),
                      ),
                      const SizedBox(height: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                        decoration: BoxDecoration(
                          color: theme.colorScheme.primary.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Total Amount:', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                            Text('₹${totalAmount.toStringAsFixed(2)}', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: theme.colorScheme.primary)),
                          ],
                        ),
                      ),
                      const SizedBox(height: 6),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class OrderItem {
  final String name;
  final int quantity;
  final double price;

  OrderItem({required this.name, required this.quantity, required this.price});
} 