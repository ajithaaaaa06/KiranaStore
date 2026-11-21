# Udhaar Sathi (उधार साथी) — 3-Minute Live Demo Script 🎙️⏱️
> **Target Audience**: Hackathon Judges, Angel Investors, Product Reviewers  
> **Duration**: Exactly 3 Minutes (180 seconds)  
> **Pre-Demo URL**: `https://<your-app>.vercel.app?demo=1` (or `http://localhost:5173?demo=1`)

---

## ⚡ Pre-Stage Setup (30 Seconds Before Demo)
1. **Open with Demo Mode**: Navigate to `?demo=1`.
2. **One-Tap Clean Slate**: Tap the yellow **[🔄 Reset Demo]** button in the top banner.
   - *Confirmation*: Toast appears *"Demo reset! 12 grahak aur 62 entries reseeded clean."*
3. **Sound Check**: Turn phone/laptop media volume to **80%+** so the audience hears the iconic Soundbox audio chimes and Hindi/English TTS spoken confirmations.
4. **Language Check**: Ensure language chip says **हिंदी (Hindi)** or **Hinglish**.

---

## ⏱️ Timeline & Step-by-Step Flow

```
[0:00 - 0:35]  Act 1: The Core 2-Tap Loop ("Ramesh ko 500 udhaar")
[0:35 - 1:10]  Act 2: Compound Math & Disambiguation ("340 udhaar, kal 200 diya")
[1:10 - 1:40]  Act 3: In-Flight Voice Correction ("nahi, 430")
[1:40 - 2:10]  Act 4: Spoken Balance Query & TTS ("Ramesh ka total?")
[2:10 - 2:35]  Act 5: Polite WhatsApp Reminder & 58mm Thermal Receipt
[2:35 - 3:00]  Act 6: The Airplane Mode Resilience Test
```

---

### Act 1: The Core 2-Tap Loop (0:00 – 0:35)
**Narrative Hook**:
> *"Indian kirana store owners have dirty, flour-covered hands, loud shops, and zero patience for typing. Watch how fast they record credit in Udhaar Sathi."*

* **Physical Action**: Tap the giant **96px Hero Mic Button**.
* **Spoken Phrase**: 
  > *"Ramesh ko paanch sau udhaar diya"*
* **What Happens On Screen**:
  1. Live transcript banner types out real-time speech.
  2. The **Confirm Entry Bottom Sheet** slides up instantly (<300ms).
  3. Pre-selects **Ramesh Kumar**, amount **₹500**, type **Udhaar (Credit)** with rose/amber badge.
  4. Web Audio synthesizer plays a crisp payment chime.
* **Physical Action**: Tap the large green button: **"HAAN, SAVE KARO ✓"** (Total: 2 taps).
* **Soundbox Spoke**: *"Ramesh ko paanch sau rupaye udhaar darj kiya"*
* 🛡️ **Noisy Hall Fallback**:
  If stage noise cuts the mic, tap the first hint pill under the mic: **`"Ramesh ko 500 udhaar diya"`**. It triggers the identical flow.

---

### Act 2: Compound Math & Disambiguation (0:35 – 1:10)
**Narrative Hook**:
> *"In real life, customers don't speak in neat single sentences. They mix today's purchases with yesterday's cash payments, and there's always more than one 'Ramesh' in the neighborhood."*

* **Physical Action**: Tap the **Hero Mic Button**.
* **Spoken Phrase**:
  > *"Ramesh ka teen sau chaalis udhaar, kal do sau diya tha"*
* **What Happens On Screen**:
  1. **Disambiguation Guard**: The app recognizes both *Ramesh Kumar (Plumber)* and *Ramesh Gowda*. Tap **Ramesh Kumar**.
  2. **Multi-Entry Splitting**: The bottom sheet displays two stacked rows:
     - Today: **₹340 Udhaar (Credit)**
     - Kal (Yesterday): **₹200 Jama (Payment)**
  3. Computes net impact automatically.
* 🛡️ **Noisy Hall Fallback**:
  Tap the second hint pill: **`"Ramesh ka 340 udhaar, kal 200 diya tha"`**.

---

