import 'package:flutter/material.dart';
import 'order_card.dart';
import 'order_detail_page.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    // Mock data for the order and items
    final mockItems = [
      OrderItem(name: 'Milk', quantity: 2, price: 2.50),
      OrderItem(name: 'Bread', quantity: 1, price: 1.20),
      OrderItem(name: 'Eggs', quantity: 12, price: 3.00),
    ];
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: GestureDetector(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => OrderDetailPage(
                  name: 'John Doe',
                  address: '123 Main St, Springfield',
                  phoneNumber: '+1 234 567 890',
                  items: mockItems,
                ),
              ),
            );
          },
          child: OrderCard(
            name: 'John Doe',
            address: '123 Main St, Springfield',
            phoneNumber: '+1 234 567 890',
            itemCount: 4,
          ),
        ),
      ),
    );
  }
} 