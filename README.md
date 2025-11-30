# 🏨 Hotel Room Reservation – Frontend

This is the frontend UI for the **Hotel Room Reservation System**, built using **React + Vite**.  
It interacts with the backend to display room status, highlight booked rooms, and allow bookings.

---

## 🚀 Tech Stack
- **React**
- **Vite**
- **TypeScript**
- **Axios / Fetch**
- **Material UI**
- **Vercel (Deployment)**

---

## 📂 Project Structure
```
src/
 ├── components/
 ├── services/
 ├── hooks/
 ├── App.tsx
 └── main.tsx
```

---

## ⚙ Environment Variables

Create `.env` in project root:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

Use in code:

```ts
const API = import.meta.env.VITE_API_URL;
```

---

## 📦 Install Dependencies
```sh
npm install
# or
yarn install
```

---

## ▶ Run in Development
```sh
npm run dev
```

---

## 🏗 Build for Production
```sh
npm run build
```

---

## 👀 Preview Build
```sh
npm run preview
```

---

## 🌍 Deployment (Vercel)

### **Vercel Settings**
- Build Command:
  ```
  npm run build
  ```
- Output Directory:
  ```
  dist
  ```
- Environment Variables:
  ```
  VITE_API_URL=https://hotel-room-reservation-backend-xxxx.onrender.com
  ```

---

## 🔗 API Integration Example

```ts
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/rooms`)
    .then(res => res.json())
    .then(data => setRooms(data));
}, []);
```

---

## 🎨 Features
- View room availability
- Random book highlight animation
- Real-time backend data
- Fully responsive layout
- Seamless Render + Vercel setup

---

## ⚠ CORS Requirements
Backend must allow the Vercel domain:

```ts
app.use(cors({
  origin: "*",
}));
```

---

## 📜 License
MIT License.
