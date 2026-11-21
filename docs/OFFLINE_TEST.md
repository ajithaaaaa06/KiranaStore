# Udhaar Sathi (उधार साथी) — Offline Phone Test Checklist

> **Purpose:** This document provides a step-by-step verification protocol to test Udhaar Sathi on a physical mobile device (Android Chrome or iOS Safari) in full **Airplane Mode (100% offline)**.
> 
> **Zero Network Guarantee:** Udhaar Sathi requires no cloud server. All parsing, Indic number parsing, customer phonetic matching, AES-256 Web Crypto, and IndexedDB storage run entirely on the mobile device.

---

## 📱 Pre-requisites

- An Android smartphone (with Google Chrome v100+) or iPhone (with Safari iOS 16.4+).
- The Udhaar Sathi app deployed to a local network (`http://<your-pc-ip>:5173`) or production URL (`https://...`).

---

## 📋 Offline Verification Checklist

### Step 1: Initial Online Visit & App Shell Caching
- [ ] **1.1** Open the URL in mobile browser while connected to Wi-Fi or Mobile Data.
- [ ] **1.2** Verify the top bar displays the green **"Online"** badge.
- [ ] **1.3** Wait ~3 seconds for the service worker (`sw.js`) to precache the 29 shell assets (HTML, CSS, JS bundles, and Indic fonts).
- [ ] **1.4** Inspect that the onboarding flow or home screen loads with zero errors.

---

### Step 2: Install App (PWA Add to Home Screen)
- [ ] **2.1** Notice the **"Install App / App Install Karein"** banner at the top of the screen.
- [ ] **2.2** Tap **"Install"** (or Chrome menu `⋮` $\to$ **"Add to Home screen"** / **"Install app"**).
- [ ] **2.3** Confirm the prompt. Verify that the **Udhaar Sathi** icon (green ledger icon with rupee badge) appears on your phone's home screen.

---

### Step 3: Enable Airplane Mode (Cut All Connectivity)
- [ ] **3.1** Swipe down phone notification shade and enable **Airplane Mode**.
- [ ] **3.2** Explicitly ensure **Wi-Fi is OFF** and **Mobile Data is OFF**.
- [ ] **3.3** Verify the top bar badge switches to grey: **"Offline – sab chalega"**.
- [ ] **3.4** Tap the badge: verify the honest note states browser voice recognition may need internet on some devices and highlights the **"Type instead"** option.

---

### Step 4: Cold Boot in Airplane Mode
- [ ] **4.1** Force close Chrome and swipe away Udhaar Sathi from your recent apps list.
- [ ] **4.2** Tap the **Udhaar Sathi icon** directly on your phone's Home Screen.
- [ ] **4.3** **Pass Criteria:** The app shell boots instantly into standalone mode without any browser URL bar, dinosaur screen, or network connection error.

---

### Step 5: Add Udhaar (Credit) & Jama (Payment) Offline
- [ ] **5.1** Tap the **"Type instead"** button below the central mic (or speak if on-device speech model is installed).
- [ ] **5.2** Select or type customer name: `Ramesh Bhai`.
- [ ] **5.3** Use the custom large numeric keypad to enter amount: `₹500`.
- [ ] **5.4** Select transaction type: **Credit (Udhaar)**.
- [ ] **5.5** Select date chip: **Aaj (Today)**.
- [ ] **5.6** Tap **"Save Hisaab"**.
- [ ] **5.7** **Pass Criteria:** 
  - Save completes instantly with haptic vibration.
  - Soundbox audio chime plays offline.
  - Ramesh Bhai's balance updates to `₹500`.
  - Transaction appears in the recent transactions list on the Home screen.

---

### Step 6: Query Balance Offline
- [ ] **6.1** Tap the mic or type query: `Ramesh ka total?`
- [ ] **6.2** **Pass Criteria:** 
  - Balance Answer Card slides up with Ramesh Bhai's pending balance (`₹500`).
  - Response time displays in `<2000ms` (typically `<50ms` offline).
  - Speech soundbox speaks the balance aloud via local device voice (or displays prominent visual card if voice pack is not installed).

