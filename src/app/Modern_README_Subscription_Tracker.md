
# 📦 Subscription Tracker API

A modern and minimalist Node.js REST API to track and manage subscription services with ease. Ideal for apps or personal use cases that need to manage recurring subscriptions.

---

## 🚀 Features

- ✅ **CRUD operations** for subscriptions
- 📅 Track **start dates** and **renewal cycles**
- 💵 Manage **subscription costs**
- 🌐 RESTful API design using Express

---

## 🛠️ Tech Stack

| ⚙️ Tool        | 🌟 Description                     |
|----------------|-----------------------------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | JavaScript runtime |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) | Web framework for Node.js |
| ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat-square&logo=nodemon&logoColor=white) | Auto-reloading in development |

---

## 📁 Project Structure

```
subscription_Tracker/
├── node_modules/
├── routes/
│   └── subscriptions.js      # Subscription route handlers
├── app.js                    # Main app file
├── package.json              # Scripts and dependencies
└── README.md                 # Project documentation
```

---

## 🧪 Getting Started

### 🔁 Clone and Setup

```bash
git clone https://github.com/soumik9870/subscription_Tracker.git
cd subscription_Tracker
npm install
npm run dev
```

Runs on `http://localhost:3000` using Nodemon.

---

## 🔌 API Endpoints

| Method | Endpoint             | Action                     |
|--------|----------------------|----------------------------|
| `GET`  | `/subscriptions`     | Get all subscriptions      |
| `POST` | `/subscriptions`     | Add new subscription       |
| `PUT`  | `/subscriptions/:id` | Update existing subscription |
| `DELETE`| `/subscriptions/:id`| Delete a subscription       |

---

## 📥 Example Request

```json
{
  "name": "Spotify",
  "amount": 199,
  "startDate": "2025-01-01",
  "renewalPeriod": "monthly"
}
```

---

## 🔧 Future Enhancements

- [ ] Add database support (MongoDB / SQLite)
- [ ] Authentication using JWT
- [ ] Frontend integration with React
- [ ] User dashboards

---

## 📃 License

Licensed under the [MIT License](LICENSE).

---

> 💻 Made with care by [Soumik Saha](https://github.com/soumik9870)
