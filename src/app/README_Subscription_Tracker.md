
# 📦 Subscription Tracker API

A lightweight Node.js API to track and manage user subscriptions efficiently. Ideal for personal use or as a backend service for apps requiring subscription data handling.

## 🚀 Features

- 🧾 Add, update, and delete subscriptions
- ⏰ Track subscription start dates and renewal cycles
- 💸 Store subscription costs and billing frequency
- 🗃️ Organized data management with RESTful API endpoints

---

## 🛠️ Tech Stack

| Tech            | Usage                        |
|-----------------|------------------------------|
| Node.js         | JavaScript runtime           |
| Express.js      | Web framework for Node.js    |
| Nodemon         | Auto-reloading during dev    |

---

## 📁 Project Structure

```bash
subscription_Tracker/
├── node_modules/
├── routes/
│   └── subscriptions.js    # API route handlers
├── app.js                  # Main entry point
├── package.json            # Dependencies & scripts
└── README.md               # Project docs
```

---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/soumik9870/subscription_Tracker.git
cd subscription_Tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the server (with auto-reload)

```bash
npm run dev
```

> Runs the app using Nodemon on `localhost:3000` (default)

---

## 📬 API Endpoints

| Method | Endpoint             | Description                 |
|--------|----------------------|-----------------------------|
| GET    | `/subscriptions`     | List all subscriptions      |
| POST   | `/subscriptions`     | Add a new subscription      |
| PUT    | `/subscriptions/:id` | Update a subscription       |
| DELETE | `/subscriptions/:id` | Delete a subscription       |

---

## 📝 Example Payload

```json
{
  "name": "Netflix",
  "amount": 499,
  "startDate": "2025-06-01",
  "renewalPeriod": "monthly"
}
```

---

## 📌 TODO

- ✅ CRUD operations
- [ ] MongoDB or JSON file storage
- [ ] Authentication (JWT)
- [ ] Frontend integration

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ by [Soumik Saha](https://github.com/soumik9870)