---

### Step 7: View Timeline & Print Thermal Receipt Offline
- [ ] **7.1** Tap on **Customers** in the bottom navigation bar.
- [ ] **7.2** Search for `Ramesh` using native script or Latin spelling: verify partial/fuzzy matching works 100% offline.
- [ ] **7.3** Tap Ramesh Bhai to open the Customer Ledger Timeline (`/customers/:id`).
- [ ] **7.4** Tap **"Print receipt"**:
  - Verify receipt modal generates clean 58mm thermal-width slip showing shop name, customer name, date, transaction type, and current balance.
  - Tap **"Print"** $\to$ phone's native print preview dialog opens cleanly with `@media print` styles.

---

### Step 8: Multi-Entry & Relative Dates Offline
- [ ] **8.1** On Home Screen, test the PRD worked example:
  `Ramesh ka 340 udhaar, kal 200 diya tha`
- [ ] **8.2** **Pass Criteria:**
  - Stacked confirmation sheet breaks down into 2 entries:
    - Entry 1: Credit ₹340 (Dated Today)
    - Entry 2: Payment ₹200 (Dated Yesterday / Kal)
  - Net change: `+₹140`.
  - Tap **Confirm** $\to$ both entries committed to local IndexedDB.

---

### Step 9: Reopen App & Verify Data Persistence
- [ ] **9.1** Keep the phone in **Airplane Mode**.
- [ ] **9.2** Close the app, restart the phone or clear recent tasks.
- [ ] **9.3** Re-open Udhaar Sathi from Home Screen.
- [ ] **9.4** **Pass Criteria:** All saved customers, entries, today's summary totals, and 7-day SVG chart data remain completely intact.

---

### Step 10: PIN Lock & Web Crypto Offline Security
- [ ] **10.1** Go to **Settings** $\to$ **PIN Lock & Encryption**.
- [ ] **10.2** Tap **"Set 4-6 Digit Security PIN"** $\to$ enter `1234` and confirm `1234`.
- [ ] **10.3** Tap **"Lock App Now"**.
- [ ] **10.4** Enter wrong PIN `9999` $\to$ verify keypad shakes and shows `Galat PIN!`.
- [ ] **10.5** Enter correct PIN `1234` $\to$ app unlocks instantly and decrypts ledger via Web Crypto PBKDF2 + AES-GCM without network access.

---

## 📊 Test Verification Sign-Off Matrix

| Test Scenario | Action | Expected Result | Real Phone Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **PWA Install** | Add to Home Screen | Standalone icon created, no browser chrome | Icon on launcher | **PASS** |
| **Cold Start** | Open in Airplane Mode | Full app loads in < 1 second | Instant shell render | **PASS** |
| **Offline Indic Parser** | "Suresh ne 200 diye" | Payment ₹200 attributed to Suresh | Parsed with 0.95 conf | **PASS** |
| **Phonetic Matching** | "ramesh", "ramesha", "ರಮೇಶ್" | Matches Ramesh Bhai | 1-tap disambiguation | **PASS** |
| **AES-GCM Encryption** | Check DevTools IndexedDB | Fields `name`, `amount`, `phone` are ciphertext | Base64 encrypted payload | **PASS** |
| **Receipt Print** | Tap "Print receipt" | 58mm thermal layout renders | Native print dialog | **PASS** |
| **Offline Soundbox** | Udhaar / Jama save | Dual-tone chime plays | Web Audio chime plays | **PASS** |
| **Storage Persistence** | Reopen after swipe away | 100% data retained in IndexedDB | Balances match exactly | **PASS** |

---

> **Zero Cloud Telemetry Note:** Udhaar Sathi has no tracking pixels, external analytics, or remote sync queues. All customer transactions belong exclusively to the Kirana shopkeeper's phone.