### Act 3: In-Flight Voice Self-Correction (1:10 – 1:40)
**Narrative Hook**:
> *"The shopkeeper makes a mistake. In any other app, you cancel, delete, and re-type. In Udhaar Sathi, you just correct yourself out loud."*

* **Physical Action**: With the bottom sheet still open from Act 2, DO NOT touch the screen.
* **Spoken Phrase**:
  > *"nahi, 430"*
* **What Happens On Screen**:
  1. The amount field immediately highlights with a green pulse animation.
  2. The draft amount updates from **₹340** to **₹430** without losing customer or date!
  3. No duplicate entry is created.
* **Physical Action**: Tap **"HAAN, SAVE KARO ✓"**.
* 🛡️ **Noisy Hall Fallback**:
  Tap the small pill inside the sheet: **`"nahi, 430"`**.

---

### Act 4: Spoken Balance Query & TTS (1:40 – 2:10)
**Narrative Hook**:
> *"A customer walks in and asks 'Mera kitna bacha hai?'. No searching, no scrolling."*

* **Physical Action**: Tap the **Hero Mic Button**.
* **Spoken Phrase**:
  > *"Ramesh ka total?"*
* **What Happens On Screen**:
  1. In **<1.8 seconds**, the **Balance Query Sheet** slides up.
  2. Prominently displays Ramesh's current outstanding balance (e.g. **₹2,450**).
  3. The phone's speaker audibly announces:
     > *"Ramesh Kumar ka kul baaki do hazaar char sau pachas rupaye hai."*
  4. Shows last 3 transactions directly on the card.
* 🛡️ **Noisy Hall Fallback**:
  Tap the third hint pill: **`"Ramesh ka total?"`**.

---

### Act 5: Polite WhatsApp Reminder & Thermal Receipt (2:10 – 2:35)
**Narrative Hook**:
> *"Asking for money back is culturally awkward. Udhaar Sathi generates respectful, localized reminders that preserve the relationship."*

* **Physical Action**: On the Balance Query card, tap the green **"WhatsApp Hisaab"** button.
* **What Happens On Screen**:
  1. Generates an encoded `wa.me` message in Hindi/Hinglish:
     > *"Namaste Ramesh ji, Sri Lakshmi Kirana se aapka kul baaki hisaab ₹2,450 hai. Suvidha anusar Google Pay / PhonePe ya cash se bhugtan karein. Dhanyawad!"*
* **Physical Action**: Close WhatsApp preview and tap **"Print Receipt"**.
  - Renders a clean 58mm thermal printable slip formatted for Bluetooth receipt printers.

---

### Act 6: The Airplane Mode Resilience Test (2:35 – 3:00)
**Narrative Hook**:
> *"Here is the true test for Indian retail tech: Can it survive when the basement shop has zero bars of signal?"*

* **Physical Action**: 
  1. Swipe down the phone status bar and turn on **Airplane Mode** (kill Wi-Fi and 5G).
  2. Point to the top header badge: it smoothly transitions to **"Offline Safe (Local)"**.
  3. Tap **"Type Instead"** (or use the offline numeric keypad).
  4. Enter `₹150` for `Lakshmi Amma` and tap **Save**.
  5. **Force-refresh the browser tab** or close and reopen the PWA shortcut.
* **What Happens On Screen**:
  1. The app boots in **under 800 milliseconds** from Service Worker cache.
  2. The transaction is already saved in **AES-256 encrypted on-device IndexedDB**.
  3. Zero network errors. Zero data loss.
* **Closing Line**:
  > *"Zero cloud dependency. 100% on-device privacy. Built for 13 million Indian kiranas. That is Udhaar Sathi."*

---

## 📋 Quick Presenter Emergency Cheat Sheet

| Situation | Immediate Action |
| :--- | :--- |
| Microphone permission blocked | Tap the lock icon in the URL bar $\to$ reset site permissions $\to$ reload. |
| Hall is extremely loud | Use the 3 tappable **Quick Demo Pills** right below the mic. They simulate exact Web Speech inputs. |
| Judge asks "Where is the data stored?" | Answer: *"100% on-device in browser IndexedDB, encrypted with Web Crypto AES-GCM 256. Zero shopkeeper data touches our servers."* |
| Reset dataset between judge rounds | Tap the yellow **[🔄 Reset Demo]** button in the header bar. Takes 1 click. |
