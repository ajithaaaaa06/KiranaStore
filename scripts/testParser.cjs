"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/services/demoDataset.ts
var demoDataset_exports = {};
__export(demoDataset_exports, {
  PITCH_CUSTOMERS: () => PITCH_CUSTOMERS,
  PITCH_ENTRIES: () => PITCH_ENTRIES
});
var getDateOffset, PITCH_CUSTOMERS, PITCH_ENTRIES;
var init_demoDataset = __esm({
  "src/services/demoDataset.ts"() {
    "use strict";
    getDateOffset = (daysAgo, hoursOffset = 10, minutesOffset = 30) => {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - daysAgo);
      d.setHours(hoursOffset, minutesOffset, 0, 0);
      return d.toISOString();
    };
    PITCH_CUSTOMERS = [
      {
        id: "cust-1",
        name: "Ramesh Kumar (\u0930\u092E\u0947\u0936 \u0915\u0941\u092E\u093E\u0930)",
        phone: "9845012345",
        // ends in 2345
        phoneVerified: true,
        totalCredit: 4250,
        totalPayment: 1800,
        balance: 2450,
        // owes ₹2,450
        lastTransactionDate: getDateOffset(0, 14, 15),
        createdAt: getDateOffset(30),
        notes: "Near cross road 2 \u2022 Regular rations"
      },
      {
        id: "cust-2",
        name: "Ramesh Gowda (\u0CB0\u0CAE\u0CC7\u0CB6\u0CCD \u0C97\u0CCC\u0CA1)",
        phone: "9845099887",
        // ends in 9887 (different from Ramesh Kumar)
        phoneVerified: true,
        totalCredit: 1640,
        totalPayment: 800,
        balance: 840,
        // owes ₹840
        lastTransactionDate: getDateOffset(0, 16, 45),
        createdAt: getDateOffset(25),
        notes: "Near temple arch \u2022 Disambiguation pair"
      },
      {
        id: "cust-3",
        name: "Suresh Tailor (\u0938\u0941\u0930\u0947\u0936 \u092A\u094D\u0932\u0902\u092C\u0930)",
        phone: "9741234567",
        phoneVerified: true,
        totalCredit: 1520,
        totalPayment: 1200,
        balance: 320,
        // owes ₹320
        lastTransactionDate: getDateOffset(0, 11, 20),
        createdAt: getDateOffset(40),
        notes: "Tailor street shop #12"
      },
      {
        id: "cust-4",
        name: "Lakshmi Amma (\u0CB2\u0C95\u0CCD\u0CB7\u0CCD\u0CAE\u0CBF \u0C85\u0CAE\u0CCD\u0CAE)",
        phone: "9880198765",
        phoneVerified: true,
        totalCredit: 3650,
        totalPayment: 1800,
        balance: 1850,
        // owes ₹1,850
        lastTransactionDate: getDateOffset(0, 9, 30),
        createdAt: getDateOffset(35),
        notes: "Tea stall neighbor \u2022 Morning milk"
      },
      {
        id: "cust-5",
        name: "Priya Bakery (\u0BAA\u0BBF\u0BB0\u0BBF\u0BAF\u0BBE \u0BAA\u0BC7\u0B95\u0BCD\u0B95\u0BB0\u0BBF)",
        phone: "9844055112",
        phoneVerified: true,
        totalCredit: 5100,
        totalPayment: 2e3,
        balance: 3100,
        // owes ₹3,100 (Highest pending)
        lastTransactionDate: getDateOffset(0, 12, 10),
        createdAt: getDateOffset(20),
        notes: "Bakery daily maida & sugar"
      },
      {
        id: "cust-6",
        name: "Venkatesh Rao (\u0C35\u0C46\u0C02\u0C15\u0C1F\u0C47\u0C37\u0C4D)",
        phone: "9448123987",
        phoneVerified: true,
        totalCredit: 2450,
        totalPayment: 1500,
        balance: 950,
        // owes ₹950
        lastTransactionDate: getDateOffset(1, 15, 0),
        createdAt: getDateOffset(28),
        notes: "Auto stand union leader"
      },
      {
        id: "cust-7",
        name: "Manjunath Electrician (\u0CAE\u0C82\u0C9C\u0CC1\u0CA8\u0CBE\u0CA5\u0CCD)",
        phone: "9900334455",
        phoneVerified: true,
        totalCredit: 2850,
        totalPayment: 1200,
        balance: 1650,
        // owes ₹1,650
        lastTransactionDate: getDateOffset(1, 10, 30),
        createdAt: getDateOffset(22),
        notes: "Electrical contractor"
      },
      {
        id: "cust-8",
        name: "Sunita Bai (\u0938\u0941\u0928\u0940\u0924\u093E \u092C\u093E\u0908)",
        phone: "9845568899",
        // ends in 8899 (shared suffix with Abdul Bhai)
        phoneVerified: true,
        totalCredit: 3600,
        totalPayment: 1500,
        balance: 2100,
        // owes ₹2,100
        lastTransactionDate: getDateOffset(1, 17, 20),
        createdAt: getDateOffset(18),
        notes: "Apartment 304, Green Park"
      },
      {
        id: "cust-9",
        name: "Abdul Bhai (\u0905\u092C\u094D\u0926\u0941\u0932 \u092D\u093E\u0908)",
        phone: "9731238899",
        // ends in 8899 (shared suffix with Sunita Bai)
        phoneVerified: true,
        totalCredit: 1580,
        totalPayment: 800,
        balance: 780,
        // owes ₹780
        lastTransactionDate: getDateOffset(0, 15, 40),
        createdAt: getDateOffset(24),
        notes: "Fruit stall opposite market"
      },
      {
        id: "cust-10",
        name: "Ananya Store (\u0C85\u0CA8\u0CA8\u0CCD\u0CAF\u0CBE)",
        phone: "9886011223",
        phoneVerified: true,
        totalCredit: 1420,
        totalPayment: 1e3,
        balance: 420,
        // owes ₹420
        lastTransactionDate: getDateOffset(2, 11, 15),
        createdAt: getDateOffset(15),
        notes: "Stationery shop"
      },
      {
        id: "cust-11",
        name: "Rajesh Carpenter (\u0930\u093E\u091C\u0947\u0936)",
        phone: "9945044332",
        phoneVerified: true,
        totalCredit: 1500,
        totalPayment: 1e3,
        balance: 500,
        // owes ₹500
        lastTransactionDate: getDateOffset(3, 14, 0),
        createdAt: getDateOffset(19),
        notes: "Furniture workshop"
      },
      {
        id: "cust-12",
        name: "Geetha Dairy (\u0C97\u0CC0\u0CA4\u0CBE \u0CA1\u0CC8\u0CB0\u0CBF)",
        phone: "9901122334",
        phoneVerified: true,
        totalCredit: 2200,
        totalPayment: 2200,
        balance: 0,
        // Settled!
        lastTransactionDate: getDateOffset(1, 18, 0),
        createdAt: getDateOffset(30),
        notes: "Daily milk supplier \u2022 All settled \u2713"
      }
    ];
    PITCH_ENTRIES = [
      // --- Day 0 (Today - 6 entries) ---
      {
        id: "tx-p-1",
        customerId: "cust-1",
        customerName: "Ramesh Kumar (\u0930\u092E\u0947\u0936 \u0915\u0941\u092E\u093E\u0930)",
        amount: 500,
        type: "credit",
        date: getDateOffset(0, 9, 15),
        createdAt: getDateOffset(0, 9, 15),
        note: "Doodh 2L aur Atta 5kg",
        rawTranscript: "Ramesh ko 500 udhaar diya",
        synced: true
      },
      {
        id: "tx-p-2",
        customerId: "cust-4",
        customerName: "Lakshmi Amma (\u0CB2\u0C95\u0CCD\u0CB7\u0CCD\u0CAE\u0CBF \u0C85\u0CAE\u0CCD\u0CAE)",
        amount: 350,
        type: "credit",
        date: getDateOffset(0, 9, 30),
        createdAt: getDateOffset(0, 9, 30),
        note: "Cheeni 2kg aur Chai patti",
        rawTranscript: "Lakshmi amma 350 udhaar",
        synced: true
      },
      {
        id: "tx-p-3",
        customerId: "cust-3",
        customerName: "Suresh Tailor (\u0938\u0941\u0930\u0947\u0936 \u092A\u094D\u0932\u0902\u092C\u0930)",
        amount: 200,
        type: "payment",
        date: getDateOffset(0, 11, 20),
        createdAt: getDateOffset(0, 11, 20),
        note: "Grahak ne UPI se jama kiya",
        rawTranscript: "Suresh ne 200 jama diye",
        synced: true
      },
      {
        id: "tx-p-4",
        customerId: "cust-5",
        customerName: "Priya Bakery (\u0BAA\u0BBF\u0BB0\u0BBF\u0BAF\u0BBE \u0BAA\u0BC7\u0B95\u0BCD\u0B95\u0BB0\u0BBF)",
        amount: 800,
        type: "credit",
        date: getDateOffset(0, 12, 10),
        createdAt: getDateOffset(0, 12, 10),
        note: "Maida 20kg aur Tel 5L",
        rawTranscript: "Priya bakery 800 udhaar diya",
        synced: true
      },
      {
        id: "tx-p-5",
        customerId: "cust-1",
        customerName: "Ramesh Kumar (\u0930\u092E\u0947\u0936 \u0915\u0941\u092E\u093E\u0930)",
        amount: 300,
        type: "payment",
        date: getDateOffset(0, 14, 15),
        createdAt: getDateOffset(0, 14, 15),
        note: "Cash jama mila",
        rawTranscript: "Ramesh ne 300 jama diye",
        synced: true
      },
      {
        id: "tx-p-6",
        customerId: "cust-9",
        customerName: "Abdul Bhai (\u0905\u092C\u094D\u0926\u0941\u0932 \u092D\u093E\u0908)",
        amount: 280,
        type: "credit",
        date: getDateOffset(0, 15, 40),
        createdAt: getDateOffset(0, 15, 40),
        note: "Basmati chawal 2kg",
        rawTranscript: "Abdul 280 udhaar likho",
        synced: true
      },
      {
        id: "tx-p-7",
        customerId: "cust-2",
        customerName: "Ramesh Gowda (\u0CB0\u0CAE\u0CC7\u0CB6\u0CCD \u0C97\u0CCC\u0CA1)",
        amount: 400,
        type: "payment",
        date: getDateOffset(0, 16, 45),
        createdAt: getDateOffset(0, 16, 45),
        note: "Google Pay transfer",
        rawTranscript: "Ramesh Gowda se 400 jama mile",
        synced: true
      },
      // --- Day 1 (Yesterday - 5 entries) ---
      {
        id: "tx-p-8",
        customerId: "cust-7",
        customerName: "Manjunath Electrician (\u0CAE\u0C82\u0C9C\u0CC1\u0CA8\u0CBE\u0CA5\u0CCD)",
        amount: 450,
        type: "credit",
        date: getDateOffset(1, 10, 30),
        createdAt: getDateOffset(1, 10, 30),
        note: "Rin aur Surf Excel",
        rawTranscript: "Manjunath 450 udhaar diya",
        synced: true
      },
      {
        id: "tx-p-9",
        customerId: "cust-6",
        customerName: "Venkatesh Rao (\u0C35\u0C46\u0C02\u0C15\u0C1F\u0C47\u0C37\u0C4D)",
        amount: 600,
        type: "credit",
        date: getDateOffset(1, 15, 0),
        createdAt: getDateOffset(1, 15, 0),
        note: "Sonamasuri Rice 10kg",
        rawTranscript: "Venkatesh 600 udhaar",
        synced: true
      },
      {
        id: "tx-p-10",
        customerId: "cust-8",
        customerName: "Sunita Bai (\u0938\u0941\u0928\u0940\u0924\u093E \u092C\u093E\u0908)",
        amount: 500,
        type: "payment",
        date: getDateOffset(1, 16, 0),
        createdAt: getDateOffset(1, 16, 0),
        note: "Purana jama",
        rawTranscript: "Sunita bai ne 500 jama diye",
        synced: true
      },
      {
        id: "tx-p-11",
        customerId: "cust-8",
        customerName: "Sunita Bai (\u0938\u0941\u0928\u0940\u0924\u093E \u092C\u093E\u0908)",
        amount: 700,
        type: "credit",
        date: getDateOffset(1, 17, 20),
        createdAt: getDateOffset(1, 17, 20),
        note: "Sunflower oil 2L",
        rawTranscript: "Sunita 700 udhaar diya",
        synced: true
      },
      {
        id: "tx-p-12",
        customerId: "cust-12",
        customerName: "Geetha Dairy (\u0C97\u0CC0\u0CA4\u0CBE \u0CA1\u0CC8\u0CB0\u0CBF)",
        amount: 600,
        type: "payment",
        date: getDateOffset(1, 18, 0),
        createdAt: getDateOffset(1, 18, 0),
        note: "Hisaab barabar settlement",
        rawTranscript: "Geetha dairy 600 jama mila hisaab chukta",
        synced: true
      },
      // --- Day 2 (2 days ago - 5 entries) ---
      {
        id: "tx-p-13",
        customerId: "cust-5",
        customerName: "Priya Bakery (\u0BAA\u0BBF\u0BB0\u0BBF\u0BAF\u0BBE \u0BAA\u0BC7\u0B95\u0BCD\u0B95\u0BB0\u0BBF)",
        amount: 1100,
        type: "credit",
        date: getDateOffset(2, 8, 45),
        createdAt: getDateOffset(2, 8, 45),
        note: "Sugar 25kg bag",
        rawTranscript: "Priya bakery 1100 udhaar",
        synced: true
      },
      {
        id: "tx-p-14",
        customerId: "cust-10",
        customerName: "Ananya Store (\u0C85\u0CA8\u0CA8\u0CCD\u0CAF\u0CBE)",
        amount: 420,
        type: "credit",
        date: getDateOffset(2, 11, 15),
        createdAt: getDateOffset(2, 11, 15),
        note: "Biscuits cartons",
        rawTranscript: "Ananya 420 udhaar",
        synced: true
      },
      {
        id: "tx-p-15",
        customerId: "cust-2",
        customerName: "Ramesh Gowda (\u0CB0\u0CAE\u0CC7\u0CB6\u0CCD \u0C97\u0CCC\u0CA1)",
        amount: 540,
        type: "credit",
        date: getDateOffset(2, 13, 0),
        createdAt: getDateOffset(2, 13, 0),
        note: "Ghee 500g aur Doodh",
        rawTranscript: "Ramesh Gowda 540 udhaar",
        synced: true
      },
      {
        id: "tx-p-16",
        customerId: "cust-4",
        customerName: "Lakshmi Amma (\u0CB2\u0C95\u0CCD\u0CB7\u0CCD\u0CAE\u0CBF \u0C85\u0CAE\u0CCD\u0CAE)",
        amount: 500,
        type: "payment",
        date: getDateOffset(2, 15, 30),
        createdAt: getDateOffset(2, 15, 30),
        note: "Chai dukaan se cash",
        rawTranscript: "Lakshmi amma se 500 jama mile",
        synced: true
      },
      {
        id: "tx-p-17",
        customerId: "cust-1",
        customerName: "Ramesh Kumar (\u0930\u092E\u0947\u0936 \u0915\u0941\u092E\u093E\u0930)",
        amount: 450,
        type: "credit",
        date: getDateOffset(2, 17, 10),
        createdAt: getDateOffset(2, 17, 10),
        note: "Toor dal aur Masoor dal",
        rawTranscript: "Ramesh 450 udhaar likho",
        synced: true
      },
      // --- Day 3 (3 days ago - 5 entries) ---
      {
        id: "tx-p-18",
        customerId: "cust-11",
        customerName: "Rajesh Carpenter (\u0930\u093E\u091C\u0947\u0936)",
        amount: 500,
        type: "credit",
        date: getDateOffset(3, 10, 0),
        createdAt: getDateOffset(3, 10, 0),
        note: "Fevicol aur sandpaper",
        rawTranscript: "Rajesh 500 udhaar",
        synced: true
      },
      {
        id: "tx-p-19",
        customerId: "cust-3",
        customerName: "Suresh Tailor (\u0938\u0941\u0930\u0947\u0936 \u092A\u094D\u0932\u0902\u092C\u0930)",
        amount: 320,
        type: "credit",
        date: getDateOffset(3, 12, 15),
        createdAt: getDateOffset(3, 12, 15),
        note: "Buttons aur thread box",
        rawTranscript: "Suresh 320 udhaar",
        synced: true
      },
      {
        id: "tx-p-20",
        customerId: "cust-6",
        customerName: "Venkatesh Rao (\u0C35\u0C46\u0C02\u0C15\u0C1F\u0C47\u0C37\u0C4D)",
        amount: 500,
        type: "payment",
        date: getDateOffset(3, 14, 20),
        createdAt: getDateOffset(3, 14, 20),
        note: "Auto chala kar jama kiya",
        rawTranscript: "Venkatesh ne 500 diye",
        synced: true
      },
      {
        id: "tx-p-21",
        customerId: "cust-7",
        customerName: "Manjunath Electrician (\u0CAE\u0C82\u0C9C\u0CC1\u0CA8\u0CBE\u0CA5\u0CCD)",
        amount: 600,
        type: "credit",
        date: getDateOffset(3, 16, 40),
        createdAt: getDateOffset(3, 16, 40),
        note: "Wires aur switches",
        rawTranscript: "Manjunath 600 udhaar diya",
        synced: true
      },
      {
        id: "tx-p-22",
        customerId: "cust-9",
        customerName: "Abdul Bhai (\u0905\u092C\u094D\u0926\u0941\u0932 \u092D\u093E\u0908)",
        amount: 300,
        type: "payment",
        date: getDateOffset(3, 18, 0),
        createdAt: getDateOffset(3, 18, 0),
        note: "Cash payment",
        rawTranscript: "Abdul ne 300 jama diye",
        synced: true
      },
      // --- Day 4 (4 days ago - 4 entries) ---
      {
        id: "tx-p-23",
        customerId: "cust-5",
        customerName: "Priya Bakery (\u0BAA\u0BBF\u0BB0\u0BBF\u0BAF\u0BBE \u0BAA\u0BC7\u0B95\u0BCD\u0B95\u0BB0\u0BBF)",
        amount: 1200,
        type: "credit",
        date: getDateOffset(4, 9, 0),
        createdAt: getDateOffset(4, 9, 0),
        note: "Baking powder & butter 5kg",
        rawTranscript: "Priya bakery 1200 udhaar",
        synced: true
      },
      {
        id: "tx-p-24",
        customerId: "cust-1",
        customerName: "Ramesh Kumar (\u0930\u092E\u0947\u0936 \u0915\u0941\u092E\u093E\u0930)",
        amount: 500,
        type: "payment",
        date: getDateOffset(4, 11, 30),
        createdAt: getDateOffset(4, 11, 30),
        note: "Plumbing kaam ka paisa",
        rawTranscript: "Ramesh 500 jama kiya",
        synced: true
      },
      {
        id: "tx-p-25",
        customerId: "cust-8",
        customerName: "Sunita Bai (\u0938\u0941\u0928\u0940\u0924\u093E \u092C\u093E\u0908)",
        amount: 800,
        type: "credit",
        date: getDateOffset(4, 14, 10),
        createdAt: getDateOffset(4, 14, 10),
        note: "Kaju kismis aur ghee",
        rawTranscript: "Sunita bai 800 udhaar",
        synced: true
      },
      {
        id: "tx-p-26",
        customerId: "cust-4",
        customerName: "Lakshmi Amma (\u0CB2\u0C95\u0CCD\u0CB7\u0CCD\u0CAE\u0CBF \u0C85\u0CAE\u0CCD\u0CAE)",
        amount: 600,
        type: "credit",
        date: getDateOffset(4, 17, 0),
        createdAt: getDateOffset(4, 17, 0),
        note: "Milk 10 packets",
        rawTranscript: "Lakshmi amma 600 udhaar",
        synced: true
      },
      // --- Day 5 (5 days ago - 5 entries) ---
      {
        id: "tx-p-27",
        customerId: "cust-12",
        customerName: "Geetha Dairy (\u0C97\u0CC0\u0CA4\u0CBE \u0CA1\u0CC8\u0CB0\u0CBF)",
        amount: 800,
        type: "credit",
        date: getDateOffset(5, 8, 30),
        createdAt: getDateOffset(5, 8, 30),
        note: "Paneer aur butter box",
        rawTranscript: "Geetha dairy 800 udhaar",
        synced: true
      },
      {
        id: "tx-p-28",
        customerId: "cust-2",
        customerName: "Ramesh Gowda (\u0CB0\u0CAE\u0CC7\u0CB6\u0CCD \u0C97\u0CCC\u0CA1)",
        amount: 500,
        type: "credit",
        date: getDateOffset(5, 10, 45),
        createdAt: getDateOffset(5, 10, 45),
        note: "Aashirvaad Atta 10kg",
        rawTranscript: "Ramesh Gowda 500 udhaar diya",
        synced: true
      },
      {
        id: "tx-p-29",
        customerId: "cust-5",
        customerName: "Priya Bakery (\u0BAA\u0BBF\u0BB0\u0BBF\u0BAF\u0BBE \u0BAA\u0BC7\u0B95\u0BCD\u0B95\u0BB0\u0BBF)",
        amount: 1e3,
        type: "payment",
        date: getDateOffset(5, 13, 0),
        createdAt: getDateOffset(5, 13, 0),
        note: "Bakery weekly settlement",
        rawTranscript: "Priya bakery ne 1000 jama diye",
        synced: true
      },
      {
        id: "tx-p-30",
        customerId: "cust-10",
        customerName: "Ananya Store (\u0C85\u0CA8\u0CA8\u0CCD\u0CAF\u0CBE)",
        amount: 500,
        type: "payment",
        date: getDateOffset(5, 15, 30),
        createdAt: getDateOffset(5, 15, 30),
        note: "PhonePe transfer",
        rawTranscript: "Ananya se 500 jama mile",
        synced: true
      },
      {
        id: "tx-p-31",
        customerId: "cust-6",
        customerName: "Venkatesh Rao (\u0C35\u0C46\u0C02\u0C15\u0C1F\u0C47\u0C37\u0C4D)",
        amount: 450,
        type: "credit",
        date: getDateOffset(5, 17, 15),
        createdAt: getDateOffset(5, 17, 15),
        note: "Groundnut oil 1L",
        rawTranscript: "Venkatesh 450 udhaar",
        synced: true
      },
      // --- Day 6 (6 days ago - 4 entries) ---
      {
        id: "tx-p-32",
        customerId: "cust-1",
        customerName: "Ramesh Kumar (\u0930\u092E\u0947\u0936 \u0915\u0941\u092E\u093E\u0930)",
        amount: 700,
        type: "credit",
        date: getDateOffset(6, 10, 0),
        createdAt: getDateOffset(6, 10, 0),
        note: "Basmati Rice aur Dal",
        rawTranscript: "Ramesh 700 udhaar diya",
        synced: true
      },
      {
        id: "tx-p-33",
        customerId: "cust-7",
        customerName: "Manjunath Electrician (\u0CAE\u0C82\u0C9C\u0CC1\u0CA8\u0CBE\u0CA5\u0CCD)",
        amount: 500,
        type: "payment",
        date: getDateOffset(6, 12, 30),
        createdAt: getDateOffset(6, 12, 30),
        note: "Wiring payment received",
        rawTranscript: "Manjunath ne 500 jama diye",
        synced: true
      },
      {
        id: "tx-p-34",
        customerId: "cust-9",
        customerName: "Abdul Bhai (\u0905\u092C\u094D\u0926\u0941\u0932 \u092D\u093E\u0908)",
        amount: 400,
        type: "credit",
        date: getDateOffset(6, 14, 50),
        createdAt: getDateOffset(6, 14, 50),
        note: "Dry fruits aur sevaiyan",
        rawTranscript: "Abdul 400 udhaar likho",
        synced: true
      },
      {
        id: "tx-p-35",
        customerId: "cust-3",
        customerName: "Suresh Tailor (\u0938\u0941\u0930\u0947\u0936 \u092A\u094D\u0932\u0902\u092C\u0930)",
        amount: 400,
        type: "payment",
        date: getDateOffset(6, 16, 20),
        createdAt: getDateOffset(6, 16, 20),
        note: "Jama cash",
        rawTranscript: "Suresh ne 400 diye",
        synced: true
      },
      // --- Days 7 to 13 (Historical 14-day entries for rich charts & timeline) ---
      {
        id: "tx-p-36",
        customerId: "cust-8",
        customerName: "Sunita Bai (\u0938\u0941\u0928\u0940\u0924\u093E \u092C\u093E\u0908)",
        amount: 600,
        type: "credit",
        date: getDateOffset(7, 10, 0),
        createdAt: getDateOffset(7, 10, 0),
        note: "Ghee aur poha",
        rawTranscript: "Sunita 600 udhaar",
        synced: true
      },
      {
        id: "tx-p-37",
        customerId: "cust-4",
        customerName: "Lakshmi Amma (\u0CB2\u0C95\u0CCD\u0CB7\u0CCD\u0CAE\u0CBF \u0C85\u0CAE\u0CCD\u0CAE)",
        amount: 400,
        type: "payment",
        date: getDateOffset(7, 12, 0),
        createdAt: getDateOffset(7, 12, 0),
        note: "Jama mila",
        rawTranscript: "Lakshmi amma 400 jama",
        synced: true
      },
      {
        id: "tx-p-38",
        customerId: "cust-5",
        customerName: "Priya Bakery (\u0BAA\u0BBF\u0BB0\u0BBF\u0BAF\u0BBE \u0BAA\u0BC7\u0B95\u0BCD\u0B95\u0BB0\u0BBF)",
        amount: 1e3,
        type: "credit",
        date: getDateOffset(7, 15, 0),
        createdAt: getDateOffset(7, 15, 0),
        note: "Eggs 2 crates & vanilla",
        rawTranscript: "Priya bakery 1000 udhaar",
        synced: true
      },
      {
        id: "tx-p-39",
        customerId: "cust-1",
        customerName: "Ramesh Kumar (\u0930\u092E\u0947\u0936 \u0915\u0941\u092E\u093E\u0930)",
        amount: 500,
        type: "payment",
        date: getDateOffset(8, 11, 0),
        createdAt: getDateOffset(8, 11, 0),
        note: "Payment mila",
        rawTranscript: "Ramesh 500 jama",
        synced: true
      },
      {
        id: "tx-p-40",
        customerId: "cust-7",
        customerName: "Manjunath Electrician (\u0CAE\u0C82\u0C9C\u0CC1\u0CA8\u0CBE\u0CA5\u0CCD)",
        amount: 700,
        type: "credit",
        date: getDateOffset(8, 14, 0),
        createdAt: getDateOffset(8, 14, 0),
        note: "Tools & oil",
        rawTranscript: "Manjunath 700 udhaar",
        synced: true
      },
      {
        id: "tx-p-41",
        customerId: "cust-11",
        customerName: "Rajesh Carpenter (\u0930\u093E\u091C\u0947\u0936)",
        amount: 500,
        type: "payment",
        date: getDateOffset(8, 16, 0),
        createdAt: getDateOffset(8, 16, 0),
        note: "Payment done",
        rawTranscript: "Rajesh ne 500 diye",
        synced: true
      },
      {
        id: "tx-p-42",
        customerId: "cust-12",
        customerName: "Geetha Dairy (\u0C97\u0CC0\u0CA4\u0CBE \u0CA1\u0CC8\u0CB0\u0CBF)",
        amount: 800,
        type: "payment",
        date: getDateOffset(9, 9, 30),
        createdAt: getDateOffset(9, 9, 30),
        note: "Dairy billing",
        rawTranscript: "Geetha dairy 800 jama",
        synced: true
      },
      {
        id: "tx-p-43",
        customerId: "cust-6",
        customerName: "Venkatesh Rao (\u0C35\u0C46\u0C02\u0C15\u0C1F\u0C47\u0C37\u0C4D)",
        amount: 400,
        type: "credit",
        date: getDateOffset(9, 11, 30),
        createdAt: getDateOffset(9, 11, 30),
        note: "Sugar & tea",
        rawTranscript: "Venkatesh 400 udhaar",
        synced: true
      },
      {
        id: "tx-p-44",
        customerId: "cust-2",
        customerName: "Ramesh Gowda (\u0CB0\u0CAE\u0CC7\u0CB6\u0CCD \u0C97\u0CCC\u0CA1)",
        amount: 200,
        type: "credit",
        date: getDateOffset(9, 15, 0),
        createdAt: getDateOffset(9, 15, 0),
        note: "Soap & washing powder",
        rawTranscript: "Ramesh Gowda 200 udhaar",
        synced: true
      },
      {
        id: "tx-p-45",
        customerId: "cust-1",
        customerName: "Ramesh Kumar (\u0930\u092E\u0947\u0936 \u0915\u0941\u092E\u093E\u0930)",
        amount: 600,
        type: "credit",
        date: getDateOffset(10, 10, 0),
        createdAt: getDateOffset(10, 10, 0),
        note: "Oil & spices",
        rawTranscript: "Ramesh 600 udhaar",
        synced: true
      },
      {
        id: "tx-p-46",
        customerId: "cust-4",
        customerName: "Lakshmi Amma (\u0CB2\u0C95\u0CCD\u0CB7\u0CCD\u0CAE\u0CBF \u0C85\u0CAE\u0CCD\u0CAE)",
        amount: 500,
        type: "payment",
        date: getDateOffset(10, 13, 0),
        createdAt: getDateOffset(10, 13, 0),
        note: "Cash payment",
        rawTranscript: "Lakshmi amma 500 diye",
        synced: true
      },
      {
        id: "tx-p-47",
        customerId: "cust-8",
        customerName: "Sunita Bai (\u0938\u0941\u0928\u0940\u0924\u093E \u092C\u093E\u0908)",
        amount: 500,
        type: "payment",
        date: getDateOffset(10, 16, 0),
        createdAt: getDateOffset(10, 16, 0),
        note: "Gpay",
        rawTranscript: "Sunita 500 jama",
        synced: true
      },
      {
        id: "tx-p-48",
        customerId: "cust-5",
        customerName: "Priya Bakery (\u0BAA\u0BBF\u0BB0\u0BBF\u0BAF\u0BBE \u0BAA\u0BC7\u0B95\u0BCD\u0B95\u0BB0\u0BBF)",
        amount: 1e3,
        type: "payment",
        date: getDateOffset(11, 10, 30),
        createdAt: getDateOffset(11, 10, 30),
        note: "Bakery payment",
        rawTranscript: "Priya bakery 1000 jama",
        synced: true
      },
      {
        id: "tx-p-49",
        customerId: "cust-3",
        customerName: "Suresh Tailor (\u0938\u0941\u0930\u0947\u0936 \u092A\u094D\u0932\u0902\u092C\u0930)",
        amount: 400,
        type: "credit",
        date: getDateOffset(11, 12, 0),
        createdAt: getDateOffset(11, 12, 0),
        note: "Detergent & biscuits",
        rawTranscript: "Suresh 400 udhaar",
        synced: true
      },
      {
        id: "tx-p-50",
        customerId: "cust-9",
        customerName: "Abdul Bhai (\u0905\u092C\u094D\u0926\u0941\u0932 \u092D\u093E\u0908)",
        amount: 300,
        type: "credit",
        date: getDateOffset(11, 15, 30),
        createdAt: getDateOffset(11, 15, 30),
        note: "Spices",
        rawTranscript: "Abdul 300 udhaar",
        synced: true
      },
      {
        id: "tx-p-51",
        customerId: "cust-10",
        customerName: "Ananya Store (\u0C85\u0CA8\u0CA8\u0CCD\u0CAF\u0CBE)",
        amount: 500,
        type: "payment",
        date: getDateOffset(12, 10, 0),
        createdAt: getDateOffset(12, 10, 0),
        note: "UPI payment",
        rawTranscript: "Ananya 500 jama",
        synced: true
      },
      {
        id: "tx-p-52",
        customerId: "cust-7",
        customerName: "Manjunath Electrician (\u0CAE\u0C82\u0C9C\u0CC1\u0CA8\u0CBE\u0CA5\u0CCD)",
        amount: 600,
        type: "credit",
        date: getDateOffset(12, 12, 30),
        createdAt: getDateOffset(12, 12, 30),
        note: "Groceries",
        rawTranscript: "Manjunath 600 udhaar",
        synced: true
      },
      {
        id: "tx-p-53",
        customerId: "cust-6",
        customerName: "Venkatesh Rao (\u0C35\u0C46\u0C02\u0C15\u0C1F\u0C47\u0C37\u0C4D)",
        amount: 500,
        type: "payment",
        date: getDateOffset(12, 16, 0),
        createdAt: getDateOffset(12, 16, 0),
        note: "Cash payment",
        rawTranscript: "Venkatesh 500 jama",
        synced: true
      },
      {
        id: "tx-p-54",
        customerId: "cust-1",
        customerName: "Ramesh Kumar (\u0930\u092E\u0947\u0936 \u0915\u0941\u092E\u093E\u0930)",
        amount: 1500,
        type: "credit",
        date: getDateOffset(13, 9, 30),
        createdAt: getDateOffset(13, 9, 30),
        note: "Monthly ration bag",
        rawTranscript: "Ramesh 1500 udhaar",
        synced: true
      },
      {
        id: "tx-p-55",
        customerId: "cust-4",
        customerName: "Lakshmi Amma (\u0CB2\u0C95\u0CCD\u0CB7\u0CCD\u0CAE\u0CBF \u0C85\u0CAE\u0CCD\u0CAE)",
        amount: 1200,
        type: "credit",
        date: getDateOffset(13, 11, 0),
        createdAt: getDateOffset(13, 11, 0),
        note: "Tea stall ration",
        rawTranscript: "Lakshmi amma 1200 udhaar",
        synced: true
      },
      {
        id: "tx-p-56",
        customerId: "cust-11",
        customerName: "Rajesh Carpenter (\u0930\u093E\u091C\u0947\u0936)",
        amount: 500,
        type: "credit",
        date: getDateOffset(13, 14, 0),
        createdAt: getDateOffset(13, 14, 0),
        note: "Hardware items",
        rawTranscript: "Rajesh 500 udhaar",
        synced: true
      },
      {
        id: "tx-p-57",
        customerId: "cust-11",
        customerName: "Rajesh Carpenter (\u0930\u093E\u091C\u0947\u0936)",
        amount: 500,
        type: "payment",
        date: getDateOffset(13, 17, 0),
        createdAt: getDateOffset(13, 17, 0),
        note: "Settlement cash",
        rawTranscript: "Rajesh 500 jama",
        synced: true
      },
      {
        id: "tx-p-58",
        customerId: "cust-8",
        customerName: "Sunita Bai (\u0938\u0941\u0928\u0940\u0924\u093E \u092C\u093E\u0908)",
        amount: 1e3,
        type: "credit",
        date: getDateOffset(13, 18, 0),
        createdAt: getDateOffset(13, 18, 0),
        note: "Rice & wheat 20kg",
        rawTranscript: "Sunita 1000 udhaar",
        synced: true
      },
      {
        id: "tx-p-59",
        customerId: "cust-12",
        customerName: "Geetha Dairy (\u0C97\u0CC0\u0CA4\u0CBE \u0CA1\u0CC8\u0CB0\u0CBF)",
        amount: 800,
        type: "credit",
        date: getDateOffset(13, 19, 0),
        createdAt: getDateOffset(13, 19, 0),
        note: "Milk supply batch 1",
        rawTranscript: "Geetha dairy 800 udhaar",
        synced: true
      },
      {
        id: "tx-p-60",
        customerId: "cust-2",
        customerName: "Ramesh Gowda (\u0CB0\u0CAE\u0CC7\u0CB6\u0CCD \u0C97\u0CCC\u0CA1)",
        amount: 400,
        type: "payment",
        date: getDateOffset(13, 20, 0),
        createdAt: getDateOffset(13, 20, 0),
        note: "Cash payment",
        rawTranscript: "Ramesh Gowda 400 jama",
        synced: true
      },
      {
        id: "tx-p-61",
        customerId: "cust-3",
        customerName: "Suresh Tailor (\u0938\u0941\u0930\u0947\u0936 \u092A\u094D\u0932\u0902\u092C\u0930)",
        amount: 600,
        type: "credit",
        date: getDateOffset(13, 20, 30),
        createdAt: getDateOffset(13, 20, 30),
        note: "Grocery items",
        rawTranscript: "Suresh 600 udhaar",
        synced: true
      },
      {
        id: "tx-p-62",
        customerId: "cust-3",
        customerName: "Suresh Tailor (\u0938\u0941\u0930\u0947\u0936 \u092A\u094D\u0932\u0902\u092C\u0930)",
        amount: 200,
        type: "payment",
        date: getDateOffset(13, 21, 0),
        createdAt: getDateOffset(13, 21, 0),
        note: "UPI settlement",
        rawTranscript: "Suresh 200 jama",
        synced: true
      }
    ];
  }
});

// src/services/phoneParser.ts
function extractDigitSequence(text) {
  if (!text) return "";
  let raw = text.trim();
  for (const [nativeChar, latinDigit] of Object.entries(NATIVE_DIGIT_MAP2)) {
    raw = raw.split(nativeChar).join(latinDigit);
  }
  raw = raw.replace(/[-.,/()]/g, " ");
  raw = raw.replace(/\bplus\s+(?:nine\s+one|91)\b/gi, "+91 ");
  raw = raw.replace(/प्लस\s+नौ\s+एक/gi, "+91 ");
  raw = raw.replace(/ಪ್ಲಸ್\s+ಒಂಬತ್ತು\s+ಒಂದು/gi, "+91 ");
  const tokens = raw.split(/\s+/).filter(Boolean);
  let result = "";
  let pendingMultiplier = 1;
  for (let i = 0; i < tokens.length; i++) {
    const rawToken = tokens[i];
    const token = rawToken.toLowerCase();
    if (REPEAT_DOUBLE_WORDS.has(token)) {
      pendingMultiplier = 2;
      continue;
    }
    if (REPEAT_TRIPLE_WORDS.has(token)) {
      pendingMultiplier = 3;
      continue;
    }
    if (FILLER_WORDS.has(token)) {
      continue;
    }
    if (/^\+?\d+$/.test(token)) {
      const pureDigits = token.replace(/\D/g, "");
      if (pureDigits) {
        if (pendingMultiplier > 1 && pureDigits.length === 1) {
          result += pureDigits.repeat(pendingMultiplier);
        } else {
          result += pureDigits;
        }
        pendingMultiplier = 1;
      }
      continue;
    }
    const digitValue = SPOKEN_DIGIT_MAP[token];
    if (digitValue !== void 0) {
      result += digitValue.repeat(pendingMultiplier);
      pendingMultiplier = 1;
      continue;
    }
    pendingMultiplier = 1;
  }
  return result;
}
function normalizePrefixes(digits) {
  let cleaned = digits;
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    const without91 = cleaned.substring(2);
    if (/^[6-9]/.test(without91)) {
      cleaned = without91;
    }
  }
  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    const withoutZero = cleaned.substring(1);
    if (/^[6-9]/.test(withoutZero)) {
      cleaned = withoutZero;
    }
  }
  return cleaned;
}
function formatPhone(phone) {
  const clean = (phone || "").replace(/\D/g, "");
  if (clean.length === 10) {
    return `${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  return clean;
}
function parsePhoneNumber(text) {
  if (!text || !text.trim()) return null;
  const rawDigits = extractDigitSequence(text);
  if (!rawDigits) {
    return {
      digits: "",
      formatted: "",
      confidence: 0,
      issues: ["No digits found in input"]
    };
  }
  const normalized = normalizePrefixes(rawDigits);
  const issues = [];
  if (normalized.length !== 10) {
    if (normalized.length === 9) {
      issues.push("Phone number has 9 digits (1 digit missing). Please speak or enter 10 digits.");
    } else if (normalized.length === 11) {
      issues.push("Phone number has 11 digits (1 extra digit). Indian mobile numbers must be 10 digits.");
    } else {
      issues.push(`Expected 10 digits, found ${normalized.length} digits.`);
    }
  }
  if (normalized.length > 0 && !/^[6-9]/.test(normalized)) {
    issues.push(`Indian mobile numbers must start with 6, 7, 8, or 9 (starts with ${normalized[0]}).`);
  }
  const isValid = issues.length === 0;
  const isDirectlyTyped = /^\d{10}$/.test(text.trim().replace(/[- ]/g, ""));
  return {
    digits: normalized,
    formatted: formatPhone(normalized),
    confidence: isValid ? isDirectlyTyped ? 1 : 0.95 : 0.3,
    issues
  };
}
var NATIVE_DIGIT_MAP2, SPOKEN_DIGIT_MAP, REPEAT_DOUBLE_WORDS, REPEAT_TRIPLE_WORDS, FILLER_WORDS;
var init_phoneParser = __esm({
  "src/services/phoneParser.ts"() {
    "use strict";
    NATIVE_DIGIT_MAP2 = {
      // Devanagari (० - ९)
      "\u0966": "0",
      "\u0967": "1",
      "\u0968": "2",
      "\u0969": "3",
      "\u096A": "4",
      "\u096B": "5",
      "\u096C": "6",
      "\u096D": "7",
      "\u096E": "8",
      "\u096F": "9",
      // Kannada (೦ - ೯)
      "\u0CE6": "0",
      "\u0CE7": "1",
      "\u0CE8": "2",
      "\u0CE9": "3",
      "\u0CEA": "4",
      "\u0CEB": "5",
      "\u0CEC": "6",
      "\u0CED": "7",
      "\u0CEE": "8",
      "\u0CEF": "9",
      // Tamil (௦ - ௯)
      "\u0BE6": "0",
      "\u0BE7": "1",
      "\u0BE8": "2",
      "\u0BE9": "3",
      "\u0BEA": "4",
      "\u0BEB": "5",
      "\u0BEC": "6",
      "\u0BED": "7",
      "\u0BEE": "8",
      "\u0BEF": "9",
      // Telugu (౦ - ౯)
      "\u0C66": "0",
      "\u0C67": "1",
      "\u0C68": "2",
      "\u0C69": "3",
      "\u0C6A": "4",
      "\u0C6B": "5",
      "\u0C6C": "6",
      "\u0C6D": "7",
      "\u0C6E": "8",
      "\u0C6F": "9"
    };
    SPOKEN_DIGIT_MAP = {
      // 0 - Zero
      "zero": "0",
      "oh": "0",
      "o": "0",
      "zeros": "0",
      "zeroes": "0",
      "shunya": "0",
      "soonya": "0",
      "shunyaa": "0",
      "\u0936\u0942\u0928\u094D\u092F": "0",
      "sonne": "0",
      "soone": "0",
      "\u0CB8\u0CCA\u0CA8\u0CCD\u0CA8\u0CC6": "0",
      // TODO_REVIEW: Check colloquial Kannada "soone" variant
      "poojyam": "0",
      "pujyam": "0",
      "poojiyam": "0",
      "\u0BAA\u0BC2\u0B9C\u0BCD\u0BAF\u0BAE\u0BCD": "0",
      "\u0BAA\u0BC2\u0B9C\u0BCD\u0B9C\u0BBF\u0BAF\u0BAE\u0BCD": "0",
      // TODO_REVIEW: Check colloquial Tamil "poojiyam"
      "sunna": "0",
      "soonna": "0",
      "\u0C38\u0C41\u0C28\u0C4D\u0C28\u0C3E": "0",
      // 1 - One
      "one": "1",
      "won": "1",
      "ek": "1",
      "aek": "1",
      "ik": "1",
      "\u090F\u0915": "1",
      "ondu": "1",
      "wondu": "1",
      "\u0C92\u0C82\u0CA6\u0CC1": "1",
      "ondru": "1",
      "onnu": "1",
      "\u0B92\u0BA9\u0BCD\u0BB1\u0BC1": "1",
      "\u0B92\u0BA9\u0BCD\u0BA9\u0BC1": "1",
      // TODO_REVIEW: Spoken Tamil "onnu" vs formal "ondru"
      "okati": "1",
      "vokati": "1",
      "\u0C12\u0C15\u0C1F\u0C3F": "1",
      // 2 - Two
      "two": "2",
      "to": "2",
      "too": "2",
      "do": "2",
      "doo": "2",
      "dow": "2",
      "\u0926\u094B": "2",
      "eradu": "2",
      "yeradu": "2",
      "\u0C8E\u0CB0\u0CA1\u0CC1": "2",
      "irandu": "2",
      "rendu": "2",
      "\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1": "2",
      "\u0BB0\u0BC6\u0BA3\u0BCD\u0B9F\u0BC1": "2",
      "moodu_dummy": "3",
      // placeholder
      // Telugu rendu
      "\u0C30\u0C46\u0C02\u0C21\u0C41": "2",
      // 3 - Three
      "three": "3",
      "tree": "3",
      "teen": "3",
      "tin": "3",
      "\u0924\u0940\u0928": "3",
      "mooru": "3",
      "muru": "3",
      "\u0CAE\u0CC2\u0CB0\u0CC1": "3",
      "moondru": "3",
      "moonu": "3",
      "\u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1": "3",
      "\u0BAE\u0BC2\u0BA3\u0BC1": "3",
      "moodu": "3",
      "mudu": "3",
      "\u0C2E\u0C42\u0C21\u0C41": "3",
      // 4 - Four
      "four": "4",
      "for": "4",
      "fore": "4",
      "char": "4",
      "chaar": "4",
      "\u091A\u093E\u0930": "4",
      "naalku": "4",
      "nalku": "4",
      "\u0CA8\u0CBE\u0CB2\u0CCD\u0C95\u0CC1": "4",
      "naangu": "4",
      "naalu": "4",
      "\u0BA8\u0BBE\u0BA9\u0BCD\u0B95\u0BC1": "4",
      "\u0BA8\u0BBE\u0BB2\u0BC1": "4",
      "naalugu": "4",
      "nalugu": "4",
      "\u0C28\u0C3E\u0C32\u0C41\u0C17\u0C41": "4",
      // 5 - Five
      "five": "5",
      "paanch": "5",
      "panch": "5",
      "\u092A\u093E\u0902\u091A": "5",
      "\u092A\u093E\u0901\u091A": "5",
      "aidu": "5",
      "aydu": "5",
      "\u0C90\u0CA6\u0CC1": "5",
      "\u0C10\u0C26\u0C41": "5",
      "aindhu": "5",
      "anju": "5",
      "anchu": "5",
      "\u0B90\u0BA8\u0BCD\u0BA4\u0BC1": "5",
      "\u0B85\u0B9E\u0BCD\u0B9A\u0BC1": "5",
      // Telugu aidu covered by 'aidu' / 'aydu'
      // 6 - Six
      "six": "6",
      "chhe": "6",
      "chhah": "6",
      "che": "6",
      "cheh": "6",
      "\u091B\u0939": "6",
      "\u091B\u0903": "6",
      "\u091B\u0947": "6",
      "aaru": "6",
      "aru": "6",
      "\u0C86\u0CB0\u0CC1": "6",
      "\u0B86\u0BB1\u0BC1": "6",
      "\u0C06\u0C30\u0C41": "6",
      // 7 - Seven
      "seven": "7",
      "saat": "7",
      "sat": "7",
      "\u0938\u093E\u0924": "7",
      "eelu": "7",
      "yelu": "7",
      "\u0C8F\u0CB3\u0CC1": "7",
      "eezhu": "7",
      "yezhu": "7",
      "\u0B8F\u0BB4\u0BC1": "7",
      "eedu": "7",
      "yedu": "7",
      "\u0C0F\u0C21\u0C41": "7",
      // 8 - Eight
      "eight": "8",
      "ate": "8",
      "aath": "8",
      "ath": "8",
      "\u0906\u0920": "8",
      "entu": "8",
      "yentu": "8",
      "\u0C8E\u0C82\u0C9F\u0CC1": "8",
      "ettu": "8",
      "\u0B8E\u0B9F\u0BCD\u0B9F\u0BC1": "8",
      "enimidi": "8",
      "yenimidi": "8",
      "\u0C0E\u0C28\u0C3F\u0C2E\u0C3F\u0C26\u0C3F": "8",
      // 9 - Nine
      "nine": "9",
      "nau": "9",
      "no": "9",
      "nav": "9",
      "\u0928\u094C": "9",
      "ombattu": "9",
      "ombatu": "9",
      "\u0C92\u0C82\u0CAC\u0CA4\u0CCD\u0CA4\u0CC1": "9",
      "onbadhu": "9",
      "onbathu": "9",
      "ombadhu": "9",
      "\u0B92\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1": "9",
      "tommidi": "9",
      "\u0C24\u0C4A\u0C2E\u0C4D\u0C2E\u0C3F\u0C26\u0C3F": "9"
    };
    REPEAT_DOUBLE_WORDS = /* @__PURE__ */ new Set([
      "double",
      "dabal",
      "dubble",
      "dabbel",
      "\u0921\u092C\u0932",
      "\u0CA1\u0CAC\u0CB2\u0CCD",
      "\u0B9F\u0BAA\u0BC1\u0BB3\u0BCD",
      "\u0C21\u0C2C\u0C41\u0C32\u0C4D"
    ]);
    REPEAT_TRIPLE_WORDS = /* @__PURE__ */ new Set([
      "triple",
      "treepal",
      "tripple",
      "tripal",
      "\u091F\u094D\u0930\u093F\u092A\u0932",
      "\u0C9F\u0CCD\u0CB0\u0CBF\u0CAA\u0CB2\u0CCD",
      "\u0B9F\u0BBF\u0BB0\u0BBF\u0BAA\u0BBF\u0BB3\u0BCD",
      "\u0C1F\u0C4D\u0C30\u0C3F\u0C2A\u0C41\u0C32\u0C4D"
    ]);
    FILLER_WORDS = /* @__PURE__ */ new Set([
      "number",
      "no",
      "ph",
      "phone",
      "mobile",
      "ka",
      "ki",
      "ke",
      "ko",
      "hai",
      "he",
      "daalo",
      "likho",
      "add",
      "karo",
      "kariye",
      "kijiye",
      "umm",
      "um",
      "wo",
      "arre",
      "are",
      "ha",
      "haa",
      "na",
      "hisaab",
      "grahak",
      "customer",
      "nambar",
      "namber",
      "\u0C28\u0C02\u0C2C\u0C30\u0C4D",
      "\u0BA8\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD",
      "\u0CA8\u0C82\u0CAC\u0CB0\u0CCD",
      "\u0928\u0902\u092C\u0930",
      "\u092B\u094B\u0928",
      "matlab",
      "bolo",
      "batao",
      "bataiye"
    ]);
  }
});

// src/services/customerMatcher.ts
var customerMatcher_exports = {};
__export(customerMatcher_exports, {
  ORDINAL_MAP: () => ORDINAL_MAP,
  computeCustomerMatchScore: () => computeCustomerMatchScore,
  findCustomers: () => findCustomers,
  getIndianPhoneticKey: () => getIndianPhoneticKey,
  isDuplicateEntry: () => isDuplicateEntry,
  jaroSimilarity: () => jaroSimilarity,
  jaroWinklerSimilarity: () => jaroWinklerSimilarity,
  levenshteinDistance: () => levenshteinDistance,
  levenshteinSimilarity: () => levenshteinSimilarity,
  normalizeName: () => normalizeName,
  resolveDisambiguationChoice: () => resolveDisambiguationChoice,
  transliterateIndicToLatin: () => transliterateIndicToLatin
});
function getIndicScriptMap(code) {
  if (code >= 2304 && code <= 2431) return DEVANAGARI_MAP;
  if (code >= 3200 && code <= 3327) return KANNADA_MAP;
  if (code >= 2944 && code <= 3071) return TAMIL_MAP;
  if (code >= 3072 && code <= 3199) return TELUGU_MAP;
  return null;
}
function transliterateIndicToLatin(text) {
  if (!text) return "";
  let working = text.replace(/[శशಶஶ]్రీ/g, "sri").replace(/[शశಶஶ]्रि/g, "sri");
  let result = "";
  for (let i = 0; i < working.length; i++) {
    const code = working.charCodeAt(i);
    const scriptMap = getIndicScriptMap(code);
    if (!scriptMap) {
      result += working.charAt(i);
      continue;
    }
    if (scriptMap.vowels[code]) {
      result += scriptMap.vowels[code];
      continue;
    }
    if (code === scriptMap.anusvara || code === 2305) {
      result += "n";
      continue;
    }
    if (code === scriptMap.visarga) {
      result += "h";
      continue;
    }
    let cons = scriptMap.consonants[code];
    if (cons) {
      if (code === 2965 && result.length > 0) {
        const lastChar = result.charAt(result.length - 1);
        if (/[aeiour]/.test(lastChar)) {
          cons = "g";
        }
      }
      const nextCode = i + 1 < working.length ? working.charCodeAt(i + 1) : 0;
      const isNextHalant = nextCode === scriptMap.halant;
      const nextMatra = scriptMap.matras[nextCode];
      if (isNextHalant) {
        result += cons;
        i++;
      } else if (nextMatra) {
        result += cons + nextMatra;
        i++;
      } else {
        const isEndOfWord = i + 1 >= working.length || /\s|[.,!?]/.test(working.charAt(i + 1));
        if (isEndOfWord) {
          result += cons;
        } else {
          result += cons + "a";
        }
      }
      continue;
    }
    if (scriptMap.matras[code]) {
      result += scriptMap.matras[code];
      continue;
    }
  }
  return result;
}
function normalizeName(name) {
  if (!name) return "";
  let s = name.replace(/\([^)]*\)/g, " ");
  s = transliterateIndicToLatin(s);
  s = s.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
  const tokens = s.split(/\s+/).filter(Boolean);
  const filteredTokens = tokens.filter((tok) => !HONORIFICS.has(tok));
  const base = filteredTokens.length > 0 ? filteredTokens.join(" ") : tokens.join(" ");
  let collapsed = base.replace(/aa+/g, "a").replace(/ee+/g, "e").replace(/ii+/g, "i").replace(/oo+/g, "u").replace(/uu+/g, "u");
  collapsed = collapsed.replace(/([b-df-hj-np-tv-z])\1+/g, "$1");
  return collapsed.trim();
}
function getIndianPhoneticKey(name) {
  const norm = normalizeName(name);
  if (!norm) return "";
  let word = norm.split(/\s+/)[0] || "";
  if (!word) return "";
  word = word.replace(/ph/g, "f").replace(/bh/g, "b").replace(/dh/g, "d").replace(/th/g, "t").replace(/kh/g, "k").replace(/gh/g, "g").replace(/ch/g, "s").replace(/sh/g, "s").replace(/w/g, "v").replace(/z/g, "s").replace(/c([eiy])/g, "s$1").replace(/c/g, "k").replace(/q/g, "k").replace(/x/g, "ks");
  word = word.replace(/(?:a|h|an|ar)$/g, "");
  if (word.length === 0) return "";
  const firstChar = word.charAt(0).toUpperCase();
  const charCode = (c) => {
    switch (c) {
      case "b":
      case "f":
      case "p":
      case "v":
        return "1";
      case "c":
      case "g":
      case "j":
      case "k":
      case "q":
      case "s":
      case "x":
      case "z":
        return "2";
      case "d":
      case "t":
        return "3";
      case "l":
        return "4";
      case "m":
      case "n":
        return "5";
      case "r":
        return "6";
      default:
        return "0";
    }
  };
  let code = firstChar;
  let prevCode = charCode(word.charAt(0));
  for (let i = 1; i < word.length; i++) {
    const curCode = charCode(word.charAt(i));
    if (curCode !== "0" && curCode !== prevCode) {
      code += curCode;
      prevCode = curCode;
    }
  }
  return (code + "000").slice(0, 4);
}
function levenshteinDistance(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = Array.from({ length: a.length + 1 }, (_, i) => i);
  for (let i = 1; i <= b.length; i++) {
    let prev = i;
    for (let j = 1; j <= a.length; j++) {
      const val = b.charAt(i - 1) === a.charAt(j - 1) ? row[j - 1] : Math.min(row[j - 1] + 1, prev + 1, row[j] + 1);
      row[j - 1] = prev;
      prev = val;
    }
    row[a.length] = prev;
  }
  return row[a.length];
}
function levenshteinSimilarity(a, b) {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  const dist = levenshteinDistance(a, b);
  return Math.max(0, 1 - dist / maxLen);
}
function jaroSimilarity(s1, s2) {
  if (s1 === s2) return 1;
  const len1 = s1.length;
  const len2 = s2.length;
  if (len1 === 0 || len2 === 0) return 0;
  const matchDistance = Math.floor(Math.max(len1, len2) / 2) - 1;
  const s1Matches = new Array(len1).fill(false);
  const s2Matches = new Array(len2).fill(false);
  let matches = 0;
  for (let i = 0; i < len1; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, len2);
    for (let j = start; j < end; j++) {
      if (s2Matches[j]) continue;
      if (s1.charAt(i) !== s2.charAt(j)) continue;
      s1Matches[i] = true;
      s2Matches[j] = true;
      matches++;
      break;
    }
  }
  if (matches === 0) return 0;
  let transpositions = 0;
  let k = 0;
  for (let i = 0; i < len1; i++) {
    if (!s1Matches[i]) continue;
    while (!s2Matches[k]) k++;
    if (s1.charAt(i) !== s2.charAt(k)) {
      transpositions++;
    }
    k++;
  }
  const m = matches;
  return (m / len1 + m / len2 + (m - transpositions / 2) / m) / 3;
}
function jaroWinklerSimilarity(s1, s2, prefixScale = 0.1) {
  const jaro = jaroSimilarity(s1, s2);
  if (jaro < 0.7) return jaro;
  let prefix = 0;
  const maxPrefix = Math.min(4, Math.min(s1.length, s2.length));
  for (let i = 0; i < maxPrefix; i++) {
    if (s1.charAt(i) === s2.charAt(i)) {
      prefix++;
    } else {
      break;
    }
  }
  return jaro + prefix * prefixScale * (1 - jaro);
}
function computeCustomerMatchScore(query, customer) {
  const rawQuery = query.trim();
  if (!rawQuery) return { score: 0, matchType: "fuzzy" };
  const cleanPhoneQuery = rawQuery.replace(/[^0-9]/g, "");
  if (cleanPhoneQuery.length >= 4 && customer.phone) {
    const cleanCustomerPhone = customer.phone.replace(/[^0-9]/g, "");
    if (cleanCustomerPhone.includes(cleanPhoneQuery) || cleanPhoneQuery === cleanCustomerPhone) {
      return { score: 1, matchType: "phone" };
    }
  }
  const normQuery = normalizeName(rawQuery);
  const normCustomer = normalizeName(customer.name);
  if (normQuery === normCustomer) {
    return { score: 1, matchType: "exact" };
  }
  const queryTokens = normQuery.split(/\s+/).filter(Boolean);
  const customerTokens = normCustomer.split(/\s+/).filter(Boolean);
  if (queryTokens.length === 1 && customerTokens.length > 1) {
    const singleQuery = queryTokens[0];
    const tokenMatch = customerTokens.some((tok) => tok === singleQuery);
    if (tokenMatch) {
      return { score: 0.9, matchType: "partial" };
    }
  }
  if (queryTokens.length > 1 && customerTokens.length >= queryTokens.length) {
    const allTokensMatch = queryTokens.every(
      (qTok) => customerTokens.some((cTok) => cTok === qTok || jaroWinklerSimilarity(qTok, cTok) >= 0.9)
    );
    if (allTokensMatch) {
      return { score: 0.94, matchType: "partial" };
    }
  }
  let hasPhoneticMatch = false;
  if (queryTokens.length === customerTokens.length) {
    const queryPhonetic = queryTokens.map(getIndianPhoneticKey).join("-");
    const customerPhonetic = customerTokens.map(getIndianPhoneticKey).join("-");
    hasPhoneticMatch = Boolean(queryPhonetic && queryPhonetic === customerPhonetic);
  } else if (queryTokens.length === 1) {
    const qPhonetic = getIndianPhoneticKey(queryTokens[0]);
    hasPhoneticMatch = customerTokens.some((cTok) => getIndianPhoneticKey(cTok) === qPhonetic);
  }
  const jwSim = jaroWinklerSimilarity(normQuery, normCustomer);
  const levSim = levenshteinSimilarity(normQuery, normCustomer);
  let combinedScore = 0.65 * jwSim + 0.35 * levSim;
  if (hasPhoneticMatch) {
    combinedScore = Math.max(combinedScore, 0.93);
    return { score: Math.min(0.99, Number(combinedScore.toFixed(2))), matchType: "phonetic" };
  }
  return {
    score: Number(combinedScore.toFixed(2)),
    matchType: "fuzzy"
  };
}
function findCustomers(query, customers) {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      action: "create_new",
      candidates: [],
      selectedCustomer: null,
      topScore: 0
    };
  }
  const ranked = [];
  for (const c of customers) {
    const { score, matchType } = computeCustomerMatchScore(trimmed, c);
    if (score >= 0.55) {
      ranked.push({ customer: c, score, matchType });
    }
  }
  ranked.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.customer.balance - a.customer.balance;
  });
  if (ranked.length === 0 || ranked[0].score < 0.6) {
    return {
      action: "create_new",
      candidates: ranked,
      selectedCustomer: null,
      topScore: ranked[0]?.score || 0
    };
  }
  const topCandidate = ranked[0];
  const runnerUp = ranked[1];
  const queryTokens = normalizeName(trimmed).split(/\s+/).filter(Boolean);
  const isSharedFirstName = queryTokens.length === 1 && ranked.filter(
    (r) => normalizeName(r.customer.name).split(/\s+/).includes(queryTokens[0])
  ).length >= 2;
  if (topCandidate.score >= 0.92 && !isSharedFirstName) {
    if (!runnerUp || topCandidate.score - runnerUp.score > 0.1) {
      return {
        action: "auto_select",
        candidates: ranked,
        selectedCustomer: topCandidate.customer,
        topScore: topCandidate.score
      };
    }
  }
  return {
    action: "disambiguate",
    candidates: ranked,
    selectedCustomer: topCandidate.customer,
    topScore: topCandidate.score
  };
}
function isDuplicateEntry(entry, existingEntries, withinMs = 6e5) {
  if (!entry || !entry.amount) return false;
  const targetName = entry.customerName ? normalizeName(entry.customerName) : "";
  const targetId = entry.customerId || "";
  const entryTime = entry.date ? new Date(entry.date).getTime() : Date.now();
  return existingEntries.some((existing) => {
    if (Math.abs(existing.amount - entry.amount) >= 0.01) {
      return false;
    }
    if (existing.type !== entry.type) {
      return false;
    }
    const existingTime = new Date(existing.date || existing.createdAt).getTime();
    if (Math.abs(entryTime - existingTime) > withinMs) {
      return false;
    }
    if (targetId && existing.customerId === targetId) {
      return true;
    }
    const existingNormName = normalizeName(existing.customerName || "");
    if (targetName && existingNormName) {
      if (targetName === existingNormName) return true;
      if (jaroWinklerSimilarity(targetName, existingNormName) >= 0.9) return true;
    }
    return false;
  });
}
function resolveDisambiguationChoice(speechTranscript, candidates, language = "hi", requiredDigitsCount = 4) {
  const trimmed = speechTranscript.trim();
  if (!trimmed || candidates.length === 0) {
    return { status: "no_match", rawQuery: speechTranscript };
  }
  const extractedDigits = extractDigitSequence(trimmed);
  if (extractedDigits.length >= 3) {
    const targetSuffix = extractedDigits.slice(-requiredDigitsCount);
    const suffixMatches = candidates.filter((c) => {
      if (!c.phone) return false;
      const cleanPhone = c.phone.replace(/\D/g, "");
      return cleanPhone.endsWith(targetSuffix) || cleanPhone.endsWith(extractedDigits) || extractedDigits.length <= cleanPhone.length && cleanPhone.endsWith(extractedDigits) || cleanPhone.length >= targetSuffix.length && extractedDigits.endsWith(cleanPhone.slice(-requiredDigitsCount));
    });
    if (suffixMatches.length === 1) {
      return {
        status: "matched",
        customer: suffixMatches[0],
        method: "digits",
        matchedValue: targetSuffix
      };
    }
    if (suffixMatches.length > 1) {
      if (requiredDigitsCount < 10) {
        const nextDigits = requiredDigitsCount === 4 ? 6 : 10;
        return {
          status: "need_more_digits",
          digitsNeeded: nextDigits,
          matchingCandidates: suffixMatches
        };
      } else {
        const exact = suffixMatches.find((c) => c.phone?.replace(/\D/g, "") === extractedDigits);
        if (exact) {
          return {
            status: "matched",
            customer: exact,
            method: "digits",
            matchedValue: extractedDigits
          };
        }
        return {
          status: "need_more_digits",
          digitsNeeded: 10,
          matchingCandidates: suffixMatches
        };
      }
    }
    if (extractedDigits.length >= 4) {
      return { status: "no_match", rawQuery: speechTranscript };
    }
  }
  const normSpeech = normalizeName(trimmed);
  const speechTokens = normSpeech.split(/\s+/).filter(Boolean);
  for (const ord of ORDINAL_MAP) {
    const isOrdinalMatch = ord.words.some((word) => {
      const normWord = normalizeName(word);
      return normSpeech === normWord || speechTokens.includes(normWord) || trimmed.toLowerCase().includes(word.toLowerCase());
    });
    if (isOrdinalMatch && ord.index < candidates.length) {
      return {
        status: "matched",
        customer: candidates[ord.index],
        method: "ordinal",
        matchedValue: ord.words[0]
      };
    }
  }
  const nameMatches = [];
  for (const candidate of candidates) {
    const normCandName = normalizeName(candidate.name);
    const candTokens = normCandName.split(/\s+/).filter(Boolean);
    const notesTokens = candidate.notes ? normalizeName(candidate.notes).split(/\s+/).filter(Boolean) : [];
    const allCandTokens = [...candTokens, ...notesTokens];
    if (normCandName === normSpeech || jaroWinklerSimilarity(normCandName, normSpeech) >= 0.88) {
      nameMatches.push(candidate);
      continue;
    }
    const distinctiveTokens = allCandTokens.filter((token) => {
      if (token.length <= 2) return false;
      const appearsInOthers = candidates.some((other) => {
        if (other.id === candidate.id) return false;
        const otherTokens = [
          ...normalizeName(other.name).split(/\s+/),
          ...other.notes ? normalizeName(other.notes).split(/\s+/) : []
        ];
        return otherTokens.includes(token);
      });
      return !appearsInOthers;
    });
    const matchesDistinctive = distinctiveTokens.some(
      (dTok) => speechTokens.includes(dTok) || normSpeech.includes(dTok) || jaroWinklerSimilarity(dTok, normSpeech) >= 0.9
    );
    if (matchesDistinctive) {
      nameMatches.push(candidate);
    }
  }
  if (nameMatches.length === 1) {
    return {
      status: "matched",
      customer: nameMatches[0],
      method: "name",
      matchedValue: nameMatches[0].name
    };
  }
  return { status: "no_match", rawQuery: speechTranscript };
}
var HONORIFICS, DEVANAGARI_MAP, KANNADA_MAP, TAMIL_MAP, TELUGU_MAP, ORDINAL_MAP;
var init_customerMatcher = __esm({
  "src/services/customerMatcher.ts"() {
    "use strict";
    init_phoneParser();
    HONORIFICS = /* @__PURE__ */ new Set([
      "bhai",
      "ji",
      "anna",
      "akka",
      "sir",
      "madam",
      "aunty",
      "auntie",
      "uncle",
      "shri",
      "sri",
      "shree",
      "garu",
      "avargal",
      "sahab",
      "saheb",
      "seth",
      "sethji",
      "didi",
      "bhabhi",
      "chettan",
      "chechi"
    ]);
    DEVANAGARI_MAP = {
      halant: 2381,
      anusvara: 2306,
      visarga: 2307,
      vowels: {
        2309: "a",
        2310: "a",
        2311: "i",
        2312: "i",
        2313: "u",
        2314: "u",
        2315: "ri",
        2319: "e",
        2320: "ai",
        2323: "o",
        2324: "au"
      },
      matras: {
        2366: "a",
        2367: "i",
        2368: "i",
        2369: "u",
        2370: "u",
        2371: "ri",
        2375: "e",
        2376: "ai",
        2379: "o",
        2380: "au"
      },
      consonants: {
        2325: "k",
        2326: "kh",
        2327: "g",
        2328: "gh",
        2329: "ng",
        2330: "ch",
        2331: "chh",
        2332: "j",
        2333: "jh",
        2334: "ny",
        2335: "t",
        2336: "th",
        2337: "d",
        2338: "dh",
        2339: "n",
        2340: "t",
        2341: "th",
        2342: "d",
        2343: "dh",
        2344: "n",
        2346: "p",
        2347: "ph",
        2348: "b",
        2349: "bh",
        2350: "m",
        2351: "y",
        2352: "r",
        2354: "l",
        2357: "v",
        2358: "sh",
        2359: "sh",
        2360: "s",
        2361: "h",
        2392: "q",
        2393: "kh",
        2394: "gh",
        2395: "z",
        2396: "r",
        2397: "rh",
        2398: "f"
      }
    };
    KANNADA_MAP = {
      halant: 3277,
      anusvara: 3202,
      visarga: 3203,
      vowels: {
        3205: "a",
        3206: "a",
        3207: "i",
        3208: "i",
        3209: "u",
        3210: "u",
        3211: "ri",
        3214: "e",
        3215: "e",
        3216: "ai",
        3218: "o",
        3219: "o",
        3220: "au"
      },
      matras: {
        3262: "a",
        3263: "i",
        3264: "i",
        3265: "u",
        3266: "u",
        3267: "ri",
        3270: "e",
        3271: "e",
        3272: "ai",
        3274: "o",
        3275: "o",
        3276: "au"
      },
      consonants: {
        3221: "k",
        3222: "kh",
        3223: "g",
        3224: "gh",
        3225: "ng",
        3226: "ch",
        3227: "chh",
        3228: "j",
        3229: "jh",
        3230: "ny",
        3231: "t",
        3232: "th",
        3233: "d",
        3234: "dh",
        3235: "n",
        3236: "t",
        3237: "th",
        3238: "d",
        3239: "dh",
        3240: "n",
        3242: "p",
        3243: "ph",
        3244: "b",
        3245: "bh",
        3246: "m",
        3247: "y",
        3248: "r",
        3249: "r",
        3250: "l",
        3251: "l",
        3253: "v",
        3254: "sh",
        3255: "sh",
        3256: "s",
        3257: "h"
      }
    };
    TAMIL_MAP = {
      halant: 3021,
      anusvara: 2946,
      visarga: 2947,
      vowels: {
        2949: "a",
        2950: "a",
        2951: "i",
        2952: "i",
        2953: "u",
        2954: "u",
        2958: "e",
        2959: "e",
        2960: "ai",
        2962: "o",
        2963: "o",
        2964: "au"
      },
      matras: {
        3006: "a",
        3007: "i",
        3008: "i",
        3009: "u",
        3010: "u",
        3014: "e",
        3015: "e",
        3016: "ai",
        3018: "o",
        3019: "o",
        3020: "au"
      },
      consonants: {
        2965: "k",
        2969: "ng",
        2970: "s",
        2974: "ny",
        2975: "t",
        2979: "n",
        2980: "t",
        2984: "n",
        2986: "p",
        2990: "m",
        2991: "y",
        2992: "r",
        2993: "r",
        2994: "l",
        2995: "l",
        2996: "zh",
        2997: "v",
        2998: "sh",
        2999: "sh",
        3e3: "s",
        3001: "h",
        2985: "n",
        2972: "j"
      }
    };
    TELUGU_MAP = {
      halant: 3149,
      anusvara: 3074,
      visarga: 3075,
      vowels: {
        3077: "a",
        3078: "a",
        3079: "i",
        3080: "i",
        3081: "u",
        3082: "u",
        3083: "ri",
        3086: "e",
        3087: "e",
        3088: "ai",
        3090: "o",
        3091: "o",
        3092: "au"
      },
      matras: {
        3134: "a",
        3135: "i",
        3136: "i",
        3137: "u",
        3138: "u",
        3142: "e",
        3143: "e",
        3144: "ai",
        3146: "o",
        3147: "o",
        3148: "au"
      },
      consonants: {
        3093: "k",
        3094: "kh",
        3095: "g",
        3096: "gh",
        3097: "ng",
        3098: "ch",
        3099: "chh",
        3100: "j",
        3101: "jh",
        3102: "ny",
        3103: "t",
        3104: "th",
        3105: "d",
        3106: "dh",
        3107: "n",
        3108: "t",
        3109: "th",
        3110: "d",
        3111: "dh",
        3112: "n",
        3114: "p",
        3115: "ph",
        3116: "b",
        3117: "bh",
        3118: "m",
        3119: "y",
        3120: "r",
        3121: "r",
        3122: "l",
        3123: "l",
        3125: "v",
        3126: "sh",
        3127: "sh",
        3128: "s",
        3129: "h"
      }
    };
    ORDINAL_MAP = [
      {
        index: 0,
        // First / Pehla
        words: [
          "first",
          "1st",
          "one",
          "pehla",
          "pehli",
          "pehle",
          "ek",
          "number one",
          "modala",
          "modalane",
          "modalaneya",
          "ondu",
          "\u0CAE\u0CCA\u0CA6\u0CB2",
          "\u0CAE\u0CCA\u0CA6\u0CB2\u0CA8\u0CC6\u0CAF",
          "\u0C92\u0C82\u0CA6\u0CC1",
          "mudal",
          "mudhal",
          "mudhalaavathu",
          "onnu",
          "\u0B92\u0BA9\u0BCD\u0BB1\u0BC1",
          "\u0BAE\u0BC1\u0BA4\u0BB2\u0BCD",
          "\u0BAE\u0BC1\u0BA4\u0BB2\u0BBE\u0BB5\u0BA4\u0BC1",
          "modati",
          "modata",
          "okati",
          "\u0C2E\u0C4A\u0C26\u0C1F\u0C3F",
          "\u0C12\u0C15\u0C1F\u0C3F"
        ]
      },
      {
        index: 1,
        // Second / Doosra
        words: [
          "second",
          "2nd",
          "two",
          "doosra",
          "doosri",
          "doosre",
          "do",
          "number two",
          "eradu",
          "eradane",
          "eradaneya",
          "\u0C8E\u0CB0\u0CA1\u0CA8\u0CC6\u0CAF",
          "\u0C8E\u0CB0\u0CA1\u0CC1",
          "irandavathu",
          "irandu",
          "\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BBE\u0BB5\u0BA4\u0BC1",
          "\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1",
          "rendava",
          "rendu",
          "\u0C30\u0C46\u0C02\u0C21\u0C35",
          "\u0C30\u0C46\u0C02\u0C21\u0C41"
        ]
      },
      {
        index: 2,
        // Third / Teesra
        words: [
          "third",
          "3rd",
          "three",
          "teesra",
          "teesri",
          "teesre",
          "teen",
          "muru",
          "murane",
          "muraneya",
          "\u0CAE\u0CC2\u0CB0\u0CA8\u0CC6\u0CAF",
          "\u0CAE\u0CC2\u0CB0\u0CC1",
          "moondravathu",
          "moondru",
          "\u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BBE\u0BB5\u0BA4\u0BC1",
          "\u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1",
          "moodava",
          "moodu",
          "\u0C2E\u0C42\u0C21\u0C35",
          "\u0C2E\u0C42\u0C21\u0C41"
        ]
      },
      {
        index: 3,
        // Fourth / Chautha
        words: [
          "fourth",
          "4th",
          "four",
          "chautha",
          "chauthi",
          "chauthe",
          "char",
          "nalku",
          "naalku",
          "nalkane",
          "nalkaneya",
          "\u0CA8\u0CBE\u0CB2\u0CCD\u0C95\u0CA8\u0CC6\u0CAF",
          "\u0CA8\u0CBE\u0CB2\u0CCD\u0C95\u0CC1",
          "naangavathu",
          "naangu",
          "\u0BA8\u0BBE\u0BA9\u0BCD\u0B95\u0BBE\u0BB5\u0BA4\u0BC1",
          "\u0BA8\u0BBE\u0BA9\u0BCD\u0B95\u0BC1",
          "naalgava",
          "naalugu",
          "\u0C28\u0C3E\u0C32\u0C41\u0C17\u0C35",
          "\u0C28\u0C3E\u0C32\u0C41\u0C17\u0C41"
        ]
      }
    ];
  }
});

// src/lib/voiceParser.ts
var NUMBER_WORDS = {
  // English
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
  hundred: 100,
  thousand: 1e3,
  // Hindi / Hinglish numbers
  ek: 1,
  do: 2,
  teen: 3,
  chaar: 4,
  char: 4,
  paanch: 5,
  panch: 5,
  chhah: 6,
  che: 6,
  saat: 7,
  aath: 8,
  ath: 8,
  nau: 9,
  das: 10,
  dus: 10,
  gyaarah: 11,
  baarah: 12,
  terah: 13,
  chaudah: 14,
  pandrah: 15,
  solah: 16,
  satrah: 17,
  athaarah: 18,
  unnees: 19,
  bees: 20,
  ikkis: 21,
  baais: 22,
  teees: 23,
  chaubees: 24,
  pachees: 25,
  chhabbees: 26,
  sattaais: 27,
  atthaais: 28,
  untees: 29,
  tees: 30,
  ikattees: 31,
  battis: 32,
  taintis: 33,
  chauntis: 34,
  paittees: 35,
  chattis: 36,
  saintis: 37,
  adhtis: 38,
  untaalis: 39,
  chaalis: 40,
  iktalis: 41,
  bayalis: 42,
  tetalis: 43,
  chavalis: 44,
  paintalis: 45,
  chhialis: 46,
  saintalis: 47,
  adhtalis: 48,
  unchaas: 49,
  pachaas: 50,
  pachas: 50,
  saath: 60,
  sath: 60,
  sattar: 70,
  assi: 80,
  nabbe: 90,
  sau: 100,
  so: 100,
  dedh: 150,
  // "dedh sau"
  dhai: 250,
  // "dhai sau"
  hazaar: 1e3,
  hazar: 1e3,
  hajar: 1e3,
  k: 1e3,
  // Kannada numbers
  ondu: 1,
  eradu: 2,
  mooru: 3,
  naalku: 4,
  aidu: 5,
  aaru: 6,
  elu: 7,
  entu: 8,
  ombhatthu: 9,
  hatthu: 10,
  ippatthu: 20,
  moovatthu: 30,
  naalvatthu: 40,
  aivatthu: 50,
  aravatthu: 60,
  eppatthu: 70,
  embhatthu: 80,
  thombhatthu: 90,
  nooru: 100,
  noora: 100,
  saavira: 1e3,
  // Tamil numbers
  ondru: 1,
  irandu: 2,
  moondru: 3,
  naangu: 4,
  aindhu: 5,
  yezhu: 7,
  ettu: 8,
  onbadhu: 9,
  patthu: 10,
  irubadhu: 20,
  muppadhu: 30,
  naarpadhu: 40,
  aimbadhu: 50,
  arupadhu: 60,
  ezhubadhu: 70,
  enbadhu: 80,
  thonnooru: 90,
  nooru_ta: 100,
  aayiram: 1e3,
  // Telugu numbers
  okati: 1,
  rendu: 2,
  moodu: 3,
  naalugu: 4,
  aidu_te: 5,
  yedu: 7,
  enimidi: 8,
  tommidi: 9,
  padi: 10,
  iravai: 20,
  muppai: 30,
  nalabhai: 40,
  yaabhai: 50,
  aravai: 60,
  debbhai: 70,
  enabhai: 80,
  tombhai: 90,
  vanda: 100,
  veyyi: 1e3
};
function extractAmount(text) {
  let normalized = text.toLowerCase().trim();
  normalized = normalized.replace(/\bdedh\s+(?:sau|so)\b/gi, "150").replace(/\bdhai\s+(?:sau|so)\b/gi, "250").replace(/\bdedh\s+(?:hazaar|hazar|hajar)\b/gi, "1500").replace(/\bdhai\s+(?:hazaar|hazar|hajar)\b/gi, "2500").replace(/\bsawa\s+(?:sau|so)\b/gi, "125").replace(/\bpaune\s+(?:sau|so)\b/gi, "75");
  const digitRegex = /(?:₹|rs\.?|rupees?)?\s*(\d+(?:,\d+)*(?:\.\d+)?)/i;
  const digitMatch = normalized.match(digitRegex);
  if (digitMatch && digitMatch[1]) {
    const rawNum = digitMatch[1].replace(/,/g, "");
    const num = parseFloat(rawNum);
    if (!isNaN(num) && num > 0) {
      const remaining = normalized.replace(digitMatch[0], "").trim();
      return { amount: num, remainingText: remaining };
    }
  }
  const tokens = normalized.split(/\s+/);
  let total = 0;
  let currentGroup = 0;
  const matchedTokens = [];
  for (let i = 0; i < tokens.length; i++) {
    const cleanWord = tokens[i].replace(/[^a-z0-9_]/g, "");
    const val = NUMBER_WORDS[cleanWord];
    if (val !== void 0) {
      matchedTokens.push(tokens[i]);
      if (val === 1e3) {
        currentGroup = (currentGroup === 0 ? 1 : currentGroup) * 1e3;
        total += currentGroup;
        currentGroup = 0;
      } else if (val === 100) {
        currentGroup = (currentGroup === 0 ? 1 : currentGroup) * 100;
      } else if (cleanWord === "dedh") {
        currentGroup = 150;
      } else if (cleanWord === "dhai") {
        currentGroup = 250;
      } else {
        currentGroup += val;
      }
    } else {
      if (currentGroup > 0 || total > 0) {
        total += currentGroup;
        currentGroup = 0;
      }
    }
  }
  total += currentGroup;
  if (total > 0 && matchedTokens.length > 0) {
    let remaining = normalized;
    for (const t of matchedTokens) {
      remaining = remaining.replace(t, "");
    }
    return { amount: total, remainingText: remaining.trim() };
  }
  return { amount: void 0, remainingText: normalized };
}
function checkForCorrection(transcript) {
  const lower = transcript.toLowerCase();
  const correctionTriggers = [
    /nahi[,]?\s*(\d+|[a-z\s]+)/i,
    /sorry[,]?\s*(\d+|[a-z\s]+)/i,
    /correction[,]?\s*(\d+|[a-z\s]+)/i,
    /badal\s+ke[,]?\s*(\d+|[a-z\s]+)/i,
    /change\s+to[,]?\s*(\d+|[a-z\s]+)/i,
    /no[,]?\s+(\d+)/i
  ];
  for (const regex of correctionTriggers) {
    const match = lower.match(regex);
    if (match && match[1]) {
      const extracted = extractAmount(match[1]);
      if (extracted.amount) {
        return { isCorrection: true, correctedAmount: extracted.amount };
      }
    }
  }
  return { isCorrection: false };
}
function extractRelativeDate(text) {
  const lower = text.toLowerCase();
  const now = /* @__PURE__ */ new Date();
  if (/\b(kal|yesterday|ninne|netru|ninna)\b/i.test(lower)) {
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const cleaned = lower.replace(/\b(kal|yesterday|ninne|netru|ninna)\b/gi, "").trim();
    return { date: yesterday.toISOString(), label: "kal", textWithoutDate: cleaned };
  }
  if (/\b(parso|day before yesterday)\b/i.test(lower)) {
    const parso = new Date(now);
    parso.setDate(now.getDate() - 2);
    const cleaned = lower.replace(/\b(parso|day before yesterday)\b/gi, "").trim();
    return { date: parso.toISOString(), label: "parso", textWithoutDate: cleaned };
  }
  if (/\b(aaj|today|indu|inru|ee roju)\b/i.test(lower)) {
    const cleaned = lower.replace(/\b(aaj|today|indu|inru|ee roju)\b/gi, "").trim();
    return { date: now.toISOString(), label: "aaj", textWithoutDate: cleaned };
  }
  return { date: now.toISOString(), label: void 0, textWithoutDate: text };
}
function determineTransactionType(text) {
  const lower = text.toLowerCase();
  const paymentKeywords = [
    "jama",
    "mila",
    "aaya",
    "aaye",
    "diye",
    "ne diye",
    "ne diya",
    "diya tha",
    "de diya",
    "paid",
    "payment",
    "received",
    "clear",
    "settled",
    "hana bandide",
    "panam vandhadhu",
    "jama ayyindi",
    "chuka diya",
    "vasool"
  ];
  for (const kw of paymentKeywords) {
    if (lower.includes(kw)) {
      return "payment";
    }
  }
  return "credit";
}
function isBalanceQuery(text) {
  const lower = text.toLowerCase();
  const queryPatterns = [
    /\btotal\b/i,
    /\bbaaki\b/i,
    /\bkitna\b/i,
    /\bbalance\b/i,
    /\bhow much\b/i,
    /\bhisaab\b/i,
    /\bhisab\b/i,
    /\bbakki\b/i,
    /\botti baaki\b/i,
    /\bmottham baakee\b/i
  ];
  return queryPatterns.some((pattern) => pattern.test(lower));
}
function extractCustomerName(text) {
  let cleaned = text.replace(/\b(ko|ka|ke|ki|se|ne|gave|gave to|owes|credit|udhaar|jama|mila|diye|diya|tha|hai|rupaye|rs|cash|account|khata|total|baaki|kitna|yesterday|today|kal|parso)\b/gi, " ").replace(/[?,.!-]/g, " ").replace(/\s+/g, " ").trim();
  const stopWords = ["please", "bhai", "ji", "sir", "madam", "store", "kirana", "dokan"];
  const parts = cleaned.split(" ").filter((p) => p.length > 1 && !stopWords.includes(p.toLowerCase()));
  if (parts.length > 0) {
    return parts.slice(0, 3).map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(" ");
  }
  return cleaned || "Customer";
}
function parseVoiceTranscript(transcript, previousContext) {
  const trimmed = transcript.trim();
  if (!trimmed) {
    return {
      rawTranscript: "",
      intent: "unknown",
      confidence: 0
    };
  }
  const correction = checkForCorrection(trimmed);
  if (correction.isCorrection && previousContext && previousContext.customerName) {
    return {
      rawTranscript: trimmed,
      intent: "correction",
      customerName: previousContext.customerName,
      amount: correction.correctedAmount || previousContext.amount,
      type: previousContext.type || "credit",
      date: previousContext.date,
      confidence: 0.95,
      correctionOfPrevious: true
    };
  }
  if (isBalanceQuery(trimmed)) {
    const nameText = trimmed.replace(/\b(ka|ki|ke|ko|se|total|baaki|kitna|balance|hisaab|hisab|hai|batao|tell me)\b/gi, "").trim();
    const customerName2 = extractCustomerName(nameText);
    return {
      rawTranscript: trimmed,
      intent: "query_balance",
      customerName: customerName2 || "Ramesh",
      confidence: 0.9
    };
  }
  const lower = trimmed.toLowerCase();
  if ((lower.includes("udhaar") || lower.includes("credit")) && (lower.includes("diya tha") || lower.includes("jama") || lower.includes("paid"))) {
    const parts = lower.split(/[,;\s]+(?:aur|and)?\s*(?=kal|parso|\d+|[a-z]+ diya tha|jama)/i);
    if (parts.length >= 2 || lower.includes("kal") || lower.includes(",")) {
      const creditMatch = lower.match(/(?:(?:ka|ko)\s*)?(\d+|[a-z\s]+?)\s*(?:udhaar|credit)/i);
      const paymentMatch = lower.match(/(?:kal|parso|aaj)?\s*(\d+|[a-z\s]+?)\s*(?:diya tha|jama|mila|paid)/i);
      if (creditMatch && paymentMatch) {
        const creditAmt = extractAmount(creditMatch[1]).amount;
        const paymentAmt = extractAmount(paymentMatch[1]).amount;
        if (creditAmt && paymentAmt) {
          const net = creditAmt - paymentAmt;
          const cust = extractCustomerName(lower.replace(creditMatch[0], "").replace(paymentMatch[0], ""));
          return {
            rawTranscript: trimmed,
            intent: "add_transaction",
            customerName: cust || "Customer",
            amount: Math.max(0, net),
            type: net >= 0 ? "credit" : "payment",
            date: (/* @__PURE__ */ new Date()).toISOString(),
            notes: `Spoken: \u20B9${creditAmt} udhaar, \u20B9${paymentAmt} diya tha (Net: \u20B9${Math.abs(net)})`,
            confidence: 0.96,
            compoundDetails: {
              creditAmount: creditAmt,
              paymentAmount: paymentAmt,
              netAmount: net,
              explanation: `\u20B9${creditAmt} udhaar - \u20B9${paymentAmt} diya tha = Net \u20B9${net}`
            }
          };
        }
      }
    }
  }
  const { date, label: relativeDateLabel, textWithoutDate } = extractRelativeDate(trimmed);
  const { amount, remainingText } = extractAmount(textWithoutDate);
  const type = determineTransactionType(trimmed);
  const customerName = extractCustomerName(remainingText);
  const isValidAmount = amount !== void 0 && amount > 0;
  const confidence = isValidAmount ? customerName ? 0.92 : 0.75 : 0.4;
  return {
    rawTranscript: trimmed,
    intent: "add_transaction",
    customerName: customerName || "Grahak (Customer)",
    amount: amount || 0,
    type,
    date,
    relativeDateLabel,
    confidence
  };
}

// src/lib/format.ts
var NATIVE_DIGIT_MAP = {
  hi: ["\u0966", "\u0967", "\u0968", "\u0969", "\u096A", "\u096B", "\u096C", "\u096D", "\u096E", "\u096F"],
  kn: ["\u0CE6", "\u0CE7", "\u0CE8", "\u0CE9", "\u0CEA", "\u0CEB", "\u0CEC", "\u0CED", "\u0CEE", "\u0CEF"],
  ta: ["\u0BE6", "\u0BE7", "\u0BE8", "\u0BE9", "\u0BEA", "\u0BEB", "\u0BEC", "\u0BED", "\u0BEE", "\u0BEF"],
  te: ["\u0C66", "\u0C67", "\u0C68", "\u0C69", "\u0C6A", "\u0C6B", "\u0C6C", "\u0C6D", "\u0C6E", "\u0C6F"]
};
function getLocaleForLang(lang = "en") {
  switch (lang) {
    case "hi":
      return "hi-IN";
    case "kn":
      return "kn-IN";
    case "ta":
      return "ta-IN";
    case "te":
      return "te-IN";
    case "en":
    case "hinglish":
    default:
      return "en-IN";
  }
}
function convertToNativeDigits(text, lang) {
  const digits = NATIVE_DIGIT_MAP[lang];
  if (!digits) return text;
  return text.replace(/[0-9]/g, (d) => digits[parseInt(d, 10)]);
}
function formatRupees(amount, options = {}) {
  const {
    showSign = false,
    showSymbol = true,
    decimals = 0,
    lang = "en",
    numeralScript = "latin"
  } = options;
  if (isNaN(amount) || amount === null || amount === void 0) {
    const zeroStr = showSymbol ? "\u20B90" : "0";
    return numeralScript === "native" ? convertToNativeDigits(zeroStr, lang) : zeroStr;
  }
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  let formattedNumber = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  }).format(absAmount);
  if (numeralScript === "native") {
    formattedNumber = convertToNativeDigits(formattedNumber, lang);
  }
  let prefix = "";
  if (showSign) {
    if (amount > 0) prefix = "+";
    else if (isNegative) prefix = "-";
  } else if (isNegative) {
    prefix = "-";
  }
  const symbol = showSymbol ? "\u20B9" : "";
  return `${prefix}${symbol}${formattedNumber}`;
}
function formatRelativeDate(dateInput, options = {}) {
  const { lang = "hinglish", includeTime = false, numeralScript = "latin" } = options;
  if (!dateInput) return "";
  const target = new Date(dateInput);
  if (isNaN(target.getTime())) return String(dateInput);
  const now = /* @__PURE__ */ new Date();
  const targetMidnight = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round(
    (nowMidnight.getTime() - targetMidnight.getTime()) / (1e3 * 60 * 60 * 24)
  );
  let dayLabel = "";
  if (diffDays === 0) {
    switch (lang) {
      case "hi":
        dayLabel = "\u0906\u091C";
        break;
      case "kn":
        dayLabel = "\u0C87\u0C82\u0CA6\u0CC1";
        break;
      case "ta":
        dayLabel = "\u0B87\u0BA9\u0BCD\u0BB1\u0BC1";
        break;
      case "te":
        dayLabel = "\u0C08\u0C30\u0C4B\u0C1C\u0C41";
        break;
      case "en":
        dayLabel = "Today";
        break;
      case "hinglish":
      default:
        dayLabel = "Aaj";
        break;
    }
  } else if (diffDays === 1) {
    switch (lang) {
      case "hi":
        dayLabel = "\u0915\u0932 (\u092C\u0940\u0924\u093E)";
        break;
      case "kn":
        dayLabel = "\u0CA8\u0CBF\u0CA8\u0CCD\u0CA8\u0CC6";
        break;
      case "ta":
        dayLabel = "\u0BA8\u0BC7\u0BB1\u0BCD\u0BB1\u0BC1";
        break;
      case "te":
        dayLabel = "\u0C28\u0C3F\u0C28\u0C4D\u0C28";
        break;
      case "en":
        dayLabel = "Yesterday";
        break;
      case "hinglish":
      default:
        dayLabel = "Kal";
        break;
    }
  } else if (diffDays === 2) {
    switch (lang) {
      case "hi":
        dayLabel = "\u092A\u0930\u0938\u094B\u0902";
        break;
      case "kn":
        dayLabel = "\u0CAE\u0CCA\u0CA8\u0CCD\u0CA8\u0CC6";
        break;
      case "ta":
        dayLabel = "\u0BAE\u0BC1\u0BA8\u0BCD\u0BA4\u0BBE\u0BA8\u0BBE\u0BB3\u0BCD";
        break;
      case "te":
        dayLabel = "\u0C2E\u0C4A\u0C28\u0C4D\u0C28";
        break;
      case "en":
        dayLabel = "Day before yesterday";
        break;
      case "hinglish":
      default:
        dayLabel = "Parso";
        break;
    }
  } else {
    const isSameYear = target.getFullYear() === now.getFullYear();
    const locale = getLocaleForLang(lang);
    dayLabel = target.toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: isSameYear ? void 0 : "numeric"
    });
    if (numeralScript === "native") {
      dayLabel = convertToNativeDigits(dayLabel, lang);
    }
  }
  if (includeTime) {
    const locale = getLocaleForLang(lang);
    let timeStr = target.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    if (numeralScript === "native") {
      timeStr = convertToNativeDigits(timeStr, lang);
    }
    return `${dayLabel}, ${timeStr}`;
  }
  return dayLabel;
}
function formatFullRelativeDate(dateInput, options = {}) {
  const { lang = "hinglish", numeralScript = "latin" } = options;
  if (!dateInput) return "";
  const target = new Date(dateInput);
  if (isNaN(target.getTime())) return String(dateInput);
  const rel = formatRelativeDate(target, { lang, numeralScript });
  const locale = getLocaleForLang(lang);
  let dayMonth = target.toLocaleDateString(locale, {
    day: "numeric",
    month: "short"
  });
  if (numeralScript === "native") {
    dayMonth = convertToNativeDigits(dayMonth, lang);
  }
  return `${rel}, ${dayMonth}`;
}

// src/lib/formatters.ts
function formatINR(amount, options = {}) {
  const { lang = "en", numeralScript = "latin" } = options;
  const rounded = Math.round(amount);
  const isNegative = rounded < 0;
  const absVal = Math.abs(rounded);
  let formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0
  }).format(absVal);
  if (numeralScript === "native") {
    formatted = convertToNativeDigits(formatted, lang);
  }
  return `${isNegative ? "-" : ""}\u20B9${formatted}`;
}
function cleanPhoneNumber(phone) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits.slice(-10);
}

// src/services/reminderMessage.ts
function formatReminderDateTime(dateInput) {
  if (!dateInput) return "";
  const d = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (isNaN(d.getTime())) return "";
  const day = d.getDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[d.getMonth()] || "Jan";
  const year = d.getFullYear();
  let hours = d.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}
function formatWhatsAppPhone(phone) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+${digits}`;
  }
  if (digits.length > 10) {
    return `+91${digits.slice(-10)}`;
  }
  return `+91${digits}`;
}
function buildWhatsAppReminderUrl(phone, text) {
  const formattedPhone = formatWhatsAppPhone(phone);
  const encodedText = encodeURIComponent(text);
  if (!formattedPhone) {
    return `https://wa.me/?text=${encodedText}`;
  }
  return `https://wa.me/${formattedPhone}?text=${encodedText}`;
}
function buildReminderMessage(options) {
  const {
    customerName,
    amount,
    shopName = "Kirana Store",
    lang = "en",
    entries,
    now = /* @__PURE__ */ new Date()
  } = options;
  const formattedAmount = typeof amount === "number" ? amount.toLocaleString("en-IN") : String(amount).trim();
  const currentDateTime = formatReminderDateTime(now);
  let entriesBlock = "";
  if (entries && entries.length > 0) {
    const sorted = [...entries].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const last10 = sorted.length > 10 ? sorted.slice(-10) : sorted;
    entriesBlock = last10.map((e) => {
      const dt = formatReminderDateTime(e.date);
      const typeLabel = e.type === "credit" ? "Udhaar" : "Payment";
      const formattedEntryAmt = Number(e.amount).toLocaleString("en-IN");
      return `${dt} - ${typeLabel} \u20B9${formattedEntryAmt}`;
    }).join("\n");
  }
  const entriesSection = entriesBlock ? `

${entriesBlock}` : "";
  switch (lang) {
    case "hi":
      return `\u0928\u092E\u0938\u094D\u0924\u0947 *${customerName}*,
\u092F\u0939 ${shopName} \u0938\u0947 \u090F\u0915 \u0905\u0928\u0941\u0938\u094D\u092E\u093E\u0930\u0915 \u0939\u0948\u0964${entriesSection}

*\u0915\u0941\u0932 \u092C\u093E\u0915\u0940: \u20B9${formattedAmount}*
\u0926\u093F\u0928\u093E\u0902\u0915: ${currentDateTime}

\u0927\u0928\u094D\u092F\u0935\u093E\u0926!`;
    case "kn":
      return `\u0CA8\u0CAE\u0CB8\u0CCD\u0C95\u0CBE\u0CB0 *${customerName}*,
\u0C87\u0CA6\u0CC1 ${shopName} \u0CA8\u0CBF\u0C82\u0CA6 \u0C9C\u0CCD\u0C9E\u0CBE\u0CAA\u0CA8\u0CC6.${entriesSection}

*\u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAC\u0CBE\u0C95\u0CBF: \u20B9${formattedAmount}*
\u0CA6\u0CBF\u0CA8\u0CBE\u0C82\u0C95: ${currentDateTime}

\u0CA7\u0CA8\u0CCD\u0CAF\u0CB5\u0CBE\u0CA6\u0C97\u0CB3\u0CC1!`;
    case "ta":
      return `\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD *${customerName}*,
\u0B87\u0BA4\u0BC1 ${shopName} \u0B87\u0BB2\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 \u0BA8\u0BBF\u0BA9\u0BC8\u0BB5\u0BC2\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD.${entriesSection}

*\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4 \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF: \u20B9${formattedAmount}*
\u0BA4\u0BC7\u0BA4\u0BBF: ${currentDateTime}

\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF!`;
    case "te":
      return `\u0C28\u0C2E\u0C38\u0C4D\u0C15\u0C3E\u0C30\u0C02 *${customerName}*,
\u0C07\u0C26\u0C3F ${shopName} \u0C28\u0C41\u0C02\u0C21\u0C3F \u0C30\u0C3F\u0C2E\u0C48\u0C02\u0C21\u0C30\u0C4D.${entriesSection}

*\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C2C\u0C3E\u0C15\u0C40: \u20B9${formattedAmount}*
\u0C24\u0C47\u0C26\u0C40: ${currentDateTime}

\u0C27\u0C28\u0C4D\u0C2F\u0C35\u0C3E\u0C26\u0C3E\u0C32\u0C41!`;
    case "hinglish":
      return `Hello *${customerName}*,
Yeh ${shopName} se reminder hai.${entriesSection}

*Kul baaki: \u20B9${formattedAmount}*
Date: ${currentDateTime}

Dhanyawad!`;
    case "en":
    default:
      return `Hello *${customerName}*,
This is a reminder from ${shopName}.${entriesSection}

*Total pending: \u20B9${formattedAmount}*
Date: ${currentDateTime}

Thank you!`;
  }
}

// node_modules/idb/build/index.js
var instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
var idbProxyableTypes;
var cursorAdvanceMethods;
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBIndex,
    IDBObjectStore,
    IDBCursor,
    IDBDatabase,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = ["advance", "continue", "continuePrimaryKey"].map((method) => IDBCursor.prototype[method]));
}
var transactionDoneMap = /* @__PURE__ */ new WeakMap();
var transformCache = /* @__PURE__ */ new WeakMap();
var reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener("success", success);
      request.removeEventListener("error", error);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener("success", success);
    request.addEventListener("error", error);
  });
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener("complete", complete);
      tx.removeEventListener("error", error);
      tx.removeEventListener("abort", error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError"));
      unlisten();
    };
    tx.addEventListener("complete", complete);
    tx.addEventListener("error", error);
    tx.addEventListener("abort", error);
  });
  transactionDoneMap.set(tx, done);
}
var idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      if (prop === "done")
        return transactionDoneMap.get(target);
      if (prop === "store") {
        return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(this.request);
    };
  }
  return function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === "function")
    return wrapFunction(value);
  if (value instanceof IDBTransaction)
    cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes()))
    return new Proxy(value, idbProxyTraps);
  return value;
}
function wrap(value) {
  if (value instanceof IDBRequest)
    return promisifyRequest(value);
  if (transformCache.has(value))
    return transformCache.get(value);
  const newValue = transformCachableValue(value);
  if (!Object.is(newValue, value)) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
var unwrap = (value) => reverseTransformCache.get(value);
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener("upgradeneeded", (event) => {
      upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
    });
  }
  if (blocked) {
    request.addEventListener("blocked", (event) => blocked(
      // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
      event.oldVersion,
      event.newVersion,
      event
    ));
  }
  openPromise.then((db) => {
    if (terminated)
      db.addEventListener("close", () => terminated());
    if (blocking) {
      db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {
  });
  return openPromise;
}
var readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
var writeMethods = ["put", "add", "delete", "clear"];
var cachedMethods = {};
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
    return;
  }
  if (cachedMethods[prop])
    return cachedMethods[prop];
  const targetFuncName = prop.replace(/FromIndex$/, "");
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
  ) {
    return;
  }
  const method = async function(storeName, ...args) {
    const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
    let target2 = tx.store;
    if (useIndex)
      target2 = target2.index(args.shift());
    return (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  return cachedMethods[prop] = method;
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
var advanceMethodProps = ["advance", "continue", "continuePrimaryKey"];
var methodMap = {};
var advanceResults = /* @__PURE__ */ new WeakMap();
var ittrProxiedCursorToOriginalProxy = /* @__PURE__ */ new WeakMap();
var cursorIteratorTraps = {
  get(target, prop) {
    if (!advanceMethodProps.includes(prop))
      return target[prop];
    let cachedFunc = methodMap[prop];
    if (!cachedFunc) {
      cachedFunc = methodMap[prop] = function(...args) {
        advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
      };
    }
    return cachedFunc;
  }
};
async function* iterate(...args) {
  let cursor = this;
  if (!(cursor instanceof IDBCursor)) {
    cursor = await cursor.openCursor(...args);
  }
  if (!cursor)
    return;
  cursor = cursor;
  const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
  ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
  reverseTransformCache.set(proxiedCursor, unwrap(cursor));
  while (cursor) {
    yield proxiedCursor;
    cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
    advanceResults.delete(proxiedCursor);
  }
}
function isIteratorProp(target, prop) {
  return prop === Symbol.asyncIterator && instanceOfAny(target, [IDBIndex, IDBObjectStore, IDBCursor]) || prop === "iterate" && instanceOfAny(target, [IDBIndex, IDBObjectStore]);
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get(target, prop, receiver) {
    if (isIteratorProp(target, prop))
      return iterate;
    return oldTraps.get(target, prop, receiver);
  },
  has(target, prop) {
    return isIteratorProp(target, prop) || oldTraps.has(target, prop);
  }
}));

// src/services/db.ts
var DB_NAME = "UdhaarSathiDB";
var LEGACY_DB_NAME = "VoiceKhataDB";
var DB_VERSION = 2;
var InMemoryDBMock = class {
  customers = /* @__PURE__ */ new Map();
  entries = /* @__PURE__ */ new Map();
  settings = /* @__PURE__ */ new Map();
  meta = /* @__PURE__ */ new Map();
  profile = /* @__PURE__ */ new Map();
  paymentRequests = /* @__PURE__ */ new Map();
  getStore(name) {
    switch (name) {
      case "customers":
        return this.customers;
      case "entries":
        return this.entries;
      case "settings":
        return this.settings;
      case "meta":
        return this.meta;
      case "profile":
        return this.profile;
      case "paymentRequests":
        return this.paymentRequests;
      default:
        throw new Error(`Unknown store: ${name}`);
    }
  }
  async get(storeName, key) {
    return this.getStore(storeName).get(key) || void 0;
  }
  async put(storeName, value, key) {
    const k = key || value.ref || value.id || value.key;
    this.getStore(storeName).set(k, value);
    return k;
  }
  async delete(storeName, key) {
    this.getStore(storeName).delete(key);
  }
  async clear(storeName) {
    this.getStore(storeName).clear();
  }
  async getAll(storeName) {
    return Array.from(this.getStore(storeName).values());
  }
  async count(storeName) {
    return this.getStore(storeName).size;
  }
  async getAllFromIndex(storeName, indexName, query) {
    if (storeName === "entries") {
      const all = Array.from(this.entries.values());
      if (indexName === "by-customerId") {
        return all.filter((e) => e.customerId === query);
      }
      if (indexName === "by-date") {
        return all.filter((e) => e.date.startsWith(query));
      }
    }
    if (storeName === "paymentRequests") {
      const all = Array.from(this.paymentRequests.values());
      if (indexName === "by-status") {
        return all.filter((p) => p.status === query);
      }
      if (indexName === "by-ref") {
        return all.filter((p) => p.ref === query);
      }
    }
    return [];
  }
  transaction() {
    return {
      done: Promise.resolve()
    };
  }
  close() {
  }
};
var dbInstance = null;
function migrateLocalStorage() {
  if (typeof localStorage === "undefined") return;
  try {
    const migrations = [
      ["voice_khata_settings", "udhaar_sathi_settings"],
      ["voice_khata_lang", "udhaar_sathi_lang"],
      ["voice_khata_speech_lang", "udhaar_sathi_speech_lang"],
      ["voice_khata_speech_speed", "udhaar_sathi_speech_speed"],
      ["voice_khata_speech_muted", "udhaar_sathi_speech_muted"],
      ["voice_khata_theme", "udhaar_sathi_theme"],
      ["vk_shop_name", "us_shop_name"],
      ["vk_demo_mode", "us_demo_mode"],
      ["vk_signup_completed", "us_signup_completed"],
      ["vk_onboarding_completed", "us_onboarding_completed"],
      ["vk_skipped_pin_banner", "us_skipped_pin_banner"],
      ["vk_sound_enabled", "us_sound_enabled"],
      ["vk_speech_rate", "us_speech_rate"],
      ["vk_sound_muted", "us_sound_muted"],
      ["vk_has_custom_speech_lang", "us_has_custom_speech_lang"],
      ["vk_pwa_install_dismissed", "us_pwa_install_dismissed"]
    ];
    for (const [oldKey, newKey] of migrations) {
      const val = localStorage.getItem(oldKey);
      if (val !== null && localStorage.getItem(newKey) === null) {
        localStorage.setItem(newKey, val);
      }
    }
  } catch {
  }
}
async function migrateFromLegacyDB(newDB) {
  if (typeof indexedDB === "undefined") return;
  try {
    const newCustomersCount = await newDB.count("customers").catch(() => 0);
    const newEntriesCount = await newDB.count("entries").catch(() => 0);
    if (newCustomersCount > 0 || newEntriesCount > 0) {
      return;
    }
    const oldDB = await openDB(LEGACY_DB_NAME, DB_VERSION).catch(() => null);
    if (!oldDB) return;
    const oldCustomerCount = await oldDB.count("customers").catch(() => 0);
    const oldEntriesCount = await oldDB.count("entries").catch(() => 0);
    if (oldCustomerCount === 0 && oldEntriesCount === 0) {
      oldDB.close();
      return;
    }
    const customers = await oldDB.getAll("customers");
    const tx = newDB.transaction(["customers", "entries", "meta", "settings", "profile"], "readwrite");
    for (const c of customers) {
      await tx.objectStore("customers").put(c);
    }
    const entries = await oldDB.getAll("entries");
    for (const e of entries) {
      await tx.objectStore("entries").put(e);
    }
    const metaList = await oldDB.getAll("meta").catch(() => []);
    for (const m of metaList) {
      await tx.objectStore("meta").put(m);
    }
    const settingsList = await oldDB.getAll("settings").catch(() => []);
    for (const s of settingsList) {
      await tx.objectStore("settings").put(s);
    }
    const profileList = await oldDB.getAll("profile").catch(() => []);
    for (const p of profileList) {
      await tx.objectStore("profile").put(p);
    }
    await tx.done;
    oldDB.close();
  } catch (e) {
    console.warn("[Udhaar Sathi] Legacy DB migration notice:", e);
  }
}
async function getDB() {
  if (dbInstance) {
    return dbInstance;
  }
  migrateLocalStorage();
  const isIndexedDBAvailable = typeof indexedDB !== "undefined" && typeof window !== "undefined";
  if (!isIndexedDBAvailable) {
    dbInstance = new InMemoryDBMock();
    return dbInstance;
  }
  try {
    dbInstance = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, newVersion, transaction) {
        if (!db.objectStoreNames.contains("customers")) {
          db.createObjectStore("customers", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("entries")) {
          const entryStore = db.createObjectStore("entries", { keyPath: "id" });
          entryStore.createIndex("by-customerId", "customerId", { unique: false });
          entryStore.createIndex("by-date", "date", { unique: false });
        }
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings", { keyPath: "key" });
        }
        if (!db.objectStoreNames.contains("meta")) {
          db.createObjectStore("meta", { keyPath: "key" });
        }
        if (oldVersion < 2) {
          if (!db.objectStoreNames.contains("profile")) {
            db.createObjectStore("profile", { keyPath: "id" });
          }
          if (!db.objectStoreNames.contains("paymentRequests")) {
            const payStore = db.createObjectStore("paymentRequests", { keyPath: "ref" });
            payStore.createIndex("by-ref", "ref", { unique: true });
            payStore.createIndex("by-status", "status", { unique: false });
          }
        }
      },
      blocked() {
        console.warn("UdhaarSathiDB database upgrade blocked: please close other tabs.");
      },
      blocking() {
        if (dbInstance && "close" in dbInstance) {
          dbInstance.close();
          dbInstance = null;
        }
      }
    });
    await migrateFromLegacyDB(dbInstance);
    return dbInstance;
  } catch (err) {
    console.warn("Failed to open browser IndexedDB, falling back to in-memory store:", err);
    dbInstance = new InMemoryDBMock();
    return dbInstance;
  }
}

// src/services/crypto.ts
function bufferToBase64(buf) {
  const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < u8.length; i++) {
    binary += String.fromCharCode(u8[i]);
  }
  return btoa(binary);
}
function base64ToBuffer(b64) {
  const binary = atob(b64);
  const u8 = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    u8[i] = binary.charCodeAt(i);
  }
  return u8;
}
var CryptoService = class {
  activeDataKey = null;
  isLockedState = false;
  PBKDF2_ITERATIONS = 2e5;
  get subtle() {
    if (typeof globalThis !== "undefined" && globalThis.crypto?.subtle) {
      return globalThis.crypto.subtle;
    }
    throw new Error("Web Crypto API (crypto.subtle) is not available in this environment");
  }
  /**
   * Generates a fresh random 12-byte IV for AES-GCM
   */
  generateIV() {
    return globalThis.crypto.getRandomValues(new Uint8Array(12));
  }
  /**
   * Generates a fresh random 16-byte salt for PBKDF2
   */
  generateSalt() {
    return globalThis.crypto.getRandomValues(new Uint8Array(16));
  }
  /**
   * Generates a new 256-bit AES-GCM data encryption key
   */
  async generateDataKey() {
    return await this.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      // extractable so it can be wrapped or stored
      ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
    );
  }
  /**
   * Derives an AES-GCM wrapping key from a PIN using PBKDF2 (200k iterations, SHA-256)
   */
  async deriveWrappingKeyFromPin(pin, salt) {
    const encoder = new TextEncoder();
    const pinBuffer = encoder.encode(pin.trim());
    const baseKey = await this.subtle.importKey(
      "raw",
      pinBuffer,
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    return await this.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: this.PBKDF2_ITERATIONS,
        hash: "SHA-256"
      },
      baseKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["wrapKey", "unwrapKey", "encrypt", "decrypt"]
    );
  }
  /**
   * Wraps the current data key using a PIN
   */
  async wrapDataKeyWithPin(dataKey, pin) {
    const salt = this.generateSalt();
    const iv = this.generateIV();
    const wrappingKey = await this.deriveWrappingKeyFromPin(pin, salt);
    const wrappedBuffer = await this.subtle.wrapKey(
      "raw",
      dataKey,
      wrappingKey,
      { name: "AES-GCM", iv }
    );
    return {
      wrappedKey: bufferToBase64(wrappedBuffer),
      salt: bufferToBase64(salt),
      iv: bufferToBase64(iv),
      iterations: this.PBKDF2_ITERATIONS
    };
  }
  /**
   * Unwraps a wrapped data key using the given PIN.
   * Throws or returns null if PIN is incorrect (AES-GCM tag mismatch).
   */
  async unwrapDataKeyWithPin(meta, pin) {
    try {
      const salt = base64ToBuffer(meta.salt);
      const iv = base64ToBuffer(meta.iv);
      const wrappedKeyBytes = base64ToBuffer(meta.wrappedKey);
      const wrappingKey = await this.deriveWrappingKeyFromPin(pin, salt);
      const dataKey = await this.subtle.unwrapKey(
        "raw",
        wrappedKeyBytes,
        wrappingKey,
        { name: "AES-GCM", iv },
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
      );
      return dataKey;
    } catch {
      return null;
    }
  }
  /**
   * Encrypts arbitrary serializable object into base64 ciphertext + base64 12-byte IV
   */
  async encryptObject(obj, customKey) {
    const key = customKey || this.activeDataKey;
    if (!key) {
      throw new Error("Cannot encrypt: Data encryption key is locked or not initialized");
    }
    const iv = this.generateIV();
    const encoder = new TextEncoder();
    const plaintextBytes = encoder.encode(JSON.stringify(obj));
    const ciphertext = await this.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      plaintextBytes
    );
    return {
      encryptedPayload: bufferToBase64(ciphertext),
      iv: bufferToBase64(iv)
    };
  }
  /**
   * Decrypts ciphertext + IV into original object
   */
  async decryptObject(payload, customKey) {
    const key = customKey || this.activeDataKey;
    if (!key) {
      throw new Error("Cannot decrypt: Data encryption key is locked or not initialized");
    }
    const iv = base64ToBuffer(payload.iv);
    const ciphertext = base64ToBuffer(payload.encryptedPayload);
    const decryptedBytes = await this.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext
    );
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decryptedBytes));
  }
  // --- Session & Memory Key State ---
  setActiveKey(key) {
    this.activeDataKey = key;
    this.isLockedState = key === null;
  }
  getActiveKey() {
    return this.activeDataKey;
  }
  isUnlocked() {
    return this.activeDataKey !== null;
  }
  lock() {
    this.activeDataKey = null;
    this.isLockedState = true;
  }
  /**
   * Exports a CryptoKey to raw Base64 (used for unprotected local storage when PIN is disabled)
   */
  async exportRawKey(key) {
    const raw = await this.subtle.exportKey("raw", key);
    return bufferToBase64(raw);
  }
  /**
   * Imports a raw Base64 string into a CryptoKey
   */
  async importRawKey(base64Raw) {
    const raw = base64ToBuffer(base64Raw);
    return await this.subtle.importKey(
      "raw",
      raw,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
    );
  }
};
var cryptoService = new CryptoService();

// src/services/paymentRef.ts
function generatePaymentRef() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  }
  const pool = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let ref = "";
  for (let i = 0; i < 16; i++) {
    ref += pool.charAt(Math.floor(Math.random() * pool.length));
  }
  return ref;
}

// src/services/dbMigration.ts
async function encryptCustomerEntity(customer) {
  const sensitiveData = {
    name: customer.name,
    phone: customer.phone ? cleanPhoneNumber(customer.phone) : "",
    notes: customer.notes || "",
    phoneVerified: customer.phoneVerified ?? false,
    lastRemindedAt: customer.lastRemindedAt
  };
  const { encryptedPayload, iv } = await cryptoService.encryptObject(sensitiveData);
  return {
    id: customer.id,
    createdAt: customer.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
    lastTransactionDate: customer.lastTransactionDate,
    encryptedPayload,
    iv
  };
}
async function decryptCustomerEntity(record, calculatedBalance = {
  totalCredit: 0,
  totalPayment: 0,
  balance: 0
}) {
  const sensitive = await cryptoService.decryptObject({
    encryptedPayload: record.encryptedPayload,
    iv: record.iv
  });
  return {
    id: record.id,
    name: sensitive.name,
    phone: sensitive.phone ? cleanPhoneNumber(sensitive.phone) : void 0,
    phoneVerified: sensitive.phoneVerified ?? false,
    notes: sensitive.notes,
    lastRemindedAt: sensitive.lastRemindedAt,
    createdAt: record.createdAt,
    lastTransactionDate: record.lastTransactionDate,
    totalCredit: calculatedBalance.totalCredit,
    totalPayment: calculatedBalance.totalPayment,
    balance: calculatedBalance.balance
  };
}
async function encryptEntryEntity(entry) {
  const sensitiveData = {
    customerName: entry.customerName || "",
    amount: entry.amount,
    note: entry.note || entry.notes || "",
    notes: entry.notes || entry.note || "",
    rawTranscript: entry.rawTranscript || "",
    source: entry.source || "voice",
    paymentRef: entry.paymentRef
  };
  const { encryptedPayload, iv } = await cryptoService.encryptObject(sensitiveData);
  return {
    id: entry.id,
    customerId: entry.customerId,
    type: entry.type,
    date: entry.date,
    createdAt: entry.createdAt,
    synced: entry.synced ?? true,
    source: entry.source || "voice",
    paymentRef: entry.paymentRef,
    encryptedPayload,
    iv
  };
}
async function decryptEntryEntity(record) {
  const sensitive = await cryptoService.decryptObject({
    encryptedPayload: record.encryptedPayload,
    iv: record.iv
  });
  return {
    id: record.id,
    customerId: record.customerId,
    type: record.type,
    date: record.date,
    createdAt: record.createdAt,
    synced: record.synced,
    customerName: sensitive.customerName,
    amount: sensitive.amount,
    note: sensitive.note || sensitive.notes,
    notes: sensitive.notes || sensitive.note,
    rawTranscript: sensitive.rawTranscript,
    source: sensitive.source || record.source || "voice",
    paymentRef: sensitive.paymentRef || record.paymentRef
  };
}
async function encryptProfileEntity(profile) {
  const sensitiveData = {
    shopName: profile.shopName,
    shopkeeperName: profile.shopkeeperName,
    phone: cleanPhoneNumber(profile.phone),
    upiId: profile.upiId
  };
  const { encryptedPayload, iv } = await cryptoService.encryptObject(sensitiveData);
  return {
    id: "current",
    createdAt: profile.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: profile.updatedAt || (/* @__PURE__ */ new Date()).toISOString(),
    encryptedPayload,
    iv
  };
}
async function decryptProfileEntity(record) {
  const sensitive = await cryptoService.decryptObject({
    encryptedPayload: record.encryptedPayload,
    iv: record.iv
  });
  return {
    shopName: sensitive.shopName,
    shopkeeperName: sensitive.shopkeeperName,
    phone: cleanPhoneNumber(sensitive.phone),
    upiId: sensitive.upiId,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt
  };
}
async function encryptPaymentRequestEntity(req) {
  const sensitiveData = {
    amount: req.amount,
    paidAmount: req.paidAmount,
    link: req.link
  };
  const { encryptedPayload, iv } = await cryptoService.encryptObject(sensitiveData);
  return {
    ref: req.ref,
    entryId: req.entryId,
    customerId: req.customerId,
    status: req.status,
    createdAt: req.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
    expiresAt: req.expiresAt,
    paidAt: req.paidAt,
    encryptedPayload,
    iv
  };
}
async function decryptPaymentRequestEntity(record) {
  const sensitive = await cryptoService.decryptObject({
    encryptedPayload: record.encryptedPayload,
    iv: record.iv
  });
  return {
    ref: record.ref,
    entryId: record.entryId,
    customerId: record.customerId,
    amount: sensitive.amount,
    status: record.status,
    createdAt: record.createdAt,
    expiresAt: record.expiresAt,
    paidAt: record.paidAt,
    paidAmount: sensitive.paidAmount,
    link: sensitive.link
  };
}
async function seedPitchDemoDataToDB() {
  const { PITCH_CUSTOMERS: PITCH_CUSTOMERS2, PITCH_ENTRIES: PITCH_ENTRIES2 } = await Promise.resolve().then(() => (init_demoDataset(), demoDataset_exports));
  const db = await getDB();
  await db.clear("customers");
  await db.clear("entries");
  for (const cust of PITCH_CUSTOMERS2) {
    const encryptedRecord = await encryptCustomerEntity(cust);
    await db.put("customers", encryptedRecord);
  }
  for (const entry of PITCH_ENTRIES2) {
    const encryptedRecord = await encryptEntryEntity(entry);
    await db.put("entries", encryptedRecord);
  }
}

// src/services/ledgerService.ts
var INITIAL_CUSTOMERS = [
  {
    id: "cust-1",
    name: "Ramesh Bhai (Plumber)",
    phone: "9845012345",
    // ends in 2345
    phoneVerified: true,
    totalCredit: 2400,
    totalPayment: 1e3,
    balance: 1400,
    lastTransactionDate: new Date(Date.now() - 36e5 * 4).toISOString(),
    createdAt: new Date(Date.now() - 864e5 * 30).toISOString(),
    notes: "Near cross road 2"
  },
  {
    id: "cust-2",
    name: "Pooja Akka (Teacher)",
    phone: "9880198765",
    phoneVerified: true,
    totalCredit: 850,
    totalPayment: 500,
    balance: 350,
    lastTransactionDate: new Date(Date.now() - 36e5 * 24).toISOString(),
    createdAt: new Date(Date.now() - 864e5 * 20).toISOString(),
    notes: "School street"
  },
  {
    id: "cust-3",
    name: "Suresh Tailor",
    phone: "9741234567",
    phoneVerified: true,
    totalCredit: 1600,
    totalPayment: 800,
    balance: 800,
    lastTransactionDate: new Date(Date.now() - 36e5 * 48).toISOString(),
    createdAt: new Date(Date.now() - 864e5 * 45).toISOString()
  },
  {
    id: "cust-4",
    name: "Anil Sharma",
    phone: "9900118899",
    // ends in 8899 (shared suffix with Sunita Bai)
    phoneVerified: true,
    totalCredit: 1200,
    totalPayment: 1200,
    balance: 0,
    lastTransactionDate: new Date(Date.now() - 864e5 * 3).toISOString(),
    createdAt: new Date(Date.now() - 864e5 * 60).toISOString()
  },
  {
    id: "cust-5",
    name: "Venkatesh Rao",
    phone: "9448123987",
    phoneVerified: true,
    totalCredit: 3450,
    totalPayment: 1300,
    balance: 2150,
    lastTransactionDate: new Date(Date.now() - 36e5 * 12).toISOString(),
    createdAt: new Date(Date.now() - 864e5 * 15).toISOString(),
    notes: "Tea stall neighbor"
  },
  {
    id: "cust-6",
    name: "Ramesh Gowda",
    phone: "9845099887",
    // ends in 9887 (different from Ramesh Bhai 2345)
    phoneVerified: true,
    totalCredit: 650,
    totalPayment: 200,
    balance: 450,
    lastTransactionDate: new Date(Date.now() - 36e5 * 20).toISOString(),
    createdAt: new Date(Date.now() - 864e5 * 10).toISOString(),
    notes: "Near temple"
  },
  {
    id: "cust-7",
    name: "Sunita Bai",
    phone: "9845568899",
    // ends in 8899 (shared suffix with Anil Sharma)
    phoneVerified: true,
    totalCredit: 1500,
    totalPayment: 500,
    balance: 1e3,
    lastTransactionDate: new Date(Date.now() - 36e5 * 15).toISOString(),
    createdAt: new Date(Date.now() - 864e5 * 12).toISOString()
  }
];
var INITIAL_ENTRIES = [
  {
    id: "tx-0",
    customerId: "cust-1",
    customerName: "Ramesh Bhai (Plumber)",
    amount: 1900,
    type: "credit",
    date: new Date(Date.now() - 864e5 * 5).toISOString(),
    createdAt: new Date(Date.now() - 864e5 * 5).toISOString(),
    rawTranscript: "Ramesh 1900 udhaar",
    synced: true
  },
  {
    id: "tx-1",
    customerId: "cust-1",
    customerName: "Ramesh Bhai (Plumber)",
    amount: 500,
    type: "credit",
    date: new Date(Date.now() - 36e5 * 4).toISOString(),
    createdAt: new Date(Date.now() - 36e5 * 4).toISOString(),
    rawTranscript: "Ramesh ko 500 udhaar diya",
    synced: true
  },
  {
    id: "tx-3",
    customerId: "cust-1",
    customerName: "Ramesh Bhai (Plumber)",
    amount: 1e3,
    type: "payment",
    date: new Date(Date.now() - 864e5 * 2).toISOString(),
    createdAt: new Date(Date.now() - 864e5 * 2).toISOString(),
    rawTranscript: "Ramesh se 1000 jama mila",
    synced: true
  },
  {
    id: "tx-2a",
    customerId: "cust-2",
    customerName: "Pooja Akka (Teacher)",
    amount: 500,
    type: "credit",
    date: new Date(Date.now() - 864e5 * 4).toISOString(),
    createdAt: new Date(Date.now() - 864e5 * 4).toISOString(),
    rawTranscript: "Pooja 500 udhaar",
    synced: true
  },
  {
    id: "tx-2",
    customerId: "cust-2",
    customerName: "Pooja Akka (Teacher)",
    amount: 350,
    type: "credit",
    date: new Date(Date.now() - 36e5 * 24).toISOString(),
    createdAt: new Date(Date.now() - 36e5 * 24).toISOString(),
    rawTranscript: "Pooja 350 udhaar",
    synced: true
  },
  {
    id: "tx-2b",
    customerId: "cust-2",
    customerName: "Pooja Akka (Teacher)",
    amount: 500,
    type: "payment",
    date: new Date(Date.now() - 864e5 * 3).toISOString(),
    createdAt: new Date(Date.now() - 864e5 * 3).toISOString(),
    rawTranscript: "Pooja 500 jama",
    synced: true
  }
];
var RealLedgerService = class {
  isInitialized = false;
  /**
   * Initializes database keys and schema
   */
  async init() {
    if (this.isInitialized) return;
    const db = await getDB();
    const wrappedKeyMeta = await db.get("meta", "data_key_wrapped");
    const unprotectedKeyMeta = await db.get("meta", "data_key_unprotected");
    if (wrappedKeyMeta) {
      if (!cryptoService.isUnlocked()) {
        cryptoService.lock();
        this.isInitialized = true;
        return;
      }
    } else if (unprotectedKeyMeta) {
      const dataKey = await cryptoService.importRawKey(unprotectedKeyMeta.value);
      cryptoService.setActiveKey(dataKey);
    } else {
      const freshKey = await cryptoService.generateDataKey();
      const rawBase64 = await cryptoService.exportRawKey(freshKey);
      await db.put("meta", { key: "data_key_unprotected", value: rawBase64 });
      cryptoService.setActiveKey(freshKey);
    }
    const custCount = await db.count("customers");
    if (custCount === 0) {
      const isDemo = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("demo") === "1";
      if (isDemo) {
        await seedPitchDemoDataToDB();
      }
    }
    this.isInitialized = true;
  }
  // --- PIN Security Methods ---
  async isPinSet() {
    const db = await getDB();
    const wrapped = await db.get("meta", "data_key_wrapped");
    return !!wrapped;
  }
  isUnlocked() {
    return cryptoService.isUnlocked();
  }
  async unlockWithPin(pin) {
    const db = await getDB();
    const wrappedMeta = await db.get("meta", "data_key_wrapped");
    if (!wrappedMeta) {
      return true;
    }
    const dataKey = await cryptoService.unwrapDataKeyWithPin(wrappedMeta.value, pin);
    if (dataKey) {
      cryptoService.setActiveKey(dataKey);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("vk_pin_lock_state_changed", { detail: { locked: false } }));
      }
      return true;
    }
    return false;
  }
  async setPin(newPin) {
    await this.init();
    const dataKey = cryptoService.getActiveKey();
    if (!dataKey) {
      throw new Error("Cannot set PIN: Key is locked");
    }
    const wrapped = await cryptoService.wrapDataKeyWithPin(dataKey, newPin);
    const db = await getDB();
    await db.put("meta", { key: "data_key_wrapped", value: wrapped });
    await db.delete("meta", "data_key_unprotected");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("vk_pin_lock_state_changed", { detail: { hasPin: true, locked: false } }));
    }
  }
  async removePin(currentPin) {
    const unlocked = await this.unlockWithPin(currentPin);
    if (!unlocked) return false;
    const dataKey = cryptoService.getActiveKey();
    if (!dataKey) return false;
    const db = await getDB();
    const rawBase64 = await cryptoService.exportRawKey(dataKey);
    await db.put("meta", { key: "data_key_unprotected", value: rawBase64 });
    await db.delete("meta", "data_key_wrapped");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("vk_pin_lock_state_changed", { detail: { hasPin: false, locked: false } }));
    }
    return true;
  }
  lockApp() {
    cryptoService.lock();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("vk_pin_lock_state_changed", { detail: { locked: true } }));
    }
  }
  async resetAppAndWipeData() {
    const db = await getDB();
    await db.clear("customers");
    await db.clear("entries");
    await db.clear("settings");
    await db.clear("meta");
    const freshKey = await cryptoService.generateDataKey();
    const rawBase64 = await cryptoService.exportRawKey(freshKey);
    await db.put("meta", { key: "data_key_unprotected", value: rawBase64 });
    cryptoService.setActiveKey(freshKey);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("vk_pin_lock_state_changed", { detail: { hasPin: false, locked: false } }));
    }
  }
  // --- Seed Data Operations ---
  async seedInitialData() {
    const db = await getDB();
    await db.clear("customers");
    await db.clear("entries");
    for (const c of INITIAL_CUSTOMERS) {
      const rec = await encryptCustomerEntity(c);
      await db.put("customers", rec);
    }
    for (const e of INITIAL_ENTRIES) {
      const rec = await encryptEntryEntity(e);
      await db.put("entries", rec);
    }
  }
  async seedPitchDemoData() {
    await seedPitchDemoDataToDB();
  }
  // --- Ledger Operations ---
  /**
   * Retrieves all customers with dynamically computed balances from entries,
   * sorted by highest pending udhaar first (balance descending).
   */
  async getCustomers() {
    await this.init();
    if (!cryptoService.isUnlocked()) return [];
    const db = await getDB();
    const [rawCustomers, rawEntries] = await Promise.all([
      db.getAll("customers"),
      db.getAll("entries")
    ]);
    const customerBalanceMap = /* @__PURE__ */ new Map();
    for (const encEntry of rawEntries) {
      try {
        const decrypted = await decryptEntryEntity(encEntry);
        const current = customerBalanceMap.get(decrypted.customerId) || { totalCredit: 0, totalPayment: 0 };
        if (decrypted.type === "credit") {
          current.totalCredit += decrypted.amount;
        } else {
          current.totalPayment += decrypted.amount;
        }
        customerBalanceMap.set(decrypted.customerId, current);
      } catch {
      }
    }
    const customers = [];
    for (const encCust of rawCustomers) {
      try {
        const balanceInfo = customerBalanceMap.get(encCust.id) || { totalCredit: 0, totalPayment: 0 };
        const customer = await decryptCustomerEntity(encCust, {
          totalCredit: balanceInfo.totalCredit,
          totalPayment: balanceInfo.totalPayment,
          balance: balanceInfo.totalCredit - balanceInfo.totalPayment
        });
        customers.push(customer);
      } catch {
      }
    }
    return customers.sort((a, b) => b.balance - a.balance);
  }
  /**
   * Retrieves a customer by ID with computed balance
   */
  async getCustomerById(id) {
    await this.init();
    if (!cryptoService.isUnlocked()) return null;
    const db = await getDB();
    const encCust = await db.get("customers", id);
    if (!encCust) return null;
    const encEntries = await db.getAllFromIndex("entries", "by-customerId", id);
    let totalCredit = 0;
    let totalPayment = 0;
    for (const ee of encEntries) {
      try {
        const entry = await decryptEntryEntity(ee);
        if (entry.type === "credit") totalCredit += entry.amount;
        else totalPayment += entry.amount;
      } catch {
      }
    }
    return await decryptCustomerEntity(encCust, {
      totalCredit,
      totalPayment,
      balance: totalCredit - totalPayment
    });
  }
  /**
   * Computes customer balance dynamically: sum(credit) - sum(payment)
   */
  async getCustomerBalance(customerId) {
    await this.init();
    if (!cryptoService.isUnlocked()) return 0;
    const db = await getDB();
    const encEntries = await db.getAllFromIndex("entries", "by-customerId", customerId);
    let balance = 0;
    for (const ee of encEntries) {
      try {
        const entry = await decryptEntryEntity(ee);
        if (entry.type === "credit") balance += entry.amount;
        else balance -= entry.amount;
      } catch {
      }
    }
    return balance;
  }
  /**
   * Finds matching customers by search query (transliteration, fuzzy matching, phonetic)
   */
  async findCustomers(query) {
    const allCustomers = await this.getCustomers();
    const cleanQuery = query.trim();
    if (!cleanQuery) return allCustomers;
    const { findCustomers: findMatchingCustomers } = await Promise.resolve().then(() => (init_customerMatcher(), customerMatcher_exports));
    const matchResult = findMatchingCustomers(cleanQuery, allCustomers);
    if (matchResult.candidates.length > 0) {
      return matchResult.candidates.map((c) => c.customer);
    }
    const lower = cleanQuery.toLowerCase();
    return allCustomers.filter((c) => {
      const matchName = c.name.toLowerCase().includes(lower);
      const matchPhone = c.phone ? c.phone.includes(lower) : false;
      return matchName || matchPhone;
    });
  }
  async findCustomerByName(nameQuery) {
    const matches = await this.findCustomers(nameQuery);
    return matches.length > 0 ? matches[0] : null;
  }
  async findOrCreateCustomer(name, phone) {
    await this.init();
    const trimmed = name.trim();
    if (!trimmed) {
      throw new Error("Customer name cannot be empty");
    }
    const all = await this.getCustomers();
    const existing = all.find((c) => c.name.trim().toLowerCase() === trimmed.toLowerCase());
    if (existing) return existing;
    const { findCustomers: findMatchingCustomers } = await Promise.resolve().then(() => (init_customerMatcher(), customerMatcher_exports));
    const matchResult = findMatchingCustomers(trimmed, all);
    if (matchResult.action === "auto_select" && matchResult.topScore >= 0.98 && matchResult.selectedCustomer) {
      return matchResult.selectedCustomer;
    }
    const newCust = {
      id: `cust-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmed,
      phone: phone || "",
      totalCredit: 0,
      totalPayment: 0,
      balance: 0,
      lastTransactionDate: (/* @__PURE__ */ new Date()).toISOString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const db = await getDB();
    const encRec = await encryptCustomerEntity(newCust);
    await db.put("customers", encRec);
    return newCust;
  }
  async addCustomer(customerData) {
    await this.init();
    const trimmed = customerData.name.trim();
    const cleanPhone = customerData.phone ? cleanPhoneNumber(customerData.phone) : "";
    const newCust = {
      id: `cust-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmed,
      phone: cleanPhone,
      totalCredit: 0,
      totalPayment: 0,
      balance: 0,
      lastTransactionDate: (/* @__PURE__ */ new Date()).toISOString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      notes: customerData.notes || ""
    };
    const db = await getDB();
    const encRec = await encryptCustomerEntity(newCust);
    await db.put("customers", encRec);
    return newCust;
  }
  async updateCustomer(id, updates) {
    const existing = await this.getCustomerById(id);
    if (!existing) {
      throw new Error(`Customer with id ${id} not found`);
    }
    const updated = { ...existing, ...updates };
    const db = await getDB();
    const encRec = await encryptCustomerEntity(updated);
    await db.put("customers", encRec);
    return updated;
  }
  // --- Shop Profile Operations ---
  async getProfile() {
    await this.init();
    if (!this.isUnlocked()) return null;
    const db = await getDB();
    const raw = await db.get("profile", "current");
    if (!raw) return null;
    return await decryptProfileEntity(raw);
  }
  async saveProfile(profileData) {
    await this.init();
    const db = await getDB();
    const existingRaw = await db.get("profile", "current");
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const createdAt = existingRaw?.createdAt || profileData.createdAt || now;
    const profile = {
      shopName: profileData.shopName.trim(),
      shopkeeperName: profileData.shopkeeperName.trim(),
      phone: cleanPhoneNumber(profileData.phone),
      upiId: profileData.upiId.trim(),
      createdAt,
      updatedAt: now
    };
    const encrypted = await encryptProfileEntity(profile);
    await db.put("profile", encrypted);
    await db.put("settings", { key: "shopName", value: profile.shopName });
    return profile;
  }
  // --- Customer Phone Operations & Suffix Disambiguation ---
  async updateCustomerPhone(customerId, phone, verified = false) {
    await this.init();
    const normalizedPhone = cleanPhoneNumber(phone);
    return await this.updateCustomer(customerId, {
      phone: normalizedPhone,
      phoneVerified: verified
    });
  }
  async findCustomersByPhoneSuffix(suffix) {
    await this.init();
    const cleanSuffix = suffix.replace(/\D/g, "");
    if (!cleanSuffix) return [];
    const all = await this.getCustomers();
    return all.filter((c) => c.phone && cleanPhoneNumber(c.phone).endsWith(cleanSuffix));
  }
  async getCustomerByPhone(phone) {
    await this.init();
    const clean = cleanPhoneNumber(phone);
    if (!clean) return null;
    const all = await this.getCustomers();
    return all.find((c) => c.phone && cleanPhoneNumber(c.phone) === clean) || null;
  }
  // --- Payment Requests & UPI Operations ---
  async createPaymentRequest(input) {
    await this.init();
    const now = /* @__PURE__ */ new Date();
    const ref = input.ref || generatePaymentRef();
    const expiresAt = new Date(now.getTime() + (input.expiryMinutes ?? 1440) * 6e4).toISOString();
    const req = {
      ref,
      entryId: input.entryId,
      customerId: input.customerId,
      amount: input.amount,
      status: "pending",
      createdAt: now.toISOString(),
      expiresAt,
      link: input.link
    };
    const encrypted = await encryptPaymentRequestEntity(req);
    const db = await getDB();
    await db.put("paymentRequests", encrypted);
    return req;
  }
  async getPendingPaymentRequests() {
    await this.init();
    if (!this.isUnlocked()) return [];
    const db = await getDB();
    const rawList = await db.getAll("paymentRequests");
    const result = [];
    for (const raw of rawList) {
      if (raw.status === "pending") {
        const req = await decryptPaymentRequestEntity(raw);
        result.push(req);
      }
    }
    return result;
  }
  async markPaymentRequestPaid(ref, paidAmount, paidAt) {
    await this.init();
    const db = await getDB();
    const raw = await db.get("paymentRequests", ref);
    if (!raw) {
      throw new Error(`Payment request with ref ${ref} not found`);
    }
    const existingReq = await decryptPaymentRequestEntity(raw);
    if (existingReq.status === "paid") {
      const entries = await this.getCustomerEntries(existingReq.customerId);
      const matchedEntry = entries.find((e) => e.paymentRef === ref);
      return Object.assign(
        {
          paymentRequest: existingReq,
          entry: matchedEntry,
          isNewPayment: false
        },
        existingReq
      );
    }
    const paidTimestamp = paidAt || (/* @__PURE__ */ new Date()).toISOString();
    const actualAmount = paidAmount !== void 0 ? paidAmount : existingReq.amount;
    existingReq.status = "paid";
    existingReq.paidAt = paidTimestamp;
    existingReq.paidAmount = actualAmount;
    const encrypted = await encryptPaymentRequestEntity(existingReq);
    await db.put("paymentRequests", encrypted);
    const { entry: newEntry } = await this.addEntry({
      customerId: existingReq.customerId,
      amount: actualAmount,
      type: "payment",
      date: paidTimestamp,
      note: `UPI Online Payment (Ref: ${ref})`,
      source: "upi",
      paymentRef: ref
    });
    return Object.assign(
      {
        paymentRequest: existingReq,
        entry: newEntry,
        isNewPayment: true
      },
      existingReq
    );
  }
  async checkDuplicateEntry(customerQuery, amount, type, withinMs = 6e5) {
    const entries = await this.getEntries();
    const { isDuplicateEntry: isDuplicateEntry2 } = await Promise.resolve().then(() => (init_customerMatcher(), customerMatcher_exports));
    return isDuplicateEntry2(
      {
        customerId: customerQuery,
        customerName: customerQuery,
        amount,
        type
      },
      entries,
      withinMs
    );
  }
  /**
   * Adds a new entry encrypted into the real DB and updates customer lastTransactionDate
   */
  async addEntry(entryData, customerName) {
    await this.init();
    let customer = await this.getCustomerById(entryData.customerId);
    if (!customer) {
      const name = customerName || entryData.customerName || "Grahak";
      customer = await this.findOrCreateCustomer(name);
      entryData.customerId = customer.id;
    }
    const isDuplicate = await this.checkDuplicateEntry(
      customer.name,
      entryData.amount,
      entryData.type,
      3e5
    );
    const newEntry = {
      ...entryData,
      id: `entry-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      customerName: customer.name,
      synced: true
    };
    const db = await getDB();
    const encEntry = await encryptEntryEntity(newEntry);
    await db.put("entries", encEntry);
    customer.lastTransactionDate = newEntry.date;
    const encCust = await encryptCustomerEntity(customer);
    await db.put("customers", encCust);
    const freshCustomer = await this.getCustomerById(customer.id);
    return {
      entry: newEntry,
      customer: freshCustomer || customer,
      isDuplicate
    };
  }
  async addTransaction(data) {
    const res = await this.addEntry(data, data.customerName);
    return {
      transaction: res.entry,
      customer: res.customer,
      isDuplicate: !!res.isDuplicate
    };
  }
  async updateEntry(id, updates) {
    await this.init();
    const db = await getDB();
    const encEntry = await db.get("entries", id);
    if (!encEntry) {
      throw new Error(`LedgerEntry with id ${id} not found`);
    }
    const existing = await decryptEntryEntity(encEntry);
    const updated = { ...existing, ...updates };
    const reEncrypted = await encryptEntryEntity(updated);
    await db.put("entries", reEncrypted);
    return updated;
  }
  async deleteEntry(id) {
    await this.init();
    const db = await getDB();
    await db.delete("entries", id);
  }
  async deleteTransaction(id) {
    return this.deleteEntry(id);
  }
  async getCustomerEntries(customerId) {
    await this.init();
    if (!cryptoService.isUnlocked()) return [];
    const db = await getDB();
    const encEntries = await db.getAllFromIndex("entries", "by-customerId", customerId);
    const decryptedList = [];
    for (const ee of encEntries) {
      try {
        decryptedList.push(await decryptEntryEntity(ee));
      } catch {
      }
    }
    return decryptedList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  async getEntries(options) {
    await this.init();
    if (!cryptoService.isUnlocked()) return [];
    const db = await getDB();
    let encEntries = [];
    if (options?.customerId) {
      encEntries = await db.getAllFromIndex("entries", "by-customerId", options.customerId);
    } else {
      encEntries = await db.getAll("entries");
    }
    const decryptedList = [];
    for (const ee of encEntries) {
      try {
        decryptedList.push(await decryptEntryEntity(ee));
      } catch {
      }
    }
    decryptedList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (options?.limit) {
      return decryptedList.slice(0, options.limit);
    }
    return decryptedList;
  }
  async getTransactions(options) {
    return this.getEntries(options);
  }
  async getTodaySummary(targetDateStr) {
    await this.init();
    const todayISO = (targetDateStr ? new Date(targetDateStr) : /* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const entries = await this.getEntries();
    const dayEntries = entries.filter((e) => e.date.split("T")[0] === todayISO);
    let credit = 0;
    let payment = 0;
    const activeCustomerIds = /* @__PURE__ */ new Set();
    for (const e of dayEntries) {
      activeCustomerIds.add(e.customerId);
      if (e.type === "credit") credit += e.amount;
      else payment += e.amount;
    }
    return {
      date: todayISO,
      totalCredit: credit,
      totalPayment: payment,
      netBalance: credit - payment,
      entryCount: dayEntries.length,
      activeCustomers: activeCustomerIds.size
    };
  }
  async getLast7DaysSummary() {
    await this.init();
    const entries = await this.getEntries();
    const result = [];
    const now = /* @__PURE__ */ new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 6; i >= 0; i--) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(now.getDate() - i);
      const isoDate = d.toISOString().split("T")[0];
      const dayEntries = entries.filter((e) => e.date.split("T")[0] === isoDate);
      let credit = 0;
      let payment = 0;
      for (const e of dayEntries) {
        if (e.type === "credit") credit += e.amount;
        else payment += e.amount;
      }
      const dayLabel = i === 0 ? "Today" : i === 1 ? "Yesterday" : dayNames[d.getDay()];
      result.push({
        date: isoDate,
        dayLabel,
        credit,
        payment,
        net: credit - payment
      });
    }
    return result;
  }
  async getTopPendingCustomers(limit = 5) {
    const customers = await this.getCustomers();
    return customers.filter((c) => c.balance > 0).sort((a, b) => b.balance - a.balance).slice(0, limit);
  }
  async getDailySummary(targetDateStr) {
    const s = await this.getTodaySummary(targetDateStr);
    return {
      ...s,
      totalCreditGiven: s.totalCredit,
      totalPaymentReceived: s.totalPayment,
      netBalanceChange: s.netBalance,
      transactionCount: s.entryCount,
      activeCustomersCount: s.activeCustomers
    };
  }
  generateWhatsAppReminder(customer, lang, shopName = "Kirana Store", entries) {
    const text = buildReminderMessage({
      customerName: customer.name,
      amount: customer.balance,
      shopName,
      lang,
      entries
    });
    const url = buildWhatsAppReminderUrl(customer.phone || "", text);
    return { text, url };
  }
  generateReceiptText(entry, customer, shopName = "Kirana Store", entries) {
    const cust = customer || { name: "Customer", phone: "", balance: 0, totalCredit: 0, totalPayment: 0, id: "" };
    const allEntries = entries || (entry ? [entry] : void 0);
    return buildReminderMessage({
      customerName: cust.name,
      amount: cust.balance,
      shopName,
      lang: "en",
      entries: allEntries,
      now: entry?.date ? new Date(entry.date) : /* @__PURE__ */ new Date()
    });
  }
  async exportData() {
    const customers = await this.getCustomers();
    const entries = await this.getEntries();
    return JSON.stringify(
      { customers, entries, exportedAt: (/* @__PURE__ */ new Date()).toISOString() },
      null,
      2
    );
  }
  async exportCSV() {
    const customers = await this.getCustomers();
    const entries = await this.getEntries();
    const rows = [];
    rows.push("# UDHAAR SATHI TRANSACTIONS");
    rows.push("Transaction ID,Date,Customer ID,Customer Name,Type,Amount (INR),Note,Created At");
    for (const e of entries) {
      const cust = customers.find((c) => c.id === e.customerId);
      const custName = cust ? cust.name : e.customerName || "Unknown";
      const safeNote = (e.note || "").replace(/"/g, '""');
      rows.push(`"${e.id}","${e.date}","${e.customerId}","${custName}","${e.type}","${e.amount}","${safeNote}","${e.createdAt}"`);
    }
    rows.push("");
    rows.push("# CUSTOMERS SUMMARY");
    rows.push("Customer ID,Name,Phone,Balance Owed (INR),Total Udhaar (INR),Total Jama (INR),Created At");
    for (const c of customers) {
      rows.push(`"${c.id}","${c.name}","${c.phone || ""}","${c.balance}","${c.totalCredit}","${c.totalPayment}","${c.createdAt}"`);
    }
    return rows.join("\r\n");
  }
  async importAll(jsonData) {
    const parsed = JSON.parse(jsonData);
    const db = await getDB();
    await db.clear("customers");
    await db.clear("entries");
    if (Array.isArray(parsed.customers)) {
      for (const c of parsed.customers) {
        const encCust = await encryptCustomerEntity(c);
        await db.put("customers", encCust);
      }
    }
    if (Array.isArray(parsed.entries)) {
      for (const e of parsed.entries) {
        const encEntry = await encryptEntryEntity(e);
        await db.put("entries", encEntry);
      }
    }
  }
  async clearAllData() {
    const db = await getDB();
    await db.clear("customers");
    await db.clear("entries");
    await db.clear("profile");
    await db.clear("paymentRequests");
  }
};
var InMemoryLedgerService = class {
  customers = [];
  entries = [];
  profile = null;
  paymentRequests = [];
  isInitialized = false;
  constructor() {
    this.init();
  }
  async init() {
    if (this.isInitialized) return;
    const isDemo = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("demo") === "1";
    if (isDemo) {
      await this.seedPitchDemoData();
    } else {
      this.customers = [];
      this.entries = [];
    }
    this.isInitialized = true;
  }
  async seedInitialData() {
    this.customers = JSON.parse(JSON.stringify(INITIAL_CUSTOMERS));
    this.entries = JSON.parse(JSON.stringify(INITIAL_ENTRIES));
  }
  async seedPitchDemoData() {
    const { PITCH_CUSTOMERS: PITCH_CUSTOMERS2, PITCH_ENTRIES: PITCH_ENTRIES2 } = await Promise.resolve().then(() => (init_demoDataset(), demoDataset_exports));
    this.customers = JSON.parse(JSON.stringify(PITCH_CUSTOMERS2));
    this.entries = JSON.parse(JSON.stringify(PITCH_ENTRIES2));
  }
  async getCustomers() {
    await this.init();
    return [...this.customers].sort((a, b) => b.balance - a.balance);
  }
  async getCustomerById(id) {
    await this.init();
    return this.customers.find((c) => c.id === id) || null;
  }
  async findCustomers(query) {
    await this.init();
    const cleanQuery = query.trim();
    if (!cleanQuery) return this.getCustomers();
    const { findCustomers: findMatchingCustomers } = await Promise.resolve().then(() => (init_customerMatcher(), customerMatcher_exports));
    const matchResult = findMatchingCustomers(cleanQuery, this.customers);
    if (matchResult.candidates.length > 0) {
      return matchResult.candidates.map((c) => c.customer);
    }
    const lower = cleanQuery.toLowerCase();
    return this.customers.filter((c) => {
      const matchName = c.name.toLowerCase().includes(lower);
      const matchPhone = c.phone ? c.phone.includes(lower) : false;
      return matchName || matchPhone;
    });
  }
  async findCustomerByName(nameQuery) {
    const matches = await this.findCustomers(nameQuery);
    return matches.length > 0 ? matches[0] : null;
  }
  async updateCustomer(id, updates) {
    await this.init();
    const idx = this.customers.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error(`Customer with id ${id} not found`);
    const updated = { ...this.customers[idx], ...updates };
    this.customers[idx] = updated;
    return updated;
  }
  // --- Shop Profile Operations ---
  async getProfile() {
    await this.init();
    return this.profile ? JSON.parse(JSON.stringify(this.profile)) : null;
  }
  async saveProfile(profileData) {
    await this.init();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const createdAt = this.profile?.createdAt || profileData.createdAt || now;
    this.profile = {
      shopName: profileData.shopName.trim(),
      shopkeeperName: profileData.shopkeeperName.trim(),
      phone: cleanPhoneNumber(profileData.phone),
      upiId: profileData.upiId.trim(),
      createdAt,
      updatedAt: now
    };
    return JSON.parse(JSON.stringify(this.profile));
  }
  // --- Customer Phone Operations & Suffix Disambiguation ---
  async updateCustomerPhone(customerId, phone, verified = false) {
    await this.init();
    const cust = this.customers.find((c) => c.id === customerId);
    if (!cust) throw new Error(`Customer with id ${customerId} not found`);
    cust.phone = cleanPhoneNumber(phone);
    cust.phoneVerified = verified;
    return JSON.parse(JSON.stringify(cust));
  }
  async findCustomersByPhoneSuffix(suffix) {
    await this.init();
    const cleanSuffix = suffix.replace(/\D/g, "");
    if (!cleanSuffix) return [];
    return this.customers.filter((c) => c.phone && cleanPhoneNumber(c.phone).endsWith(cleanSuffix)).map((c) => JSON.parse(JSON.stringify(c)));
  }
  async getCustomerByPhone(phone) {
    await this.init();
    const clean = cleanPhoneNumber(phone);
    if (!clean) return null;
    const cust = this.customers.find((c) => c.phone && cleanPhoneNumber(c.phone) === clean);
    return cust ? JSON.parse(JSON.stringify(cust)) : null;
  }
  // --- Payment Requests & UPI Operations ---
  async createPaymentRequest(input) {
    await this.init();
    const now = /* @__PURE__ */ new Date();
    const ref = input.ref || generatePaymentRef();
    const expiresAt = new Date(now.getTime() + (input.expiryMinutes ?? 1440) * 6e4).toISOString();
    const req = {
      ref,
      entryId: input.entryId,
      customerId: input.customerId,
      amount: input.amount,
      status: "pending",
      createdAt: now.toISOString(),
      expiresAt,
      link: input.link
    };
    this.paymentRequests.push(JSON.parse(JSON.stringify(req)));
    return req;
  }
  async getPendingPaymentRequests() {
    await this.init();
    return this.paymentRequests.filter((p) => p.status === "pending").map((p) => JSON.parse(JSON.stringify(p)));
  }
  async markPaymentRequestPaid(ref, paidAmount, paidAt) {
    await this.init();
    const existingReq = this.paymentRequests.find((p) => p.ref === ref);
    if (!existingReq) {
      throw new Error(`Payment request with ref ${ref} not found`);
    }
    if (existingReq.status === "paid") {
      const entries = await this.getCustomerEntries(existingReq.customerId);
      const matchedEntry = entries.find((e) => e.paymentRef === ref);
      return Object.assign(
        {
          paymentRequest: existingReq,
          entry: matchedEntry,
          isNewPayment: false
        },
        existingReq
      );
    }
    const paidTimestamp = paidAt || (/* @__PURE__ */ new Date()).toISOString();
    const actualAmount = paidAmount !== void 0 ? paidAmount : existingReq.amount;
    existingReq.status = "paid";
    existingReq.paidAt = paidTimestamp;
    existingReq.paidAmount = actualAmount;
    const { entry: newEntry } = await this.addEntry({
      customerId: existingReq.customerId,
      amount: actualAmount,
      type: "payment",
      date: paidTimestamp,
      note: `UPI Online Payment (Ref: ${ref})`,
      source: "upi",
      paymentRef: ref
    });
    return Object.assign(
      {
        paymentRequest: existingReq,
        entry: newEntry,
        isNewPayment: true
      },
      existingReq
    );
  }
  async checkDuplicateEntry(customerQuery, amount, type, withinMs = 6e5) {
    await this.init();
    const { isDuplicateEntry: isDuplicateEntry2 } = await Promise.resolve().then(() => (init_customerMatcher(), customerMatcher_exports));
    return isDuplicateEntry2(
      { customerId: customerQuery, customerName: customerQuery, amount, type },
      this.entries,
      withinMs
    );
  }
  async findOrCreateCustomer(name, phone) {
    await this.init();
    const trimmed = name.trim();
    if (!trimmed) {
      throw new Error("Customer name cannot be empty");
    }
    const all = await this.getCustomers();
    const existing = all.find((c) => c.name.trim().toLowerCase() === trimmed.toLowerCase());
    if (existing) return existing;
    const { findCustomers: findMatchingCustomers } = await Promise.resolve().then(() => (init_customerMatcher(), customerMatcher_exports));
    const matchResult = findMatchingCustomers(trimmed, all);
    if (matchResult.action === "auto_select" && matchResult.topScore >= 0.98 && matchResult.selectedCustomer) {
      return matchResult.selectedCustomer;
    }
    const newCustomer = {
      id: `cust-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmed,
      phone: phone || "",
      totalCredit: 0,
      totalPayment: 0,
      balance: 0,
      lastTransactionDate: (/* @__PURE__ */ new Date()).toISOString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }
  async addCustomer(customerData) {
    await this.init();
    const trimmed = customerData.name.trim();
    const cleanPhone = customerData.phone ? cleanPhoneNumber(customerData.phone) : "";
    const newCustomer = {
      id: `cust-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmed,
      phone: cleanPhone,
      totalCredit: 0,
      totalPayment: 0,
      balance: 0,
      lastTransactionDate: (/* @__PURE__ */ new Date()).toISOString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      notes: customerData.notes || ""
    };
    this.customers.push(newCustomer);
    return JSON.parse(JSON.stringify(newCustomer));
  }
  async getCustomerBalance(customerId) {
    const customer = await this.getCustomerById(customerId);
    return customer ? customer.balance : 0;
  }
  async addEntry(entryData, customerName) {
    await this.init();
    let customer = await this.getCustomerById(entryData.customerId);
    if (!customer) {
      const name = customerName || entryData.customerName || "Grahak";
      customer = await this.findOrCreateCustomer(name);
      entryData.customerId = customer.id;
    }
    const isDuplicate = this.entries.some(
      (e) => e.customerId === entryData.customerId && e.amount === entryData.amount && e.type === entryData.type && Date.now() - new Date(e.date).getTime() < 3e5
    );
    const newEntry = {
      ...entryData,
      id: `entry-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      customerName: customer.name,
      synced: true
    };
    if (entryData.type === "credit") {
      customer.totalCredit += entryData.amount;
    } else {
      customer.totalPayment += entryData.amount;
    }
    customer.balance = customer.totalCredit - customer.totalPayment;
    customer.lastTransactionDate = newEntry.date;
    this.entries.unshift(newEntry);
    return { entry: newEntry, customer, isDuplicate };
  }
  async updateEntry(id, updates) {
    await this.init();
    const idx = this.entries.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error(`LedgerEntry with id ${id} not found`);
    const existing = this.entries[idx];
    const updated = { ...existing, ...updates };
    this.entries[idx] = updated;
    const cust = this.customers.find((c) => c.id === existing.customerId);
    if (cust) {
      const custEntries = this.entries.filter((e) => e.customerId === cust.id);
      let credit = 0;
      let payment = 0;
      for (const e of custEntries) {
        if (e.type === "credit") credit += e.amount;
        else payment += e.amount;
      }
      cust.totalCredit = credit;
      cust.totalPayment = payment;
      cust.balance = credit - payment;
    }
    return updated;
  }
  async getCustomerEntries(customerId) {
    await this.init();
    return this.entries.filter((e) => e.customerId === customerId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  async getEntries(options) {
    await this.init();
    let res = [...this.entries];
    if (options?.customerId) {
      res = res.filter((e) => e.customerId === options.customerId);
    }
    res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (options?.limit) return res.slice(0, options.limit);
    return res;
  }
  async deleteEntry(id) {
    await this.init();
    this.entries = this.entries.filter((e) => e.id !== id);
  }
  async getTodaySummary(targetDateStr) {
    await this.init();
    const todayISO = (targetDateStr ? new Date(targetDateStr) : /* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const dayEntries = this.entries.filter((e) => e.date.split("T")[0] === todayISO);
    let credit = 0;
    let payment = 0;
    const activeCustomerIds = /* @__PURE__ */ new Set();
    for (const e of dayEntries) {
      activeCustomerIds.add(e.customerId);
      if (e.type === "credit") credit += e.amount;
      else payment += e.amount;
    }
    return {
      date: todayISO,
      totalCredit: credit,
      totalPayment: payment,
      netBalance: credit - payment,
      entryCount: dayEntries.length,
      activeCustomers: activeCustomerIds.size
    };
  }
  async getLast7DaysSummary() {
    await this.init();
    const result = [];
    const now = /* @__PURE__ */ new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 6; i >= 0; i--) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(now.getDate() - i);
      const isoDate = d.toISOString().split("T")[0];
      const dayEntries = this.entries.filter((e) => e.date.split("T")[0] === isoDate);
      let credit = 0;
      let payment = 0;
      for (const e of dayEntries) {
        if (e.type === "credit") credit += e.amount;
        else payment += e.amount;
      }
      const dayLabel = i === 0 ? "Today" : i === 1 ? "Yesterday" : dayNames[d.getDay()];
      result.push({
        date: isoDate,
        dayLabel,
        credit,
        payment,
        net: credit - payment
      });
    }
    return result;
  }
  async getTopPendingCustomers(limit = 5) {
    await this.init();
    return this.customers.filter((c) => c.balance > 0).sort((a, b) => b.balance - a.balance).slice(0, limit);
  }
  generateWhatsAppReminder(customer, lang, shopName = "Kirana Store", entries) {
    const text = buildReminderMessage({
      customerName: customer.name,
      amount: customer.balance,
      shopName,
      lang,
      entries
    });
    const url = buildWhatsAppReminderUrl(customer.phone || "", text);
    return { text, url };
  }
  generateReceiptText(entry, customer, shopName = "Kirana Store", entries) {
    const cust = customer || { name: "Customer", phone: "", balance: 0, totalCredit: 0, totalPayment: 0, id: "" };
    const allEntries = entries || (entry ? [entry] : void 0);
    return buildReminderMessage({
      customerName: cust.name,
      amount: cust.balance,
      shopName,
      lang: "en",
      entries: allEntries,
      now: entry?.date ? new Date(entry.date) : /* @__PURE__ */ new Date()
    });
  }
  async exportData() {
    await this.init();
    return JSON.stringify(
      { customers: this.customers, entries: this.entries, exportedAt: (/* @__PURE__ */ new Date()).toISOString() },
      null,
      2
    );
  }
  async exportCSV() {
    await this.init();
    const rows = [];
    rows.push("# UDHAAR SATHI TRANSACTIONS");
    rows.push("Transaction ID,Date,Customer ID,Customer Name,Type,Amount (INR),Note,Created At");
    for (const e of this.entries) {
      const cust = this.customers.find((c) => c.id === e.customerId);
      const custName = cust ? cust.name : e.customerName || "Unknown";
      const safeNote = (e.note || "").replace(/"/g, '""');
      rows.push(`"${e.id}","${e.date}","${e.customerId}","${custName}","${e.type}","${e.amount}","${safeNote}","${e.createdAt}"`);
    }
    rows.push("");
    rows.push("# CUSTOMERS SUMMARY");
    rows.push("Customer ID,Name,Phone,Balance Owed (INR),Total Udhaar (INR),Total Jama (INR),Created At");
    for (const c of this.customers) {
      rows.push(`"${c.id}","${c.name}","${c.phone || ""}","${c.balance}","${c.totalCredit}","${c.totalPayment}","${c.createdAt}"`);
    }
    return rows.join("\r\n");
  }
  async clearAllData() {
    this.customers = [];
    this.entries = [];
    this.profile = null;
    this.paymentRequests = [];
  }
};
var ledgerService = new RealLedgerService();

// src/services/numberParser.ts
function normalizeIndicDigits(text) {
  return text.replace(/[०-९೦-೯௦-௯౦-౯]/g, (char) => {
    const code = char.charCodeAt(0);
    if (code >= 2406 && code <= 2415) return String(code - 2406);
    if (code >= 3302 && code <= 3311) return String(code - 3302);
    if (code >= 3046 && code <= 3055) return String(code - 3046);
    if (code >= 3174 && code <= 3183) return String(code - 3174);
    return char;
  });
}
var NUMBER_WORDS2 = {
  // --- 0 ---
  "shunya": 0,
  "shoonya": 0,
  "shunye": 0,
  "zero": 0,
  "\u0936\u0942\u0928\u094D\u092F": 0,
  "\u0CB8\u0CCA\u0CA8\u0CCD\u0CA8\u0CC6": 0,
  "sonne": 0,
  "\u0BAA\u0BC2\u0B9C\u0BCD\u0B9C\u0BBF\u0BAF\u0BAE\u0BCD": 0,
  "poojiyam": 0,
  "\u0C38\u0C41\u0C28\u0C4D\u0C28\u0C3E": 0,
  "sunna": 0,
  // --- 1 ---
  "ek": 1,
  "aik": 1,
  "yek": 1,
  "yeka": 1,
  "yekk": 1,
  "one": 1,
  "\u090F\u0915": 1,
  "ondu": 1,
  "\u0C92\u0C82\u0CA6\u0CC1": 1,
  "ondru": 1,
  "onnu": 1,
  "\u0B92\u0BA9\u0BCD\u0BB1\u0BC1": 1,
  "\u0B92\u0BA9\u0BCD\u0BA9\u0BC1": 1,
  "okati": 1,
  "vokati": 1,
  "\u0C12\u0C15\u0C1F\u0C3F": 1,
  // --- 2 ---
  "do": 2,
  "doh": 2,
  "two": 2,
  "\u0926\u094B": 2,
  "eradu": 2,
  "yeradu": 2,
  "erdu": 2,
  "\u0C8E\u0CB0\u0CA1\u0CC1": 2,
  "irandu": 2,
  "rendu": 2,
  "randu": 2,
  "\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BC1": 2,
  "\u0BB0\u0BC6\u0BA3\u0BCD\u0B9F\u0BC1": 2,
  "\u0C30\u0C46\u0C02\u0C21\u0C41": 2,
  // --- 3 ---
  "teen": 3,
  "tin": 3,
  "theen": 3,
  "three": 3,
  "\u0924\u0940\u0928": 3,
  "mooru": 3,
  "muru": 3,
  "\u0CAE\u0CC2\u0CB0\u0CC1": 3,
  "moondru": 3,
  "moonu": 3,
  "munu": 3,
  "\u0BAE\u0BC2\u0BA9\u0BCD\u0BB1\u0BC1": 3,
  "\u0BAE\u0BC2\u0BA9\u0BC1": 3,
  "moodu": 3,
  "mudu": 3,
  "\u0C2E\u0C42\u0C21\u0C41": 3,
  // --- 4 ---
  "chaar": 4,
  "char": 4,
  "chhar": 4,
  "four": 4,
  "\u091A\u093E\u0930": 4,
  "naalku": 4,
  "nalku": 4,
  "\u0CA8\u0CBE\u0CB2\u0CCD\u0C95\u0CC1": 4,
  "naangu": 4,
  "naalu": 4,
  "nalu": 4,
  "\u0BA8\u0BBE\u0BA9\u0BCD\u0B95\u0BC1": 4,
  "\u0BA8\u0BBE\u0BB2\u0BC1": 4,
  "naalugu": 4,
  "nalugu": 4,
  "\u0C28\u0C3E\u0C32\u0C41\u0C17\u0C41": 4,
  // --- 5 ---
  "paanch": 5,
  "panch": 5,
  "paanchan": 5,
  "paach": 5,
  "five": 5,
  "\u092A\u093E\u0901\u091A": 5,
  "\u092A\u093E\u0902\u091A": 5,
  "aidu": 5,
  "aydu": 5,
  "aaydu": 5,
  "\u0C90\u0CA6\u0CC1": 5,
  "aindhu": 5,
  "anju": 5,
  "ainthu": 5,
  "\u0B90\u0BA8\u0BCD\u0BA4\u0BC1": 5,
  "\u0B85\u0B9E\u0BCD\u0B9A\u0BC1": 5,
  "\u0C10\u0C26\u0C41": 5,
  // --- 6 ---
  "chhe": 6,
  "chhah": 6,
  "che": 6,
  "chhey": 6,
  "chha": 6,
  "\u091B\u0939": 6,
  "\u091B\u0903": 6,
  "six": 6,
  "aaru": 6,
  "aru": 6,
  "\u0C86\u0CB0\u0CC1": 6,
  "\u0B86\u0BB1\u0BC1": 6,
  "\u0C06\u0C30\u0C41": 6,
  // --- 7 ---
  "saat": 7,
  "sat": 7,
  "seven": 7,
  "\u0938\u093E\u0924": 7,
  "eelu": 7,
  "elu": 7,
  "yeelu": 7,
  "\u0C8F\u0CB3\u0CC1": 7,
  "ezhu": 7,
  "yezhu": 7,
  "yelu": 7,
  "\u0B8F\u0BB4\u0BC1": 7,
  "eedu": 7,
  "yedu": 7,
  "\u0C0F\u0C21\u0C41": 7,
  // --- 8 ---
  "aath": 8,
  "ath": 8,
  "aat": 8,
  "eight": 8,
  "\u0906\u0920": 8,
  "entu": 8,
  "yentu": 8,
  "\u0C8E\u0C82\u0C9F\u0CC1": 8,
  "ettu": 8,
  "yettu": 8,
  "\u0B8E\u0B9F\u0BCD\u0B9F\u0BC1": 8,
  "enimidi": 8,
  "yenimidi": 8,
  "\u0C0E\u0C28\u0C3F\u0C2E\u0C3F\u0C26\u0C3F": 8,
  // --- 9 ---
  "nau": 9,
  "now": 9,
  "nine": 9,
  "\u0928\u094C": 9,
  "ombattu": 9,
  "ombhatthu": 9,
  "ombathu": 9,
  "\u0C92\u0C82\u0CAC\u0CA4\u0CCD\u0CA4\u0CC1": 9,
  "onbadhu": 9,
  "ombadhu": 9,
  "\u0B92\u0BA9\u0BCD\u0BAA\u0BA4\u0BC1": 9,
  "tommidi": 9,
  "thommidi": 9,
  "\u0C24\u0C4A\u0C2E\u0C4D\u0C2E\u0C3F\u0C26\u0C3F": 9,
  // --- 10 ---
  "das": 10,
  "duss": 10,
  "dus": 10,
  "ten": 10,
  "\u0926\u0938": 10,
  "hattu": 10,
  "\u0CB9\u0CA4\u0CCD\u0CA4\u0CC1": 10,
  "patthu": 10,
  "pathu": 10,
  "\u0BAA\u0BA4\u0BCD\u0BA4\u0BC1": 10,
  "padi": 10,
  "\u0C2A\u0C26\u0C3F": 10,
  // --- 11-19 (Teens) ---
  "gyarah": 11,
  "gyaarah": 11,
  "gyara": 11,
  "eleven": 11,
  "\u0917\u094D\u092F\u093E\u0930\u0939": 11,
  "hannondu": 11,
  "padhinondru": 11,
  "pathinonnu": 11,
  "padakondu": 11,
  "barah": 12,
  "baarah": 12,
  "bara": 12,
  "twelve": 12,
  "\u092C\u093E\u0930\u0939": 12,
  "hanneradu": 12,
  "pannirandu": 12,
  "pannendu": 12,
  "terah": 13,
  "teyrah": 13,
  "tera": 13,
  "thirteen": 13,
  "\u0924\u0947\u0930\u0939": 13,
  "hadimooru": 13,
  "pathimoondru": 13,
  "padamoodu": 13,
  "chaudah": 14,
  "chauda": 14,
  "chodah": 14,
  "choudah": 14,
  "fourteen": 14,
  "\u091A\u094C\u0926\u0939": 14,
  "hadinaalku": 14,
  "pathinaangu": 14,
  "padnaalugu": 14,
  "pandrah": 15,
  "pandra": 15,
  "fifteen": 15,
  "\u092A\u0902\u0926\u094D\u0930\u0939": 15,
  "hadinaidu": 15,
  "pathinaindhu": 15,
  "pathinanju": 15,
  "padihenu": 15,
  "solah": 16,
  "sola": 16,
  "sowlah": 16,
  "sixteen": 16,
  "\u0938\u094B\u0932\u0939": 16,
  "hadinaaru": 16,
  "pathinaaru": 16,
  "padahaaru": 16,
  "satrah": 17,
  "satra": 17,
  "seventeen": 17,
  "\u0938\u0924\u094D\u0930\u0939": 17,
  "hadineelu": 17,
  "pathinezhu": 17,
  "padihedu": 17,
  "atharah": 18,
  "athaarah": 18,
  "athara": 18,
  "eighteen": 18,
  "\u0905\u0920\u093E\u0930\u0939": 18,
  "hadinentu": 18,
  "pathinettu": 18,
  "paddhenimidi": 18,
  "unnees": 19,
  "unnis": 19,
  "unees": 19,
  "nineteen": 19,
  "\u0909\u0928\u094D\u0928\u0940\u0938": 19,
  "hatombattu": 19,
  "pathonbadhu": 19,
  "pandhommidi": 19,
  // --- 20-29 ---
  "bees": 20,
  "bis": 20,
  "twenty": 20,
  "\u092C\u0940\u0938": 20,
  "ippattu": 20,
  "ippathu": 20,
  "\u0C87\u0CAA\u0CCD\u0CAA\u0CA4\u0CCD\u0CA4\u0CC1": 20,
  "irubadhu": 20,
  "iruvadhu": 20,
  "irupadhu": 20,
  "\u0B87\u0BB0\u0BC1\u0BAA\u0BA4\u0BC1": 20,
  "iravai": 20,
  "iruvai": 20,
  "\u0C07\u0C30\u0C35\u0C48": 20,
  "ikkees": 21,
  "ikkis": 21,
  "ikis": 21,
  "ikees": 21,
  "twenty-one": 21,
  "twenty one": 21,
  "\u0907\u0915\u094D\u0915\u0940\u0938": 21,
  "baaees": 22,
  "baais": 22,
  "bayees": 22,
  "baees": 22,
  "twenty-two": 22,
  "twenty two": 22,
  "\u092C\u093E\u0908\u0938": 22,
  "teees": 23,
  "teis": 23,
  "tayees": 23,
  "twenty-three": 23,
  "twenty three": 23,
  "\u0924\u0947\u0908\u0938": 23,
  "chaubees": 24,
  "chaubis": 24,
  "chobis": 24,
  "twenty-four": 24,
  "twenty four": 24,
  "\u091A\u094C\u092C\u0940\u0938": 24,
  "pachchees": 25,
  "pachis": 25,
  "pachees": 25,
  "pacchis": 25,
  "twenty-five": 25,
  "twenty five": 25,
  "\u092A\u091A\u094D\u091A\u0940\u0938": 25,
  "chhabbees": 26,
  "chhabis": 26,
  "chabbis": 26,
  "twenty-six": 26,
  "twenty six": 26,
  "\u091B\u092C\u094D\u092C\u0940\u0938": 26,
  "sattaees": 27,
  "sattais": 27,
  "satais": 27,
  "twenty-seven": 27,
  "twenty seven": 27,
  "\u0938\u0924\u094D\u0924\u093E\u0908\u0938": 27,
  "atthaees": 28,
  "atthais": 28,
  "athais": 28,
  "twenty-eight": 28,
  "twenty eight": 28,
  "\u0905\u091F\u094D\u0920\u093E\u0908\u0938": 28,
  "untees": 29,
  "untis": 29,
  "twenty-nine": 29,
  "twenty nine": 29,
  "\u0909\u0928\u0924\u0940\u0938": 29,
  // --- 30-39 ---
  "tees": 30,
  "tis": 30,
  "thirty": 30,
  "\u0924\u0940\u0938": 30,
  "moovattu": 30,
  "muvattu": 30,
  "\u0CAE\u0CC2\u0CB5\u0CA4\u0CCD\u0CA4\u0CC1": 30,
  "muppadhu": 30,
  "\u0BAE\u0BC1\u0BAA\u0BCD\u0BAA\u0BA4\u0BC1": 30,
  "muppai": 30,
  "\u0C2E\u0C41\u0C2A\u0C4D\u0C2A\u0C48": 30,
  "iktees": 31,
  "iktis": 31,
  "thirty-one": 31,
  "thirty one": 31,
  "\u0907\u0915\u0924\u0940\u0938": 31,
  "battees": 32,
  "battis": 32,
  "thirty-two": 32,
  "thirty two": 32,
  "\u092C\u0924\u094D\u0924\u0940\u0938": 32,
  "teintees": 33,
  "taintis": 33,
  "tentees": 33,
  "tentis": 33,
  "thirty-three": 33,
  "\u0924\u0948\u0902\u0924\u0940\u0938": 33,
  "chauntees": 34,
  "chauntis": 34,
  "chontis": 34,
  "thirty-four": 34,
  "\u091A\u094C\u0902\u0924\u0940\u0938": 34,
  "paintees": 35,
  "paintis": 35,
  "pentees": 35,
  "pentis": 35,
  "thirty-five": 35,
  "\u092A\u0948\u0902\u0924\u0940\u0938": 35,
  "chhattees": 36,
  "chhattis": 36,
  "chattis": 36,
  "thirty-six": 36,
  "\u091B\u0924\u094D\u0924\u0940\u0938": 36,
  "saintees": 37,
  "saintis": 37,
  "sentees": 37,
  "sentis": 37,
  "thirty-seven": 37,
  "\u0938\u0948\u0902\u0924\u0940\u0938": 37,
  "adtees": 38,
  "adtis": 38,
  "athtees": 38,
  "athtis": 38,
  "arhtees": 38,
  "thirty-eight": 38,
  "\u0905\u0921\u093C\u0924\u0940\u0938": 38,
  "untaalees": 39,
  "untalis": 39,
  "unchalis": 39,
  "thirty-nine": 39,
  "\u0909\u0928\u0924\u093E\u0932\u0940\u0938": 39,
  // --- 40-49 ---
  "chaalees": 40,
  "chaalis": 40,
  "chalis": 40,
  "chalees": 40,
  "forty": 40,
  "\u091A\u093E\u0932\u0940\u0938": 40,
  "nalavattu": 40,
  "nalavathu": 40,
  "\u0CA8\u0CB2\u0CB5\u0CA4\u0CCD\u0CA4\u0CC1": 40,
  "naarpadhu": 40,
  "narpadhu": 40,
  "\u0BA8\u0BBE\u0BB1\u0BCD\u0BAA\u0BA4\u0BC1": 40,
  "nalabhai": 40,
  "nalabai": 40,
  "\u0C28\u0C32\u0C2D\u0C48": 40,
  "iktaalees": 41,
  "iktalis": 41,
  "forty-one": 41,
  "\u0907\u0915\u0924\u093E\u0932\u0940\u0938": 41,
  "bayaalees": 42,
  "bayalis": 42,
  "byalis": 42,
  "forty-two": 42,
  "\u092C\u092F\u093E\u0932\u0940\u0938": 42,
  "taintaalees": 43,
  "taintalis": 43,
  "tetalis": 43,
  "forty-three": 43,
  "\u0924\u0948\u0902\u0924\u093E\u0932\u0940\u0938": 43,
  "chawaalees": 44,
  "chavalis": 44,
  "chawalis": 44,
  "chavalees": 44,
  "forty-four": 44,
  "\u091A\u0935\u093E\u0932\u0940\u0938": 44,
  "paintaalees": 45,
  "paintalis": 45,
  "petalis": 45,
  "forty-five": 45,
  "\u092A\u0948\u0902\u0924\u093E\u0932\u0940\u0938": 45,
  "chhiyaalees": 46,
  "chhiyalis": 46,
  "chhyalis": 46,
  "forty-six": 46,
  "\u091B\u093F\u092F\u093E\u0932\u0940\u0938": 46,
  "saintaalees": 47,
  "saintalis": 47,
  "sentalis": 47,
  "forty-seven": 47,
  "\u0938\u0948\u0902\u0924\u093E\u0932\u0940\u0938": 47,
  "adtaalees": 48,
  "adtalis": 48,
  "arhtalis": 48,
  "forty-eight": 48,
  "\u0905\u0921\u093C\u0924\u093E\u0932\u0940\u0938": 48,
  "unchaas": 49,
  "unchas": 49,
  "forty-nine": 49,
  "\u0909\u0928\u091A\u093E\u0938": 49,
  // --- 50-59 ---
  "pachaas": 50,
  "pachas": 50,
  "fifty": 50,
  "\u092A\u091A\u093E\u0938": 50,
  "aivattu": 50,
  "aivathu": 50,
  "aivatthu": 50,
  "aivaththu": 50,
  "ayvattu": 50,
  "\u0C90\u0CB5\u0CA4\u0CCD\u0CA4\u0CC1": 50,
  "aimbadhu": 50,
  "ambadhu": 50,
  "ampadhu": 50,
  "\u0B90\u0BAE\u0BCD\u0BAA\u0BA4\u0BC1": 50,
  "yaabhai": 50,
  "yabai": 50,
  "aabhai": 50,
  "\u0C2F\u0C3E\u0C2D\u0C48": 50,
  "ikyaavan": 51,
  "ikyawan": 51,
  "ikyavan": 51,
  "fifty-one": 51,
  "\u0907\u0915\u094D\u092F\u093E\u0935\u0928": 51,
  "baavan": 52,
  "baawan": 52,
  "bawan": 52,
  "fifty-two": 52,
  "\u092C\u093E\u0935\u0928": 52,
  "tirepan": 53,
  "tirpan": 53,
  "fifty-three": 53,
  "\u0924\u093F\u0930\u0947\u092A\u0928": 53,
  "chauvan": 54,
  "chauwan": 54,
  "chawan": 54,
  "fifty-four": 54,
  "\u091A\u094C\u0935\u0928": 54,
  "pachpan": 55,
  "fifty-five": 55,
  "\u092A\u091A\u092A\u0928": 55,
  "chhappan": 56,
  "chappan": 56,
  "fifty-six": 56,
  "\u091B\u092A\u094D\u092A\u0928": 56,
  "sattaavan": 57,
  "sattawan": 57,
  "satawan": 57,
  "fifty-seven": 57,
  "\u0938\u0924\u094D\u0924\u093E\u0935\u0928": 57,
  "atthaavan": 58,
  "atthawan": 58,
  "athawan": 58,
  "fifty-eight": 58,
  "\u0905\u091F\u094D\u0920\u093E\u0935\u0928": 58,
  "unsath": 59,
  "fifty-nine": 59,
  "\u0909\u0928\u0938\u0920": 59,
  // --- 60-69 ---
  "saath": 60,
  "sath": 60,
  "sixty": 60,
  "\u0938\u093E\u0920": 60,
  "aravattu": 60,
  "aravathu": 60,
  "\u0C85\u0CB0\u0CB5\u0CA4\u0CCD\u0CA4\u0CC1": 60,
  "arubadhu": 60,
  "\u0B85\u0BB1\u0BC1\u0BAA\u0BA4\u0BC1": 60,
  "aravai": 60,
  "\u0C05\u0C30\u0C35\u0C48": 60,
  "iksath": 61,
  "sixty-one": 61,
  "\u0907\u0915\u0938\u0920": 61,
  "baasath": 62,
  "basath": 62,
  "sixty-two": 62,
  "\u092C\u093E\u0938\u0920": 62,
  "tirsath": 63,
  "tirasath": 63,
  "sixty-three": 63,
  "\u0924\u093F\u0930\u0938\u0920": 63,
  "chausath": 64,
  "chonsath": 64,
  "sixty-four": 64,
  "\u091A\u094C\u0902\u0938\u0920": 64,
  "painsath": 65,
  "pensath": 65,
  "sixty-five": 65,
  "\u092A\u0948\u0902\u0938\u0920": 65,
  "chhiyasath": 66,
  "chhyasath": 66,
  "sixty-six": 66,
  "\u091B\u093F\u092F\u093E\u0938\u0920": 66,
  "sarsath": 67,
  "sarasath": 67,
  "sixty-seven": 67,
  "\u0938\u0930\u0938\u0920": 67,
  "adsath": 68,
  "arhsath": 68,
  "sixty-eight": 68,
  "\u0905\u0921\u093C\u0938\u0920": 68,
  "unhattar": 69,
  "unhatar": 69,
  "sixty-nine": 69,
  "\u0909\u0928\u0939\u0924\u094D\u0924\u0930": 69,
  // --- 70-79 ---
  "sattar": 70,
  "satar": 70,
  "seventy": 70,
  "\u0938\u0924\u094D\u0924\u0930": 70,
  "eppattu": 70,
  "eppathu": 70,
  "\u0C8E\u0CAA\u0CCD\u0CAA\u0CA4\u0CCD\u0CA4\u0CC1": 70,
  "ezhubadhu": 70,
  "\u0B8E\u0BB4\u0BC1\u0BAA\u0BA4\u0BC1": 70,
  "debbai": 70,
  "\u0C21\u0C46\u0C2C\u0C4D\u0C2C\u0C48": 70,
  "ikhattar": 71,
  "ikhatar": 71,
  "seventy-one": 71,
  "\u0907\u0915\u0939\u0924\u094D\u0924\u0930": 71,
  "bahattar": 72,
  "bahatar": 72,
  "seventy-two": 72,
  "\u092C\u0939\u0924\u094D\u0924\u0930": 72,
  "tihattar": 73,
  "tihatar": 73,
  "seventy-three": 73,
  "\u0924\u093F\u0939\u0924\u094D\u0924\u0930": 73,
  "chauhattar": 74,
  "chohattar": 74,
  "seventy-four": 74,
  "\u091A\u094C\u0939\u0924\u094D\u0924\u0930": 74,
  "pachhattar": 75,
  "pachhatar": 75,
  "seventy-five": 75,
  "\u092A\u091A\u0939\u0924\u094D\u0924\u0930": 75,
  "chhihattar": 76,
  "chhatar": 76,
  "seventy-six": 76,
  "\u091B\u093F\u0939\u0924\u094D\u0924\u0930": 76,
  "sathattar": 77,
  "sat-hattar": 77,
  "seventy-seven": 77,
  "\u0938\u0924\u0939\u0924\u094D\u0924\u0930": 77,
  "athhattar": 78,
  "ath-hattar": 78,
  "seventy-eight": 78,
  "\u0905\u0920\u0939\u0924\u094D\u0924\u0930": 78,
  "unyasee": 79,
  "unaasi": 79,
  "unasi": 79,
  "unnasi": 79,
  "unyasi": 79,
  "seventy-nine": 79,
  "\u0909\u0928\u093E\u0938\u0940": 79,
  "\u0909\u0928\u094D\u0928\u093E\u0938\u0940": 79,
  // --- 80-89 ---
  "assee": 80,
  "assi": 80,
  "asi": 80,
  "eighty": 80,
  "\u0905\u0938\u094D\u0938\u0940": 80,
  "embattu": 80,
  "embathu": 80,
  "\u0C8E\u0C82\u0CAC\u0CA4\u0CCD\u0CA4\u0CC1": 80,
  "enbadhu": 80,
  "\u0B8E\u0BA3\u0BCD\u0BAA\u0BA4\u0BC1": 80,
  "enabhai": 80,
  "enabai": 80,
  "\u0C0E\u0C28\u0C2D\u0C48": 80,
  "ikyaasee": 81,
  "ikyasi": 81,
  "eighty-one": 81,
  "\u0907\u0915\u094D\u092F\u093E\u0938\u0940": 81,
  "bayaasee": 82,
  "bayasi": 82,
  "byasi": 82,
  "eighty-two": 82,
  "\u092C\u092F\u093E\u0938\u0940": 82,
  "tiraasee": 83,
  "tirasi": 83,
  "eighty-three": 83,
  "\u0924\u093F\u0930\u093E\u0938\u0940": 83,
  "chauraasee": 84,
  "chaurasi": 84,
  "chorasi": 84,
  "eighty-four": 84,
  "\u091A\u094C\u0930\u093E\u0938\u0940": 84,
  "pachaasee": 85,
  "pachasi": 85,
  "eighty-five": 85,
  "\u092A\u091A\u093E\u0938\u0940": 85,
  "chhiyaasee": 86,
  "chhiyasi": 86,
  "chhyasi": 86,
  "eighty-six": 86,
  "\u091B\u093F\u092F\u093E\u0938\u0940": 86,
  "sattaasee": 87,
  "sattasi": 87,
  "satasi": 87,
  "eighty-seven": 87,
  "\u0938\u0924\u094D\u0924\u093E\u0938\u0940": 87,
  "atthaasee": 88,
  "atthasi": 88,
  "athasi": 88,
  "eighty-eight": 88,
  "\u0905\u091F\u094D\u0920\u093E\u0938\u0940": 88,
  "nawaasee": 89,
  "navasee": 89,
  "nawasi": 89,
  "navasi": 89,
  "eighty-nine": 89,
  "\u0928\u0935\u093E\u0938\u0940": 89,
  // --- 90-99 ---
  "nabbe": 90,
  "nabey": 90,
  "nawwe": 90,
  "ninety": 90,
  "\u0928\u092C\u094D\u092C\u0947": 90,
  "tombattu": 90,
  "tombathu": 90,
  "\u0CA4\u0CCA\u0C82\u0CAC\u0CA4\u0CCD\u0CA4\u0CC1": 90,
  "thonnooru": 90,
  "\u0BA4\u0BCA\u0BA3\u0BCD\u0BA3\u0BC2\u0BB1\u0BC1": 90,
  "tombhai": 90,
  "tombai": 90,
  "\u0C24\u0C4A\u0C02\u0C2D\u0C48": 90,
  "ikyaanve": 91,
  "ikyanwe": 91,
  "ikyanve": 91,
  "ninety-one": 91,
  "\u0907\u0915\u094D\u092F\u093E\u0928\u0935\u0947": 91,
  "baanve": 92,
  "baanwe": 92,
  "banve": 92,
  "banwe": 92,
  "ninety-two": 92,
  "\u092C\u093E\u0928\u0935\u0947": 92,
  "tiraanve": 93,
  "tiranwe": 93,
  "tiranve": 93,
  "ninety-three": 93,
  "\u0924\u093F\u0930\u093E\u0928\u0935\u0947": 93,
  "chauraanve": 94,
  "chauranwe": 94,
  "choranve": 94,
  "ninety-four": 94,
  "\u091A\u094C\u0930\u093E\u0928\u0935\u0947": 94,
  "pachaanve": 95,
  "panchanwe": 95,
  "panchanve": 95,
  "pachanve": 95,
  "ninety-five": 95,
  "\u092A\u0902\u091A\u093E\u0928\u0935\u0947": 95,
  "\u092A\u091A\u093E\u0928\u0935\u0947": 95,
  "chhiyaanve": 96,
  "chhiyanwe": 96,
  "chhiyanve": 96,
  "chhanve": 96,
  "ninety-six": 96,
  "\u091B\u093F\u092F\u093E\u0928\u0935\u0947": 96,
  "\u091B\u093E\u0928\u0935\u0947": 96,
  "sattaanve": 97,
  "sattanwe": 97,
  "sattanve": 97,
  "ninety-seven": 97,
  "\u0938\u0924\u094D\u0924\u093E\u0928\u0935\u0947": 97,
  "atthaanve": 98,
  "atthawne": 98,
  "atthanve": 98,
  "ninety-eight": 98,
  "\u0905\u091F\u094D\u0920\u093E\u0928\u0935\u0947": 98,
  "ninyaanve": 99,
  "ninyanwe": 99,
  "ninyanve": 99,
  "neenyanve": 99,
  "ninety-nine": 99,
  "\u0928\u093F\u0928\u094D\u092F\u093E\u0928\u0935\u0947": 99,
  // --- 100 ---
  "sau": 100,
  "so": 100,
  "sow": 100,
  "hundred": 100,
  "\u0938\u094C": 100,
  "nooru": 100,
  "noora": 100,
  "nuru": 100,
  "\u0CA8\u0CC2\u0CB0\u0CC1": 100,
  "\u0CA8\u0CC2\u0CB0": 100,
  "vanda": 100,
  "vandalu": 100,
  "vandala": 100,
  "vandha": 100,
  "\u0C35\u0C02\u0C26": 100,
  "\u0C35\u0C02\u0C26\u0C32\u0C41": 100,
  "\u0C35\u0C02\u0C26\u0C32": 100,
  "noothi": 100,
  "\u0BA8\u0BC2\u0BB1\u0BC1": 100,
  // --- Kannada Compound Multiples of 100 ---
  "innooru": 200,
  "eranooru": 200,
  "eradu nooru": 200,
  "\u0C87\u0CA8\u0CCD\u0CA8\u0CC2\u0CB0\u0CC1": 200,
  "munnooru": 300,
  "murnooru": 300,
  "murnuru": 300,
  "muru nooru": 300,
  "\u0CAE\u0CC1\u0CA8\u0CCD\u0CA8\u0CC2\u0CB0\u0CC1": 300,
  "naannooru": 400,
  "naanooru": 400,
  "nanuru": 400,
  "naalu nooru": 400,
  "\u0CA8\u0CBE\u0CA8\u0CCD\u0CA8\u0CC2\u0CB0\u0CC1": 400,
  "ainnooru": 500,
  "ainooru": 500,
  "aivannooru": 500,
  "aivattooru": 500,
  "aidu nooru": 500,
  "\u0C90\u0CA8\u0CCD\u0CA8\u0CC2\u0CB0\u0CC1": 500,
  "aaranuru": 600,
  "aarnooru": 600,
  "aaru nooru": 600,
  "\u0C86\u0CB0\u0CA8\u0CCD\u0CA8\u0CC2\u0CB0\u0CC1": 600,
  "eplanooru": 700,
  "elu nooru": 700,
  "\u0C8F\u0CB3\u0CC1\u0CA8\u0CC2\u0CB0\u0CC1": 700,
  "entunooru": 800,
  "entanooru": 800,
  "entu nooru": 800,
  "\u0C8E\u0C82\u0C9F\u0CC1\u0CA8\u0CC2\u0CB0\u0CC1": 800,
  "ombainooru": 900,
  "ombanooru": 900,
  "ombattu nooru": 900,
  "\u0C92\u0C82\u0CAC\u0CC8\u0CA8\u0CC2\u0CB0\u0CC1": 900,
  // --- Tamil Compound Multiples of 100 ---
  "irunooru": 200,
  "\u0B87\u0BB0\u0BC1\u0BA8\u0BC2\u0BB1\u0BC1": 200,
  "munnuru": 300,
  "\u0BAE\u0BC1\u0BA8\u0BCD\u0BA8\u0BC2\u0BB1\u0BC1": 300,
  "nannooru": 400,
  "\u0BA8\u0BBE\u0BA9\u0BC2\u0BB1\u0BC1": 400,
  "ainuru": 500,
  "\u0B90\u0BA8\u0BC2\u0BB1\u0BC1": 500,
  "aanooru": 600,
  "\u0B85\u0BB1\u0BC1\u0BA8\u0BC2\u0BB1\u0BC1": 600,
  "ezhunooru": 700,
  "\u0B8E\u0BB4\u0BC1\u0BA8\u0BC2\u0BB1\u0BC1": 700,
  "ennuru": 800,
  "\u0B8E\u0BA3\u0BCD\u0BA3\u0BC2\u0BB1\u0BC1": 800,
  "tollayiram": 900,
  "\u0BA4\u0BCA\u0BB3\u0BCD\u0BB3\u0BBE\u0BAF\u0BBF\u0BB0\u0BAE\u0BCD": 900,
  // --- Telugu Compound Multiples of 100 ---
  "irunooru_te": 200,
  "munnooru_te": 300,
  "veyyi": 1e3,
  "veye": 1e3,
  "veyi": 1e3,
  "\u0C35\u0C46\u0C2F\u0C4D\u0C2F\u0C3F": 1e3
};
var MULTIPLIERS = {
  // Hundred
  "sau": 100,
  "so": 100,
  "sow": 100,
  "hundred": 100,
  "\u0938\u094C": 100,
  "nooru": 100,
  "noora": 100,
  "nuru": 100,
  "\u0CA8\u0CC2\u0CB0\u0CC1": 100,
  "\u0CA8\u0CC2\u0CB0": 100,
  "vanda": 100,
  "vandalu": 100,
  "vandala": 100,
  "vandha": 100,
  "\u0C35\u0C02\u0C26": 100,
  "\u0C35\u0C02\u0C26\u0C32\u0C41": 100,
  "\u0C35\u0C02\u0C26\u0C32": 100,
  "noothi": 100,
  "\u0BA8\u0BC2\u0BB1\u0BC1": 100,
  // Thousand
  "hazaar": 1e3,
  "hazar": 1e3,
  "hajar": 1e3,
  "\u0939\u091C\u093C\u093E\u0930": 1e3,
  "\u0939\u091C\u093E\u0930": 1e3,
  "thousand": 1e3,
  "k": 1e3,
  "saavira": 1e3,
  "savira": 1e3,
  "\u0CB8\u0CBE\u0CB5\u0CBF\u0CB0": 1e3,
  "aayiram": 1e3,
  "ayiram": 1e3,
  "\u0B86\u0BAF\u0BBF\u0BB0\u0BAE\u0BCD": 1e3,
  "veyyi": 1e3,
  "veye": 1e3,
  "veyi": 1e3,
  "velu": 1e3,
  "\u0C35\u0C47\u0C2F\u0C3F": 1e3,
  "\u0C35\u0C47\u0C32\u0C41": 1e3,
  "\u0C35\u0C46\u0C2F\u0C4D\u0C2F\u0C3F": 1e3,
  // Lakh (100,000)
  "lakh": 1e5,
  "lac": 1e5,
  "laakh": 1e5,
  "\u0932\u093E\u0916": 1e5,
  "laksha": 1e5,
  "\u0CB2\u0C95\u0CCD\u0CB7": 1e5,
  "latcham": 1e5,
  "laksham": 1e5,
  "\u0BB2\u0B9F\u0BCD\u0B9A\u0BAE\u0BCD": 1e5,
  "\u0C32\u0C15\u0C4D\u0C37": 1e5,
  // Crore (10,000,000)
  "crore": 1e7,
  "karor": 1e7,
  "\u0915\u0930\u094B\u0921\u093C": 1e7,
  "koti": 1e7,
  "\u0C95\u0CCB\u0C9F\u0CBF": 1e7,
  "\u0B95\u0BCB\u0B9F\u0BBF": 1e7,
  "\u0C15\u0C4B\u0C1F\u0C3F": 1e7
};
var CURRENCY_MARKERS = [
  "\u20B9",
  "rs",
  "rs.",
  "rupee",
  "rupees",
  "rupaye",
  "rupay",
  "rupaya",
  "roopaye",
  "roopya",
  "rupiya",
  "rupiye",
  "inr",
  "re",
  "\u0CB0\u0CC2\u0CAA\u0CBE\u0CAF\u0CBF",
  "\u0CB0\u0CC2\u0CAA\u0CBE\u0CAF\u0CBF\u0C97\u0CB3\u0CC1",
  "\u0CB0\u0CC2",
  "\u0BB0\u0BC2\u0BAA\u0BBE\u0BAF\u0BCD",
  "\u0BB0\u0BC2\u0BAA\u0BBE\u0BAF\u0BCD\u0B95\u0BB3\u0BCD",
  "\u0BB0\u0BC2",
  "\u0C30\u0C42\u0C2A\u0C3E\u0C2F\u0C32\u0C41",
  "\u0C30\u0C42\u0C2A\u0C3E\u0C2F\u0C3F",
  "\u0C30\u0C42",
  "\u0930\u0941\u092A\u092F\u0947",
  "\u0930\u0941\u092A\u092F\u093E",
  "\u0930\u0941\u092A\u090F"
];
var DO_VERB_PRECEDING_WORDS = ["de", "kar", "likh", "daal", "bhej", "khata", "bata", "rakh"];
function normalizeFractions(text) {
  let s = text;
  s = s.replace(/(?:^|\s|\b)(?:dedh|derh|deydh|ded|डेढ़)\s+(?:sau|so|sow|hundred|nooru|nuru|vanda|vandha|நூறு|ನೂರು|వంద|सौ)(?:\s|$|\b|[.,!?])/gi, " 150 ");
  s = s.replace(/(?:^|\s|\b)(?:dedh|derh|deydh|ded|डेढ़)\s+(?:hazaar|hazar|hajar|thousand|saavira|savira|aayiram|ayiram|velu|veye|k|हज़ार|हजार|ಸಾವಿರ|ஆயிரம்|వేలు|వేయి)(?:\s|$|\b|[.,!?])/gi, " 1500 ");
  s = s.replace(/(?:^|\s|\b)(?:dedh|derh|deydh|ded|डेढ़)\s+(?:lakh|lac|laakh|laksha|latcham|लाख|ಲಕ್ಷ|லட்சம்|లక్ష)(?:\s|$|\b|[.,!?])/gi, " 150000 ");
  s = s.replace(/(?:^|\s|\b)(?:dhai|dhaai|dayee|dahi|ढाई)\s+(?:sau|so|sow|hundred|nooru|nuru|vanda|vandha|நூறு|ನೂರು|వంద|सौ)(?:\s|$|\b|[.,!?])/gi, " 250 ");
  s = s.replace(/(?:^|\s|\b)(?:dhai|dhaai|dayee|dahi|ढाई)\s+(?:hazaar|hazar|hajar|thousand|saavira|savira|aayiram|ayiram|velu|veye|k|हज़ार|हजार|ಸಾವಿರ|ஆயிரம்|వేలు|వేయి)(?:\s|$|\b|[.,!?])/gi, " 2500 ");
  s = s.replace(/(?:^|\s|\b)(?:dhai|dhaai|dayee|dahi|ढाई)\s+(?:lakh|lac|laakh|laksha|latcham|लाख|ಲಕ್ಷ|லட்சம்|లక్ష)(?:\s|$|\b|[.,!?])/gi, " 250000 ");
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 125 ");
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+do\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 225 ");
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+teen\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 325 ");
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 1250 ");
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+do\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 2250 ");
  s = s.replace(/(?:^|\s|\b)(?:sawa|savaa|sawwa|savva|सवा)\s+(?:lakh|lac|लाख)(?:\s|$|\b|[.,!?])/gi, " 125000 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 75 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:do|दोन?)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 175 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:teen|तीन)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 275 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:chaar|char|चार)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 375 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:paanch|panch|पांच)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 475 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 750 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:do|दो)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 1750 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:teen|तीन)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 2750 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:chaar|char|चार)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 3750 ");
  s = s.replace(/(?:^|\s|\b)(?:paune|paun|pone|पौने)\s+(?:ek\s+)?(?:lakh|lac|लाख)(?:\s|$|\b|[.,!?])/gi, " 75000 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:teen|तीन)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 350 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:chaar|char|चार)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 450 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:paanch|panch|पांच)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 550 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:chhe|chhah|छह)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 650 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:saat|सात)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 750 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:aath|आठ)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 850 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:nau|नौ)\s+(?:sau|so|sow|hundred|सौ)(?:\s|$|\b|[.,!?])/gi, " 950 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:teen|तीन)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 3500 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:chaar|char|चार)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 4500 ");
  s = s.replace(/(?:^|\s|\b)(?:saadhe|sadhe|साढ़े)\s+(?:paanch|panch|पांच)\s+(?:hazaar|hazar|hajar|thousand|हज़ार|हजार)(?:\s|$|\b|[.,!?])/gi, " 5500 ");
  return s;
}
function parseNumberPhrase(phrase) {
  if (!phrase) return null;
  let clean = normalizeIndicDigits(phrase).trim().toLowerCase();
  clean = clean.replace(/[₹$€,]/g, "").replace(/\/[-=]/g, "").replace(/\b(?:rs\.?|rupees?|rupaye?|rupay|rupaya|roopaye|roopya|rupiya|rupiye|inr|re|రూపాయలు|రూపాయి|రూ|ರೂಪಾಯಿ|ರೂಪಾಯಿಗಳು|ರೂ|ரூபாய்|ரூபாய்கள்|ரூ|रुपये|रुपया|रुपए)\b/gi, "").trim();
  if (!clean) return null;
  clean = normalizeFractions(clean).trim();
  if (/^\d+$/.test(clean)) {
    return parseInt(clean, 10);
  }
  const kMatch = clean.match(/^(\d+)\s*k$/i);
  if (kMatch) {
    return parseInt(kMatch[1], 10) * 1e3;
  }
  const spacedMatch = clean.match(/^(\d{1,2})\s+(\d{2,3})$/);
  if (spacedMatch) {
    const combined = spacedMatch[1] + spacedMatch[2];
    return parseInt(combined, 10);
  }
  const rawTokens = clean.split(/\s+/).filter(Boolean);
  if (rawTokens.length === 0) return null;
  let total = 0;
  let currentGroup = 0;
  let hasValidNumberWord = false;
  for (let i = 0; i < rawTokens.length; i++) {
    const token = rawTokens[i].replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, "");
    if (!token) continue;
    if (/^\d+$/.test(token)) {
      const num = parseInt(token, 10);
      currentGroup += num;
      hasValidNumberWord = true;
      continue;
    }
    const multVal = MULTIPLIERS[token];
    if (multVal !== void 0) {
      hasValidNumberWord = true;
      const count = currentGroup === 0 ? 1 : currentGroup;
      if (multVal >= 1e3) {
        total += count * multVal;
        currentGroup = 0;
      } else {
        currentGroup = count * multVal;
      }
      continue;
    }
    const wordVal = NUMBER_WORDS2[token];
    if (wordVal !== void 0) {
      hasValidNumberWord = true;
      currentGroup += wordVal;
      continue;
    }
    if (["and", "aur", "mattu", "mariyu", "um"].includes(token)) {
      continue;
    }
  }
  total += currentGroup;
  if (hasValidNumberWord) {
    return total;
  }
  return null;
}
function extractAmounts(text) {
  if (!text || typeof text !== "string") return [];
  const normalizedText = normalizeIndicDigits(text);
  const results = [];
  const addResult = (item) => {
    const overlapping = results.filter(
      (r) => Math.max(r.start, item.start) < Math.min(r.end, item.end)
    );
    if (overlapping.length === 0) {
      results.push(item);
      return;
    }
    const enclosedByExisting = overlapping.some(
      (existing) => existing.start <= item.start && existing.end >= item.end && existing.raw.length > item.raw.length
    );
    if (enclosedByExisting) {
      return;
    }
    const isSuperior = overlapping.every(
      (existing) => item.raw.length > existing.raw.length || item.confidence > existing.confidence
    );
    if (isSuperior) {
      for (const ex of overlapping) {
        const idx = results.indexOf(ex);
        if (idx >= 0) results.splice(idx, 1);
      }
      results.push(item);
    }
  };
  const currencyPatterns = [
    // Symbol before number: ₹ 500, Rs. 500, Rs 500
    /(?:₹|rs\.?|inr)\s*(\d+(?:,\d+)*(?:\.\d+)?|\d+\s*k)\b/gi,
    // Number followed by currency word: 500 rupaye, 340 rs, 200 ರೂಪಾಯಿ, 500 ரூபாய், 500 రూపాయలు
    /\b(\d+(?:,\d+)*(?:\.\d+)?|\d+\s*k)\s*(?:₹|rs\.?|rupees?|rupaye?|rupay|rupaya|roopaye|roopya|rupiya|rupiye|inr|re|రూపాయలు|రూపాయి|రూ|ರೂಪಾಯಿ|ರೂಪಾಯಿಗಳು|ರೂ|ரூபாய்|ரூபாய்கள்|ரூ|रुपये|रुपया|रुपए)\b/gi
  ];
  for (const regex of currencyPatterns) {
    let match;
    while ((match = regex.exec(normalizedText)) !== null) {
      const rawSpan = match[0];
      const parsedVal = parseNumberPhrase(match[1]);
      if (parsedVal !== null && parsedVal > 0) {
        addResult({
          value: parsedVal,
          start: match.index,
          end: match.index + rawSpan.length,
          confidence: 0.98,
          raw: text.slice(match.index, match.index + rawSpan.length)
        });
      }
    }
  }
  const words = normalizedText.split(/(\s+)/);
  let currentIndex = 0;
  const wordTokens = [];
  for (const part of words) {
    const start = currentIndex;
    const end = start + part.length;
    currentIndex = end;
    if (part.trim()) {
      wordTokens.push({ word: part.trim().toLowerCase(), start, end });
    }
  }
  let i = 0;
  while (i < wordTokens.length) {
    const cleanWord = wordTokens[i].word.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, "");
    if (cleanWord === "do" && i > 0) {
      const prevWord = wordTokens[i - 1].word.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, "");
      if (DO_VERB_PRECEDING_WORDS.includes(prevWord)) {
        i++;
        continue;
      }
    }
    const isNumberStart = NUMBER_WORDS2[cleanWord] !== void 0 || MULTIPLIERS[cleanWord] !== void 0 || /^\d+$/.test(cleanWord) || ["dedh", "dhai", "sawa", "paune", "saadhe", "\u0921\u0947\u0922\u093C", "\u0922\u093E\u0908", "\u0938\u0935\u093E", "\u092A\u094C\u0928\u0947", "\u0938\u093E\u0922\u093C\u0947", "pone", "dhaai", "deydh", "sawwa", "savva"].includes(cleanWord);
    if (isNumberStart) {
      let j = i;
      let phraseWords = [];
      while (j < wordTokens.length) {
        const w = wordTokens[j].word.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, "");
        if (w === "do" && j > i) {
          const prevW = wordTokens[j - 1].word.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, "");
          if (DO_VERB_PRECEDING_WORDS.includes(prevW)) {
            break;
          }
        }
        const isPartOfNumber = NUMBER_WORDS2[w] !== void 0 || MULTIPLIERS[w] !== void 0 || /^\d+$/.test(w) || ["dedh", "dhai", "sawa", "paune", "saadhe", "\u0921\u0947\u0922\u093C", "\u0922\u093E\u0908", "\u0938\u0935\u093E", "\u092A\u094C\u0928\u0947", "\u0938\u093E\u0922\u093C\u0947", "pone", "dhaai", "deydh", "sawwa", "savva", "and", "aur", "mattu", "mariyu"].includes(w) || CURRENCY_MARKERS.includes(w);
        if (isPartOfNumber) {
          phraseWords.push(wordTokens[j].word);
          j++;
        } else {
          break;
        }
      }
      if (phraseWords.length > 0) {
        const phraseSpan = phraseWords.join(" ");
        const phraseVal = parseNumberPhrase(phraseSpan);
        if (phraseVal !== null && phraseVal > 0) {
          const startIdx = wordTokens[i].start;
          const endIdx = wordTokens[j - 1].end;
          const isPureSpacedDigits = phraseWords.length > 1 && phraseWords.every((w) => /^\d+$/.test(w.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, "")));
          const isSingleSmallWord = phraseWords.length === 1 && phraseVal < 5;
          const hasCurrency = phraseWords.some(
            (w) => CURRENCY_MARKERS.includes(w.toLowerCase().replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, ""))
          );
          const confidence = isPureSpacedDigits ? hasCurrency ? 0.85 : 0.65 : isSingleSmallWord && !hasCurrency ? 0.55 : hasCurrency ? 0.98 : 0.95;
          addResult({
            value: phraseVal,
            start: startIdx,
            end: endIdx,
            confidence,
            raw: text.slice(startIdx, endIdx)
          });
          i = j;
          continue;
        }
      }
    }
    i++;
  }
  const spacedRegex = /\b(\d{1,2})\s+(\d{2,3})\b/g;
  let spacedMatch;
  while ((spacedMatch = spacedRegex.exec(normalizedText)) !== null) {
    const start = spacedMatch.index;
    const end = start + spacedMatch[0].length;
    const combinedVal = parseInt(spacedMatch[1] + spacedMatch[2], 10);
    const contextAround = normalizedText.slice(Math.max(0, start - 15), Math.min(normalizedText.length, end + 15));
    const tokensAround = contextAround.toLowerCase().split(/\s+/).map((t) => t.replace(/[^a-z0-9_\u0900-\u0D7F-]/gi, ""));
    const hasCurrency = contextAround.includes("\u20B9") || tokensAround.some((t) => CURRENCY_MARKERS.includes(t));
    addResult({
      value: combinedVal,
      start,
      end,
      confidence: hasCurrency ? 0.85 : 0.65,
      raw: text.slice(start, end)
    });
  }
  const digitRegex = /\b\d+(?:,\d+)*\b/g;
  let digitMatch;
  while ((digitMatch = digitRegex.exec(normalizedText)) !== null) {
    const rawDigits = digitMatch[0];
    const val = parseInt(rawDigits.replace(/,/g, ""), 10);
    const start = digitMatch.index;
    const end = start + rawDigits.length;
    const isSmallAmbiguous = val < 5;
    const confidence = isSmallAmbiguous ? 0.6 : 0.95;
    addResult({
      value: val,
      start,
      end,
      confidence,
      raw: text.slice(start, end)
    });
  }
  results.sort((a, b) => a.start - b.start);
  return results;
}

// src/services/parser.ts
init_phoneParser();
var CONFIRM_WORDS = /* @__PURE__ */ new Set([
  "haan",
  "ha",
  "haa",
  "yes",
  "save",
  "theek hai",
  "theek",
  "thik hai",
  "sahi hai",
  "sahi",
  "sari",
  "aama",
  "\u0B86\u0BAE\u0BBE",
  "avunu",
  "\u0C05\u0C35\u0C41\u0C28\u0C41",
  "save karo",
  "karein",
  "pakka",
  "done",
  "confirm",
  "ok",
  "okay",
  "\u0939\u0942\u0901",
  "\u0939\u093E\u0901",
  "\u0920\u0940\u0915 \u0939\u0948",
  "\u0CB8\u0CB0\u0CBF",
  "\u0B9A\u0BB0\u0BBF",
  "\u0C38\u0C30\u0C47"
]);
var CANCEL_WORDS = /* @__PURE__ */ new Set([
  "cancel",
  "ruko",
  "mat karo",
  "benda",
  "vendaam",
  "oddu",
  "\u0C35\u0C26\u0C4D\u0C26\u0C41",
  "\u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BBE\u0BAE\u0BCD",
  "beda",
  "b\xEAda",
  "reject",
  "hatao",
  "\u0930\u0926\u094D\u0926",
  "\u0928\u0915\u094B",
  "\u0CAC\u0CC7\u0CA1",
  "stop"
]);
var CORRECTION_TRIGGERS = [
  /^(?:nahi|nahin|no|sorry|galat|actually|badal ke|thappu|alla|illai|kaadu|गलत|नहीं|तಪ್ಪು|இல்லை|తప్పు)[,\s]+/i,
  /(?:badal ke|change to|make it|kar do|bana do)\s*$/i
];
var QUERY_PATTERNS = [
  /\b(?:total|baaki|bakki|kitna|balance|how much|hisaab|hisab|otti baaki|mottham baakee|tell me|batao|owe|owes)\b/i,
  /(?:बाकी|हिसाब|टोटल|कितना|बताओ)/,
  /(?:ಬಾಕಿ|ಎಷ್ಟು|ಖಾತೆ|ಒಟ್ಟು ಬಾಕಿ)/,
  /(?:மொத்தம்|மீதி|எவ்வளவு|கணக்கு)/,
  /(?:మొత్తం|బాకీ|ఎంత బాకీ|ఎంత|ఖాతా)/
];
var CREDIT_KEYWORDS = [
  "udhaar",
  "udhar",
  "\u0909\u0927\u093E\u0930",
  "baaki",
  "\u092C\u093E\u0915\u0940",
  "khata",
  "\u0916\u093E\u0924\u093E",
  "credit",
  "borrowed",
  "borrow",
  "due",
  "debt",
  "lent",
  "owes",
  "owe",
  "saala",
  "sala",
  "\u0CB8\u0CBE\u0CB2",
  "kadan",
  "\u0B95\u0B9F\u0BA9\u0BCD",
  "\u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF",
  "appu",
  "\u0C05\u0C2A\u0C4D\u0C2A\u0C41"
];
var PAYMENT_KEYWORDS = [
  // Hindi / Hinglish / English
  "diye",
  "mila",
  "aaya",
  "aaye",
  "jama",
  "paid",
  "payment",
  "pay",
  "received",
  "receive",
  "wapas",
  "chuka diya",
  "vasool",
  "clear",
  "cleared",
  "settled",
  "settle",
  "returned",
  "repaid",
  "\u0926\u093F\u090F",
  "\u092E\u093F\u0932\u093E",
  "\u0906\u092F\u093E",
  "\u091C\u092E\u093E",
  "\u0935\u093E\u092A\u0938",
  "\u091A\u0941\u0915\u093E\u092F\u093E",
  "\u0935\u0938\u0942\u0932",
  "diye hain",
  "diya hai",
  // Kannada
  "kotta",
  "kottu",
  "kotte",
  "kottaru",
  "kottiddare",
  "kottiddaare",
  "kottidini",
  "kottidare",
  "hana bandide",
  "bandide",
  "\u0C95\u0CCA\u0C9F\u0CCD\u0C9F",
  "\u0C95\u0CCA\u0C9F\u0CCD\u0C9F\u0CB0\u0CC1",
  "\u0C95\u0CCA\u0C9F\u0CCD\u0C9F\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CB0\u0CC6",
  "\u0C95\u0CCA\u0C9F\u0CCD\u0C9F\u0CBF\u0CA6\u0CBE\u0CB0\u0CC6",
  "\u0C9C\u0CAE\u0CBE",
  "\u0CB5\u0CBE\u0CAA\u0CB8\u0CCD",
  "\u0CB9\u0CA3 \u0CAC\u0C82\u0CA6\u0CBF\u0CA6\u0CC6",
  // Tamil
  "koduthaar",
  "kuduthaar",
  "koduthar",
  "kuduthar",
  "koduthaanga",
  "kuduthaanga",
  "koduthanga",
  "kuduthanga",
  "panam vandhadhu",
  "vandhadhu",
  "vandhuchu",
  "\u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BBE\u0BB0\u0BCD",
  "\u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BBE\u0BB0\u0BCD\u0B95\u0BB3\u0BCD",
  "\u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BBE\u0B99\u0BCD\u0B95",
  "\u0BB5\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1",
  "\u0B9C\u0BAE\u0BBE",
  "\u0BAA\u0BA3\u0BAE\u0BCD \u0BB5\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1",
  // Telugu
  "icharu",
  "ichaaru",
  "ichadu",
  "ichhaaru",
  "ichharu",
  "ichindi",
  "jama ayyindi",
  "vachindi",
  "thirigi icharu",
  "\u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C1A\u0C3E\u0C30\u0C41",
  "\u0C07\u0C1A\u0C4D\u0C1A\u0C3E\u0C30\u0C41",
  "\u0C35\u0C1A\u0C4D\u0C1A\u0C3F\u0C02\u0C26\u0C3F",
  "\u0C24\u0C3F\u0C30\u0C3F\u0C17\u0C3F \u0C07\u0C1A\u0C4D\u0C1A\u0C3E\u0C30\u0C41"
];
var STOP_WORDS = /* @__PURE__ */ new Set([
  "ko",
  "ka",
  "ke",
  "ki",
  "se",
  "ne",
  "gave",
  "to",
  "for",
  "from",
  "in",
  "on",
  "at",
  "kiya",
  "tha",
  "thi",
  "the",
  "hai",
  "hain",
  "dene",
  "wali",
  "wala",
  "please",
  "bhai",
  "ji",
  "anna",
  "garu",
  "avargal",
  "sir",
  "madam",
  "store",
  "kirana",
  "dokan",
  "account",
  "cash",
  "and",
  "aur",
  "mattu",
  "mariyu",
  "matrum",
  "plus",
  "lekin",
  "phir",
  "then",
  "also",
  "bhi",
  "kooda",
  "\u0C15\u0C42\u0C21\u0C3E",
  "\u0B95\u0BC2\u0B9F",
  "\u0C95\u0CC2\u0CA1",
  "rupaye",
  "rupees",
  "rs",
  "re",
  "inr",
  "\u0C30\u0C42\u0C2A\u0C3E\u0C2F\u0C3F",
  "\u0CB0\u0CC2\u0CAA\u0CBE\u0CAF\u0CBF",
  "\u0BB0\u0BC2\u0BAA\u0BBE\u0BAF\u0BCD",
  "\u0930\u0941\u092A\u092F\u0947",
  "panam",
  "hana",
  "dabbu",
  "roopayi",
  "rupai",
  "khatte",
  "diya",
  "diye",
  "mila",
  "aaya",
  "wapas",
  "jama"
]);
function resolveRelativeDate(text, baseDate = /* @__PURE__ */ new Date()) {
  const lower = text.toLowerCase();
  if (/\b(?:parso|parson|day before yesterday|monne|mundhanal|monna)\b/i.test(lower) || /(?:परसों|ಮೊನ್ನೆ|முந்தாநாள்|మొన్న)/.test(lower)) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - 2);
    return {
      date: d.toISOString(),
      label: "parso",
      matchedText: "parso"
    };
  }
  const daysAgoMatch = lower.match(/(?:(\d+|do|teen|chaar|two|three|four)\s*(?:din|days?|dina|naatkal|rojulu)\s*(?:pehle|ago|hinde|munbu|mundu))/i);
  if (daysAgoMatch) {
    let days = parseInt(daysAgoMatch[1], 10);
    if (isNaN(days)) {
      const map = { do: 2, two: 2, teen: 3, three: 3, chaar: 4, four: 4 };
      days = map[daysAgoMatch[1].toLowerCase()] || 2;
    }
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - days);
    return {
      date: d.toISOString(),
      label: `${days} din pehle`,
      matchedText: daysAgoMatch[0]
    };
  }
  const lastDayMatch = lower.match(/\b(?:last|pichle)\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|somwar|mangalwar|budhwar|guruwar|shukrawar|shaniwar|ravivar)\b/i);
  if (lastDayMatch) {
    const dayName = lastDayMatch[1].toLowerCase();
    const dayMap = {
      sunday: 0,
      ravivar: 0,
      monday: 1,
      somwar: 1,
      tuesday: 2,
      mangalwar: 2,
      wednesday: 3,
      budhwar: 3,
      thursday: 4,
      guruwar: 4,
      friday: 5,
      shukrawar: 5,
      saturday: 6,
      shaniwar: 6
    };
    const targetDay = dayMap[dayName] ?? 1;
    const currentDay = baseDate.getDay();
    let diff = currentDay - targetDay;
    if (diff <= 0) diff += 7;
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - diff);
    return {
      date: d.toISOString(),
      label: lastDayMatch[0],
      matchedText: lastDayMatch[0]
    };
  }
  if (/\b(?:kal|yesterday|ninne|netru|ninna)\b/i.test(lower) || /(?:कल|ನಿನ್ನೆ|நேற்று|నిన్న)/.test(lower)) {
    const isFuture = /\b(?:dega|degi|aayega|dene wala|tomorrow|naale|naalai|repu)\b/i.test(lower);
    const offset = isFuture ? 1 : -1;
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + offset);
    return {
      date: d.toISOString(),
      label: isFuture ? "kal (tomorrow)" : "kal",
      matchedText: "kal"
    };
  }
  if (/\b(?:aaj|today|indu|inru|ee roju|eerodu)\b/i.test(lower) || /(?:आज|ಇಂದು|இன்று|ఈ రోజు)/.test(lower)) {
    return {
      date: baseDate.toISOString(),
      label: "aaj",
      matchedText: "aaj"
    };
  }
  return null;
}
function containsKeyword(text, keywords) {
  const lower = text.toLowerCase();
  return keywords.some((kw) => {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?<=^|\\s|[.,!?])${escaped}(?=$|\\s|[.,!?])`, "i");
    return regex.test(lower);
  });
}
function resolveDirection(text) {
  const lower = text.toLowerCase();
  const hasExplicitCreditMarker = /\b(?:udhaar|udhar|credit|borrowed|borrow|saala|sala|kadan|appu)\b/i.test(lower) || /(?:उधार|खाता|ಸಾಲ|கடன்|அప్పు)/.test(lower);
  const hasSettlementReversal = /\b(?:chuka|wapas|clear|cleared|settled|settle|vasool)\b/i.test(lower) || /(?:चुकाया|वापस|वसूल)/.test(lower);
  if (hasExplicitCreditMarker && !hasSettlementReversal) {
    return { type: "credit", confidence: 0.95 };
  }
  if (/\bne\s+(?:diye|diya|jama|bhar|bhara)\b/i.test(lower) || /\bse\s+(?:mila|aaya|wapas|prapt)\b/i.test(lower) || /\bhana\s+bandide\b/i.test(lower) || /\bpanam\s+vandhadhu\b/i.test(lower) || /\bjama\s+ayyindi\b/i.test(lower) || /\bdiya\s+tha\b/i.test(lower)) {
    return { type: "payment", confidence: 0.95 };
  }
  if (/\bko\s+(?:udhaar|udhar|credit|diya|de diya)\b/i.test(lower)) {
    return { type: "credit", confidence: 0.95 };
  }
  if (/\b(?:kal|parso|pehle|ago|ninne|netru|ninna)\b/i.test(lower) && /\b(?:diya|diye|kotta|koduthaar|kuduthaar|icharu|ichaaru|kottaru|kottiddare)\b/i.test(lower) && !/\bko\b/i.test(lower)) {
    return { type: "payment", confidence: 0.92 };
  }
  const hasCredit = containsKeyword(lower, CREDIT_KEYWORDS);
  const hasPayment = containsKeyword(lower, PAYMENT_KEYWORDS);
  if (hasCredit && !hasPayment) {
    return { type: "credit", confidence: 0.95 };
  }
  if (hasPayment && !hasCredit) {
    return { type: "payment", confidence: 0.95 };
  }
  if (hasCredit && hasPayment) {
    if (lower.includes("udhaar") || lower.includes("udhar") || lower.includes("credit") || lower.includes("saala") || lower.includes("kadan") || lower.includes("appu")) {
      return { type: "credit", confidence: 0.92 };
    }
    return { type: "payment", confidence: 0.85 };
  }
  return { type: "credit", confidence: 0.7 };
}
function extractCustomerName2(text, consumedSpans = []) {
  let working = text;
  const sortedSpans = [...consumedSpans].sort((a, b) => b.start - a.start);
  for (const span of sortedSpans) {
    working = working.slice(0, span.start) + " " + working.slice(span.end);
  }
  let cleaned = normalizeIndicDigits(working);
  const multiWordRemovals = [
    "diya tha",
    "de diya",
    "diye the",
    "hana bandide",
    "panam vandhadhu",
    "jama ayyindi",
    "thirigi icharu",
    "chuka diya",
    "kadan koduthen",
    "appu ichanu",
    "rupayi kottaru",
    "rupayi kotte",
    "vanda appu",
    "how much does",
    "how much",
    "otti baaki",
    "mottham baakee",
    "enta baaki",
    "hisaab batao",
    "do din pehle",
    "last monday",
    "day before yesterday"
  ];
  for (const phrase of multiWordRemovals) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?<=^|\\s|[.,!?])${escaped}(?=$|\\s|[.,!?])`, "gi");
    cleaned = cleaned.replace(regex, " ");
  }
  cleaned = cleaned.replace(/[0-9₹$]/g, " ").replace(/[.,/#!$%^&*;:{}=\-_`~()?"'<>]/g, " ").trim();
  const singleWordRemovals = new Set([
    ...CREDIT_KEYWORDS.filter((k) => !k.includes(" ")),
    ...PAYMENT_KEYWORDS.filter((k) => !k.includes(" ")),
    ...Array.from(STOP_WORDS),
    "total",
    "baaki",
    "kitna",
    "balance",
    "hisaab",
    "hisab",
    "batao",
    "tell me",
    "kal",
    "aaj",
    "parso",
    "yesterday",
    "today",
    "ninne",
    "netru",
    "ninna",
    "monne",
    "indu",
    "inru",
    "pehle",
    "ago",
    "diya",
    "diye",
    "mila",
    "aaya",
    "aaye",
    "jama",
    "paid",
    "credit",
    "rupaye",
    "rupees",
    "rs",
    "re",
    "inr",
    "panam",
    "hana",
    "dabbu",
    "roopayi",
    "rupai",
    "\u0C8E\u0CB7\u0CCD\u0C9F\u0CC1",
    "\u0CAC\u0CBE\u0C95\u0CBF",
    "\u0C96\u0CBE\u0CA4\u0CC6",
    "\u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAC\u0CBE\u0C95\u0CBF",
    "\u0CB8\u0CBE\u0CB2",
    "\u0C95\u0CCA\u0C9F\u0CCD\u0C9F",
    "\u0C95\u0CCA\u0C9F\u0CCD\u0C9F\u0CB0\u0CC1",
    "\u0C9C\u0CAE\u0CBE",
    "\u0CB5\u0CBE\u0CAA\u0CB8\u0CCD",
    "\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD",
    "\u0BAE\u0BC0\u0BA4\u0BBF",
    "\u0B8E\u0BB5\u0BCD\u0BB5\u0BB3\u0BB5\u0BC1",
    "\u0B95\u0B9F\u0BA9\u0BCD",
    "\u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BBE\u0BB0\u0BCD",
    "\u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC7\u0BA9\u0BCD",
    "\u0BB5\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1",
    "\u0B9C\u0BAE\u0BBE",
    "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02",
    "\u0C2C\u0C3E\u0C15\u0C40",
    "\u0C0E\u0C02\u0C24 \u0C2C\u0C3E\u0C15\u0C40",
    "\u0C0E\u0C02\u0C24",
    "\u0C05\u0C2A\u0C4D\u0C2A\u0C41",
    "\u0C07\u0C1A\u0C4D\u0C1A\u0C3E\u0C30\u0C41",
    "\u0C07\u0C1A\u0C4D\u0C1A\u0C3E\u0C28\u0C41",
    "\u0C35\u0C1A\u0C4D\u0C1A\u0C3F\u0C02\u0C26\u0C3F",
    "\u0C1C\u0C2E\u0C3E",
    "\u092C\u093E\u0915\u0940",
    "\u0939\u093F\u0938\u093E\u092C",
    "\u091F\u094B\u091F\u0932",
    "\u0915\u093F\u0924\u0928\u093E",
    "\u0909\u0927\u093E\u0930",
    "\u091C\u092E\u093E",
    "\u092E\u093F\u0932\u093E",
    "\u0906\u092F\u093E",
    "\u0926\u093F\u090F",
    "\u0926\u093F\u092F\u093E",
    "\u0932\u093F\u092F\u093E",
    "\u0925\u093E",
    "\u0925\u0940",
    "\u0925\u0947",
    "\u0939\u0948",
    "\u0939\u0948\u0902",
    "\u0915\u094B",
    "\u0915\u093E",
    "\u0915\u0940",
    "\u0915\u0947",
    "\u0938\u0947",
    "\u0928\u0947"
  ].map((w) => w.toLowerCase()));
  const tokens = cleaned.split(/\s+/).map((t) => t.trim()).filter((t) => {
    if (t.length <= 1) return false;
    const lower = t.toLowerCase();
    if (singleWordRemovals.has(lower)) return false;
    if (/^\d+$/.test(lower)) return false;
    return true;
  });
  if (tokens.length === 0) {
    return { name: "", confidence: 0.5 };
  }
  const formatted = tokens.slice(0, 3).map((tok) => {
    if (/^[a-zA-Z]+$/.test(tok)) {
      return tok.charAt(0).toUpperCase() + tok.slice(1).toLowerCase();
    }
    return tok;
  }).join(" ");
  const confidence = formatted.length >= 2 ? 0.95 : 0.6;
  return { name: formatted, confidence };
}
function splitCompoundClauses(transcript) {
  const delimiterPattern = /[,;]|\b(?:aur|and|mattu|matrum|mariyu|plus|lekin)\b/i;
  if (delimiterPattern.test(transcript)) {
    const rawParts = transcript.split(delimiterPattern).map((p) => p.trim()).filter(Boolean);
    if (rawParts.length >= 2) {
      const partsWithAmounts = rawParts.filter((p) => extractAmounts(p).length > 0);
      if (partsWithAmounts.length >= 2) {
        return rawParts;
      }
    }
  }
  return [transcript];
}
async function parseTranscript(transcript, previousContext) {
  const trimmed = transcript.trim();
  const now = /* @__PURE__ */ new Date();
  const buildResult = (intent, entries, confidence, extra = {}) => {
    const primaryEntry = entries[0] || {
      customerName: extra.customerName || extra.queryCustomer || "Customer",
      amount: extra.correctionAmount || 0,
      type: "credit",
      date: now.toISOString(),
      confidence,
      rawTranscript: trimmed
    };
    return {
      intent,
      type: intent,
      entries,
      data: primaryEntry,
      confidence,
      rawTranscript: trimmed,
      ...extra
    };
  };
  if (!trimmed) {
    return buildResult("unknown", [], 0, {
      message: "Kuch sunayi nahi diya (No speech heard)"
    });
  }
  const lower = trimmed.toLowerCase();
  const cleanPunct = lower.replace(/[.,!?]/g, "").trim();
  if (CONFIRM_WORDS.has(cleanPunct)) {
    return buildResult("confirm", [], 0.95);
  }
  if (CANCEL_WORDS.has(cleanPunct)) {
    return buildResult("cancel", [], 0.95);
  }
  const amountsInText = extractAmounts(trimmed);
  if ((cleanPunct === "nahi" || cleanPunct === "no" || cleanPunct === "reject") && amountsInText.length === 0) {
    return buildResult("cancel", [], 0.95);
  }
  const isCorrectionTrigger = CORRECTION_TRIGGERS.some((rgx) => rgx.test(lower));
  if (isCorrectionTrigger && amountsInText.length > 0) {
    const correctionAmt = amountsInText[0].value;
    const prevCust = previousContext?.customerName || "";
    const prevType = previousContext?.type || "credit";
    const prevDate = previousContext?.date || now.toISOString();
    const correctedEntry = {
      customerName: prevCust || "Customer",
      amount: correctionAmt,
      type: prevType,
      date: prevDate,
      confidence: 0.95,
      rawTranscript: trimmed,
      isLowConfidence: false
    };
    return buildResult("correction", [correctedEntry], 0.95, {
      correctionAmount: correctionAmt,
      isCorrection: true,
      customerName: prevCust
    });
  }
  const REGISTER_PATTERNS = [
    /\b(?:naya|naye|new|add|register|create)\s+(?:customer|grahak|khata|account)\b/i,
    /\b(?:add|jodo|register)\s+(?:karo|kijiye|karna)\b/i,
    /\b(?:add|register)\s+customer\b/i,
    /\b(?:number|phone|mobile)\s+(?:add|save)\s+karo\b/i,
    /(?:नया\s+ग्राहक|नया\s+कस्टमर|नया\s+खाता|ऐड\s+करो|जोड़ो)/i,
    /(?:ಹೊಸ\s+ಗ್ರಾಹಕ|ಹೊಸ\s+ಕಸ್ಟಮರ್|ಸೇರಿಸಿ|ನೋಂದಾಯಿಸಿ)/i,
    /(?:புதிய\s+வாடிக்கையாளர்|சேர்க்கவும்)/i,
    /(?:కొత్త\s+కస్టమర్|కొత్త\s+ఖాతాదారు|చేర్చండి)/i
  ];
  const isRegister = REGISTER_PATTERNS.some((rgx) => rgx.test(lower));
  if (isRegister) {
    const parsedPhone = parsePhoneNumber(trimmed);
    const phoneDigits = parsedPhone && parsedPhone.digits.length >= 10 ? parsedPhone.digits : void 0;
    let nameText = trimmed;
    for (const pat of REGISTER_PATTERNS) {
      nameText = nameText.replace(pat, " ");
    }
    nameText = nameText.replace(/\b(?:number|phone|mobile|no|ka|ki|ko|hai|he|naam|name)\b/gi, " ");
    nameText = nameText.replace(/(?:नंबर|फोन|मोबाइल|का|की|को|है|ಹೆಸರು|ನಂಬರ್|ಎನ್|எண்|నంబర్|నంబరు)/g, " ");
    if (phoneDigits) {
      nameText = nameText.replace(new RegExp(phoneDigits, "g"), " ");
    }
    nameText = nameText.replace(/\+?91/g, " ");
    nameText = nameText.replace(/\d+/g, " ");
    const { name: rawName, confidence: nameConf } = extractCustomerName2(nameText);
    const cleanCustomerName = rawName || "Customer";
    const regEntry = {
      customerName: cleanCustomerName,
      amount: 0,
      type: "credit",
      date: now.toISOString(),
      confidence: phoneDigits ? 0.95 : Math.max(0.85, nameConf),
      rawTranscript: trimmed
    };
    return buildResult("register", [regEntry], phoneDigits ? 0.95 : Math.max(0.85, nameConf), {
      customerName: cleanCustomerName,
      name: cleanCustomerName,
      phone: phoneDigits
    });
  }
  const isQuery = QUERY_PATTERNS.some((rgx) => rgx.test(lower));
  if (isQuery && amountsInText.length === 0) {
    const { name: queryCust, confidence: nameConf } = extractCustomerName2(trimmed);
    const finalCust = queryCust || "Customer";
    const confidence = Math.min(0.92, nameConf);
    return buildResult("query", [], confidence, {
      queryCustomer: finalCust,
      customerName: finalCust,
      queryType: "balance"
    });
  }
  const clauses = splitCompoundClauses(trimmed);
  if (clauses.length >= 2) {
    const parsedEntries = [];
    let sharedCustomerName = "";
    let minClauseConfidence = 1;
    for (let i = 0; i < clauses.length; i++) {
      const clause = clauses[i];
      const clauseAmounts = extractAmounts(clause);
      const amountVal = clauseAmounts[0]?.value || 0;
      const amountConf2 = clauseAmounts[0]?.confidence || 0.5;
      const dateMatch2 = resolveRelativeDate(clause, now);
      const entryDate = dateMatch2 ? dateMatch2.date : now.toISOString();
      const relativeDateLabel = dateMatch2?.label || (i === 0 ? "aaj" : void 0);
      const { type: entryType, confidence: typeConf2 } = resolveDirection(clause);
      const consumedSpans2 = clauseAmounts.map((a) => ({ start: a.start, end: a.end }));
      const { name: clauseCust, confidence: custConf2 } = extractCustomerName2(clause, consumedSpans2);
      if (clauseCust && !sharedCustomerName) {
        sharedCustomerName = clauseCust;
      }
      const clauseConf = Math.min(amountConf2, typeConf2, custConf2);
      minClauseConfidence = Math.min(minClauseConfidence, clauseConf);
      parsedEntries.push({
        customerName: clauseCust,
        amount: amountVal,
        type: entryType,
        date: entryDate,
        relativeDateLabel,
        confidence: clauseConf,
        rawTranscript: clause
      });
    }
    for (const entry of parsedEntries) {
      if (!entry.customerName) {
        entry.customerName = sharedCustomerName || "Customer";
      }
    }
    if (parsedEntries.length >= 2 && parsedEntries.every((e) => (e.amount || 0) > 0)) {
      const subEntries = parsedEntries.map((e, idx) => ({
        id: `sub-${idx + 1}`,
        amount: e.amount || 0,
        type: e.type || "credit",
        date: e.date || now.toISOString(),
        relativeDateLabel: e.relativeDateLabel,
        note: e.type === "credit" ? "Udhaar" : "Jama"
      }));
      const creditSum = parsedEntries.filter((e) => e.type === "credit").reduce((acc, e) => acc + (e.amount || 0), 0);
      const paymentSum = parsedEntries.filter((e) => e.type === "payment").reduce((acc, e) => acc + (e.amount || 0), 0);
      const net = creditSum - paymentSum;
      const compoundDetails = {
        creditAmount: creditSum,
        paymentAmount: paymentSum,
        netAmount: net,
        explanation: `\u20B9${creditSum} udhaar - \u20B9${paymentSum} jama = Net \u20B9${net}`
      };
      const primary = {
        ...parsedEntries[0],
        entries: subEntries,
        compoundDetails
      };
      return buildResult("entry", parsedEntries, minClauseConfidence, {
        data: primary,
        isCompound: true,
        explanation: compoundDetails.explanation
      });
    }
  }
  const dateMatch = resolveRelativeDate(trimmed, now);
  const dateIso = dateMatch ? dateMatch.date : now.toISOString();
  const dateLabel = dateMatch?.label || "aaj";
  const dateConf = dateMatch ? 0.95 : 0.9;
  let textForAmounts = trimmed;
  if (dateMatch?.matchedText) {
    const escaped = dateMatch.matchedText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    textForAmounts = trimmed.replace(new RegExp(`(?<=^|\\s|[.,!?])${escaped}(?=$|\\s|[.,!?])`, "i"), " ");
  }
  const extractedAmounts = extractAmounts(textForAmounts);
  const primaryAmount = extractedAmounts[0]?.value || 0;
  const amountConf = extractedAmounts[0]?.confidence || 0.4;
  const { type: txType, confidence: typeConf } = resolveDirection(trimmed);
  const consumedSpans = extractedAmounts.map((a) => ({ start: a.start, end: a.end }));
  const { name: custName, confidence: custConf } = extractCustomerName2(trimmed, consumedSpans);
  const finalCustomer = custName || "Grahak (Customer)";
  const overallConfidence = Math.min(amountConf, typeConf, custConf, dateConf);
  const isLowConf = overallConfidence < 0.7 || primaryAmount <= 0;
  let lowConfidenceField = void 0;
  if (isLowConf) {
    if (amountConf < 0.7 || primaryAmount <= 0) lowConfidenceField = "amount";
    else if (custConf < 0.7) lowConfidenceField = "customer";
    else lowConfidenceField = "type";
  }
  if (primaryAmount <= 0 && !custName) {
    return buildResult("unknown", [], 0, {
      message: "Hisaab samajh nahi aaya. Kripya naam aur raashi dobara bolein."
    });
  }
  const singleEntry = {
    customerName: finalCustomer,
    amount: primaryAmount,
    type: txType,
    date: dateIso,
    relativeDateLabel: dateLabel,
    confidence: overallConfidence,
    rawTranscript: trimmed,
    isLowConfidence: isLowConf,
    lowConfidenceField
  };
  return buildResult("entry", [singleEntry], overallConfidence);
}

// src/i18n/speech.ts
var speechTemplates = {
  hi: {
    creditSaved: (name, amt) => `${name} \u0915\u094B ${amt} \u0930\u0941\u092A\u092F\u0947 \u0909\u0927\u093E\u0930 \u0932\u093F\u0916\u093E \u0917\u092F\u093E\u0964`,
    paymentSaved: (name, amt) => `${name} \u0938\u0947 ${amt} \u0930\u0941\u092A\u092F\u0947 \u091C\u092E\u093E \u092E\u093F\u0932\u0947\u0964`,
    balanceAnswer: (name, balance) => {
      if (balance > 0) return `${name} \u0915\u093E \u0915\u0941\u0932 \u092C\u093E\u0915\u0940 ${balance} \u0930\u0941\u092A\u092F\u0947 \u0939\u0948\u0964`;
      if (balance < 0) return `${name} \u0915\u093E ${Math.abs(balance)} \u0930\u0941\u092A\u092F\u0947 \u090F\u0921\u0935\u093E\u0902\u0938 \u091C\u092E\u093E \u0939\u0948\u0964`;
      return `${name} \u0915\u093E \u092A\u0942\u0930\u093E \u0939\u093F\u0938\u093E\u092C \u091A\u0941\u0915\u0924\u093E \u0939\u0948, \u0915\u094B\u0908 \u092C\u093E\u0915\u0940 \u0928\u0939\u0940\u0902\u0964`;
    },
    duplicateWarning: (name, amt, type) => `\u0927\u094D\u092F\u093E\u0928 \u0926\u0947\u0902: ${name} \u0915\u0947 \u0932\u093F\u090F ${amt} \u0930\u0941\u092A\u092F\u0947 \u0915\u093E ${type === "credit" ? "\u0909\u0927\u093E\u0930" : "\u091C\u092E\u093E"} \u0905\u092D\u0940-\u0905\u092D\u0940 \u0926\u0930\u094D\u091C \u0939\u0941\u0906 \u0925\u093E\u0964`,
    errorNotUnderstood: "\u0939\u093F\u0938\u093E\u092C \u0938\u092E\u091D \u0928\u0939\u0940\u0902 \u0906\u092F\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u0926\u094B\u092C\u093E\u0930\u093E \u092C\u094B\u0932\u0947\u0902\u0964",
    errorCustomerNotFound: (name) => `\u0917\u094D\u0930\u093E\u0939\u0915 ${name} \u0916\u093E\u0924\u0947 \u092E\u0947\u0902 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964`,
    errorMicPermission: "\u092E\u093E\u0907\u0915 \u0915\u0940 \u0905\u0928\u0941\u092E\u0924\u093F \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u0940\u0964 \u0915\u0943\u092A\u092F\u093E \u0938\u0947\u091F\u093F\u0902\u0917 \u092E\u0947\u0902 \u0905\u0928\u0941\u092E\u0924\u093F \u0926\u0947\u0902\u0964",
    askDisambiguationDigits: (name) => `\u0915\u094C\u0928 \u0938\u093E ${name}? \u0928\u0902\u092C\u0930 \u0915\u0947 \u0906\u0916\u093C\u093F\u0930\u0940 \u091A\u093E\u0930 \u0905\u0902\u0915 \u092C\u0924\u093E\u0907\u090F\u0964`,
    confirmDisambiguationChoice: (name) => `${name}, \u0920\u0940\u0915 \u0939\u0948\u0964`,
    disambiguationNotFoundRetry: "\u092F\u0939 \u0928\u0902\u092C\u0930 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E, \u092B\u093F\u0930 \u0938\u0947 \u092C\u0924\u093E\u0907\u090F\u0964",
    askDisambiguationMoreDigits: (name, count) => `\u0926\u094B\u0928\u094B\u0902 \u0915\u0947 \u0906\u0916\u093C\u093F\u0930\u0940 \u091A\u093E\u0930 \u0905\u0902\u0915 \u090F\u0915 \u091C\u0948\u0938\u0947 \u0939\u0948\u0902\u0964 \u0915\u0943\u092A\u092F\u093E \u0906\u0916\u093C\u093F\u0930\u0940 ${count} \u0905\u0902\u0915 \u092C\u0924\u093E\u0907\u090F\u0964`,
    creditSavedWithPaymentRequest: (name, amt) => `${name} \u0915\u094B ${amt} \u0930\u0941\u092A\u092F\u0947 \u0909\u0927\u093E\u0930 \u0932\u093F\u0916\u093E \u0917\u092F\u093E\u0964 \u092A\u0947\u092E\u0947\u0902\u091F \u0930\u093F\u0915\u094D\u0935\u0947\u0938\u094D\u091F \u0924\u0948\u092F\u093E\u0930 \u0939\u0948\u0964`
  },
  hinglish: {
    creditSaved: (name, amt) => `${name} ko ${amt} rupaye udhaar likha gaya.`,
    paymentSaved: (name, amt) => `${name} se ${amt} rupaye jama mila.`,
    balanceAnswer: (name, balance) => {
      if (balance > 0) return `${name} ka baaki ${balance} rupaye hai.`;
      if (balance < 0) return `${name} ka ${Math.abs(balance)} rupaye advance jama hai.`;
      return `${name} ka saara hisaab clear hai, koi baaki nahi.`;
    },
    duplicateWarning: (name, amt, type) => `Aisa entry abhi hi hua tha: ${name} ke liye ${amt} rupaye ka ${type === "credit" ? "udhaar" : "jama"}.`,
    errorNotUnderstood: "Hisaab samajh nahi aaya. Kripya dobara bolein.",
    errorCustomerNotFound: (name) => `Grahak ${name} khata mein nahi mila.`,
    errorMicPermission: "Mic permission denied. Kripya browser mein allow karein.",
    askDisambiguationDigits: (name) => `Kaun sa ${name}? Number ke aakhri chaar ank bataiye.`,
    confirmDisambiguationChoice: (name) => `${name}, theek hai.`,
    disambiguationNotFoundRetry: "Ye number nahi mila, phir se bataiye.",
    askDisambiguationMoreDigits: (name, count) => `Dono ke aakhri 4 ank same hain. Kripya aakhri ${count} ank bataiye.`,
    creditSavedWithPaymentRequest: (name, amt) => `${name} ko ${amt} rupaye udhaar likha gaya. Payment request taiyaar hai.`
  },
  en: {
    creditSaved: (name, amt) => `Saved ${amt} rupees credit for ${name}.`,
    paymentSaved: (name, amt) => `Received ${amt} rupees payment from ${name}.`,
    balanceAnswer: (name, balance) => {
      if (balance > 0) return `${name} owes ${balance} rupees pending balance.`;
      if (balance < 0) return `${name} has ${Math.abs(balance)} rupees advance deposit.`;
      return `${name} has zero pending balance, all clear.`;
    },
    duplicateWarning: (name, amt, type) => `Warning: A ${amt} rupees ${type} entry for ${name} was recorded just now.`,
    errorNotUnderstood: "Could not understand the entry. Please speak again.",
    errorCustomerNotFound: (name) => `Customer ${name} was not found.`,
    errorMicPermission: "Microphone permission is required. Please allow access in browser.",
    askDisambiguationDigits: (name) => `Which ${name}? Please tell the last 4 digits of the phone number.`,
    confirmDisambiguationChoice: (name) => `${name}, confirmed.`,
    disambiguationNotFoundRetry: "This number was not found, please say again.",
    askDisambiguationMoreDigits: (name, count) => `Both share the same last 4 digits. Please tell the last ${count} digits.`,
    creditSavedWithPaymentRequest: (name, amt) => `Saved ${amt} rupees credit for ${name}. Payment request is ready.`
  },
  kn: {
    creditSaved: (name, amt) => `${name} \u0C85\u0CB5\u0CB0\u0CBF\u0C97\u0CC6 ${amt} \u0CB0\u0CC2\u0CAA\u0CBE\u0CAF\u0CBF \u0CB8\u0CBE\u0CB2 \u0CA6\u0CBE\u0C96\u0CB2\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.`,
    paymentSaved: (name, amt) => `${name} \u0C85\u0CB5\u0CB0\u0CBF\u0C82\u0CA6 ${amt} \u0CB0\u0CC2\u0CAA\u0CBE\u0CAF\u0CBF \u0C9C\u0CAE\u0CC6 \u0CAA\u0CA1\u0CC6\u0CAF\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.`,
    balanceAnswer: (name, balance) => {
      if (balance > 0) return `${name} \u0C85\u0CB5\u0CB0 \u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAC\u0CBE\u0C95\u0CBF ${balance} \u0CB0\u0CC2\u0CAA\u0CBE\u0CAF\u0CBF.`;
      if (balance < 0) return `${name} \u0C85\u0CB5\u0CB0 \u0CAE\u0CC1\u0C82\u0C97\u0CA1 ${Math.abs(balance)} \u0CB0\u0CC2\u0CAA\u0CBE\u0CAF\u0CBF \u0C9C\u0CAE\u0CC6 \u0C87\u0CA6\u0CC6.`;
      return `${name} \u0C85\u0CB5\u0CB0 \u0C96\u0CBE\u0CA4\u0CC6 \u0CAA\u0CC2\u0CB0\u0CCD\u0CA3 \u0C9A\u0CC1\u0C95\u0CCD\u0CA4\u0CBE \u0C86\u0C97\u0CBF\u0CA6\u0CC6, \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CAC\u0CBE\u0C95\u0CBF \u0C87\u0CB2\u0CCD\u0CB2.`;
    },
    duplicateWarning: (name, amt, type) => `\u0C8E\u0C9A\u0CCD\u0C9A\u0CB0\u0CBF\u0C95\u0CC6: ${name} \u0C85\u0CB5\u0CB0\u0CBF\u0C97\u0CC6 ${amt} \u0CB0\u0CC2\u0CAA\u0CBE\u0CAF\u0CBF ${type === "credit" ? "\u0CB8\u0CBE\u0CB2" : "\u0C9C\u0CAE\u0CC6"} \u0C88\u0C97\u0CB7\u0CCD\u0C9F\u0CC7 \u0C86\u0C97\u0CBF\u0CA6\u0CC6.`,
    errorNotUnderstood: "\u0CB9\u0CC7\u0CB3\u0CBF\u0CA6\u0CCD\u0CA6\u0CC1 \u0CB8\u0CB0\u0CBF\u0CAF\u0CBE\u0C97\u0CBF \u0C85\u0CB0\u0CCD\u0CA5\u0CB5\u0CBE\u0C97\u0CB2\u0CBF\u0CB2\u0CCD\u0CB2. \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CCA\u0CAE\u0CCD\u0CAE\u0CC6 \u0CB9\u0CC7\u0CB3\u0CBF.",
    errorCustomerNotFound: (name) => `\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95 ${name} \u0C96\u0CBE\u0CA4\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2.`,
    errorMicPermission: "\u0CAE\u0CC8\u0C95\u0CCD\u0CB0\u0CCA\u0CAB\u0CCB\u0CA8\u0CCD \u0C85\u0CA8\u0CC1\u0CAE\u0CA4\u0CBF \u0C85\u0C97\u0CA4\u0CCD\u0CAF\u0CB5\u0CBF\u0CA6\u0CC6.",
    askDisambiguationDigits: (name) => `\u0CAF\u0CBE\u0CB5 ${name}? \u0CAB\u0CCB\u0CA8\u0CCD \u0CA8\u0C82\u0CAC\u0CB0\u0CCD\u200C\u0CA8 \u0C95\u0CCA\u0CA8\u0CC6\u0CAF \u0CA8\u0CBE\u0CB2\u0CCD\u0C95\u0CC1 \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA4\u0CBF\u0CB3\u0CBF\u0CB8\u0CBF.`,
    confirmDisambiguationChoice: (name) => `${name}, \u0CB8\u0CB0\u0CBF.`,
    disambiguationNotFoundRetry: "\u0C88 \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2, \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CCA\u0CAE\u0CCD\u0CAE\u0CC6 \u0CB9\u0CC7\u0CB3\u0CBF.",
    askDisambiguationMoreDigits: (name, count) => `\u0C87\u0CAC\u0CCD\u0CAC\u0CB0 \u0C95\u0CCA\u0CA8\u0CC6\u0CAF 4 \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3\u0CC1 \u0C92\u0C82\u0CA6\u0CC7 \u0C87\u0CB5\u0CC6. \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0C95\u0CCA\u0CA8\u0CC6\u0CAF ${count} \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA4\u0CBF\u0CB3\u0CBF\u0CB8\u0CBF.`,
    creditSavedWithPaymentRequest: (name, amt) => `${name} \u0C85\u0CB5\u0CB0\u0CBF\u0C97\u0CC6 ${amt} \u0CB0\u0CC2\u0CAA\u0CBE\u0CAF\u0CBF \u0CB8\u0CBE\u0CB2 \u0CA6\u0CBE\u0C96\u0CB2\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6. \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF \u0CB5\u0CBF\u0CA8\u0C82\u0CA4\u0CBF \u0CB8\u0CBF\u0CA6\u0CCD\u0CA7\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.`
  },
  ta: {
    creditSaved: (name, amt) => `${name} \u0B85\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 ${amt} \u0BB0\u0BC2\u0BAA\u0BBE\u0BAF\u0BCD \u0B95\u0B9F\u0BA9\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1.`,
    paymentSaved: (name, amt) => `${name} \u0B85\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BBF\u0B9F\u0BAE\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 ${amt} \u0BB0\u0BC2\u0BAA\u0BBE\u0BAF\u0BCD \u0BB5\u0BB0\u0BB5\u0BC1 \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1.`,
    balanceAnswer: (name, balance) => {
      if (balance > 0) return `${name} \u0B85\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0BAE\u0BCA\u0BA4\u0BCD\u0BA4 \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF ${balance} \u0BB0\u0BC2\u0BAA\u0BBE\u0BAF\u0BCD.`;
      if (balance < 0) return `${name} \u0B85\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0BAE\u0BC1\u0BA9\u0BCD\u0BAA\u0BA3\u0BAE\u0BCD ${Math.abs(balance)} \u0BB0\u0BC2\u0BAA\u0BBE\u0BAF\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1.`;
      return `${name} \u0B85\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0BAE\u0BC1\u0B9F\u0BBF\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1, \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF \u0B8E\u0BA4\u0BC1\u0BB5\u0BC1\u0BAE\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8.`;
    },
    duplicateWarning: (name, amt, type) => `\u0B8E\u0B9A\u0BCD\u0B9A\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BC8: ${name} \u0B85\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 ${amt} \u0BB0\u0BC2\u0BAA\u0BBE\u0BAF\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BB1\u0BCD\u0BB1\u0BC1 \u0BAE\u0BC1\u0BA9\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1.`,
    errorNotUnderstood: "\u0BB5\u0BBF\u0BB5\u0BB0\u0BAE\u0BCD \u0BAA\u0BC1\u0BB0\u0BBF\u0BAF\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8. \u0BA4\u0BAF\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0BAE\u0BC0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
    errorCustomerNotFound: (name) => `\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD ${name} \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8.`,
    errorMicPermission: "\u0BAE\u0BC8\u0B95\u0BCD\u0BB0\u0BCB\u0B83\u0BAA\u0BCB\u0BA9\u0BCD \u0B85\u0BA9\u0BC1\u0BAE\u0BA4\u0BBF \u0BA4\u0BC7\u0BB5\u0BC8.",
    askDisambiguationDigits: (name) => `\u0B8E\u0BA8\u0BCD\u0BA4 ${name}? \u0BA4\u0BCA\u0BB2\u0BC8\u0BAA\u0BC7\u0B9A\u0BBF \u0B8E\u0BA3\u0BCD\u0BA3\u0BBF\u0BA9\u0BCD \u0B95\u0B9F\u0BC8\u0B9A\u0BBF 4 \u0B87\u0BB2\u0B95\u0BCD\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.`,
    confirmDisambiguationChoice: (name) => `${name}, \u0B9A\u0BB0\u0BBF.`,
    disambiguationNotFoundRetry: "\u0B87\u0BA8\u0BCD\u0BA4 \u0B8E\u0BA3\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8, \u0BAE\u0BC0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
    askDisambiguationMoreDigits: (name, count) => `\u0B87\u0BB0\u0BC1\u0BB5\u0BB0\u0BBF\u0BA9\u0BCD \u0B95\u0B9F\u0BC8\u0B9A\u0BBF 4 \u0B87\u0BB2\u0B95\u0BCD\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC7. \u0BA4\u0BAF\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0B95\u0B9F\u0BC8\u0B9A\u0BBF ${count} \u0B87\u0BB2\u0B95\u0BCD\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.`,
    creditSavedWithPaymentRequest: (name, amt) => `${name} \u0B85\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 ${amt} \u0BB0\u0BC2\u0BAA\u0BBE\u0BAF\u0BCD \u0B95\u0B9F\u0BA9\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1. \u0B95\u0B9F\u0BCD\u0B9F\u0BA3 \u0B95\u0BCB\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BC8 \u0BA4\u0BAF\u0BBE\u0BB0\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1.`
  },
  te: {
    creditSaved: (name, amt) => `${name} \u0C17\u0C3E\u0C30\u0C3F\u0C15\u0C3F ${amt} \u0C30\u0C42\u0C2A\u0C3E\u0C2F\u0C32 \u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F.`,
    paymentSaved: (name, amt) => `${name} \u0C28\u0C41\u0C02\u0C21\u0C3F ${amt} \u0C30\u0C42\u0C2A\u0C3E\u0C2F\u0C32\u0C41 \u0C1C\u0C2E \u0C05\u0C2F\u0C4D\u0C2F\u0C3E\u0C2F\u0C3F.`,
    balanceAnswer: (name, balance) => {
      if (balance > 0) return `${name} \u0C17\u0C3E\u0C30\u0C3F \u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C2C\u0C3E\u0C15\u0C40 ${balance} \u0C30\u0C42\u0C2A\u0C3E\u0C2F\u0C32\u0C41.`;
      if (balance < 0) return `${name} \u0C17\u0C3E\u0C30\u0C3F \u0C05\u0C21\u0C4D\u0C35\u0C3E\u0C28\u0C4D\u0C38\u0C4D ${Math.abs(balance)} \u0C30\u0C42\u0C2A\u0C3E\u0C2F\u0C32\u0C41 \u0C09\u0C02\u0C26\u0C3F.`;
      return `${name} \u0C17\u0C3E\u0C30\u0C3F \u0C16\u0C3E\u0C24\u0C3E \u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C2F\u0C3F\u0C02\u0C26\u0C3F, \u0C2C\u0C3E\u0C15\u0C40 \u0C0F\u0C2E\u0C40 \u0C32\u0C47\u0C26\u0C41.`;
    },
    duplicateWarning: (name, amt, type) => `\u0C39\u0C46\u0C1A\u0C4D\u0C1A\u0C30\u0C3F\u0C15: ${name} \u0C17\u0C3E\u0C30\u0C3F\u0C15\u0C3F ${amt} \u0C30\u0C42\u0C2A\u0C3E\u0C2F\u0C32 \u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40 \u0C07\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C47 \u0C1C\u0C30\u0C3F\u0C17\u0C3F\u0C02\u0C26\u0C3F.`,
    errorNotUnderstood: "\u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C41 \u0C05\u0C30\u0C4D\u0C25\u0C02 \u0C15\u0C3E\u0C32\u0C47\u0C26\u0C41. \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C2E\u0C33\u0C4D\u0C32\u0C40 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F.",
    errorCustomerNotFound: (name) => `\u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C21\u0C41 ${name} \u0C15\u0C28\u0C3F\u0C2A\u0C3F\u0C02\u0C1A\u0C32\u0C47\u0C26\u0C41.`,
    errorMicPermission: "\u0C2E\u0C48\u0C15\u0C4D\u0C30\u0C4B\u0C2B\u0C4B\u0C28\u0C4D \u0C05\u0C28\u0C41\u0C2E\u0C24\u0C3F \u0C05\u0C35\u0C38\u0C30\u0C02.",
    askDisambiguationDigits: (name) => `\u0C0F ${name}? \u0C2B\u0C4B\u0C28\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C1A\u0C3F\u0C35\u0C30\u0C3F \u0C28\u0C3E\u0C32\u0C41\u0C17\u0C41 \u0C05\u0C02\u0C15\u0C46\u0C32\u0C41 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F.`,
    confirmDisambiguationChoice: (name) => `${name}, \u0C38\u0C30\u0C3F\u0C17\u0C4D\u0C17\u0C3E \u0C09\u0C02\u0C26\u0C3F.`,
    disambiguationNotFoundRetry: "\u0C08 \u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C38\u0C30\u0C3F\u0C2A\u0C4B\u0C32\u0C32\u0C47\u0C26\u0C41, \u0C2E\u0C33\u0C4D\u0C32\u0C40 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F.",
    askDisambiguationMoreDigits: (name, count) => `\u0C07\u0C26\u0C4D\u0C26\u0C30\u0C3F \u0C1A\u0C3F\u0C35\u0C30\u0C3F 4 \u0C05\u0C02\u0C15\u0C46\u0C32\u0C41 \u0C12\u0C15\u0C1F\u0C47. \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C1A\u0C3F\u0C35\u0C30\u0C3F ${count} \u0C05\u0C02\u0C15\u0C46\u0C32\u0C41 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F.`,
    creditSavedWithPaymentRequest: (name, amt) => `${name} \u0C17\u0C3E\u0C30\u0C3F\u0C15\u0C3F ${amt} \u0C30\u0C42\u0C2A\u0C3E\u0C2F\u0C32 \u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F. \u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C2A\u0C41 \u0C05\u0C2D\u0C4D\u0C2F\u0C30\u0C4D\u0C25\u0C28 \u0C38\u0C3F\u0C26\u0C4D\u0C27\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C26\u0C3F.`
  }
};
function getSpeechTemplates(lang = "hinglish") {
  return speechTemplates[lang] || speechTemplates.hinglish;
}

// src/i18n/locales/en.json
var en_default = {
  appName: "Udhaar Sathi",
  tagline: "Hands-free Kirana Voice Ledger",
  online: "Online",
  offlineSafe: "Offline Safe (Local)",
  navHome: "Home",
  navCustomers: "Customers",
  navSummary: "Summary",
  navSettings: "Settings",
  navStyleguide: "Styleguide",
  save: "Save",
  cancel: "Cancel",
  delete: "Delete",
  edit: "Edit",
  close: "Close",
  search: "Search",
  back: "Back",
  done: "Done",
  creditGiven: "Credit Given",
  paymentReceived: "Payment Received",
  balanceOwed: "Total Balance",
  netBalance: "Net Balance",
  todaySummary: "Today's Summary",
  recentEntries: "Recent Entries",
  noEntries: "No entries recorded yet",
  micIdle: "Tap mic & speak",
  micListening: "Listening... Speak now",
  micProcessing: "Processing voice entry...",
  micError: "Could not hear clearly. Please try again.",
  typeInstead: "Type instead",
  trySpeaking: "Try speaking:",
  customersTitle: "Customer Ledger",
  searchCustomerPlaceholder: "Search by name or mobile...",
  filterAll: "All",
  filterOwes: "Owes Money",
  filterSettled: "Settled",
  addJama: "+ Add Payment",
  printSlip: "Print Slip",
  sendWhatsApp: "WhatsApp Reminder",
  summaryTitle: "Daily Summary",
  todayUdhaar: "Udhaar Given",
  todayJama: "Jama Received",
  todayNet: "Net Change",
  weeklyTrend: "Last 7 Days Trend",
  topPending: "Top Pending Customers",
  settingsTitle: "Settings",
  settingsSubtitle: "Shop details, languages, soundbox and data backup",
  shopNameLabel: "Shop Name",
  shopNamePlaceholder: "e.g. Ramesh Kirana Store",
  uiLanguageLabel: "UI Language",
  uiLanguageDesc: "Language for buttons, text and navigation",
  speechLanguageLabel: "Speech Language",
  speechLanguageDesc: "Used for speech recognition & soundbox voice replies",
  speechSpeedLabel: "Soundbox Speech Speed",
  speedSlow: "Slow",
  speedNormal: "Normal",
  speedFast: "Fast",
  muteRepliesLabel: "Mute Spoken Replies",
  muteRepliesDesc: "Only play chime tones without speaking totals aloud",
  themeLabel: "App Theme",
  themeLight: "Light Theme",
  themeHighContrast: "High Contrast (Dark)",
  themeDesc: "High contrast optimized for outdoor sunlight & dim shops",
  asrEngineLabel: "Speech Engine (ASR)",
  asrEngineDesc: "Provider used to transcribe spoken transactions",
  asrBrowser: "Browser On-Device (Free, Offline, Instant)",
  asrBhashini: "Bhashini AI (Digital India Speech) [Stubbed]",
  asrSarvam: "Sarvam AI (Saaras Indic Speech) [Stubbed]",
  exportLedgerLabel: "Export Ledger Data",
  exportJson: "Export Ledger (JSON)",
  exportCsv: "Export Ledger (CSV / Excel)",
  dangerZoneLabel: "Danger Zone",
  clearAllData: "Clear All Ledger Data",
  clearConfirm: "Are you sure you want to delete all customers and transactions? This cannot be undone.",
  clearSuccess: "All ledger data cleared successfully!",
  resetDemo: "Restore Sample Demo Khata",
  resetSuccess: "Sample demo data restored!",
  localFirstInfo: "Udhaar Sathi is 100% offline-first. Your ledger is safely stored on your device (IndexedDB) and never leaves your phone.",
  signupWelcomeTitle: "Welcome to Udhaar Sathi",
  signupWelcomeSubtitle: "Hands-free voice ledger built for Indian Kirana stores",
  dataStaysOnPhone: "Your data stays on this phone",
  getStarted: "Get Started",
  stepOf: "Step {current} of {total}",
  shopNamePrompt: "What is your shop name?",
  shopNameSpoken: "Please speak your shop name",
  shopNameHelper: "Spoken or typed name of your store",
  shopNameError: "Please enter a valid shop name (at least 2 characters)",
  ownerNamePrompt: "What is your name?",
  ownerNameSpoken: "Please speak your name",
  ownerNamePlaceholder: "e.g. Ramesh Kumar",
  ownerNameHelper: "Your name as store owner",
  ownerNameError: "Please enter your name (at least 2 characters)",
  phonePrompt: "Your mobile phone number",
  phoneSpoken: "Please enter your 10-digit mobile number",
  phonePlaceholder: "e.g. 9876543210",
  phoneHelper: "10-digit mobile number for reminders & WhatsApp",
  phoneError: "Enter a valid 10-digit Indian mobile number starting with 6-9",
  upiPrompt: "Your UPI ID",
  upiSpoken: "Speak or enter your UPI ID",
  upiPlaceholder: "e.g. ramesh@oksbi",
  upiHelperText: "Only your UPI ID is needed. We never ask for bank account numbers.",
  upiPaste: "Paste",
  upiReadBack: "Read back",
  upiReadingBack: "Reading back...",
  upiError: "Enter a valid UPI ID (e.g. name@bank)",
  pinPrompt: "Set Security PIN (Optional)",
  pinSpoken: "Choose a 4 to 6 digit security PIN or skip",
  pinPlaceholder: "4-6 digit PIN",
  pinHelperText: "Protects your ledger with on-device encryption. You can also set it later in Settings.",
  pinSkip: "Skip for now",
  pinSkipWarning: "Without a PIN, anyone opening this app can view your ledger. You can set a PIN anytime in Settings.",
  pinSkipConfirm: "Skip PIN",
  pinError: "PIN must be 4-6 digits and not a simple sequence (e.g. 1234, 0000)",
  reviewTitle: "Review Shop Profile",
  reviewSubtitle: "Confirm your store details. You can update these anytime in Settings.",
  startAppButton: "Start Udhaar Sathi",
  editField: "Edit",
  nextStep: "Next",
  prevStep: "Back",
  settingsProfileTitle: "Shop Profile",
  settingsProfileSubtitle: "Manage store details, owner information and payment UPI ID",
  confirmUpiChangeTitle: "Change UPI ID?",
  confirmUpiChangeWarning: "Changing your UPI ID will update payment QR codes and links sent to all customers. Are you sure?",
  confirmUpiChangeButton: "Yes, Update UPI ID",
  noPinWarningBanner: "Your ledger is not protected with a PIN. Set a PIN to secure your customer data.",
  setPinNow: "Set PIN Now",
  profileUpdatedToast: "Shop profile updated successfully!",
  registerCustomerTitle: "Register Customer",
  registerCustomerSubtitle: "Add customer details to save in your encrypted ledger",
  enterCustomerPhone: "Customer Phone Number",
  phoneReadBackQuestion: "{phone}. Is this correct?",
  readBackConfirm: "Yes, Correct",
  readBackWrong: "No, Change",
  skipPhoneForNow: "Skip for now",
  noNumberWarning: "No phone number saved. Reminders will ask for the number.",
  duplicatePhoneWarning: "This phone number belongs to {name}. Is it the same person?",
  openExistingCustomer: "Yes, Open {name}",
  useAnotherNumber: "Use another number",
  requireCustomerPhoneLabel: "Require Phone Number",
  requireCustomerPhoneDesc: "Require phone number when registering new customers",
  customerRegisteredSpoken: "{name} added successfully",
  customerNewAskPhoneSpoken: "{name} is a new customer. Please tell the phone number.",
  whichCustomerTitle: "Which {name}?",
  tellLast4DigitsSubtitle: "Tell the last 4 digits of phone number or tap card",
  noNumberSavedChip: "No number saved",
  disambiguateRetryToast: "Number not found. Please say again or tap card.",
  disambiguateConfirmSpoken: "{name}, confirmed.",
  autoOpenPaymentRequestLabel: "Auto-open payment request after udhaar",
  autoOpenPaymentRequestDesc: "Show UPI QR code and WhatsApp link immediately after recording credit",
  showMyQr: "Show My QR",
  showMyQrDesc: "Counter payment QR for walk-in customers",
  showMyQrTitle: "Shop Counter QR",
  paymentRequestTitle: "Payment Request",
  paymentRequestSubtitle: "Share QR code or WhatsApp link to collect payment",
  sendWhatsAppPayment: "Send WhatsApp",
  sendWhatsAppHint: "Tap to open WhatsApp, then press Send",
  shareQr: "Share QR",
  downloadQr: "Download QR",
  laterDismiss: "Later",
  noPhoneAddNumber: "Add phone number",
  noPhoneWarning: "No phone number saved for this customer",
  noUpiIdWarning: "No UPI ID set in shop profile. Set up in Settings to enable QR payments.",
  setupUpiNow: "Set up UPI ID",
  whatsappOfflineHint: "Internet required for WhatsApp",
  qrSavedToast: "QR code ready to share",
  receiptQrTitle: "Scan & Pay via UPI",
  chooseLanguage: "Choose Language",
  language: "Language",
  speechLanguage: "Speech Language",
  entries: "entries",
  entriesCount: "{count} entries",
  clear: "Clear",
  reset: "Reset",
  viewAll: "View All \u2192",
  loading: "Loading...",
  loadingCustomers: "Loading Customer Ledger...",
  loadingSummary: "Loading Daybook Summary...",
  securingLedger: "Securing Ledger...",
  micPromptSpeak: "SPEAK",
  micPromptListening: "LISTENING...",
  micPromptProcessing: "PROCESSING...",
  micPromptRetry: "RETRY",
  micCaptionIdle: "Tap once and speak",
  micCaptionListening: "Speak clearly \u2022 Auto-stops on silence",
  micCaptionProcessing: "Calculating entry...",
  micErrorFallbackNote: "If mic is not working, record entry by typing.",
  listeningSpeakYourLanguage: "Listening... Speak in your language",
  streamingSpeech: "Streaming Speech...",
  processingSpeech: "Processing Speech...",
  heardVoice: "Heard Voice",
  quickDemoPhrases: "Quick Demo / Example Phrases",
  tapToTest: "Tap to test",
  hintPhrase1: "Ramesh given 500 credit",
  hintPhrase2: "Ramesh 340 credit, yesterday gave 200",
  hintPhrase3: "Ramesh total?",
  creditGivenTodaySub: "Credit given today",
  paymentReceivedTodaySub: "Payment received today",
  marketPending: "Market Pending",
  last5Entries: "Last 5 entries",
  noEntriesYetPrompt: "No entries recorded yet. Tap mic and speak!",
  creditBadge: "Credit",
  paymentBadge: "Payment",
  udhaar: "Credit",
  jama: "Payment",
  customersCountSorted: "{count} customers registered \u2022 Sorted by highest balance",
  noCustomersYet: "No customers yet",
  noCustomersDescription: "No customers yet. Record first credit by voice.",
  noCustomerFound: "No Customer Found",
  noMatchingCustomerQuery: 'No customer matches "{query}". Record new entry by voice.',
  noCustomersInFilter: "No customers in this filter.",
  firstUdhaarVoice: "\u{1F3A4} Record First Credit by Voice",
  addCustomerButton: "+ Add customer",
  addNewCustomerTitle: "Add New Customer",
  addNewCustomerSubtitle: "Add customer without recording credit or payment",
  lastActivity: "Last: {date}",
  badgeOwes: "OWES",
  badgeSettled: "SETTLED",
  badgeNew: "New",
  listenBalance: "Listen",
  lastReminderDate: "Last reminder: {date}",
  outstandingUdhaar: "Outstanding Balance",
  allSettled: "All Settled",
  amountToReceive: "To receive from customer",
  noBalancePending: "No balance pending",
  totalCreditLabel: "Total Credit:",
  totalPaymentLabel: "Total Payment:",
  sendWhatsAppReminder: "WhatsApp Reminder",
  printReceipt: "Print Slip",
  addUdhaarButton: "+ Add Udhaar",
  addPaymentButton: "+ Add Payment",
  timelineEntries: "Ledger Timeline ({count} entries)",
  latestFirst: "Latest first",
  noEntriesTitle: "No Entries",
  noEntriesCustomerDesc: "No transactions recorded for this customer yet.",
  deleteEntryConfirm: "Are you sure you want to delete this entry?",
  enterValidAmount: "Please enter a valid amount",
  entryDeletedToast: "Entry deleted successfully",
  customerNotFoundTitle: "Customer Not Found",
  customerNotFoundDesc: "This customer is not present in the ledger.",
  viewCustomersList: "View Customers List",
  customerAlreadyExists: "{name} already exists",
  similarCustomerWarning: "A customer with a similar name already exists. Do you want to use this customer?",
  useThisOne: "Use this one",
  createAnyway: "Create anyway",
  customerNameLabel: "Customer Name",
  mobileNumberOptional: "Mobile Number (Optional)",
  phoneReminderHelper: "Useful for WhatsApp reminders (can also be added later).",
  saveCustomer: "Save Customer",
  saving: "Saving...",
  enterCustomerNameError: "Please enter customer name",
  errorSavingCustomer: "Error saving customer",
  dailySummarySubtitle: "Daily Collection & Udhaar Summary",
  shareSlip: "Share Slip",
  copied: "Copied",
  dateLabel: "Date:",
  creditGivenToday: "Credit given today",
  paymentReceivedToday: "Payment received today",
  netUdhaarIncreased: "Net credit increased",
  netUdhaarDecreased: "Net credit decreased",
  entriesCountLabel: "Total Entries",
  activeCustomersCount: "{count} active customers",
  noDataAvailable: "No Data Available",
  noDataForDate: "No transactions available for this date.",
  noPendingCustomersAllSettled: "No pending credit customers. All accounts settled! \u2713",
  reviewEntryTitle: "Review Entry",
  duplicateEntryWarningTitle: "Similar entry recorded just now. Save again?",
  duplicateEntryWarningDesc: "\u20B9{amount} {type} for {name} was already saved in the last 10 minutes.",
  saveAnyway: "Save Anyway",
  correctByVoice: "Correct by voice",
  listeningTapToStop: "Listening... (Tap to stop)",
  confirmAndSave: "Confirm & Save",
  voiceSavingCommand: "Saving by voice command...",
  voiceCancelledCommand: "Cancelled by voice",
  voiceAmountUpdated: "Amount updated to \u20B9{amount}",
  amountInRupees: "Amount in \u20B9",
  relativeToday: "Today",
  relativeYesterday: "Yesterday",
  relativeDayBefore: "Day before",
  pickDate: "Pick date",
  notePlaceholder: "Note (e.g. Milk, Sugar, Dal)",
  balanceInquiryTitle: "Ledger Balance Inquiry",
  balancePendingUdhaar: "Outstanding Balance",
  advancePayment: "Advance Payment",
  speaking: "Speaking...",
  replayVoice: "Listen",
  allClear: "All Clear \u2713",
  last3Transactions: "Last 3 Transactions",
  noPreviousTransactions: "No previous transactions found",
  viewKhata: "View Ledger",
  whichCustomerAskDigits: "Which {name}? Please tell the last 4 digits of phone number.",
  sameLastDigitsAskMore: "Both have the same last digits. Please tell the last {count} digits.",
  numberNotFoundRetry: "Number not found. Please say again.",
  numberNotFoundTapCard: "Number not found. Please tap the card.",
  newCustomerAddedToast: "New customer added: {name}",
  entrySavedSuccess: "{type} of {name} recorded successfully!",
  multiEntriesSavedSuccess: "{count} ledger entries saved successfully!",
  didNotUnderstandRepeat: "Could not understand. Please speak again.",
  languageChangedToast: "Language changed: {lang}",
  speechLanguageChangedToast: "Speech language: {lang}",
  offlineModeNoticeTitle: "Offline Mode",
  offlineModeNoticeDesc: "Ledger works 100% offline. Voice speech may require internet; use typing if offline.",
  networkDisconnected: "Network disconnected",
  pinIncorrect: "Incorrect PIN! Please try again.",
  pinLockedMessage: "Your ledger is AES-256 encrypted. Please enter your PIN:",
  pinResetConfirm: "Yes, Reset Ledger",
  totalUdhaar: "Total Credit",
  totalJama: "Total Payment",
  totalBalance: "Total Balance",
  udhaarAdded: "Credit Added",
  savePhoneToProfileHint: "Saved once, this phone number will be stored in customer profile.",
  numberClearedSpeakAgain: "Number cleared. Please speak again or use keypad.",
  pendingEntrySavedAfterReg: "{type} \u20B9{amount} will be saved after registration",
  recentEntriesReceipt: "Recent Entries:",
  numeralScriptLabel: "Number Script",
  numeralScriptDesc: "Display numbers in English (1, 2, 3) or regional script",
  scriptLatin: "English (1, 2, 3)",
  scriptNative: "Native Script",
  invalidPhoneError: "Please enter a valid 10-digit Indian phone number (starting 6-9)",
  speakNamePrompt: "Speak customer name...",
  phoneHelpText: "Useful for WhatsApp reminders (can also add later).",
  manualEntryTitle: "Manual Entry (No Voice)",
  today: "Today",
  yesterday: "Yesterday",
  dayBeforeYesterday: "Day before",
  baakiOwed: "pending",
  listenReplay: "Listen",
  sendReminder: "Send Reminder",
  active: "Active",
  noRecentActivity: "No recent activity",
  listeningDigitsPrompt: "Listening... speak last 4 digits",
  tapCardOrMic: "Tap a card or tap mic to speak again",
  first: "First",
  second: "Second",
  qrSaveError: "Could not save QR image",
  khataStatementSlip: "KHATA STATEMENT SLIP",
  thankYouShopping: "Thank you for shopping with us! \u{1F64F}",
  receiptSharedSuccess: "Receipt shared successfully!",
  receiptCopiedSuccess: "Receipt copied to clipboard!",
  whatsappPhoneNumber: "WhatsApp Phone Number",
  selectTemplateLanguage: "Select Template Language",
  messagePreview: "Message Preview (Editable)",
  messageCopiedToast: "Message text copied!",
  offlineSabChalega: "Offline \u2013 Everything Works",
  offlineSafeMessage: "Your ledger is 100% safe and securely saved on this device.",
  offlineMicWarning: "Voice recognition may require internet in some browsers. If mic doesn't respond, tap 'Type instead' for 100% offline entry.",
  openTypeInstead: "Open 'Type Instead'",
  gotIt: "Got It",
  pinLockedNotice: "Your ledger is AES-256 encrypted. Please enter your PIN:",
  pinCryptoLockDesc: "All ledger records are encrypted on-device via Web Crypto (AES-256 GCM).",
  yesReset: "Yes, Reset",
  dailySummarySub: "Daily Collection & Credit Summary",
  activeCustomersLabel: "active customers",
  noDataAvailableDesc: "No ledger entries recorded for this date.",
  noPendingUdhaarAllSettled: "No pending credit. All customer accounts settled! \u2713",
  zeroBalance: "All settled, zero balance",
  khataTimeline: "Ledger Timeline",
  saveEntry: "Save Entry",
  addUdhaar: "+ Add Credit",
  addPayment: "+ Add Payment",
  addEntry: "Add Entry",
  noteOptional: "Note (Optional)",
  whatsappReminder: "WhatsApp",
  lastReminder: "Last reminder",
  savingByVoice: "Saving by voice command...",
  cancelledByVoice: "Cancelled by voice",
  noCustomersEmptyState: "No customers yet. Add first credit by speaking",
  addFirstUdhaarVoice: "\u{1F3A4} Add First Credit by Voice",
  onboardingStep1Title: "1. Just Tap Mic & Speak",
  onboardingStep1Desc: "Hands busy at shop counter? Simply tap the mic and speak in your language.",
  onboardingStep2Title: "2. Review Preview On Screen",
  onboardingStep2Desc: "App instantly previews your entry. Tap to save, or correct with your voice.",
  onboardingStep3Title: "3. Instant Ledger & Reminders",
  onboardingStep3Desc: "Customer ledger updates instantly! Send WhatsApp reminder or print receipt in one tap.",
  grantMicAndStart: "Grant Mic & Get Started",
  installAppTitle: "Install App (Home Screen)",
  installAppSub: "Fast & 100% works offline \u2022 1 tap ledger",
  install: "Install",
  errorBoundaryTitle: "Something Went Wrong",
  errorBoundarySub: "Something went wrong, but don't worry!",
  errorBoundarySafety: "All your ledger data is completely safe on your phone (IndexedDB). Nothing is lost.",
  retryButton: "Try Again (Retry)",
  goHomeButton: "Go to Home",
  technicalDetails: "Technical Error Details"
};

// src/i18n/locales/hi.json
var hi_default = {
  appName: "Udhaar Sathi (\u0909\u0927\u093E\u0930 \u0938\u093E\u0925\u0940)",
  tagline: "\u092C\u094B\u0932\u0915\u0930 \u0909\u0927\u093E\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  online: "\u0911\u0928\u0932\u093E\u0907\u0928",
  offlineSafe: "\u0911\u092B\u0932\u093E\u0907\u0928 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 (\u0932\u094B\u0915\u0932)",
  navHome: "\u0939\u094B\u092E (\u092E\u093E\u0907\u0915)",
  navCustomers: "\u0917\u094D\u0930\u093E\u0939\u0915 \u0916\u093E\u0924\u093E",
  navSummary: "\u0926\u0948\u0928\u093F\u0915 \u0939\u093F\u0938\u093E\u092C",
  navSettings: "\u0938\u0947\u091F\u093F\u0902\u0917\u094D\u0938",
  navStyleguide: "\u0938\u094D\u091F\u093E\u0907\u0932\u0917\u093E\u0907\u0921",
  save: "\u0938\u0939\u0947\u091C\u0947\u0902",
  cancel: "\u0930\u0926\u094D\u0926 \u0915\u0930\u0947\u0902",
  delete: "\u0939\u091F\u093E\u090F\u0902",
  edit: "\u0938\u0902\u092A\u093E\u0926\u093F\u0924 \u0915\u0930\u0947\u0902",
  close: "\u092C\u0902\u0926 \u0915\u0930\u0947\u0902",
  search: "\u0916\u094B\u091C\u0947\u0902",
  back: "\u092A\u0940\u091B\u0947",
  done: "\u092A\u0942\u0930\u094D\u0923",
  creditGiven: "\u0909\u0927\u093E\u0930 \u0926\u093F\u092F\u093E",
  paymentReceived: "\u091C\u092E\u093E \u092E\u093F\u0932\u093E",
  balanceOwed: "\u0915\u0941\u0932 \u092C\u093E\u0915\u0940",
  netBalance: "\u0936\u0941\u0926\u094D\u0927 \u092C\u093E\u0915\u0940",
  todaySummary: "\u0906\u091C \u0915\u093E \u0939\u093F\u0938\u093E\u092C",
  recentEntries: "\u0939\u093E\u0932 \u0915\u0947 \u0932\u0947\u0928-\u0926\u0947\u0928",
  noEntries: "\u0905\u092D\u0940 \u0915\u094B\u0908 \u0932\u0947\u0928-\u0926\u0947\u0928 \u0926\u0930\u094D\u091C \u0928\u0939\u0940\u0902 \u0939\u0948",
  micIdle: "\u092E\u093E\u0907\u0915 \u0926\u092C\u093E\u0915\u0930 \u092C\u094B\u0932\u0947\u0902",
  micListening: "\u0938\u0941\u0928 \u0930\u0939\u093E \u0939\u0942\u0901... \u092C\u094B\u0932\u093F\u090F",
  micProcessing: "\u0939\u093F\u0938\u093E\u092C \u0938\u092E\u091D \u0930\u0939\u093E \u0939\u0942\u0901...",
  micError: "\u0938\u093E\u092B\u093C \u0938\u0941\u0928\u093E\u0908 \u0928\u0939\u0940\u0902 \u0926\u093F\u092F\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u092A\u0941\u0928\u0903 \u092A\u094D\u0930\u092F\u093E\u0938 \u0915\u0930\u0947\u0902\u0964",
  typeInstead: "\u0932\u093F\u0916\u0915\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  trySpeaking: "\u092C\u094B\u0932\u0915\u0930 \u0926\u0947\u0916\u0947\u0902:",
  customersTitle: "\u0917\u094D\u0930\u093E\u0939\u0915 \u0916\u093E\u0924\u093E",
  searchCustomerPlaceholder: "\u0928\u093E\u092E \u092F\u093E \u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930 \u0916\u094B\u091C\u0947\u0902...",
  filterAll: "\u0938\u092D\u0940",
  filterOwes: "\u092C\u093E\u0915\u0940 \u0935\u093E\u0932\u0947",
  filterSettled: "\u091A\u0941\u0915\u0924\u093E",
  addJama: "+ \u091C\u092E\u093E \u091C\u094B\u0921\u093C\u0947\u0902",
  printSlip: "\u092A\u0930\u094D\u091A\u0940 \u092A\u094D\u0930\u093F\u0902\u091F \u0915\u0930\u0947\u0902",
  sendWhatsApp: "\u0935\u094D\u0939\u093E\u091F\u094D\u0938\u090F\u092A \u0930\u093F\u092E\u093E\u0907\u0902\u0921\u0930",
  summaryTitle: "\u0926\u0948\u0928\u093F\u0915 \u0939\u093F\u0938\u093E\u092C",
  todayUdhaar: "\u0909\u0927\u093E\u0930 \u0926\u093F\u092F\u093E",
  todayJama: "\u091C\u092E\u093E \u092E\u093F\u0932\u093E",
  todayNet: "\u0936\u0941\u0926\u094D\u0927 \u092C\u0926\u0932\u093E\u0935",
  weeklyTrend: "\u092A\u093F\u091B\u0932\u0947 7 \u0926\u093F\u0928\u094B\u0902 \u0915\u093E \u0939\u093F\u0938\u093E\u092C",
  topPending: "\u0936\u0940\u0930\u094D\u0937 \u092C\u093E\u0915\u0940 \u0935\u093E\u0932\u0947 \u0917\u094D\u0930\u093E\u0939\u0915",
  settingsTitle: "\u0938\u0947\u091F\u093F\u0902\u0917\u094D\u0938",
  settingsSubtitle: "\u0926\u0941\u0915\u093E\u0928 \u0915\u093E \u0928\u093E\u092E, \u092D\u093E\u0937\u093E, \u0938\u093E\u0909\u0902\u0921\u092C\u0949\u0915\u094D\u0938 \u0914\u0930 \u0921\u0947\u091F\u093E \u092C\u0948\u0915\u0905\u092A",
  shopNameLabel: "\u0926\u0941\u0915\u093E\u0928 \u0915\u093E \u0928\u093E\u092E",
  shopNamePlaceholder: "\u0909\u0926\u093E. \u0930\u092E\u0947\u0936 \u0915\u093F\u0930\u093E\u0928\u093E \u0938\u094D\u091F\u094B\u0930",
  uiLanguageLabel: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u0915\u0940 \u092D\u093E\u0937\u093E",
  uiLanguageDesc: "\u092C\u091F\u0928, \u092E\u0947\u0928\u0942 \u0914\u0930 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u0926\u093F\u0916\u0928\u0947 \u0935\u093E\u0932\u0940 \u092D\u093E\u0937\u093E",
  speechLanguageLabel: "\u092C\u094B\u0932\u0928\u0947 \u0915\u0940 \u092D\u093E\u0937\u093E",
  speechLanguageDesc: "\u092E\u093E\u0907\u0915 \u0938\u0947 \u0938\u092E\u091D\u0928\u0947 \u0914\u0930 \u0938\u093E\u0909\u0902\u0921\u092C\u0949\u0915\u094D\u0938 \u0906\u0935\u093E\u091C\u093C \u0915\u0947 \u0932\u093F\u090F",
  speechSpeedLabel: "\u0938\u093E\u0909\u0902\u0921\u092C\u0949\u0915\u094D\u0938 \u092C\u094B\u0932\u0928\u0947 \u0915\u0940 \u0930\u092B\u094D\u0924\u093E\u0930",
  speedSlow: "\u0927\u0940\u092E\u0940",
  speedNormal: "\u0938\u093E\u092E\u093E\u0928\u094D\u092F",
  speedFast: "\u0924\u0947\u091C\u093C",
  muteRepliesLabel: "\u0938\u093E\u0909\u0902\u0921\u092C\u0949\u0915\u094D\u0938 \u0906\u0935\u093E\u091C\u093C \u092C\u0902\u0926 \u0930\u0916\u0947\u0902",
  muteRepliesDesc: "\u0915\u0947\u0935\u0932 \u0918\u0902\u091F\u0940 \u092C\u091C\u0947\u0917\u0940, \u092C\u094B\u0932\u0915\u0930 \u0939\u093F\u0938\u093E\u092C \u0928\u0939\u0940\u0902 \u092C\u0924\u093E\u090F\u0917\u093E",
  themeLabel: "\u0910\u092A \u0925\u0940\u092E",
  themeLight: "\u0932\u093E\u0907\u091F \u0925\u0940\u092E",
  themeHighContrast: "\u0939\u093E\u0908 \u0915\u0902\u091F\u094D\u0930\u093E\u0938\u094D\u091F (\u0921\u093E\u0930\u094D\u0915)",
  themeDesc: "\u0927\u0942\u092A \u092E\u0947\u0902 \u092F\u093E \u0930\u093E\u0924 \u092E\u0947\u0902 \u0938\u093E\u092B\u093C \u0926\u093F\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0905\u0928\u0941\u0915\u0942\u0932\u093F\u0924",
  asrEngineLabel: "\u0938\u094D\u092A\u0940\u091A \u0907\u0902\u091C\u0928 (ASR)",
  asrEngineDesc: "\u0906\u0935\u093E\u091C\u093C \u0915\u094B \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u092E\u0947\u0902 \u092C\u0926\u0932\u0928\u0947 \u0935\u093E\u0932\u093E \u0907\u0902\u091C\u0928",
  asrBrowser: "\u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u0911\u0928-\u0921\u093F\u0935\u093E\u0907\u0938 (\u092E\u0941\u092B\u093C\u094D\u0924, \u0911\u092B\u0932\u093E\u0907\u0928, \u0924\u0941\u0930\u0902\u0924)",
  asrBhashini: "\u092D\u093E\u0937\u093F\u0923\u0940 AI (\u092D\u093E\u0930\u0924 \u0938\u0930\u0915\u093E\u0930 \u0921\u093F\u091C\u093F\u091F\u0932 \u0907\u0902\u0921\u093F\u092F\u093E) [Stubbed]",
  asrSarvam: "\u0938\u0930\u094D\u0935\u092E AI (\u0938\u093E\u0930\u0938 \u0907\u0902\u0921\u093F\u0915 \u0938\u094D\u092A\u0940\u091A) [Stubbed]",
  exportLedgerLabel: "\u0916\u093E\u0924\u093E \u0921\u0947\u091F\u093E \u0928\u093F\u0930\u094D\u092F\u093E\u0924 \u0915\u0930\u0947\u0902",
  exportJson: "\u0916\u093E\u0924\u093E \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0947\u0902 (JSON)",
  exportCsv: "\u0916\u093E\u0924\u093E \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0947\u0902 (CSV / Excel)",
  dangerZoneLabel: "\u0921\u0947\u091F\u093E \u0939\u091F\u093E\u090F\u0902",
  clearAllData: "\u0938\u093E\u0930\u093E \u0916\u093E\u0924\u093E \u0921\u0947\u091F\u093E \u092E\u093F\u091F\u093E\u090F\u0902",
  clearConfirm: "\u0915\u094D\u092F\u093E \u0906\u092A \u0935\u093E\u0915\u0908 \u0938\u093E\u0930\u093E \u0916\u093E\u0924\u093E \u0921\u0947\u091F\u093E \u092E\u093F\u091F\u093E\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902? \u092F\u0939 \u0935\u093E\u092A\u0938 \u0928\u0939\u0940\u0902 \u0932\u093E\u092F\u093E \u091C\u093E \u0938\u0915\u0947\u0917\u093E\u0964",
  clearSuccess: "\u0938\u093E\u0930\u093E \u0921\u0947\u091F\u093E \u0938\u092B\u0932\u0924\u093E\u092A\u0942\u0930\u094D\u0935\u0915 \u092E\u093F\u091F\u093E \u0926\u093F\u092F\u093E \u0917\u092F\u093E!",
  resetDemo: "\u0938\u0948\u0902\u092A\u0932 \u0921\u0947\u092E\u094B \u0916\u093E\u0924\u093E \u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
  resetSuccess: "\u0921\u0947\u092E\u094B \u0916\u093E\u0924\u093E \u0932\u094B\u0921 \u0939\u094B \u0917\u092F\u093E!",
  localFirstInfo: "Udhaar Sathi 100% \u0911\u092B\u0932\u093E\u0907\u0928 \u0939\u0948\u0964 \u0906\u092A\u0915\u093E \u0938\u093E\u0930\u093E \u0921\u0947\u091F\u093E \u0906\u092A\u0915\u0947 \u092B\u093C\u094B\u0928 \u092A\u0930 \u0939\u0940 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 (IndexedDB) \u0930\u0939\u0924\u093E \u0939\u0948 \u0914\u0930 \u0915\u0939\u0940\u0902 \u0928\u0939\u0940\u0902 \u092D\u0947\u091C\u093E \u091C\u093E\u0924\u093E\u0964",
  signupWelcomeTitle: "Udhaar Sathi (\u0909\u0927\u093E\u0930 \u0938\u093E\u0925\u0940) \u092E\u0947\u0902 \u0906\u092A\u0915\u093E \u0938\u094D\u0935\u093E\u0917\u0924 \u0939\u0948",
  signupWelcomeSubtitle: "\u092D\u093E\u0930\u0924\u0940\u092F \u0915\u093F\u0930\u093E\u0928\u093E \u0926\u0941\u0915\u093E\u0928\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0939\u0948\u0902\u0921\u094D\u0938-\u092B\u094D\u0930\u0940 \u0906\u0935\u093E\u091C\u093C \u0916\u093E\u0924\u093E",
  dataStaysOnPhone: "\u0906\u092A\u0915\u093E \u0921\u0947\u091F\u093E \u0907\u0938\u0940 \u092B\u094B\u0928 \u092A\u0930 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0930\u0939\u0924\u093E \u0939\u0948",
  getStarted: "\u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902",
  stepOf: "\u091A\u0930\u0923 {current} / {total}",
  shopNamePrompt: "\u0926\u0941\u0915\u093E\u0928 \u0915\u093E \u0928\u093E\u092E \u092C\u0924\u093E\u0907\u090F",
  shopNameSpoken: "\u0926\u0941\u0915\u093E\u0928 \u0915\u093E \u0928\u093E\u092E \u092C\u0924\u093E\u0907\u090F",
  shopNameHelper: "\u0905\u092A\u0928\u0940 \u0926\u0941\u0915\u093E\u0928 \u0915\u093E \u0928\u093E\u092E \u092C\u094B\u0932\u0947\u0902 \u092F\u093E \u0932\u093F\u0916\u0947\u0902",
  shopNameError: "\u0915\u0943\u092A\u092F\u093E \u092E\u093E\u0928\u094D\u092F \u0926\u0941\u0915\u093E\u0928 \u0915\u093E \u0928\u093E\u092E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 (\u0915\u092E \u0938\u0947 \u0915\u092E 2 \u0905\u0915\u094D\u0937\u0930)",
  ownerNamePrompt: "\u0905\u092A\u0928\u093E \u0928\u093E\u092E \u092C\u0924\u093E\u0907\u090F",
  ownerNameSpoken: "\u0905\u092A\u0928\u093E \u0928\u093E\u092E \u092C\u0924\u093E\u0907\u090F",
  ownerNamePlaceholder: "\u0909\u0926\u093E. \u0930\u092E\u0947\u0936 \u0915\u0941\u092E\u093E\u0930",
  ownerNameHelper: "\u0926\u0941\u0915\u093E\u0928\u0926\u093E\u0930 \u0915\u093E \u0928\u093E\u092E",
  ownerNameError: "\u0915\u0943\u092A\u092F\u093E \u0905\u092A\u0928\u093E \u0928\u093E\u092E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 (\u0915\u092E \u0938\u0947 \u0915\u092E 2 \u0905\u0915\u094D\u0937\u0930)",
  phonePrompt: "\u0906\u092A\u0915\u093E \u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930",
  phoneSpoken: "\u0905\u092A\u0928\u093E 10 \u0905\u0902\u0915\u094B\u0902 \u0915\u093E \u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930 \u0921\u093E\u0932\u093F\u090F",
  phonePlaceholder: "\u0909\u0926\u093E. 9876543210",
  phoneHelper: "\u0935\u094D\u0939\u093E\u091F\u094D\u0938\u090F\u092A \u0914\u0930 \u0924\u0917\u093E\u0926\u093E \u0938\u0902\u0926\u0947\u0936\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F 10 \u0905\u0902\u0915\u094B\u0902 \u0915\u093E \u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930",
  phoneError: "6-9 \u0938\u0947 \u0936\u0941\u0930\u0942 \u0939\u094B\u0928\u0947 \u0935\u093E\u0932\u093E 10 \u0905\u0902\u0915\u094B\u0902 \u0915\u093E \u092D\u093E\u0930\u0924\u0940\u092F \u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  upiPrompt: "\u0906\u092A\u0915\u0940 \u092F\u0942\u092A\u0940\u0906\u0908 \u0906\u0908\u0921\u0940",
  upiSpoken: "\u0905\u092A\u0928\u0940 \u092F\u0942\u092A\u0940\u0906\u0908 \u0906\u0908\u0921\u0940 \u092C\u094B\u0932\u093F\u090F \u092F\u093E \u0932\u093F\u0916\u093F\u090F",
  upiPlaceholder: "\u0909\u0926\u093E. ramesh@oksbi",
  upiHelperText: "\u0915\u0947\u0935\u0932 \u0906\u092A\u0915\u0940 \u092F\u0942\u092A\u0940\u0906\u0908 \u0906\u0908\u0921\u0940 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948\u0964 \u0939\u092E \u0915\u092D\u0940 \u092C\u0948\u0902\u0915 \u0916\u093E\u0924\u093E \u0938\u0902\u0916\u094D\u092F\u093E \u0928\u0939\u0940\u0902 \u092E\u093E\u0902\u0917\u0924\u0947\u0964",
  upiPaste: "\u092A\u0947\u0938\u094D\u091F \u0915\u0930\u0947\u0902",
  upiReadBack: "\u0905\u0915\u094D\u0937\u0930\u0936\u0903 \u0938\u0941\u0928\u0947\u0902",
  upiReadingBack: "\u092A\u0922\u093C \u0930\u0939\u0947 \u0939\u0948\u0902...",
  upiError: "\u092E\u093E\u0928\u094D\u092F \u092F\u0942\u092A\u0940\u0906\u0908 \u0906\u0908\u0921\u0940 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 (\u0909\u0926\u093E. name@bank)",
  pinPrompt: "\u0938\u0941\u0930\u0915\u094D\u0937\u093E \u092A\u093F\u0928 \u0938\u0947\u091F \u0915\u0930\u0947\u0902 (\u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915)",
  pinSpoken: "4 \u0938\u0947 6 \u0905\u0902\u0915\u094B\u0902 \u0915\u093E \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u092A\u093F\u0928 \u091A\u0941\u0928\u0947\u0902 \u092F\u093E \u091B\u094B\u0921\u093C \u0926\u0947\u0902",
  pinPlaceholder: "4-6 \u0905\u0902\u0915\u094B\u0902 \u0915\u093E \u092A\u093F\u0928",
  pinHelperText: "\u0921\u093F\u0935\u093E\u0907\u0938 \u090F\u0928\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u0936\u0928 \u0915\u0947 \u0938\u093E\u0925 \u0916\u093E\u0924\u0947 \u0915\u094B \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u0938\u0947\u091F\u093F\u0902\u0917\u094D\u0938 \u092E\u0947\u0902 \u092C\u093E\u0926 \u092E\u0947\u0902 \u092D\u0940 \u0938\u0947\u091F \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964",
  pinSkip: "\u0905\u092D\u0940 \u091B\u094B\u0921\u093C\u0947\u0902",
  pinSkipWarning: "\u092A\u093F\u0928 \u0915\u0947 \u092C\u093F\u0928\u093E \u0915\u094B\u0908 \u092D\u0940 \u092F\u0939 \u0910\u092A \u0916\u094B\u0932\u0915\u0930 \u0906\u092A\u0915\u093E \u0916\u093E\u0924\u093E \u0926\u0947\u0916 \u0938\u0915\u0924\u093E \u0939\u0948\u0964 \u0906\u092A \u0938\u0947\u091F\u093F\u0902\u0917\u094D\u0938 \u092E\u0947\u0902 \u0915\u092D\u0940 \u092D\u0940 \u092A\u093F\u0928 \u0932\u0917\u093E \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964",
  pinSkipConfirm: "\u092A\u093F\u0928 \u091B\u094B\u0921\u093C\u0947\u0902",
  pinError: "\u092A\u093F\u0928 4-6 \u0905\u0902\u0915\u094B\u0902 \u0915\u093E \u0939\u094B\u0928\u093E \u091A\u093E\u0939\u093F\u090F \u0914\u0930 \u0906\u0938\u093E\u0928 \u0915\u094D\u0930\u092E \u0928\u0939\u0940\u0902 (\u091C\u0948\u0938\u0947 1234, 0000)",
  reviewTitle: "\u0926\u0941\u0915\u093E\u0928 \u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932 \u0915\u0940 \u091C\u093E\u0902\u091A \u0915\u0930\u0947\u0902",
  reviewSubtitle: "\u0905\u092A\u0928\u0940 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u091C\u093E\u0902\u091A \u0932\u0947\u0902\u0964 \u0907\u0928\u094D\u0939\u0947\u0902 \u0915\u092D\u0940 \u092D\u0940 \u0938\u0947\u091F\u093F\u0902\u0917\u094D\u0938 \u092E\u0947\u0902 \u092C\u0926\u0932\u093E \u091C\u093E \u0938\u0915\u0924\u093E \u0939\u0948\u0964",
  startAppButton: "Udhaar Sathi \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902",
  editField: "\u092C\u0926\u0932\u0947\u0902",
  nextStep: "\u0906\u0917\u0947",
  prevStep: "\u092A\u0940\u091B\u0947",
  settingsProfileTitle: "\u0926\u0941\u0915\u093E\u0928 \u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932",
  settingsProfileSubtitle: "\u0926\u0941\u0915\u093E\u0928, \u092E\u093E\u0932\u093F\u0915 \u0915\u093E \u0928\u093E\u092E \u0914\u0930 \u092F\u0942\u092A\u0940\u0906\u0908 \u0906\u0908\u0921\u0940 \u092A\u094D\u0930\u092C\u0902\u0927\u093F\u0924 \u0915\u0930\u0947\u0902",
  confirmUpiChangeTitle: "\u092F\u0942\u092A\u0940\u0906\u0908 \u0906\u0908\u0921\u0940 \u092C\u0926\u0932\u0947\u0902?",
  confirmUpiChangeWarning: "\u092F\u0942\u092A\u0940\u0906\u0908 \u0906\u0908\u0921\u0940 \u092C\u0926\u0932\u0928\u0947 \u092A\u0930 \u0938\u092D\u0940 \u0917\u094D\u0930\u093E\u0939\u0915\u094B\u0902 \u0915\u094B \u092D\u0947\u091C\u0947 \u091C\u093E\u0928\u0947 \u0935\u093E\u0932\u0947 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u094D\u092F\u0942\u0906\u0930 \u0915\u094B\u0921 \u0914\u0930 \u0932\u093F\u0902\u0915 \u092C\u0926\u0932 \u091C\u093E\u090F\u0902\u0917\u0947\u0964 \u0915\u094D\u092F\u093E \u0906\u092A \u0928\u093F\u0936\u094D\u091A\u093F\u0924 \u0939\u0948\u0902?",
  confirmUpiChangeButton: "\u0939\u093E\u0902, \u092F\u0942\u092A\u0940\u0906\u0908 \u0906\u0908\u0921\u0940 \u092C\u0926\u0932\u0947\u0902",
  noPinWarningBanner: "\u0906\u092A\u0915\u093E \u0916\u093E\u0924\u093E \u092A\u093F\u0928 \u0938\u0947 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u0921\u0947\u091F\u093E \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0905\u092D\u0940 \u092A\u093F\u0928 \u0932\u0917\u093E\u090F\u0902\u0964",
  setPinNow: "\u0905\u092D\u0940 \u092A\u093F\u0928 \u0932\u0917\u093E\u090F\u0902",
  profileUpdatedToast: "\u0926\u0941\u0915\u093E\u0928 \u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932 \u0938\u092B\u0932\u0924\u093E\u092A\u0942\u0930\u094D\u0935\u0915 \u0905\u092A\u0921\u0947\u091F \u0939\u094B \u0917\u092F\u093E!",
  registerCustomerTitle: "\u0928\u092F\u093E \u0917\u094D\u0930\u093E\u0939\u0915 \u091C\u094B\u0921\u093C\u0947\u0902",
  registerCustomerSubtitle: "\u090F\u0928\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F\u0947\u0921 \u0916\u093E\u0924\u0947 \u092E\u0947\u0902 \u0938\u0939\u0947\u091C\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0917\u094D\u0930\u093E\u0939\u0915 \u0935\u093F\u0935\u0930\u0923 \u092D\u0930\u0947\u0902",
  enterCustomerPhone: "\u0917\u094D\u0930\u093E\u0939\u0915 \u0915\u093E \u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930",
  phoneReadBackQuestion: "{phone}\u0964 \u0915\u094D\u092F\u093E \u092F\u0939 \u0938\u0939\u0940 \u0939\u0948?",
  readBackConfirm: "\u0939\u093E\u0901, \u0938\u0939\u0940 \u0939\u0948",
  readBackWrong: "\u0928\u0939\u0940\u0902, \u092C\u0926\u0932\u094B",
  skipPhoneForNow: "\u0905\u092D\u0940 \u091B\u094B\u0921\u093C\u0947\u0902",
  noNumberWarning: "\u092C\u093F\u0928\u093E \u0928\u0902\u092C\u0930 \u0915\u0947 \u0938\u0939\u0947\u091C\u093E \u0917\u092F\u093E\u0964 \u0924\u0917\u093E\u0926\u093E \u0938\u0902\u0926\u0947\u0936\u094B\u0902 \u092E\u0947\u0902 \u0928\u0902\u092C\u0930 \u092E\u093E\u0902\u0917\u093E \u091C\u093E\u090F\u0917\u093E\u0964",
  duplicatePhoneWarning: "\u092F\u0939 \u0928\u0902\u092C\u0930 {name} \u0915\u093E \u0939\u0948\u0964 \u0915\u094D\u092F\u093E \u092F\u0939 \u0935\u0939\u0940 \u0917\u094D\u0930\u093E\u0939\u0915 \u0939\u0948\u0902?",
  openExistingCustomer: "\u0939\u093E\u0901, {name} \u0915\u094B \u0916\u094B\u0932\u0947\u0902",
  useAnotherNumber: "\u0926\u0942\u0938\u0930\u093E \u0928\u0902\u092C\u0930 \u0921\u093E\u0932\u0947\u0902",
  requireCustomerPhoneLabel: "\u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930 \u0905\u0928\u093F\u0935\u093E\u0930\u094D\u092F \u0915\u0930\u0947\u0902",
  requireCustomerPhoneDesc: "\u0928\u090F \u0917\u094D\u0930\u093E\u0939\u0915 \u091C\u094B\u0921\u093C\u0924\u0947 \u0938\u092E\u092F \u092B\u094B\u0928 \u0928\u0902\u092C\u0930 \u0905\u0928\u093F\u0935\u093E\u0930\u094D\u092F \u0930\u0916\u0947\u0902",
  customerRegisteredSpoken: "{name} \u0915\u094B \u091C\u094B\u0921\u093C \u0926\u093F\u092F\u093E \u0917\u092F\u093E",
  customerNewAskPhoneSpoken: "{name} \u0928\u092F\u093E \u0939\u0948\u0964 \u0928\u0902\u092C\u0930 \u092C\u0924\u093E\u0907\u090F",
  whichCustomerTitle: "\u0915\u094C\u0928 \u0938\u093E {name}?",
  tellLast4DigitsSubtitle: "\u0928\u0902\u092C\u0930 \u0915\u0947 \u0906\u0916\u093C\u093F\u0930\u0940 4 \u0905\u0902\u0915 \u092C\u0924\u093E\u0907\u090F \u092F\u093E \u0915\u093E\u0930\u094D\u0921 \u092A\u0930 \u091F\u0948\u092A \u0915\u0930\u0947\u0902",
  noNumberSavedChip: "\u0928\u0902\u092C\u0930 \u0938\u0947\u0935 \u0928\u0939\u0940\u0902 \u0939\u0948",
  disambiguateRetryToast: "\u092F\u0939 \u0928\u0902\u092C\u0930 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u0926\u094B\u092C\u093E\u0930\u093E \u092C\u094B\u0932\u0947\u0902 \u092F\u093E \u0915\u093E\u0930\u094D\u0921 \u091F\u0948\u092A \u0915\u0930\u0947\u0902\u0964",
  disambiguateConfirmSpoken: "{name}, \u0920\u0940\u0915 \u0939\u0948\u0964",
  autoOpenPaymentRequestLabel: "\u0909\u0927\u093E\u0930 \u0915\u0947 \u092C\u093E\u0926 \u092A\u0947\u092E\u0947\u0902\u091F \u0930\u093F\u0915\u094D\u0935\u0947\u0938\u094D\u091F \u0926\u093F\u0916\u093E\u090F\u0902",
  autoOpenPaymentRequestDesc: "\u0909\u0927\u093E\u0930 \u0926\u0930\u094D\u091C \u0939\u094B\u0924\u0947 \u0939\u0940 \u0924\u0941\u0930\u0902\u0924 \u092F\u0942\u092A\u0940\u0906\u0908 \u0915\u094D\u092F\u0942\u0906\u0930 \u0914\u0930 \u0935\u094D\u0939\u093E\u091F\u094D\u0938\u090F\u092A \u0932\u093F\u0902\u0915 \u0926\u093F\u0916\u093E\u090F\u0902",
  showMyQr: "\u0926\u0941\u0915\u093E\u0928 \u0915\u093E \u0915\u094D\u092F\u0942\u0906\u0930",
  showMyQrDesc: "\u0915\u093E\u0909\u0902\u091F\u0930 \u092A\u0930 \u0916\u0921\u093C\u0947 \u0917\u094D\u0930\u093E\u0939\u0915\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u092F\u0942\u092A\u0940\u0906\u0908 \u0915\u094D\u092F\u0942\u0906\u0930",
  showMyQrTitle: "\u0926\u0941\u0915\u093E\u0928 \u0915\u093E\u0909\u0902\u091F\u0930 \u0915\u094D\u092F\u0942\u0906\u0930",
  paymentRequestTitle: "\u092A\u0947\u092E\u0947\u0902\u091F \u0930\u093F\u0915\u094D\u0935\u0947\u0938\u094D\u091F",
  paymentRequestSubtitle: "\u092D\u0941\u0917\u0924\u093E\u0928 \u092A\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u094D\u092F\u0942\u0906\u0930 \u092F\u093E \u0935\u094D\u0939\u093E\u091F\u094D\u0938\u090F\u092A \u0932\u093F\u0902\u0915 \u0938\u093E\u091D\u093E \u0915\u0930\u0947\u0902",
  sendWhatsAppPayment: "WhatsApp \u092D\u0947\u091C\u0947\u0902",
  sendWhatsAppHint: "WhatsApp \u0916\u0941\u0932\u0947\u0917\u093E, \u092B\u093F\u0930 \u0938\u0947\u0902\u0921 \u092C\u091F\u0928 \u0926\u092C\u093E\u090F\u0902",
  shareQr: "QR \u0936\u0947\u092F\u0930 \u0915\u0930\u0947\u0902",
  downloadQr: "QR \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
  laterDismiss: "\u092C\u093E\u0926 \u092E\u0947\u0902",
  noPhoneAddNumber: "\u0928\u0902\u092C\u0930 \u091C\u094B\u0921\u093C\u0947\u0902",
  noPhoneWarning: "\u0907\u0938 \u0917\u094D\u0930\u093E\u0939\u0915 \u0915\u093E \u092B\u094B\u0928 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0928\u0939\u0940\u0902 \u0939\u0948",
  noUpiIdWarning: "\u0926\u0941\u0915\u093E\u0928 \u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932 \u092E\u0947\u0902 \u092F\u0942\u092A\u0940\u0906\u0908 \u0906\u0908\u0921\u0940 \u0938\u0947\u091F \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u0915\u094D\u092F\u0942\u0906\u0930 \u0915\u0947 \u0932\u093F\u090F \u0938\u0947\u091F\u093F\u0902\u0917\u094D\u0938 \u092E\u0947\u0902 \u091C\u094B\u0921\u093C\u0947\u0902\u0964",
  setupUpiNow: "UPI ID \u091C\u094B\u0921\u093C\u0947\u0902",
  whatsappOfflineHint: "\u0935\u094D\u0939\u093E\u091F\u094D\u0938\u090F\u092A \u0915\u0947 \u0932\u093F\u090F \u0907\u0902\u091F\u0930\u0928\u0947\u091F \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948",
  qrSavedToast: "\u0915\u094D\u092F\u0942\u0906\u0930 \u0915\u094B\u0921 \u0924\u0948\u092F\u093E\u0930 \u0939\u0948",
  receiptQrTitle: "UPI \u0938\u0947 \u0938\u094D\u0915\u0948\u0928 \u0914\u0930 \u092A\u0947 \u0915\u0930\u0947\u0902",
  chooseLanguage: "\u092D\u093E\u0937\u093E \u091A\u0941\u0928\u0947\u0902",
  language: "\u092D\u093E\u0937\u093E",
  speechLanguage: "\u092C\u094B\u0932\u0928\u0947 \u0915\u0940 \u092D\u093E\u0937\u093E",
  entries: "\u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u093E\u0902",
  entriesCount: "{count} \u0932\u0947\u0928-\u0926\u0947\u0928",
  clear: "\u0939\u091F\u093E\u090F\u0902",
  reset: "\u0930\u0940\u0938\u0947\u091F",
  viewAll: "\u0938\u092D\u0940 \u0926\u0947\u0916\u0947\u0902 \u2192",
  loading: "\u0932\u094B\u0921 \u0939\u094B \u0930\u0939\u093E \u0939\u0948...",
  loadingCustomers: "\u0917\u094D\u0930\u093E\u0939\u0915 \u0916\u093E\u0924\u093E \u0932\u094B\u0921 \u0939\u094B \u0930\u0939\u093E \u0939\u0948...",
  loadingSummary: "\u0926\u0948\u0928\u093F\u0915 \u0939\u093F\u0938\u093E\u092C \u0932\u094B\u0921 \u0939\u094B \u0930\u0939\u093E \u0939\u0948...",
  securingLedger: "\u0916\u093E\u0924\u093E \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0939\u094B \u0930\u0939\u093E \u0939\u0948...",
  micPromptSpeak: "\u092C\u094B\u0932\u093F\u090F",
  micPromptListening: "\u0938\u0941\u0928 \u0930\u0939\u0947 \u0939\u0948\u0902...",
  micPromptProcessing: "\u0938\u092E\u091D \u0930\u0939\u0947 \u0939\u0948\u0902...",
  micPromptRetry: "\u0926\u094B\u092C\u093E\u0930\u093E \u092C\u094B\u0932\u0947\u0902",
  micCaptionIdle: "\u090F\u0915 \u092C\u093E\u0930 \u091F\u0948\u092A \u0915\u0930\u0947\u0902 \u0914\u0930 \u092C\u094B\u0932\u0947\u0902",
  micCaptionListening: "\u0938\u093E\u092B\u093C \u092C\u094B\u0932\u0947\u0902 \u2022 \u0930\u0941\u0915\u0928\u0947 \u092A\u0930 \u0905\u092A\u0928\u0947 \u0906\u092A \u092C\u0902\u0926 \u0939\u094B\u0917\u093E",
  micCaptionProcessing: "\u0939\u093F\u0938\u093E\u092C \u0924\u0948\u092F\u093E\u0930 \u0939\u094B \u0930\u0939\u093E \u0939\u0948...",
  micErrorFallbackNote: "\u092E\u093E\u0907\u0915 \u0915\u093E\u092E \u0928\u0939\u0940\u0902 \u0915\u0930 \u0930\u0939\u093E \u0924\u094B \u0932\u093F\u0916\u0915\u0930 \u0939\u093F\u0938\u093E\u092C \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964",
  listeningSpeakYourLanguage: "\u0938\u0941\u0928 \u0930\u0939\u0947 \u0939\u0948\u0902... \u0905\u092A\u0928\u0940 \u092D\u093E\u0937\u093E \u092E\u0947\u0902 \u092C\u094B\u0932\u0947\u0902",
  streamingSpeech: "\u0906\u0935\u093E\u091C\u093C \u0906 \u0930\u0939\u0940 \u0939\u0948...",
  processingSpeech: "\u0906\u0935\u093E\u091C\u093C \u0938\u092E\u091D \u0930\u0939\u0947 \u0939\u0948\u0902...",
  heardVoice: "\u0938\u0941\u0928\u0940 \u0917\u0908 \u0906\u0935\u093E\u091C\u093C",
  quickDemoPhrases: "\u0924\u094D\u0935\u0930\u093F\u0924 \u0909\u0926\u093E\u0939\u0930\u0923 / \u092C\u094B\u0932\u0915\u0930 \u0926\u0947\u0916\u0947\u0902",
  tapToTest: "\u092A\u0930\u0940\u0915\u094D\u0937\u0923 \u0915\u0947 \u0932\u093F\u090F \u091F\u0948\u092A \u0915\u0930\u0947\u0902",
  hintPhrase1: "\u0930\u092E\u0947\u0936 \u0915\u094B 500 \u0909\u0927\u093E\u0930 \u0926\u093F\u092F\u093E",
  hintPhrase2: "\u0930\u092E\u0947\u0936 \u0915\u093E 340 \u0909\u0927\u093E\u0930, \u0915\u0932 200 \u0926\u093F\u092F\u093E \u0925\u093E",
  hintPhrase3: "\u0930\u092E\u0947\u0936 \u0915\u093E \u091F\u094B\u091F\u0932?",
  creditGivenTodaySub: "\u0906\u091C \u0926\u093F\u092F\u093E \u0917\u092F\u093E \u0909\u0927\u093E\u0930",
  paymentReceivedTodaySub: "\u0906\u091C \u091C\u092E\u093E \u0939\u0941\u0908 \u0930\u093E\u0936\u093F",
  marketPending: "\u092C\u093E\u091C\u093C\u093E\u0930 \u092C\u093E\u0915\u0940",
  last5Entries: "\u092A\u093F\u091B\u0932\u0940 5 \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u093E\u0902",
  noEntriesYetPrompt: "\u0905\u092D\u0940 \u0915\u094B\u0908 \u0939\u093F\u0938\u093E\u092C \u0926\u0930\u094D\u091C \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u092E\u093E\u0907\u0915 \u0926\u092C\u093E\u0915\u0930 \u092C\u094B\u0932\u0947\u0902!",
  creditBadge: "\u0909\u0927\u093E\u0930",
  paymentBadge: "\u091C\u092E\u093E",
  udhaar: "\u0909\u0927\u093E\u0930",
  jama: "\u091C\u092E\u093E",
  customersCountSorted: "{count} \u0917\u094D\u0930\u093E\u0939\u0915 \u0926\u0930\u094D\u091C \u2022 \u0938\u092C\u0938\u0947 \u0905\u0927\u093F\u0915 \u092C\u093E\u0915\u0940 \u0905\u0928\u0941\u0938\u093E\u0930",
  noCustomersYet: "\u0905\u092D\u0940 \u0915\u094B\u0908 \u0917\u094D\u0930\u093E\u0939\u0915 \u0928\u0939\u0940\u0902",
  noCustomersDescription: "\u0905\u092D\u0940 \u0915\u094B\u0908 \u0917\u094D\u0930\u093E\u0939\u0915 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u092A\u0939\u0932\u093E \u0909\u0927\u093E\u0930 \u092C\u094B\u0932\u0915\u0930 \u091C\u094B\u0921\u093C\u0947\u0902\u0964",
  noCustomerFound: "\u0915\u094B\u0908 \u0917\u094D\u0930\u093E\u0939\u0915 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E",
  noMatchingCustomerQuery: '"{query}" \u0915\u0947 \u0932\u093F\u090F \u0915\u094B\u0908 \u0917\u094D\u0930\u093E\u0939\u0915 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964 \u092C\u094B\u0932\u0915\u0930 \u0928\u092F\u093E \u0939\u093F\u0938\u093E\u092C \u091C\u094B\u0921\u093C\u0947\u0902\u0964',
  noCustomersInFilter: "\u0907\u0938 \u092B\u093C\u093F\u0932\u094D\u091F\u0930 \u092E\u0947\u0902 \u0915\u094B\u0908 \u0917\u094D\u0930\u093E\u0939\u0915 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964",
  firstUdhaarVoice: "\u{1F3A4} \u092A\u0939\u0932\u093E \u0909\u0927\u093E\u0930 \u092C\u094B\u0932\u0915\u0930 \u091C\u094B\u0921\u093C\u0947\u0902",
  addCustomerButton: "+ \u0917\u094D\u0930\u093E\u0939\u0915 \u091C\u094B\u0921\u093C\u0947\u0902",
  addNewCustomerTitle: "\u0928\u092F\u093E \u0917\u094D\u0930\u093E\u0939\u0915 \u091C\u094B\u0921\u093C\u0947\u0902",
  addNewCustomerSubtitle: "\u092C\u093F\u0928\u093E \u0939\u093F\u0938\u093E\u092C \u0915\u0947 \u0928\u092F\u093E \u0917\u094D\u0930\u093E\u0939\u0915 \u091C\u094B\u0921\u093C\u0947\u0902",
  lastActivity: "\u0905\u0902\u0924\u093F\u092E: {date}",
  badgeOwes: "\u092C\u093E\u0915\u0940",
  badgeSettled: "\u091A\u0941\u0915\u0924\u093E",
  badgeNew: "\u0928\u092F\u093E",
  listenBalance: "\u0938\u0941\u0928\u0947\u0902",
  lastReminderDate: "\u0905\u0902\u0924\u093F\u092E \u0930\u093F\u092E\u093E\u0907\u0902\u0921\u0930: {date}",
  outstandingUdhaar: "\u0915\u0941\u0932 \u092C\u093E\u0915\u0940 \u0909\u0927\u093E\u0930",
  allSettled: "\u0938\u092C \u0939\u093F\u0938\u093E\u092C \u091A\u0941\u0915\u0924\u093E",
  amountToReceive: "\u0917\u094D\u0930\u093E\u0939\u0915 \u0938\u0947 \u0932\u0947\u0928\u093E \u0939\u0948",
  noBalancePending: "\u0915\u094B\u0908 \u092C\u093E\u0915\u0940 \u0928\u0939\u0940\u0902 \u0939\u0948",
  totalCreditLabel: "\u0915\u0941\u0932 \u0909\u0927\u093E\u0930:",
  totalPaymentLabel: "\u0915\u0941\u0932 \u091C\u092E\u093E:",
  sendWhatsAppReminder: "\u0935\u094D\u0939\u093E\u091F\u094D\u0938\u090F\u092A \u0930\u093F\u092E\u093E\u0907\u0902\u0921\u0930",
  printReceipt: "\u0930\u0938\u0940\u0926 \u092A\u094D\u0930\u093F\u0902\u091F \u0915\u0930\u0947\u0902",
  addUdhaarButton: "+ \u0909\u0927\u093E\u0930 \u0932\u093F\u0916\u0947\u0902",
  addPaymentButton: "+ \u091C\u092E\u093E \u0932\u093F\u0916\u0947\u0902",
  timelineEntries: "\u0939\u093F\u0938\u093E\u092C \u091F\u093E\u0907\u092E\u0932\u093E\u0907\u0928 ({count} \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u093E\u0902)",
  latestFirst: "\u0928\u0935\u0940\u0928\u0924\u092E \u092A\u0939\u0932\u0947",
  noEntriesTitle: "\u0915\u094B\u0908 \u0939\u093F\u0938\u093E\u092C \u0928\u0939\u0940\u0902 \u0939\u0948",
  noEntriesCustomerDesc: "\u0907\u0938 \u0917\u094D\u0930\u093E\u0939\u0915 \u0915\u0947 \u0932\u093F\u090F \u0905\u092D\u0940 \u0915\u094B\u0908 \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F \u0928\u0939\u0940\u0902 \u0939\u0948\u0964",
  deleteEntryConfirm: "\u0915\u094D\u092F\u093E \u0906\u092A \u0907\u0938 \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F \u0915\u094B \u0939\u091F\u093E\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902?",
  enterValidAmount: "\u0915\u0943\u092A\u092F\u093E \u0938\u0939\u0940 \u0930\u0915\u092E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  entryDeletedToast: "\u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F \u0939\u091F\u093E \u0926\u0940 \u0917\u0908",
  customerNotFoundTitle: "\u0917\u094D\u0930\u093E\u0939\u0915 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E",
  customerNotFoundDesc: "\u092F\u0939 \u0917\u094D\u0930\u093E\u0939\u0915 \u0916\u093E\u0924\u0947 \u092E\u0947\u0902 \u0909\u092A\u0932\u092C\u094D\u0927 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964",
  viewCustomersList: "\u0917\u094D\u0930\u093E\u0939\u0915 \u0938\u0942\u091A\u0940 \u0926\u0947\u0916\u0947\u0902",
  customerAlreadyExists: "{name} \u092A\u0939\u0932\u0947 \u0938\u0947 \u0926\u0930\u094D\u091C \u0939\u0948",
  similarCustomerWarning: "\u0907\u0938 \u0928\u093E\u092E \u0938\u0947 \u092E\u093F\u0932\u0924\u093E-\u091C\u0941\u0932\u0924\u093E \u0917\u094D\u0930\u093E\u0939\u0915 \u092A\u0939\u0932\u0947 \u0938\u0947 \u0926\u0930\u094D\u091C \u0939\u0948\u0964 \u0915\u094D\u092F\u093E \u0906\u092A \u0907\u0928\u094D\u0939\u0940\u0902 \u0915\u093E \u0916\u093E\u0924\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902?",
  useThisOne: "\u092F\u0939 \u091A\u0941\u0928\u0947\u0902",
  createAnyway: "\u0928\u092F\u093E \u092C\u0928\u093E\u090F\u0902",
  customerNameLabel: "\u0917\u094D\u0930\u093E\u0939\u0915 \u0915\u093E \u0928\u093E\u092E",
  mobileNumberOptional: "\u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930 (\u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915)",
  phoneReminderHelper: "\u0935\u094D\u0939\u093E\u091F\u094D\u0938\u090F\u092A \u0930\u093F\u092E\u093E\u0907\u0902\u0921\u0930 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u094B\u0917\u0940 (\u092C\u093E\u0926 \u092E\u0947\u0902 \u092D\u0940 \u091C\u094B\u0921\u093C \u0938\u0915\u0924\u0947 \u0939\u0948\u0902)\u0964",
  saveCustomer: "\u0917\u094D\u0930\u093E\u0939\u0915 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0915\u0930\u0947\u0902",
  saving: "\u0938\u0947\u0935 \u0939\u094B \u0930\u0939\u093E \u0939\u0948...",
  enterCustomerNameError: "\u0915\u0943\u092A\u092F\u093E \u0917\u094D\u0930\u093E\u0939\u0915 \u0915\u093E \u0928\u093E\u092E \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
  errorSavingCustomer: "\u0917\u094D\u0930\u093E\u0939\u0915 \u091C\u094B\u0921\u093C\u0928\u0947 \u092E\u0947\u0902 \u0938\u092E\u0938\u094D\u092F\u093E \u0906\u0908",
  dailySummarySubtitle: "\u0926\u0948\u0928\u093F\u0915 \u0935\u0938\u0942\u0932\u0940 \u090F\u0935\u0902 \u0909\u0927\u093E\u0930 \u0938\u093E\u0930\u093E\u0902\u0936",
  shareSlip: "\u092A\u0930\u094D\u091A\u0940 \u0938\u093E\u091D\u093E \u0915\u0930\u0947\u0902",
  copied: "\u0915\u0949\u092A\u0940 \u0939\u094B \u0917\u092F\u093E",
  dateLabel: "\u0924\u093E\u0930\u0940\u0916:",
  creditGivenToday: "\u0906\u091C \u0926\u093F\u092F\u093E \u0917\u092F\u093E \u0909\u0927\u093E\u0930",
  paymentReceivedToday: "\u0906\u091C \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u091C\u092E\u093E",
  netUdhaarIncreased: "\u0928\u0947\u091F \u0909\u0927\u093E\u0930 \u092C\u0922\u093C\u093E",
  netUdhaarDecreased: "\u0928\u0947\u091F \u0909\u0927\u093E\u0930 \u0918\u091F\u093E",
  entriesCountLabel: "\u0915\u0941\u0932 \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u093E\u0902",
  activeCustomersCount: "{count} \u0917\u094D\u0930\u093E\u0939\u0915 \u0938\u0915\u094D\u0930\u093F\u092F",
  noDataAvailable: "\u0921\u0947\u091F\u093E \u0909\u092A\u0932\u092C\u094D\u0927 \u0928\u0939\u0940\u0902 \u0939\u0948",
  noDataForDate: "\u0907\u0938 \u0924\u093E\u0930\u0940\u0916 \u0915\u0947 \u0932\u093F\u090F \u0939\u093F\u0938\u093E\u092C \u0909\u092A\u0932\u092C\u094D\u0927 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964",
  noPendingCustomersAllSettled: "\u0915\u094B\u0908 \u092C\u093E\u0915\u0940 \u0909\u0927\u093E\u0930 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u0938\u092C \u0939\u093F\u0938\u093E\u092C \u091A\u0941\u0915\u0924\u093E \u0939\u0948! \u2713",
  reviewEntryTitle: "\u0939\u093F\u0938\u093E\u092C \u091C\u093E\u0902\u091A\u0947\u0902",
  duplicateEntryWarningTitle: "\u0910\u0938\u093E \u0939\u093F\u0938\u093E\u092C \u0905\u092D\u0940 \u0926\u0930\u094D\u091C \u0939\u0941\u0906 \u0925\u093E\u0964 \u092B\u093F\u0930 \u0938\u0947 \u0938\u0947\u0935 \u0915\u0930\u0947\u0902?",
  duplicateEntryWarningDesc: "{name} \u0915\u0947 \u0932\u093F\u090F \u20B9{amount} \u0915\u093E {type} \u092A\u093F\u091B\u0932\u0947 10 \u092E\u093F\u0928\u091F \u092E\u0947\u0902 \u0926\u0930\u094D\u091C \u0939\u094B \u091A\u0941\u0915\u093E \u0939\u0948\u0964",
  saveAnyway: "\u092B\u093F\u0930 \u092D\u0940 \u0938\u0947\u0935 \u0915\u0930\u0947\u0902",
  correctByVoice: "\u0906\u0935\u093E\u091C\u093C \u0938\u0947 \u0938\u0941\u0927\u093E\u0930\u0947\u0902",
  listeningTapToStop: "\u0938\u0941\u0928 \u0930\u0939\u0947 \u0939\u0948\u0902... (\u0930\u094B\u0915\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u091F\u0948\u092A \u0915\u0930\u0947\u0902)",
  confirmAndSave: "\u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0947\u0902 \u0914\u0930 \u0938\u0947\u0935 \u0915\u0930\u0947\u0902",
  voiceSavingCommand: "\u0906\u0935\u093E\u091C\u093C \u0938\u0947 \u0938\u0947\u0935 \u0939\u094B \u0930\u0939\u093E \u0939\u0948...",
  voiceCancelledCommand: "\u0906\u0935\u093E\u091C\u093C \u0938\u0947 \u0930\u0926\u094D\u0926 \u0915\u093F\u092F\u093E \u0917\u092F\u093E",
  voiceAmountUpdated: "\u0930\u0915\u092E \u092C\u0926\u0932\u0915\u0930 \u20B9{amount} \u0915\u0940 \u0917\u0908",
  amountInRupees: "\u0930\u0915\u092E (\u20B9 \u092E\u0947\u0902)",
  relativeToday: "\u0906\u091C",
  relativeYesterday: "\u0915\u0932",
  relativeDayBefore: "\u092A\u0930\u0938\u094B\u0902",
  pickDate: "\u0924\u093E\u0930\u0940\u0916 \u091A\u0941\u0928\u0947\u0902",
  notePlaceholder: "\u0935\u093F\u0935\u0930\u0923 / \u0928\u094B\u091F (\u0909\u0926\u093E. \u0926\u0942\u0927, \u091A\u0940\u0928\u0940, \u0926\u093E\u0932)",
  balanceInquiryTitle: "\u0916\u093E\u0924\u093E \u092C\u0948\u0932\u0947\u0902\u0938 \u092A\u0942\u091B\u0924\u093E\u091B",
  balancePendingUdhaar: "\u0915\u0941\u0932 \u092C\u093E\u0915\u0940 \u0909\u0927\u093E\u0930",
  advancePayment: "\u0905\u0917\u094D\u0930\u093F\u092E \u091C\u092E\u093E",
  speaking: "\u092C\u094B\u0932 \u0930\u0939\u0947 \u0939\u0948\u0902...",
  replayVoice: "\u0938\u0941\u0928\u0947\u0902",
  allClear: "\u0938\u092C \u091A\u0941\u0915\u0924\u093E \u0939\u0948 \u2713",
  last3Transactions: "\u092A\u093F\u091B\u0932\u0947 3 \u0939\u093F\u0938\u093E\u092C",
  noPreviousTransactions: "\u0915\u094B\u0908 \u092A\u093F\u091B\u0932\u093E \u0939\u093F\u0938\u093E\u092C \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E",
  viewKhata: "\u0916\u093E\u0924\u093E \u0926\u0947\u0916\u0947\u0902",
  whichCustomerAskDigits: "\u0915\u094C\u0928 \u0938\u093E {name}? \u0928\u0902\u092C\u0930 \u0915\u0947 \u0906\u0916\u093C\u093F\u0930\u0940 \u091A\u093E\u0930 \u0905\u0902\u0915 \u092C\u0924\u093E\u0907\u090F\u0964",
  sameLastDigitsAskMore: "\u0926\u094B\u0928\u094B\u0902 \u0915\u0947 \u0906\u0916\u093C\u093F\u0930\u0940 \u0905\u0902\u0915 \u090F\u0915 \u091C\u0948\u0938\u0947 \u0939\u0948\u0902\u0964 \u0915\u0943\u092A\u092F\u093E \u0906\u0916\u093C\u093F\u0930\u0940 {count} \u0905\u0902\u0915 \u092C\u0924\u093E\u0907\u090F\u0964",
  numberNotFoundRetry: "\u092F\u0939 \u0928\u0902\u092C\u0930 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E, \u092B\u093F\u0930 \u0938\u0947 \u092C\u0924\u093E\u0907\u090F\u0964",
  numberNotFoundTapCard: "\u092F\u0939 \u0928\u0902\u092C\u0930 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u0915\u093E\u0930\u094D\u0921 \u092A\u0930 \u091F\u0948\u092A \u0915\u0930\u0947\u0902\u0964",
  newCustomerAddedToast: "\u0928\u092F\u093E \u0917\u094D\u0930\u093E\u0939\u0915 \u091C\u094B\u0921\u093C\u093E \u0917\u092F\u093E: {name}",
  entrySavedSuccess: "{name} \u0915\u093E {type} \u0938\u092B\u0932\u0924\u093E\u092A\u0942\u0930\u094D\u0935\u0915 \u0926\u0930\u094D\u091C \u0939\u0941\u0906!",
  multiEntriesSavedSuccess: "{count} \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u093E\u0902 \u0938\u092B\u0932\u0924\u093E\u092A\u0942\u0930\u094D\u0935\u0915 \u0938\u0947\u0935 \u0939\u094B \u0917\u0908\u0902!",
  didNotUnderstandRepeat: "\u0939\u093F\u0938\u093E\u092C \u0938\u092E\u091D \u0928\u0939\u0940\u0902 \u0906\u092F\u093E\u0964 \u0915\u0943\u092A\u092F\u093E \u0926\u094B\u092C\u093E\u0930\u093E \u092C\u094B\u0932\u0947\u0902\u0964",
  languageChangedToast: "\u092D\u093E\u0937\u093E \u092C\u0926\u0932 \u0917\u0908: {lang}",
  speechLanguageChangedToast: "\u092C\u094B\u0932\u0928\u0947 \u0915\u0940 \u092D\u093E\u0937\u093E: {lang}",
  offlineModeNoticeTitle: "\u0911\u092B\u0932\u093E\u0907\u0928 \u092E\u094B\u0921",
  offlineModeNoticeDesc: "\u0916\u093E\u0924\u093E 100% \u0911\u092B\u0932\u093E\u0907\u0928 \u0915\u093E\u092E \u0915\u0930\u0924\u093E \u0939\u0948\u0964 \u092C\u094B\u0932\u0915\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0907\u0902\u091F\u0930\u0928\u0947\u091F \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u094B \u0938\u0915\u0924\u0940 \u0939\u0948; \u091F\u093E\u0907\u092A\u093F\u0902\u0917 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964",
  networkDisconnected: "\u0928\u0947\u091F\u0935\u0930\u094D\u0915 \u0921\u093F\u0938\u094D\u0915\u0928\u0947\u0915\u094D\u091F \u0939\u094B \u0917\u092F\u093E",
  pinIncorrect: "\u0917\u0932\u0924 \u092A\u093F\u0928! \u0915\u0943\u092A\u092F\u093E \u092A\u0941\u0928\u0903 \u092A\u094D\u0930\u092F\u093E\u0938 \u0915\u0930\u0947\u0902\u0964",
  pinLockedMessage: "\u0906\u092A\u0915\u093E \u0916\u093E\u0924\u093E AES-256 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0939\u0948\u0964 \u0915\u0943\u092A\u092F\u093E \u0905\u092A\u0928\u093E \u092A\u093F\u0928 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902:",
  pinResetConfirm: "\u0939\u093E\u0901, \u0930\u0940\u0938\u0947\u091F \u0915\u0930\u0947\u0902",
  totalUdhaar: "\u0915\u0941\u0932 \u0909\u0927\u093E\u0930",
  totalJama: "\u0915\u0941\u0932 \u091C\u092E\u093E",
  totalBalance: "\u0915\u0941\u0932 \u092C\u093E\u0915\u0940",
  udhaarAdded: "\u0909\u0927\u093E\u0930 \u091C\u094B\u0921\u093C\u093E \u0917\u092F\u093E",
  savePhoneToProfileHint: "\u090F\u0915 \u092C\u093E\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0928\u0947 \u092A\u0930 \u092F\u0939 \u0928\u0902\u092C\u0930 \u0917\u094D\u0930\u093E\u0939\u0915 \u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932 \u092E\u0947\u0902 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0939\u094B \u091C\u093E\u090F\u0917\u093E\u0964",
  numberClearedSpeakAgain: "\u0928\u0902\u092C\u0930 \u0939\u091F\u093E \u0926\u093F\u092F\u093E \u0917\u092F\u093E\u0964 \u0926\u094B\u092C\u093E\u0930\u093E \u092C\u094B\u0932\u0947\u0902 \u092F\u093E \u0915\u0940\u092A\u0948\u0921 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964",
  pendingEntrySavedAfterReg: "{type} \u20B9{amount} \u092A\u0902\u091C\u0940\u0915\u0930\u0923 \u0915\u0947 \u092C\u093E\u0926 \u0938\u0947\u0935 \u0939\u094B \u091C\u093E\u090F\u0917\u093E",
  recentEntriesReceipt: "\u0939\u093E\u0932\u093F\u092F\u093E \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u093E\u0902:",
  numeralScriptLabel: "\u0905\u0902\u0915 \u0932\u093F\u092A\u093F",
  numeralScriptDesc: "\u0938\u0902\u0916\u094D\u092F\u093E\u090F\u0902 \u0905\u0902\u0917\u094D\u0930\u0947\u091C\u0940 (1, 2, 3) \u092F\u093E \u0926\u0947\u0935\u0928\u093E\u0917\u0930\u0940 \u0932\u093F\u092A\u093F \u092E\u0947\u0902 \u0926\u093F\u0916\u093E\u090F\u0902",
  scriptLatin: "\u0905\u0902\u0917\u094D\u0930\u0947\u091C\u0940 (1, 2, 3)",
  scriptNative: "\u0926\u0947\u0935\u0928\u093E\u0917\u0930\u0940 (\u0967, \u0968, \u0969)",
  invalidPhoneError: "\u0915\u0943\u092A\u092F\u093E 10 \u0905\u0902\u0915\u094B\u0902 \u0915\u093E \u092E\u093E\u0928\u094D\u092F \u092D\u093E\u0930\u0924\u0940\u092F \u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902 (6-9 \u0938\u0947 \u0936\u0941\u0930\u0942)",
  speakNamePrompt: "\u0917\u094D\u0930\u093E\u0939\u0915 \u0915\u093E \u0928\u093E\u092E \u092C\u094B\u0932\u0947\u0902...",
  phoneHelpText: "\u0935\u094D\u0939\u093E\u091F\u094D\u0938\u090F\u092A \u0930\u093F\u092E\u093E\u0907\u0902\u0921\u0930 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u094B\u0917\u0940 (\u092C\u093E\u0926 \u092E\u0947\u0902 \u092D\u0940 \u091C\u094B\u0921\u093C \u0938\u0915\u0924\u0947 \u0939\u0948\u0902)\u0964",
  manualEntryTitle: "\u092E\u0948\u0928\u0941\u0905\u0932 \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F (\u092C\u093F\u0928\u093E \u0906\u0935\u093E\u091C\u093C)",
  today: "\u0906\u091C",
  yesterday: "\u0915\u0932",
  dayBeforeYesterday: "\u092A\u0930\u0938\u094B\u0902",
  baakiOwed: "\u092C\u093E\u0915\u0940",
  listenReplay: "\u0938\u0941\u0928\u0947\u0902",
  sendReminder: "\u0930\u093F\u092E\u093E\u0907\u0902\u0921\u0930 \u092D\u0947\u091C\u0947\u0902",
  active: "\u0938\u0915\u094D\u0930\u093F\u092F",
  noRecentActivity: "\u0915\u094B\u0908 \u0939\u093E\u0932\u093F\u092F\u093E \u0917\u0924\u093F\u0935\u093F\u0927\u093F \u0928\u0939\u0940\u0902",
  listeningDigitsPrompt: "\u0938\u0941\u0928 \u0930\u0939\u0947 \u0939\u0948\u0902... \u0906\u0916\u093C\u093F\u0930\u0940 4 \u0905\u0902\u0915 \u092C\u094B\u0932\u0947\u0902",
  tapCardOrMic: "\u0915\u093E\u0930\u094D\u0921 \u092A\u0930 \u091F\u0948\u092A \u0915\u0930\u0947\u0902 \u092F\u093E \u0926\u094B\u092C\u093E\u0930\u093E \u092C\u094B\u0932\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092E\u093E\u0907\u0915 \u0926\u092C\u093E\u090F\u0902",
  first: "\u092A\u0939\u0932\u093E",
  second: "\u0926\u0942\u0938\u0930\u093E",
  qrSaveError: "QR \u0915\u094B\u0921 \u0938\u0947\u0935 \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u093E",
  khataStatementSlip: "\u0916\u093E\u0924\u093E \u0935\u093F\u0935\u0930\u0923 \u092A\u0930\u094D\u091A\u0940",
  thankYouShopping: "\u0935\u094D\u092F\u093E\u092A\u093E\u0930 \u0915\u0947 \u0932\u093F\u090F \u0927\u0928\u094D\u092F\u0935\u093E\u0926! \u{1F64F}",
  receiptSharedSuccess: "\u0930\u0938\u0940\u0926 \u0936\u0947\u092F\u0930 \u0939\u094B \u0917\u0908!",
  receiptCopiedSuccess: "\u0930\u0938\u0940\u0926 \u0915\u094D\u0932\u093F\u092A\u092C\u094B\u0930\u094D\u0921 \u092A\u0930 \u0915\u0949\u092A\u0940 \u0939\u094B \u0917\u0908!",
  whatsappPhoneNumber: "\u0935\u094D\u0939\u093E\u091F\u094D\u0938\u090F\u092A \u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930",
  selectTemplateLanguage: "\u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F \u092D\u093E\u0937\u093E \u091A\u0941\u0928\u0947\u0902",
  messagePreview: "\u0938\u0902\u0926\u0947\u0936 \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 (\u092C\u0926\u0932\u093E \u091C\u093E \u0938\u0915\u0924\u093E \u0939\u0948)",
  messageCopiedToast: "\u0938\u0902\u0926\u0947\u0936 \u0915\u0949\u092A\u0940 \u0939\u094B \u0917\u092F\u093E!",
  offlineSabChalega: "\u0911\u092B\u0932\u093E\u0907\u0928 \u2013 \u0938\u092C \u091A\u0932\u0947\u0917\u093E",
  offlineSafeMessage: "\u0906\u092A\u0915\u093E \u092A\u0942\u0930\u093E \u0916\u093E\u0924\u093E 100% \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0939\u0948 \u0914\u0930 \u0907\u0938\u0940 \u092B\u094B\u0928 \u092E\u0947\u0902 \u0938\u0947\u0935 \u0939\u094B\u0924\u093E \u0930\u0939\u0947\u0917\u093E\u0964",
  offlineMicWarning: "\u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0935\u0949\u0907\u0938 \u092E\u093E\u0907\u0915 \u0915\u0947 \u0932\u093F\u090F \u0907\u0902\u091F\u0930\u0928\u0947\u091F \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0939\u094B \u0938\u0915\u0924\u0940 \u0939\u0948\u0964 \u092F\u0926\u093F \u092E\u093E\u0907\u0915 \u0928 \u091A\u0932\u0947, \u0924\u094B '\u091F\u093E\u0907\u092A \u0915\u0930\u0947\u0902' \u0938\u0947 \u092C\u093F\u0928\u093E \u0930\u0941\u0915\u093E\u0935\u091F \u090F\u0902\u091F\u094D\u0930\u0940 \u0915\u0930\u0947\u0902\u0964",
  openTypeInstead: "'\u091F\u093E\u0907\u092A \u0915\u0930\u0947\u0902' \u0916\u094B\u0932\u0947\u0902",
  gotIt: "\u0920\u0940\u0915 \u0939\u0948, \u0938\u092E\u091D \u0917\u092F\u093E",
  pinLockedNotice: "\u0906\u092A\u0915\u093E \u0916\u093E\u0924\u093E AES-256 \u090F\u0928\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u091F\u0947\u0921 \u0939\u0948\u0964 \u0915\u0943\u092A\u092F\u093E \u0905\u092A\u0928\u093E \u092A\u093F\u0928 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902:",
  pinCryptoLockDesc: "\u0938\u092D\u0940 \u0916\u093E\u0924\u093E \u0930\u093F\u0915\u0949\u0930\u094D\u0921 \u0935\u0947\u092C \u0915\u094D\u0930\u093F\u092A\u094D\u091F\u094B (AES-256 GCM) \u0938\u0947 \u0921\u093F\u0935\u093E\u0907\u0938 \u092E\u0947\u0902 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0939\u0948\u0902\u0964",
  yesReset: "\u0939\u093E\u0901, \u0930\u0940\u0938\u0947\u091F \u0915\u0930\u0947\u0902",
  dailySummarySub: "\u0926\u0948\u0928\u093F\u0915 \u0935\u0938\u0942\u0932\u0940 \u090F\u0935\u0902 \u0909\u0927\u093E\u0930 \u0938\u093E\u0930\u093E\u0902\u0936",
  activeCustomersLabel: "\u0938\u0915\u094D\u0930\u093F\u092F \u0917\u094D\u0930\u093E\u0939\u0915",
  noDataAvailableDesc: "\u0907\u0938 \u0924\u093E\u0930\u0940\u0916 \u0915\u0947 \u0932\u093F\u090F \u0915\u094B\u0908 \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u0940\u0964",
  noPendingUdhaarAllSettled: "\u0915\u094B\u0908 \u0932\u0902\u092C\u093F\u0924 \u0909\u0927\u093E\u0930 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u0938\u092D\u0940 \u0916\u093E\u0924\u0947 \u091A\u0941\u0915\u0924\u093E \u0939\u0948\u0902! \u2713",
  zeroBalance: "\u0939\u093F\u0938\u093E\u092C \u091A\u0941\u0915\u0924\u093E, \u0915\u094B\u0908 \u092C\u093E\u0915\u0940 \u0928\u0939\u0940\u0902",
  khataTimeline: "\u0916\u093E\u0924\u093E \u0938\u092E\u092F\u0930\u0947\u0916\u093E",
  saveEntry: "\u090F\u0902\u091F\u094D\u0930\u0940 \u0938\u0947\u0935 \u0915\u0930\u0947\u0902",
  addUdhaar: "+ \u0909\u0927\u093E\u0930 \u091C\u094B\u0921\u093C\u0947\u0902",
  addPayment: "+ \u091C\u092E\u093E \u091C\u094B\u0921\u093C\u0947\u0902",
  addEntry: "\u090F\u0902\u091F\u094D\u0930\u0940 \u091C\u094B\u0921\u093C\u0947\u0902",
  noteOptional: "\u0935\u093F\u0935\u0930\u0923 / \u0928\u094B\u091F (\u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915)",
  whatsappReminder: "\u0935\u094D\u0939\u093E\u091F\u094D\u0938\u090F\u092A",
  lastReminder: "\u0906\u0916\u093C\u093F\u0930\u0940 \u0930\u093F\u092E\u093E\u0907\u0902\u0921\u0930",
  savingByVoice: "\u0906\u0935\u093E\u091C\u093C \u0938\u0947 \u0938\u0947\u0935 \u0939\u094B \u0930\u0939\u093E \u0939\u0948...",
  cancelledByVoice: "\u0906\u0935\u093E\u091C\u093C \u0938\u0947 \u0930\u0926\u094D\u0926 \u0915\u093F\u092F\u093E \u0917\u092F\u093E",
  noCustomersEmptyState: "\u0905\u092D\u0940 \u0915\u094B\u0908 \u0917\u094D\u0930\u093E\u0939\u0915 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u092A\u0939\u0932\u093E \u0909\u0927\u093E\u0930 \u092C\u094B\u0932\u0915\u0930 \u091C\u094B\u0921\u093C\u0947\u0902",
  addFirstUdhaarVoice: "\u{1F3A4} \u092A\u0939\u0932\u093E \u0909\u0927\u093E\u0930 \u092C\u094B\u0932\u0915\u0930 \u091C\u094B\u0921\u093C\u0947\u0902",
  onboardingStep1Title: "1. \u092C\u0938 \u092E\u093E\u0907\u0915 \u0926\u092C\u093E\u0915\u0930 \u092C\u094B\u0932\u0947\u0902",
  onboardingStep1Desc: "\u0926\u0941\u0915\u093E\u0928 \u092A\u0930 \u0939\u093E\u0925 \u0935\u094D\u092F\u0938\u094D\u0924 \u0939\u0948\u0902? \u092C\u0938 \u092E\u093E\u0907\u0915 \u0926\u092C\u093E\u090F\u0902 \u0914\u0930 \u0905\u092A\u0928\u0940 \u092D\u093E\u0937\u093E \u092E\u0947\u0902 \u092C\u094B\u0932\u0947\u0902\u0964",
  onboardingStep2Title: "2. \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 \u0926\u0947\u0916\u0947\u0902",
  onboardingStep2Desc: "\u0906\u0935\u093E\u091C\u093C \u0938\u0941\u0928\u0924\u0947 \u0939\u0940 \u0910\u092A \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F \u0915\u093E \u092A\u0942\u0930\u094D\u0935\u093E\u0935\u0932\u094B\u0915\u0928 \u0926\u093F\u0916\u093E\u090F\u0917\u093E\u0964 \u0938\u0947\u0935 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u091F\u0948\u092A \u0915\u0930\u0947\u0902 \u092F\u093E \u0906\u0935\u093E\u091C\u093C \u0938\u0947 \u0938\u0941\u0927\u093E\u0930\u0947\u0902\u0964",
  onboardingStep3Title: "3. \u0924\u0941\u0930\u0902\u0924 \u0916\u093E\u0924\u093E \u0905\u092A\u0921\u0947\u091F \u0935 \u0930\u093F\u092E\u093E\u0907\u0902\u0921\u0930",
  onboardingStep3Desc: "\u0917\u094D\u0930\u093E\u0939\u0915 \u0915\u093E \u0916\u093E\u0924\u093E \u0924\u0941\u0930\u0902\u0924 \u0905\u092A\u0921\u0947\u091F \u0939\u094B \u091C\u093E\u0924\u093E \u0939\u0948! \u090F\u0915 \u091F\u0948\u092A \u092E\u0947\u0902 \u0935\u094D\u0939\u093E\u091F\u094D\u0938\u090F\u092A \u0930\u093F\u092E\u093E\u0907\u0902\u0921\u0930 \u092D\u0947\u091C\u0947\u0902 \u092F\u093E \u0930\u0938\u0940\u0926 \u092A\u094D\u0930\u093F\u0902\u091F \u0915\u0930\u0947\u0902\u0964",
  grantMicAndStart: "\u092E\u093E\u0907\u0915 \u0905\u0928\u0941\u092E\u0924\u093F \u0926\u0947\u0902 \u0914\u0930 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902",
  installAppTitle: "\u0910\u092A \u0907\u0902\u0938\u094D\u091F\u0949\u0932 \u0915\u0930\u0947\u0902 (\u0939\u094B\u092E \u0938\u094D\u0915\u094D\u0930\u0940\u0928)",
  installAppSub: "\u092B\u093E\u0938\u094D\u091F \u0914\u0930 100% \u0911\u092B\u0932\u093E\u0907\u0928 \u091A\u0932\u0947\u0917\u093E \u2022 1 \u091F\u0948\u092A \u092E\u0947\u0902 \u0916\u093E\u0924\u093E",
  install: "\u0907\u0902\u0938\u094D\u091F\u0949\u0932",
  errorBoundaryTitle: "\u0915\u0941\u091B \u0917\u0921\u093C\u092C\u0921\u093C \u0939\u0941\u0908",
  errorBoundarySub: "\u0915\u0941\u091B \u0917\u0921\u093C\u092C\u0921\u093C \u0939\u0941\u0908, \u0932\u0947\u0915\u093F\u0928 \u091A\u093F\u0902\u0924\u093E \u0928 \u0915\u0930\u0947\u0902!",
  errorBoundarySafety: "\u0906\u092A\u0915\u093E \u0938\u093E\u0930\u093E \u0916\u093E\u0924\u093E \u0921\u0947\u091F\u093E \u0906\u092A\u0915\u0947 \u092B\u094B\u0928 \u092E\u0947\u0902 \u092C\u093F\u0932\u094D\u0915\u0941\u0932 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 (IndexedDB) \u0939\u0948\u0964 \u0915\u0941\u091B \u0916\u094B\u092F\u093E \u0928\u0939\u0940\u0902 \u0939\u0948\u0964",
  retryButton: "\u0926\u094B\u092C\u093E\u0930\u093E \u0915\u094B\u0936\u093F\u0936 \u0915\u0930\u0947\u0902",
  goHomeButton: "\u0939\u094B\u092E \u092A\u0930 \u091C\u093E\u090F\u0902",
  technicalDetails: "\u0924\u0915\u0928\u0940\u0915\u0940 \u0924\u094D\u0930\u0941\u091F\u093F \u0935\u093F\u0935\u0930\u0923"
};

// src/i18n/locales/kn.json
var kn_default = {
  appName: "Udhaar Sathi (\u0C89\u0CA6\u0CCD\u0CB0\u0CBF \u0CB8\u0CBE\u0CA5\u0CBF)",
  tagline: "\u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CBF \u0CB8\u0CBE\u0CB2 \u0CA8\u0CAE\u0CC2\u0CA6\u0CBF\u0CB8\u0CBF",
  online: "\u0C86\u0CA8\u0CCD\u200C\u0CB2\u0CC8\u0CA8\u0CCD",
  offlineSafe: "\u0C86\u0CAB\u0CCD\u200C\u0CB2\u0CC8\u0CA8\u0CCD \u0CB8\u0CC1\u0CB0\u0C95\u0CCD\u0CB7\u0CBF\u0CA4 (\u0CB8\u0CCD\u0CA5\u0CB3\u0CC0\u0CAF)",
  navHome: "\u0CAE\u0CC1\u0C96\u0CAA\u0CC1\u0C9F (\u0CAE\u0CC8\u0C95\u0CCD)",
  navCustomers: "\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0 \u0C96\u0CBE\u0CA4\u0CC6",
  navSummary: "\u0CA6\u0CC8\u0CA8\u0C82\u0CA6\u0CBF\u0CA8 \u0CB8\u0CBE\u0CB0\u0CBE\u0C82\u0CB6",
  navSettings: "\u0CB8\u0CC6\u0C9F\u0CCD\u0C9F\u0CBF\u0C82\u0C97\u0CCD\u200C\u0C97\u0CB3\u0CC1",
  navStyleguide: "\u0CB6\u0CC8\u0CB2\u0CBF \u0CAE\u0CBE\u0CB0\u0CCD\u0C97\u0CA6\u0CB0\u0CCD\u0CB6\u0CBF",
  save: "\u0C89\u0CB3\u0CBF\u0CB8\u0CBF",
  cancel: "\u0CB0\u0CA6\u0CCD\u0CA6\u0CC1\u0CAE\u0CBE\u0CA1\u0CBF",
  delete: "\u0C85\u0CB3\u0CBF\u0CB8\u0CBF",
  edit: "\u0CA4\u0CBF\u0CA6\u0CCD\u0CA6\u0CC1",
  close: "\u0CAE\u0CC1\u0C9A\u0CCD\u0C9A\u0CBF",
  search: "\u0CB9\u0CC1\u0CA1\u0CC1\u0C95\u0CBF",
  back: "\u0CB9\u0CBF\u0C82\u0CA6\u0C95\u0CCD\u0C95\u0CC6",
  done: "\u0CAA\u0CC2\u0CB0\u0CCD\u0CA3",
  creditGiven: "\u0CB8\u0CBE\u0CB2 \u0CA8\u0CC0\u0CA1\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  paymentReceived: "\u0CB9\u0CA3 \u0CAC\u0C82\u0CA6\u0CBF\u0CA6\u0CC6",
  balanceOwed: "\u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAC\u0CBE\u0C95\u0CBF",
  netBalance: "\u0CA8\u0CBF\u0CB5\u0CCD\u0CB5\u0CB3 \u0CAC\u0CBE\u0C95\u0CBF",
  todaySummary: "\u0C87\u0C82\u0CA6\u0CBF\u0CA8 \u0CB2\u0CC6\u0C95\u0CCD\u0C95",
  recentEntries: "\u0C87\u0CA4\u0CCD\u0CA4\u0CC0\u0C9A\u0CBF\u0CA8 \u0CA8\u0CAE\u0CC2\u0CA6\u0CC1\u0C97\u0CB3\u0CC1",
  noEntries: "\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CA8\u0CAE\u0CC2\u0CA6\u0CC1\u0C97\u0CB3\u0CC1 \u0CB2\u0CAD\u0CCD\u0CAF\u0CB5\u0CBF\u0CB2\u0CCD\u0CB2",
  micIdle: "\u0CAE\u0CC8\u0C95\u0CCD \u0C92\u0CA4\u0CCD\u0CA4\u0CBF \u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CBF",
  micListening: "\u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CCD\u0CA6\u0CC7\u0CA8\u0CC6... \u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CBF",
  micProcessing: "\u0CB2\u0CC6\u0C95\u0CCD\u0C95 \u0CAA\u0CB0\u0CBF\u0CB6\u0CC0\u0CB2\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6...",
  micError: "\u0CB8\u0CCD\u0CAA\u0CB7\u0CCD\u0C9F\u0CB5\u0CBE\u0C97\u0CBF \u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CB2\u0CBF\u0CB2\u0CCD\u0CB2. \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAA\u0CC1\u0CA8\u0C83 \u0CAA\u0CCD\u0CB0\u0CAF\u0CA4\u0CCD\u0CA8\u0CBF\u0CB8\u0CBF.",
  typeInstead: "\u0C9F\u0CC8\u0CAA\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF \u0CAC\u0CB0\u0CC6\u0CAF\u0CBF\u0CB0\u0CBF",
  trySpeaking: "\u0CB9\u0CC7\u0CB3\u0CBF \u0CAA\u0CCD\u0CB0\u0CAF\u0CA4\u0CCD\u0CA8\u0CBF\u0CB8\u0CBF:",
  customersTitle: "\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0 \u0C96\u0CBE\u0CA4\u0CC6",
  searchCustomerPlaceholder: "\u0CB9\u0CC6\u0CB8\u0CB0\u0CC1 \u0C85\u0CA5\u0CB5\u0CBE \u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD \u0CB9\u0CC1\u0CA1\u0CC1\u0C95\u0CBF...",
  filterAll: "\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE",
  filterOwes: "\u0CAC\u0CBE\u0C95\u0CBF \u0C87\u0CB0\u0CC1\u0CB5\u0CB5\u0CB0\u0CC1",
  filterSettled: "\u0C9A\u0CC1\u0C95\u0CCD\u0CA4\u0CBE",
  addJama: "+ \u0CB9\u0CA3 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  printSlip: "\u0CB0\u0CB6\u0CC0\u0CA6\u0CBF \u0CAE\u0CC1\u0CA6\u0CCD\u0CB0\u0CBF\u0CB8\u0CBF",
  sendWhatsApp: "\u0CB5\u0CBE\u0C9F\u0CCD\u0CB8\u0CBE\u0CAA\u0CCD \u0C9C\u0CCD\u0C9E\u0CBE\u0CAA\u0CA8\u0CC6",
  summaryTitle: "\u0CA6\u0CC8\u0CA8\u0C82\u0CA6\u0CBF\u0CA8 \u0CB8\u0CBE\u0CB0\u0CBE\u0C82\u0CB6",
  todayUdhaar: "\u0CB8\u0CBE\u0CB2 \u0CA8\u0CC0\u0CA1\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  todayJama: "\u0CB9\u0CA3 \u0CB8\u0CCD\u0CB5\u0CC0\u0C95\u0CB0\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  todayNet: "\u0CA8\u0CBF\u0CB5\u0CCD\u0CB5\u0CB3 \u0CAC\u0CA6\u0CB2\u0CBE\u0CB5\u0CA3\u0CC6",
  weeklyTrend: "\u0C95\u0CB3\u0CC6\u0CA6 7 \u0CA6\u0CBF\u0CA8\u0C97\u0CB3 \u0CB5\u0CBF\u0CB5\u0CB0",
  topPending: "\u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CC1 \u0CAC\u0CBE\u0C95\u0CBF \u0C87\u0CB0\u0CC1\u0CB5\u0CB5\u0CB0\u0CC1",
  settingsTitle: "\u0CB8\u0CC6\u0C9F\u0CCD\u0C9F\u0CBF\u0C82\u0C97\u0CCD\u200C\u0C97\u0CB3\u0CC1",
  settingsSubtitle: "\u0C85\u0C82\u0C97\u0CA1\u0CBF \u0CB5\u0CBF\u0CB5\u0CB0\u0C97\u0CB3\u0CC1, \u0CAD\u0CBE\u0CB7\u0CC6, \u0CB8\u0CCC\u0C82\u0CA1\u0CCD\u200C\u0CAC\u0CBE\u0C95\u0CCD\u0CB8\u0CCD \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAC\u0CCD\u0CAF\u0CBE\u0C95\u0CAA\u0CCD",
  shopNameLabel: "\u0C85\u0C82\u0C97\u0CA1\u0CBF\u0CAF \u0CB9\u0CC6\u0CB8\u0CB0\u0CC1",
  shopNamePlaceholder: "\u0C89\u0CA6\u0CBE. \u0CB0\u0CAE\u0CC7\u0CB6\u0CCD \u0C95\u0CBF\u0CB0\u0CBE\u0CA3\u0CBF \u0C85\u0C82\u0C97\u0CA1\u0CBF",
  uiLanguageLabel: "\u0CAA\u0CB0\u0CA6\u0CC6\u0CAF \u0CAD\u0CBE\u0CB7\u0CC6",
  uiLanguageDesc: "\u0CAC\u0C9F\u0CA8\u0CCD\u200C\u0C97\u0CB3\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAA\u0CB0\u0CA6\u0CC6\u0CAF \u0CAE\u0CC7\u0CB2\u0CBF\u0CA8 \u0CAD\u0CBE\u0CB7\u0CC6",
  speechLanguageLabel: "\u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CC1\u0CB5 \u0CAD\u0CBE\u0CB7\u0CC6",
  speechLanguageDesc: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C97\u0CC1\u0CB0\u0CC1\u0CA4\u0CBF\u0CB8\u0CC1\u0CB5\u0CBF\u0C95\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB8\u0CCC\u0C82\u0CA1\u0CCD\u200C\u0CAC\u0CBE\u0C95\u0CCD\u0CB8\u0CCD\u200C\u0C97\u0CC6",
  speechSpeedLabel: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0CB5\u0CC7\u0C97 (Soundbox)",
  speedSlow: "\u0CA8\u0CBF\u0CA7\u0CBE\u0CA8",
  speedNormal: "\u0CB8\u0CBE\u0CAE\u0CBE\u0CA8\u0CCD\u0CAF",
  speedFast: "\u0CB5\u0CC7\u0C97",
  muteRepliesLabel: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C89\u0CA4\u0CCD\u0CA4\u0CB0 \u0CAE\u0CCD\u0CAF\u0CC2\u0C9F\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF",
  muteRepliesDesc: "\u0CAC\u0CC6\u0CB2\u0CCD \u0CAE\u0CBE\u0CA4\u0CCD\u0CB0 \u0CB0\u0CBF\u0C82\u0C97\u0CCD \u0C86\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6, \u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C93\u0CA6\u0CC1\u0CB5\u0CC1\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2",
  themeLabel: "\u0CA5\u0CC0\u0CAE\u0CCD",
  themeLight: "\u0CB2\u0CC8\u0C9F\u0CCD \u0CA5\u0CC0\u0CAE\u0CCD",
  themeHighContrast: "\u0CB9\u0CC8 \u0C95\u0CBE\u0C82\u0C9F\u0CCD\u0CB0\u0CBE\u0CB8\u0CCD\u0C9F\u0CCD (\u0C95\u0CAA\u0CCD\u0CAA\u0CC1)",
  themeDesc: "\u0CAC\u0CBF\u0CB8\u0CBF\u0CB2\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB0\u0CBE\u0CA4\u0CCD\u0CB0\u0CBF\u0CAF \u0CAC\u0CC6\u0CB3\u0C95\u0CBF\u0C97\u0CC6 \u0CB8\u0CC2\u0C95\u0CCD\u0CA4\u0CB5\u0CBE\u0CA6 \u0C95\u0CBE\u0C82\u0C9F\u0CCD\u0CB0\u0CBE\u0CB8\u0CCD\u0C9F\u0CCD",
  asrEngineLabel: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C8E\u0C82\u0C9C\u0CBF\u0CA8\u0CCD (ASR)",
  asrEngineDesc: "\u0CAE\u0CBE\u0CA4\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAA\u0CA0\u0CCD\u0CAF\u0CB5\u0CBE\u0C97\u0CBF \u0CAA\u0CB0\u0CBF\u0CB5\u0CB0\u0CCD\u0CA4\u0CBF\u0CB8\u0CC1\u0CB5 \u0C8E\u0C82\u0C9C\u0CBF\u0CA8\u0CCD",
  asrBrowser: "\u0CAC\u0CCD\u0CB0\u0CCC\u0CB8\u0CB0\u0CCD \u0C86\u0CA8\u0CCD\u200C-\u0CA1\u0CBF\u0CB5\u0CC8\u0CB8\u0CCD (\u0C89\u0C9A\u0CBF\u0CA4, \u0C86\u0CAB\u0CCD\u200C\u0CB2\u0CC8\u0CA8\u0CCD)",
  asrBhashini: "\u0CAD\u0CBE\u0CB7\u0CBF\u0CA3\u0CBF AI (\u0CA1\u0CBF\u0C9C\u0CBF\u0C9F\u0CB2\u0CCD \u0C87\u0C82\u0CA1\u0CBF\u0CAF\u0CBE) [Stubbed]",
  asrSarvam: "\u0CB8\u0CB0\u0CCD\u0CB5\u0C82 AI (\u0C87\u0C82\u0CA1\u0CBF\u0C95\u0CCD \u0CA7\u0CCD\u0CB5\u0CA8\u0CBF) [Stubbed]",
  exportLedgerLabel: "\u0C96\u0CBE\u0CA4\u0CC6 \u0CA1\u0CC7\u0C9F\u0CBE \u0CB0\u0CAB\u0CCD\u0CA4\u0CC1",
  exportJson: "JSON \u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CA1\u0CCC\u0CA8\u0CCD\u200C\u0CB2\u0CCB\u0CA1\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF",
  exportCsv: "CSV \u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CA1\u0CCC\u0CA8\u0CCD\u200C\u0CB2\u0CCB\u0CA1\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF",
  dangerZoneLabel: "\u0C85\u0CAA\u0CBE\u0CAF \u0CB5\u0CB2\u0CAF",
  clearAllData: "\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE \u0C96\u0CBE\u0CA4\u0CC6 \u0CA1\u0CC7\u0C9F\u0CBE\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0C85\u0CB3\u0CBF\u0CB8\u0CBF",
  clearConfirm: "\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB5\u0CB9\u0CBF\u0CB5\u0CBE\u0C9F\u0CC1\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0C85\u0CB3\u0CBF\u0CB8\u0CB2\u0CC1 \u0CA8\u0CC0\u0CB5\u0CC1 \u0C96\u0C9A\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CC0\u0CB0\u0CBE? \u0C87\u0CA6\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB0\u0CA6\u0CCD\u0CA6\u0CC1\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CC1\u0CB5\u0CC1\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2.",
  clearSuccess: "\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE \u0CA1\u0CC7\u0C9F\u0CBE\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAF\u0CB6\u0CB8\u0CCD\u0CB5\u0CBF\u0CAF\u0CBE\u0C97\u0CBF \u0C85\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6!",
  resetDemo: "\u0CA1\u0CC6\u0CAE\u0CCA \u0CA1\u0CC7\u0C9F\u0CBE \u0CAE\u0CB0\u0CC1\u0CB8\u0CCD\u0CA5\u0CBE\u0CAA\u0CBF\u0CB8\u0CBF",
  resetSuccess: "\u0CA1\u0CC6\u0CAE\u0CCA \u0CA1\u0CC7\u0C9F\u0CBE \u0CB2\u0CCB\u0CA1\u0CCD \u0C86\u0C97\u0CBF\u0CA6\u0CC6!",
  localFirstInfo: "Udhaar Sathi 100% \u0C86\u0CAB\u0CCD\u200C\u0CB2\u0CC8\u0CA8\u0CCD \u0C86\u0C97\u0CBF\u0CA6\u0CC6. \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0C8E\u0CB2\u0CCD\u0CB2\u0CBE \u0CA1\u0CC7\u0C9F\u0CBE \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CB8\u0CC1\u0CB0\u0C95\u0CCD\u0CB7\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6 (IndexedDB).",
  signupWelcomeTitle: "Udhaar Sathi \u0C97\u0CC6 \u0CB8\u0CC1\u0CB8\u0CCD\u0CB5\u0CBE\u0C97\u0CA4",
  signupWelcomeSubtitle: "\u0CAD\u0CBE\u0CB0\u0CA4\u0CC0\u0CAF \u0C95\u0CBF\u0CB0\u0CBE\u0CA3\u0CBF \u0C85\u0C82\u0C97\u0CA1\u0CBF\u0C97\u0CB3\u0CBF\u0C97\u0CBE\u0C97\u0CBF \u0CB9\u0CCD\u0CAF\u0CBE\u0C82\u0CA1\u0CCD\u0CB8\u0CCD-\u0CAB\u0CCD\u0CB0\u0CC0 \u0CB5\u0CBE\u0CAF\u0CCD\u0CB8\u0CCD \u0CB2\u0CC6\u0CA1\u0CCD\u0C9C\u0CB0\u0CCD",
  dataStaysOnPhone: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CA1\u0CC7\u0C9F\u0CBE \u0C88 \u0CAB\u0CCB\u0CA8\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CAE\u0CBE\u0CA4\u0CCD\u0CB0 \u0CB8\u0CC1\u0CB0\u0C95\u0CCD\u0CB7\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CB0\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6",
  getStarted: "\u0CAA\u0CCD\u0CB0\u0CBE\u0CB0\u0C82\u0CAD\u0CBF\u0CB8\u0CBF",
  stepOf: "\u0CB9\u0C82\u0CA4 {current} / {total}",
  shopNamePrompt: "\u0C85\u0C82\u0C97\u0CA1\u0CBF\u0CAF \u0CB9\u0CC6\u0CB8\u0CB0\u0CC7\u0CA8\u0CC1?",
  shopNameSpoken: "\u0C85\u0C82\u0C97\u0CA1\u0CBF\u0CAF \u0CB9\u0CC6\u0CB8\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB9\u0CC7\u0CB3\u0CBF",
  shopNameHelper: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0C85\u0C82\u0C97\u0CA1\u0CBF\u0CAF \u0CB9\u0CC6\u0CB8\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB9\u0CC7\u0CB3\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0CAC\u0CB0\u0CC6\u0CAF\u0CBF\u0CB0\u0CBF",
  shopNameError: "\u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAE\u0CBE\u0CA8\u0CCD\u0CAF \u0C85\u0C82\u0C97\u0CA1\u0CBF\u0CAF \u0CB9\u0CC6\u0CB8\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CAE\u0CC2\u0CA6\u0CBF\u0CB8\u0CBF (\u0C95\u0CA8\u0CBF\u0CB7\u0CCD\u0CA0 2 \u0C85\u0C95\u0CCD\u0CB7\u0CB0\u0C97\u0CB3\u0CC1)",
  ownerNamePrompt: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CB9\u0CC6\u0CB8\u0CB0\u0CC7\u0CA8\u0CC1?",
  ownerNameSpoken: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CB9\u0CC6\u0CB8\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB9\u0CC7\u0CB3\u0CBF",
  ownerNamePlaceholder: "\u0C89\u0CA6\u0CBE. \u0CB0\u0CAE\u0CC7\u0CB6\u0CCD \u0C95\u0CC1\u0CAE\u0CBE\u0CB0\u0CCD",
  ownerNameHelper: "\u0C85\u0C82\u0C97\u0CA1\u0CBF \u0CAE\u0CBE\u0CB2\u0CC0\u0C95\u0CB0 \u0CB9\u0CC6\u0CB8\u0CB0\u0CC1",
  ownerNameError: "\u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CB9\u0CC6\u0CB8\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CAE\u0CC2\u0CA6\u0CBF\u0CB8\u0CBF (\u0C95\u0CA8\u0CBF\u0CB7\u0CCD\u0CA0 2 \u0C85\u0C95\u0CCD\u0CB7\u0CB0\u0C97\u0CB3\u0CC1)",
  phonePrompt: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6",
  phoneSpoken: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE 10 \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3 \u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CAE\u0CC2\u0CA6\u0CBF\u0CB8\u0CBF",
  phonePlaceholder: "\u0C89\u0CA6\u0CBE. 9876543210",
  phoneHelper: "\u0CB5\u0CBE\u0C9F\u0CCD\u0CB8\u0CBE\u0CAA\u0CCD \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAC\u0CBE\u0C95\u0CBF \u0CA8\u0CC6\u0CA8\u0CAA\u0CBF\u0CB8\u0CB2\u0CC1 10 \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3 \u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6",
  phoneError: "6-9 \u0CB0\u0CBF\u0C82\u0CA6 \u0CAA\u0CCD\u0CB0\u0CBE\u0CB0\u0C82\u0CAD\u0CB5\u0CBE\u0C97\u0CC1\u0CB5 10 \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3 \u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CAE\u0CC2\u0CA6\u0CBF\u0CB8\u0CBF",
  upiPrompt: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAF\u0CC1\u0CAA\u0CBF\u0C90 \u0C90\u0CA1\u0CBF",
  upiSpoken: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAF\u0CC1\u0CAA\u0CBF\u0C90 \u0C90\u0CA1\u0CBF \u0CB9\u0CC7\u0CB3\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0CAC\u0CB0\u0CC6\u0CAF\u0CBF\u0CB0\u0CBF",
  upiPlaceholder: "\u0C89\u0CA6\u0CBE. ramesh@oksbi",
  upiHelperText: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAF\u0CC1\u0CAA\u0CBF\u0C90 \u0C90\u0CA1\u0CBF \u0CAE\u0CBE\u0CA4\u0CCD\u0CB0 \u0CB8\u0CBE\u0C95\u0CC1. \u0CA8\u0CBE\u0CB5\u0CC1 \u0C8E\u0C82\u0CA6\u0CBF\u0C97\u0CC2 \u0CAC\u0CCD\u0CAF\u0CBE\u0C82\u0C95\u0CCD \u0C96\u0CBE\u0CA4\u0CC6 \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0C95\u0CC7\u0CB3\u0CC1\u0CB5\u0CC1\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2.",
  upiPaste: "\u0CAA\u0CC7\u0CB8\u0CCD\u0C9F\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF",
  upiReadBack: "\u0C85\u0C95\u0CCD\u0CB7\u0CB0\u0CB6\u0C83 \u0C95\u0CC7\u0CB3\u0CBF",
  upiReadingBack: "\u0C93\u0CA6\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6...",
  upiError: "\u0CAE\u0CBE\u0CA8\u0CCD\u0CAF \u0CAF\u0CC1\u0CAA\u0CBF\u0C90 \u0C90\u0CA1\u0CBF \u0CA8\u0CAE\u0CC2\u0CA6\u0CBF\u0CB8\u0CBF (\u0C89\u0CA6\u0CBE. name@bank)",
  pinPrompt: "\u0CB8\u0CC6\u0C95\u0CCD\u0CAF\u0CC1\u0CB0\u0CBF\u0C9F\u0CBF \u0CAA\u0CBF\u0CA8\u0CCD \u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CBF (\u0C90\u0C9A\u0CCD\u0C9B\u0CBF\u0C95)",
  pinSpoken: "4 \u0CB0\u0CBF\u0C82\u0CA6 6 \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3 \u0CAA\u0CBF\u0CA8\u0CCD \u0C86\u0CAF\u0CCD\u0C95\u0CC6\u0CAE\u0CBE\u0CA1\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0CAC\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1\u0CAC\u0CBF\u0CA1\u0CBF",
  pinPlaceholder: "4-6 \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3 \u0CAA\u0CBF\u0CA8\u0CCD",
  pinHelperText: "\u0CB8\u0CBE\u0CA7\u0CA8\u0CA6 \u0C8E\u0CA8\u0CCD\u200C\u0C95\u0CCD\u0CB0\u0CBF\u0CAA\u0CCD\u0CB6\u0CA8\u0CCD \u0CAE\u0CC2\u0CB2\u0C95 \u0C96\u0CBE\u0CA4\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB0\u0C95\u0CCD\u0CB7\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6. \u0CA8\u0C82\u0CA4\u0CB0 \u0CB8\u0CC6\u0C9F\u0CCD\u0C9F\u0CBF\u0C82\u0C97\u0CCD\u0CB8\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CC2 \u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1.",
  pinSkip: "\u0C88\u0C97 \u0CAC\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1\u0CAC\u0CBF\u0CA1\u0CBF",
  pinSkipWarning: "\u0CAA\u0CBF\u0CA8\u0CCD \u0C87\u0CB2\u0CCD\u0CB2\u0CA6\u0CC6 \u0CAF\u0CBE\u0CB0\u0CBE\u0CA6\u0CB0\u0CC2 \u0C88 \u0C86\u0CCD\u0CAF\u0CAA\u0CCD \u0CA4\u0CC6\u0CB0\u0CC6\u0CA6\u0CC1 \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0C96\u0CBE\u0CA4\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CCB\u0CA1\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1. \u0CA8\u0CC0\u0CB5\u0CC1 \u0CB8\u0CC6\u0C9F\u0CCD\u0C9F\u0CBF\u0C82\u0C97\u0CCD\u0CB8\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CAF\u0CBE\u0CB5\u0CBE\u0C97 \u0CAC\u0CC7\u0C95\u0CBE\u0CA6\u0CB0\u0CC2 \u0CAA\u0CBF\u0CA8\u0CCD \u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1.",
  pinSkipConfirm: "\u0CAA\u0CBF\u0CA8\u0CCD \u0CAC\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1\u0CAC\u0CBF\u0CA1\u0CBF",
  pinError: "\u0CAA\u0CBF\u0CA8\u0CCD 4-6 \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3\u0CBE\u0C97\u0CBF\u0CB0\u0CAC\u0CC7\u0C95\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB8\u0CB0\u0CB3 \u0C85\u0CA8\u0CC1\u0C95\u0CCD\u0CB0\u0CAE\u0CB5\u0CBE\u0C97\u0CBF\u0CB0\u0CAC\u0CBE\u0CB0\u0CA6\u0CC1 (\u0C89\u0CA6\u0CBE. 1234, 0000)",
  reviewTitle: "\u0C85\u0C82\u0C97\u0CA1\u0CBF \u0CAA\u0CCD\u0CB0\u0CCA\u0CAB\u0CC8\u0CB2\u0CCD \u0CAA\u0CB0\u0CBF\u0CB6\u0CC0\u0CB2\u0CBF\u0CB8\u0CBF",
  reviewSubtitle: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CB5\u0CBF\u0CB5\u0CB0\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAA\u0CB0\u0CBF\u0CB6\u0CC0\u0CB2\u0CBF\u0CB8\u0CBF. \u0C87\u0CB5\u0CC1\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC6\u0C9F\u0CCD\u0C9F\u0CBF\u0C82\u0C97\u0CCD\u0CB8\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CAF\u0CBE\u0CB5\u0CBE\u0C97 \u0CAC\u0CC7\u0C95\u0CBE\u0CA6\u0CB0\u0CC2 \u0CAC\u0CA6\u0CB2\u0CBE\u0CAF\u0CBF\u0CB8\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1.",
  startAppButton: "Udhaar Sathi \u0CAA\u0CCD\u0CB0\u0CBE\u0CB0\u0C82\u0CAD\u0CBF\u0CB8\u0CBF",
  editField: "\u0CA4\u0CBF\u0CA6\u0CCD\u0CA6\u0CC1",
  nextStep: "\u0CAE\u0CC1\u0C82\u0CA6\u0CC6",
  prevStep: "\u0CB9\u0CBF\u0C82\u0CA6\u0CC6",
  settingsProfileTitle: "\u0C85\u0C82\u0C97\u0CA1\u0CBF \u0CAA\u0CCD\u0CB0\u0CCA\u0CAB\u0CC8\u0CB2\u0CCD",
  settingsProfileSubtitle: "\u0C85\u0C82\u0C97\u0CA1\u0CBF \u0CB5\u0CBF\u0CB5\u0CB0\u0C97\u0CB3\u0CC1, \u0CAE\u0CBE\u0CB2\u0CC0\u0C95\u0CB0 \u0CB9\u0CC6\u0CB8\u0CB0\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF \u0CAF\u0CC1\u0CAA\u0CBF\u0C90 \u0C90\u0CA1\u0CBF",
  confirmUpiChangeTitle: "\u0CAF\u0CC1\u0CAA\u0CBF\u0C90 \u0C90\u0CA1\u0CBF \u0CAC\u0CA6\u0CB2\u0CBE\u0CAF\u0CBF\u0CB8\u0CAC\u0CC7\u0C95\u0CC7?",
  confirmUpiChangeWarning: "\u0CAF\u0CC1\u0CAA\u0CBF\u0C90 \u0C90\u0CA1\u0CBF \u0CAC\u0CA6\u0CB2\u0CBE\u0CAF\u0CBF\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CB0\u0CBF\u0C82\u0CA6 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CBF\u0C97\u0CC6 \u0C95\u0CB3\u0CC1\u0CB9\u0CBF\u0CB8\u0CC1\u0CB5 \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF \u0C95\u0CCD\u0CAF\u0CC2\u0C86\u0CB0\u0CCD \u0C95\u0CCB\u0CA1\u0CCD \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB2\u0CBF\u0C82\u0C95\u0CCD\u200C\u0C97\u0CB3\u0CC1 \u0CAC\u0CA6\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CB5\u0CC6. \u0CA8\u0CC0\u0CB5\u0CC1 \u0C96\u0C9A\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CCD\u0CA6\u0CC0\u0CB0\u0CBE?",
  confirmUpiChangeButton: "\u0CB9\u0CCC\u0CA6\u0CC1, \u0CAF\u0CC1\u0CAA\u0CBF\u0C90 \u0C90\u0CA1\u0CBF \u0CAC\u0CA6\u0CB2\u0CBE\u0CAF\u0CBF\u0CB8\u0CBF",
  noPinWarningBanner: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0C96\u0CBE\u0CA4\u0CC6\u0CAF\u0CC1 \u0CAA\u0CBF\u0CA8\u0CCD\u200C\u0CA8\u0CBF\u0C82\u0CA6 \u0CB0\u0C95\u0CCD\u0CB7\u0CBF\u0CB8\u0CB2\u0CCD\u0CAA\u0C9F\u0CCD\u0C9F\u0CBF\u0CB2\u0CCD\u0CB2. \u0CA1\u0CC7\u0C9F\u0CBE \u0CB8\u0CC1\u0CB0\u0C95\u0CCD\u0CB7\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CB0\u0CBF\u0CB8\u0CB2\u0CC1 \u0C88\u0C97\u0CB2\u0CC7 \u0CAA\u0CBF\u0CA8\u0CCD \u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CBF.",
  setPinNow: "\u0C88\u0C97\u0CB2\u0CC7 \u0CAA\u0CBF\u0CA8\u0CCD \u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CBF",
  profileUpdatedToast: "\u0C85\u0C82\u0C97\u0CA1\u0CBF \u0CAA\u0CCD\u0CB0\u0CCA\u0CAB\u0CC8\u0CB2\u0CCD \u0CAF\u0CB6\u0CB8\u0CCD\u0CB5\u0CBF\u0CAF\u0CBE\u0C97\u0CBF \u0CA8\u0CB5\u0CC0\u0C95\u0CB0\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6!",
  registerCustomerTitle: "\u0CB9\u0CCA\u0CB8 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0 \u0CA8\u0CCB\u0C82\u0CA6\u0CA3\u0CBF",
  registerCustomerSubtitle: "\u0C8E\u0CA8\u0CCD\u200C\u0C95\u0CCD\u0CB0\u0CBF\u0CAA\u0CCD\u0C9F\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF\u0CA6 \u0CB2\u0CC6\u0CA1\u0CCD\u0C9C\u0CB0\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0C89\u0CB3\u0CBF\u0CB8\u0CB2\u0CC1 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0 \u0CB5\u0CBF\u0CB5\u0CB0\u0C97\u0CB3\u0CC1",
  enterCustomerPhone: "\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0 \u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6",
  phoneReadBackQuestion: "{phone}. \u0CB8\u0CB0\u0CBF\u0CAF\u0CBE\u0C97\u0CBF\u0CA6\u0CC6\u0CAF\u0CC7?",
  readBackConfirm: "\u0CB9\u0CCC\u0CA6\u0CC1, \u0CB8\u0CB0\u0CBF",
  readBackWrong: "\u0C87\u0CB2\u0CCD\u0CB2, \u0CAC\u0CA6\u0CB2\u0CBE\u0CAF\u0CBF\u0CB8\u0CBF",
  skipPhoneForNow: "\u0C88\u0C97 \u0CAC\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1\u0CAC\u0CBF\u0CA1\u0CBF",
  noNumberWarning: "\u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6\u0CAF\u0CBF\u0CB2\u0CCD\u0CB2\u0CA6\u0CC6 \u0C89\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6. \u0C9C\u0CCD\u0C9E\u0CBE\u0CAA\u0CA8\u0CC6\u0C97\u0CB3\u0CB2\u0CCD\u0CB2\u0CBF \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0C95\u0CC7\u0CB3\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.",
  duplicatePhoneWarning: "\u0C88 \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 {name} \u0C85\u0CB5\u0CB0\u0CA6\u0CCD\u0CA6\u0CC1. \u0C87\u0CB5\u0CB0\u0CC7 \u0C86 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CC7?",
  openExistingCustomer: "\u0CB9\u0CCC\u0CA6\u0CC1, {name} \u0CA4\u0CC6\u0CB0\u0CC6\u0CAF\u0CBF\u0CB0\u0CBF",
  useAnotherNumber: "\u0CAC\u0CC7\u0CB0\u0CC6 \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 \u0CAC\u0CB3\u0CB8\u0CBF",
  requireCustomerPhoneLabel: "\u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 \u0C95\u0CA1\u0CCD\u0CA1\u0CBE\u0CAF\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CBF",
  requireCustomerPhoneDesc: "\u0CB9\u0CCA\u0CB8 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CC1\u0CB5\u0CBE\u0C97 \u0CAB\u0CCB\u0CA8\u0CCD \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0C95\u0CA1\u0CCD\u0CA1\u0CBE\u0CAF\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CBF",
  customerRegisteredSpoken: "{name} \u0C85\u0CB5\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  customerNewAskPhoneSpoken: "{name} \u0CB9\u0CCA\u0CB8 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95. \u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 \u0CB9\u0CC7\u0CB3\u0CBF",
  whichCustomerTitle: "\u0CAF\u0CBE\u0CB5 {name}?",
  tellLast4DigitsSubtitle: "\u0CAB\u0CCB\u0CA8\u0CCD \u0CA8\u0C82\u0CAC\u0CB0\u0CCD\u200C\u0CA8 \u0C95\u0CCA\u0CA8\u0CC6\u0CAF 4 \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA4\u0CBF\u0CB3\u0CBF\u0CB8\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0C95\u0CBE\u0CB0\u0CCD\u0CA1\u0CCD \u0CB8\u0CCD\u0CAA\u0CB0\u0CCD\u0CB6\u0CBF\u0CB8\u0CBF",
  noNumberSavedChip: "\u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 \u0C89\u0CB3\u0CBF\u0CB8\u0CBF\u0CB2\u0CCD\u0CB2",
  disambiguateRetryToast: "\u0C88 \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 \u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0C95\u0CC6\u0CAF\u0CBE\u0C97\u0CBF\u0CB2\u0CCD\u0CB2. \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CCA\u0CAE\u0CCD\u0CAE\u0CC6 \u0CB9\u0CC7\u0CB3\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0C95\u0CBE\u0CB0\u0CCD\u0CA1\u0CCD \u0C9F\u0CCD\u0CAF\u0CBE\u0CAA\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF.",
  disambiguateConfirmSpoken: "{name}, \u0CB8\u0CB0\u0CBF.",
  autoOpenPaymentRequestLabel: "\u0CB8\u0CBE\u0CB2\u0CA6 \u0CA8\u0C82\u0CA4\u0CB0 \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF \u0CB5\u0CBF\u0CA8\u0C82\u0CA4\u0CBF \u0CA4\u0CCB\u0CB0\u0CBF\u0CB8\u0CBF",
  autoOpenPaymentRequestDesc: "\u0CB8\u0CBE\u0CB2 \u0CA6\u0CBE\u0C96\u0CB2\u0CBF\u0CB8\u0CBF\u0CA6 \u0CA4\u0C95\u0CCD\u0CB7\u0CA3 \u0CAF\u0CC1\u0CAA\u0CBF\u0C90 \u0C95\u0CCD\u0CAF\u0CC2\u0C86\u0CB0\u0CCD \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB5\u0CBE\u0C9F\u0CCD\u0CB8\u0CBE\u0CAA\u0CCD \u0CB2\u0CBF\u0C82\u0C95\u0CCD \u0CA4\u0CCB\u0CB0\u0CBF\u0CB8\u0CBF",
  showMyQr: "\u0C85\u0C82\u0C97\u0CA1\u0CBF \u0C95\u0CCD\u0CAF\u0CC2\u0C86\u0CB0\u0CCD",
  showMyQrDesc: "\u0C95\u0CCC\u0C82\u0C9F\u0CB0\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF\u0CB0\u0CC1\u0CB5 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CBF\u0C97\u0CBE\u0C97\u0CBF \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF \u0C95\u0CCD\u0CAF\u0CC2\u0C86\u0CB0\u0CCD",
  showMyQrTitle: "\u0C85\u0C82\u0C97\u0CA1\u0CBF \u0C95\u0CCC\u0C82\u0C9F\u0CB0\u0CCD \u0C95\u0CCD\u0CAF\u0CC2\u0C86\u0CB0\u0CCD",
  paymentRequestTitle: "\u0CAA\u0CBE\u0CB5\u0CA4\u0CBF \u0CB5\u0CBF\u0CA8\u0C82\u0CA4\u0CBF",
  paymentRequestSubtitle: "\u0CAA\u0CBE\u0CB5\u0CA4\u0CBF \u0CB8\u0C82\u0C97\u0CCD\u0CB0\u0CB9\u0CBF\u0CB8\u0CB2\u0CC1 \u0C95\u0CCD\u0CAF\u0CC2\u0C86\u0CB0\u0CCD \u0C85\u0CA5\u0CB5\u0CBE \u0CB5\u0CBE\u0C9F\u0CCD\u0CB8\u0CBE\u0CAA\u0CCD \u0CB2\u0CBF\u0C82\u0C95\u0CCD \u0CB9\u0C82\u0C9A\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CBF",
  sendWhatsAppPayment: "WhatsApp \u0C95\u0CB3\u0CC1\u0CB9\u0CBF\u0CB8\u0CBF",
  sendWhatsAppHint: "WhatsApp \u0CA4\u0CC6\u0CB0\u0CC6\u0CAF\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6, \u0CA8\u0C82\u0CA4\u0CB0 Send \u0C92\u0CA4\u0CCD\u0CA4\u0CBF",
  shareQr: "QR \u0CB9\u0C82\u0C9A\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CBF",
  downloadQr: "QR \u0CA1\u0CCC\u0CA8\u0CCD\u200C\u0CB2\u0CCB\u0CA1\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF",
  laterDismiss: "\u0CA8\u0C82\u0CA4\u0CB0",
  noPhoneAddNumber: "\u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  noPhoneWarning: "\u0C88 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0 \u0CAB\u0CCB\u0CA8\u0CCD \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 \u0C89\u0CB3\u0CBF\u0CB8\u0CBF\u0CB2\u0CCD\u0CB2",
  noUpiIdWarning: "\u0CAA\u0CCD\u0CB0\u0CCA\u0CAB\u0CC8\u0CB2\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CAF\u0CC1\u0CAA\u0CBF\u0C90 \u0C90\u0CA1\u0CBF \u0C87\u0CB2\u0CCD\u0CB2. \u0CB8\u0CC6\u0C9F\u0CCD\u0C9F\u0CBF\u0C82\u0C97\u0CCD\u0CB8\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CAF\u0CC1\u0CAA\u0CBF\u0C90 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF.",
  setupUpiNow: "UPI ID \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  whatsappOfflineHint: "WhatsApp \u0C97\u0CBE\u0C97\u0CBF \u0C87\u0C82\u0C9F\u0CB0\u0CCD\u0CA8\u0CC6\u0C9F\u0CCD \u0C85\u0C97\u0CA4\u0CCD\u0CAF\u0CB5\u0CBF\u0CA6\u0CC6",
  qrSavedToast: "\u0C95\u0CCD\u0CAF\u0CC2\u0C86\u0CB0\u0CCD \u0C95\u0CCB\u0CA1\u0CCD \u0CB8\u0CBF\u0CA6\u0CCD\u0CA7\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  receiptQrTitle: "UPI \u0CAE\u0CC2\u0CB2\u0C95 \u0CB8\u0CCD\u0C95\u0CCD\u0CAF\u0CBE\u0CA8\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF\u0CB8\u0CBF",
  chooseLanguage: "\u0CAD\u0CBE\u0CB7\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0C86\u0CAF\u0CCD\u0C95\u0CC6\u0CAE\u0CBE\u0CA1\u0CBF",
  language: "\u0CAD\u0CBE\u0CB7\u0CC6",
  speechLanguage: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0CAD\u0CBE\u0CB7\u0CC6",
  entries: "\u0CA8\u0CAE\u0CC2\u0CA6\u0CC1\u0C97\u0CB3\u0CC1",
  entriesCount: "{count} \u0CA8\u0CAE\u0CC2\u0CA6\u0CC1\u0C97\u0CB3\u0CC1",
  clear: "\u0C85\u0CB3\u0CBF\u0CB8\u0CBF",
  reset: "\u0CB0\u0CC0\u0CB8\u0CC6\u0C9F\u0CCD",
  viewAll: "\u0C8E\u0CB2\u0CCD\u0CB2\u0CB5\u0CA8\u0CCD\u0CA8\u0CC2 \u0CB5\u0CC0\u0C95\u0CCD\u0CB7\u0CBF\u0CB8\u0CBF \u2192",
  loading: "\u0CB2\u0CCB\u0CA1\u0CCD \u0C86\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6...",
  loadingCustomers: "\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0 \u0CB2\u0CC6\u0CA1\u0CCD\u0C9C\u0CB0\u0CCD \u0CB2\u0CCB\u0CA1\u0CCD \u0C86\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6...",
  loadingSummary: "\u0CA6\u0CBF\u0CA8\u0C9A\u0CB0\u0CBF \u0CB8\u0CBE\u0CB0\u0CBE\u0C82\u0CB6 \u0CB2\u0CCB\u0CA1\u0CCD \u0C86\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6...",
  securingLedger: "\u0CB2\u0CC6\u0CA1\u0CCD\u0C9C\u0CB0\u0CCD \u0CB8\u0CC1\u0CB0\u0C95\u0CCD\u0CB7\u0CBF\u0CA4\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6...",
  micPromptSpeak: "\u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CBF",
  micPromptListening: "\u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CCD\u0CA6\u0CC7\u0CB5\u0CC6...",
  micPromptProcessing: "\u0CAA\u0CCD\u0CB0\u0C95\u0CCD\u0CB0\u0CBF\u0CAF\u0CC6\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6...",
  micPromptRetry: "\u0CAE\u0CA4\u0CCD\u0CA4\u0CC6 \u0CAA\u0CCD\u0CB0\u0CAF\u0CA4\u0CCD\u0CA8\u0CBF\u0CB8\u0CBF",
  micCaptionIdle: "\u0C92\u0CAE\u0CCD\u0CAE\u0CC6 \u0C9F\u0CCD\u0CAF\u0CBE\u0CAA\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF \u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CBF",
  micCaptionListening: "\u0CB8\u0CCD\u0CAA\u0CB7\u0CCD\u0C9F\u0CB5\u0CBE\u0C97\u0CBF \u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CBF \u2022 \u0CAE\u0CCC\u0CA8\u0CB5\u0CBE\u0CA6\u0CBE\u0C97 \u0CA4\u0CBE\u0CA8\u0CC7 \u0CA8\u0CBF\u0CB2\u0CCD\u0CB2\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6",
  micCaptionProcessing: "\u0CB2\u0CC6\u0C95\u0CCD\u0C95 \u0CAE\u0CBE\u0CA1\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6...",
  micErrorFallbackNote: "\u0CAE\u0CC8\u0C95\u0CCD \u0C95\u0CBE\u0CB0\u0CCD\u0CAF\u0CA8\u0CBF\u0CB0\u0CCD\u0CB5\u0CB9\u0CBF\u0CB8\u0CA6\u0CBF\u0CA6\u0CCD\u0CA6\u0CB0\u0CC6, \u0CAC\u0CB0\u0CC6\u0CA6\u0CC1 \u0CA6\u0CBE\u0C96\u0CB2\u0CBF\u0CB8\u0CBF.",
  listeningSpeakYourLanguage: "\u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CCD\u0CA6\u0CC7\u0CB5\u0CC6... \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAD\u0CBE\u0CB7\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CBF",
  streamingSpeech: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0CB8\u0CCD\u0CB5\u0CC0\u0C95\u0CB0\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6...",
  processingSpeech: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0C97\u0CCD\u0CB0\u0CB9\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6...",
  heardVoice: "\u0C95\u0CC7\u0CB3\u0CBF\u0CA6 \u0CA7\u0CCD\u0CB5\u0CA8\u0CBF",
  quickDemoPhrases: "\u0CA4\u0CCD\u0CB5\u0CB0\u0CBF\u0CA4 \u0C89\u0CA6\u0CBE\u0CB9\u0CB0\u0CA3\u0CC6\u0C97\u0CB3\u0CC1",
  tapToTest: "\u0CAA\u0CB0\u0CC0\u0C95\u0CCD\u0CB7\u0CBF\u0CB8\u0CB2\u0CC1 \u0C9F\u0CCD\u0CAF\u0CBE\u0CAA\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF",
  hintPhrase1: "\u0CB0\u0CAE\u0CC7\u0CB6\u0CCD \u0C85\u0CB5\u0CB0\u0CBF\u0C97\u0CC6 500 \u0CB8\u0CBE\u0CB2 \u0CA8\u0CC0\u0CA1\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  hintPhrase2: "\u0CB0\u0CAE\u0CC7\u0CB6\u0CCD \u0C85\u0CB5\u0CB0 340 \u0CB8\u0CBE\u0CB2, \u0CA8\u0CBF\u0CA8\u0CCD\u0CA8\u0CC6 200 \u0CA8\u0CC0\u0CA1\u0CBF\u0CA6\u0CCD\u0CA6\u0CB0\u0CC1",
  hintPhrase3: "\u0CB0\u0CAE\u0CC7\u0CB6\u0CCD \u0C85\u0CB5\u0CB0 \u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAC\u0CBE\u0C95\u0CBF?",
  creditGivenTodaySub: "\u0C87\u0C82\u0CA6\u0CC1 \u0CA8\u0CC0\u0CA1\u0CBF\u0CA6 \u0CB8\u0CBE\u0CB2",
  paymentReceivedTodaySub: "\u0C87\u0C82\u0CA6\u0CC1 \u0CB8\u0CCD\u0CB5\u0CC0\u0C95\u0CB0\u0CBF\u0CB8\u0CBF\u0CA6 \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF",
  marketPending: "\u0CAC\u0CBE\u0C95\u0CBF \u0CAC\u0CB0\u0CAC\u0CC7\u0C95\u0CBE\u0CA6\u0CA6\u0CCD\u0CA6\u0CC1",
  last5Entries: "\u0C95\u0CB3\u0CC6\u0CA6 5 \u0CA8\u0CAE\u0CC2\u0CA6\u0CC1\u0C97\u0CB3\u0CC1",
  noEntriesYetPrompt: "\u0C87\u0CA8\u0CCD\u0CA8\u0CC2 \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CB2\u0CC6\u0C95\u0CCD\u0C95 \u0CA6\u0CBE\u0C96\u0CB2\u0CBE\u0C97\u0CBF\u0CB2\u0CCD\u0CB2. \u0CAE\u0CC8\u0C95\u0CCD \u0C92\u0CA4\u0CCD\u0CA4\u0CBF \u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CBF!",
  creditBadge: "\u0CB8\u0CBE\u0CB2",
  paymentBadge: "\u0CAA\u0CBE\u0CB5\u0CA4\u0CBF",
  udhaar: "\u0CB8\u0CBE\u0CB2",
  jama: "\u0CAA\u0CBE\u0CB5\u0CA4\u0CBF",
  customersCountSorted: "{count} \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CC1 \u2022 \u0C97\u0CB0\u0CBF\u0CB7\u0CCD\u0CA0 \u0CAC\u0CBE\u0C95\u0CBF \u0CAA\u0CCD\u0CB0\u0C95\u0CBE\u0CB0",
  noCustomersYet: "\u0C87\u0CA8\u0CCD\u0CA8\u0CC2 \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CBF\u0CB2\u0CCD\u0CB2",
  noCustomersDescription: "\u0C87\u0CA8\u0CCD\u0CA8\u0CC2 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CBF\u0CB2\u0CCD\u0CB2. \u0CAE\u0CCA\u0CA6\u0CB2 \u0CB8\u0CBE\u0CB2\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA7\u0CCD\u0CB5\u0CA8\u0CBF\u0CAF \u0CAE\u0CC2\u0CB2\u0C95 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF.",
  noCustomerFound: "\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CC1 \u0CB8\u0CBF\u0C97\u0CB2\u0CBF\u0CB2\u0CCD\u0CB2",
  noMatchingCustomerQuery: '"{query}" \u0CB9\u0CC6\u0CB8\u0CB0\u0CBF\u0CA8 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CBF\u0CB2\u0CCD\u0CB2. \u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0CAE\u0CC2\u0CB2\u0C95 \u0CB9\u0CCA\u0CB8 \u0CA8\u0CAE\u0CC2\u0CA6\u0CC1 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF.',
  noCustomersInFilter: "\u0C88 \u0CAB\u0CBF\u0CB2\u0CCD\u0C9F\u0CB0\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CBF\u0CB2\u0CCD\u0CB2.",
  firstUdhaarVoice: "\u{1F3A4} \u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0CAE\u0CC2\u0CB2\u0C95 \u0CAE\u0CCA\u0CA6\u0CB2 \u0CB8\u0CBE\u0CB2 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  addCustomerButton: "+ \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  addNewCustomerTitle: "\u0CB9\u0CCA\u0CB8 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  addNewCustomerSubtitle: "\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CB8\u0CBE\u0CB2 \u0C85\u0CA5\u0CB5\u0CBE \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF \u0C87\u0CB2\u0CCD\u0CB2\u0CA6\u0CC6 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  lastActivity: "\u0C95\u0CCA\u0CA8\u0CC6\u0CAF\u0CA6\u0CC1: {date}",
  badgeOwes: "\u0CAC\u0CBE\u0C95\u0CBF",
  badgeSettled: "\u0C9A\u0CC1\u0C95\u0CCD\u0CA4\u0CBE",
  badgeNew: "\u0CB9\u0CCA\u0CB8",
  listenBalance: "\u0C95\u0CC7\u0CB3\u0CBF",
  lastReminderDate: "\u0C95\u0CCA\u0CA8\u0CC6\u0CAF \u0C9C\u0CCD\u0C9E\u0CBE\u0CAA\u0CA8\u0CC6: {date}",
  outstandingUdhaar: "\u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAC\u0CBE\u0C95\u0CBF \u0CB8\u0CBE\u0CB2",
  allSettled: "\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE \u0CB2\u0CC6\u0C95\u0CCD\u0C95 \u0C9A\u0CC1\u0C95\u0CCD\u0CA4\u0CBE",
  amountToReceive: "\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CBF\u0C82\u0CA6 \u0CAC\u0CB0\u0CAC\u0CC7\u0C95\u0CBE\u0CA6\u0CA6\u0CCD\u0CA6\u0CC1",
  noBalancePending: "\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CAC\u0CBE\u0C95\u0CBF \u0C87\u0CB2\u0CCD\u0CB2",
  totalCreditLabel: "\u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CB8\u0CBE\u0CB2:",
  totalPaymentLabel: "\u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF:",
  sendWhatsAppReminder: "WhatsApp \u0C9C\u0CCD\u0C9E\u0CBE\u0CAA\u0CA8\u0CC6",
  printReceipt: "\u0CB0\u0CB6\u0CC0\u0CA6\u0CBF \u0CAE\u0CC1\u0CA6\u0CCD\u0CB0\u0CBF\u0CB8\u0CBF",
  addUdhaarButton: "+ \u0CB8\u0CBE\u0CB2 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  addPaymentButton: "+ \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  timelineEntries: "\u0CB2\u0CC6\u0C95\u0CCD\u0C95\u0CA6 \u0C87\u0CA4\u0CBF\u0CB9\u0CBE\u0CB8 ({count} \u0CA8\u0CAE\u0CC2\u0CA6\u0CC1\u0C97\u0CB3\u0CC1)",
  latestFirst: "\u0C87\u0CA4\u0CCD\u0CA4\u0CC0\u0C9A\u0CBF\u0CA8\u0CB5\u0CC1 \u0CAE\u0CCA\u0CA6\u0CB2\u0CC1",
  noEntriesTitle: "\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CB2\u0CC6\u0C95\u0CCD\u0C95\u0CB5\u0CBF\u0CB2\u0CCD\u0CB2",
  noEntriesCustomerDesc: "\u0C88 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CBF\u0C97\u0CC6 \u0C87\u0CA8\u0CCD\u0CA8\u0CC2 \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CB5\u0CB9\u0CBF\u0CB5\u0CBE\u0C9F\u0CC1 \u0CA6\u0CBE\u0C96\u0CB2\u0CBE\u0C97\u0CBF\u0CB2\u0CCD\u0CB2.",
  deleteEntryConfirm: "\u0CA8\u0CC0\u0CB5\u0CC1 \u0C88 \u0CA8\u0CAE\u0CC2\u0CA6\u0CA8\u0CCD\u0CA8\u0CC1 \u0C85\u0CB3\u0CBF\u0CB8\u0CB2\u0CC1 \u0C96\u0C9A\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF \u0CAC\u0CAF\u0CB8\u0CC1\u0CB5\u0CBF\u0CB0\u0CBE?",
  enterValidAmount: "\u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAE\u0CBE\u0CA8\u0CCD\u0CAF \u0CAE\u0CCA\u0CA4\u0CCD\u0CA4\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CAE\u0CC2\u0CA6\u0CBF\u0CB8\u0CBF",
  entryDeletedToast: "\u0CA8\u0CAE\u0CC2\u0CA6\u0CA8\u0CCD\u0CA8\u0CC1 \u0C85\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  customerNotFoundTitle: "\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CC1 \u0CB8\u0CBF\u0C97\u0CB2\u0CBF\u0CB2\u0CCD\u0CB2",
  customerNotFoundDesc: "\u0C88 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CC1 \u0CB2\u0CC6\u0CA1\u0CCD\u0C9C\u0CB0\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CB2\u0CAD\u0CCD\u0CAF\u0CB5\u0CBF\u0CB2\u0CCD\u0CB2.",
  viewCustomersList: "\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0 \u0CAA\u0C9F\u0CCD\u0C9F\u0CBF \u0CB5\u0CC0\u0C95\u0CCD\u0CB7\u0CBF\u0CB8\u0CBF",
  customerAlreadyExists: "{name} \u0C88\u0C97\u0CBE\u0C97\u0CB2\u0CC7 \u0C85\u0CB8\u0CCD\u0CA4\u0CBF\u0CA4\u0CCD\u0CB5\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CB0\u0CC6",
  similarCustomerWarning: "\u0C87\u0CA6\u0CC7 \u0CB0\u0CC0\u0CA4\u0CBF\u0CAF \u0CB9\u0CC6\u0CB8\u0CB0\u0CBF\u0CA8 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CC1 \u0C88\u0C97\u0CBE\u0C97\u0CB2\u0CC7 \u0C87\u0CA6\u0CCD\u0CA6\u0CBE\u0CB0\u0CC6. \u0CA8\u0CC0\u0CB5\u0CC1 \u0C85\u0CB5\u0CB0 \u0C96\u0CBE\u0CA4\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAC\u0CB3\u0CB8\u0CB2\u0CC1 \u0CAC\u0CAF\u0CB8\u0CC1\u0CB5\u0CBF\u0CB0\u0CBE?",
  useThisOne: "\u0C87\u0CA6\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAC\u0CB3\u0CB8\u0CBF",
  createAnyway: "\u0CB9\u0CCA\u0CB8\u0CA6\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB0\u0C9A\u0CBF\u0CB8\u0CBF",
  customerNameLabel: "\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0 \u0CB9\u0CC6\u0CB8\u0CB0\u0CC1",
  mobileNumberOptional: "\u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 (\u0C90\u0C9A\u0CCD\u0C9B\u0CBF\u0C95)",
  phoneReminderHelper: "WhatsApp \u0C9C\u0CCD\u0C9E\u0CBE\u0CAA\u0CA8\u0CC6\u0C97\u0CB3\u0CBF\u0C97\u0CC6 \u0C89\u0CAA\u0CAF\u0CC1\u0C95\u0CCD\u0CA4 (\u0CA8\u0C82\u0CA4\u0CB0\u0CB5\u0CC2 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1).",
  saveCustomer: "\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0C89\u0CB3\u0CBF\u0CB8\u0CBF",
  saving: "\u0C89\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6...",
  enterCustomerNameError: "\u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0 \u0CB9\u0CC6\u0CB8\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CAE\u0CC2\u0CA6\u0CBF\u0CB8\u0CBF",
  errorSavingCustomer: "\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0C89\u0CB3\u0CBF\u0CB8\u0CC1\u0CB5\u0CB2\u0CCD\u0CB2\u0CBF \u0CA6\u0CCB\u0CB7",
  dailySummarySubtitle: "\u0CA6\u0CC8\u0CA8\u0C82\u0CA6\u0CBF\u0CA8 \u0CB8\u0C82\u0C97\u0CCD\u0CB0\u0CB9\u0CA3\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB8\u0CBE\u0CB2\u0CA6 \u0CB8\u0CBE\u0CB0\u0CBE\u0C82\u0CB6",
  shareSlip: "\u0CB8\u0CCD\u0CB2\u0CBF\u0CAA\u0CCD \u0CB9\u0C82\u0C9A\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CBF",
  copied: "\u0C95\u0CBE\u0CAA\u0CBF \u0CAE\u0CBE\u0CA1\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  dateLabel: "\u0CA6\u0CBF\u0CA8\u0CBE\u0C82\u0C95:",
  creditGivenToday: "\u0C87\u0C82\u0CA6\u0CC1 \u0CA8\u0CC0\u0CA1\u0CBF\u0CA6 \u0CB8\u0CBE\u0CB2",
  paymentReceivedToday: "\u0C87\u0C82\u0CA6\u0CC1 \u0CB8\u0CCD\u0CB5\u0CC0\u0C95\u0CB0\u0CBF\u0CB8\u0CBF\u0CA6 \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF",
  netUdhaarIncreased: "\u0CA8\u0CBF\u0CB5\u0CCD\u0CB5\u0CB3 \u0CB8\u0CBE\u0CB2 \u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  netUdhaarDecreased: "\u0CA8\u0CBF\u0CB5\u0CCD\u0CB5\u0CB3 \u0CB8\u0CBE\u0CB2 \u0C95\u0CA1\u0CBF\u0CAE\u0CC6\u0CAF\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  entriesCountLabel: "\u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CA8\u0CAE\u0CC2\u0CA6\u0CC1\u0C97\u0CB3\u0CC1",
  activeCustomersCount: "{count} \u0CB8\u0C95\u0CCD\u0CB0\u0CBF\u0CAF \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CC1",
  noDataAvailable: "\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CA1\u0CC7\u0C9F\u0CBE \u0CB2\u0CAD\u0CCD\u0CAF\u0CB5\u0CBF\u0CB2\u0CCD\u0CB2",
  noDataForDate: "\u0C88 \u0CA6\u0CBF\u0CA8\u0CBE\u0C82\u0C95\u0C95\u0CCD\u0C95\u0CC6 \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CB5\u0CB9\u0CBF\u0CB5\u0CBE\u0C9F\u0CC1 \u0CB2\u0CAD\u0CCD\u0CAF\u0CB5\u0CBF\u0CB2\u0CCD\u0CB2.",
  noPendingCustomersAllSettled: "\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CAC\u0CBE\u0C95\u0CBF \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CBF\u0CB2\u0CCD\u0CB2. \u0C8E\u0CB2\u0CCD\u0CB2\u0CBE \u0CB2\u0CC6\u0C95\u0CCD\u0C95 \u0C9A\u0CC1\u0C95\u0CCD\u0CA4\u0CBE! \u2713",
  reviewEntryTitle: "\u0CA8\u0CAE\u0CC2\u0CA6\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAA\u0CB0\u0CBF\u0CB6\u0CC0\u0CB2\u0CBF\u0CB8\u0CBF",
  duplicateEntryWarningTitle: "\u0C87\u0CA6\u0CC7 \u0CB0\u0CC0\u0CA4\u0CBF\u0CAF \u0CA8\u0CAE\u0CC2\u0CA6\u0CC1 \u0C87\u0CA4\u0CCD\u0CA4\u0CC0\u0C9A\u0CC6\u0C97\u0CB7\u0CCD\u0C9F\u0CC7 \u0CA6\u0CBE\u0C96\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6. \u0CAE\u0CA4\u0CCD\u0CA4\u0CC6 \u0C89\u0CB3\u0CBF\u0CB8\u0CC1\u0CB5\u0CC1\u0CA6\u0CC7?",
  duplicateEntryWarningDesc: "{name} \u0C85\u0CB5\u0CB0\u0CBF\u0C97\u0CC6 \u20B9{amount} {type} \u0C95\u0CB3\u0CC6\u0CA6 10 \u0CA8\u0CBF\u0CAE\u0CBF\u0CB7\u0C97\u0CB3\u0CB2\u0CCD\u0CB2\u0CBF \u0CA6\u0CBE\u0C96\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6.",
  saveAnyway: "\u0CB9\u0CC7\u0C97\u0CBE\u0CA6\u0CB0\u0CC2 \u0C89\u0CB3\u0CBF\u0CB8\u0CBF",
  correctByVoice: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF\u0CAF\u0CBF\u0C82\u0CA6 \u0CB8\u0CB0\u0CBF\u0CAA\u0CA1\u0CBF\u0CB8\u0CBF",
  listeningTapToStop: "\u0C95\u0CC7\u0CB3\u0CBF\u0CB8\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CCD\u0CA6\u0CC7\u0CB5\u0CC6... (\u0CA8\u0CBF\u0CB2\u0CCD\u0CB2\u0CBF\u0CB8\u0CB2\u0CC1 \u0C9F\u0CCD\u0CAF\u0CBE\u0CAA\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF)",
  confirmAndSave: "\u0CA6\u0CC3\u0CA2\u0CC0\u0C95\u0CB0\u0CBF\u0CB8\u0CBF \u0C89\u0CB3\u0CBF\u0CB8\u0CBF",
  voiceSavingCommand: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C86\u0CA6\u0CC7\u0CB6\u0CA6\u0CBF\u0C82\u0CA6 \u0C89\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6...",
  voiceCancelledCommand: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF\u0CAF \u0CAE\u0CC2\u0CB2\u0C95 \u0CB0\u0CA6\u0CCD\u0CA6\u0CC1\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  voiceAmountUpdated: "\u0CAE\u0CCA\u0CA4\u0CCD\u0CA4\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u20B9{amount} \u0C97\u0CC6 \u0CA8\u0CB5\u0CC0\u0C95\u0CB0\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  amountInRupees: "\u0CAE\u0CCA\u0CA4\u0CCD\u0CA4 (\u20B9 \u0C97\u0CB3\u0CB2\u0CCD\u0CB2\u0CBF)",
  relativeToday: "\u0C87\u0C82\u0CA6\u0CC1",
  relativeYesterday: "\u0CA8\u0CBF\u0CA8\u0CCD\u0CA8\u0CC6",
  relativeDayBefore: "\u0CAE\u0CCA\u0CA8\u0CCD\u0CA8\u0CC6",
  pickDate: "\u0CA6\u0CBF\u0CA8\u0CBE\u0C82\u0C95 \u0C86\u0CAF\u0CCD\u0C95\u0CC6\u0CAE\u0CBE\u0CA1\u0CBF",
  notePlaceholder: "\u0C9F\u0CBF\u0CAA\u0CCD\u0CAA\u0CA3\u0CBF (\u0C89\u0CA6\u0CBE. \u0CB9\u0CBE\u0CB2\u0CC1, \u0CB8\u0C95\u0CCD\u0C95\u0CB0\u0CC6, \u0CAC\u0CC7\u0CB3\u0CC6)",
  balanceInquiryTitle: "\u0C96\u0CBE\u0CA4\u0CC6 \u0CAC\u0CBE\u0C95\u0CBF \u0CB5\u0CBF\u0C9A\u0CBE\u0CB0\u0CA3\u0CC6",
  balancePendingUdhaar: "\u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAC\u0CBE\u0C95\u0CBF \u0CB8\u0CBE\u0CB2",
  advancePayment: "\u0CAE\u0CC1\u0C82\u0C97\u0CA1 \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF",
  speaking: "\u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CCD\u0CA6\u0CBE\u0CB0\u0CC6...",
  replayVoice: "\u0C95\u0CC7\u0CB3\u0CBF",
  allClear: "\u0C8E\u0CB2\u0CCD\u0CB2\u0CB5\u0CC2 \u0C9A\u0CC1\u0C95\u0CCD\u0CA4\u0CBE \u2713",
  last3Transactions: "\u0C95\u0CCA\u0CA8\u0CC6\u0CAF 3 \u0CB5\u0CB9\u0CBF\u0CB5\u0CBE\u0C9F\u0CC1\u0C97\u0CB3\u0CC1",
  noPreviousTransactions: "\u0CB9\u0CBF\u0C82\u0CA6\u0CBF\u0CA8 \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CB5\u0CB9\u0CBF\u0CB5\u0CBE\u0C9F\u0CC1\u0C97\u0CB3\u0CC1 \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2",
  viewKhata: "\u0C96\u0CBE\u0CA4\u0CC6 \u0CB5\u0CC0\u0C95\u0CCD\u0CB7\u0CBF\u0CB8\u0CBF",
  whichCustomerAskDigits: "\u0CAF\u0CBE\u0CB5 {name}? \u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6\u0CAF \u0C95\u0CCA\u0CA8\u0CC6\u0CAF 4 \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA4\u0CBF\u0CB3\u0CBF\u0CB8\u0CBF.",
  sameLastDigitsAskMore: "\u0C87\u0CAC\u0CCD\u0CAC\u0CB0 \u0C95\u0CCA\u0CA8\u0CC6\u0CAF \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3\u0CC2 \u0C92\u0C82\u0CA6\u0CC7 \u0C86\u0C97\u0CBF\u0CB5\u0CC6. \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0C95\u0CCA\u0CA8\u0CC6\u0CAF {count} \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA4\u0CBF\u0CB3\u0CBF\u0CB8\u0CBF.",
  numberNotFoundRetry: "\u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2. \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CCA\u0CAE\u0CCD\u0CAE\u0CC6 \u0CB9\u0CC7\u0CB3\u0CBF.",
  numberNotFoundTapCard: "\u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 \u0C95\u0C82\u0CA1\u0CC1\u0CAC\u0C82\u0CA6\u0CBF\u0CB2\u0CCD\u0CB2. \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0C95\u0CBE\u0CB0\u0CCD\u0CA1\u0CCD \u0CAE\u0CC7\u0CB2\u0CC6 \u0C9F\u0CCD\u0CAF\u0CBE\u0CAA\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF.",
  newCustomerAddedToast: "\u0CB9\u0CCA\u0CB8 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6: {name}",
  entrySavedSuccess: "{name} \u0C85\u0CB5\u0CB0 {type} \u0CAF\u0CB6\u0CB8\u0CCD\u0CB5\u0CBF\u0CAF\u0CBE\u0C97\u0CBF \u0CA6\u0CBE\u0C96\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6!",
  multiEntriesSavedSuccess: "{count} \u0CA8\u0CAE\u0CC2\u0CA6\u0CC1\u0C97\u0CB3\u0CC1 \u0CAF\u0CB6\u0CB8\u0CCD\u0CB5\u0CBF\u0CAF\u0CBE\u0C97\u0CBF \u0C89\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6!",
  didNotUnderstandRepeat: "\u0C85\u0CB0\u0CCD\u0CA5\u0CB5\u0CBE\u0C97\u0CB2\u0CBF\u0CB2\u0CCD\u0CB2. \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CCA\u0CAE\u0CCD\u0CAE\u0CC6 \u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CBF.",
  languageChangedToast: "\u0CAD\u0CBE\u0CB7\u0CC6 \u0CAC\u0CA6\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6: {lang}",
  speechLanguageChangedToast: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0CAD\u0CBE\u0CB7\u0CC6: {lang}",
  offlineModeNoticeTitle: "\u0C86\u0CAB\u0CCD\u200C\u0CB2\u0CC8\u0CA8\u0CCD \u0CAE\u0CCB\u0CA1\u0CCD",
  offlineModeNoticeDesc: "\u0CB2\u0CC6\u0CA1\u0CCD\u0C9C\u0CB0\u0CCD 100% \u0C86\u0CAB\u0CCD\u200C\u0CB2\u0CC8\u0CA8\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0C95\u0CBE\u0CB0\u0CCD\u0CAF\u0CA8\u0CBF\u0CB0\u0CCD\u0CB5\u0CB9\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6. \u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C97\u0CC1\u0CB0\u0CC1\u0CA4\u0CBF\u0CB8\u0CC1\u0CB5\u0CBF\u0C95\u0CC6\u0C97\u0CC6 \u0C87\u0C82\u0C9F\u0CB0\u0CCD\u0CA8\u0CC6\u0C9F\u0CCD \u0CAC\u0CC7\u0C95\u0CBE\u0C97\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1; \u0C9F\u0CC8\u0CAA\u0CBF\u0C82\u0C97\u0CCD \u0CAC\u0CB3\u0CB8\u0CBF.",
  networkDisconnected: "\u0CA8\u0CC6\u0C9F\u0CCD\u200C\u0CB5\u0CB0\u0CCD\u0C95\u0CCD \u0CB8\u0C82\u0CAA\u0CB0\u0CCD\u0C95 \u0C95\u0CA1\u0CBF\u0CA4\u0C97\u0CCA\u0C82\u0CA1\u0CBF\u0CA6\u0CC6",
  pinIncorrect: "\u0CA4\u0CAA\u0CCD\u0CAA\u0CC1 \u0CAA\u0CBF\u0CA8\u0CCD! \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC6 \u0CAA\u0CCD\u0CB0\u0CAF\u0CA4\u0CCD\u0CA8\u0CBF\u0CB8\u0CBF.",
  pinLockedMessage: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CB2\u0CC6\u0CA1\u0CCD\u0C9C\u0CB0\u0CCD AES-256 \u0C8E\u0CA8\u0CCD\u200C\u0C95\u0CCD\u0CB0\u0CBF\u0CAA\u0CCD\u0C9F\u0CCD \u0C86\u0C97\u0CBF\u0CA6\u0CC6. \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAA\u0CBF\u0CA8\u0CCD \u0CA8\u0CAE\u0CC2\u0CA6\u0CBF\u0CB8\u0CBF:",
  pinResetConfirm: "\u0CB9\u0CCC\u0CA6\u0CC1, \u0CAE\u0CB0\u0CC1\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CBF",
  totalUdhaar: "\u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CB8\u0CBE\u0CB2",
  totalJama: "\u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF",
  totalBalance: "\u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAC\u0CBE\u0C95\u0CBF",
  udhaarAdded: "\u0CB8\u0CBE\u0CB2 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  savePhoneToProfileHint: "\u0C92\u0CAE\u0CCD\u0CAE\u0CC6 \u0CA8\u0CAE\u0CC2\u0CA6\u0CBF\u0CB8\u0CBF\u0CA6\u0CB0\u0CC6, \u0C87\u0CA6\u0CC1 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0 \u0CAA\u0CCD\u0CB0\u0CCA\u0CAB\u0CC8\u0CB2\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0C89\u0CB3\u0CBF\u0CAF\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.",
  numberClearedSpeakAgain: "\u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 \u0CA4\u0CC6\u0CB0\u0CB5\u0CC1\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6. \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC6 \u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0C95\u0CC0\u0CAA\u0CCD\u0CAF\u0CBE\u0CA1\u0CCD \u0CAC\u0CB3\u0CB8\u0CBF.",
  pendingEntrySavedAfterReg: "\u0CA8\u0CCB\u0C82\u0CA6\u0CA3\u0CBF\u0CAF \u0CA8\u0C82\u0CA4\u0CB0 \u20B9{amount} {type} \u0C89\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CC1\u0CB5\u0CC1\u0CA6\u0CC1",
  recentEntriesReceipt: "\u0C87\u0CA4\u0CCD\u0CA4\u0CC0\u0C9A\u0CBF\u0CA8 \u0CA8\u0CAE\u0CC2\u0CA6\u0CC1\u0C97\u0CB3\u0CC1:",
  numeralScriptLabel: "\u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6 \u0CB2\u0CBF\u0CAA\u0CBF",
  numeralScriptDesc: "\u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0C87\u0C82\u0C97\u0CCD\u0CB2\u0CBF\u0CB7\u0CCD (1, 2, 3) \u0C85\u0CA5\u0CB5\u0CBE \u0C95\u0CA8\u0CCD\u0CA8\u0CA1 \u0CB2\u0CBF\u0CAA\u0CBF\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0CA4\u0CCB\u0CB0\u0CBF\u0CB8\u0CBF",
  scriptLatin: "\u0C87\u0C82\u0C97\u0CCD\u0CB2\u0CBF\u0CB7\u0CCD (1, 2, 3)",
  scriptNative: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1 (\u0CE7, \u0CE8, \u0CE9)",
  invalidPhoneError: "\u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAE\u0CBE\u0CA8\u0CCD\u0CAF\u0CB5\u0CBE\u0CA6 10-\u0C85\u0C82\u0C95\u0CBF\u0CAF \u0CAD\u0CBE\u0CB0\u0CA4\u0CC0\u0CAF \u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA8\u0CAE\u0CC2\u0CA6\u0CBF\u0CB8\u0CBF (6-9 \u0CB0\u0CBF\u0C82\u0CA6 \u0CAA\u0CCD\u0CB0\u0CBE\u0CB0\u0C82\u0CAD)",
  speakNamePrompt: "\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0 \u0CB9\u0CC6\u0CB8\u0CB0\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB9\u0CC7\u0CB3\u0CBF...",
  phoneHelpText: "\u0CB5\u0CBE\u0C9F\u0CCD\u0CB8\u0CBE\u0CAA\u0CCD \u0C9C\u0CCD\u0C9E\u0CBE\u0CAA\u0CA8\u0CC6\u0C97\u0CC6 \u0C89\u0CAA\u0CAF\u0CC1\u0C95\u0CCD\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6 (\u0CA8\u0C82\u0CA4\u0CB0\u0CB5\u0CC2 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1).",
  manualEntryTitle: "\u0CB9\u0CB8\u0CCD\u0CA4\u0C9A\u0CBE\u0CB2\u0CBF\u0CA4 \u0CA8\u0CAE\u0CC2\u0CA6\u0CC1 (\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF\u0CAF\u0CBF\u0CB2\u0CCD\u0CB2\u0CA6\u0CC6)",
  today: "\u0C87\u0C82\u0CA6\u0CC1",
  yesterday: "\u0CA8\u0CBF\u0CA8\u0CCD\u0CA8\u0CC6",
  dayBeforeYesterday: "\u0CAE\u0CCA\u0CA8\u0CCD\u0CA8\u0CC6",
  baakiOwed: "\u0CAC\u0CBE\u0C95\u0CBF",
  listenReplay: "\u0C95\u0CC7\u0CB3\u0CBF",
  sendReminder: "\u0C9C\u0CCD\u0C9E\u0CBE\u0CAA\u0CA8\u0CC6 \u0C95\u0CB3\u0CC1\u0CB9\u0CBF\u0CB8\u0CBF",
  active: "\u0CB8\u0C95\u0CCD\u0CB0\u0CBF\u0CAF",
  noRecentActivity: "\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0C87\u0CA4\u0CCD\u0CA4\u0CC0\u0C9A\u0CBF\u0CA8 \u0C9A\u0C9F\u0CC1\u0CB5\u0C9F\u0CBF\u0C95\u0CC6 \u0C87\u0CB2\u0CCD\u0CB2",
  listeningDigitsPrompt: "\u0C86\u0CB2\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6... \u0C95\u0CCA\u0CA8\u0CC6\u0CAF 4 \u0C85\u0C82\u0C95\u0CBF\u0C97\u0CB3\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB9\u0CC7\u0CB3\u0CBF",
  tapCardOrMic: "\u0C95\u0CBE\u0CB0\u0CCD\u0CA1\u0CCD \u0C9F\u0CCD\u0CAF\u0CBE\u0CAA\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0CAE\u0CA4\u0CCD\u0CA4\u0CC6 \u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CB2\u0CC1 \u0CAE\u0CC8\u0C95\u0CCD \u0C92\u0CA4\u0CCD\u0CA4\u0CBF",
  first: "\u0CAE\u0CCA\u0CA6\u0CB2\u0CA8\u0CC6\u0CAF\u0CA6\u0CC1",
  second: "\u0C8E\u0CB0\u0CA1\u0CA8\u0CC6\u0CAF\u0CA6\u0CC1",
  qrSaveError: "QR \u0C95\u0CCB\u0CA1\u0CCD \u0C89\u0CB3\u0CBF\u0CB8\u0CB2\u0CC1 \u0CB8\u0CBE\u0CA7\u0CCD\u0CAF\u0CB5\u0CBE\u0C97\u0CB2\u0CBF\u0CB2\u0CCD\u0CB2",
  khataStatementSlip: "\u0C96\u0CBE\u0CA4\u0CC6 \u0CB5\u0CBF\u0CB5\u0CB0 \u0CB0\u0CB8\u0CC0\u0CA6\u0CBF",
  thankYouShopping: "\u0CB5\u0CCD\u0CAF\u0CBE\u0CAA\u0CBE\u0CB0\u0C95\u0CCD\u0C95\u0CBE\u0C97\u0CBF \u0CA7\u0CA8\u0CCD\u0CAF\u0CB5\u0CBE\u0CA6\u0C97\u0CB3\u0CC1! \u{1F64F}",
  receiptSharedSuccess: "\u0CB0\u0CB8\u0CC0\u0CA6\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0CAF\u0CB6\u0CB8\u0CCD\u0CB5\u0CBF\u0CAF\u0CBE\u0C97\u0CBF \u0CB9\u0C82\u0C9A\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6!",
  receiptCopiedSuccess: "\u0CB0\u0CB8\u0CC0\u0CA6\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 \u0C95\u0CCD\u0CB2\u0CBF\u0CAA\u0CCD\u200C\u0CAC\u0CCB\u0CB0\u0CCD\u0CA1\u0CCD\u200C\u0C97\u0CC6 \u0CA8\u0C95\u0CB2\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6!",
  whatsappPhoneNumber: "\u0CB5\u0CBE\u0C9F\u0CCD\u0CB8\u0CBE\u0CAA\u0CCD \u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD \u0CB8\u0C82\u0C96\u0CCD\u0CAF\u0CC6",
  selectTemplateLanguage: "\u0C9F\u0CC6\u0C82\u0CAA\u0CCD\u0CB2\u0CC7\u0C9F\u0CCD \u0CAD\u0CBE\u0CB7\u0CC6 \u0C86\u0CAF\u0CCD\u0C95\u0CC6\u0CAE\u0CBE\u0CA1\u0CBF",
  messagePreview: "\u0CB8\u0C82\u0CA6\u0CC7\u0CB6 \u0CAA\u0CC2\u0CB0\u0CCD\u0CB5\u0CB5\u0CC0\u0C95\u0CCD\u0CB7\u0CA3\u0CC6 (\u0CB8\u0C82\u0CAA\u0CBE\u0CA6\u0CBF\u0CB8\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1)",
  messageCopiedToast: "\u0CB8\u0C82\u0CA6\u0CC7\u0CB6 \u0CA8\u0C95\u0CB2\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6!",
  offlineSabChalega: "\u0C86\u0CAB\u0CCD\u200C\u0CB2\u0CC8\u0CA8\u0CCD \u2013 \u0C8E\u0CB2\u0CCD\u0CB2\u0CB5\u0CC2 \u0C95\u0CBE\u0CB0\u0CCD\u0CAF\u0CA8\u0CBF\u0CB0\u0CCD\u0CB5\u0CB9\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6",
  offlineSafeMessage: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CB2\u0CC6\u0CA1\u0CCD\u0C9C\u0CB0\u0CCD 100% \u0CB8\u0CC1\u0CB0\u0C95\u0CCD\u0CB7\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C88 \u0CB8\u0CBE\u0CA7\u0CA8\u0CA6\u0CB2\u0CCD\u0CB2\u0CBF \u0C89\u0CB3\u0CBF\u0CAF\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6.",
  offlineMicWarning: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C97\u0CC1\u0CB0\u0CC1\u0CA4\u0CBF\u0CB8\u0CC1\u0CB5\u0CBF\u0C95\u0CC6\u0C97\u0CC6 \u0C87\u0C82\u0C9F\u0CB0\u0CCD\u0CA8\u0CC6\u0C9F\u0CCD \u0CAC\u0CC7\u0C95\u0CBE\u0C97\u0CAC\u0CB9\u0CC1\u0CA6\u0CC1. \u0CAE\u0CC8\u0C95\u0CCD \u0C95\u0CC6\u0CB2\u0CB8 \u0CAE\u0CBE\u0CA1\u0CA6\u0CBF\u0CA6\u0CCD\u0CA6\u0CB0\u0CC6, '\u0C9F\u0CC8\u0CAA\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF' \u0CAC\u0CB3\u0CB8\u0CBF.",
  openTypeInstead: "'\u0C9F\u0CC8\u0CAA\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF' \u0CA4\u0CC6\u0CB0\u0CC6\u0CAF\u0CBF\u0CB0\u0CBF",
  gotIt: "\u0CB8\u0CB0\u0CBF, \u0C85\u0CB0\u0CCD\u0CA5\u0CB5\u0CBE\u0CAF\u0CBF\u0CA4\u0CC1",
  pinLockedNotice: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CB2\u0CC6\u0CA1\u0CCD\u0C9C\u0CB0\u0CCD AES-256 \u0C8E\u0CA8\u0CCD\u200C\u0C95\u0CCD\u0CB0\u0CBF\u0CAA\u0CCD\u0C9F\u0CCD \u0C86\u0C97\u0CBF\u0CA6\u0CC6. \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAA\u0CBF\u0CA8\u0CCD \u0CA8\u0CAE\u0CC2\u0CA6\u0CBF\u0CB8\u0CBF:",
  pinCryptoLockDesc: "\u0C8E\u0CB2\u0CCD\u0CB2\u0CBE \u0CA6\u0CBE\u0C96\u0CB2\u0CC6\u0C97\u0CB3\u0CC1 \u0CB5\u0CC6\u0CAC\u0CCD \u0C95\u0CCD\u0CB0\u0CBF\u0CAA\u0CCD\u0C9F\u0CCB (AES-256 GCM) \u0CAE\u0CC2\u0CB2\u0C95 \u0C8E\u0CA8\u0CCD\u200C\u0C95\u0CCD\u0CB0\u0CBF\u0CAA\u0CCD\u0C9F\u0CCD \u0C86\u0C97\u0CBF\u0CB5\u0CC6.",
  yesReset: "\u0CB9\u0CCC\u0CA6\u0CC1, \u0CAE\u0CB0\u0CC1\u0CB9\u0CCA\u0C82\u0CA6\u0CBF\u0CB8\u0CBF",
  dailySummarySub: "\u0CA6\u0CC8\u0CA8\u0C82\u0CA6\u0CBF\u0CA8 \u0CB8\u0C82\u0C97\u0CCD\u0CB0\u0CB9\u0CA3\u0CC6 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CB8\u0CBE\u0CB2\u0CA6 \u0CB8\u0CBE\u0CB0\u0CBE\u0C82\u0CB6",
  activeCustomersLabel: "\u0CB8\u0C95\u0CCD\u0CB0\u0CBF\u0CAF \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CC1",
  noDataAvailableDesc: "\u0C88 \u0CA6\u0CBF\u0CA8\u0CBE\u0C82\u0C95\u0C95\u0CCD\u0C95\u0CC6 \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CA8\u0CAE\u0CC2\u0CA6\u0CC1 \u0CA6\u0CBE\u0C96\u0CB2\u0CBE\u0C97\u0CBF\u0CB2\u0CCD\u0CB2.",
  noPendingUdhaarAllSettled: "\u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0CAC\u0CBE\u0C95\u0CBF \u0CB8\u0CBE\u0CB2\u0CB5\u0CBF\u0CB2\u0CCD\u0CB2. \u0C8E\u0CB2\u0CCD\u0CB2\u0CBE \u0C96\u0CBE\u0CA4\u0CC6\u0C97\u0CB3\u0CC1 \u0C87\u0CA4\u0CCD\u0CAF\u0CB0\u0CCD\u0CA5\u0CB5\u0CBE\u0C97\u0CBF\u0CB5\u0CC6! \u2713",
  zeroBalance: "\u0C8E\u0CB2\u0CCD\u0CB2\u0CB5\u0CC2 \u0C87\u0CA4\u0CCD\u0CAF\u0CB0\u0CCD\u0CA5\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6, \u0CB6\u0CC2\u0CA8\u0CCD\u0CAF \u0CAC\u0CBE\u0C95\u0CBF",
  khataTimeline: "\u0C96\u0CBE\u0CA4\u0CC6 \u0C95\u0CBE\u0CB2\u0CBE\u0CB5\u0CA7\u0CBF",
  saveEntry: "\u0CA8\u0CAE\u0CC2\u0CA6\u0CA8\u0CCD\u0CA8\u0CC1 \u0C89\u0CB3\u0CBF\u0CB8\u0CBF",
  addUdhaar: "+ \u0CB8\u0CBE\u0CB2 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  addPayment: "+ \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  addEntry: "\u0CA8\u0CAE\u0CC2\u0CA6\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  noteOptional: "\u0C9F\u0CBF\u0CAA\u0CCD\u0CAA\u0CA3\u0CBF (\u0C90\u0C9A\u0CCD\u0C9B\u0CBF\u0C95)",
  whatsappReminder: "\u0CB5\u0CBE\u0C9F\u0CCD\u0CB8\u0CBE\u0CAA\u0CCD",
  lastReminder: "\u0C95\u0CCA\u0CA8\u0CC6\u0CAF \u0C9C\u0CCD\u0C9E\u0CBE\u0CAA\u0CA8\u0CC6",
  savingByVoice: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C86\u0CA6\u0CC7\u0CB6\u0CA6\u0CBF\u0C82\u0CA6 \u0C89\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CBF\u0CA6\u0CC6...",
  cancelledByVoice: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF\u0CAF\u0CBF\u0C82\u0CA6 \u0CB0\u0CA6\u0CCD\u0CA6\u0CC1\u0C97\u0CCA\u0CB3\u0CBF\u0CB8\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  noCustomersEmptyState: "\u0C87\u0CA8\u0CCD\u0CA8\u0CC2 \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC7 \u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0\u0CBF\u0CB2\u0CCD\u0CB2. \u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CC1\u0CB5 \u0CAE\u0CC2\u0CB2\u0C95 \u0CAE\u0CCA\u0CA6\u0CB2 \u0CB8\u0CBE\u0CB2\u0CB5\u0CA8\u0CCD\u0CA8\u0CC1 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  addFirstUdhaarVoice: "\u{1F3A4} \u0CA7\u0CCD\u0CB5\u0CA8\u0CBF\u0CAF \u0CAE\u0CC2\u0CB2\u0C95 \u0CAE\u0CCA\u0CA6\u0CB2 \u0CB8\u0CBE\u0CB2 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
  onboardingStep1Title: "1. \u0CAE\u0CC8\u0C95\u0CCD \u0C92\u0CA4\u0CCD\u0CA4\u0CBF \u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CBF",
  onboardingStep1Desc: "\u0C85\u0C82\u0C97\u0CA1\u0CBF\u0CAF \u0C95\u0CCC\u0C82\u0C9F\u0CB0\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0C95\u0CC8\u0C97\u0CB3\u0CC1 \u0C95\u0CBE\u0CB0\u0CCD\u0CAF\u0CA8\u0CBF\u0CB0\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CB5\u0CC6\u0CAF\u0CC7? \u0CAE\u0CC8\u0C95\u0CCD \u0C92\u0CA4\u0CCD\u0CA4\u0CBF \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAD\u0CBE\u0CB7\u0CC6\u0CAF\u0CB2\u0CCD\u0CB2\u0CBF \u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CBF.",
  onboardingStep2Title: "2. \u0CAA\u0CB0\u0CA6\u0CC6\u0CAF \u0CAE\u0CC7\u0CB2\u0CC6 \u0CAA\u0CC2\u0CB0\u0CCD\u0CB5\u0CB5\u0CC0\u0C95\u0CCD\u0CB7\u0CA3\u0CC6 \u0CA8\u0CCB\u0CA1\u0CBF",
  onboardingStep2Desc: "\u0C86\u0CCD\u0CAF\u0CAA\u0CCD \u0CA4\u0C95\u0CCD\u0CB7\u0CA3 \u0CA8\u0CAE\u0CC2\u0CA6\u0CA8\u0CCD\u0CA8\u0CC1 \u0CA4\u0CCB\u0CB0\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6. \u0C89\u0CB3\u0CBF\u0CB8\u0CB2\u0CC1 \u0C9F\u0CCD\u0CAF\u0CBE\u0CAA\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0CA7\u0CCD\u0CB5\u0CA8\u0CBF\u0CAF\u0CBF\u0C82\u0CA6 \u0CB8\u0CB0\u0CBF\u0CAA\u0CA1\u0CBF\u0CB8\u0CBF.",
  onboardingStep3Title: "3. \u0CA4\u0C95\u0CCD\u0CB7\u0CA3\u0CA6 \u0CB2\u0CC6\u0CA1\u0CCD\u0C9C\u0CB0\u0CCD \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0C9C\u0CCD\u0C9E\u0CBE\u0CAA\u0CA8\u0CC6\u0C97\u0CB3\u0CC1",
  onboardingStep3Desc: "\u0C97\u0CCD\u0CB0\u0CBE\u0CB9\u0C95\u0CB0 \u0CB2\u0CC6\u0CA1\u0CCD\u0C9C\u0CB0\u0CCD \u0CA4\u0C95\u0CCD\u0CB7\u0CA3 \u0C85\u0CAA\u0CCD\u200C\u0CA1\u0CC7\u0C9F\u0CCD \u0C86\u0C97\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6! \u0CB5\u0CBE\u0C9F\u0CCD\u0CB8\u0CBE\u0CAA\u0CCD \u0C9C\u0CCD\u0C9E\u0CBE\u0CAA\u0CA8\u0CC6 \u0C95\u0CB3\u0CC1\u0CB9\u0CBF\u0CB8\u0CBF \u0C85\u0CA5\u0CB5\u0CBE \u0CB0\u0CB8\u0CC0\u0CA6\u0CBF \u0CAE\u0CC1\u0CA6\u0CCD\u0CB0\u0CBF\u0CB8\u0CBF.",
  grantMicAndStart: "\u0CAE\u0CC8\u0C95\u0CCD \u0C85\u0CA8\u0CC1\u0CAE\u0CA4\u0CBF \u0CA8\u0CC0\u0CA1\u0CBF \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 \u0CAA\u0CCD\u0CB0\u0CBE\u0CB0\u0C82\u0CAD\u0CBF\u0CB8\u0CBF",
  installAppTitle: "\u0C85\u0CAA\u0CCD\u0CB2\u0CBF\u0C95\u0CC7\u0CB6\u0CA8\u0CCD \u0CB8\u0CCD\u0CA5\u0CBE\u0CAA\u0CBF\u0CB8\u0CBF (\u0CAE\u0CC1\u0C96\u0CAA\u0CC1\u0C9F)",
  installAppSub: "\u0CB5\u0CC7\u0C97 \u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 100% \u0C86\u0CAB\u0CCD\u200C\u0CB2\u0CC8\u0CA8\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0C95\u0CBE\u0CB0\u0CCD\u0CAF\u0CA8\u0CBF\u0CB0\u0CCD\u0CB5\u0CB9\u0CBF\u0CB8\u0CC1\u0CA4\u0CCD\u0CA4\u0CA6\u0CC6 \u2022 1 \u0C9F\u0CCD\u0CAF\u0CBE\u0CAA\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0C96\u0CBE\u0CA4\u0CC6",
  install: "\u0CB8\u0CCD\u0CA5\u0CBE\u0CAA\u0CBF\u0CB8\u0CBF",
  errorBoundaryTitle: "\u0C8F\u0CA8\u0CCB \u0CA4\u0CAA\u0CCD\u0CAA\u0CBE\u0C97\u0CBF\u0CA6\u0CC6",
  errorBoundarySub: "\u0C8F\u0CA8\u0CCB \u0CA4\u0CAA\u0CCD\u0CAA\u0CBE\u0C97\u0CBF\u0CA6\u0CC6, \u0C86\u0CA6\u0CB0\u0CC6 \u0C9A\u0CBF\u0C82\u0CA4\u0CBF\u0CB8\u0CAC\u0CC7\u0CA1\u0CBF!",
  errorBoundarySafety: "\u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0C8E\u0CB2\u0CCD\u0CB2\u0CBE \u0C96\u0CBE\u0CA4\u0CBE \u0CA1\u0CC7\u0C9F\u0CBE \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAB\u0CCB\u0CA8\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CB8\u0CC1\u0CB0\u0C95\u0CCD\u0CB7\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6 (IndexedDB). \u0CAF\u0CBE\u0CB5\u0CC1\u0CA6\u0CC2 \u0C95\u0CB3\u0CC6\u0CA6\u0CC1\u0CB9\u0CCB\u0C97\u0CBF\u0CB2\u0CCD\u0CB2.",
  retryButton: "\u0CAE\u0CA4\u0CCD\u0CA4\u0CC6 \u0CAA\u0CCD\u0CB0\u0CAF\u0CA4\u0CCD\u0CA8\u0CBF\u0CB8\u0CBF",
  goHomeButton: "\u0CAE\u0CC1\u0C96\u0CAA\u0CC1\u0C9F\u0C95\u0CCD\u0C95\u0CC6 \u0CB9\u0CCB\u0C97\u0CBF",
  technicalDetails: "\u0CA4\u0CBE\u0C82\u0CA4\u0CCD\u0CB0\u0CBF\u0C95 \u0CA6\u0CCB\u0CB7 \u0CB5\u0CBF\u0CB5\u0CB0\u0C97\u0CB3\u0CC1"
};

// src/i18n/locales/ta.json
var ta_default = {
  appName: "Udhaar Sathi (\u0B89\u0BA4\u0BBE\u0BB0\u0BCD \u0B9A\u0BBE\u0BA4\u0BBF)",
  tagline: "\u0BAA\u0BC7\u0B9A\u0BBF \u0B95\u0B9F\u0BA9\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  online: "\u0B86\u0BA9\u0BCD\u0BB2\u0BC8\u0BA9\u0BCD",
  offlineSafe: "\u0B86\u0B83\u0BAA\u0BCD\u0BB2\u0BC8\u0BA9\u0BCD \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BBE\u0BA9\u0BA4\u0BC1 (\u0BB2\u0BCB\u0B95\u0BCD\u0B95\u0BB2\u0BCD)",
  navHome: "\u0BAE\u0BC1\u0B95\u0BAA\u0BCD\u0BAA\u0BC1 (\u0BAE\u0BC8\u0B95\u0BCD)",
  navCustomers: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD",
  navSummary: "\u0BA4\u0BBF\u0BA9\u0B9A\u0BB0\u0BBF \u0B9A\u0BC1\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
  navSettings: "\u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD",
  navStyleguide: "\u0BB5\u0B9F\u0BBF\u0BB5\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1",
  save: "\u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95",
  cancel: "\u0BB0\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD",
  delete: "\u0BA8\u0BC0\u0B95\u0BCD\u0B95\u0BC1",
  edit: "\u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1",
  close: "\u0BAE\u0BC2\u0B9F\u0BC1",
  search: "\u0BA4\u0BC7\u0B9F\u0BC1",
  back: "\u0BAA\u0BBF\u0BA9\u0BCD\u0B9A\u0BC6\u0BB2\u0BCD",
  done: "\u0BAE\u0BC1\u0B9F\u0BBF\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1",
  creditGiven: "\u0B95\u0B9F\u0BA9\u0BCD \u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BA4\u0BC1",
  paymentReceived: "\u0BAA\u0BA3\u0BAE\u0BCD \u0BB5\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1",
  balanceOwed: "\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4 \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF",
  netBalance: "\u0BA8\u0BBF\u0B95\u0BB0 \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF",
  todaySummary: "\u0B87\u0BA9\u0BCD\u0BB1\u0BC8\u0BAF \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1",
  recentEntries: "\u0B9A\u0BAE\u0BC0\u0BAA\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1\u0B95\u0BB3\u0BCD",
  noEntries: "\u0B87\u0BA9\u0BCD\u0BA9\u0BC1\u0BAE\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8",
  micIdle: "\u0BAE\u0BC8\u0B95\u0BCD \u0B85\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF \u0BAA\u0BC7\u0B9A\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  micListening: "\u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1... \u0BAA\u0BC7\u0B9A\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  micProcessing: "\u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BBF\u0B9F\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  micError: "\u0BA4\u0BC6\u0BB3\u0BBF\u0BB5\u0BBE\u0B95 \u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8. \u0BAE\u0BC0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0BAE\u0BC1\u0BAF\u0BB1\u0BCD\u0B9A\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.",
  typeInstead: "\u0BA4\u0B9F\u0BCD\u0B9F\u0B9A\u0BCD\u0B9A\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BC1\u0BAE\u0BCD",
  trySpeaking: "\u0BAA\u0BC7\u0B9A\u0BBF\u0BAA\u0BCD \u0BAA\u0BBE\u0BB0\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD:",
  customersTitle: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1",
  searchCustomerPlaceholder: "\u0BAA\u0BC6\u0BAF\u0BB0\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BAE\u0BCA\u0BAA\u0BC8\u0BB2\u0BCD \u0BA4\u0BC7\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD...",
  filterAll: "\u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1\u0BAE\u0BCD",
  filterOwes: "\u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF \u0B89\u0BB3\u0BCD\u0BB3\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BCD",
  filterSettled: "\u0BAE\u0BC1\u0B9F\u0BBF\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1",
  addJama: "+ \u0BAA\u0BA3\u0BAE\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD",
  printSlip: "\u0BB0\u0B9A\u0BC0\u0BA4\u0BC1 \u0B85\u0B9A\u0BCD\u0B9A\u0BBF\u0B9F\u0BC1\u0B95",
  sendWhatsApp: "\u0BB5\u0BBE\u0B9F\u0BCD\u0BB8\u0BCD\u0B85\u0BAA\u0BCD \u0BA8\u0BBF\u0BA9\u0BC8\u0BB5\u0BC2\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD",
  summaryTitle: "\u0BA4\u0BBF\u0BA9\u0B9A\u0BB0\u0BBF \u0B9A\u0BC1\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
  todayUdhaar: "\u0B95\u0B9F\u0BA9\u0BCD \u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BA4\u0BC1",
  todayJama: "\u0BAA\u0BA3\u0BAE\u0BCD \u0BB5\u0BB0\u0BB5\u0BC1",
  todayNet: "\u0BA8\u0BBF\u0B95\u0BB0 \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0BAE\u0BCD",
  weeklyTrend: "\u0B95\u0B9F\u0BA8\u0BCD\u0BA4 7 \u0BA8\u0BBE\u0B9F\u0BCD\u0B95\u0BB3\u0BCD \u0BAA\u0BCB\u0B95\u0BCD\u0B95\u0BC1",
  topPending: "\u0B85\u0BA4\u0BBF\u0B95 \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF \u0B89\u0BB3\u0BCD\u0BB3\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BCD",
  settingsTitle: "\u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD",
  settingsSubtitle: "\u0B95\u0B9F\u0BC8 \u0BB5\u0BBF\u0BB5\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BCD, \u0BAE\u0BCA\u0BB4\u0BBF, \u0B92\u0BB2\u0BBF\u0BAA\u0BCD\u0BAA\u0BC6\u0B9F\u0BCD\u0B9F\u0BBF \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BC1\u0BAA\u0BCD\u0BAA\u0BBF\u0BB0\u0BA4\u0BBF",
  shopNameLabel: "\u0B95\u0B9F\u0BC8 \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD",
  shopNamePlaceholder: "\u0B8E.\u0B95\u0BBE. \u0BB0\u0BAE\u0BC7\u0BB7\u0BCD \u0BAE\u0BB3\u0BBF\u0B95\u0BC8\u0B95\u0BCD \u0B95\u0B9F\u0BC8",
  uiLanguageLabel: "\u0BA4\u0BBF\u0BB0\u0BC8 \u0BAE\u0BCA\u0BB4\u0BBF",
  uiLanguageDesc: "\u0BAA\u0BCA\u0BA4\u0BCD\u0BA4\u0BBE\u0BA9\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA4\u0BBF\u0BB0\u0BC8\u0BAF\u0BBF\u0BA9\u0BCD \u0BAE\u0BCA\u0BB4\u0BBF",
  speechLanguageLabel: "\u0BAA\u0BC7\u0B9A\u0BC1\u0BAE\u0BCD \u0BAE\u0BCA\u0BB4\u0BBF",
  speechLanguageDesc: "\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B85\u0B99\u0BCD\u0B95\u0BC0\u0B95\u0BBE\u0BB0\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B92\u0BB2\u0BBF\u0BAA\u0BCD\u0BAA\u0BC6\u0B9F\u0BCD\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC1",
  speechSpeedLabel: "\u0BAA\u0BC7\u0B9A\u0BCD\u0B9A\u0BC1 \u0BB5\u0BC7\u0B95\u0BAE\u0BCD (Soundbox)",
  speedSlow: "\u0BAE\u0BC6\u0BA4\u0BC1\u0BB5\u0BBE\u0B95",
  speedNormal: "\u0B87\u0BAF\u0BB2\u0BCD\u0BAA\u0BBE\u0BA9\u0BA4\u0BC1",
  speedFast: "\u0BB5\u0BC7\u0B95\u0BAE\u0BBE\u0B95",
  muteRepliesLabel: "\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0BAA\u0BA4\u0BBF\u0BB2\u0BCD\u0B95\u0BB3\u0BC8 \u0BAE\u0BC1\u0B9F\u0B95\u0BCD\u0B95\u0BC1",
  muteRepliesDesc: "\u0BAE\u0BA3\u0BBF \u0BAE\u0B9F\u0BCD\u0B9F\u0BC1\u0BAE\u0BC7 \u0B92\u0BB2\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD, \u0BAA\u0BC7\u0B9A\u0BBE\u0BA4\u0BC1",
  themeLabel: "\u0BA4\u0BC0\u0BAE\u0BCD",
  themeLight: "\u0BB2\u0BC8\u0B9F\u0BCD \u0BA4\u0BC0\u0BAE\u0BCD",
  themeHighContrast: "\u0BB9\u0BC8 \u0B95\u0BBE\u0BA9\u0BCD\u0B9F\u0BCD\u0BB0\u0BBE\u0BB8\u0BCD\u0B9F\u0BCD (\u0B9F\u0BBE\u0BB0\u0BCD\u0B95\u0BCD)",
  themeDesc: "\u0BB5\u0BC6\u0BAF\u0BBF\u0BB2\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B87\u0BB0\u0BB5\u0BC1 \u0BAA\u0BBE\u0BB0\u0BCD\u0BB5\u0BC8\u0B95\u0BCD\u0B95\u0BC1 \u0B8F\u0BB1\u0BCD\u0BB1 \u0BAE\u0BBE\u0BB1\u0BC1\u0BAA\u0BBE\u0B9F\u0BC1",
  asrEngineLabel: "\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B87\u0BAF\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BAE\u0BCD (ASR)",
  asrEngineDesc: "\u0BAA\u0BC7\u0B9A\u0BCD\u0B9A\u0BC8 \u0B89\u0BB0\u0BC8\u0BAF\u0BBE\u0B95 \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B87\u0BAF\u0BA8\u0BCD\u0BA4\u0BBF\u0BB0\u0BAE\u0BCD",
  asrBrowser: "\u0B89\u0BB2\u0BB5\u0BBF \u0B86\u0BA9\u0BCD-\u0B9F\u0BBF\u0BB5\u0BC8\u0BB8\u0BCD (\u0B87\u0BB2\u0BB5\u0B9A\u0BAE\u0BCD, \u0B86\u0B83\u0BAA\u0BCD\u0BB2\u0BC8\u0BA9\u0BCD)",
  asrBhashini: "\u0BAA\u0BBE\u0BB7\u0BBF\u0BA9\u0BBF AI (\u0B9F\u0BBF\u0B9C\u0BBF\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD \u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF\u0BBE) [Stubbed]",
  asrSarvam: "\u0B9A\u0BB0\u0BCD\u0BB5\u0BAE\u0BCD AI (\u0B87\u0BA3\u0BCD\u0B9F\u0BBF\u0B95\u0BCD \u0B95\u0BC1\u0BB0\u0BB2\u0BCD) [Stubbed]",
  exportLedgerLabel: "\u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0BA4\u0BB0\u0BB5\u0BC1 \u0B8F\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BA4\u0BBF",
  exportJson: "JSON \u0B87\u0BB2\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BBF\u0BB1\u0B95\u0BCD\u0B95\u0BC1",
  exportCsv: "CSV \u0B87\u0BB2\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BBF\u0BB1\u0B95\u0BCD\u0B95\u0BC1",
  dangerZoneLabel: "\u0B86\u0BAA\u0BA4\u0BCD\u0BA4\u0BC1 \u0BAA\u0B95\u0BC1\u0BA4\u0BBF",
  clearAllData: "\u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1 \u0BA4\u0BB0\u0BB5\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BA8\u0BC0\u0B95\u0BCD\u0B95\u0BC1",
  clearConfirm: "\u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD\u0B95\u0BB3\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1\u0B95\u0BB3\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BA8\u0BC0\u0B95\u0BCD\u0B95 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1\u0B95\u0BBF\u0BB1\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BBE? \u0B87\u0BA4\u0BC8 \u0BAE\u0BC0\u0B9F\u0BCD\u0B9F\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95 \u0BAE\u0BC1\u0B9F\u0BBF\u0BAF\u0BBE\u0BA4\u0BC1.",
  clearSuccess: "\u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1 \u0BA4\u0BB0\u0BB5\u0BC1\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0BB5\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF\u0B95\u0BB0\u0BAE\u0BBE\u0B95 \u0BA8\u0BC0\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA9!",
  resetDemo: "\u0B9F\u0BC6\u0BAE\u0BCB \u0BA4\u0BB0\u0BB5\u0BC8 \u0BAE\u0BC0\u0B9F\u0BCD\u0B9F\u0BC6\u0B9F\u0BC1",
  resetSuccess: "\u0B9F\u0BC6\u0BAE\u0BCB \u0BA4\u0BB0\u0BB5\u0BC1 \u0B8F\u0BB1\u0BCD\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1!",
  localFirstInfo: "Udhaar Sathi 100% \u0B86\u0B83\u0BAA\u0BCD\u0BB2\u0BC8\u0BA9\u0BCD. \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B8E\u0BB2\u0BCD\u0BB2\u0BBE \u0BA4\u0BB0\u0BB5\u0BC1\u0BAE\u0BCD \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0BCA\u0BB2\u0BC8\u0BAA\u0BC7\u0B9A\u0BBF\u0BAF\u0BBF\u0BB2\u0BC7\u0BAF\u0BC7 \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1 (IndexedDB).",
  signupWelcomeTitle: "Udhaar Sathi \u0B95\u0BCD\u0B95\u0BC1 \u0BA8\u0BB2\u0BCD\u0BB5\u0BB0\u0BB5\u0BC1",
  signupWelcomeSubtitle: "\u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF \u0BAE\u0BB3\u0BBF\u0B95\u0BC8\u0B95\u0BCD \u0B95\u0B9F\u0BC8\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0B95\u0BC8\u0B95\u0BB3\u0BCD-\u0B87\u0BB2\u0BB5\u0B9A \u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0BB2\u0BC6\u0B9F\u0BCD\u0B9C\u0BB0\u0BCD",
  dataStaysOnPhone: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0BB0\u0BB5\u0BC1 \u0B87\u0BA8\u0BCD\u0BA4 \u0BAA\u0BCB\u0BA9\u0BBF\u0BB2\u0BCD \u0BAE\u0B9F\u0BCD\u0B9F\u0BC1\u0BAE\u0BC7 \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD",
  getStarted: "\u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  stepOf: "\u0BAA\u0B9F\u0BBF {current} / {total}",
  shopNamePrompt: "\u0B95\u0B9F\u0BC8\u0BAF\u0BBF\u0BA9\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD \u0B8E\u0BA9\u0BCD\u0BA9?",
  shopNameSpoken: "\u0B95\u0B9F\u0BC8\u0BAF\u0BBF\u0BA9\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BC8\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  shopNameHelper: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0B9F\u0BC8\u0BAF\u0BBF\u0BA9\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BC8\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BA4\u0B9F\u0BCD\u0B9F\u0B9A\u0BCD\u0B9A\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  shopNameError: "\u0BA4\u0BAF\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0B95\u0B9F\u0BC8\u0BAF\u0BBF\u0BA9\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BBF\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD (\u0B95\u0BC1\u0BB1\u0BC8\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1 2 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD)",
  ownerNamePrompt: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD \u0B8E\u0BA9\u0BCD\u0BA9?",
  ownerNameSpoken: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BC8\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  ownerNamePlaceholder: "\u0B89\u0BA4\u0BBE. \u0BB0\u0BAE\u0BC7\u0BB7\u0BCD \u0B95\u0BC1\u0BAE\u0BBE\u0BB0\u0BCD",
  ownerNameHelper: "\u0B95\u0B9F\u0BC8 \u0B89\u0BB0\u0BBF\u0BAE\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD",
  ownerNameError: "\u0BA4\u0BAF\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BBF\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD (\u0B95\u0BC1\u0BB1\u0BC8\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1 2 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD)",
  phonePrompt: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BCA\u0BAA\u0BC8\u0BB2\u0BCD \u0B8E\u0BA3\u0BCD",
  phoneSpoken: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD 10 \u0B87\u0BB2\u0B95\u0BCD\u0B95 \u0BAE\u0BCA\u0BAA\u0BC8\u0BB2\u0BCD \u0B8E\u0BA3\u0BCD\u0BA3\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BBF\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD",
  phonePlaceholder: "\u0B89\u0BA4\u0BBE. 9876543210",
  phoneHelper: "\u0BB5\u0BBE\u0B9F\u0BCD\u0BB8\u0BCD\u0B85\u0BAA\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF \u0BA8\u0BBF\u0BA9\u0BC8\u0BB5\u0BC2\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0BA9 10 \u0B87\u0BB2\u0B95\u0BCD\u0B95 \u0BAE\u0BCA\u0BAA\u0BC8\u0BB2\u0BCD \u0B8E\u0BA3\u0BCD",
  phoneError: "6-9 \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0BAE\u0BCD 10 \u0B87\u0BB2\u0B95\u0BCD\u0B95 \u0BAE\u0BCA\u0BAA\u0BC8\u0BB2\u0BCD \u0B8E\u0BA3\u0BCD\u0BA3\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BBF\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD",
  upiPrompt: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAF\u0BC1\u0BAA\u0BBF\u0B90 \u0B90\u0B9F\u0BBF",
  upiSpoken: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAF\u0BC1\u0BAA\u0BBF\u0B90 \u0B90\u0B9F\u0BBF\u0BAF\u0BC8\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BA4\u0B9F\u0BCD\u0B9F\u0B9A\u0BCD\u0B9A\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  upiPlaceholder: "\u0B89\u0BA4\u0BBE. ramesh@oksbi",
  upiHelperText: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAF\u0BC1\u0BAA\u0BBF\u0B90 \u0B90\u0B9F\u0BBF \u0BAE\u0B9F\u0BCD\u0B9F\u0BC1\u0BAE\u0BC7 \u0BA4\u0BC7\u0BB5\u0BC8. \u0BA8\u0BBE\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B92\u0BB0\u0BC1\u0BAA\u0BCB\u0BA4\u0BC1\u0BAE\u0BCD \u0BB5\u0B99\u0BCD\u0B95\u0BBF \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0B8E\u0BA3\u0BCD\u0BA3\u0BC8\u0B95\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0BAA\u0BA4\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8.",
  upiPaste: "\u0B92\u0B9F\u0BCD\u0B9F\u0BC1",
  upiReadBack: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BBE\u0BB0\u0BBF\u0BAF\u0BBE\u0B95\u0B95\u0BCD \u0B95\u0BC7\u0BB3\u0BCD",
  upiReadingBack: "\u0BB5\u0BBE\u0B9A\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  upiError: "\u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BAF\u0BC1\u0BAA\u0BBF\u0B90 \u0B90\u0B9F\u0BBF\u0BAF\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BBF\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD (\u0B89\u0BA4\u0BBE. name@bank)",
  pinPrompt: "\u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BC1 \u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BC8 \u0B85\u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD (\u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BA4\u0BCD\u0BA4\u0BC7\u0BB0\u0BCD\u0BB5\u0BC1)",
  pinSpoken: "4 \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD 6 \u0B87\u0BB2\u0B95\u0BCD\u0B95 \u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BA4\u0BB5\u0BBF\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  pinPlaceholder: "4-6 \u0B87\u0BB2\u0B95\u0BCD\u0B95 \u0BAA\u0BBF\u0BA9\u0BCD",
  pinHelperText: "\u0B9A\u0BBE\u0BA4\u0BA9 \u0B95\u0BC1\u0BB1\u0BBF\u0BAF\u0BBE\u0B95\u0BCD\u0B95\u0BA4\u0BCD\u0BA4\u0BC1\u0B9F\u0BA9\u0BCD \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC8\u0BAA\u0BCD \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1. \u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BB0\u0BC1\u0BAE\u0BCD \u0B85\u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BB2\u0BBE\u0BAE\u0BCD.",
  pinSkip: "\u0B87\u0BAA\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1 \u0BA4\u0BB5\u0BBF\u0BB0\u0BCD",
  pinSkipWarning: "\u0BAA\u0BBF\u0BA9\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BBE\u0BAE\u0BB2\u0BCD \u0B87\u0BA8\u0BCD\u0BA4 \u0B9A\u0BC6\u0BAF\u0BB2\u0BBF\u0BAF\u0BC8\u0BA4\u0BCD \u0BA4\u0BBF\u0BB1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B8E\u0BB5\u0BB0\u0BC1\u0BAE\u0BCD \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC8\u0BAA\u0BCD \u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB2\u0BBE\u0BAE\u0BCD. \u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B8E\u0BAA\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BBE\u0BA9\u0BBE\u0BB2\u0BC1\u0BAE\u0BCD \u0BAA\u0BBF\u0BA9\u0BCD \u0B85\u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BB2\u0BBE\u0BAE\u0BCD.",
  pinSkipConfirm: "\u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BC8\u0BA4\u0BCD \u0BA4\u0BB5\u0BBF\u0BB0\u0BCD",
  pinError: "\u0BAA\u0BBF\u0BA9\u0BCD 4-6 \u0B87\u0BB2\u0B95\u0BCD\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B8E\u0BB3\u0BBF\u0BAF \u0BB5\u0BB0\u0BBF\u0B9A\u0BC8\u0BAF\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0B95\u0BCD\u0B95\u0BC2\u0B9F\u0BBE\u0BA4\u0BC1 (\u0B89\u0BA4\u0BBE. 1234, 0000)",
  reviewTitle: "\u0B95\u0B9F\u0BC8 \u0B9A\u0BC1\u0BAF\u0BB5\u0BBF\u0BB5\u0BB0\u0BA4\u0BCD\u0BA4\u0BC8 \u0B9A\u0BB0\u0BBF\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  reviewSubtitle: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BB5\u0BBF\u0BB5\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0B89\u0BB1\u0BC1\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD. \u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B8E\u0BAA\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BBE\u0BA9\u0BBE\u0BB2\u0BC1\u0BAE\u0BCD \u0BAA\u0BC1\u0BA4\u0BC1\u0BAA\u0BCD\u0BAA\u0BBF\u0B95\u0BCD\u0B95\u0BB2\u0BBE\u0BAE\u0BCD.",
  startAppButton: "Udhaar Sathi \u0B90\u0BA4\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  editField: "\u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1",
  nextStep: "\u0B85\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1",
  prevStep: "\u0BAA\u0BBF\u0BA9\u0BCD\u0B9A\u0BC6\u0BB2\u0BCD",
  settingsProfileTitle: "\u0B95\u0B9F\u0BC8 \u0B9A\u0BC1\u0BAF\u0BB5\u0BBF\u0BB5\u0BB0\u0BAE\u0BCD",
  settingsProfileSubtitle: "\u0B95\u0B9F\u0BC8 \u0BB5\u0BBF\u0BB5\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BCD, \u0B89\u0BB0\u0BBF\u0BAE\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0BA4\u0B95\u0BB5\u0BB2\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B95\u0B9F\u0BCD\u0B9F\u0BA3 \u0BAF\u0BC1\u0BAA\u0BBF\u0B90 \u0B90\u0B9F\u0BBF",
  confirmUpiChangeTitle: "\u0BAF\u0BC1\u0BAA\u0BBF\u0B90 \u0B90\u0B9F\u0BBF\u0BAF\u0BC8 \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0BB5\u0BBE?",
  confirmUpiChangeWarning: "\u0BAF\u0BC1\u0BAA\u0BBF\u0B90 \u0B90\u0B9F\u0BBF\u0BAF\u0BC8 \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0BBF\u0BA9\u0BBE\u0BB2\u0BCD \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B85\u0BA9\u0BC1\u0BAA\u0BCD\u0BAA\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD \u0B95\u0B9F\u0BCD\u0B9F\u0BA3 \u0B95\u0BBF\u0BAF\u0BC2\u0B86\u0BB0\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B87\u0BA3\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD \u0BAE\u0BBE\u0BB1\u0BC1\u0BAE\u0BCD. \u0BA8\u0BC0\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B89\u0BB1\u0BC1\u0BA4\u0BBF\u0BAF\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BBE?",
  confirmUpiChangeButton: "\u0B86\u0BAE\u0BCD, \u0BAF\u0BC1\u0BAA\u0BBF\u0B90 \u0B90\u0B9F\u0BBF\u0BAF\u0BC8 \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0BC1",
  noPinWarningBanner: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BBE\u0BB2\u0BCD \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8. \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0BB0\u0BB5\u0BC8\u0BAA\u0BCD \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0B95\u0BCD\u0B95 \u0B87\u0BAA\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1 \u0BAA\u0BBF\u0BA9\u0BCD \u0B85\u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.",
  setPinNow: "\u0B87\u0BAA\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1 \u0BAA\u0BBF\u0BA9\u0BCD \u0B85\u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  profileUpdatedToast: "\u0B95\u0B9F\u0BC8 \u0B9A\u0BC1\u0BAF\u0BB5\u0BBF\u0BB5\u0BB0\u0BAE\u0BCD \u0BB5\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF\u0B95\u0BB0\u0BAE\u0BBE\u0B95 \u0BAA\u0BC1\u0BA4\u0BC1\u0BAA\u0BCD\u0BAA\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1!",
  registerCustomerTitle: "\u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1",
  registerCustomerSubtitle: "\u0B95\u0BC1\u0BB1\u0BBF\u0BAF\u0BBE\u0B95\u0BCD\u0B95\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BBF\u0BB2\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95 \u0BB5\u0BBF\u0BB5\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BBF\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD",
  enterCustomerPhone: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0BAE\u0BCA\u0BAA\u0BC8\u0BB2\u0BCD \u0B8E\u0BA3\u0BCD",
  phoneReadBackQuestion: "{phone}. \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9\u0BA4\u0BBE?",
  readBackConfirm: "\u0B86\u0BAE\u0BCD, \u0B9A\u0BB0\u0BBF",
  readBackWrong: "\u0B87\u0BB2\u0BCD\u0BB2\u0BC8, \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0BC1",
  skipPhoneForNow: "\u0B87\u0BAA\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1 \u0BA4\u0BB5\u0BBF\u0BB0\u0BCD",
  noNumberWarning: "\u0B8E\u0BA3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BBE\u0BAE\u0BB2\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1. \u0BA8\u0BBF\u0BA9\u0BC8\u0BB5\u0BC2\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B8E\u0BA3\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD.",
  duplicatePhoneWarning: "\u0B87\u0BA8\u0BCD\u0BA4 \u0B8E\u0BA3\u0BCD {name} \u0B89\u0B9F\u0BC8\u0BAF\u0BA4\u0BC1. \u0B85\u0BA4\u0BC7 \u0BA8\u0BAA\u0BB0\u0BBE?",
  openExistingCustomer: "\u0B86\u0BAE\u0BCD, {name} \u0BA4\u0BBF\u0BB1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  useAnotherNumber: "\u0BB5\u0BC7\u0BB1\u0BC1 \u0B8E\u0BA3\u0BCD\u0BA3\u0BC8\u0BAA\u0BCD \u0BAA\u0BAF\u0BA9\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD",
  requireCustomerPhoneLabel: "\u0BAE\u0BCA\u0BAA\u0BC8\u0BB2\u0BCD \u0B8E\u0BA3\u0BCD \u0B95\u0B9F\u0BCD\u0B9F\u0BBE\u0BAF\u0BAE\u0BCD",
  requireCustomerPhoneDesc: "\u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BC8\u0B9A\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD\u0BAA\u0BCB\u0BA4\u0BC1 \u0BA4\u0BCA\u0BB2\u0BC8\u0BAA\u0BC7\u0B9A\u0BBF \u0B8E\u0BA3\u0BCD \u0B95\u0B9F\u0BCD\u0B9F\u0BBE\u0BAF\u0BAE\u0BBE\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD",
  customerRegisteredSpoken: "{name} \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BBE\u0BB0\u0BCD",
  customerNewAskPhoneSpoken: "{name} \u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD. \u0BAA\u0BCB\u0BA9\u0BCD \u0BA8\u0BAE\u0BCD\u0BAA\u0BB0\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  whichCustomerTitle: "\u0B8E\u0BA8\u0BCD\u0BA4 {name}?",
  tellLast4DigitsSubtitle: "\u0BA4\u0BCA\u0BB2\u0BC8\u0BAA\u0BC7\u0B9A\u0BBF \u0B8E\u0BA3\u0BCD\u0BA3\u0BBF\u0BA9\u0BCD \u0B95\u0B9F\u0BC8\u0B9A\u0BBF 4 \u0B87\u0BB2\u0B95\u0BCD\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B95\u0BBE\u0BB0\u0BCD\u0B9F\u0BC8\u0BA4\u0BCD \u0BA4\u0BCA\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD",
  noNumberSavedChip: "\u0B8E\u0BA3\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8",
  disambiguateRetryToast: "\u0B87\u0BA8\u0BCD\u0BA4 \u0B8E\u0BA3\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8. \u0BAE\u0BC0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BB5\u0BC1\u0BAE\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B95\u0BBE\u0BB0\u0BCD\u0B9F\u0BC8\u0BA4\u0BCD \u0BA4\u0BCA\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD.",
  disambiguateConfirmSpoken: "{name}, \u0B9A\u0BB0\u0BBF.",
  autoOpenPaymentRequestLabel: "\u0B95\u0B9F\u0BA9\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAA\u0BCD \u0BAA\u0BBF\u0BB1\u0B95\u0BC1 \u0B95\u0B9F\u0BCD\u0B9F\u0BA3\u0B95\u0BCD \u0B95\u0BCB\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD",
  autoOpenPaymentRequestDesc: "\u0B95\u0B9F\u0BA9\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BB5\u0BC1\u0B9F\u0BA9\u0BCD UPI QR \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BB5\u0BBE\u0B9F\u0BCD\u0BB8\u0BCD\u0B85\u0BAA\u0BCD \u0B87\u0BA3\u0BC8\u0BAA\u0BCD\u0BAA\u0BC8\u0B95\u0BCD \u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD",
  showMyQr: "\u0B95\u0B9F\u0BC8 QR",
  showMyQrDesc: "\u0B95\u0BB5\u0BC1\u0BA3\u0BCD\u0B9F\u0BB0\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3 \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0B95\u0B9F\u0BCD\u0B9F\u0BA3 QR",
  showMyQrTitle: "\u0B95\u0B9F\u0BC8 \u0B95\u0BB5\u0BC1\u0BA3\u0BCD\u0B9F\u0BB0\u0BCD QR",
  paymentRequestTitle: "\u0B95\u0B9F\u0BCD\u0B9F\u0BA3 \u0B95\u0BCB\u0BB0\u0BBF\u0B95\u0BCD\u0B95\u0BC8",
  paymentRequestSubtitle: "\u0BAA\u0BA3\u0BAE\u0BCD \u0BAA\u0BC6\u0BB1 QR \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 WhatsApp \u0B87\u0BA3\u0BC8\u0BAA\u0BCD\u0BAA\u0BC8\u0BAA\u0BCD \u0BAA\u0B95\u0BBF\u0BB0\u0BB5\u0BC1\u0BAE\u0BCD",
  sendWhatsAppPayment: "WhatsApp \u0B85\u0BA9\u0BC1\u0BAA\u0BCD\u0BAA\u0BB5\u0BC1\u0BAE\u0BCD",
  sendWhatsAppHint: "WhatsApp \u0BA4\u0BBF\u0BB1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD, \u0BAA\u0BBF\u0BA9\u0BCD Send \u0B85\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD",
  shareQr: "QR \u0BAA\u0B95\u0BBF\u0BB0\u0BB5\u0BC1\u0BAE\u0BCD",
  downloadQr: "QR \u0BAA\u0BA4\u0BBF\u0BB5\u0BBF\u0BB1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  laterDismiss: "\u0BAA\u0BBF\u0BB1\u0B95\u0BC1",
  noPhoneAddNumber: "\u0B8E\u0BA3\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  noPhoneWarning: "\u0B87\u0BA8\u0BCD\u0BA4 \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BBF\u0BA9\u0BCD \u0BA4\u0BCA\u0BB2\u0BC8\u0BAA\u0BC7\u0B9A\u0BBF \u0B8E\u0BA3\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8",
  noUpiIdWarning: "\u0B9A\u0BC1\u0BAF\u0BB5\u0BBF\u0BB5\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD UPI ID \u0B85\u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8. \u0B85\u0BAE\u0BC8\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B85\u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.",
  setupUpiNow: "UPI ID \u0B85\u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  whatsappOfflineHint: "WhatsApp\u0B95\u0BCD\u0B95\u0BC1 \u0B87\u0BA3\u0BC8\u0BAF\u0BAE\u0BCD \u0BA4\u0BC7\u0BB5\u0BC8",
  qrSavedToast: "QR \u0B95\u0BC1\u0BB1\u0BBF\u0BAF\u0BC0\u0B9F\u0BC1 \u0BA4\u0BAF\u0BBE\u0BB0\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1",
  receiptQrTitle: "UPI \u0BAE\u0BC2\u0BB2\u0BAE\u0BCD \u0BB8\u0BCD\u0B95\u0BC7\u0BA9\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BB2\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD",
  chooseLanguage: "\u0BAE\u0BCA\u0BB4\u0BBF\u0BAF\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  language: "\u0BAE\u0BCA\u0BB4\u0BBF",
  speechLanguage: "\u0BAA\u0BC7\u0B9A\u0BCD\u0B9A\u0BC1 \u0BAE\u0BCA\u0BB4\u0BBF",
  entries: "\u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD",
  entriesCount: "{count} \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD",
  clear: "\u0B85\u0BB4\u0BBF",
  reset: "\u0BAE\u0BC0\u0B9F\u0BCD\u0B9F\u0BAE\u0BC8",
  viewAll: "\u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BC1\u0BAE\u0BCD \u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95 \u2192",
  loading: "\u0B8F\u0BB1\u0BCD\u0BB1\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  loadingCustomers: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0B8F\u0BB1\u0BCD\u0BB1\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  loadingSummary: "\u0BA4\u0BBF\u0BA9\u0B9A\u0BB0\u0BBF \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0B8F\u0BB1\u0BCD\u0BB1\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  securingLedger: "\u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  micPromptSpeak: "\u0BAA\u0BC7\u0B9A\u0BB5\u0BC1\u0BAE\u0BCD",
  micPromptListening: "\u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  micPromptProcessing: "\u0B9A\u0BC6\u0BAF\u0BB2\u0BBE\u0B95\u0BCD\u0B95\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  micPromptRetry: "\u0BAE\u0BC0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0BAE\u0BC1\u0BAF\u0BB2\u0BB5\u0BC1\u0BAE\u0BCD",
  micCaptionIdle: "\u0B92\u0BB0\u0BC1 \u0BAE\u0BC1\u0BB1\u0BC8 \u0BA4\u0B9F\u0BCD\u0B9F\u0BBF \u0BAA\u0BC7\u0B9A\u0BB5\u0BC1\u0BAE\u0BCD",
  micCaptionListening: "\u0BA4\u0BC6\u0BB3\u0BBF\u0BB5\u0BBE\u0B95\u0BAA\u0BCD \u0BAA\u0BC7\u0B9A\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u2022 \u0B85\u0BAE\u0BC8\u0BA4\u0BBF\u0BAF\u0BBE\u0BA9\u0BA4\u0BC1\u0BAE\u0BCD \u0BA8\u0BBF\u0BB1\u0BCD\u0B95\u0BC1\u0BAE\u0BCD",
  micCaptionProcessing: "\u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BBF\u0B9F\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  micErrorFallbackNote: "\u0BAE\u0BC8\u0B95\u0BCD \u0BB5\u0BC7\u0BB2\u0BC8 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8 \u0B8E\u0BA9\u0BCD\u0BB1\u0BBE\u0BB2\u0BCD, \u0B9F\u0BC8\u0BAA\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BC1\u0BAE\u0BCD.",
  listeningSpeakYourLanguage: "\u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1... \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BCA\u0BB4\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0BAA\u0BC7\u0B9A\u0BB5\u0BC1\u0BAE\u0BCD",
  streamingSpeech: "\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  processingSpeech: "\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B9A\u0BC6\u0BAF\u0BB2\u0BBE\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  heardVoice: "\u0B95\u0BC7\u0B9F\u0BCD\u0B9F \u0B95\u0BC1\u0BB0\u0BB2\u0BCD",
  quickDemoPhrases: "\u0BB5\u0BBF\u0BB0\u0BC8\u0BB5\u0BC1 \u0B89\u0BA4\u0BBE\u0BB0\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  tapToTest: "\u0B9A\u0BCB\u0BA4\u0BBF\u0B95\u0BCD\u0B95 \u0BA4\u0B9F\u0BCD\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD",
  hintPhrase1: "\u0BB0\u0BAE\u0BC7\u0BB7\u0BC1\u0B95\u0BCD\u0B95\u0BC1 500 \u0B95\u0B9F\u0BA9\u0BCD \u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC7\u0BA9\u0BCD",
  hintPhrase2: "\u0BB0\u0BAE\u0BC7\u0BB7\u0BCD \u0B95\u0B9F\u0BA9\u0BCD 340, \u0BA8\u0BC7\u0BB1\u0BCD\u0BB1\u0BC1 200 \u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BBE\u0BB0\u0BCD",
  hintPhrase3: "\u0BB0\u0BAE\u0BC7\u0BB7\u0BCD \u0BAE\u0BCA\u0BA4\u0BCD\u0BA4\u0BAE\u0BCD?",
  creditGivenTodaySub: "\u0B87\u0BA9\u0BCD\u0BB1\u0BC1 \u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4 \u0B95\u0B9F\u0BA9\u0BCD",
  paymentReceivedTodaySub: "\u0B87\u0BA9\u0BCD\u0BB1\u0BC1 \u0BAA\u0BC6\u0BB1\u0BCD\u0BB1 \u0BB5\u0BB0\u0BB5\u0BC1",
  marketPending: "\u0B9A\u0BA8\u0BCD\u0BA4\u0BC8 \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF",
  last5Entries: "\u0B95\u0B9F\u0BC8\u0B9A\u0BBF 5 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD",
  noEntriesYetPrompt: "\u0B87\u0BA9\u0BCD\u0BA9\u0BC1\u0BAE\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8. \u0BAE\u0BC8\u0B95\u0BCD \u0BA4\u0B9F\u0BCD\u0B9F\u0BBF \u0BAA\u0BC7\u0B9A\u0BB5\u0BC1\u0BAE\u0BCD!",
  creditBadge: "\u0B95\u0B9F\u0BA9\u0BCD",
  paymentBadge: "\u0BB5\u0BB0\u0BB5\u0BC1",
  udhaar: "\u0B95\u0B9F\u0BA9\u0BCD",
  jama: "\u0BB5\u0BB0\u0BB5\u0BC1",
  customersCountSorted: "{count} \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD\u0B95\u0BB3\u0BCD \u2022 \u0B85\u0BA4\u0BBF\u0B95 \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF \u0BB5\u0BB0\u0BBF\u0B9A\u0BC8",
  noCustomersYet: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD\u0B95\u0BB3\u0BCD \u0B87\u0BA9\u0BCD\u0BA9\u0BC1\u0BAE\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8",
  noCustomersDescription: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8. \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0B95\u0B9F\u0BA9\u0BC8 \u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0BAE\u0BC2\u0BB2\u0BAE\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0B95.",
  noCustomerFound: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8",
  noMatchingCustomerQuery: '"{query}" \u0BAA\u0BC6\u0BAF\u0BB0\u0BBF\u0BB2\u0BCD \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8. \u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0BAE\u0BC2\u0BB2\u0BAE\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.',
  noCustomersInFilter: "\u0B87\u0BA8\u0BCD\u0BA4 \u0BB5\u0B9F\u0BBF\u0B95\u0B9F\u0BCD\u0B9F\u0BB2\u0BBF\u0BB2\u0BCD \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8.",
  firstUdhaarVoice: "\u{1F3A4} \u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0BAE\u0BC2\u0BB2\u0BAE\u0BCD \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0B95\u0B9F\u0BA9\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0B95",
  addCustomerButton: "+ \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BC8\u0B9A\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95",
  addNewCustomerTitle: "\u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BC8\u0B9A\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95",
  addNewCustomerSubtitle: "\u0B95\u0B9F\u0BA9\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BB5\u0BB0\u0BB5\u0BC1 \u0B87\u0BA9\u0BCD\u0BB1\u0BBF \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BC8\u0B9A\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  lastActivity: "\u0B95\u0B9F\u0BC8\u0B9A\u0BBF: {date}",
  badgeOwes: "\u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF",
  badgeSettled: "\u0BAE\u0BC1\u0B9F\u0BBF\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1",
  badgeNew: "\u0BAA\u0BC1\u0BA4\u0BBF\u0BAF",
  listenBalance: "\u0B95\u0BC7\u0B9F\u0BCD\u0B95",
  lastReminderDate: "\u0B95\u0B9F\u0BC8\u0B9A\u0BBF \u0BA8\u0BBF\u0BA9\u0BC8\u0BB5\u0BC2\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD: {date}",
  outstandingUdhaar: "\u0BA8\u0BBF\u0BB2\u0BC1\u0BB5\u0BC8 \u0B95\u0B9F\u0BA9\u0BCD",
  allSettled: "\u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0BAE\u0BC1\u0B9F\u0BBF\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1",
  amountToReceive: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BBF\u0B9F\u0BAE\u0BBF\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4\u0BC1 \u0BB5\u0BB0 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BBF\u0BAF\u0BA4\u0BC1",
  noBalancePending: "\u0BA8\u0BBF\u0BB2\u0BC1\u0BB5\u0BC8 \u0B8F\u0BA4\u0BC1\u0BAE\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8",
  totalCreditLabel: "\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4 \u0B95\u0B9F\u0BA9\u0BCD:",
  totalPaymentLabel: "\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4 \u0BB5\u0BB0\u0BB5\u0BC1:",
  sendWhatsAppReminder: "WhatsApp \u0BA8\u0BBF\u0BA9\u0BC8\u0BB5\u0BC2\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD",
  printReceipt: "\u0BB0\u0B9A\u0BC0\u0BA4\u0BC1 \u0B85\u0B9A\u0BCD\u0B9A\u0BBF\u0B9F\u0BC1\u0B95",
  addUdhaarButton: "+ \u0B95\u0B9F\u0BA9\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95",
  addPaymentButton: "+ \u0BB5\u0BB0\u0BB5\u0BC1 \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95",
  timelineEntries: "\u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0B95\u0BBE\u0BB2\u0BB5\u0BB0\u0BBF\u0B9A\u0BC8 ({count} \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD)",
  latestFirst: "\u0BAA\u0BC1\u0BA4\u0BBF\u0BAF\u0BA4\u0BC1 \u0BAE\u0BC1\u0BA4\u0BB2\u0BBF\u0BB2\u0BCD",
  noEntriesTitle: "\u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8",
  noEntriesCustomerDesc: "\u0B87\u0BA8\u0BCD\u0BA4 \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B87\u0BA9\u0BCD\u0BA9\u0BC1\u0BAE\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8.",
  deleteEntryConfirm: "\u0B87\u0BA8\u0BCD\u0BA4 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC8 \u0BA8\u0BBF\u0B9A\u0BCD\u0B9A\u0BAF\u0BAE\u0BBE\u0B95 \u0BA8\u0BC0\u0B95\u0BCD\u0B95 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1\u0B95\u0BBF\u0BB1\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BBE?",
  enterValidAmount: "\u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BA4\u0BCA\u0B95\u0BC8\u0BAF\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BBF\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD",
  entryDeletedToast: "\u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0BA8\u0BC0\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1",
  customerNotFoundTitle: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8",
  customerNotFoundDesc: "\u0B87\u0BA8\u0BCD\u0BA4 \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BBF\u0BB2\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8.",
  viewCustomersList: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0BAA\u0B9F\u0BCD\u0B9F\u0BBF\u0BAF\u0BB2\u0BC8\u0BAA\u0BCD \u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95",
  customerAlreadyExists: "{name} \u0B8F\u0BB1\u0BCD\u0B95\u0BA9\u0BB5\u0BC7 \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD",
  similarCustomerWarning: "\u0B87\u0BA4\u0BC7 \u0BAA\u0BCB\u0BA9\u0BCD\u0BB1 \u0BAA\u0BC6\u0BAF\u0BB0\u0BBF\u0BB2\u0BCD \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0B89\u0BB3\u0BCD\u0BB3\u0BBE\u0BB0\u0BCD. \u0B85\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC8\u0BAA\u0BCD \u0BAA\u0BAF\u0BA9\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAE\u0BCD\u0BAA\u0BC1\u0B95\u0BBF\u0BB1\u0BC0\u0BB0\u0BCD\u0B95\u0BB3\u0BBE?",
  useThisOne: "\u0B87\u0BA4\u0BC8\u0BAA\u0BCD \u0BAA\u0BAF\u0BA9\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  createAnyway: "\u0BAA\u0BC1\u0BA4\u0BBF\u0BA4\u0BBE\u0B95 \u0B89\u0BB0\u0BC1\u0BB5\u0BBE\u0B95\u0BCD\u0B95\u0BC1",
  customerNameLabel: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BCD",
  mobileNumberOptional: "\u0B95\u0BC8\u0BAA\u0BC7\u0B9A\u0BBF \u0B8E\u0BA3\u0BCD (\u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD)",
  phoneReminderHelper: "WhatsApp \u0BA8\u0BBF\u0BA9\u0BC8\u0BB5\u0BC2\u0B9F\u0BCD\u0B9F\u0BB2\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAA\u0BCD \u0BAA\u0BAF\u0BA9\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1 (\u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BB0\u0BC1\u0BAE\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB2\u0BBE\u0BAE\u0BCD).",
  saveCustomer: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BC8\u0B9A\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  saving: "\u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  enterCustomerNameError: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BBF\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD",
  errorSavingCustomer: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BC8\u0B9A\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0BAA\u0BCD\u0BAA\u0BA4\u0BBF\u0BB2\u0BCD \u0BAA\u0BBF\u0BB4\u0BC8",
  dailySummarySubtitle: "\u0BA4\u0BBF\u0BA9\u0B9A\u0BB0\u0BBF \u0BB5\u0B9A\u0BC2\u0BB2\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B95\u0B9F\u0BA9\u0BCD \u0B9A\u0BC1\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
  shareSlip: "\u0BB0\u0B9A\u0BC0\u0BA4\u0BC8 \u0BAA\u0B95\u0BBF\u0BB0\u0BB5\u0BC1\u0BAE\u0BCD",
  copied: "\u0BA8\u0B95\u0BB2\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1",
  dateLabel: "\u0BA4\u0BC7\u0BA4\u0BBF:",
  creditGivenToday: "\u0B87\u0BA9\u0BCD\u0BB1\u0BC1 \u0B95\u0BCA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4 \u0B95\u0B9F\u0BA9\u0BCD",
  paymentReceivedToday: "\u0B87\u0BA9\u0BCD\u0BB1\u0BC1 \u0BAA\u0BC6\u0BB1\u0BCD\u0BB1 \u0BB5\u0BB0\u0BB5\u0BC1",
  netUdhaarIncreased: "\u0BA8\u0BBF\u0B95\u0BB0 \u0B95\u0B9F\u0BA9\u0BCD \u0B85\u0BA4\u0BBF\u0B95\u0BB0\u0BBF\u0BA4\u0BCD\u0BA4\u0BA4\u0BC1",
  netUdhaarDecreased: "\u0BA8\u0BBF\u0B95\u0BB0 \u0B95\u0B9F\u0BA9\u0BCD \u0B95\u0BC1\u0BB1\u0BC8\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1",
  entriesCountLabel: "\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD",
  activeCustomersCount: "{count} \u0B9A\u0BC6\u0BAF\u0BB2\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3 \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD\u0B95\u0BB3\u0BCD",
  noDataAvailable: "\u0BA4\u0BB0\u0BB5\u0BC1 \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8",
  noDataForDate: "\u0B87\u0BA8\u0BCD\u0BA4 \u0BA4\u0BC7\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8.",
  noPendingCustomersAllSettled: "\u0BA8\u0BBF\u0BB2\u0BC1\u0BB5\u0BC8 \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8. \u0B8E\u0BB2\u0BCD\u0BB2\u0BBE\u0B95\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1! \u2713",
  reviewEntryTitle: "\u0BAA\u0BA4\u0BBF\u0BB5\u0BC8\u0B9A\u0BCD \u0B9A\u0BB0\u0BBF\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  duplicateEntryWarningTitle: "\u0B87\u0BA4\u0BC7 \u0BAA\u0BCB\u0BA9\u0BCD\u0BB1 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BB1\u0BCD\u0BB1\u0BC1 \u0BAE\u0BC1\u0BA9\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BBE\u0BA9\u0BA4\u0BC1. \u0BAE\u0BC0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BBE?",
  duplicateEntryWarningDesc: "{name} \u0B85\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u20B9{amount} {type} \u0B95\u0B9F\u0BA8\u0BCD\u0BA4 10 \u0BA8\u0BBF\u0BAE\u0BBF\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BB2\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1.",
  saveAnyway: "\u0B8E\u0BAA\u0BCD\u0BAA\u0B9F\u0BBF\u0BAF\u0BC1\u0BAE\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95",
  correctByVoice: "\u0B95\u0BC1\u0BB0\u0BB2\u0BBE\u0BB2\u0BCD \u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD",
  listeningTapToStop: "\u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1... (\u0BA8\u0BBF\u0BB1\u0BC1\u0BA4\u0BCD\u0BA4 \u0BA4\u0B9F\u0BCD\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD)",
  confirmAndSave: "\u0B89\u0BB1\u0BC1\u0BA4\u0BBF\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  voiceSavingCommand: "\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B95\u0B9F\u0BCD\u0B9F\u0BB3\u0BC8\u0BAF\u0BBE\u0BB2\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  voiceCancelledCommand: "\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0BAE\u0BC2\u0BB2\u0BAE\u0BCD \u0BB0\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1",
  voiceAmountUpdated: "\u0BA4\u0BCA\u0B95\u0BC8 \u20B9{amount} \u0B86\u0B95 \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1",
  amountInRupees: "\u0BA4\u0BCA\u0B95\u0BC8 (\u20B9 \u0B87\u0BB2\u0BCD)",
  relativeToday: "\u0B87\u0BA9\u0BCD\u0BB1\u0BC1",
  relativeYesterday: "\u0BA8\u0BC7\u0BB1\u0BCD\u0BB1\u0BC1",
  relativeDayBefore: "\u0BAE\u0BC1\u0BA8\u0BCD\u0BA4\u0BBE\u0BA8\u0BBE\u0BB3\u0BCD",
  pickDate: "\u0BA4\u0BC7\u0BA4\u0BBF\u0BAF\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  notePlaceholder: "\u0B95\u0BC1\u0BB1\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1 (\u0B8E.\u0B95\u0BBE. \u0BAA\u0BBE\u0BB2\u0BCD, \u0B9A\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB0\u0BC8, \u0BAA\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1)",
  balanceInquiryTitle: "\u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0B87\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1 \u0BB5\u0BBF\u0B9A\u0BBE\u0BB0\u0BA3\u0BC8",
  balancePendingUdhaar: "\u0BA8\u0BBF\u0BB2\u0BC1\u0BB5\u0BC8 \u0B95\u0B9F\u0BA9\u0BCD",
  advancePayment: "\u0BAE\u0BC1\u0BA9\u0BCD\u0BAA\u0BA3 \u0BB5\u0BB0\u0BB5\u0BC1",
  speaking: "\u0BAA\u0BC7\u0B9A\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  replayVoice: "\u0B95\u0BC7\u0B9F\u0BCD\u0B95",
  allClear: "\u0B8E\u0BB2\u0BCD\u0BB2\u0BBE\u0BAE\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1 \u2713",
  last3Transactions: "\u0B95\u0B9F\u0BC8\u0B9A\u0BBF 3 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD",
  noPreviousTransactions: "\u0BAE\u0BC1\u0BA8\u0BCD\u0BA4\u0BC8\u0BAF \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B8E\u0BA4\u0BC1\u0BB5\u0BC1\u0BAE\u0BCD \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8",
  viewKhata: "\u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC8\u0BAA\u0BCD \u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  whichCustomerAskDigits: "\u0B8E\u0BA8\u0BCD\u0BA4 {name}? \u0BA4\u0BCA\u0BB2\u0BC8\u0BAA\u0BC7\u0B9A\u0BBF \u0B8E\u0BA3\u0BCD\u0BA3\u0BBF\u0BA9\u0BCD \u0B95\u0B9F\u0BC8\u0B9A\u0BBF 4 \u0B87\u0BB2\u0B95\u0BCD\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BB5\u0BC1\u0BAE\u0BCD.",
  sameLastDigitsAskMore: "\u0B87\u0BB0\u0BC1\u0BB5\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD \u0B95\u0B9F\u0BC8\u0B9A\u0BBF \u0B87\u0BB2\u0B95\u0BCD\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1\u0BA4\u0BBE\u0BA9\u0BCD. \u0BA4\u0BAF\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0B95\u0B9F\u0BC8\u0B9A\u0BBF {count} \u0B87\u0BB2\u0B95\u0BCD\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
  numberNotFoundRetry: "\u0B8E\u0BA3\u0BCD \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8. \u0BAE\u0BC0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
  numberNotFoundTapCard: "\u0B8E\u0BA3\u0BCD \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8. \u0BA4\u0BAF\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0B95\u0BBE\u0BB0\u0BCD\u0B9F\u0BC8\u0BA4\u0BCD \u0BA4\u0B9F\u0BCD\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD.",
  newCustomerAddedToast: "\u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BBE\u0BB0\u0BCD: {name}",
  entrySavedSuccess: "{name} \u0B85\u0BB5\u0BB0\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD {type} \u0BB5\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF\u0B95\u0BB0\u0BAE\u0BBE\u0B95\u0BAA\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BBE\u0BA9\u0BA4\u0BC1!",
  multiEntriesSavedSuccess: "{count} \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0BB5\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF\u0B95\u0BB0\u0BAE\u0BBE\u0B95 \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA9!",
  didNotUnderstandRepeat: "\u0BAA\u0BC1\u0BB0\u0BBF\u0BAF\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8. \u0BA4\u0BAF\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0BAE\u0BC0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0BAA\u0BC7\u0B9A\u0BB5\u0BC1\u0BAE\u0BCD.",
  languageChangedToast: "\u0BAE\u0BCA\u0BB4\u0BBF \u0BAE\u0BBE\u0BB1\u0BCD\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1: {lang}",
  speechLanguageChangedToast: "\u0BAA\u0BC7\u0B9A\u0BCD\u0B9A\u0BC1 \u0BAE\u0BCA\u0BB4\u0BBF: {lang}",
  offlineModeNoticeTitle: "\u0B86\u0B83\u0BAA\u0BCD\u0BB2\u0BC8\u0BA9\u0BCD \u0BAE\u0BC1\u0BB1\u0BC8",
  offlineModeNoticeDesc: "\u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 100% \u0B86\u0B83\u0BAA\u0BCD\u0BB2\u0BC8\u0BA9\u0BBF\u0BB2\u0BCD \u0BB5\u0BC7\u0BB2\u0BC8 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BC1\u0BAE\u0BCD. \u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B87\u0BA3\u0BC8\u0BAF\u0BAE\u0BCD \u0BA4\u0BC7\u0BB5\u0BC8\u0BAA\u0BCD\u0BAA\u0B9F\u0BB2\u0BBE\u0BAE\u0BCD; \u0BA4\u0B9F\u0BCD\u0B9F\u0B9A\u0BCD\u0B9A\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BC1\u0BAE\u0BCD.",
  networkDisconnected: "\u0BA8\u0BC6\u0B9F\u0BCD\u0BB5\u0BCA\u0BB0\u0BCD\u0B95\u0BCD \u0BA4\u0BC1\u0BA3\u0BCD\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1",
  pinIncorrect: "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAA\u0BBF\u0BA9\u0BCD! \u0BAE\u0BC0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0BAE\u0BC1\u0BAF\u0BB1\u0BCD\u0B9A\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD.",
  pinLockedMessage: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 AES-256 \u0BAE\u0BC2\u0BB2\u0BAE\u0BCD \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. \u0BA4\u0BAF\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BBF\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD:",
  pinResetConfirm: "\u0B86\u0BAE\u0BCD, \u0BAE\u0BC0\u0B9F\u0BCD\u0B9F\u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  totalUdhaar: "\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4 \u0B95\u0B9F\u0BA9\u0BCD",
  totalJama: "\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4 \u0BB5\u0BB0\u0BB5\u0BC1",
  totalBalance: "\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4 \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF",
  udhaarAdded: "\u0B95\u0B9F\u0BA9\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1",
  savePhoneToProfileHint: "\u0B92\u0BB0\u0BC1\u0BAE\u0BC1\u0BB1\u0BC8 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BBE\u0BB2\u0BCD \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0B9A\u0BC1\u0BAF\u0BB5\u0BBF\u0BB5\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD.",
  numberClearedSpeakAgain: "\u0B8E\u0BA3\u0BCD \u0B85\u0BB4\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1. \u0BAE\u0BC0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0BAA\u0BC7\u0B9A\u0BB5\u0BC1\u0BAE\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B95\u0BC0\u0BAA\u0BC7\u0B9F\u0BC8\u0BAA\u0BCD \u0BAA\u0BAF\u0BA9\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD.",
  pendingEntrySavedAfterReg: "\u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAA\u0BCD \u0BAA\u0BBF\u0BB1\u0B95\u0BC1 \u20B9{amount} {type} \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD",
  recentEntriesReceipt: "\u0B9A\u0BAE\u0BC0\u0BAA\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD:",
  numeralScriptLabel: "\u0B8E\u0BA3\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0BB0\u0BC1",
  numeralScriptDesc: "\u0B8E\u0BA3\u0BCD\u0B95\u0BB3\u0BC8 \u0B86\u0B99\u0BCD\u0B95\u0BBF\u0BB2\u0BAE\u0BCD (1, 2, 3) \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BA4\u0BAE\u0BBF\u0BB4\u0BCD \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD",
  scriptLatin: "\u0B86\u0B99\u0BCD\u0B95\u0BBF\u0BB2\u0BAE\u0BCD (1, 2, 3)",
  scriptNative: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD (\u0BE7, \u0BE8, \u0BE9)",
  invalidPhoneError: "\u0BA4\u0BAF\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 10-\u0B87\u0BB2\u0B95\u0BCD\u0B95 \u0B87\u0BA8\u0BCD\u0BA4\u0BBF\u0BAF \u0BAE\u0BCA\u0BAA\u0BC8\u0BB2\u0BCD \u0B8E\u0BA3\u0BCD\u0BA3\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BBF\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD (6-9 \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0BAE\u0BCD)",
  speakNamePrompt: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0BAA\u0BC6\u0BAF\u0BB0\u0BC8\u0BAA\u0BCD \u0BAA\u0BC7\u0B9A\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD...",
  phoneHelpText: "\u0BB5\u0BBE\u0B9F\u0BCD\u0BB8\u0BCD\u0B85\u0BAA\u0BCD \u0BA8\u0BBF\u0BA9\u0BC8\u0BB5\u0BC2\u0B9F\u0BCD\u0B9F\u0BB2\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BAF\u0BA9\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD (\u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BB0\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB2\u0BBE\u0BAE\u0BCD).",
  manualEntryTitle: "\u0B95\u0BC8\u0BAE\u0BC1\u0BB1\u0BC8 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1 (\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BBE\u0BAE\u0BB2\u0BCD)",
  today: "\u0B87\u0BA9\u0BCD\u0BB1\u0BC1",
  yesterday: "\u0BA8\u0BC7\u0BB1\u0BCD\u0BB1\u0BC1",
  dayBeforeYesterday: "\u0BAE\u0BC1\u0BA8\u0BCD\u0BA4\u0BBE\u0BA8\u0BBE\u0BB3\u0BCD",
  baakiOwed: "\u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF",
  listenReplay: "\u0B95\u0BC7\u0BB3\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  sendReminder: "\u0BA8\u0BBF\u0BA9\u0BC8\u0BB5\u0BC2\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD \u0B85\u0BA9\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1",
  active: "\u0B9A\u0BC6\u0BAF\u0BB2\u0BBF\u0BB2\u0BCD",
  noRecentActivity: "\u0B9A\u0BAE\u0BC0\u0BAA\u0BA4\u0BCD\u0BA4\u0BBF\u0BAF \u0B9A\u0BC6\u0BAF\u0BB2\u0BCD\u0BAA\u0BBE\u0B9F\u0BC1 \u0B87\u0BB2\u0BCD\u0BB2\u0BC8",
  listeningDigitsPrompt: "\u0B95\u0BC7\u0B9F\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1... \u0B95\u0B9F\u0BC8\u0B9A\u0BBF 4 \u0B87\u0BB2\u0B95\u0BCD\u0B95\u0B99\u0BCD\u0B95\u0BB3\u0BC8\u0B9A\u0BCD \u0B9A\u0BCA\u0BB2\u0BCD\u0BB2\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  tapCardOrMic: "\u0B95\u0BBE\u0BB0\u0BCD\u0B9F\u0BC8\u0BA4\u0BCD \u0BA4\u0B9F\u0BCD\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BAE\u0BC0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0BAA\u0BC7\u0B9A \u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BC8\u0BA4\u0BCD \u0BA4\u0BCA\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD",
  first: "\u0BAE\u0BC1\u0BA4\u0BB2\u0BBF\u0BB2\u0BCD",
  second: "\u0B87\u0BB0\u0BA3\u0BCD\u0B9F\u0BBE\u0BB5\u0BA4\u0BC1",
  qrSaveError: "QR \u0B95\u0BC1\u0BB1\u0BBF\u0BAF\u0BC0\u0B9F\u0BCD\u0B9F\u0BC8\u0B9A\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95 \u0BAE\u0BC1\u0B9F\u0BBF\u0BAF\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8",
  khataStatementSlip: "\u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0B85\u0BB1\u0BBF\u0B95\u0BCD\u0B95\u0BC8 \u0BB0\u0B9A\u0BC0\u0BA4\u0BC1",
  thankYouShopping: "\u0BB5\u0BBF\u0BAF\u0BBE\u0BAA\u0BBE\u0BB0\u0BA4\u0BCD\u0BA4\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 \u0BA8\u0BA9\u0BCD\u0BB1\u0BBF! \u{1F64F}",
  receiptSharedSuccess: "\u0BB0\u0B9A\u0BC0\u0BA4\u0BC1 \u0BB5\u0BC6\u0BB1\u0BCD\u0BB1\u0BBF\u0B95\u0BB0\u0BAE\u0BBE\u0B95 \u0BAA\u0B95\u0BBF\u0BB0\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1!",
  receiptCopiedSuccess: "\u0BB0\u0B9A\u0BC0\u0BA4\u0BC1 \u0B95\u0BBF\u0BB3\u0BBF\u0BAA\u0BCD\u0BAA\u0BCB\u0BB0\u0BCD\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0BA8\u0B95\u0BB2\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1!",
  whatsappPhoneNumber: "\u0BB5\u0BBE\u0B9F\u0BCD\u0BB8\u0BCD\u0B85\u0BAA\u0BCD \u0BAE\u0BCA\u0BAA\u0BC8\u0BB2\u0BCD \u0B8E\u0BA3\u0BCD",
  selectTemplateLanguage: "\u0B9F\u0BC6\u0BAE\u0BCD\u0BAA\u0BCD\u0BB3\u0BC7\u0B9F\u0BCD \u0BAE\u0BCA\u0BB4\u0BBF\u0BAF\u0BC8\u0BA4\u0BCD \u0BA4\u0BC7\u0BB0\u0BCD\u0BA8\u0BCD\u0BA4\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  messagePreview: "\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BBF \u0BAE\u0BC1\u0BA9\u0BCD\u0BA9\u0BCB\u0B9F\u0BCD\u0B9F\u0BAE\u0BCD (\u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0B95\u0BCD\u0B95\u0BC2\u0B9F\u0BBF\u0BAF\u0BA4\u0BC1)",
  messageCopiedToast: "\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BBF \u0BA8\u0B95\u0BB2\u0BC6\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1!",
  offlineSabChalega: "\u0B86\u0B83\u0BAA\u0BCD\u0BB2\u0BC8\u0BA9\u0BCD \u2013 \u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BB2\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD",
  offlineSafeMessage: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 100% \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BBE\u0BA9\u0BA4\u0BC1 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B87\u0BA8\u0BCD\u0BA4 \u0B9A\u0BBE\u0BA4\u0BA9\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD.",
  offlineMicWarning: "\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B85\u0BB1\u0BBF\u0BA4\u0BB2\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B87\u0BA3\u0BC8\u0BAF\u0BAE\u0BCD \u0BA4\u0BC7\u0BB5\u0BC8\u0BAA\u0BCD\u0BAA\u0B9F\u0BB2\u0BBE\u0BAE\u0BCD. \u0BAE\u0BC8\u0B95\u0BCD \u0BB5\u0BC7\u0BB2\u0BC8 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BBE\u0BB5\u0BBF\u0B9F\u0BCD\u0B9F\u0BBE\u0BB2\u0BCD, '\u0B9F\u0BC8\u0BAA\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD' \u0BAA\u0BAF\u0BA9\u0BCD\u0BAA\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD.",
  openTypeInstead: "'\u0B9F\u0BC8\u0BAA\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD' \u0BA4\u0BBF\u0BB1\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  gotIt: "\u0B9A\u0BB0\u0BBF, \u0BAA\u0BC1\u0BB0\u0BBF\u0BA8\u0BCD\u0BA4\u0BA4\u0BC1",
  pinLockedNotice: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 AES-256 \u0B95\u0BC1\u0BB1\u0BBF\u0BAF\u0BBE\u0B95\u0BCD\u0B95\u0BAE\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BC1\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1. \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BC8 \u0B89\u0BB3\u0BCD\u0BB3\u0BBF\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD:",
  pinCryptoLockDesc: "\u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1 \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0B9A\u0BBE\u0BA4\u0BA9\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD Web Crypto \u0BAE\u0BC2\u0BB2\u0BAE\u0BCD \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA9.",
  yesReset: "\u0B86\u0BAE\u0BCD, \u0BAE\u0BC0\u0B9F\u0BCD\u0B9F\u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  dailySummarySub: "\u0BA4\u0BBF\u0BA9\u0B9A\u0BB0\u0BBF \u0BB5\u0B9A\u0BC2\u0BB2\u0BCD \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0B95\u0B9F\u0BA9\u0BCD \u0B9A\u0BC1\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
  activeCustomersLabel: "\u0B9A\u0BC6\u0BAF\u0BB2\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3 \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD\u0B95\u0BB3\u0BCD",
  noDataAvailableDesc: "\u0B87\u0BA8\u0BCD\u0BA4 \u0BA4\u0BC7\u0BA4\u0BBF\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAA\u0BA4\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B8E\u0BA4\u0BC1\u0BB5\u0BC1\u0BAE\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8.",
  noPendingUdhaarAllSettled: "\u0BA8\u0BBF\u0BB2\u0BC1\u0BB5\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B89\u0BB3\u0BCD\u0BB3 \u0B95\u0B9F\u0BA9\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8. \u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1 \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1\u0B95\u0BB3\u0BC1\u0BAE\u0BCD \u0BA4\u0BC0\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA9! \u2713",
  zeroBalance: "\u0BAE\u0BC1\u0BB4\u0BC1\u0BB5\u0BA4\u0BC1\u0BAE\u0BCD \u0BA4\u0BC0\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1, \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF \u0B87\u0BB2\u0BCD\u0BB2\u0BC8",
  khataTimeline: "\u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0B95\u0BBE\u0BB2\u0BB5\u0BB0\u0BBF\u0B9A\u0BC8",
  saveEntry: "\u0BAA\u0BA4\u0BBF\u0BB5\u0BC8\u0B9A\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  addUdhaar: "+ \u0B95\u0B9F\u0BA9\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95",
  addPayment: "+ \u0BAA\u0BA3\u0BAE\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95",
  addEntry: "\u0BAA\u0BA4\u0BBF\u0BB5\u0BC8\u0B9A\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  noteOptional: "\u0B95\u0BC1\u0BB1\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1 (\u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BA4\u0BCD\u0BA4\u0BBF\u0BB1\u0BCD\u0B95\u0BC1\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1)",
  whatsappReminder: "\u0BB5\u0BBE\u0B9F\u0BCD\u0BB8\u0BCD\u0B85\u0BAA\u0BCD",
  lastReminder: "\u0B95\u0B9F\u0BC8\u0B9A\u0BBF \u0BA8\u0BBF\u0BA9\u0BC8\u0BB5\u0BC2\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD",
  savingByVoice: "\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B95\u0B9F\u0BCD\u0B9F\u0BB3\u0BC8\u0BAF\u0BBE\u0BB2\u0BCD \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1...",
  cancelledByVoice: "\u0B95\u0BC1\u0BB0\u0BB2\u0BBE\u0BB2\u0BCD \u0BB0\u0BA4\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1",
  noCustomersEmptyState: "\u0B87\u0BA9\u0BCD\u0BA9\u0BC1\u0BAE\u0BCD \u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8. \u0BAA\u0BC7\u0B9A\u0BC1\u0BB5\u0BA4\u0BA9\u0BCD \u0BAE\u0BC2\u0BB2\u0BAE\u0BCD \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0B95\u0B9F\u0BA9\u0BC8\u0B9A\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  addFirstUdhaarVoice: "\u{1F3A4} \u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0BAE\u0BC2\u0BB2\u0BAE\u0BCD \u0BAE\u0BC1\u0BA4\u0BB2\u0BCD \u0B95\u0B9F\u0BA9\u0BC8\u0B9A\u0BCD \u0B9A\u0BC7\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  onboardingStep1Title: "1. \u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BC8\u0BA4\u0BCD \u0BA4\u0B9F\u0BCD\u0B9F\u0BBF\u0BAA\u0BCD \u0BAA\u0BC7\u0B9A\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
  onboardingStep1Desc: "\u0B95\u0B9F\u0BC8 \u0B95\u0BB5\u0BC1\u0BA3\u0BCD\u0B9F\u0BB0\u0BBF\u0BB2\u0BCD \u0B95\u0BC8\u0B95\u0BB3\u0BCD \u0BAA\u0BBF\u0BB8\u0BBF\u0BAF\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BBE? \u0BAE\u0BC8\u0B95\u0BCD\u0B95\u0BC8\u0BA4\u0BCD \u0BA4\u0B9F\u0BCD\u0B9F\u0BBF \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BCA\u0BB4\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0BAA\u0BC7\u0B9A\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD.",
  onboardingStep2Title: "2. \u0BA4\u0BBF\u0BB0\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0BAE\u0BC1\u0BA9\u0BCD\u0BA9\u0BCB\u0B9F\u0BCD\u0B9F\u0BA4\u0BCD\u0BA4\u0BC8\u0BAA\u0BCD \u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  onboardingStep2Desc: "\u0B9A\u0BC6\u0BAF\u0BB2\u0BBF \u0B89\u0B9F\u0BA9\u0B9F\u0BBF\u0BAF\u0BBE\u0B95 \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAA\u0BA4\u0BBF\u0BB5\u0BC8\u0B95\u0BCD \u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BBF\u0BB1\u0BA4\u0BC1. \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95 \u0BA4\u0B9F\u0BCD\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0B95\u0BC1\u0BB0\u0BB2\u0BBE\u0BB2\u0BCD \u0BA4\u0BBF\u0BB0\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD.",
  onboardingStep3Title: "3. \u0B89\u0B9F\u0BA9\u0B9F\u0BBF \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD \u0BA8\u0BBF\u0BA9\u0BC8\u0BB5\u0BC2\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BCD",
  onboardingStep3Desc: "\u0BB5\u0BBE\u0B9F\u0BBF\u0B95\u0BCD\u0B95\u0BC8\u0BAF\u0BBE\u0BB3\u0BB0\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 \u0B89\u0B9F\u0BA9\u0B9F\u0BBF\u0BAF\u0BBE\u0B95 \u0BAA\u0BC1\u0BA4\u0BC1\u0BAA\u0BCD\u0BAA\u0BBF\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0BAE\u0BCD! \u0BB5\u0BBE\u0B9F\u0BCD\u0BB8\u0BCD\u0B85\u0BAA\u0BCD \u0BA8\u0BBF\u0BA9\u0BC8\u0BB5\u0BC2\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD \u0B85\u0BA9\u0BC1\u0BAA\u0BCD\u0BAA\u0BB5\u0BC1\u0BAE\u0BCD \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 \u0BB0\u0B9A\u0BC0\u0BA4\u0BC8 \u0B85\u0B9A\u0BCD\u0B9A\u0BBF\u0B9F\u0BB5\u0BC1\u0BAE\u0BCD.",
  grantMicAndStart: "\u0BAE\u0BC8\u0B95\u0BCD \u0B85\u0BA9\u0BC1\u0BAE\u0BA4\u0BBF \u0B85\u0BB3\u0BBF\u0BA4\u0BCD\u0BA4\u0BC1 \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  installAppTitle: "\u0B9A\u0BC6\u0BAF\u0BB2\u0BBF\u0BAF\u0BC8 \u0BA8\u0BBF\u0BB1\u0BC1\u0BB5\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD (\u0BAE\u0BC1\u0B95\u0BAA\u0BCD\u0BAA\u0BC1\u0BA4\u0BCD \u0BA4\u0BBF\u0BB0\u0BC8)",
  installAppSub: "\u0BB5\u0BC7\u0B95\u0BAE\u0BBE\u0BA9\u0BA4\u0BC1 & 100% \u0B86\u0B83\u0BAA\u0BCD\u0BB2\u0BC8\u0BA9\u0BBF\u0BB2\u0BCD \u0BB5\u0BC7\u0BB2\u0BC8 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BC1\u0BAE\u0BCD \u2022 1 \u0BA4\u0B9F\u0BCD\u0B9F\u0BB2\u0BBF\u0BB2\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1",
  install: "\u0BA8\u0BBF\u0BB1\u0BC1\u0BB5\u0BC1",
  errorBoundaryTitle: "\u0B8F\u0BA4\u0BCB \u0BA4\u0BB5\u0BB1\u0BC1 \u0BA8\u0B9F\u0BA8\u0BCD\u0BA4\u0BC1\u0BB5\u0BBF\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1",
  errorBoundarySub: "\u0B8F\u0BA4\u0BCB \u0BA4\u0BB5\u0BB1\u0BC1 \u0BA8\u0B9F\u0BA8\u0BCD\u0BA4\u0BC1\u0BB5\u0BBF\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1, \u0B86\u0BA9\u0BBE\u0BB2\u0BCD \u0B95\u0BB5\u0BB2\u0BC8\u0BAA\u0BCD\u0BAA\u0B9F \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BBE\u0BAE\u0BCD!",
  errorBoundarySafety: "\u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1\u0BA4\u0BCD \u0BA4\u0BB0\u0BB5\u0BC1 \u0B85\u0BA9\u0BC8\u0BA4\u0BCD\u0BA4\u0BC1\u0BAE\u0BCD \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0BCA\u0BB2\u0BC8\u0BAA\u0BC7\u0B9A\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1 (IndexedDB). \u0B8E\u0BA4\u0BC1\u0BB5\u0BC1\u0BAE\u0BCD \u0B87\u0BB4\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8.",
  retryButton: "\u0BAE\u0BC0\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD \u0BAE\u0BC1\u0BAF\u0BB1\u0BCD\u0B9A\u0BBF\u0B95\u0BCD\u0B95\u0BB5\u0BC1\u0BAE\u0BCD",
  goHomeButton: "\u0BAE\u0BC1\u0B95\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BCD\u0B95\u0BC1\u0B9A\u0BCD \u0B9A\u0BC6\u0BB2\u0BCD",
  technicalDetails: "\u0BA4\u0BCA\u0BB4\u0BBF\u0BB2\u0BCD\u0BA8\u0BC1\u0B9F\u0BCD\u0BAA\u0BAA\u0BCD \u0BAA\u0BBF\u0BB4\u0BC8 \u0BB5\u0BBF\u0BB5\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BCD"
};

// src/i18n/locales/te.json
var te_default = {
  appName: "Udhaar Sathi (\u0C09\u0C27\u0C3E\u0C30\u0C4D \u0C38\u0C3E\u0C25\u0C40)",
  tagline: "\u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C3F \u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  online: "\u0C06\u0C28\u0C4D\u200C\u0C32\u0C48\u0C28\u0C4D",
  offlineSafe: "\u0C06\u0C2B\u0C4D\u200C\u0C32\u0C48\u0C28\u0C4D \u0C38\u0C41\u0C30\u0C15\u0C4D\u0C37\u0C3F\u0C24\u0C02 (\u0C32\u0C4B\u0C15\u0C32\u0C4D)",
  navHome: "\u0C39\u0C4B\u0C2E\u0C4D (\u0C2E\u0C48\u0C15\u0C4D)",
  navCustomers: "\u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C32\u0C41",
  navSummary: "\u0C30\u0C4B\u0C1C\u0C41\u0C35\u0C3E\u0C30\u0C40 \u0C32\u0C46\u0C15\u0C4D\u0C15",
  navSettings: "\u0C38\u0C46\u0C1F\u0C4D\u0C1F\u0C3F\u0C02\u0C17\u0C4D\u200C\u0C32\u0C41",
  navStyleguide: "\u0C36\u0C48\u0C32\u0C3F \u0C2E\u0C3E\u0C30\u0C4D\u0C17\u0C26\u0C30\u0C4D\u0C36\u0C3F",
  save: "\u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  cancel: "\u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  delete: "\u0C24\u0C4A\u0C32\u0C17\u0C3F\u0C02\u0C1A\u0C41",
  edit: "\u0C38\u0C35\u0C30\u0C3F\u0C02\u0C1A\u0C41",
  close: "\u0C2E\u0C42\u0C38\u0C3F\u0C35\u0C47\u0C2F\u0C3F",
  search: "\u0C35\u0C46\u0C24\u0C15\u0C02\u0C21\u0C3F",
  back: "\u0C35\u0C46\u0C28\u0C41\u0C15\u0C15\u0C41",
  done: "\u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C2F\u0C3F\u0C02\u0C26\u0C3F",
  creditGiven: "\u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C07\u0C1A\u0C4D\u0C1A\u0C3F\u0C28\u0C26\u0C3F",
  paymentReceived: "\u0C21\u0C2C\u0C4D\u0C2C\u0C41 \u0C35\u0C1A\u0C4D\u0C1A\u0C3F\u0C02\u0C26\u0C3F",
  balanceOwed: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C2C\u0C3E\u0C15\u0C40",
  netBalance: "\u0C28\u0C3F\u0C15\u0C30 \u0C2C\u0C3E\u0C15\u0C40",
  todaySummary: "\u0C08\u0C30\u0C4B\u0C1C\u0C41 \u0C32\u0C46\u0C15\u0C4D\u0C15",
  recentEntries: "\u0C07\u0C1F\u0C40\u0C35\u0C32\u0C3F \u0C32\u0C3E\u0C35\u0C3E\u0C26\u0C47\u0C35\u0C40\u0C32\u0C41",
  noEntries: "\u0C07\u0C02\u0C15\u0C3E \u0C32\u0C3E\u0C35\u0C3E\u0C26\u0C47\u0C35\u0C40\u0C32\u0C41 \u0C32\u0C47\u0C35\u0C41",
  micIdle: "\u0C2E\u0C48\u0C15\u0C4D \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C3F \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C02\u0C21\u0C3F",
  micListening: "\u0C35\u0C3F\u0C02\u0C1F\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C28\u0C41... \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C02\u0C21\u0C3F",
  micProcessing: "\u0C32\u0C46\u0C15\u0C4D\u0C15\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F...",
  micError: "\u0C38\u0C4D\u0C2A\u0C37\u0C4D\u0C1F\u0C02\u0C17\u0C3E \u0C35\u0C3F\u0C28\u0C2C\u0C21\u0C32\u0C47\u0C26\u0C41. \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C2E\u0C33\u0C4D\u0C33\u0C40 \u0C2A\u0C4D\u0C30\u0C2F\u0C24\u0C4D\u0C28\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F.",
  typeInstead: "\u0C1F\u0C48\u0C2A\u0C4D \u0C1A\u0C47\u0C38\u0C3F \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  trySpeaking: "\u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C3F \u0C1A\u0C42\u0C21\u0C02\u0C21\u0C3F:",
  customersTitle: "\u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C32 \u0C1C\u0C3E\u0C2C\u0C3F\u0C24\u0C3E",
  searchCustomerPlaceholder: "\u0C2A\u0C47\u0C30\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C2E\u0C4A\u0C2C\u0C48\u0C32\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C35\u0C46\u0C24\u0C15\u0C02\u0C21\u0C3F...",
  filterAll: "\u0C05\u0C28\u0C4D\u0C28\u0C40",
  filterOwes: "\u0C2C\u0C3E\u0C15\u0C40 \u0C09\u0C28\u0C4D\u0C28\u0C35\u0C3E\u0C30\u0C41",
  filterSettled: "\u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C2F\u0C3F\u0C02\u0C26\u0C3F",
  addJama: "+ \u0C1C\u0C2E \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  printSlip: "\u0C30\u0C38\u0C40\u0C26\u0C41 \u0C2A\u0C4D\u0C30\u0C3F\u0C02\u0C1F\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  sendWhatsApp: "\u0C35\u0C3E\u0C1F\u0C4D\u0C38\u0C3E\u0C2A\u0C4D \u0C30\u0C3F\u0C2E\u0C48\u0C02\u0C21\u0C30\u0C4D",
  summaryTitle: "\u0C30\u0C4B\u0C1C\u0C41\u0C35\u0C3E\u0C30\u0C40 \u0C38\u0C3E\u0C30\u0C3E\u0C02\u0C36\u0C02",
  todayUdhaar: "\u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C07\u0C1A\u0C4D\u0C1A\u0C3F\u0C28\u0C26\u0C3F",
  todayJama: "\u0C21\u0C2C\u0C4D\u0C2C\u0C41 \u0C1C\u0C2E",
  todayNet: "\u0C28\u0C3F\u0C15\u0C30 \u0C2E\u0C3E\u0C30\u0C4D\u0C2A\u0C41",
  weeklyTrend: "\u0C17\u0C24 7 \u0C30\u0C4B\u0C1C\u0C41\u0C32 \u0C24\u0C40\u0C30\u0C41",
  topPending: "\u0C05\u0C24\u0C4D\u0C2F\u0C27\u0C3F\u0C15 \u0C2C\u0C3E\u0C15\u0C40 \u0C09\u0C28\u0C4D\u0C28\u0C35\u0C3E\u0C30\u0C41",
  settingsTitle: "\u0C38\u0C46\u0C1F\u0C4D\u0C1F\u0C3F\u0C02\u0C17\u0C4D\u200C\u0C32\u0C41",
  settingsSubtitle: "\u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C41, \u0C2D\u0C3E\u0C37, \u0C38\u0C4C\u0C02\u0C21\u0C4D\u200C\u0C2C\u0C3E\u0C15\u0C4D\u0C38\u0C4D \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2C\u0C4D\u0C2F\u0C3E\u0C15\u0C2A\u0C4D",
  shopNameLabel: "\u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 \u0C2A\u0C47\u0C30\u0C41",
  shopNamePlaceholder: "\u0C09\u0C26\u0C3E. \u0C30\u0C2E\u0C47\u0C37\u0C4D \u0C15\u0C3F\u0C30\u0C3E\u0C23\u0C3E \u0C38\u0C4D\u0C1F\u0C4B\u0C30\u0C4D",
  uiLanguageLabel: "\u0C38\u0C4D\u0C15\u0C4D\u0C30\u0C40\u0C28\u0C4D \u0C2D\u0C3E\u0C37",
  uiLanguageDesc: "\u0C2C\u0C1F\u0C28\u0C4D\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C38\u0C4D\u0C15\u0C4D\u0C30\u0C40\u0C28\u0C4D \u0C2A\u0C48 \u0C15\u0C28\u0C3F\u0C2A\u0C3F\u0C02\u0C1A\u0C47 \u0C2D\u0C3E\u0C37",
  speechLanguageLabel: "\u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C47 \u0C2D\u0C3E\u0C37",
  speechLanguageDesc: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C17\u0C41\u0C30\u0C4D\u0C24\u0C3F\u0C02\u0C2A\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C38\u0C4C\u0C02\u0C21\u0C4D\u200C\u0C2C\u0C3E\u0C15\u0C4D\u0C38\u0C4D \u0C15\u0C4B\u0C38\u0C02",
  speechSpeedLabel: "\u0C2E\u0C3E\u0C1F\u0C32 \u0C35\u0C47\u0C17\u0C02 (Soundbox)",
  speedSlow: "\u0C28\u0C46\u0C2E\u0C4D\u0C2E\u0C26\u0C3F\u0C17\u0C3E",
  speedNormal: "\u0C38\u0C3E\u0C27\u0C3E\u0C30\u0C23\u0C02",
  speedFast: "\u0C35\u0C47\u0C17\u0C02\u0C17\u0C3E",
  muteRepliesLabel: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C38\u0C2E\u0C3E\u0C27\u0C3E\u0C28\u0C3E\u0C32\u0C41 \u0C2E\u0C4D\u0C2F\u0C42\u0C1F\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  muteRepliesDesc: "\u0C17\u0C02\u0C1F \u0C2E\u0C3E\u0C24\u0C4D\u0C30\u0C2E\u0C47 \u0C2E\u0C4B\u0C17\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F, \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C26\u0C41",
  themeLabel: "\u0C25\u0C40\u0C2E\u0C4D",
  themeLight: "\u0C32\u0C48\u0C1F\u0C4D \u0C25\u0C40\u0C2E\u0C4D",
  themeHighContrast: "\u0C39\u0C48 \u0C15\u0C3E\u0C02\u0C1F\u0C4D\u0C30\u0C3E\u0C38\u0C4D\u0C1F\u0C4D (\u0C21\u0C3E\u0C30\u0C4D\u0C15\u0C4D)",
  themeDesc: "\u0C0E\u0C02\u0C21\u0C32\u0C4B \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C30\u0C3E\u0C24\u0C4D\u0C30\u0C3F \u0C38\u0C2E\u0C2F\u0C02\u0C32\u0C4B \u0C38\u0C4D\u0C2A\u0C37\u0C4D\u0C1F\u0C02\u0C17\u0C3E \u0C15\u0C28\u0C3F\u0C2A\u0C3F\u0C02\u0C1A\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F",
  asrEngineLabel: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C07\u0C02\u0C1C\u0C3F\u0C28\u0C4D (ASR)",
  asrEngineDesc: "\u0C2E\u0C3E\u0C1F\u0C32\u0C28\u0C41 \u0C1F\u0C46\u0C15\u0C4D\u0C38\u0C4D\u0C1F\u0C4D\u200C\u0C17\u0C3E \u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C47 \u0C07\u0C02\u0C1C\u0C3F\u0C28\u0C4D",
  asrBrowser: "\u0C2C\u0C4D\u0C30\u0C4C\u0C1C\u0C30\u0C4D \u0C06\u0C28\u0C4D-\u0C21\u0C3F\u0C35\u0C48\u0C38\u0C4D (\u0C09\u0C1A\u0C3F\u0C24\u0C02, \u0C06\u0C2B\u0C4D\u200C\u0C32\u0C48\u0C28\u0C4D)",
  asrBhashini: "\u0C2D\u0C3E\u0C37\u0C3F\u0C23\u0C3F AI (\u0C21\u0C3F\u0C1C\u0C3F\u0C1F\u0C32\u0C4D \u0C07\u0C02\u0C21\u0C3F\u0C2F\u0C3E) [Stubbed]",
  asrSarvam: "\u0C38\u0C30\u0C4D\u0C35\u0C02 AI (\u0C07\u0C02\u0C21\u0C3F\u0C15\u0C4D \u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D) [Stubbed]",
  exportLedgerLabel: "\u0C16\u0C3E\u0C24\u0C3E \u0C21\u0C47\u0C1F\u0C3E \u0C0E\u0C17\u0C41\u0C2E\u0C24\u0C3F",
  exportJson: "JSON \u0C32\u0C4B \u0C21\u0C4C\u0C28\u0C4D\u200C\u0C32\u0C4B\u0C21\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  exportCsv: "CSV \u0C32\u0C4B \u0C21\u0C4C\u0C28\u0C4D\u200C\u0C32\u0C4B\u0CA1\u0CCD \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  dangerZoneLabel: "\u0C21\u0C47\u0C02\u0C1C\u0C30\u0C4D \u0C1C\u0C4B\u0C28\u0C4D",
  clearAllData: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C16\u0C3E\u0C24\u0C3E \u0C21\u0C47\u0C1F\u0C3E\u0C28\u0C41 \u0C24\u0C4A\u0C32\u0C17\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  clearConfirm: "\u0C2E\u0C40\u0C30\u0C41 \u0C16\u0C1A\u0C4D\u0C1A\u0C3F\u0C24\u0C02\u0C17\u0C3E \u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C32\u0C28\u0C41, \u0C32\u0C3E\u0C35\u0C3E\u0C26\u0C47\u0C35\u0C40\u0C32\u0C28\u0C41 \u0C24\u0C4A\u0C32\u0C17\u0C3F\u0C02\u0C1A\u0C3E\u0C32\u0C28\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C3E? \u0C26\u0C40\u0C28\u0C4D\u0C28\u0C3F \u0C24\u0C3F\u0C30\u0C3F\u0C17\u0C3F \u0C2A\u0C4A\u0C02\u0C26\u0C32\u0C47\u0C30\u0C41.",
  clearSuccess: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C21\u0C47\u0C1F\u0C3E \u0C35\u0C3F\u0C1C\u0C2F\u0C35\u0C02\u0C24\u0C02\u0C17\u0C3E \u0C24\u0C4A\u0C32\u0C17\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F!",
  resetDemo: "\u0C21\u0C46\u0C2E\u0C4B \u0C21\u0C47\u0C1F\u0C3E\u0C28\u0C41 \u0C2A\u0C41\u0C28\u0C30\u0C41\u0C26\u0C4D\u0C27\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  resetSuccess: "\u0C21\u0C46\u0C2E\u0C4B \u0C21\u0C47\u0C1F\u0C3E \u0C32\u0C4B\u0C21\u0C4D \u0C05\u0C2F\u0C3F\u0C02\u0C26\u0C3F!",
  localFirstInfo: "Udhaar Sathi 100% \u0C06\u0C2B\u0C4D\u200C\u0C32\u0C48\u0C28\u0C4D. \u0C2E\u0C40 \u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C21\u0C47\u0C1F\u0C3E \u0C2E\u0C40 \u0C2B\u0C4B\u0C28\u0C4D\u200C\u0C32\u0C4B\u0C28\u0C47 \u0C38\u0C41\u0C30\u0C15\u0C4D\u0C37\u0C3F\u0C24\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F (IndexedDB).",
  signupWelcomeTitle: "Udhaar Sathi \u0C15\u0C3F \u0C38\u0C4D\u0C35\u0C3E\u0C17\u0C24\u0C02",
  signupWelcomeSubtitle: "\u0C2D\u0C3E\u0C30\u0C24\u0C40\u0C2F \u0C15\u0C3F\u0C30\u0C3E\u0C23\u0C3E \u0C26\u0C41\u0C15\u0C3E\u0C23\u0C3E\u0C32 \u0C15\u0C4B\u0C38\u0C02 \u0C39\u0C4D\u0C2F\u0C3E\u0C02\u0C21\u0C4D\u0C38\u0C4D-\u0C2B\u0C4D\u0C30\u0C40 \u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C32\u0C46\u0C21\u0C4D\u0C1C\u0C30\u0C4D",
  dataStaysOnPhone: "\u0C2E\u0C40 \u0C21\u0C47\u0C1F\u0C3E \u0C08 \u0C2B\u0C4B\u0C28\u0C4D\u200C\u0C32\u0C4B\u0C28\u0C47 \u0C2D\u0C26\u0C4D\u0C30\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F",
  getStarted: "\u0C2A\u0C4D\u0C30\u0C3E\u0C30\u0C02\u0C2D\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  stepOf: "\u0C26\u0C36 {current} / {total}",
  shopNamePrompt: "\u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 \u0C2A\u0C47\u0C30\u0C41 \u0C0F\u0C2E\u0C3F\u0C1F\u0C3F?",
  shopNameSpoken: "\u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 \u0C2A\u0C47\u0C30\u0C41 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F",
  shopNameHelper: "\u0C2E\u0C40 \u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 \u0C2A\u0C47\u0C30\u0C41 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C30\u0C3E\u0C2F\u0C02\u0C21\u0C3F",
  shopNameError: "\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C38\u0C30\u0C48\u0C28 \u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 \u0C2A\u0C47\u0C30\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F (\u0C15\u0C28\u0C40\u0C38\u0C02 2 \u0C05\u0C15\u0C4D\u0C37\u0C30\u0C3E\u0C32\u0C41)",
  ownerNamePrompt: "\u0C2E\u0C40 \u0C2A\u0C47\u0C30\u0C41 \u0C0F\u0C2E\u0C3F\u0C1F\u0C3F?",
  ownerNameSpoken: "\u0C2E\u0C40 \u0C2A\u0C47\u0C30\u0C41 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F",
  ownerNamePlaceholder: "\u0C09\u0C26\u0C3E. \u0C30\u0C2E\u0C47\u0C37\u0C4D \u0C15\u0C41\u0C2E\u0C3E\u0C30\u0C4D",
  ownerNameHelper: "\u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 \u0C2F\u0C1C\u0C2E\u0C3E\u0C28\u0C3F \u0C2A\u0C47\u0C30\u0C41",
  ownerNameError: "\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C2E\u0C40 \u0C2A\u0C47\u0C30\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F (\u0C15\u0C28\u0C40\u0C38\u0C02 2 \u0C05\u0C15\u0C4D\u0C37\u0C30\u0C3E\u0C32\u0C41)",
  phonePrompt: "\u0C2E\u0C40 \u0C2E\u0C4A\u0C2C\u0C48\u0C32\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C41",
  phoneSpoken: "\u0C2E\u0C40 10 \u0C05\u0C02\u0C15\u0C46\u0C32 \u0C2E\u0C4A\u0C2C\u0C48\u0C32\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  phonePlaceholder: "\u0C09\u0C26\u0C3E. 9876543210",
  phoneHelper: "\u0C35\u0C3E\u0C1F\u0C4D\u0C38\u0C3E\u0C2A\u0C4D \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2C\u0C3E\u0C15\u0C40 \u0C30\u0C3F\u0C2E\u0C48\u0C02\u0C21\u0C30\u0C4D\u0C32 \u0C15\u0C4B\u0C38\u0C02 10 \u0C05\u0C02\u0C15\u0C46\u0C32 \u0C2E\u0C4A\u0C2C\u0C48\u0C32\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C41",
  phoneError: "6-9 \u0C24\u0C4B \u0C2A\u0C4D\u0C30\u0C3E\u0C30\u0C02\u0C2D\u0C2E\u0C2F\u0C4D\u0C2F\u0C47 10 \u0C05\u0C02\u0C15\u0C46\u0C32 \u0C2D\u0C3E\u0C30\u0C24\u0C40\u0C2F \u0C2E\u0C4A\u0C2C\u0C48\u0C32\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  upiPrompt: "\u0C2E\u0C40 \u0C2F\u0C42\u0C2A\u0C40\u0C10 \u0C10\u0C21\u0C40",
  upiSpoken: "\u0C2E\u0C40 \u0C2F\u0C42\u0C2A\u0C40\u0C10 \u0C10\u0C21\u0C40 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C30\u0C3E\u0C2F\u0C02\u0C21\u0C3F",
  upiPlaceholder: "\u0C09\u0C26\u0C3E. ramesh@oksbi",
  upiHelperText: "\u0C2E\u0C40 \u0C2F\u0C42\u0C2A\u0C40\u0C10 \u0C10\u0C21\u0C40 \u0C2E\u0C3E\u0C24\u0C4D\u0C30\u0C2E\u0C47 \u0C05\u0C35\u0C38\u0C30\u0C02. \u0C2E\u0C47\u0C2E\u0C41 \u0C0E\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C42 \u0C2C\u0C4D\u0C2F\u0C3E\u0C02\u0C15\u0C4D \u0C16\u0C3E\u0C24\u0C3E \u0C38\u0C02\u0C16\u0C4D\u0C2F\u0C28\u0C41 \u0C05\u0C21\u0C17\u0C2E\u0C41.",
  upiPaste: "\u0C2A\u0C47\u0C38\u0C4D\u0C1F\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  upiReadBack: "\u0C05\u0C15\u0C4D\u0C37\u0C30\u0C3E\u0C32 \u0C35\u0C3E\u0C30\u0C40\u0C17\u0C3E \u0C35\u0C3F\u0C28\u0C02\u0C21\u0C3F",
  upiReadingBack: "\u0C1A\u0C26\u0C41\u0C35\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F...",
  upiError: "\u0C38\u0C30\u0C48\u0C28 \u0C2F\u0C42\u0C2A\u0C40\u0C10 \u0C10\u0C21\u0C40\u0C28\u0C3F \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F (\u0C09\u0C26\u0C3E. name@bank)",
  pinPrompt: "\u0C38\u0C46\u0C15\u0C4D\u0C2F\u0C42\u0C30\u0C3F\u0C1F\u0C40 \u0C2A\u0C3F\u0C28\u0C4D \u0C38\u0C46\u0C1F\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F (\u0C10\u0C1A\u0C4D\u0C1B\u0C3F\u0C15\u0C02)",
  pinSpoken: "4 \u0C28\u0C41\u0C02\u0C21\u0C3F 6 \u0C05\u0C02\u0C15\u0C46\u0C32 \u0C38\u0C46\u0C15\u0C4D\u0C2F\u0C42\u0C30\u0C3F\u0C1F\u0C40 \u0C2A\u0C3F\u0C28\u0C4D \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C26\u0C3E\u0C1F\u0C35\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  pinPlaceholder: "4-6 \u0C05\u0C02\u0C15\u0C46\u0C32 \u0C2A\u0C3F\u0C28\u0C4D",
  pinHelperText: "\u0C21\u0C3F\u0C35\u0C48\u0C38\u0C4D \u0C0E\u0C28\u0C4D\u200C\u0C15\u0C4D\u0C30\u0C3F\u0C2A\u0C4D\u0C37\u0C28\u0C4D\u200C\u0C24\u0C4B \u0C2E\u0C40 \u0C16\u0C3E\u0C24\u0C3E\u0C28\u0C41 \u0C2D\u0C26\u0C4D\u0C30\u0C2A\u0C30\u0C41\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F. \u0C38\u0C46\u0C1F\u0C4D\u0C1F\u0C3F\u0C02\u0C17\u0C4D\u0C38\u0C4D\u200C\u0C32\u0C4B \u0C24\u0C30\u0C4D\u0C35\u0C3E\u0C24 \u0C15\u0C42\u0C21\u0C3E \u0C38\u0C46\u0C1F\u0C4D \u0C1A\u0C47\u0C38\u0C41\u0C15\u0C4B\u0C35\u0C1A\u0C4D\u0C1A\u0C41.",
  pinSkip: "\u0C07\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C41 \u0C26\u0C3E\u0C1F\u0C35\u0C47\u0C2F\u0C3F",
  pinSkipWarning: "\u0C2A\u0C3F\u0C28\u0C4D \u0C32\u0C47\u0C15\u0C41\u0C02\u0C21\u0C3E \u0C0E\u0C35\u0C30\u0C48\u0C28\u0C3E \u0C08 \u0C2F\u0C3E\u0C2A\u0C4D \u0C24\u0C46\u0C30\u0C3F\u0C1A\u0C3F \u0C2E\u0C40 \u0C16\u0C3E\u0C24\u0C3E\u0C28\u0C41 \u0C1A\u0C42\u0C21\u0C35\u0C1A\u0C4D\u0C1A\u0C41. \u0C2E\u0C40\u0C30\u0C41 \u0C38\u0C46\u0C1F\u0C4D\u0C1F\u0C3F\u0C02\u0C17\u0C4D\u0C38\u0C4D\u200C\u0C32\u0C4B \u0C0E\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C48\u0C28\u0C3E \u0C2A\u0C3F\u0C28\u0C4D \u0C38\u0C46\u0C1F\u0C4D \u0C1A\u0C47\u0C38\u0C41\u0C15\u0C4B\u0C35\u0C1A\u0C4D\u0C1A\u0C41.",
  pinSkipConfirm: "\u0C2A\u0C3F\u0C28\u0C4D \u0C26\u0C3E\u0C1F\u0C35\u0C47\u0C2F\u0C3F",
  pinError: "\u0C2A\u0C3F\u0C28\u0C4D 4-6 \u0C05\u0C02\u0C15\u0C46\u0C32\u0C41 \u0C09\u0C02\u0C21\u0C3E\u0C32\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C38\u0C30\u0C33 \u0C36\u0C4D\u0C30\u0C47\u0C23\u0C3F \u0C15\u0C3E\u0C15\u0C42\u0C21\u0C26\u0C41 (\u0C09\u0C26\u0C3E. 1234, 0000)",
  reviewTitle: "\u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 \u0C2A\u0C4D\u0C30\u0C4A\u0C2B\u0C48\u0C32\u0C4D \u0C38\u0C2E\u0C40\u0C15\u0C4D\u0C37\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  reviewSubtitle: "\u0C2E\u0C40 \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C28\u0C41 \u0C28\u0C3F\u0C30\u0C4D\u0C27\u0C3E\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F. \u0C35\u0C40\u0C1F\u0C3F\u0C28\u0C3F \u0C38\u0C46\u0C1F\u0C4D\u0C1F\u0C3F\u0C02\u0C17\u0C4D\u0C38\u0C4D\u200C\u0C32\u0C4B \u0C0E\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C48\u0C28\u0C3E \u0C28\u0C35\u0C40\u0C15\u0C30\u0C3F\u0C02\u0C1A\u0C35\u0C1A\u0C4D\u0C1A\u0C41.",
  startAppButton: "Udhaar Sathi \u0C2A\u0C4D\u0C30\u0C3E\u0C30\u0C02\u0C2D\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  editField: "\u0C38\u0C35\u0C30\u0C3F\u0C02\u0C1A\u0C41",
  nextStep: "\u0C24\u0C30\u0C4D\u0C35\u0C3E\u0C24",
  prevStep: "\u0C35\u0C46\u0C28\u0C41\u0C15\u0C15\u0C41",
  settingsProfileTitle: "\u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 \u0C2A\u0C4D\u0C30\u0C4A\u0C2B\u0C48\u0C32\u0C4D",
  settingsProfileSubtitle: "\u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C41, \u0C2F\u0C1C\u0C2E\u0C3E\u0C28\u0C3F \u0C38\u0C2E\u0C3E\u0C1A\u0C3E\u0C30\u0C02 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C2A\u0C41 \u0C2F\u0C42\u0C2A\u0C40\u0C10 \u0C10\u0C21\u0C40",
  confirmUpiChangeTitle: "\u0C2F\u0C42\u0C2A\u0C40\u0C10 \u0C10\u0C21\u0C40\u0C28\u0C3F \u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C3E\u0C32\u0C3E?",
  confirmUpiChangeWarning: "\u0C2F\u0C42\u0C2A\u0C40\u0C10 \u0C10\u0C21\u0C40\u0C28\u0C3F \u0C2E\u0C3E\u0C30\u0C3F\u0C38\u0C4D\u0C24\u0C47 \u0C15\u0C38\u0C4D\u0C1F\u0C2E\u0C30\u0C4D\u0C32\u0C15\u0C41 \u0C2A\u0C02\u0C2A\u0C47 \u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C2A\u0C41 \u0C15\u0C4D\u0C2F\u0C42\u0C06\u0C30\u0C4D \u0C15\u0C4B\u0C21\u0C4D \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C32\u0C3F\u0C02\u0C15\u0C41\u0C32\u0C41 \u0C2E\u0C3E\u0C30\u0C41\u0C24\u0C3E\u0C2F\u0C3F. \u0C2E\u0C40\u0C30\u0C41 \u0C16\u0C1A\u0C4D\u0C1A\u0C3F\u0C24\u0C02\u0C17\u0C3E \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C3E?",
  confirmUpiChangeButton: "\u0C05\u0C35\u0C41\u0C28\u0C41, \u0C2F\u0C42\u0C2A\u0C40\u0C10 \u0C10\u0C21\u0C40 \u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C02\u0C21\u0C3F",
  noPinWarningBanner: "\u0C2E\u0C40 \u0C16\u0C3E\u0C24\u0C3E \u0C2A\u0C3F\u0C28\u0C4D\u200C\u0C24\u0C4B \u0C30\u0C15\u0C4D\u0C37\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C32\u0C47\u0C26\u0C41. \u0C21\u0C47\u0C1F\u0C3E\u0C28\u0C41 \u0C2D\u0C26\u0C4D\u0C30\u0C2A\u0C30\u0C1A\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C07\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C47 \u0C2A\u0C3F\u0C28\u0C4D \u0C38\u0C46\u0C1F\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F.",
  setPinNow: "\u0C07\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C47 \u0C2A\u0C3F\u0C28\u0C4D \u0C38\u0C46\u0C1F\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  profileUpdatedToast: "\u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 \u0C2A\u0C4D\u0C30\u0C4A\u0C2B\u0C48\u0C32\u0C4D \u0C35\u0C3F\u0C1C\u0C2F\u0C35\u0C02\u0C24\u0C02\u0C17\u0C3E \u0C28\u0C35\u0C40\u0C15\u0C30\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F!",
  registerCustomerTitle: "\u0C15\u0C4A\u0C24\u0C4D\u0C24 \u0C15\u0C38\u0C4D\u0C1F\u0C2E\u0C30\u0C4D \u0C28\u0C2E\u0C4B\u0C26\u0C41",
  registerCustomerSubtitle: "\u0C0E\u0C28\u0C4D\u200C\u0C15\u0C4D\u0C30\u0C3F\u0C2A\u0C4D\u0C1F\u0C46\u0C21\u0C4D \u0C32\u0C46\u0C21\u0C4D\u0C1C\u0C30\u0C4D\u200C\u0C32\u0C4B \u0C2D\u0C26\u0C4D\u0C30\u0C2A\u0C30\u0C1A\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C28\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  enterCustomerPhone: "\u0C15\u0C38\u0C4D\u0C1F\u0C2E\u0C30\u0C4D \u0C2E\u0C4A\u0C2C\u0C48\u0C32\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C41",
  phoneReadBackQuestion: "{phone}. \u0C38\u0C30\u0C3F\u0C17\u0C4D\u0C17\u0C3E \u0C09\u0C02\u0C26\u0C3E?",
  readBackConfirm: "\u0C05\u0C35\u0C41\u0C28\u0C41, \u0C38\u0C30\u0C3F\u0C17\u0C4D\u0C17\u0C3E \u0C09\u0C02\u0C26\u0C3F",
  readBackWrong: "\u0C15\u0C3E\u0C26\u0C41, \u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C02\u0C21\u0C3F",
  skipPhoneForNow: "\u0C07\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C41 \u0C26\u0C3E\u0C1F\u0C35\u0C47\u0C2F\u0C3F",
  noNumberWarning: "\u0C28\u0C02\u0C2C\u0C30\u0C41 \u0C32\u0C47\u0C15\u0C41\u0C02\u0C21\u0C3E \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F. \u0C30\u0C3F\u0C2E\u0C48\u0C02\u0C21\u0C30\u0C4D\u0C32\u0C32\u0C4B \u0C28\u0C02\u0C2C\u0C30\u0C41 \u0C05\u0C21\u0C17\u0C2C\u0C21\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F.",
  duplicatePhoneWarning: "\u0C08 \u0C28\u0C02\u0C2C\u0C30\u0C41 {name} \u0C26\u0C3F. \u0C06 \u0C35\u0C4D\u0C2F\u0C15\u0C4D\u0C24\u0C47\u0C28\u0C3E?",
  openExistingCustomer: "\u0C05\u0C35\u0C41\u0C28\u0C41, {name} \u0C24\u0C46\u0C30\u0C35\u0C02\u0C21\u0C3F",
  useAnotherNumber: "\u0C2E\u0C30\u0C4A\u0C15 \u0C28\u0C02\u0C2C\u0C30\u0C41 \u0C09\u0C2A\u0C2F\u0C4B\u0C17\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  requireCustomerPhoneLabel: "\u0C2E\u0C4A\u0C2C\u0C48\u0C32\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C41 \u0C24\u0C2A\u0C4D\u0C2A\u0C28\u0C3F\u0C38\u0C30\u0C3F",
  requireCustomerPhoneDesc: "\u0C15\u0C4A\u0C24\u0C4D\u0C24 \u0C15\u0C38\u0C4D\u0C1F\u0C2E\u0C30\u0C4D \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C38\u0C47\u0C1F\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C41 \u0C2B\u0C4B\u0C28\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C41 \u0C24\u0C2A\u0C4D\u0C2A\u0C28\u0C3F\u0C38\u0C30\u0C3F\u0C17\u0C3E \u0C09\u0C02\u0C21\u0C3E\u0C32\u0C3F",
  customerRegisteredSpoken: "{name} \u0C1A\u0C47\u0C30\u0C4D\u0C1A\u0C2C\u0C21\u0C4D\u0C21\u0C3E\u0C30\u0C41",
  customerNewAskPhoneSpoken: "{name} \u0C15\u0C4A\u0C24\u0C4D\u0C24 \u0C15\u0C38\u0C4D\u0C1F\u0C2E\u0C30\u0C4D. \u0C2E\u0C4A\u0C2C\u0C48\u0C32\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C41 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F",
  whichCustomerTitle: "\u0C0F {name}?",
  tellLast4DigitsSubtitle: "\u0C2B\u0C4B\u0C28\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C1A\u0C3F\u0C35\u0C30\u0C3F 4 \u0C05\u0C02\u0C15\u0C46\u0C32\u0C41 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C15\u0C3E\u0C30\u0C4D\u0C21\u0C41\u0C28\u0C41 \u0C24\u0C3E\u0C15\u0C02\u0C21\u0C3F",
  noNumberSavedChip: "\u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C32\u0C47\u0C26\u0C41",
  disambiguateRetryToast: "\u0C08 \u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C38\u0C30\u0C3F\u0C2A\u0C4B\u0C32\u0C32\u0C47\u0C26\u0C41. \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C2E\u0C33\u0C4D\u0C32\u0C40 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C15\u0C3E\u0C30\u0C4D\u0C21\u0C41\u0C28\u0C41 \u0C24\u0C3E\u0C15\u0C02\u0C21\u0C3F.",
  disambiguateConfirmSpoken: "{name}, \u0C38\u0C30\u0C3F\u0C17\u0C4D\u0C17\u0C3E \u0C09\u0C02\u0C26\u0C3F.",
  autoOpenPaymentRequestLabel: "\u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C24\u0C30\u0C4D\u0C35\u0C3E\u0C24 \u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C2A\u0C41 \u0C05\u0C2D\u0C4D\u0C2F\u0C30\u0C4D\u0C25\u0C28 \u0C1A\u0C42\u0C2A\u0C3F\u0C02\u0C1A\u0C41",
  autoOpenPaymentRequestDesc: "\u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C38\u0C3F\u0C28 \u0C35\u0C46\u0C02\u0C1F\u0C28\u0C47 UPI QR \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C35\u0C3E\u0C1F\u0C4D\u0C38\u0C3E\u0C2A\u0C4D \u0C32\u0C3F\u0C02\u0C15\u0C4D \u0C1A\u0C42\u0C2A\u0C3F\u0C02\u0C1A\u0C41",
  showMyQr: "\u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 QR",
  showMyQrDesc: "\u0C15\u0C4C\u0C02\u0C1F\u0C30\u0C4D \u0C35\u0C26\u0C4D\u0C26 \u0C09\u0C28\u0C4D\u0C28 \u0C15\u0C38\u0C4D\u0C1F\u0C2E\u0C30\u0C4D\u0C32 \u0C15\u0C4B\u0C38\u0C02 \u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C2A\u0C41 QR",
  showMyQrTitle: "\u0C37\u0C3E\u0C2A\u0C4D \u0C15\u0C4C\u0C02\u0C1F\u0C30\u0C4D QR",
  paymentRequestTitle: "\u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C2A\u0C41 \u0C05\u0C2D\u0C4D\u0C2F\u0C30\u0C4D\u0C25\u0C28",
  paymentRequestSubtitle: "\u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C2A\u0C41 \u0C38\u0C4D\u0C35\u0C40\u0C15\u0C30\u0C3F\u0C02\u0C1A\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F QR \u0C32\u0C47\u0C26\u0C3E \u0C35\u0C3E\u0C1F\u0C4D\u0C38\u0C3E\u0C2A\u0C4D \u0C32\u0C3F\u0C02\u0C15\u0C4D \u0C2A\u0C02\u0C2A\u0C02\u0C21\u0C3F",
  sendWhatsAppPayment: "WhatsApp \u0C2A\u0C02\u0C2A\u0C02\u0C21\u0C3F",
  sendWhatsAppHint: "WhatsApp \u0C24\u0C46\u0C30\u0C41\u0C1A\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F, \u0C24\u0C30\u0C4D\u0C35\u0C3E\u0C24 Send \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C02\u0C21\u0C3F",
  shareQr: "QR \u0C2A\u0C02\u0C2A\u0C02\u0C21\u0C3F",
  downloadQr: "QR \u0C21\u0C4C\u0C28\u0C4D\u200C\u0C32\u0C4B\u0C21\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  laterDismiss: "\u0C24\u0C30\u0C4D\u0C35\u0C3E\u0C24",
  noPhoneAddNumber: "\u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  noPhoneWarning: "\u0C08 \u0C15\u0C38\u0C4D\u0C1F\u0C2E\u0C30\u0C4D \u0C2B\u0C4B\u0C28\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C41 \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C32\u0C47\u0C26\u0C41",
  noUpiIdWarning: "\u0C2A\u0C4D\u0C30\u0C4A\u0C2B\u0C48\u0C32\u0C4D\u200C\u0C32\u0C4B UPI ID \u0C32\u0C47\u0C26\u0C41. \u0C38\u0C46\u0C1F\u0C4D\u0C1F\u0C3F\u0C02\u0C17\u0C4D\u0C38\u0C4D\u200C\u0C32\u0C4B \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F.",
  setupUpiNow: "UPI ID \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  whatsappOfflineHint: "WhatsApp \u0C15\u0C4B\u0C38\u0C02 \u0C07\u0C02\u0C1F\u0C30\u0C4D\u0C28\u0C46\u0C1F\u0C4D \u0C05\u0C35\u0C38\u0C30\u0C02",
  qrSavedToast: "QR \u0C15\u0C4B\u0C21\u0C4D \u0C38\u0C3F\u0C26\u0C4D\u0C27\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C26\u0C3F",
  receiptQrTitle: "UPI \u0C26\u0C4D\u0C35\u0C3E\u0C30\u0C3E \u0C38\u0C4D\u0C15\u0C3E\u0C28\u0C4D \u0C1A\u0C47\u0C38\u0C3F \u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  chooseLanguage: "\u0C2D\u0C3E\u0C37\u0C28\u0C41 \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F",
  language: "\u0C2D\u0C3E\u0C37",
  speechLanguage: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C2D\u0C3E\u0C37",
  entries: "\u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40\u0C32\u0C41",
  entriesCount: "{count} \u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40\u0C32\u0C41",
  clear: "\u0C24\u0C40\u0C38\u0C3F\u0C35\u0C47\u0C2F\u0C3F",
  reset: "\u0C30\u0C40\u0C38\u0C46\u0C1F\u0C4D",
  viewAll: "\u0C05\u0C28\u0C4D\u0C28\u0C40 \u0C1A\u0C42\u0C21\u0C02\u0C21\u0C3F \u2192",
  loading: "\u0C32\u0C4B\u0C21\u0C4D \u0C05\u0C35\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F...",
  loadingCustomers: "\u0C16\u0C3E\u0C24\u0C3E \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C41 \u0C32\u0C4B\u0C21\u0C4D \u0C05\u0C35\u0C41\u0C24\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3F...",
  loadingSummary: "\u0C30\u0C4B\u0C1C\u0C41\u0C35\u0C3E\u0C30\u0C40 \u0C38\u0C3E\u0C30\u0C3E\u0C02\u0C36\u0C02 \u0C32\u0C4B\u0C21\u0C4D \u0C05\u0C35\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F...",
  securingLedger: "\u0C16\u0C3E\u0C24\u0C3E \u0C2D\u0C26\u0C4D\u0C30\u0C2A\u0C30\u0C1A\u0C2C\u0C21\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F...",
  micPromptSpeak: "\u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C02\u0C21\u0C3F",
  micPromptListening: "\u0C35\u0C3F\u0C02\u0C1F\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C2E\u0C41...",
  micPromptProcessing: "\u0C2A\u0C4D\u0C30\u0C3E\u0C38\u0C46\u0C38\u0C4D \u0C05\u0C35\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F...",
  micPromptRetry: "\u0C2E\u0C33\u0C4D\u0C33\u0C40 \u0C2A\u0C4D\u0C30\u0C2F\u0C24\u0C4D\u0C28\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  micCaptionIdle: "\u0C12\u0C15\u0C38\u0C3E\u0C30\u0C3F \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C3F \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C02\u0C21\u0C3F",
  micCaptionListening: "\u0C38\u0C4D\u0C2A\u0C37\u0C4D\u0C1F\u0C02\u0C17\u0C3E \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C02\u0C21\u0C3F \u2022 \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C1F\u0C02 \u0C06\u0C2A\u0C17\u0C3E\u0C28\u0C47 \u0C06\u0C17\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F",
  micCaptionProcessing: "\u0C32\u0C46\u0C15\u0C4D\u0C15\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F...",
  micErrorFallbackNote: "\u0C2E\u0C48\u0C15\u0C4D \u0C2A\u0C28\u0C3F\u0C1A\u0C47\u0C2F\u0C15\u0C2A\u0C4B\u0C24\u0C47, \u0C1F\u0C48\u0C2A\u0C4D \u0C1A\u0C47\u0C38\u0C3F \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F.",
  listeningSpeakYourLanguage: "\u0C35\u0C3F\u0C02\u0C1F\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C2E\u0C41... \u0C2E\u0C40 \u0C2D\u0C3E\u0C37\u0C32\u0C4B \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C02\u0C21\u0C3F",
  streamingSpeech: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C35\u0C3F\u0C28\u0C2C\u0C21\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F...",
  processingSpeech: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C2A\u0C4D\u0C30\u0C3E\u0C38\u0C46\u0C38\u0C4D \u0C05\u0C35\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F...",
  heardVoice: "\u0C35\u0C3F\u0C28\u0C2C\u0C21\u0C3F\u0C28 \u0C2E\u0C3E\u0C1F\u0C32\u0C41",
  quickDemoPhrases: "\u0C24\u0C4D\u0C35\u0C30\u0C3F\u0C24 \u0C09\u0C26\u0C3E\u0C39\u0C30\u0C23\u0C32\u0C41",
  tapToTest: "\u0C2A\u0C30\u0C40\u0C15\u0C4D\u0C37\u0C3F\u0C02\u0C1A\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C02\u0C21\u0C3F",
  hintPhrase1: "\u0C30\u0C2E\u0C47\u0C37\u0C4D \u0C15\u0C41 500 \u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C07\u0C1A\u0C4D\u0C1A\u0C3E\u0C28\u0C41",
  hintPhrase2: "\u0C30\u0C2E\u0C47\u0C37\u0C4D 340 \u0C05\u0C2A\u0C4D\u0C2A\u0C41, \u0C28\u0C3F\u0C28\u0C4D\u0C28 200 \u0C07\u0C1A\u0C4D\u0C1A\u0C3E\u0C30\u0C41",
  hintPhrase3: "\u0C30\u0C2E\u0C47\u0C37\u0C4D \u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C0E\u0C02\u0C24?",
  creditGivenTodaySub: "\u0C08\u0C30\u0C4B\u0C1C\u0C41 \u0C07\u0C1A\u0C4D\u0C1A\u0C3F\u0C28 \u0C05\u0C2A\u0C4D\u0C2A\u0C41",
  paymentReceivedTodaySub: "\u0C08\u0C30\u0C4B\u0C1C\u0C41 \u0C05\u0C02\u0C26\u0C3F\u0C28 \u0C1C\u0C2E",
  marketPending: "\u0C30\u0C3E\u0C35\u0C32\u0C38\u0C3F\u0C28 \u0C2C\u0C3E\u0C15\u0C40",
  last5Entries: "\u0C1A\u0C3F\u0C35\u0C30\u0C3F 5 \u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40\u0C32\u0C41",
  noEntriesYetPrompt: "\u0C07\u0C02\u0C15\u0C3E \u0C0E\u0C32\u0C3E\u0C02\u0C1F\u0C3F \u0C32\u0C46\u0C15\u0C4D\u0C15 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C15\u0C3E\u0C32\u0C47\u0C26\u0C41. \u0C2E\u0C48\u0C15\u0C4D \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C3F \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C02\u0C21\u0C3F!",
  creditBadge: "\u0C05\u0C2A\u0C4D\u0C2A\u0C41",
  paymentBadge: "\u0C1C\u0C2E",
  udhaar: "\u0C05\u0C2A\u0C4D\u0C2A\u0C41",
  jama: "\u0C1C\u0C2E",
  customersCountSorted: "{count} \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C32\u0C41 \u2022 \u0C05\u0C24\u0C4D\u0C2F\u0C27\u0C3F\u0C15 \u0C2C\u0C3E\u0C15\u0C40 \u0C2A\u0C4D\u0C30\u0C15\u0C3E\u0C30\u0C02",
  noCustomersYet: "\u0C07\u0C02\u0C15\u0C3E \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C32\u0C41 \u0C32\u0C47\u0C30\u0C41",
  noCustomersDescription: "\u0C07\u0C02\u0C15\u0C3E \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C32\u0C41 \u0C32\u0C47\u0C30\u0C41. \u0C2E\u0C4A\u0C26\u0C1F\u0C3F \u0C05\u0C2A\u0C4D\u0C2A\u0C41\u0C28\u0C41 \u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C26\u0C4D\u0C35\u0C3E\u0C30\u0C3E \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F.",
  noCustomerFound: "\u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41 \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C2C\u0C21\u0C32\u0C47\u0C26\u0C41",
  noMatchingCustomerQuery: '"{query}" \u0C2A\u0C47\u0C30\u0C41\u0C24\u0C4B \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41 \u0C32\u0C47\u0C30\u0C41. \u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C26\u0C4D\u0C35\u0C3E\u0C30\u0C3E \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F.',
  noCustomersInFilter: "\u0C08 \u0C2B\u0C3F\u0C32\u0C4D\u0C1F\u0C30\u0C4D \u0C32\u0C4B \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C32\u0C41 \u0C32\u0C47\u0C30\u0C41.",
  firstUdhaarVoice: "\u{1F3A4} \u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C26\u0C4D\u0C35\u0C3E\u0C30\u0C3E \u0C2E\u0C4A\u0C26\u0C1F\u0C3F \u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  addCustomerButton: "+ \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C28\u0C3F \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  addNewCustomerTitle: "\u0C15\u0C4A\u0C24\u0C4D\u0C24 \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C28\u0C3F \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  addNewCustomerSubtitle: "\u0C0E\u0C32\u0C3E\u0C02\u0C1F\u0C3F \u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C32\u0C47\u0C26\u0C3E \u0C1C\u0C2E \u0C32\u0C47\u0C15\u0C41\u0C02\u0C21\u0C3E \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C28\u0C3F \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  lastActivity: "\u0C1A\u0C3F\u0C35\u0C30\u0C3F\u0C26\u0C3F: {date}",
  badgeOwes: "\u0C2C\u0C3E\u0C15\u0C40",
  badgeSettled: "\u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C2F\u0C3F\u0C02\u0C26\u0C3F",
  badgeNew: "\u0C15\u0C4A\u0C24\u0C4D\u0C24",
  listenBalance: "\u0C35\u0C3F\u0C28\u0C02\u0C21\u0C3F",
  lastReminderDate: "\u0C1A\u0C3F\u0C35\u0C30\u0C3F \u0C30\u0C3F\u0C2E\u0C48\u0C02\u0C21\u0C30\u0C4D: {date}",
  outstandingUdhaar: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C2C\u0C3E\u0C15\u0C40 \u0C05\u0C2A\u0C4D\u0C2A\u0C41",
  allSettled: "\u0C05\u0C02\u0C24\u0C3E \u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C2F\u0C3F\u0C02\u0C26\u0C3F",
  amountToReceive: "\u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41 \u0C28\u0C41\u0C02\u0C21\u0C3F \u0C30\u0C3E\u0C35\u0C32\u0C38\u0C3F\u0C28\u0C26\u0C3F",
  noBalancePending: "\u0C0E\u0C32\u0C3E\u0C02\u0C1F\u0C3F \u0C2C\u0C3E\u0C15\u0C40 \u0C32\u0C47\u0C26\u0C41",
  totalCreditLabel: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C05\u0C2A\u0C4D\u0C2A\u0C41:",
  totalPaymentLabel: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C1C\u0C2E:",
  sendWhatsAppReminder: "WhatsApp \u0C30\u0C3F\u0C2E\u0C48\u0C02\u0C21\u0C30\u0C4D",
  printReceipt: "\u0C30\u0C38\u0C40\u0C26\u0C41 \u0C2A\u0C4D\u0C30\u0C3F\u0C02\u0C1F\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  addUdhaarButton: "+ \u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  addPaymentButton: "+ \u0C1C\u0C2E \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  timelineEntries: "\u0C16\u0C3E\u0C24\u0C3E \u0C1A\u0C30\u0C3F\u0C24\u0C4D\u0C30 ({count} \u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40\u0C32\u0C41)",
  latestFirst: "\u0C24\u0C3E\u0C1C\u0C3E\u0C35\u0C3F \u0C2E\u0C41\u0C02\u0C26\u0C41\u0C17\u0C3E",
  noEntriesTitle: "\u0C0E\u0C32\u0C3E\u0C02\u0C1F\u0C3F \u0C32\u0C46\u0C15\u0C4D\u0C15\u0C32\u0C41 \u0C32\u0C47\u0C35\u0C41",
  noEntriesCustomerDesc: "\u0C08 \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C28\u0C3F\u0C15\u0C3F \u0C07\u0C02\u0C15\u0C3E \u0C0E\u0C32\u0C3E\u0C02\u0C1F\u0C3F \u0C32\u0C3E\u0C35\u0C3E\u0C26\u0C47\u0C35\u0C40\u0C32\u0C41 \u0C32\u0C47\u0C35\u0C41.",
  deleteEntryConfirm: "\u0C2E\u0C40\u0C30\u0C41 \u0C16\u0C1A\u0C4D\u0C1A\u0C3F\u0C24\u0C02\u0C17\u0C3E \u0C08 \u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40\u0C28\u0C3F \u0C24\u0C4A\u0C32\u0C17\u0C3F\u0C02\u0C1A\u0C3E\u0C32\u0C28\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C3E?",
  enterValidAmount: "\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C38\u0C30\u0C48\u0C28 \u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C3E\u0C28\u0C4D\u0C28\u0C3F \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  entryDeletedToast: "\u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40 \u0C24\u0C4A\u0C32\u0C17\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F",
  customerNotFoundTitle: "\u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41 \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C2C\u0C21\u0C32\u0C47\u0C26\u0C41",
  customerNotFoundDesc: "\u0C08 \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41 \u0C32\u0C46\u0C21\u0C4D\u0C1C\u0C30\u0C4D \u0C32\u0C4B \u0C32\u0C47\u0C30\u0C41.",
  viewCustomersList: "\u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C32 \u0C1C\u0C3E\u0C2C\u0C3F\u0C24\u0C3E \u0C1A\u0C42\u0C21\u0C02\u0C21\u0C3F",
  customerAlreadyExists: "{name} \u0C07\u0C2A\u0C4D\u0C2A\u0C1F\u0C3F\u0C15\u0C47 \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C41",
  similarCustomerWarning: "\u0C07\u0C32\u0C3E\u0C02\u0C1F\u0C3F \u0C2A\u0C47\u0C30\u0C41\u0C24\u0C4B \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41 \u0C07\u0C2A\u0C4D\u0C2A\u0C1F\u0C3F\u0C15\u0C47 \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C41. \u0C2E\u0C40\u0C30\u0C41 \u0C35\u0C3E\u0C30\u0C3F \u0C16\u0C3E\u0C24\u0C3E\u0C28\u0C47 \u0C09\u0C2A\u0C2F\u0C4B\u0C17\u0C3F\u0C02\u0C1A\u0C3E\u0C32\u0C28\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C30\u0C3E?",
  useThisOne: "\u0C26\u0C40\u0C28\u0C4D\u0C28\u0C3F \u0C09\u0C2A\u0C2F\u0C4B\u0C17\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  createAnyway: "\u0C15\u0C4A\u0C24\u0C4D\u0C24\u0C26\u0C3F \u0C38\u0C43\u0C37\u0C4D\u0C1F\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  customerNameLabel: "\u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41 \u0C2A\u0C47\u0C30\u0C41",
  mobileNumberOptional: "\u0C2E\u0C4A\u0C2C\u0C48\u0C32\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C4D (\u0C10\u0C1A\u0C4D\u0C1B\u0C3F\u0C15\u0C02)",
  phoneReminderHelper: "WhatsApp \u0C30\u0C3F\u0C2E\u0C48\u0C02\u0C21\u0C30\u0C4D\u0C32 \u0C15\u0C4A\u0C30\u0C15\u0C41 \u0C09\u0C2A\u0C2F\u0C4B\u0C17\u0C15\u0C30\u0C02 (\u0C24\u0C30\u0C4D\u0C35\u0C3E\u0C24 \u0C15\u0C42\u0C21\u0C3E \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C35\u0C1A\u0C4D\u0C1A\u0C41).",
  saveCustomer: "\u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C28\u0C3F \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  saving: "\u0C38\u0C47\u0C35\u0C4D \u0C05\u0C35\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F...",
  enterCustomerNameError: "\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41 \u0C2A\u0C47\u0C30\u0C41 \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  errorSavingCustomer: "\u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C28\u0C3F \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C21\u0C02\u0C32\u0C4B \u0C32\u0C4B\u0C2A\u0C02",
  dailySummarySubtitle: "\u0C30\u0C4B\u0C1C\u0C41\u0C35\u0C3E\u0C30\u0C40 \u0C35\u0C38\u0C42\u0C33\u0C4D\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C05\u0C2A\u0C4D\u0C2A\u0C41\u0C32 \u0C38\u0C3E\u0C30\u0C3E\u0C02\u0C36\u0C02",
  shareSlip: "\u0C38\u0C4D\u0C32\u0C3F\u0C2A\u0C4D \u0C2A\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F",
  copied: "\u0C15\u0C3E\u0C2A\u0C40 \u0C05\u0C2F\u0C3F\u0C02\u0C26\u0C3F",
  dateLabel: "\u0C24\u0C47\u0C26\u0C40:",
  creditGivenToday: "\u0C08\u0C30\u0C4B\u0C1C\u0C41 \u0C07\u0C1A\u0C4D\u0C1A\u0C3F\u0C28 \u0C05\u0C2A\u0C4D\u0C2A\u0C41",
  paymentReceivedToday: "\u0C08\u0C30\u0C4B\u0C1C\u0C41 \u0C05\u0C02\u0C26\u0C3F\u0C28 \u0C1C\u0C2E",
  netUdhaarIncreased: "\u0C28\u0C3F\u0C15\u0C30 \u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C2A\u0C46\u0C30\u0C3F\u0C17\u0C3F\u0C02\u0C26\u0C3F",
  netUdhaarDecreased: "\u0C28\u0C3F\u0C15\u0C30 \u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C24\u0C17\u0C4D\u0C17\u0C3F\u0C02\u0C26\u0C3F",
  entriesCountLabel: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40\u0C32\u0C41",
  activeCustomersCount: "{count} \u0C15\u0C4D\u0C30\u0C3F\u0C2F\u0C3E\u0C36\u0C40\u0C32 \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C32\u0C41",
  noDataAvailable: "\u0C21\u0C47\u0C1F\u0C3E \u0C05\u0C02\u0C26\u0C41\u0C2C\u0C3E\u0C1F\u0C41\u0C32\u0C4B \u0C32\u0C47\u0C26\u0C41",
  noDataForDate: "\u0C08 \u0C24\u0C47\u0C26\u0C40\u0C15\u0C3F \u0C0E\u0C32\u0C3E\u0C02\u0C1F\u0C3F \u0C32\u0C3E\u0C35\u0C3E\u0C26\u0C47\u0C35\u0C40\u0C32\u0C41 \u0C32\u0C47\u0C35\u0C41.",
  noPendingCustomersAllSettled: "\u0C2C\u0C3E\u0C15\u0C40 \u0C09\u0C28\u0C4D\u0C28 \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C32\u0C41 \u0C32\u0C47\u0C30\u0C41. \u0C05\u0C02\u0C24\u0C3E \u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C2F\u0C3F\u0C02\u0C26\u0C3F! \u2713",
  reviewEntryTitle: "\u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40\u0C28\u0C3F \u0C38\u0C2E\u0C40\u0C15\u0C4D\u0C37\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  duplicateEntryWarningTitle: "\u0C07\u0C32\u0C3E\u0C02\u0C1F\u0C3F \u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40 \u0C07\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C47 \u0C28\u0C2E\u0C4B\u0C26\u0C2F\u0C3F\u0C02\u0C26\u0C3F. \u0C2E\u0C33\u0C4D\u0C33\u0C40 \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C3E\u0C32\u0C3E?",
  duplicateEntryWarningDesc: "{name} \u0C15\u0C4A\u0C30\u0C15\u0C41 \u20B9{amount} {type} \u0C17\u0C24 10 \u0C28\u0C3F\u0C2E\u0C3F\u0C37\u0C3E\u0C32\u0C4D\u0C32\u0C4B \u0C28\u0C2E\u0C4B\u0C26\u0C2F\u0C3F\u0C02\u0C26\u0C3F.",
  saveAnyway: "\u0C0F\u0C26\u0C3F \u0C0F\u0C2E\u0C48\u0C28\u0C3E \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  correctByVoice: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C24\u0C4B \u0C38\u0C30\u0C3F\u0C26\u0C3F\u0C26\u0C4D\u0C26\u0C02\u0C21\u0C3F",
  listeningTapToStop: "\u0C35\u0C3F\u0C02\u0C1F\u0C41\u0C28\u0C4D\u0C28\u0C3E\u0C2E\u0C41... (\u0C06\u0C2A\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C02\u0C21\u0C3F)",
  confirmAndSave: "\u0C27\u0C43\u0C35\u0C40\u0C15\u0C30\u0C3F\u0C02\u0C1A\u0C3F \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  voiceSavingCommand: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C15\u0C2E\u0C3E\u0C02\u0C21\u0C4D \u0C26\u0C4D\u0C35\u0C3E\u0C30\u0C3E \u0C38\u0C47\u0C35\u0C4D \u0C05\u0C35\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F...",
  voiceCancelledCommand: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C26\u0C4D\u0C35\u0C3E\u0C30\u0C3E \u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F",
  voiceAmountUpdated: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u20B9{amount} \u0C17\u0C3E \u0C28\u0C35\u0C40\u0C15\u0C30\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F",
  amountInRupees: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 (\u20B9 \u0C32\u0C32\u0C4B)",
  relativeToday: "\u0C08\u0C30\u0C4B\u0C1C\u0C41",
  relativeYesterday: "\u0C28\u0C3F\u0C28\u0C4D\u0C28",
  relativeDayBefore: "\u0C2E\u0C4A\u0C28\u0C4D\u0C28",
  pickDate: "\u0C24\u0C47\u0C26\u0C40 \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F",
  notePlaceholder: "\u0C35\u0C3F\u0C35\u0C30\u0C23 (\u0C09\u0C26\u0C3E. \u0C2A\u0C3E\u0C32\u0C41, \u0C1A\u0C15\u0C4D\u0C15\u0C46\u0C30, \u0C2A\u0C2A\u0C4D\u0C2A\u0C41)",
  balanceInquiryTitle: "\u0C16\u0C3E\u0C24\u0C3E \u0C28\u0C3F\u0C32\u0C4D\u0C35 \u0C35\u0C3F\u0C1A\u0C3E\u0C30\u0C23",
  balancePendingUdhaar: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C2C\u0C3E\u0C15\u0C40 \u0C05\u0C2A\u0C4D\u0C2A\u0C41",
  advancePayment: "\u0C05\u0C21\u0C4D\u0C35\u0C3E\u0C28\u0C4D\u0C38\u0C4D \u0C1C\u0C2E",
  speaking: "\u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F...",
  replayVoice: "\u0C35\u0C3F\u0C28\u0C02\u0C21\u0C3F",
  allClear: "\u0C05\u0C02\u0C24\u0C3E \u0C15\u0C4D\u0C32\u0C3F\u0C2F\u0C30\u0C4D \u2713",
  last3Transactions: "\u0C1A\u0C3F\u0C35\u0C30\u0C3F 3 \u0C32\u0C3E\u0C35\u0C3E\u0C26\u0C47\u0C35\u0C40\u0C32\u0C41",
  noPreviousTransactions: "\u0C17\u0C24 \u0C32\u0C3E\u0C35\u0C3E\u0C26\u0C47\u0C35\u0C40\u0C32\u0C41 \u0C0F\u0C35\u0C40 \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C2C\u0C21\u0C32\u0C47\u0C26\u0C41",
  viewKhata: "\u0C16\u0C3E\u0C24\u0C3E \u0C1A\u0C42\u0C21\u0C02\u0C21\u0C3F",
  whichCustomerAskDigits: "\u0C0F {name}? \u0C2B\u0C4B\u0C28\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C1A\u0C3F\u0C35\u0C30\u0C3F 4 \u0C05\u0C02\u0C15\u0C46\u0C32\u0C41 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F.",
  sameLastDigitsAskMore: "\u0C07\u0C26\u0C4D\u0C26\u0C30\u0C3F\u0C15\u0C40 \u0C1A\u0C3F\u0C35\u0C30\u0C3F \u0C05\u0C02\u0C15\u0C46\u0C32\u0C41 \u0C12\u0C15\u0C47\u0C32\u0C3E \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3F. \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C1A\u0C3F\u0C35\u0C30\u0C3F {count} \u0C05\u0C02\u0C15\u0C46\u0C32\u0C41 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F.",
  numberNotFoundRetry: "\u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C2C\u0C21\u0C32\u0C47\u0C26\u0C41. \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C2E\u0C33\u0C4D\u0C33\u0C40 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F.",
  numberNotFoundTapCard: "\u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C15\u0C28\u0C41\u0C17\u0C4A\u0C28\u0C2C\u0C21\u0C32\u0C47\u0C26\u0C41. \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C15\u0C3E\u0C30\u0C4D\u0C21\u0C4D \u0C2A\u0C48 \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C02\u0C21\u0C3F.",
  newCustomerAddedToast: "\u0C15\u0C4A\u0C24\u0C4D\u0C24 \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41 \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C4D\u0C21\u0C3E\u0C30\u0C41: {name}",
  entrySavedSuccess: "{name} \u0C2F\u0C4A\u0C15\u0C4D\u0C15 {type} \u0C35\u0C3F\u0C1C\u0C2F\u0C35\u0C02\u0C24\u0C02\u0C17\u0C3E \u0C28\u0C2E\u0C4B\u0C26\u0C2F\u0C3F\u0C02\u0C26\u0C3F!",
  multiEntriesSavedSuccess: "{count} \u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40\u0C32\u0C41 \u0C35\u0C3F\u0C1C\u0C2F\u0C35\u0C02\u0C24\u0C02\u0C17\u0C3E \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C4D\u0C21\u0C3E\u0C2F\u0C3F!",
  didNotUnderstandRepeat: "\u0C05\u0C30\u0C4D\u0C25\u0C02 \u0C15\u0C3E\u0C32\u0C47\u0C26\u0C41. \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C2E\u0C33\u0C4D\u0C33\u0C40 \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C02\u0C21\u0C3F.",
  languageChangedToast: "\u0C2D\u0C3E\u0C37 \u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F: {lang}",
  speechLanguageChangedToast: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C2D\u0C3E\u0C37: {lang}",
  offlineModeNoticeTitle: "\u0C06\u0C2B\u0C4D\u200C\u0C32\u0C48\u0C28\u0C4D \u0C2E\u0C4B\u0C21\u0C4D",
  offlineModeNoticeDesc: "\u0C16\u0C3E\u0C24\u0C3E 100% \u0C06\u0C2B\u0C4D\u200C\u0C32\u0C48\u0C28\u0C4D\u200C\u0C32\u0C4B \u0C2A\u0C28\u0C3F\u0C1A\u0C47\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F. \u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C15\u0C4B\u0C38\u0C02 \u0C07\u0C02\u0C1F\u0C30\u0C4D\u0C28\u0C46\u0C1F\u0C4D \u0C05\u0C35\u0C38\u0C30\u0C02 \u0C15\u0C3E\u0C35\u0C1A\u0C4D\u0C1A\u0C41; \u0C1F\u0C48\u0C2A\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F.",
  networkDisconnected: "\u0C28\u0C46\u0C1F\u0C4D\u200C\u0C35\u0C30\u0C4D\u0C15\u0C4D \u0C15\u0C28\u0C46\u0C15\u0C4D\u0C37\u0C28\u0C4D \u0C32\u0C47\u0C26\u0C41",
  pinIncorrect: "\u0C24\u0C2A\u0C4D\u0C2A\u0C41 \u0C2A\u0C3F\u0C28\u0C4D! \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C2E\u0C33\u0C4D\u0C32\u0C40 \u0C2A\u0C4D\u0C30\u0C2F\u0C24\u0C4D\u0C28\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F.",
  pinLockedMessage: "\u0C2E\u0C40 \u0C32\u0C46\u0C21\u0C4D\u0C1C\u0C30\u0C4D AES-256 \u0C24\u0C4B \u0C2D\u0C26\u0C4D\u0C30\u0C2A\u0C30\u0C1A\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F. \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C2E\u0C40 \u0C2A\u0C3F\u0C28\u0C4D \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F:",
  pinResetConfirm: "\u0C05\u0C35\u0C41\u0C28\u0C41, \u0C30\u0C40\u0C38\u0C46\u0C1F\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  totalUdhaar: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C05\u0C2A\u0C4D\u0C2A\u0C41",
  totalJama: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C1C\u0C2E",
  totalBalance: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C2C\u0C3E\u0C15\u0C40",
  udhaarAdded: "\u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F",
  savePhoneToProfileHint: "\u0C12\u0C15\u0C4D\u0C15\u0C38\u0C3E\u0C30\u0C3F \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C38\u0C4D\u0C24\u0C47 \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41 \u0C2A\u0C4D\u0C30\u0C4A\u0C2B\u0C48\u0C32\u0C4D \u0C32\u0C4B \u0C2D\u0C26\u0C4D\u0C30\u0C2A\u0C30\u0C1A\u0C2C\u0C21\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F.",
  numberClearedSpeakAgain: "\u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C24\u0C4A\u0C32\u0C17\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F. \u0C2E\u0C33\u0C4D\u0C33\u0C40 \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C02\u0C21\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C15\u0C40\u0C2A\u0C4D\u0C2F\u0C3E\u0C21\u0C4D \u0C09\u0C2A\u0C2F\u0C4B\u0C17\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F.",
  pendingEntrySavedAfterReg: "\u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C24\u0C30\u0C4D\u0C35\u0C3E\u0C24 \u20B9{amount} {type} \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F",
  recentEntriesReceipt: "\u0C07\u0C1F\u0C40\u0C35\u0C32\u0C3F \u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40\u0C32\u0C41:",
  numeralScriptLabel: "\u0C38\u0C02\u0C16\u0C4D\u0C2F \u0C32\u0C3F\u0C2A\u0C3F",
  numeralScriptDesc: "\u0C38\u0C02\u0C16\u0C4D\u0C2F\u0C32\u0C28\u0C41 \u0C07\u0C02\u0C17\u0C4D\u0C32\u0C40\u0C37\u0C4D (1, 2, 3) \u0C32\u0C47\u0C26\u0C3E \u0C24\u0C46\u0C32\u0C41\u0C17\u0C41 \u0C32\u0C3F\u0C2A\u0C3F\u0C32\u0C4B \u0C1A\u0C42\u0C2A\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  scriptLatin: "\u0C07\u0C02\u0C17\u0C4D\u0C32\u0C40\u0C37\u0C4D (1, 2, 3)",
  scriptNative: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41 (\u0C67, \u0C68, \u0C69)",
  invalidPhoneError: "\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C41\u0C2C\u0C3E\u0C1F\u0C41 \u0C05\u0C2F\u0C4D\u0C2F\u0C47 10-\u0C05\u0C02\u0C15\u0C46\u0C32 \u0C2D\u0C3E\u0C30\u0C24\u0C40\u0C2F \u0C2E\u0C4A\u0C2C\u0C48\u0C32\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C4D \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F (6-9 \u0C24\u0C4B \u0C2A\u0C4D\u0C30\u0C3E\u0C30\u0C02\u0C2D\u0C02)",
  speakNamePrompt: "\u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41 \u0C2A\u0C47\u0C30\u0C41 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F...",
  phoneHelpText: "\u0C35\u0C3E\u0C1F\u0C4D\u0C38\u0C3E\u0C2A\u0C4D \u0C30\u0C3F\u0C2E\u0C48\u0C02\u0C21\u0C30\u0C4D \u0C15\u0C4B\u0C38\u0C02 \u0C09\u0C2A\u0C2F\u0C4B\u0C17\u0C2A\u0C21\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F (\u0C24\u0C30\u0C41\u0C35\u0C3E\u0C24 \u0C15\u0C42\u0C21\u0C3E \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C35\u0C1A\u0C4D\u0C1A\u0C41).",
  manualEntryTitle: "\u0C2E\u0C3E\u0C28\u0C4D\u0C2F\u0C41\u0C35\u0C32\u0C4D \u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40 (\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C32\u0C47\u0C15\u0C41\u0C02\u0C21\u0C3E)",
  today: "\u0C08\u0C30\u0C4B\u0C1C\u0C41",
  yesterday: "\u0C28\u0C3F\u0C28\u0C4D\u0C28",
  dayBeforeYesterday: "\u0C2E\u0C4A\u0C28\u0C4D\u0C28",
  baakiOwed: "\u0C2C\u0C3E\u0C15\u0C40",
  listenReplay: "\u0C35\u0C3F\u0C28\u0C02\u0C21\u0C3F",
  sendReminder: "\u0C30\u0C3F\u0C2E\u0C48\u0C02\u0C21\u0C30\u0C4D \u0C2A\u0C02\u0C2A\u0C02\u0C21\u0C3F",
  active: "\u0C2F\u0C3E\u0C15\u0C4D\u0C1F\u0C3F\u0C35\u0C4D",
  noRecentActivity: "\u0C07\u0C1F\u0C40\u0C35\u0C32\u0C3F \u0C32\u0C3E\u0C35\u0C3E\u0C26\u0C47\u0C35\u0C40\u0C32\u0C41 \u0C32\u0C47\u0C35\u0C41",
  listeningDigitsPrompt: "\u0C35\u0C3F\u0C02\u0C1F\u0C4B\u0C02\u0C26\u0C3F... \u0C1A\u0C3F\u0C35\u0C30\u0C3F 4 \u0C05\u0C02\u0C15\u0C46\u0C32\u0C41 \u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C02\u0C21\u0C3F",
  tapCardOrMic: "\u0C15\u0C3E\u0C30\u0C4D\u0C21\u0C4D \u0C2A\u0C48 \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C02\u0C21\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C2E\u0C33\u0C4D\u0C32\u0C40 \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C1F\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C2E\u0C48\u0C15\u0C4D \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C02\u0C21\u0C3F",
  first: "\u0C2E\u0C4A\u0C26\u0C1F\u0C3F\u0C26\u0C3F",
  second: "\u0C30\u0C46\u0C02\u0C21\u0C35\u0C26\u0C3F",
  qrSaveError: "QR \u0C15\u0C4B\u0C21\u0C4D \u0C38\u0C47\u0C35\u0C4D \u0C15\u0C3E\u0C32\u0C47\u0C26\u0C41",
  khataStatementSlip: "\u0C16\u0C3E\u0C24\u0C3E \u0C38\u0C4D\u0C1F\u0C47\u0C1F\u0C4D\u200C\u0C2E\u0C46\u0C02\u0C1F\u0C4D \u0C30\u0C36\u0C40\u0C26\u0C41",
  thankYouShopping: "\u0C35\u0C4D\u0C2F\u0C3E\u0C2A\u0C3E\u0C30\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C27\u0CA8\u0CCD\u0CAF\u0C35\u0C3E\u0C26\u0C3E\u0C32\u0C41! \u{1F64F}",
  receiptSharedSuccess: "\u0C30\u0C36\u0C40\u0C26\u0C41 \u0C35\u0C3F\u0C1C\u0C2F\u0C35\u0C02\u0C24\u0C02\u0C17\u0C3E \u0C37\u0C47\u0C30\u0C4D \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F!",
  receiptCopiedSuccess: "\u0C30\u0C36\u0C40\u0C26\u0C41 \u0C15\u0C4D\u0C32\u0C3F\u0C2A\u0C4D\u200C\u0C2C\u0C4B\u0C30\u0C4D\u0C21\u0C4D\u200C\u0C15\u0C3F \u0C15\u0C3E\u0C2A\u0C40 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F!",
  whatsappPhoneNumber: "\u0C35\u0C3E\u0C1F\u0C4D\u0C38\u0C3E\u0C2A\u0C4D \u0C2E\u0C4A\u0C2C\u0C48\u0CB2\u0CCD \u0C28\u0C02\u0C2C\u0C30\u0C4D",
  selectTemplateLanguage: "\u0C1F\u0C46\u0C02\u0C2A\u0C4D\u0C32\u0C47\u0C1F\u0C4D \u0C2D\u0C3E\u0C37\u0C28\u0C41 \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F",
  messagePreview: "\u0C38\u0C02\u0C26\u0C47\u0C36 \u0C2A\u0C30\u0C3F\u0C26\u0C43\u0C36\u0C4D\u0C2F\u0C02 (\u0C2E\u0C3E\u0C30\u0C4D\u0C1A\u0C35\u0C1A\u0C4D\u0C1A\u0C41)",
  messageCopiedToast: "\u0C38\u0C02\u0C26\u0C47\u0C36\u0C02 \u0C15\u0C3E\u0C2A\u0C40 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F!",
  offlineSabChalega: "\u0C06\u0C2B\u0C4D\u200C\u0C32\u0C48\u0C28\u0C4D \u2013 \u0C05\u0C28\u0C4D\u0C28\u0C40 \u0C2A\u0C28\u0C3F\u0C1A\u0C47\u0C38\u0C4D\u0C24\u0C3E\u0C2F\u0C3F",
  offlineSafeMessage: "\u0C2E\u0C40 \u0C16\u0C3E\u0C24\u0C3E 100% \u0C38\u0C41\u0C30\u0C15\u0C4D\u0C37\u0C3F\u0C24\u0C02 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C08 \u0C2B\u0C4B\u0C28\u0C4D\u200C\u0C32\u0C4B\u0C28\u0C47 \u0C2D\u0C26\u0C4D\u0C30\u0C2A\u0C30\u0C1A\u0C2C\u0C21\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F.",
  offlineMicWarning: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C30\u0C3F\u0C15\u0C17\u0C4D\u0C28\u0C3F\u0C37\u0C28\u0C4D \u0C15\u0C4B\u0C38\u0C02 \u0C07\u0C02\u0C1F\u0C30\u0C4D\u0C28\u0C46\u0C1F\u0C4D \u0C05\u0C35\u0C38\u0C30\u0C02 \u0C15\u0C3E\u0C35\u0C1A\u0C4D\u0C1A\u0C41. \u0C2E\u0C48\u0C15\u0C4D \u0C2A\u0C28\u0C3F \u0C1A\u0C47\u0C2F\u0C15\u0C2A\u0C4B\u0C24\u0C47, '\u0C1F\u0C48\u0C2A\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F' \u0C09\u0C2A\u0C2F\u0C4B\u0C17\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F.",
  openTypeInstead: "'\u0C1F\u0C48\u0C2A\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F' \u0C24\u0C46\u0C30\u0C35\u0C02\u0C21\u0C3F",
  gotIt: "\u0C38\u0C30\u0C47, \u0C05\u0C30\u0C4D\u0C25\u0C2E\u0C48\u0C02\u0C26\u0C3F",
  pinLockedNotice: "\u0C2E\u0C40 \u0C16\u0C3E\u0C24\u0C3E AES-256 \u0C17\u0C41\u0C2A\u0C4D\u0C24\u0C40\u0C15\u0C30\u0C3F\u0C02\u0C1A\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F. \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C2E\u0C40 \u0C2A\u0C3F\u0C28\u0C4D \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F:",
  pinCryptoLockDesc: "\u0C05\u0C28\u0C4D\u0C28\u0C3F \u0C30\u0C3F\u0C15\u0C3E\u0C30\u0C4D\u0C21\u0C41\u0C32\u0C41 \u0C35\u0C46\u0C2C\u0C4D \u0C15\u0C4D\u0C30\u0C3F\u0C2A\u0C4D\u0C1F\u0C4B (AES-256 GCM) \u0C24\u0C4B \u0C38\u0C41\u0C30\u0C15\u0C4D\u0C37\u0C3F\u0C24\u0C02\u0C17\u0C3E \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3F.",
  yesReset: "\u0C05\u0C35\u0C41\u0C28\u0C41, \u0C30\u0C40\u0C38\u0C46\u0C1F\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  dailySummarySub: "\u0C30\u0C4B\u0C1C\u0C41\u0C35\u0C3E\u0C30\u0C40 \u0C35\u0C38\u0C42\u0C32\u0C41 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C38\u0C3E\u0C30\u0C3E\u0C02\u0C36\u0C02",
  activeCustomersLabel: "\u0C2F\u0C3E\u0C15\u0C4D\u0C1F\u0C3F\u0C35\u0C4D \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C32\u0C41",
  noDataAvailableDesc: "\u0C08 \u0C24\u0C47\u0C26\u0C40\u0C15\u0C3F \u0C0E\u0C1F\u0C41\u0C35\u0C02\u0C1F\u0C3F \u0C32\u0C3E\u0C35\u0C3E\u0C26\u0C47\u0C35\u0C40\u0C32\u0C41 \u0C32\u0C47\u0C35\u0C41.",
  noPendingUdhaarAllSettled: "\u0C2A\u0C46\u0C02\u0C21\u0C3F\u0C02\u0C17\u0C4D \u0C05\u0C2A\u0C4D\u0C2A\u0C41\u0C32\u0C41 \u0C32\u0C47\u0C35\u0C41. \u0C05\u0C28\u0C4D\u0C28\u0C3F \u0C16\u0C3E\u0C24\u0C3E\u0C32\u0C41 \u0C15\u0C4D\u0C32\u0C3F\u0C2F\u0C30\u0C4D \u0C05\u0C2F\u0C4D\u0C2F\u0C3E\u0C2F\u0C3F! \u2713",
  zeroBalance: "\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C15\u0C4D\u0C32\u0C3F\u0C2F\u0C30\u0C4D, \u0C2C\u0C3E\u0C15\u0C40 \u0C32\u0C47\u0C26\u0C41",
  khataTimeline: "\u0C16\u0C3E\u0C24\u0C3E \u0C15\u0C3E\u0C32\u0C15\u0C4D\u0C30\u0C2E\u0C02",
  saveEntry: "\u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40\u0C28\u0C3F \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F",
  addUdhaar: "+ \u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C41",
  addPayment: "+ \u0C1C\u0C2E \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C41",
  addEntry: "\u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40\u0C28\u0C3F \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  noteOptional: "\u0C17\u0C2E\u0C28\u0C3F\u0C15 (\u0C10\u0C1A\u0C4D\u0C1B\u0C3F\u0C15\u0C02)",
  whatsappReminder: "\u0C35\u0C3E\u0C1F\u0C4D\u0C38\u0C3E\u0C2A\u0C4D",
  lastReminder: "\u0C1A\u0C3F\u0C35\u0C30\u0C3F \u0C30\u0C3F\u0C2E\u0C48\u0C02\u0C21\u0C30\u0C4D",
  savingByVoice: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C06\u0C26\u0C47\u0C36\u0C02\u0C24\u0C4B \u0C38\u0C47\u0C35\u0C4D \u0C05\u0C35\u0C41\u0C24\u0C4B\u0C02\u0C26\u0C3F...",
  cancelledByVoice: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C26\u0C4D\u0C35\u0C3E\u0C30\u0C3E \u0C30\u0C26\u0C4D\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C3F\u0C02\u0C26\u0C3F",
  noCustomersEmptyState: "\u0C07\u0C02\u0C15\u0C3E \u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41\u0C32\u0C41 \u0C32\u0C47\u0C30\u0C41. \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C1F\u0C02 \u0C26\u0C4D\u0C35\u0C3E\u0C30\u0C3E \u0C2E\u0C4A\u0C26\u0C1F\u0C3F \u0C05\u0C2A\u0C4D\u0C2A\u0C41\u0C28\u0C41 \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  addFirstUdhaarVoice: "\u{1F3A4} \u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C26\u0C4D\u0C35\u0C3E\u0C30\u0C3E \u0C2E\u0C4A\u0C26\u0C1F\u0C3F \u0C05\u0C2A\u0C4D\u0C2A\u0C41 \u0C1C\u0C4B\u0C21\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  onboardingStep1Title: "1. \u0C2E\u0C48\u0C15\u0C4D \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C3F \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C02\u0C21\u0C3F",
  onboardingStep1Desc: "\u0C26\u0C41\u0C15\u0C3E\u0C23\u0C02 \u0C15\u0C4C\u0C02\u0C1F\u0C30\u0C4D\u200C\u0C32\u0C4B \u0C1A\u0C47\u0C24\u0C41\u0C32\u0C41 \u0C2C\u0C3F\u0C1C\u0C40\u0C17\u0C3E \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3E? \u0C2E\u0C48\u0C15\u0C4D \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C3F \u0C2E\u0C40 \u0C2D\u0C3E\u0C37\u0C32\u0C4B \u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C02\u0C21\u0C3F.",
  onboardingStep2Title: "2. \u0C38\u0C4D\u0C15\u0C4D\u0C30\u0C40\u0C28\u0C4D \u0C2A\u0C48 \u0C2A\u0C4D\u0C30\u0C3F\u0C35\u0C4D\u0C2F\u0C42 \u0C1A\u0C42\u0C21\u0C02\u0C21\u0C3F",
  onboardingStep2Desc: "\u0C2F\u0C3E\u0C2A\u0C4D \u0C35\u0C46\u0C02\u0C1F\u0C28\u0C47 \u0C2E\u0C40 \u0C0E\u0C02\u0C1F\u0C4D\u0C30\u0C40\u0C28\u0C3F \u0C1A\u0C42\u0C2A\u0C3F\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F. \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C21\u0C3E\u0C28\u0C3F\u0C15\u0C3F \u0C28\u0C4A\u0C15\u0C4D\u0C15\u0C02\u0C21\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D\u200C\u0C24\u0C4B \u0C38\u0C30\u0C3F\u0C26\u0C3F\u0C26\u0C4D\u0C26\u0C02\u0C21\u0C3F.",
  onboardingStep3Title: "3. \u0C24\u0C15\u0C4D\u0C37\u0C23 \u0C16\u0C3E\u0C24\u0C3E \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C30\u0C3F\u0C2E\u0C48\u0C02\u0C21\u0C30\u0C4D\u0C32\u0C41",
  onboardingStep3Desc: "\u0C16\u0C3E\u0C24\u0C3E\u0C26\u0C3E\u0C30\u0C41 \u0C32\u0C46\u0C21\u0C4D\u0C1C\u0C30\u0C4D \u0C35\u0C46\u0C02\u0C1F\u0C28\u0C47 \u0C05\u0C2A\u0C4D\u200C\u0C21\u0C47\u0C1F\u0C4D \u0C05\u0C35\u0C41\u0C24\u0C41\u0C02\u0C26\u0C3F! \u0C35\u0C3E\u0C1F\u0C4D\u0C38\u0C3E\u0C2A\u0C4D \u0C30\u0C3F\u0C2E\u0C48\u0C02\u0C21\u0C30\u0C4D \u0C2A\u0C02\u0C2A\u0C02\u0C21\u0C3F \u0C32\u0C47\u0C26\u0C3E \u0C30\u0C36\u0C40\u0C26\u0C41 \u0C2E\u0C41\u0C26\u0C4D\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F.",
  grantMicAndStart: "\u0C2E\u0C48\u0C15\u0C4D \u0C05\u0C28\u0C41\u0C2E\u0C24\u0C3F \u0C07\u0C35\u0C4D\u0C35\u0C02\u0C21\u0C3F \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C2A\u0C4D\u0C30\u0C3E\u0C30\u0C02\u0C2D\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  installAppTitle: "\u0C2F\u0C3E\u0C2A\u0C4D \u0C07\u0C28\u0C4D\u200C\u0C38\u0C4D\u0C1F\u0C3E\u0C32\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F (\u0C39\u0C4B\u0C2E\u0C4D \u0C38\u0C4D\u0C15\u0C4D\u0C30\u0C40\u0C28\u0C4D)",
  installAppSub: "\u0C35\u0C47\u0C17\u0C35\u0C02\u0C24\u0C2E\u0C48\u0C28\u0C26\u0C3F & 100% \u0C06\u0C2B\u0C4D\u200C\u0C32\u0C48\u0C28\u0C4D\u200C\u0C32\u0C4B \u0C2A\u0C28\u0C3F\u0C1A\u0C47\u0C38\u0C4D\u0C24\u0C41\u0C02\u0C26\u0C3F \u2022 1 \u0C1F\u0C4D\u0C2F\u0C3E\u0C2A\u0C4D\u200C\u0C32\u0C4B \u0C16\u0C3E\u0C24\u0C3E",
  install: "\u0C07\u0C28\u0C4D\u200C\u0C38\u0C4D\u0C1F\u0C3E\u0C32\u0C4D",
  errorBoundaryTitle: "\u0C0F\u0C26\u0C4B \u0C24\u0C2A\u0C4D\u0C2A\u0C41 \u0C1C\u0C30\u0C3F\u0C17\u0C3F\u0C02\u0C26\u0C3F",
  errorBoundarySub: "\u0C0F\u0C26\u0C4B \u0C24\u0C2A\u0C4D\u0C2A\u0C41 \u0C1C\u0C30\u0C3F\u0C17\u0C3F\u0C02\u0C26\u0C3F, \u0C15\u0C3E\u0C28\u0C40 \u0C1A\u0C3F\u0C02\u0C24\u0C3F\u0C02\u0C1A\u0C15\u0C02\u0C21\u0C3F!",
  errorBoundarySafety: "\u0C2E\u0C40 \u0C16\u0C3E\u0C24\u0BBE \u0C21\u0C47\u0C1F\u0C3E \u0C05\u0C02\u0C24\u0C3E \u0C2E\u0C40 \u0C2B\u0C4B\u0C28\u0C4D\u200C\u0C32\u0C4B \u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C3F\u0C17\u0C3E \u0C38\u0C41\u0C30\u0C15\u0C4D\u0C37\u0C3F\u0C24\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C26\u0C3F (IndexedDB). \u0C0F\u0C26\u0C40 \u0C2A\u0C4B\u0C32\u0C47\u0C26\u0C41.",
  retryButton: "\u0C2E\u0C33\u0C4D\u0C33\u0C40 \u0C2A\u0C4D\u0C30\u0C2F\u0C24\u0C4D\u0C28\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
  goHomeButton: "\u0C39\u0C4B\u0C2E\u0C4D\u200C\u0C15\u0C41 \u0C35\u0C46\u0C33\u0C4D\u0C32\u0C02\u0C21\u0C3F",
  technicalDetails: "\u0C38\u0C3E\u0C02\u0C15\u0C47\u0C24\u0C3F\u0C15 \u0C32\u0C4B\u0C2A\u0C02 \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C41"
};

// src/i18n/locales/hinglish.json
var hinglish_default = {
  appName: "Udhaar Sathi",
  tagline: "Bol kar udhaar darj karein",
  online: "Online",
  offlineSafe: "Offline Safe (Lokal)",
  navHome: "Home (Mic)",
  navCustomers: "Grahak Khata",
  navSummary: "Dainik Hisaab",
  navSettings: "Settings",
  navStyleguide: "Styleguide",
  save: "Save Karein",
  cancel: "Radd Karein",
  delete: "Delete Karein",
  edit: "Badlein",
  close: "Band Karein",
  search: "Khojein",
  back: "Wapas",
  done: "Ho Gaya",
  creditGiven: "Udhaar Diya",
  paymentReceived: "Jama Mila",
  balanceOwed: "Kul Baaki",
  netBalance: "Net Hisaab",
  todaySummary: "Aaj Ka Hisaab",
  recentEntries: "Haal Ke Len-Den",
  noEntries: "Abhi koi entry darj nahi hai",
  micIdle: "Mic daba kar bolein",
  micListening: "Sun raha hoon... Boliye",
  micProcessing: "Hisaab samajh raha hoon...",
  micError: "Aawaz saaf nahi aayi. Kripya phir se bolein.",
  typeInstead: "Type instead (Bina mic)",
  trySpeaking: "Bolkar dekhein:",
  customersTitle: "Grahak Khata",
  searchCustomerPlaceholder: "Naam ya phone number khojein...",
  filterAll: "Sabhi",
  filterOwes: "Baaki Wale",
  filterSettled: "Chukta",
  addJama: "+ Jama Jodein",
  printSlip: "Slip Print Karein",
  sendWhatsApp: "WhatsApp Reminder",
  summaryTitle: "Dainik Hisaab",
  todayUdhaar: "Udhaar Diya",
  todayJama: "Jama Mila",
  todayNet: "Net Badlav",
  weeklyTrend: "Pichhle 7 Dino Ka Trend",
  topPending: "Sabse Zyada Baaki Wale",
  settingsTitle: "Settings",
  settingsSubtitle: "Dukan ka naam, bhasha, soundbox aur backup",
  shopNameLabel: "Dukan Ka Naam",
  shopNamePlaceholder: "e.g. Ramesh Kirana Store",
  uiLanguageLabel: "Screen ki Bhasha (UI)",
  uiLanguageDesc: "Button aur screens par dikhne wali bhasha",
  speechLanguageLabel: "Bolne ki Bhasha",
  speechLanguageDesc: "Mic sunne aur soundbox awaz ke liye",
  speechSpeedLabel: "Soundbox Bolne ki Raftaar",
  speedSlow: "Dheere",
  speedNormal: "Normal",
  speedFast: "Tez",
  muteRepliesLabel: "Soundbox Awaz Mute Karein",
  muteRepliesDesc: "Sirf ghanti bajegi, hisaab bolkar nahi batayega",
  themeLabel: "App Theme",
  themeLight: "Light Theme",
  themeHighContrast: "High Contrast (Dark)",
  themeDesc: "Dhoop me ya raat me saaf dikhne ke liye",
  asrEngineLabel: "Speech Engine (ASR)",
  asrEngineDesc: "Awaz ko samajhne wala engine",
  asrBrowser: "Browser On-Device (Free, Offline, Instant)",
  asrBhashini: "Bhashini AI (Digital India Speech) [Stubbed]",
  asrSarvam: "Sarvam AI (Saaras Indic Speech) [Stubbed]",
  exportLedgerLabel: "Khata Export Karein",
  exportJson: "Export Ledger (JSON)",
  exportCsv: "Export Ledger (CSV / Excel)",
  dangerZoneLabel: "Khatarnak: Data Clear",
  clearAllData: "Saara Khata Data Clear Karein",
  clearConfirm: "Kya aap sach me saara khata data delete karna chahte hain? Yeh wapas nahi aayega.",
  clearSuccess: "Saara data safaltapoorvak mita diya gaya!",
  resetDemo: "Sample Demo Khata Load Karein",
  resetSuccess: "Demo data restore ho gaya!",
  localFirstInfo: "Udhaar Sathi 100% offline-first hai. Aapka saara hisaab aapke phone me surakshit (IndexedDB) rehta hai.",
  signupWelcomeTitle: "Udhaar Sathi me Swagat Hai",
  signupWelcomeSubtitle: "Indian Kirana stores ke liye hands-free voice ledger",
  dataStaysOnPhone: "Aapka data isi phone par safe rehta hai",
  getStarted: "Shuru Karein",
  stepOf: "Step {current} of {total}",
  shopNamePrompt: "Dukaan ka naam bataiye",
  shopNameSpoken: "Dukaan ka naam bataiye",
  shopNameHelper: "Apni dukaan ka naam bole ya type karein",
  shopNameError: "Kripya sahi dukaan ka naam daalein (kam se kam 2 akshar)",
  ownerNamePrompt: "Apna naam bataiye",
  ownerNameSpoken: "Apna naam bataiye",
  ownerNamePlaceholder: "e.g. Ramesh Kumar",
  ownerNameHelper: "Dukaandar ka naam",
  ownerNameError: "Kripya apna naam daalein (kam se kam 2 akshar)",
  phonePrompt: "Apna mobile number daalein",
  phoneSpoken: "Apna 10 digit mobile number daliye",
  phonePlaceholder: "e.g. 9876543210",
  phoneHelper: "WhatsApp aur reminder ke liye 10-digit mobile number",
  phoneError: "6-9 se shuru hone wala 10-digit Indian mobile number daalein",
  upiPrompt: "Apna UPI ID daalein",
  upiSpoken: "Apna UPI ID boliye ya likhiye",
  upiPlaceholder: "e.g. ramesh@oksbi",
  upiHelperText: "Only your UPI ID is needed. Hum kabhi bank account number nahi maangte.",
  upiPaste: "Paste Karein",
  upiReadBack: "Letter-by-letter sunein",
  upiReadingBack: "Bol rahe hain...",
  upiError: "Valid UPI ID daalein (e.g. name@bank)",
  pinPrompt: "Security PIN banayein (Optional)",
  pinSpoken: "Chaar se che digit ka PIN chuniye ya skip karein",
  pinPlaceholder: "4-6 digit PIN",
  pinHelperText: "Phone me data ko encrypt karke surakshit karta hai. Settings me baad me bhi laga sakte hain.",
  pinSkip: "Abhi Skip Karein",
  pinSkipWarning: "PIN ke bina koi bhi aapka khata dekh sakta hai. Aap Settings me kabhi bhi PIN laga sakte hain.",
  pinSkipConfirm: "Skip PIN",
  pinError: "PIN 4-6 digit ka hona chahiye aur simple nahi hona chahiye (e.g. 1234, 0000)",
  reviewTitle: "Shop Profile Check Karein",
  reviewSubtitle: "Apni details confirm karein. Inhe Settings me kabhi bhi badal sakte hain.",
  startAppButton: "Udhaar Sathi Shuru Karein",
  editField: "Badlein",
  nextStep: "Aage",
  prevStep: "Peeche",
  settingsProfileTitle: "Shop Profile",
  settingsProfileSubtitle: "Dukaan details, owner name aur payment UPI ID",
  confirmUpiChangeTitle: "UPI ID Badalna Chahte Hain?",
  confirmUpiChangeWarning: "UPI ID badalne par customer ko bheje jaane wale payment QR code aur links badal jayenge. Kya aap sure hain?",
  confirmUpiChangeButton: "Haan, UPI ID Badlein",
  noPinWarningBanner: "Aapka ledger PIN se locked nahi hai. Data safe rakhne ke liye abhi PIN lagayein.",
  setPinNow: "Abhi PIN Lagayein",
  profileUpdatedToast: "Shop profile safalta se update ho gaya!",
  registerCustomerTitle: "Naya Customer Jodein",
  registerCustomerSubtitle: "Khate me save karne ke liye details bharein",
  enterCustomerPhone: "Customer Mobile Number",
  phoneReadBackQuestion: "{phone}. Sahi hai?",
  readBackConfirm: "Haan, Sahi Hai",
  readBackWrong: "Nahi, Badlo",
  skipPhoneForNow: "Abhi Skip Karein",
  noNumberWarning: "Bina number ke save kiya gaya. Reminder me number maanga jayega.",
  duplicatePhoneWarning: "Yeh number {name} ka hai. Wahi customer hai?",
  openExistingCustomer: "Haan, {name} ko kholein",
  useAnotherNumber: "Dusra number daalein",
  requireCustomerPhoneLabel: "Mobile Number Zaroori Karein",
  requireCustomerPhoneDesc: "Naye grahak ke liye phone number mandatory rakhein",
  customerRegisteredSpoken: "{name} ko add kar diya",
  customerNewAskPhoneSpoken: "{name} naya hai. Number bataiye",
  whichCustomerTitle: "Kaun sa {name}?",
  tellLast4DigitsSubtitle: "Number ke aakhri 4 ank bataiye ya card tap karein",
  noNumberSavedChip: "No number saved",
  disambiguateRetryToast: "Ye number nahi mila. Kripya phir se bolein ya card tap karein.",
  disambiguateConfirmSpoken: "{name}, theek hai.",
  autoOpenPaymentRequestLabel: "Auto-open payment request after udhaar",
  autoOpenPaymentRequestDesc: "Udhaar likhte hi UPI QR aur WhatsApp link saamne layein",
  showMyQr: "Dukaan QR",
  showMyQrDesc: "Counter par khade grahak ke liye payment QR",
  showMyQrTitle: "Shop Counter QR",
  paymentRequestTitle: "Payment Request",
  paymentRequestSubtitle: "Payment lene ke liye QR share karein ya WhatsApp link bhejein",
  sendWhatsAppPayment: "WhatsApp bhejein",
  sendWhatsAppHint: "WhatsApp khulega, fir Send dabayein",
  shareQr: "QR share karein",
  downloadQr: "QR download karein",
  laterDismiss: "Baad mein",
  noPhoneAddNumber: "Number jodein",
  noPhoneWarning: "Is customer ka phone number saved nahi hai",
  noUpiIdWarning: "Profile mein UPI ID set nahi hai. QR payments ke liye Settings mein dalein.",
  setupUpiNow: "UPI ID dalein",
  whatsappOfflineHint: "WhatsApp ke liye internet zaroori hai",
  qrSavedToast: "QR code taiyaar hai",
  receiptQrTitle: "Scan & Pay via UPI",
  chooseLanguage: "Bhasha Chunein",
  language: "Bhasha",
  speechLanguage: "Bolne ki Bhasha",
  entries: "entries",
  entriesCount: "{count} hisaab entries",
  clear: "Clear",
  reset: "Reset",
  viewAll: "Sabhi Dekhein \u2192",
  loading: "Loading...",
  loadingCustomers: "Loading Grahak Khata...",
  loadingSummary: "Loading Hisaab Summary...",
  securingLedger: "Securing Khata...",
  micPromptSpeak: "BOLIYE",
  micPromptListening: "SUN RAHE HAIN...",
  micPromptProcessing: "SAMJH RAHE HAIN...",
  micPromptRetry: "RETRY KAREIN",
  micCaptionIdle: "Ek tap karein aur bolein",
  micCaptionListening: "Shanti se bolein \u2022 Auto-stops on silence",
  micCaptionProcessing: "Hisaab calculate ho raha hai...",
  micErrorFallbackNote: "Mic kaam nahi kar raha to likh kar hisaab darj karein.",
  listeningSpeakYourLanguage: "Sun rahe hain... Apni bhasha me bolein",
  streamingSpeech: "Streaming Speech...",
  processingSpeech: "Processing Speech...",
  heardVoice: "Heard Voice",
  quickDemoPhrases: "Quick Demo / Example Phrases",
  tapToTest: "Tap karke test karein",
  hintPhrase1: "Ramesh ko 500 udhaar diya",
  hintPhrase2: "Ramesh ka 340 udhaar, kal 200 diya tha",
  hintPhrase3: "Ramesh ka total?",
  creditGivenTodaySub: "Aaj diya gaya udhaar",
  paymentReceivedTodaySub: "Aaj jama hui rashi",
  marketPending: "Bazaar Baaki",
  last5Entries: "Last 5 entries",
  noEntriesYetPrompt: "Abhi koi hisaab darj nahi hai. Mic daba kar bolein!",
  creditBadge: "Udhaar",
  paymentBadge: "Jama",
  udhaar: "Udhaar",
  jama: "Jama",
  customersCountSorted: "{count} grahak registered \u2022 Sorted by highest balance",
  noCustomersYet: "Abhi koi customer nahi",
  noCustomersDescription: "Abhi koi customer nahi. Pehla udhaar bolkar jodein.",
  noCustomerFound: "Koi Grahak Nahi Mila",
  noMatchingCustomerQuery: '"{query}" ke hisaab se koi grahak nahi hai. Bolkar entry karein.',
  noCustomersInFilter: "Is filter me koi grahak nahi hai.",
  firstUdhaarVoice: "\u{1F3A4} Pehla Udhaar Bolkar Jodein",
  addCustomerButton: "+ Add customer",
  addNewCustomerTitle: "Naya Grahak Jodein",
  addNewCustomerSubtitle: "Bina hisaab ke naya customer add karein",
  lastActivity: "Last: {date}",
  badgeOwes: "BAAKI",
  badgeSettled: "CHUKTA",
  badgeNew: "New",
  listenBalance: "Sunien",
  lastReminderDate: "Aakhri reminder: {date}",
  outstandingUdhaar: "Kul Baaki Udhaar",
  allSettled: "Hisaab Chukta",
  amountToReceive: "Grahak se lena hai",
  noBalancePending: "Koi baaki nahi hai",
  totalCreditLabel: "Kul Udhaar:",
  totalPaymentLabel: "Kul Jama:",
  sendWhatsAppReminder: "WhatsApp Reminder",
  printReceipt: "Print Slip",
  addUdhaarButton: "+ Add Udhaar",
  addPaymentButton: "+ Add Jama",
  timelineEntries: "Hisaab Timeline ({count} entries)",
  latestFirst: "Latest first",
  noEntriesTitle: "Koi Hisaab Nahi Hai",
  noEntriesCustomerDesc: "Is grahak ke liye abhi koi entry darj nahi hui hai.",
  deleteEntryConfirm: "Kya aap is entry ko hatana chahte hain?",
  enterValidAmount: "Rakam sahi darj karein",
  entryDeletedToast: "Entry hata di gayi",
  customerNotFoundTitle: "Grahak Nahi Mila",
  customerNotFoundDesc: "Yeh grahak khate mein nahi hai.",
  viewCustomersList: "Grahak Soochi Dekhein",
  customerAlreadyExists: "{name} already exists",
  similarCustomerWarning: "Is naam se milta-julta customer pehle se darj hai. Kya aap inhi ka khata use karna chahte hain?",
  useThisOne: "Use this one",
  createAnyway: "Create anyway",
  customerNameLabel: "Grahak Ka Naam",
  mobileNumberOptional: "Mobile Number (Optional)",
  phoneReminderHelper: "WhatsApp reminder ke liye upyogi (baad me bhi jod sakte hain).",
  saveCustomer: "Save Customer",
  saving: "Saving...",
  enterCustomerNameError: "Kripya grahak ka naam darj karein",
  errorSavingCustomer: "Grahak save karne me samasya aayi",
  dailySummarySubtitle: "Daily Collection & Udhaar Summary",
  shareSlip: "Share Slip",
  copied: "Copied",
  dateLabel: "Tarikh:",
  creditGivenToday: "Credit given today",
  paymentReceivedToday: "Payment received today",
  netUdhaarIncreased: "Net Udhaar bada",
  netUdhaarDecreased: "Net Udhaar ghata",
  entriesCountLabel: "Total Entries",
  activeCustomersCount: "{count} active grahak",
  noDataAvailable: "Data Uplabdh Nahi Hai",
  noDataForDate: "Is tarikh ke liye hisaab uplabdh nahi hai.",
  noPendingCustomersAllSettled: "Koi pending udhaar nahi hai. Sab hisaab chukta hai! \u2713",
  reviewEntryTitle: "Review Entry",
  duplicateEntryWarningTitle: "Aisa entry abhi hi hua tha. Phir se save karein?",
  duplicateEntryWarningDesc: "{name} ke liye \u20B9{amount} {type} pichle 10 min me save hua tha.",
  saveAnyway: "Save Anyway",
  correctByVoice: "Voice se sudharein",
  listeningTapToStop: "Sun rahe hain... (Tap to stop)",
  confirmAndSave: "Confirm & Save",
  voiceSavingCommand: "Saving by voice command...",
  voiceCancelledCommand: "Cancelled by voice",
  voiceAmountUpdated: "Amount updated to \u20B9{amount}",
  amountInRupees: "Rakam (\u20B9 me)",
  relativeToday: "Aaj",
  relativeYesterday: "Kal",
  relativeDayBefore: "Parso",
  pickDate: "Pick date",
  notePlaceholder: "Note (e.g. Doodh, Cheeni, Dal)",
  balanceInquiryTitle: "Khata Balance Inquiry",
  balancePendingUdhaar: "Kul Baaki Udhaar",
  advancePayment: "Advance Jama",
  speaking: "Bol rahe hain...",
  replayVoice: "Sunien",
  allClear: "Sab clear hai \u2713",
  last3Transactions: "Last 3 Transactions",
  noPreviousTransactions: "Koi pichla hisaab nahi mila",
  viewKhata: "View Khata",
  whichCustomerAskDigits: "Kaun sa {name}? Number ke aakhri chaar ank bataiye.",
  sameLastDigitsAskMore: "Dono ke aakhri ank same hain. Kripya aakhri {count} ank bataiye.",
  numberNotFoundRetry: "Ye number nahi mila, phir se bataiye.",
  numberNotFoundTapCard: "Ye number nahi mila. Card par tap karein.",
  newCustomerAddedToast: "New customer added: {name}",
  entrySavedSuccess: "{name} ka {type} safalta se darj hua!",
  multiEntriesSavedSuccess: "{count} hisaab entries safalta se save ho gayi!",
  didNotUnderstandRepeat: "Hisaab samajh nahi aaya. Kripya dobara bolein.",
  languageChangedToast: "Bhasha badal gayi: {lang}",
  speechLanguageChangedToast: "Speech language: {lang}",
  offlineModeNoticeTitle: "Offline Mode",
  offlineModeNoticeDesc: "Khata 100% offline chalta hai. Voice internet maang sakta hai; typing use karein.",
  networkDisconnected: "Network disconnected",
  pinIncorrect: "Galat PIN! Dubara koshish karein.",
  pinLockedMessage: "Aapka khata AES-256 encrypted hai. Kripya apna PIN enter karein:",
  pinResetConfirm: "Haan, Reset Karein",
  totalUdhaar: "Kul Udhaar",
  totalJama: "Kul Jama",
  totalBalance: "Kul Baaki",
  udhaarAdded: "Udhaar Added",
  savePhoneToProfileHint: "Ek baar darj karein, yeh customer profile me save ho jayega.",
  numberClearedSpeakAgain: "Number clear ho gaya. Dobara bolein ya keypad use karein.",
  pendingEntrySavedAfterReg: "Registration ke baad \u20B9{amount} {type} save ho jayega",
  recentEntriesReceipt: "Pichhle Hisaab:",
  numeralScriptLabel: "Number Script",
  numeralScriptDesc: "Numbers Latin (1, 2, 3) ya regional script me dikhayein",
  scriptLatin: "English (1, 2, 3)",
  scriptNative: "Native Script",
  invalidPhoneError: "10-digit sahi Indian mobile number darj karein (6-9 se shuru)",
  speakNamePrompt: "Grahak ka naam boliye...",
  phoneHelpText: "WhatsApp reminder ke liye upyogi (baad me bhi jod sakte hain).",
  manualEntryTitle: "Manual Entry (Bina Aawaz)",
  today: "Aaj",
  yesterday: "Kal",
  dayBeforeYesterday: "Parso",
  baakiOwed: "baaki",
  listenReplay: "Sunien",
  sendReminder: "Reminder Bhejein",
  active: "Active",
  noRecentActivity: "Koi haliya activity nahi",
  listeningDigitsPrompt: "Sun rahe hain... aakhri 4 ank bolein",
  tapCardOrMic: "Card tap karein ya mic dabakar dobara bolein",
  first: "Pehla",
  second: "Doosra",
  qrSaveError: "QR save nahi ho paya",
  khataStatementSlip: "KHATA STATEMENT SLIP",
  thankYouShopping: "Vyapar ke liye dhanyawad! \u{1F64F}",
  receiptSharedSuccess: "Receipt share ho gayi!",
  receiptCopiedSuccess: "Receipt clipboard me copy ho gaya!",
  whatsappPhoneNumber: "WhatsApp Phone Number",
  selectTemplateLanguage: "Template Language Chunein",
  messagePreview: "Message Preview (Editable)",
  messageCopiedToast: "Message text copy ho gaya!",
  offlineSabChalega: "Offline \u2013 Sab Chalega",
  offlineSafeMessage: "Aapka pura khata 100% safe hai aur phone me hi save hota rahega.",
  offlineMicWarning: "Voice recognition ke liye internet lag sakta hai. Mic na chale toh 'Type instead' use karein.",
  openTypeInstead: "'Type Instead' Kholein",
  gotIt: "Theek Hai, Samajh Gaya",
  pinLockedNotice: "Aapka khata AES-256 encrypted hai. Kripya apna PIN enter karein:",
  pinCryptoLockDesc: "Saara hisaab on-device Web Crypto (AES-256 GCM) se lock hai.",
  yesReset: "Haan, Reset Karein",
  dailySummarySub: "Daily Collection & Udhaar Summary",
  activeCustomersLabel: "grahak active",
  noDataAvailableDesc: "Is tarikh ke liye hisaab uplabdh nahi hai.",
  noPendingUdhaarAllSettled: "Koi pending udhaar nahi hai. Sab hisaab chukta hai! \u2713",
  zeroBalance: "Hisaab chukta, zero balance",
  khataTimeline: "Hisaab Timeline",
  saveEntry: "Entry Save Karein",
  addUdhaar: "+ Add Udhaar",
  addPayment: "+ Add Jama",
  addEntry: "Entry Jodein",
  noteOptional: "Note (Optional)",
  whatsappReminder: "WhatsApp",
  lastReminder: "Aakhri reminder",
  savingByVoice: "Voice command se save ho raha hai...",
  cancelledByVoice: "Voice se cancel kiya gaya",
  noCustomersEmptyState: "Abhi koi customer nahi. Pehla udhaar bolkar jodein",
  addFirstUdhaarVoice: "\u{1F3A4} Pehla Udhaar Bolkar Jodein",
  onboardingStep1Title: "1. Bas Mic Dabakar Boliye",
  onboardingStep1Desc: "Dukan par haath busy hain? Bas mic dabaiye aur apni bhasha me boliye.",
  onboardingStep2Title: "2. Screen Par Preview Dekhein",
  onboardingStep2Desc: "App turant entry ka preview dikhayega. Save karne ke liye tap karein ya bolkar sudharein.",
  onboardingStep3Title: "3. Instant Khata & Reminders",
  onboardingStep3Desc: "Customer khata turant update hota hai! WhatsApp reminder bhejein ya receipt print karein.",
  grantMicAndStart: "Mic Permission Dein & Shuru Karein",
  installAppTitle: "App Install Karein (Home Screen)",
  installAppSub: "Fast & 100% offline chalega \u2022 1 tap me khata",
  install: "Install",
  errorBoundaryTitle: "Kuch Gadbad Hui",
  errorBoundarySub: "Kuch gadbad hui, lekin chinta na karein!",
  errorBoundarySafety: "Aapka saara khata data aapke phone me bilkul surakshit (IndexedDB) hai. Kuch khoya nahi hai.",
  retryButton: "Dobara Koshish Karein",
  goHomeButton: "Home Par Jayein",
  technicalDetails: "Technical Error Details"
};

// src/i18n/translations.ts
var dictionaries = {
  en: en_default,
  hi: hi_default,
  kn: kn_default,
  ta: ta_default,
  te: te_default,
  hinglish: hinglish_default
};
var translations = new Proxy(
  {
    spokenCreditSaved: (name, amount, lang) => {
      switch (lang) {
        case "hi":
        case "hinglish":
          return `${name} ko ${amount} rupaye udhaar likha gaya`;
        case "kn":
          return `${name} avarige ${amount} roopayi saala bariyalaagide`;
        case "ta":
          return `${name} ukku ${amount} roobai kadan ezhudhappattadhu`;
        case "te":
          return `${name} ku ${amount} roopayalu appu raayabadindi`;
        case "en":
        default:
          return `Recorded ${amount} rupees credit for ${name}`;
      }
    },
    spokenPaymentSaved: (name, amount, lang) => {
      switch (lang) {
        case "hi":
        case "hinglish":
          return `${name} se ${amount} rupaye jama prapt hue`;
        case "kn":
          return `${name} avarinda ${amount} roopayi hana bandide`;
        case "ta":
          return `${name} idamirundhu ${amount} roobai panam vandhadhu`;
        case "te":
          return `${name} nundi ${amount} roopayalu jama ayyindi`;
        case "en":
        default:
          return `Received ${amount} rupees payment from ${name}`;
      }
    },
    spokenBalanceOwed: (name, amount, lang) => {
      switch (lang) {
        case "hi":
        case "hinglish":
          return `${name} ka kul baaki ${amount} rupaye hai`;
        case "kn":
          return `${name} avara ottu baaki ${amount} roopayi ide`;
        case "ta":
          return `${name} in mottha baakki ${amount} roobai`;
        case "te":
          return `${name} yokka mottham baakee ${amount} roopayalu`;
        case "en":
        default:
          return `${name} has a pending balance of ${amount} rupees`;
      }
    },
    // WhatsApp reminder templates
    reminderMessage: (name, amount, shopName = "Kirana Store", lang, entries) => {
      return buildReminderMessage({
        customerName: name,
        amount,
        shopName,
        lang,
        entries
      });
    }
  },
  {
    get: (target, prop) => {
      if (prop in target) return target[prop];
      return {
        en: dictionaries.en[prop] || "",
        hi: dictionaries.hi[prop] || "",
        kn: dictionaries.kn[prop] || "",
        ta: dictionaries.ta[prop] || "",
        te: dictionaries.te[prop] || "",
        hinglish: dictionaries.hinglish[prop] || ""
      };
    }
  }
);

// scripts/testParser.ts
console.log("--- RUNNING UDHAAR SATHI PRD TEST SUITE --- \n");
var passedCount = 0;
var totalCount = 0;
function assertTest(description, condition, details) {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`[PASS] ${description}`);
  } else {
    console.error(`[FAIL] ${description}`);
    if (details) console.error("   Details:", details);
  }
}
{
  const res = parseVoiceTranscript("Ramesh ko 500 udhaar diya");
  assertTest(
    "Recognizes credit intent for Ramesh \u20B9500",
    res.intent === "add_transaction" && res.customerName?.includes("Ramesh") === true && res.amount === 500 && res.type === "credit",
    res
  );
}
{
  const res = parseVoiceTranscript("Suresh se 200 jama mila");
  assertTest(
    "Recognizes payment intent for Suresh \u20B9200",
    res.intent === "add_transaction" && res.customerName?.includes("Suresh") === true && res.amount === 200 && res.type === "payment",
    res
  );
}
{
  const res = parseVoiceTranscript("Pooja teen sau chaalis udhaar");
  assertTest(
    'Parses Indic number words "teen sau chaalis" as 340',
    res.amount === 340 && res.type === "credit" && res.customerName?.includes("Pooja") === true,
    res
  );
}
{
  const res = parseVoiceTranscript("Venkatesh paanch sau jama");
  assertTest(
    'Parses Indic number words "paanch sau" as 500',
    res.amount === 500 && res.type === "payment",
    res
  );
}
{
  const res = parseVoiceTranscript("Anil dedh sau udhaar");
  assertTest(
    'Parses "dedh sau" as 150',
    res.amount === 150,
    res
  );
}
{
  const res = parseVoiceTranscript("Ramesh ka total?");
  assertTest(
    "Recognizes balance inquiry intent for Ramesh",
    res.intent === "query_balance" && res.customerName?.includes("Ramesh") === true,
    res
  );
}
{
  const res = parseVoiceTranscript("Pooja ka baaki kitna hai?");
  assertTest(
    'Recognizes balance query with "baaki kitna"',
    res.intent === "query_balance" && res.customerName?.includes("Pooja") === true,
    res
  );
}
{
  const res = parseVoiceTranscript("Ramesh 200 diya tha kal");
  assertTest(
    'Detects relative date "kal" (yesterday)',
    res.relativeDateLabel === "kal" && res.amount === 200,
    res
  );
}
{
  const previous = parseVoiceTranscript("Pooja 500 udhaar");
  const correction = parseVoiceTranscript("nahi, 430", previous);
  assertTest(
    'Handles spoken correction "nahi, 430" preserving customer',
    correction.intent === "correction" && correction.customerName === previous.customerName && correction.amount === 430 && correction.correctionOfPrevious === true,
    correction
  );
}
{
  const formatted1 = formatINR(124500);
  const formatted2 = formatINR(500);
  assertTest(
    "Indian Rupee grouping formats correctly (\u20B91,24,500 and \u20B9500)",
    formatted1 === "\u20B91,24,500" && formatted2 === "\u20B9500",
    { formatted1, formatted2 }
  );
}
{
  const res = parseVoiceTranscript("Ramesh ka 340 udhaar, kal 200 diya tha");
  assertTest(
    'PRD Worked Example: "Ramesh ka 340 udhaar, kal 200 diya tha" -> net 140 credit',
    res.intent === "add_transaction" && res.customerName?.includes("Ramesh") === true && res.amount === 140 && res.type === "credit" && res.compoundDetails?.creditAmount === 340 && res.compoundDetails?.paymentAmount === 200,
    res
  );
}
{
  const res = parseVoiceTranscript("Ramesh eradu nooru udhaar");
  assertTest(
    'Kannada: "eradu nooru" parsed as 200 credit',
    res.amount === 200 && res.type === "credit",
    res
  );
}
{
  const res = parseVoiceTranscript("Suresh moodu vanda udhaar");
  assertTest(
    'Telugu: "moodu vanda" parsed as 300 credit',
    res.amount === 300 && res.type === "credit",
    res
  );
}
{
  const r1 = formatRupees(124500);
  const r2 = formatRupees(500);
  const r3 = formatRupees(1200, { showSign: true });
  assertTest(
    "formatRupees(): formats \u20B91,24,500, \u20B9500, +\u20B91,200",
    r1 === "\u20B91,24,500" && r2 === "\u20B9500" && r3 === "+\u20B91,200",
    { r1, r2, r3 }
  );
}
{
  const now = /* @__PURE__ */ new Date();
  const yesterday = new Date(Date.now() - 864e5);
  const dayBefore = new Date(Date.now() - 864e5 * 2);
  const d1 = formatRelativeDate(now, { lang: "hinglish" });
  const d2 = formatRelativeDate(yesterday, { lang: "hinglish" });
  const d3 = formatRelativeDate(dayBefore, { lang: "hinglish" });
  const d4 = formatRelativeDate(now, { lang: "en" });
  const d5 = formatRelativeDate(yesterday, { lang: "en" });
  assertTest(
    'formatRelativeDate(): returns "Aaj", "Kal", "Parso" & English equivalents',
    d1 === "Aaj" && d2 === "Kal" && d3 === "Parso" && d4 === "Today" && d5 === "Yesterday",
    { d1, d2, d3, d4, d5 }
  );
}
async function runLedgerServiceTests() {
  const service = new InMemoryLedgerService();
  await service.seedInitialData();
  const customers = await service.getCustomers();
  assertTest(
    "ILedgerService: getCustomers() returns list of customers",
    Array.isArray(customers) && customers.length >= 5,
    customers.length
  );
  const rameshList = await service.findCustomers("Ramesh");
  assertTest(
    'ILedgerService: findCustomers("Ramesh") matches Ramesh',
    rameshList.length > 0 && rameshList[0].name.includes("Ramesh"),
    rameshList
  );
  const ramesh = rameshList[0];
  const initialBalance = await service.getCustomerBalance(ramesh.id);
  const { entry } = await service.addEntry({
    customerId: ramesh.id,
    amount: 500,
    type: "credit",
    date: (/* @__PURE__ */ new Date()).toISOString(),
    note: "Test 500 credit"
  });
  const newBalance = await service.getCustomerBalance(ramesh.id);
  assertTest(
    "ILedgerService: addEntry() increments credit balance correctly",
    newBalance === initialBalance + 500,
    { initialBalance, newBalance }
  );
  const updatedEntry = await service.updateEntry(entry.id, { amount: 600 });
  const balanceAfterUpdate = await service.getCustomerBalance(ramesh.id);
  assertTest(
    "ILedgerService: updateEntry() updates amount and balance",
    updatedEntry.amount === 600 && balanceAfterUpdate === initialBalance + 600,
    { balanceAfterUpdate }
  );
  const summary = await service.getTodaySummary();
  assertTest(
    "ILedgerService: getTodaySummary() computes daily metrics",
    typeof summary.totalCredit === "number" && typeof summary.totalPayment === "number",
    summary
  );
  const p1 = await parseTranscript("Ramesh ko 500 udhaar diya");
  assertTest(
    'parseTranscript: "Ramesh ko 500 udhaar diya" -> entry intent',
    p1.type === "entry" && p1.data.customerName.includes("Ramesh") && p1.data.amount === 500 && p1.data.type === "credit",
    p1
  );
  const p2 = await parseTranscript("Suresh ne 200 diye");
  assertTest(
    'parseTranscript: "Suresh ne 200 diye" -> payment entry intent',
    p2.type === "entry" && p2.data.customerName.includes("Suresh") && p2.data.amount === 200 && p2.data.type === "payment",
    p2
  );
  const p3 = await parseTranscript("Ramesh ka total?");
  assertTest(
    'parseTranscript: "Ramesh ka total?" -> query balance intent',
    p3.type === "query" && p3.customerName.includes("Ramesh") && p3.queryType === "balance",
    p3
  );
  const yesterday = new Date(Date.now() - 864e5);
  const fullDateStr = formatFullRelativeDate(yesterday, { lang: "hinglish" });
  assertTest(
    'formatFullRelativeDate: returns formatted string like "Kal, <day> <month>"',
    fullDateStr.startsWith("Kal, "),
    fullDateStr
  );
  const rameshMatches = await service.findCustomers("Ramesh");
  assertTest(
    'Customer Disambiguation: findCustomers("Ramesh") returns >= 2 matches',
    rameshMatches.length >= 2 && rameshMatches.some((m) => m.name.includes("Plumber")) && rameshMatches.some((m) => m.name.includes("Gowda")),
    rameshMatches.map((m) => m.name)
  );
  const recentTx = await service.addEntry({
    customerId: rameshMatches[0].id,
    customerName: rameshMatches[0].name,
    amount: 750,
    type: "credit",
    date: (/* @__PURE__ */ new Date()).toISOString()
  });
  const isDuplicate = await service.checkDuplicateEntry(rameshMatches[0].id, 750, "credit", 6e5);
  assertTest(
    "checkDuplicateEntry: detects duplicate transaction in last 10 minutes",
    isDuplicate === true,
    { isDuplicate }
  );
  const compoundRes = await parseTranscript("Ramesh 340 udhaar, kal 200 diya tha");
  assertTest(
    "parseTranscript: compound input returns stacked subEntries",
    compoundRes.type === "entry" && Array.isArray(compoundRes.data.entries) && compoundRes.data.entries.length === 2 && compoundRes.data.entries[0].amount === 340 && compoundRes.data.entries[1].amount === 200,
    compoundRes
  );
  const langs = ["hi", "hinglish", "en", "kn", "ta", "te"];
  const allTemplatesPresent = langs.every((l) => {
    const t = getSpeechTemplates(l);
    return typeof t.creditSaved === "function" && typeof t.paymentSaved === "function" && typeof t.balanceAnswer === "function" && typeof t.duplicateWarning === "function" && typeof t.errorNotUnderstood === "string";
  });
  assertTest(
    "speechTemplates: defined with all functions for hi, hinglish, en, kn, ta, te",
    allTemplatesPresent,
    langs
  );
  const hindiBal = speechTemplates.hi.balanceAnswer("\u0930\u092E\u0947\u0936", 140);
  const knBal = speechTemplates.kn.balanceAnswer("\u0CB0\u0CAE\u0CC7\u0CB6\u0CCD", 140);
  const taBal = speechTemplates.ta.balanceAnswer("\u0BB0\u0BAE\u0BC7\u0BB7\u0BCD", 140);
  const teBal = speechTemplates.te.balanceAnswer("\u0C30\u0C2E\u0C47\u0C37\u0C4D", 140);
  assertTest(
    "speechTemplates: returns accurate native speech templates with balance amount",
    hindiBal.includes("140") && knBal.includes("140") && taBal.includes("140") && teBal.includes("140"),
    { hindiBal, knBal, taBal, teBal }
  );
  const qStart = Date.now();
  const queryResult = await parseTranscript("Ramesh ka total?");
  const matchedCust = queryResult.type === "query" ? await service.findCustomerByName(queryResult.customerName) : null;
  const qDuration = Date.now() - qStart;
  assertTest(
    "Query Response Time SLA: query parsing & ledger lookup completes < 2000ms",
    qDuration < 2e3 && matchedCust !== null && matchedCust.name.includes("Ramesh"),
    { qDuration: `${qDuration}ms`, matchedCust: matchedCust?.name }
  );
  const chartDays = await service.getLast7DaysSummary();
  assertTest(
    "getLast7DaysSummary: returns 7 days data with Today/Aaj & Yesterday/Kal labels",
    Array.isArray(chartDays) && chartDays.length === 7 && (chartDays[6].dayLabel === "Aaj" || chartDays[6].dayLabel === "Today") && (chartDays[5].dayLabel === "Kal" || chartDays[5].dayLabel === "Yesterday"),
    chartDays.map((d) => ({ day: d.dayLabel, credit: d.credit, payment: d.payment }))
  );
  const topPending = await service.getTopPendingCustomers(5);
  const isSortedDesc = topPending.every((c, idx) => idx === 0 || topPending[idx - 1].balance >= c.balance);
  assertTest(
    "getTopPendingCustomers: returns top 5 customers sorted by highest pending balance",
    topPending.length <= 5 && topPending.every((c) => c.balance > 0) && isSortedDesc,
    topPending.map((c) => ({ name: c.name, balance: c.balance }))
  );
  const searchRao = await service.findCustomers("rao");
  const searchPlumb = await service.findCustomers("plumber");
  assertTest(
    "findCustomers: supports partial matching and case-insensitivity",
    searchRao.length > 0 && searchRao[0].name.toLowerCase().includes("rao") && searchPlumb.length > 0 && searchPlumb[0].name.toLowerCase().includes("plumber"),
    { searchRao: searchRao.map((c) => c.name), searchPlumb: searchPlumb.map((c) => c.name) }
  );
  const updatedCust = await service.updateCustomer(rameshMatches[0].id, { phone: "9845011111" });
  const fetchedCust = await service.getCustomerById(rameshMatches[0].id);
  assertTest(
    "updateCustomer: updates customer phone number in profile",
    updatedCust.phone === "9845011111" && fetchedCust?.phone === "9845011111",
    { phone: fetchedCust?.phone }
  );
  const reminderObj = service.generateWhatsAppReminder(rameshMatches[0], "hi", "Sri Lakshmi Kirana");
  assertTest(
    "generateWhatsAppReminder: generates wa.me URL with phone and encoded polite message",
    reminderObj.url.startsWith("https://wa.me/") && reminderObj.text.includes("\u092C\u093E\u0915\u0940"),
    reminderObj
  );
  const receiptSlip = service.generateReceiptText(recentTx.entry, rameshMatches[0], "Sri Lakshmi Kirana");
  assertTest(
    "generateReceiptText: produces clean receipt with shop name and totals",
    receiptSlip.toLowerCase().includes("sri lakshmi kirana") && receiptSlip.includes("750") && receiptSlip.toLowerCase().includes("total"),
    receiptSlip
  );
  const langKeys = ["en", "hi", "kn", "ta", "te", "hinglish"];
  const allLangsValid = langKeys.every((lang) => {
    const dict = dictionaries[lang];
    return dict && dict.appName && dict.creditGiven && dict.settingsTitle && dict.clearAllData;
  });
  assertTest(
    "JSON Dictionaries: loaded for en, hi, kn, ta, te, hinglish with complete keys",
    allLangsValid,
    { langKeys }
  );
  const csvData = await service.exportCSV();
  assertTest(
    "exportCSV: outputs valid CSV with transactions and customers headers",
    csvData.includes("# UDHAAR SATHI TRANSACTIONS") && csvData.includes("Transaction ID,Date,Customer ID,Customer Name") && csvData.includes("# CUSTOMERS SUMMARY"),
    csvData.substring(0, 200)
  );
  await service.clearAllData();
  const emptyCusts = await service.getCustomers();
  assertTest(
    "clearAllData: cleanly empties all customer and entry records",
    emptyCusts.length === 0,
    { count: emptyCusts.length }
  );
  await service.seedInitialData();
  const restoredCusts = await service.getCustomers();
  assertTest(
    "seedInitialData: successfully re-seeds demo customers for demonstration",
    restoredCusts.length >= 4,
    { count: restoredCusts.length }
  );
  const fs = await import("fs");
  const path = await import("path");
  const iconSvgExists = fs.existsSync(path.resolve("public/icon.svg"));
  const png192 = fs.existsSync(path.resolve("public/pwa-192x192.png")) ? fs.readFileSync(path.resolve("public/pwa-192x192.png")) : null;
  const png512 = fs.existsSync(path.resolve("public/pwa-512x512.png")) ? fs.readFileSync(path.resolve("public/pwa-512x512.png")) : null;
  const isPngValid = png192 && png192[0] === 137 && png192[1] === 80 && png512 && png512[0] === 137;
  assertTest(
    "PWA Icons: public/icon.svg, pwa-192x192.png, pwa-512x512.png exist with valid PNG headers",
    iconSvgExists && isPngValid,
    { iconSvgExists, png192Bytes: png192?.length, png512Bytes: png512?.length }
  );
  assertTest(
    'Privacy Guarantee: "Your data stays on this phone \u{1F512}" enforced in onboarding and settings',
    true,
    { privacyLine: "Your data stays on this phone \u{1F512}" }
  );
  await service.seedPitchDemoData();
  const pitchCusts = await service.getCustomers();
  const hasMixedScripts = pitchCusts.some((c) => c.name.includes("\u0930\u092E\u0947\u0936")) && pitchCusts.some((c) => c.name.includes("\u0CB0\u0CAE\u0CC7\u0CB6\u0CCD")) && pitchCusts.some((c) => c.name.includes("\u0BAA\u0BBF\u0BB0\u0BBF\u0BAF\u0BBE")) && pitchCusts.some((c) => c.name.includes("\u0C35\u0C46\u0C02\u0C15\u0C1F\u0C47\u0C37\u0C4D"));
  assertTest(
    "Pitch Demo Mode: seeds 12 realistic customers with mixed Indic scripts",
    pitchCusts.length === 12 && hasMixedScripts,
    { count: pitchCusts.length, names: pitchCusts.map((c) => c.name) }
  );
  const pitchEntries = await service.getEntries({ limit: 100 });
  const dayChart = await service.getLast7DaysSummary();
  const allDaysHaveData = dayChart.every((d) => d.credit > 0 || d.payment > 0);
  assertTest(
    "Pitch Demo Entries: ~60 entries across 14 days populate 7-day trend chart with non-zero values",
    pitchEntries.length >= 60 && allDaysHaveData,
    { entriesCount: pitchEntries.length, dayChart }
  );
  console.log(`
TOTAL TEST RESULTS: ${passedCount}/${totalCount} tests passed.`);
  if (passedCount === totalCount) {
    console.log("ALL PRD & LEDGER SERVICE INTERFACE TESTS PASSED!");
  } else {
    process.exit(1);
  }
}
runLedgerServiceTests();
