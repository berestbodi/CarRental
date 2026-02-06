---

# 🚗 RentalCar

### *Your premium car rental experience in Ukraine*

**RentalCar** is a high-performance web platform designed to streamline the car rental process. Combining a sleek user interface with robust backend logic, it offers users a seamless journey from browsing a diverse fleet to completing a booking with real-time data persistence.

---

### 🚀 Tech Stack & Architecture

The project is built using modern industry standards to ensure SEO optimization, type safety, and exceptional speed:

| Category | Tools & Technologies |
| --- | --- |
| **Core Framework** | **Next.js 15** (App Router) 🚀, **React 19** ⚛️, **TypeScript** 🟦 |
| **Forms & Validation** | **Formik** 📝 + **Yup** ✅ |
| **Data Fetching** | **Server Components** 🛡️ + **Client-side Fetching** |
| **Styling & UI** | **CSS Modules** 🎨 + **React-Datepicker** 📅 |
| **Notifications** | **iziToast** 🔔 |

---

### ✨ Key Features & Technical Implementation

#### 🏗️ SEO & Performance (Server-Side)

* **Dynamic Metadata:** Implemented a robust metadata engine that generates unique titles, descriptions, and OpenGraph images for every car, ensuring high visibility on search engines and social media.
* **Server-Side Rendering (SSR):** Leveraged Next.js Server Components to deliver instant catalog loading and superior indexing.
* **Image Optimization:** Used the `next/image` component for automatic format conversion (WebP), lazy loading, and responsive sizing to minimize LCP (Largest Contentful Paint).

#### 📝 Advanced Form Logic & UX

* **Formik & Persistence:** Features an intelligent booking form with an "Auto-Saver" mechanism. In-progress data is synced to `localStorage`, protecting users from data loss upon page refreshes.
* **Custom Date Management:** Integrated `react-datepicker` with a bespoke CSS implementation (custom triangles and rounded UI) to match the premium brand identity.
* **Real-time Feedback:** Integrated **iziToast** for elegant, non-intrusive notifications regarding successful bookings and field validation errors.

#### 🎨 Design & UI

* **Encapsulated Styling:** Used **CSS Modules** to ensure style isolation, preventing global scope pollution and making the codebase highly maintainable.
* **Responsive Architecture:** A mobile-first approach using CSS Grid and Flexbox, ensuring the application looks perfect on everything from small smartphones to ultra-wide monitors.
* **Smart Filtering:** A dynamic filtering system that allows users to narrow down the fleet by brand, price, and mileage in real-time.

---

### 🛠 Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/car-rental-one-delta.git

```

2. **Install dependencies:**

```bash
npm install

```

3. **Run the development server:**

```bash
npm run dev

```

---

> Feel free to ⭐ this repository if you find it helpful!

---
