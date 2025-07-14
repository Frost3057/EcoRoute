# EcoRoute 🌱

An eco-friendly delivery management system with blockchain integration for sustainable logistics. Combines green delivery optimization with blockchain rewards.

## 🌟 Features

### Core Features
- **Blockchain Integration**: EcoCoin cryptocurrency for rewarding eco-friendly deliveries
- **Smart Order Management**: Asynchronous order processing and tracking
- **Catalog System**: Product management with eco-friendly labels
- **Driver Management**: Driver registration and route optimization
- **AI Agent**: Integrated LLM-powered assistant for customer support
- **Route Optimization**: Eco-friendly route planning

### Applications
- **Admin Dashboard**: Complete management system built with React and Vite
- **Customer Portal**: User-friendly shopping interface
- **Partner Mobile App**: Flutter-based driver application

## 🛠️ Tech Stack

### Backend (FastAPI + MongoDB)
- **Web Framework**: FastAPI
- **Database**: MongoDB with Motor (Async)
- **Blockchain**: Custom implementation
- **AI**: Large Language Model integration
- **Route Optimization**: Custom algorithm

### Frontend
- **Admin & Customer Portals**: 
  - React + Vite
  - TailwindCSS
  - TypeScript

### Mobile App
- **Framework**: Flutter
- **Language**: Dart
- **Features**: Real-time tracking, route navigation

## 📁 Project Structure

```
EcoRoute/
├── admin_side_site/          # Admin Dashboard
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   └── pages/           # Admin pages (Dashboard, Orders, etc.)
├── customer_side_site/       # Customer Portal
│   ├── src/
│   │   └── pages/           # Customer pages (Home, Cart, etc.)
├── partner_app/              # Driver Mobile App
│   ├── lib/                 # Dart source code
│   ├── android/             # Android specific
│   └── ios/                 # iOS specific
└── BackEnd/
    ├── BlockChain/          # Blockchain implementation
    │   ├── blockChain.py
    │   └── init.py
    ├── llm/                 # AI Agent
    │   └── main.py
    ├── Routing/             # Route optimization
    │   ├── mapApi.py
    │   └── routeOptimization.py
    ├── routes.py            # API endpoints
    ├── database.py          # Database operations
    ├── client.py            # MongoDB client
    └── serialization.py     # Data serialization
```

## 🚀 API Endpoints

### Order Management
- `GET /orders` - Get all orders
- `GET /orders/{customer_id}` - Get customer specific orders
- `POST /order/place_order` - Place a new order

### Catalog
- `GET /catalog` - Get product catalog

### Blockchain
- `GET /ecoCoin/getbalance/{address}` - Get wallet balance

### AI Assistant
- `POST /EcoAgent` - Interact with AI agent

## 💻 Setup Instructions

### Backend Setup
1. Clone the repository
```bash
git clone https://github.com/Frost3057/EcoRoute.git
cd EcoRoute
```

2. Create and activate virtual environment
```bash
python -m venv .venv
.\.venv\Scripts\activate  # Windows
source .venv/bin/activate # Linux/Mac
```

3. Install Python dependencies
```bash
cd BackEnd
pip install -r requirements.txt
```

4. Set up environment variables
Create a `.env` file in the BackEnd directory:
```env
mongo_db_connection=your_mongodb_connection_string
```

5. Run the FastAPI server
```bash
uvicorn main:app --reload
```

### Admin Dashboard Setup
```bash
cd admin_side_site
npm install
npm run dev
```

### Customer Portal Setup
```bash
cd customer_side_site
npm install
npm run dev
```

### Mobile App Setup
```bash
cd partner_app
flutter pub get
flutter run
```

## 🔒 Environment Variables

### Backend
- `mongo_db_connection`: MongoDB Atlas connection string

### Frontend
- `VITE_API_URL`: Backend API URL
- `VITE_BLOCKCHAIN_NODE`: Blockchain node URL

## 📝 Database Collections

### Users Collection
- User information
- Authentication details
- Wallet addresses

### Orders Collection
- Order details
- Delivery status
- Route information

### Drivers Collection
- Driver profiles
- Vehicle information
- Performance metrics

### Catalog Collection
- Product information
- Eco-friendly ratings
- Pricing details

## 🌐 Deployment

### Backend
- Deployed on cloud platforms (AWS, GCP, or Azure)
- Docker containers for easy scaling
- Load balancing for high availability

### Frontend
- Static hosting on Vercel/Netlify
- CDN for better performance
- PWA support

### Mobile App
- Available on Play Store and App Store
- CI/CD with Flutter

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Backend Development: [Your Name]
- Frontend Development: [Your Name]
- Mobile App Development: [Your Name]
- UI/UX Design: [Your Name]

## 📞 Support

For support, email [your-email] or join our Slack channel.