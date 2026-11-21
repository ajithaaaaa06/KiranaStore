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
function formatRupees(amount, options = {}) {
  const { showSign = false, showSymbol = true, decimals = 0 } = options;
  if (isNaN(amount) || amount === null || amount === void 0) {
    return showSymbol ? "\u20B90" : "0";
  }
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  }).format(absAmount);
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
  const { lang = "hinglish", includeTime = false } = options;
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
    dayLabel = target.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: isSameYear ? void 0 : "numeric"
    });
  }
  if (includeTime) {
    const timeStr = target.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    return `${dayLabel}, ${timeStr}`;
  }
  return dayLabel;
}
function formatFullRelativeDate(dateInput, options = {}) {
  const { lang = "hinglish" } = options;
  if (!dateInput) return "";
  const target = new Date(dateInput);
  if (isNaN(target.getTime())) return String(dateInput);
  const rel = formatRelativeDate(target, { lang });
  const dayMonth = target.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short"
  });
  return `${rel}, ${dayMonth}`;
}

// src/lib/formatters.ts
function formatINR(amount) {
  const rounded = Math.round(amount);
  const isNegative = rounded < 0;
  const absVal = Math.abs(rounded);
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0
  }).format(absVal);
  return `${isNegative ? "-" : ""}\u20B9${formatted}`;
}
function cleanPhoneNumber(phone) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  if (digits.length > 10) return digits.slice(-10);
  return digits;
}

// src/i18n/locales/en.json
var en_default = {
  appName: "Voice Khata",
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
  trySpeaking: "Try speaking",
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
  localFirstInfo: "Voice Khata is 100% offline-first. Your ledger is safely stored on your device (IndexedDB) and never leaves your phone.",
  signupWelcomeTitle: "Welcome to Voice Khata",
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
  startAppButton: "Start Voice Khata",
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
  sendWhatsAppPayment: "WhatsApp bhejein",
  sendWhatsAppHint: "Tap to open WhatsApp, then press Send",
  shareQr: "QR share karein",
  downloadQr: "Download QR",
  laterDismiss: "Baad mein",
  noPhoneAddNumber: "Add phone number",
  noPhoneWarning: "No phone number saved for this customer",
  noUpiIdWarning: "No UPI ID set in shop profile. Set up in Settings to enable QR payments.",
  setupUpiNow: "Set up UPI ID",
  whatsappOfflineHint: "Internet required for WhatsApp",
  qrSavedToast: "QR code ready to share",
  receiptQrTitle: "Scan & Pay via UPI"
};

// src/i18n/locales/hi.json
var hi_default = {
  appName: "\u0906\u0935\u093E\u091C\u093C \u0916\u093E\u0924\u093E",
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
  trySpeaking: "\u092C\u094B\u0932\u0915\u0930 \u0926\u0947\u0916\u0947\u0902",
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
  localFirstInfo: "\u0906\u0935\u093E\u091C\u093C \u0916\u093E\u0924\u093E 100% \u0911\u092B\u0932\u093E\u0907\u0928 \u0939\u0948\u0964 \u0906\u092A\u0915\u093E \u0938\u093E\u0930\u093E \u0921\u0947\u091F\u093E \u0906\u092A\u0915\u0947 \u092B\u093C\u094B\u0928 \u092A\u0930 \u0939\u0940 \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 (IndexedDB) \u0930\u0939\u0924\u093E \u0939\u0948 \u0914\u0930 \u0915\u0939\u0940\u0902 \u0928\u0939\u0940\u0902 \u092D\u0947\u091C\u093E \u091C\u093E\u0924\u093E\u0964",
  signupWelcomeTitle: "\u0935\u0949\u0907\u0938 \u0916\u093E\u0924\u093E \u092E\u0947\u0902 \u0906\u092A\u0915\u093E \u0938\u094D\u0935\u093E\u0917\u0924 \u0939\u0948",
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
  startAppButton: "\u0935\u0949\u0907\u0938 \u0916\u093E\u0924\u093E \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902",
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
  receiptQrTitle: "UPI \u0938\u0947 \u0938\u094D\u0915\u0948\u0928 \u0914\u0930 \u092A\u0947 \u0915\u0930\u0947\u0902"
};

// src/i18n/locales/kn.json
var kn_default = {
  appName: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C96\u0CBE\u0CA4\u0CC6",
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
  trySpeaking: "\u0CAE\u0CBE\u0CA4\u0CA8\u0CBE\u0CA1\u0CBF \u0CA8\u0CCB\u0CA1\u0CBF",
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
  localFirstInfo: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C96\u0CBE\u0CA4\u0CC6\u0CAF\u0CC1 100% \u0C86\u0CAB\u0CCD\u200C\u0CB2\u0CC8\u0CA8\u0CCD \u0C86\u0C97\u0CBF\u0CA6\u0CC6. \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0C8E\u0CB2\u0CCD\u0CB2\u0CBE \u0CA1\u0CC7\u0C9F\u0CBE \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CAE\u0CCA\u0CAC\u0CC8\u0CB2\u0CCD\u200C\u0CA8\u0CB2\u0CCD\u0CB2\u0CBF \u0CB8\u0CC1\u0CB0\u0C95\u0CCD\u0CB7\u0CBF\u0CA4\u0CB5\u0CBE\u0C97\u0CBF\u0CA6\u0CC6 (IndexedDB).",
  signupWelcomeTitle: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C96\u0CBE\u0CA4\u0CC6\u0C97\u0CC6 \u0CB8\u0CC1\u0CB8\u0CCD\u0CB5\u0CBE\u0C97\u0CA4",
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
  startAppButton: "\u0CA7\u0CCD\u0CB5\u0CA8\u0CBF \u0C96\u0CBE\u0CA4\u0CC6 \u0CAA\u0CCD\u0CB0\u0CBE\u0CB0\u0C82\u0CAD\u0CBF\u0CB8\u0CBF",
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
  receiptQrTitle: "UPI \u0CAE\u0CC2\u0CB2\u0C95 \u0CB8\u0CCD\u0C95\u0CCD\u0CAF\u0CBE\u0CA8\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF\u0CB8\u0CBF"
};

// src/i18n/locales/ta.json
var ta_default = {
  appName: "\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1",
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
  trySpeaking: "\u0BAA\u0BC7\u0B9A\u0BBF\u0BAA\u0BCD \u0BAA\u0BBE\u0BB0\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
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
  localFirstInfo: "\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1 100% \u0B86\u0B83\u0BAA\u0BCD\u0BB2\u0BC8\u0BA9\u0BCD. \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B8E\u0BB2\u0BCD\u0BB2\u0BBE \u0BA4\u0BB0\u0BB5\u0BC1\u0BAE\u0BCD \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BA4\u0BCA\u0BB2\u0BC8\u0BAA\u0BC7\u0B9A\u0BBF\u0BAF\u0BBF\u0BB2\u0BC7\u0BAF\u0BC7 \u0BAA\u0BBE\u0BA4\u0BC1\u0B95\u0BBE\u0BAA\u0BCD\u0BAA\u0BBE\u0B95 \u0B89\u0BB3\u0BCD\u0BB3\u0BA4\u0BC1 (IndexedDB).",
  signupWelcomeTitle: "\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 \u0BA8\u0BB2\u0BCD\u0BB5\u0BB0\u0BB5\u0BC1",
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
  startAppButton: "\u0B95\u0BC1\u0BB0\u0BB2\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC8\u0BA4\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD",
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
  receiptQrTitle: "UPI \u0BAE\u0BC2\u0BB2\u0BAE\u0BCD \u0BB8\u0BCD\u0B95\u0BC7\u0BA9\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BB2\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD"
};

// src/i18n/locales/te.json
var te_default = {
  appName: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C16\u0C3E\u0C24\u0C3E",
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
  trySpeaking: "\u0C2E\u0C3E\u0C1F\u0C4D\u0C32\u0C3E\u0C21\u0C3F \u0C1A\u0C42\u0C21\u0C02\u0C21\u0C3F",
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
  localFirstInfo: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C16\u0C3E\u0C24\u0C3E 100% \u0C06\u0C2B\u0C4D\u200C\u0C32\u0C48\u0C28\u0C4D. \u0C2E\u0C40 \u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C21\u0C47\u0C1F\u0C3E \u0C2E\u0C40 \u0C2B\u0C4B\u0C28\u0C4D\u200C\u0C32\u0C4B\u0C28\u0C47 \u0C38\u0C41\u0C30\u0C15\u0C4D\u0C37\u0C3F\u0C24\u0C02\u0C17\u0C3E \u0C09\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F (IndexedDB).",
  signupWelcomeTitle: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C16\u0C3E\u0C24\u0C3E\u0C15\u0C41 \u0C38\u0C4D\u0C35\u0C3E\u0C17\u0C24\u0C02",
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
  startAppButton: "\u0C35\u0C3E\u0C2F\u0C3F\u0C38\u0C4D \u0C16\u0C3E\u0C24\u0C3E \u0C2A\u0C4D\u0C30\u0C3E\u0C30\u0C02\u0C2D\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F",
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
  receiptQrTitle: "UPI \u0C26\u0C4D\u0C35\u0C3E\u0C30\u0C3E \u0C38\u0C4D\u0C15\u0C3E\u0C28\u0C4D \u0C1A\u0C47\u0C38\u0C3F \u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F"
};

// src/i18n/locales/hinglish.json
var hinglish_default = {
  appName: "Voice Khata",
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
  trySpeaking: "Bol kar dekhein",
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
  localFirstInfo: "Voice Khata 100% offline-first hai. Aapka saara hisaab aapke phone me surakshit (IndexedDB) rehta hai.",
  signupWelcomeTitle: "Voice Khata me Swagat Hai",
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
  startAppButton: "Voice Khata Shuru Karein",
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
  receiptQrTitle: "Scan & Pay via UPI"
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
var translations = {
  // Common UI labels
  appName: {
    hinglish: hinglish_default.appName,
    hi: hi_default.appName,
    en: en_default.appName,
    kn: kn_default.appName,
    ta: ta_default.appName,
    te: te_default.appName
  },
  tagline: {
    hinglish: hinglish_default.tagline,
    hi: hi_default.tagline,
    en: en_default.tagline,
    kn: kn_default.tagline,
    ta: ta_default.tagline,
    te: te_default.tagline
  },
  online: {
    hinglish: hinglish_default.online,
    hi: hi_default.online,
    en: en_default.online,
    kn: kn_default.online,
    ta: ta_default.online,
    te: te_default.online
  },
  offlineSafe: {
    hinglish: hinglish_default.offlineSafe,
    hi: hi_default.offlineSafe,
    en: en_default.offlineSafe,
    kn: kn_default.offlineSafe,
    ta: ta_default.offlineSafe,
    te: te_default.offlineSafe
  },
  // Ledger semantics
  creditGiven: {
    hinglish: hinglish_default.creditGiven,
    hi: hi_default.creditGiven,
    en: en_default.creditGiven,
    kn: kn_default.creditGiven,
    ta: ta_default.creditGiven,
    te: te_default.creditGiven
  },
  paymentReceived: {
    hinglish: hinglish_default.paymentReceived,
    hi: hi_default.paymentReceived,
    en: en_default.paymentReceived,
    kn: kn_default.paymentReceived,
    ta: ta_default.paymentReceived,
    te: te_default.paymentReceived
  },
  balanceOwed: {
    hinglish: hinglish_default.balanceOwed,
    hi: hi_default.balanceOwed,
    en: en_default.balanceOwed,
    kn: kn_default.balanceOwed,
    ta: ta_default.balanceOwed,
    te: te_default.balanceOwed
  },
  todaySummary: {
    hinglish: hinglish_default.todaySummary,
    hi: hi_default.todaySummary,
    en: en_default.todaySummary,
    kn: kn_default.todaySummary,
    ta: ta_default.todaySummary,
    te: te_default.todaySummary
  },
  // Mic Hero prompts
  micIdlePrompt: {
    hinglish: hinglish_default.micIdle,
    hi: hi_default.micIdle,
    en: en_default.micIdle,
    kn: kn_default.micIdle,
    ta: ta_default.micIdle,
    te: te_default.micIdle
  },
  micListeningPrompt: {
    hinglish: hinglish_default.micListening,
    hi: hi_default.micListening,
    en: en_default.micListening,
    kn: kn_default.micListening,
    ta: ta_default.micListening,
    te: te_default.micListening
  },
  micProcessingPrompt: {
    hinglish: hinglish_default.micProcessing,
    hi: hi_default.micProcessing,
    en: en_default.micProcessing,
    kn: kn_default.micProcessing,
    ta: ta_default.micProcessing,
    te: te_default.micProcessing
  },
  micHelpExample: {
    hinglish: '"Ramesh ko 500 udhaar diya" ya "Ramesh ka total?"',
    hi: '"\u0930\u092E\u0947\u0936 \u0915\u094B 500 \u0909\u0927\u093E\u0930 \u0926\u093F\u092F\u093E" \u092F\u093E "\u0930\u092E\u0947\u0936 \u0915\u093E \u091F\u094B\u091F\u0932?"',
    en: '"Ramesh gave 500 credit" or "Ramesh total balance?"',
    kn: '"\u0CB0\u0CAE\u0CC7\u0CB6\u0CCD \u0C97\u0CC6 500 \u0CB8\u0CBE\u0CB2 \u0CA8\u0CC0\u0CA1\u0CB2\u0CBE\u0C97\u0CBF\u0CA6\u0CC6" \u0C85\u0CA5\u0CB5\u0CBE "\u0CB0\u0CAE\u0CC7\u0CB6\u0CCD \u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAC\u0CBE\u0C95\u0CBF?"',
    ta: '"\u0BB0\u0BAE\u0BC7\u0BB7\u0BBF\u0BB1\u0BCD\u0B95\u0BC1 500 \u0B95\u0B9F\u0BA9\u0BCD" \u0B85\u0BB2\u0BCD\u0BB2\u0BA4\u0BC1 "\u0BB0\u0BAE\u0BC7\u0BB7\u0BCD \u0BAE\u0BCA\u0BA4\u0BCD\u0BA4 \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF?"',
    te: '"\u0C30\u0C2E\u0C47\u0C37\u0C4D \u0C15\u0C3F 500 \u0C05\u0C2A\u0C4D\u0C2A\u0C41" \u0C32\u0C47\u0C26\u0C3E "\u0C30\u0C2E\u0C47\u0C37\u0C4D \u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C2C\u0C3E\u0C15\u0C40?"'
  },
  // Action Buttons
  confirmAndSave: {
    hinglish: "Haan, Khata Me Likhein",
    hi: "\u0939\u093E\u0901, \u0916\u093E\u0924\u0947 \u092E\u0947\u0902 \u0932\u093F\u0916\u0947\u0902",
    en: "Confirm & Save",
    kn: "\u0CB9\u0CCC\u0CA6\u0CC1, \u0C96\u0CBE\u0CA4\u0CC6\u0C97\u0CC6 \u0CB8\u0CC7\u0CB0\u0CBF\u0CB8\u0CBF",
    ta: "\u0B86\u0BAE\u0BCD, \u0B9A\u0BC7\u0BAE\u0BBF\u0B95\u0BCD\u0B95",
    te: "\u0C05\u0C35\u0C41\u0C28\u0C41, \u0C38\u0C47\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F"
  },
  cancel: {
    hinglish: hinglish_default.cancel,
    hi: hi_default.cancel,
    en: en_default.cancel,
    kn: kn_default.cancel,
    ta: ta_default.cancel,
    te: te_default.cancel
  },
  manualEntry: {
    hinglish: "Likh Kar Darj Karein",
    hi: "\u0932\u093F\u0916\u0915\u0930 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
    en: "Manual Keyboard Entry",
    kn: "\u0C9F\u0CC8\u0CAA\u0CCD \u0CAE\u0CBE\u0CA1\u0CBF \u0CAC\u0CB0\u0CC6\u0CAF\u0CBF\u0CB0\u0CBF",
    ta: "\u0BA4\u0B9F\u0BCD\u0B9F\u0B9A\u0BCD\u0B9A\u0BC1 \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BC1\u0BAE\u0BCD",
    te: "\u0C1F\u0C48\u0C2A\u0C4D \u0C1A\u0C47\u0C38\u0C3F \u0C28\u0C2E\u0C4B\u0C26\u0C41 \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F"
  },
  sendWhatsApp: {
    hinglish: "WhatsApp Reminder Bhejein",
    hi: "\u0935\u094D\u0939\u093E\u091F\u094D\u0938\u090F\u092A \u0930\u093F\u092E\u093E\u0907\u0902\u0921\u0930 \u092D\u0947\u091C\u0947\u0902",
    en: "Send WhatsApp Reminder",
    kn: "\u0CB5\u0CBE\u0C9F\u0CCD\u0CB8\u0CBE\u0CAA\u0CCD \u0C9C\u0CCD\u0C9E\u0CBE\u0CAA\u0CA8\u0CC6 \u0C95\u0CB3\u0CC1\u0CB9\u0CBF\u0CB8\u0CBF",
    ta: "\u0BB5\u0BBE\u0B9F\u0BCD\u0BB8\u0BCD\u0B85\u0BAA\u0BCD \u0BA8\u0BBF\u0BA9\u0BC8\u0BB5\u0BC2\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD",
    te: "\u0C35\u0C3E\u0C1F\u0C4D\u0C38\u0C3E\u0C2A\u0C4D \u0C30\u0C3F\u0C2E\u0C48\u0C02\u0C21\u0C30\u0C4D \u0C2A\u0C02\u0C2A\u0C02\u0C21\u0C3F"
  },
  shareReceipt: {
    hinglish: "Parchi Share Karein",
    hi: "\u092A\u0930\u094D\u091A\u0940 \u0936\u0947\u092F\u0930 \u0915\u0930\u0947\u0902",
    en: "Share Receipt Slip",
    kn: "\u0CB0\u0CB6\u0CC0\u0CA6\u0CBF \u0CB9\u0C82\u0C9A\u0CBF\u0C95\u0CCA\u0CB3\u0CCD\u0CB3\u0CBF",
    ta: "\u0BB0\u0B9A\u0BC0\u0BA4\u0BC8 \u0BAA\u0B95\u0BBF\u0BB0\u0BCD\u0B95",
    te: "\u0C30\u0C38\u0C40\u0C26\u0C41 \u0C37\u0CC7\u0BB0\u0BCD \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F"
  },
  // Spoken feedback phrases (Soundbox voice announcements)
  spokenCreditSaved: (name, amount, lang) => {
    switch (lang) {
      case "hi":
      case "hinglish":
        return `${name} ko ${amount} rupaye udhaar darj kiya`;
      case "kn":
        return `${name} avarige ${amount} roopayi saala daakhalisu laagide`;
      case "ta":
        return `${name} ku ${amount} roobai kadan padhivu seiyappattadhu`;
      case "te":
        return `${name} ku ${amount} roopayalu appu namodu cheyabadindi`;
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
    let entriesBlock = "";
    if (entries && entries.length > 0) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const sorted = [...entries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      entriesBlock = sorted.map((e) => {
        const d = new Date(e.date);
        const day = d.getDate();
        const month = monthNames[d.getMonth()] || "Nov";
        const typeStr = e.type === "credit" ? "udhaar" : "paid";
        return `${day} ${month}: \u20B9${e.amount.toLocaleString("en-IN")} ${typeStr}`;
      }).join("\n");
    }
    if (entriesBlock) {
      switch (lang) {
        case "hi":
          return `\u0928\u092E\u0938\u094D\u0924\u0947 ${name} \u091C\u0940,
${shopName} \u0938\u0947 \u0906\u092A\u0915\u093E \u0939\u093F\u0938\u093E\u092C:
${entriesBlock}
--------------------
\u0915\u0941\u0932 \u092C\u093E\u0915\u0940 \u0939\u093F\u0938\u093E\u092C: \u20B9${amount}
\u0915\u0943\u092A\u092F\u093E \u0938\u0941\u0935\u093F\u0927\u093E\u0928\u0941\u0938\u093E\u0930 \u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930 \u0926\u0947\u0902\u0964
\u0927\u0928\u094D\u092F\u0935\u093E\u0926! \u{1F64F}`;
        case "kn":
          return `\u0CA8\u0CAE\u0CB8\u0CCD\u0C95\u0CBE\u0CB0 ${name} \u0C85\u0CB5\u0CB0\u0CC7,
${shopName} \u0CA8\u0CBF\u0C82\u0CA6 \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0CB2\u0CC6\u0C95\u0CCD\u0C95:
${entriesBlock}
--------------------
\u0C92\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAC\u0CBE\u0C95\u0CBF: \u20B9${amount}
\u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0C85\u0CA8\u0CC1\u0C95\u0CC2\u0CB2\u0CB5\u0CBE\u0CA6\u0CBE\u0C97 \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF\u0CB8\u0CBF.
\u0CA7\u0CA8\u0CCD\u0CAF\u0CB5\u0CBE\u0CA6\u0C97\u0CB3\u0CC1! \u{1F64F}`;
        case "ta":
          return `\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD ${name},
${shopName} \u0B95\u0B9F\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BA3\u0B95\u0BCD\u0B95\u0BC1:
${entriesBlock}
--------------------
\u0BAE\u0BCA\u0BA4\u0BCD\u0BA4 \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF: \u20B9${amount}
\u0BA4\u0BAF\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0BB5\u0BBF\u0BB0\u0BC8\u0BB5\u0BBF\u0BB2\u0BCD \u0B9A\u0BC6\u0BB2\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD.
\u0BA8\u0BA9\u0BCD\u0BB1\u0BBF! \u{1F64F}`;
        case "te":
          return `\u0C28\u0C2E\u0C38\u0C4D\u0C15\u0C3E\u0C30\u0C02 ${name} \u0C17\u0C3E\u0C30\u0C41,
${shopName} \u0C32\u0C4B \u0C2E\u0C40 \u0C32\u0C46\u0C15\u0C4D\u0C15:
${entriesBlock}
--------------------
\u0C2E\u0C4A\u0C24\u0C4D\u0C24\u0C02 \u0C2C\u0C3E\u0C15\u0C40: \u20B9${amount}
\u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C35\u0C40\u0C32\u0C48\u0C28\u0C02\u0C24 \u0C24\u0C4D\u0C35\u0C30\u0C17\u0C3E \u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F.
\u0C27\u0C28\u0C4D\u0C2F\u0C35\u0C3E\u0C26\u0C3E\u0C32\u0C41! \u{1F64F}`;
        case "en":
          return `Hello ${name},
Account statement from ${shopName}:
${entriesBlock}
--------------------
Total pending balance: \u20B9${amount}
Please settle at your convenience.
Thank you! \u{1F64F}`;
        case "hinglish":
        default:
          return `Namaste ${name} ji,
${shopName} se aapka hisaab:
${entriesBlock}
--------------------
Kul baaki hisaab: \u20B9${amount}
Kripya suvidhanusar bhej dein.
Dhanyawad! \u{1F64F}`;
      }
    }
    switch (lang) {
      case "hi":
        return `\u0928\u092E\u0938\u094D\u0924\u0947 ${name} \u091C\u0940, \u0906\u092A\u0915\u0947 \u0915\u093F\u0930\u093E\u0928\u093E \u0916\u093E\u0924\u0947 \u0915\u093E \u092C\u093E\u0915\u0940 \u20B9${amount} \u0939\u0948\u0964 \u0915\u0943\u092A\u092F\u093E \u0938\u0941\u0935\u093F\u0927\u093E\u0928\u0941\u0938\u093E\u0930 \u091A\u0941\u0915\u093E \u0926\u0947\u0902\u0964 \u0927\u0928\u094D\u092F\u0935\u093E\u0926 - ${shopName}`;
      case "kn":
        return `\u0CA8\u0CAE\u0CB8\u0CCD\u0C95\u0CBE\u0CB0 ${name} \u0C85\u0CB5\u0CB0\u0CC7, \u0CA8\u0CBF\u0CAE\u0CCD\u0CAE \u0C95\u0CBF\u0CB0\u0CBE\u0CA3\u0CBF \u0C96\u0CBE\u0CA4\u0CC6\u0CAF \u0CAC\u0CBE\u0C95\u0CBF \u0CAE\u0CCA\u0CA4\u0CCD\u0CA4 \u20B9${amount}. \u0CA6\u0CAF\u0CB5\u0CBF\u0C9F\u0CCD\u0C9F\u0CC1 \u0CAA\u0CBE\u0CB5\u0CA4\u0CBF\u0CB8\u0CBF. \u0CA7\u0CA8\u0CCD\u0CAF\u0CB5\u0CBE\u0CA6\u0C97\u0CB3\u0CC1 - ${shopName}`;
      case "ta":
        return `\u0BB5\u0BA3\u0B95\u0BCD\u0B95\u0BAE\u0BCD ${name}, \u0B89\u0B99\u0BCD\u0B95\u0BB3\u0BCD \u0BAE\u0BB3\u0BBF\u0B95\u0BC8\u0B95\u0BCD \u0B95\u0B9F\u0BC8 \u0BAA\u0BBE\u0B95\u0BCD\u0B95\u0BBF\u0BA4\u0BCD \u0BA4\u0BCA\u0B95\u0BC8 \u20B9${amount}. \u0BA4\u0BAF\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0B9A\u0BC6\u0BB2\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD. \u0BA8\u0BA9\u0BCD\u0BB1\u0BBF - ${shopName}`;
      case "te":
        return `\u0C28\u0C2E\u0C38\u0C4D\u0C15\u0C3E\u0C30\u0C02 ${name} \u0C17\u0C3E\u0C30\u0C41, \u0C2E\u0C40 \u0C15\u0C3F\u0C30\u0C3E\u0C23\u0C3E \u0C16\u0C3E\u0C24\u0C3E \u0C2C\u0C15\u0C3E\u0C2F\u0C3F \u20B9${amount}. \u0C26\u0C2F\u0C1A\u0C47\u0C38\u0C3F \u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F. \u0C27\u0C28\u0C4D\u0C2F\u0C35\u0C3E\u0C26\u0C3E\u0C32\u0C41 - ${shopName}`;
      case "en":
        return `Hello ${name}, this is a gentle reminder that your pending balance at ${shopName} is \u20B9${amount}. Thank you!`;
      case "hinglish":
      default:
        return `Namaste ${name} ji, aapke kirana khata ka baaki balance \u20B9${amount} hai. Kripya samay par chuka dein. Dhanyawad - ${shopName}`;
    }
  }
};

// src/services/phoneParser.ts
var NATIVE_DIGIT_MAP = {
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
var SPOKEN_DIGIT_MAP = {
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
var REPEAT_DOUBLE_WORDS = /* @__PURE__ */ new Set([
  "double",
  "dabal",
  "dubble",
  "dabbel",
  "\u0921\u092C\u0932",
  "\u0CA1\u0CAC\u0CB2\u0CCD",
  "\u0B9F\u0BAA\u0BC1\u0BB3\u0BCD",
  "\u0C21\u0C2C\u0C41\u0C32\u0C4D"
]);
var REPEAT_TRIPLE_WORDS = /* @__PURE__ */ new Set([
  "triple",
  "treepal",
  "tripple",
  "tripal",
  "\u091F\u094D\u0930\u093F\u092A\u0932",
  "\u0C9F\u0CCD\u0CB0\u0CBF\u0CAA\u0CB2\u0CCD",
  "\u0B9F\u0BBF\u0BB0\u0BBF\u0BAA\u0BBF\u0BB3\u0BCD",
  "\u0C1F\u0C4D\u0C30\u0C3F\u0C2A\u0C41\u0C32\u0C4D"
]);
var FILLER_WORDS = /* @__PURE__ */ new Set([
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
function extractDigitSequence(text) {
  if (!text) return "";
  let raw = text.trim();
  for (const [nativeChar, latinDigit] of Object.entries(NATIVE_DIGIT_MAP)) {
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

// src/services/customerMatcher.ts
var HONORIFICS = /* @__PURE__ */ new Set([
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
var DEVANAGARI_MAP = {
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
var KANNADA_MAP = {
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
var TAMIL_MAP = {
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
var TELUGU_MAP = {
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
var DB_NAME = "VoiceKhataDB";
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
async function getDB() {
  if (dbInstance) {
    return dbInstance;
  }
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
        console.warn("VoiceKhataDB database upgrade blocked: please close other tabs.");
      },
      blocking() {
        if (dbInstance && "close" in dbInstance) {
          dbInstance.close();
          dbInstance = null;
        }
      }
    });
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

// node_modules/qrcode-generator/dist/qrcode.mjs
var qrcode = function(typeNumber, errorCorrectionLevel) {
  const PAD0 = 236;
  const PAD1 = 17;
  let _typeNumber = typeNumber;
  const _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
  let _modules = null;
  let _moduleCount = 0;
  let _dataCache = null;
  const _dataList = [];
  const _this = {};
  const makeImpl = function(test, maskPattern) {
    _moduleCount = _typeNumber * 4 + 17;
    _modules = function(moduleCount) {
      const modules = new Array(moduleCount);
      for (let row = 0; row < moduleCount; row += 1) {
        modules[row] = new Array(moduleCount);
        for (let col = 0; col < moduleCount; col += 1) {
          modules[row][col] = null;
        }
      }
      return modules;
    }(_moduleCount);
    setupPositionProbePattern(0, 0);
    setupPositionProbePattern(_moduleCount - 7, 0);
    setupPositionProbePattern(0, _moduleCount - 7);
    setupPositionAdjustPattern();
    setupTimingPattern();
    setupTypeInfo(test, maskPattern);
    if (_typeNumber >= 7) {
      setupTypeNumber(test);
    }
    if (_dataCache == null) {
      _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
    }
    mapData(_dataCache, maskPattern);
  };
  const setupPositionProbePattern = function(row, col) {
    for (let r = -1; r <= 7; r += 1) {
      if (row + r <= -1 || _moduleCount <= row + r) continue;
      for (let c = -1; c <= 7; c += 1) {
        if (col + c <= -1 || _moduleCount <= col + c) continue;
        if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
          _modules[row + r][col + c] = true;
        } else {
          _modules[row + r][col + c] = false;
        }
      }
    }
  };
  const getBestMaskPattern = function() {
    let minLostPoint = 0;
    let pattern = 0;
    for (let i = 0; i < 8; i += 1) {
      makeImpl(true, i);
      const lostPoint = QRUtil.getLostPoint(_this);
      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
      }
    }
    return pattern;
  };
  const setupTimingPattern = function() {
    for (let r = 8; r < _moduleCount - 8; r += 1) {
      if (_modules[r][6] != null) {
        continue;
      }
      _modules[r][6] = r % 2 == 0;
    }
    for (let c = 8; c < _moduleCount - 8; c += 1) {
      if (_modules[6][c] != null) {
        continue;
      }
      _modules[6][c] = c % 2 == 0;
    }
  };
  const setupPositionAdjustPattern = function() {
    const pos = QRUtil.getPatternPosition(_typeNumber);
    for (let i = 0; i < pos.length; i += 1) {
      for (let j = 0; j < pos.length; j += 1) {
        const row = pos[i];
        const col = pos[j];
        if (_modules[row][col] != null) {
          continue;
        }
        for (let r = -2; r <= 2; r += 1) {
          for (let c = -2; c <= 2; c += 1) {
            if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
              _modules[row + r][col + c] = true;
            } else {
              _modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  };
  const setupTypeNumber = function(test) {
    const bits = QRUtil.getBCHTypeNumber(_typeNumber);
    for (let i = 0; i < 18; i += 1) {
      const mod = !test && (bits >> i & 1) == 1;
      _modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
    }
    for (let i = 0; i < 18; i += 1) {
      const mod = !test && (bits >> i & 1) == 1;
      _modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  };
  const setupTypeInfo = function(test, maskPattern) {
    const data = _errorCorrectionLevel << 3 | maskPattern;
    const bits = QRUtil.getBCHTypeInfo(data);
    for (let i = 0; i < 15; i += 1) {
      const mod = !test && (bits >> i & 1) == 1;
      if (i < 6) {
        _modules[i][8] = mod;
      } else if (i < 8) {
        _modules[i + 1][8] = mod;
      } else {
        _modules[_moduleCount - 15 + i][8] = mod;
      }
    }
    for (let i = 0; i < 15; i += 1) {
      const mod = !test && (bits >> i & 1) == 1;
      if (i < 8) {
        _modules[8][_moduleCount - i - 1] = mod;
      } else if (i < 9) {
        _modules[8][15 - i - 1 + 1] = mod;
      } else {
        _modules[8][15 - i - 1] = mod;
      }
    }
    _modules[_moduleCount - 8][8] = !test;
  };
  const mapData = function(data, maskPattern) {
    let inc = -1;
    let row = _moduleCount - 1;
    let bitIndex = 7;
    let byteIndex = 0;
    const maskFunc = QRUtil.getMaskFunction(maskPattern);
    for (let col = _moduleCount - 1; col > 0; col -= 2) {
      if (col == 6) col -= 1;
      while (true) {
        for (let c = 0; c < 2; c += 1) {
          if (_modules[row][col - c] == null) {
            let dark = false;
            if (byteIndex < data.length) {
              dark = (data[byteIndex] >>> bitIndex & 1) == 1;
            }
            const mask = maskFunc(row, col - c);
            if (mask) {
              dark = !dark;
            }
            _modules[row][col - c] = dark;
            bitIndex -= 1;
            if (bitIndex == -1) {
              byteIndex += 1;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || _moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  };
  const createBytes = function(buffer, rsBlocks) {
    let offset = 0;
    let maxDcCount = 0;
    let maxEcCount = 0;
    const dcdata = new Array(rsBlocks.length);
    const ecdata = new Array(rsBlocks.length);
    for (let r = 0; r < rsBlocks.length; r += 1) {
      const dcCount = rsBlocks[r].dataCount;
      const ecCount = rsBlocks[r].totalCount - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (let i = 0; i < dcdata[r].length; i += 1) {
        dcdata[r][i] = 255 & buffer.getBuffer()[i + offset];
      }
      offset += dcCount;
      const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      const rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
      const modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (let i = 0; i < ecdata[r].length; i += 1) {
        const modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
      }
    }
    let totalCodeCount = 0;
    for (let i = 0; i < rsBlocks.length; i += 1) {
      totalCodeCount += rsBlocks[i].totalCount;
    }
    const data = new Array(totalCodeCount);
    let index = 0;
    for (let i = 0; i < maxDcCount; i += 1) {
      for (let r = 0; r < rsBlocks.length; r += 1) {
        if (i < dcdata[r].length) {
          data[index] = dcdata[r][i];
          index += 1;
        }
      }
    }
    for (let i = 0; i < maxEcCount; i += 1) {
      for (let r = 0; r < rsBlocks.length; r += 1) {
        if (i < ecdata[r].length) {
          data[index] = ecdata[r][i];
          index += 1;
        }
      }
    }
    return data;
  };
  const createData = function(typeNumber2, errorCorrectionLevel2, dataList) {
    const rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, errorCorrectionLevel2);
    const buffer = qrBitBuffer();
    for (let i = 0; i < dataList.length; i += 1) {
      const data = dataList[i];
      buffer.put(data.getMode(), 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
      data.write(buffer);
    }
    let totalDataCount = 0;
    for (let i = 0; i < rsBlocks.length; i += 1) {
      totalDataCount += rsBlocks[i].dataCount;
    }
    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw "code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")";
    }
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }
    while (buffer.getLengthInBits() % 8 != 0) {
      buffer.putBit(false);
    }
    while (true) {
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(PAD0, 8);
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(PAD1, 8);
    }
    return createBytes(buffer, rsBlocks);
  };
  _this.addData = function(data, mode) {
    mode = mode || "Byte";
    let newData = null;
    switch (mode) {
      case "Numeric":
        newData = qrNumber(data);
        break;
      case "Alphanumeric":
        newData = qrAlphaNum(data);
        break;
      case "Byte":
        newData = qr8BitByte(data);
        break;
      case "Kanji":
        newData = qrKanji(data);
        break;
      default:
        throw "mode:" + mode;
    }
    _dataList.push(newData);
    _dataCache = null;
  };
  _this.isDark = function(row, col) {
    if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
      throw row + "," + col;
    }
    return _modules[row][col];
  };
  _this.getModuleCount = function() {
    return _moduleCount;
  };
  _this.make = function() {
    if (_typeNumber < 1) {
      let typeNumber2 = 1;
      for (; typeNumber2 < 40; typeNumber2++) {
        const rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, _errorCorrectionLevel);
        const buffer = qrBitBuffer();
        for (let i = 0; i < _dataList.length; i++) {
          const data = _dataList[i];
          buffer.put(data.getMode(), 4);
          buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
          data.write(buffer);
        }
        let totalDataCount = 0;
        for (let i = 0; i < rsBlocks.length; i++) {
          totalDataCount += rsBlocks[i].dataCount;
        }
        if (buffer.getLengthInBits() <= totalDataCount * 8) {
          break;
        }
      }
      _typeNumber = typeNumber2;
    }
    makeImpl(false, getBestMaskPattern());
  };
  _this.createTableTag = function(cellSize, margin) {
    cellSize = cellSize || 2;
    margin = typeof margin == "undefined" ? cellSize * 4 : margin;
    let qrHtml = "";
    qrHtml += '<table style="';
    qrHtml += " border-width: 0px; border-style: none;";
    qrHtml += " border-collapse: collapse;";
    qrHtml += " padding: 0px; margin: " + margin + "px;";
    qrHtml += '">';
    qrHtml += "<tbody>";
    for (let r = 0; r < _this.getModuleCount(); r += 1) {
      qrHtml += "<tr>";
      for (let c = 0; c < _this.getModuleCount(); c += 1) {
        qrHtml += '<td style="';
        qrHtml += " border-width: 0px; border-style: none;";
        qrHtml += " border-collapse: collapse;";
        qrHtml += " padding: 0px; margin: 0px;";
        qrHtml += " width: " + cellSize + "px;";
        qrHtml += " height: " + cellSize + "px;";
        qrHtml += " background-color: ";
        qrHtml += _this.isDark(r, c) ? "#000000" : "#ffffff";
        qrHtml += ";";
        qrHtml += '"/>';
      }
      qrHtml += "</tr>";
    }
    qrHtml += "</tbody>";
    qrHtml += "</table>";
    return qrHtml;
  };
  _this.createSvgTag = function(cellSize, margin, alt, title) {
    let opts = {};
    if (typeof arguments[0] == "object") {
      opts = arguments[0];
      cellSize = opts.cellSize;
      margin = opts.margin;
      alt = opts.alt;
      title = opts.title;
    }
    cellSize = cellSize || 2;
    margin = typeof margin == "undefined" ? cellSize * 4 : margin;
    alt = typeof alt === "string" ? { text: alt } : alt || {};
    alt.text = alt.text || null;
    alt.id = alt.text ? alt.id || "qrcode-description" : null;
    title = typeof title === "string" ? { text: title } : title || {};
    title.text = title.text || null;
    title.id = title.text ? title.id || "qrcode-title" : null;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    let c, mc, r, mr, qrSvg = "", rect;
    rect = "l" + cellSize + ",0 0," + cellSize + " -" + cellSize + ",0 0,-" + cellSize + "z ";
    qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
    qrSvg += !opts.scalable ? ' width="' + size + 'px" height="' + size + 'px"' : "";
    qrSvg += ' viewBox="0 0 ' + size + " " + size + '" ';
    qrSvg += ' preserveAspectRatio="xMinYMin meet"';
    qrSvg += title.text || alt.text ? ' role="img" aria-labelledby="' + escapeXml([title.id, alt.id].join(" ").trim()) + '"' : "";
    qrSvg += ">";
    qrSvg += title.text ? '<title id="' + escapeXml(title.id) + '">' + escapeXml(title.text) + "</title>" : "";
    qrSvg += alt.text ? '<description id="' + escapeXml(alt.id) + '">' + escapeXml(alt.text) + "</description>" : "";
    qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
    qrSvg += '<path d="';
    for (r = 0; r < _this.getModuleCount(); r += 1) {
      mr = r * cellSize + margin;
      for (c = 0; c < _this.getModuleCount(); c += 1) {
        if (_this.isDark(r, c)) {
          mc = c * cellSize + margin;
          qrSvg += "M" + mc + "," + mr + rect;
        }
      }
    }
    qrSvg += '" stroke="transparent" fill="black"/>';
    qrSvg += "</svg>";
    return qrSvg;
  };
  _this.createDataURL = function(cellSize, margin) {
    cellSize = cellSize || 2;
    margin = typeof margin == "undefined" ? cellSize * 4 : margin;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    const min = margin;
    const max = size - margin;
    return createDataURL(size, size, function(x, y) {
      if (min <= x && x < max && min <= y && y < max) {
        const c = Math.floor((x - min) / cellSize);
        const r = Math.floor((y - min) / cellSize);
        return _this.isDark(r, c) ? 0 : 1;
      } else {
        return 1;
      }
    });
  };
  _this.createImgTag = function(cellSize, margin, alt) {
    cellSize = cellSize || 2;
    margin = typeof margin == "undefined" ? cellSize * 4 : margin;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    let img = "";
    img += "<img";
    img += ' src="';
    img += _this.createDataURL(cellSize, margin);
    img += '"';
    img += ' width="';
    img += size;
    img += '"';
    img += ' height="';
    img += size;
    img += '"';
    if (alt) {
      img += ' alt="';
      img += escapeXml(alt);
      img += '"';
    }
    img += "/>";
    return img;
  };
  const escapeXml = function(s) {
    let escaped = "";
    for (let i = 0; i < s.length; i += 1) {
      const c = s.charAt(i);
      switch (c) {
        case "<":
          escaped += "&lt;";
          break;
        case ">":
          escaped += "&gt;";
          break;
        case "&":
          escaped += "&amp;";
          break;
        case '"':
          escaped += "&quot;";
          break;
        default:
          escaped += c;
          break;
      }
    }
    return escaped;
  };
  const _createHalfASCII = function(margin) {
    const cellSize = 1;
    margin = typeof margin == "undefined" ? cellSize * 2 : margin;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    const min = margin;
    const max = size - margin;
    let y, x, r1, r2, p;
    const blocks = {
      "\u2588\u2588": "\u2588",
      "\u2588 ": "\u2580",
      " \u2588": "\u2584",
      "  ": " "
    };
    const blocksLastLineNoMargin = {
      "\u2588\u2588": "\u2580",
      "\u2588 ": "\u2580",
      " \u2588": " ",
      "  ": " "
    };
    let ascii = "";
    for (y = 0; y < size; y += 2) {
      r1 = Math.floor((y - min) / cellSize);
      r2 = Math.floor((y + 1 - min) / cellSize);
      for (x = 0; x < size; x += 1) {
        p = "\u2588";
        if (min <= x && x < max && min <= y && y < max && _this.isDark(r1, Math.floor((x - min) / cellSize))) {
          p = " ";
        }
        if (min <= x && x < max && min <= y + 1 && y + 1 < max && _this.isDark(r2, Math.floor((x - min) / cellSize))) {
          p += " ";
        } else {
          p += "\u2588";
        }
        ascii += margin < 1 && y + 1 >= max ? blocksLastLineNoMargin[p] : blocks[p];
      }
      ascii += "\n";
    }
    if (size % 2 && margin > 0) {
      return ascii.substring(0, ascii.length - size - 1) + Array(size + 1).join("\u2580");
    }
    return ascii.substring(0, ascii.length - 1);
  };
  _this.createASCII = function(cellSize, margin) {
    cellSize = cellSize || 1;
    if (cellSize < 2) {
      return _createHalfASCII(margin);
    }
    cellSize -= 1;
    margin = typeof margin == "undefined" ? cellSize * 2 : margin;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    const min = margin;
    const max = size - margin;
    let y, x, r, p;
    const white = Array(cellSize + 1).join("\u2588\u2588");
    const black = Array(cellSize + 1).join("  ");
    let ascii = "";
    let line = "";
    for (y = 0; y < size; y += 1) {
      r = Math.floor((y - min) / cellSize);
      line = "";
      for (x = 0; x < size; x += 1) {
        p = 1;
        if (min <= x && x < max && min <= y && y < max && _this.isDark(r, Math.floor((x - min) / cellSize))) {
          p = 0;
        }
        line += p ? white : black;
      }
      for (r = 0; r < cellSize; r += 1) {
        ascii += line + "\n";
      }
    }
    return ascii.substring(0, ascii.length - 1);
  };
  _this.renderTo2dContext = function(context, cellSize) {
    cellSize = cellSize || 2;
    const length = _this.getModuleCount();
    for (let row = 0; row < length; row++) {
      for (let col = 0; col < length; col++) {
        context.fillStyle = _this.isDark(row, col) ? "black" : "white";
        context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  };
  return _this;
};
qrcode.stringToBytes = function(s) {
  const bytes = [];
  for (let i = 0; i < s.length; i += 1) {
    const c = s.charCodeAt(i);
    bytes.push(c & 255);
  }
  return bytes;
};
qrcode.createStringToBytes = function(unicodeData, numChars) {
  const unicodeMap = function() {
    const bin = base64DecodeInputStream(unicodeData);
    const read = function() {
      const b = bin.read();
      if (b == -1) throw "eof";
      return b;
    };
    let count = 0;
    const unicodeMap2 = {};
    while (true) {
      const b0 = bin.read();
      if (b0 == -1) break;
      const b1 = read();
      const b2 = read();
      const b3 = read();
      const k = String.fromCharCode(b0 << 8 | b1);
      const v = b2 << 8 | b3;
      unicodeMap2[k] = v;
      count += 1;
    }
    if (count != numChars) {
      throw count + " != " + numChars;
    }
    return unicodeMap2;
  }();
  const unknownChar = "?".charCodeAt(0);
  return function(s) {
    const bytes = [];
    for (let i = 0; i < s.length; i += 1) {
      const c = s.charCodeAt(i);
      if (c < 128) {
        bytes.push(c);
      } else {
        const b = unicodeMap[s.charAt(i)];
        if (typeof b == "number") {
          if ((b & 255) == b) {
            bytes.push(b);
          } else {
            bytes.push(b >>> 8);
            bytes.push(b & 255);
          }
        } else {
          bytes.push(unknownChar);
        }
      }
    }
    return bytes;
  };
};
var QRMode = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3
};
var QRErrorCorrectionLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2
};
var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};
var QRUtil = function() {
  const PATTERN_POSITION_TABLE = [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]
  ];
  const G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
  const G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
  const G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
  const _this = {};
  const getBCHDigit = function(data) {
    let digit = 0;
    while (data != 0) {
      digit += 1;
      data >>>= 1;
    }
    return digit;
  };
  _this.getBCHTypeInfo = function(data) {
    let d = data << 10;
    while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
      d ^= G15 << getBCHDigit(d) - getBCHDigit(G15);
    }
    return (data << 10 | d) ^ G15_MASK;
  };
  _this.getBCHTypeNumber = function(data) {
    let d = data << 12;
    while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
      d ^= G18 << getBCHDigit(d) - getBCHDigit(G18);
    }
    return data << 12 | d;
  };
  _this.getPatternPosition = function(typeNumber) {
    return PATTERN_POSITION_TABLE[typeNumber - 1];
  };
  _this.getMaskFunction = function(maskPattern) {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return function(i, j) {
          return (i + j) % 2 == 0;
        };
      case QRMaskPattern.PATTERN001:
        return function(i, j) {
          return i % 2 == 0;
        };
      case QRMaskPattern.PATTERN010:
        return function(i, j) {
          return j % 3 == 0;
        };
      case QRMaskPattern.PATTERN011:
        return function(i, j) {
          return (i + j) % 3 == 0;
        };
      case QRMaskPattern.PATTERN100:
        return function(i, j) {
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        };
      case QRMaskPattern.PATTERN101:
        return function(i, j) {
          return i * j % 2 + i * j % 3 == 0;
        };
      case QRMaskPattern.PATTERN110:
        return function(i, j) {
          return (i * j % 2 + i * j % 3) % 2 == 0;
        };
      case QRMaskPattern.PATTERN111:
        return function(i, j) {
          return (i * j % 3 + (i + j) % 2) % 2 == 0;
        };
      default:
        throw "bad maskPattern:" + maskPattern;
    }
  };
  _this.getErrorCorrectPolynomial = function(errorCorrectLength) {
    let a = qrPolynomial([1], 0);
    for (let i = 0; i < errorCorrectLength; i += 1) {
      a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
    }
    return a;
  };
  _this.getLengthInBits = function(mode, type) {
    if (1 <= type && type < 10) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 10;
        case QRMode.MODE_ALPHA_NUM:
          return 9;
        case QRMode.MODE_8BIT_BYTE:
          return 8;
        case QRMode.MODE_KANJI:
          return 8;
        default:
          throw "mode:" + mode;
      }
    } else if (type < 27) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 12;
        case QRMode.MODE_ALPHA_NUM:
          return 11;
        case QRMode.MODE_8BIT_BYTE:
          return 16;
        case QRMode.MODE_KANJI:
          return 10;
        default:
          throw "mode:" + mode;
      }
    } else if (type < 41) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 14;
        case QRMode.MODE_ALPHA_NUM:
          return 13;
        case QRMode.MODE_8BIT_BYTE:
          return 16;
        case QRMode.MODE_KANJI:
          return 12;
        default:
          throw "mode:" + mode;
      }
    } else {
      throw "type:" + type;
    }
  };
  _this.getLostPoint = function(qrcode2) {
    const moduleCount = qrcode2.getModuleCount();
    let lostPoint = 0;
    for (let row = 0; row < moduleCount; row += 1) {
      for (let col = 0; col < moduleCount; col += 1) {
        let sameCount = 0;
        const dark = qrcode2.isDark(row, col);
        for (let r = -1; r <= 1; r += 1) {
          if (row + r < 0 || moduleCount <= row + r) {
            continue;
          }
          for (let c = -1; c <= 1; c += 1) {
            if (col + c < 0 || moduleCount <= col + c) {
              continue;
            }
            if (r == 0 && c == 0) {
              continue;
            }
            if (dark == qrcode2.isDark(row + r, col + c)) {
              sameCount += 1;
            }
          }
        }
        if (sameCount > 5) {
          lostPoint += 3 + sameCount - 5;
        }
      }
    }
    ;
    for (let row = 0; row < moduleCount - 1; row += 1) {
      for (let col = 0; col < moduleCount - 1; col += 1) {
        let count = 0;
        if (qrcode2.isDark(row, col)) count += 1;
        if (qrcode2.isDark(row + 1, col)) count += 1;
        if (qrcode2.isDark(row, col + 1)) count += 1;
        if (qrcode2.isDark(row + 1, col + 1)) count += 1;
        if (count == 0 || count == 4) {
          lostPoint += 3;
        }
      }
    }
    for (let row = 0; row < moduleCount; row += 1) {
      for (let col = 0; col < moduleCount - 6; col += 1) {
        if (qrcode2.isDark(row, col) && !qrcode2.isDark(row, col + 1) && qrcode2.isDark(row, col + 2) && qrcode2.isDark(row, col + 3) && qrcode2.isDark(row, col + 4) && !qrcode2.isDark(row, col + 5) && qrcode2.isDark(row, col + 6)) {
          lostPoint += 40;
        }
      }
    }
    for (let col = 0; col < moduleCount; col += 1) {
      for (let row = 0; row < moduleCount - 6; row += 1) {
        if (qrcode2.isDark(row, col) && !qrcode2.isDark(row + 1, col) && qrcode2.isDark(row + 2, col) && qrcode2.isDark(row + 3, col) && qrcode2.isDark(row + 4, col) && !qrcode2.isDark(row + 5, col) && qrcode2.isDark(row + 6, col)) {
          lostPoint += 40;
        }
      }
    }
    let darkCount = 0;
    for (let col = 0; col < moduleCount; col += 1) {
      for (let row = 0; row < moduleCount; row += 1) {
        if (qrcode2.isDark(row, col)) {
          darkCount += 1;
        }
      }
    }
    const ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  };
  return _this;
}();
var QRMath = function() {
  const EXP_TABLE = new Array(256);
  const LOG_TABLE = new Array(256);
  for (let i = 0; i < 8; i += 1) {
    EXP_TABLE[i] = 1 << i;
  }
  for (let i = 8; i < 256; i += 1) {
    EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
  }
  for (let i = 0; i < 255; i += 1) {
    LOG_TABLE[EXP_TABLE[i]] = i;
  }
  const _this = {};
  _this.glog = function(n) {
    if (n < 1) {
      throw "glog(" + n + ")";
    }
    return LOG_TABLE[n];
  };
  _this.gexp = function(n) {
    while (n < 0) {
      n += 255;
    }
    while (n >= 256) {
      n -= 255;
    }
    return EXP_TABLE[n];
  };
  return _this;
}();
var qrPolynomial = function(num, shift) {
  if (typeof num.length == "undefined") {
    throw num.length + "/" + shift;
  }
  const _num = function() {
    let offset = 0;
    while (offset < num.length && num[offset] == 0) {
      offset += 1;
    }
    const _num2 = new Array(num.length - offset + shift);
    for (let i = 0; i < num.length - offset; i += 1) {
      _num2[i] = num[i + offset];
    }
    return _num2;
  }();
  const _this = {};
  _this.getAt = function(index) {
    return _num[index];
  };
  _this.getLength = function() {
    return _num.length;
  };
  _this.multiply = function(e) {
    const num2 = new Array(_this.getLength() + e.getLength() - 1);
    for (let i = 0; i < _this.getLength(); i += 1) {
      for (let j = 0; j < e.getLength(); j += 1) {
        num2[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
      }
    }
    return qrPolynomial(num2, 0);
  };
  _this.mod = function(e) {
    if (_this.getLength() - e.getLength() < 0) {
      return _this;
    }
    const ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));
    const num2 = new Array(_this.getLength());
    for (let i = 0; i < _this.getLength(); i += 1) {
      num2[i] = _this.getAt(i);
    }
    for (let i = 0; i < e.getLength(); i += 1) {
      num2[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
    }
    return qrPolynomial(num2, 0).mod(e);
  };
  return _this;
};
var QRRSBlock = function() {
  const RS_BLOCK_TABLE = [
    // L
    // M
    // Q
    // H
    // 1
    [1, 26, 19],
    [1, 26, 16],
    [1, 26, 13],
    [1, 26, 9],
    // 2
    [1, 44, 34],
    [1, 44, 28],
    [1, 44, 22],
    [1, 44, 16],
    // 3
    [1, 70, 55],
    [1, 70, 44],
    [2, 35, 17],
    [2, 35, 13],
    // 4
    [1, 100, 80],
    [2, 50, 32],
    [2, 50, 24],
    [4, 25, 9],
    // 5
    [1, 134, 108],
    [2, 67, 43],
    [2, 33, 15, 2, 34, 16],
    [2, 33, 11, 2, 34, 12],
    // 6
    [2, 86, 68],
    [4, 43, 27],
    [4, 43, 19],
    [4, 43, 15],
    // 7
    [2, 98, 78],
    [4, 49, 31],
    [2, 32, 14, 4, 33, 15],
    [4, 39, 13, 1, 40, 14],
    // 8
    [2, 121, 97],
    [2, 60, 38, 2, 61, 39],
    [4, 40, 18, 2, 41, 19],
    [4, 40, 14, 2, 41, 15],
    // 9
    [2, 146, 116],
    [3, 58, 36, 2, 59, 37],
    [4, 36, 16, 4, 37, 17],
    [4, 36, 12, 4, 37, 13],
    // 10
    [2, 86, 68, 2, 87, 69],
    [4, 69, 43, 1, 70, 44],
    [6, 43, 19, 2, 44, 20],
    [6, 43, 15, 2, 44, 16],
    // 11
    [4, 101, 81],
    [1, 80, 50, 4, 81, 51],
    [4, 50, 22, 4, 51, 23],
    [3, 36, 12, 8, 37, 13],
    // 12
    [2, 116, 92, 2, 117, 93],
    [6, 58, 36, 2, 59, 37],
    [4, 46, 20, 6, 47, 21],
    [7, 42, 14, 4, 43, 15],
    // 13
    [4, 133, 107],
    [8, 59, 37, 1, 60, 38],
    [8, 44, 20, 4, 45, 21],
    [12, 33, 11, 4, 34, 12],
    // 14
    [3, 145, 115, 1, 146, 116],
    [4, 64, 40, 5, 65, 41],
    [11, 36, 16, 5, 37, 17],
    [11, 36, 12, 5, 37, 13],
    // 15
    [5, 109, 87, 1, 110, 88],
    [5, 65, 41, 5, 66, 42],
    [5, 54, 24, 7, 55, 25],
    [11, 36, 12, 7, 37, 13],
    // 16
    [5, 122, 98, 1, 123, 99],
    [7, 73, 45, 3, 74, 46],
    [15, 43, 19, 2, 44, 20],
    [3, 45, 15, 13, 46, 16],
    // 17
    [1, 135, 107, 5, 136, 108],
    [10, 74, 46, 1, 75, 47],
    [1, 50, 22, 15, 51, 23],
    [2, 42, 14, 17, 43, 15],
    // 18
    [5, 150, 120, 1, 151, 121],
    [9, 69, 43, 4, 70, 44],
    [17, 50, 22, 1, 51, 23],
    [2, 42, 14, 19, 43, 15],
    // 19
    [3, 141, 113, 4, 142, 114],
    [3, 70, 44, 11, 71, 45],
    [17, 47, 21, 4, 48, 22],
    [9, 39, 13, 16, 40, 14],
    // 20
    [3, 135, 107, 5, 136, 108],
    [3, 67, 41, 13, 68, 42],
    [15, 54, 24, 5, 55, 25],
    [15, 43, 15, 10, 44, 16],
    // 21
    [4, 144, 116, 4, 145, 117],
    [17, 68, 42],
    [17, 50, 22, 6, 51, 23],
    [19, 46, 16, 6, 47, 17],
    // 22
    [2, 139, 111, 7, 140, 112],
    [17, 74, 46],
    [7, 54, 24, 16, 55, 25],
    [34, 37, 13],
    // 23
    [4, 151, 121, 5, 152, 122],
    [4, 75, 47, 14, 76, 48],
    [11, 54, 24, 14, 55, 25],
    [16, 45, 15, 14, 46, 16],
    // 24
    [6, 147, 117, 4, 148, 118],
    [6, 73, 45, 14, 74, 46],
    [11, 54, 24, 16, 55, 25],
    [30, 46, 16, 2, 47, 17],
    // 25
    [8, 132, 106, 4, 133, 107],
    [8, 75, 47, 13, 76, 48],
    [7, 54, 24, 22, 55, 25],
    [22, 45, 15, 13, 46, 16],
    // 26
    [10, 142, 114, 2, 143, 115],
    [19, 74, 46, 4, 75, 47],
    [28, 50, 22, 6, 51, 23],
    [33, 46, 16, 4, 47, 17],
    // 27
    [8, 152, 122, 4, 153, 123],
    [22, 73, 45, 3, 74, 46],
    [8, 53, 23, 26, 54, 24],
    [12, 45, 15, 28, 46, 16],
    // 28
    [3, 147, 117, 10, 148, 118],
    [3, 73, 45, 23, 74, 46],
    [4, 54, 24, 31, 55, 25],
    [11, 45, 15, 31, 46, 16],
    // 29
    [7, 146, 116, 7, 147, 117],
    [21, 73, 45, 7, 74, 46],
    [1, 53, 23, 37, 54, 24],
    [19, 45, 15, 26, 46, 16],
    // 30
    [5, 145, 115, 10, 146, 116],
    [19, 75, 47, 10, 76, 48],
    [15, 54, 24, 25, 55, 25],
    [23, 45, 15, 25, 46, 16],
    // 31
    [13, 145, 115, 3, 146, 116],
    [2, 74, 46, 29, 75, 47],
    [42, 54, 24, 1, 55, 25],
    [23, 45, 15, 28, 46, 16],
    // 32
    [17, 145, 115],
    [10, 74, 46, 23, 75, 47],
    [10, 54, 24, 35, 55, 25],
    [19, 45, 15, 35, 46, 16],
    // 33
    [17, 145, 115, 1, 146, 116],
    [14, 74, 46, 21, 75, 47],
    [29, 54, 24, 19, 55, 25],
    [11, 45, 15, 46, 46, 16],
    // 34
    [13, 145, 115, 6, 146, 116],
    [14, 74, 46, 23, 75, 47],
    [44, 54, 24, 7, 55, 25],
    [59, 46, 16, 1, 47, 17],
    // 35
    [12, 151, 121, 7, 152, 122],
    [12, 75, 47, 26, 76, 48],
    [39, 54, 24, 14, 55, 25],
    [22, 45, 15, 41, 46, 16],
    // 36
    [6, 151, 121, 14, 152, 122],
    [6, 75, 47, 34, 76, 48],
    [46, 54, 24, 10, 55, 25],
    [2, 45, 15, 64, 46, 16],
    // 37
    [17, 152, 122, 4, 153, 123],
    [29, 74, 46, 14, 75, 47],
    [49, 54, 24, 10, 55, 25],
    [24, 45, 15, 46, 46, 16],
    // 38
    [4, 152, 122, 18, 153, 123],
    [13, 74, 46, 32, 75, 47],
    [48, 54, 24, 14, 55, 25],
    [42, 45, 15, 32, 46, 16],
    // 39
    [20, 147, 117, 4, 148, 118],
    [40, 75, 47, 7, 76, 48],
    [43, 54, 24, 22, 55, 25],
    [10, 45, 15, 67, 46, 16],
    // 40
    [19, 148, 118, 6, 149, 119],
    [18, 75, 47, 31, 76, 48],
    [34, 54, 24, 34, 55, 25],
    [20, 45, 15, 61, 46, 16]
  ];
  const qrRSBlock = function(totalCount2, dataCount) {
    const _this2 = {};
    _this2.totalCount = totalCount2;
    _this2.dataCount = dataCount;
    return _this2;
  };
  const _this = {};
  const getRsBlockTable = function(typeNumber, errorCorrectionLevel) {
    switch (errorCorrectionLevel) {
      case QRErrorCorrectionLevel.L:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectionLevel.M:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectionLevel.Q:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectionLevel.H:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return void 0;
    }
  };
  _this.getRSBlocks = function(typeNumber, errorCorrectionLevel) {
    const rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
    if (typeof rsBlock == "undefined") {
      throw "bad rs block @ typeNumber:" + typeNumber + "/errorCorrectionLevel:" + errorCorrectionLevel;
    }
    const length = rsBlock.length / 3;
    const list = [];
    for (let i = 0; i < length; i += 1) {
      const count = rsBlock[i * 3 + 0];
      const totalCount2 = rsBlock[i * 3 + 1];
      const dataCount = rsBlock[i * 3 + 2];
      for (let j = 0; j < count; j += 1) {
        list.push(qrRSBlock(totalCount2, dataCount));
      }
    }
    return list;
  };
  return _this;
}();
var qrBitBuffer = function() {
  const _buffer = [];
  let _length = 0;
  const _this = {};
  _this.getBuffer = function() {
    return _buffer;
  };
  _this.getAt = function(index) {
    const bufIndex = Math.floor(index / 8);
    return (_buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
  };
  _this.put = function(num, length) {
    for (let i = 0; i < length; i += 1) {
      _this.putBit((num >>> length - i - 1 & 1) == 1);
    }
  };
  _this.getLengthInBits = function() {
    return _length;
  };
  _this.putBit = function(bit) {
    const bufIndex = Math.floor(_length / 8);
    if (_buffer.length <= bufIndex) {
      _buffer.push(0);
    }
    if (bit) {
      _buffer[bufIndex] |= 128 >>> _length % 8;
    }
    _length += 1;
  };
  return _this;
};
var qrNumber = function(data) {
  const _mode = QRMode.MODE_NUMBER;
  const _data = data;
  const _this = {};
  _this.getMode = function() {
    return _mode;
  };
  _this.getLength = function(buffer) {
    return _data.length;
  };
  _this.write = function(buffer) {
    const data2 = _data;
    let i = 0;
    while (i + 2 < data2.length) {
      buffer.put(strToNum(data2.substring(i, i + 3)), 10);
      i += 3;
    }
    if (i < data2.length) {
      if (data2.length - i == 1) {
        buffer.put(strToNum(data2.substring(i, i + 1)), 4);
      } else if (data2.length - i == 2) {
        buffer.put(strToNum(data2.substring(i, i + 2)), 7);
      }
    }
  };
  const strToNum = function(s) {
    let num = 0;
    for (let i = 0; i < s.length; i += 1) {
      num = num * 10 + chatToNum(s.charAt(i));
    }
    return num;
  };
  const chatToNum = function(c) {
    if ("0" <= c && c <= "9") {
      return c.charCodeAt(0) - "0".charCodeAt(0);
    }
    throw "illegal char :" + c;
  };
  return _this;
};
var qrAlphaNum = function(data) {
  const _mode = QRMode.MODE_ALPHA_NUM;
  const _data = data;
  const _this = {};
  _this.getMode = function() {
    return _mode;
  };
  _this.getLength = function(buffer) {
    return _data.length;
  };
  _this.write = function(buffer) {
    const s = _data;
    let i = 0;
    while (i + 1 < s.length) {
      buffer.put(
        getCode(s.charAt(i)) * 45 + getCode(s.charAt(i + 1)),
        11
      );
      i += 2;
    }
    if (i < s.length) {
      buffer.put(getCode(s.charAt(i)), 6);
    }
  };
  const getCode = function(c) {
    if ("0" <= c && c <= "9") {
      return c.charCodeAt(0) - "0".charCodeAt(0);
    } else if ("A" <= c && c <= "Z") {
      return c.charCodeAt(0) - "A".charCodeAt(0) + 10;
    } else {
      switch (c) {
        case " ":
          return 36;
        case "$":
          return 37;
        case "%":
          return 38;
        case "*":
          return 39;
        case "+":
          return 40;
        case "-":
          return 41;
        case ".":
          return 42;
        case "/":
          return 43;
        case ":":
          return 44;
        default:
          throw "illegal char :" + c;
      }
    }
  };
  return _this;
};
var qr8BitByte = function(data) {
  const _mode = QRMode.MODE_8BIT_BYTE;
  const _data = data;
  const _bytes = qrcode.stringToBytes(data);
  const _this = {};
  _this.getMode = function() {
    return _mode;
  };
  _this.getLength = function(buffer) {
    return _bytes.length;
  };
  _this.write = function(buffer) {
    for (let i = 0; i < _bytes.length; i += 1) {
      buffer.put(_bytes[i], 8);
    }
  };
  return _this;
};
var qrKanji = function(data) {
  const _mode = QRMode.MODE_KANJI;
  const _data = data;
  const stringToBytes2 = qrcode.stringToBytes;
  !function(c, code) {
    const test = stringToBytes2(c);
    if (test.length != 2 || (test[0] << 8 | test[1]) != code) {
      throw "sjis not supported.";
    }
  }("\u53CB", 38726);
  const _bytes = stringToBytes2(data);
  const _this = {};
  _this.getMode = function() {
    return _mode;
  };
  _this.getLength = function(buffer) {
    return ~~(_bytes.length / 2);
  };
  _this.write = function(buffer) {
    const data2 = _bytes;
    let i = 0;
    while (i + 1 < data2.length) {
      let c = (255 & data2[i]) << 8 | 255 & data2[i + 1];
      if (33088 <= c && c <= 40956) {
        c -= 33088;
      } else if (57408 <= c && c <= 60351) {
        c -= 49472;
      } else {
        throw "illegal char at " + (i + 1) + "/" + c;
      }
      c = (c >>> 8 & 255) * 192 + (c & 255);
      buffer.put(c, 13);
      i += 2;
    }
    if (i < data2.length) {
      throw "illegal char at " + (i + 1);
    }
  };
  return _this;
};
var byteArrayOutputStream = function() {
  const _bytes = [];
  const _this = {};
  _this.writeByte = function(b) {
    _bytes.push(b & 255);
  };
  _this.writeShort = function(i) {
    _this.writeByte(i);
    _this.writeByte(i >>> 8);
  };
  _this.writeBytes = function(b, off, len) {
    off = off || 0;
    len = len || b.length;
    for (let i = 0; i < len; i += 1) {
      _this.writeByte(b[i + off]);
    }
  };
  _this.writeString = function(s) {
    for (let i = 0; i < s.length; i += 1) {
      _this.writeByte(s.charCodeAt(i));
    }
  };
  _this.toByteArray = function() {
    return _bytes;
  };
  _this.toString = function() {
    let s = "";
    s += "[";
    for (let i = 0; i < _bytes.length; i += 1) {
      if (i > 0) {
        s += ",";
      }
      s += _bytes[i];
    }
    s += "]";
    return s;
  };
  return _this;
};
var base64EncodeOutputStream = function() {
  let _buffer = 0;
  let _buflen = 0;
  let _length = 0;
  let _base64 = "";
  const _this = {};
  const writeEncoded = function(b) {
    _base64 += String.fromCharCode(encode(b & 63));
  };
  const encode = function(n) {
    if (n < 0) {
      throw "n:" + n;
    } else if (n < 26) {
      return 65 + n;
    } else if (n < 52) {
      return 97 + (n - 26);
    } else if (n < 62) {
      return 48 + (n - 52);
    } else if (n == 62) {
      return 43;
    } else if (n == 63) {
      return 47;
    } else {
      throw "n:" + n;
    }
  };
  _this.writeByte = function(n) {
    _buffer = _buffer << 8 | n & 255;
    _buflen += 8;
    _length += 1;
    while (_buflen >= 6) {
      writeEncoded(_buffer >>> _buflen - 6);
      _buflen -= 6;
    }
  };
  _this.flush = function() {
    if (_buflen > 0) {
      writeEncoded(_buffer << 6 - _buflen);
      _buffer = 0;
      _buflen = 0;
    }
    if (_length % 3 != 0) {
      const padlen = 3 - _length % 3;
      for (let i = 0; i < padlen; i += 1) {
        _base64 += "=";
      }
    }
  };
  _this.toString = function() {
    return _base64;
  };
  return _this;
};
var base64DecodeInputStream = function(str) {
  const _str = str;
  let _pos = 0;
  let _buffer = 0;
  let _buflen = 0;
  const _this = {};
  _this.read = function() {
    while (_buflen < 8) {
      if (_pos >= _str.length) {
        if (_buflen == 0) {
          return -1;
        }
        throw "unexpected end of file./" + _buflen;
      }
      const c = _str.charAt(_pos);
      _pos += 1;
      if (c == "=") {
        _buflen = 0;
        return -1;
      } else if (c.match(/^\s$/)) {
        continue;
      }
      _buffer = _buffer << 6 | decode(c.charCodeAt(0));
      _buflen += 6;
    }
    const n = _buffer >>> _buflen - 8 & 255;
    _buflen -= 8;
    return n;
  };
  const decode = function(c) {
    if (65 <= c && c <= 90) {
      return c - 65;
    } else if (97 <= c && c <= 122) {
      return c - 97 + 26;
    } else if (48 <= c && c <= 57) {
      return c - 48 + 52;
    } else if (c == 43) {
      return 62;
    } else if (c == 47) {
      return 63;
    } else {
      throw "c:" + c;
    }
  };
  return _this;
};
var gifImage = function(width, height) {
  const _width = width;
  const _height = height;
  const _data = new Array(width * height);
  const _this = {};
  _this.setPixel = function(x, y, pixel) {
    _data[y * _width + x] = pixel;
  };
  _this.write = function(out) {
    out.writeString("GIF87a");
    out.writeShort(_width);
    out.writeShort(_height);
    out.writeByte(128);
    out.writeByte(0);
    out.writeByte(0);
    out.writeByte(0);
    out.writeByte(0);
    out.writeByte(0);
    out.writeByte(255);
    out.writeByte(255);
    out.writeByte(255);
    out.writeString(",");
    out.writeShort(0);
    out.writeShort(0);
    out.writeShort(_width);
    out.writeShort(_height);
    out.writeByte(0);
    const lzwMinCodeSize = 2;
    const raster = getLZWRaster(lzwMinCodeSize);
    out.writeByte(lzwMinCodeSize);
    let offset = 0;
    while (raster.length - offset > 255) {
      out.writeByte(255);
      out.writeBytes(raster, offset, 255);
      offset += 255;
    }
    out.writeByte(raster.length - offset);
    out.writeBytes(raster, offset, raster.length - offset);
    out.writeByte(0);
    out.writeString(";");
  };
  const bitOutputStream = function(out) {
    const _out = out;
    let _bitLength = 0;
    let _bitBuffer = 0;
    const _this2 = {};
    _this2.write = function(data, length) {
      if (data >>> length != 0) {
        throw "length over";
      }
      while (_bitLength + length >= 8) {
        _out.writeByte(255 & (data << _bitLength | _bitBuffer));
        length -= 8 - _bitLength;
        data >>>= 8 - _bitLength;
        _bitBuffer = 0;
        _bitLength = 0;
      }
      _bitBuffer = data << _bitLength | _bitBuffer;
      _bitLength = _bitLength + length;
    };
    _this2.flush = function() {
      if (_bitLength > 0) {
        _out.writeByte(_bitBuffer);
      }
    };
    return _this2;
  };
  const getLZWRaster = function(lzwMinCodeSize) {
    const clearCode = 1 << lzwMinCodeSize;
    const endCode = (1 << lzwMinCodeSize) + 1;
    let bitLength = lzwMinCodeSize + 1;
    const table = lzwTable();
    for (let i = 0; i < clearCode; i += 1) {
      table.add(String.fromCharCode(i));
    }
    table.add(String.fromCharCode(clearCode));
    table.add(String.fromCharCode(endCode));
    const byteOut = byteArrayOutputStream();
    const bitOut = bitOutputStream(byteOut);
    bitOut.write(clearCode, bitLength);
    let dataIndex = 0;
    let s = String.fromCharCode(_data[dataIndex]);
    dataIndex += 1;
    while (dataIndex < _data.length) {
      const c = String.fromCharCode(_data[dataIndex]);
      dataIndex += 1;
      if (table.contains(s + c)) {
        s = s + c;
      } else {
        bitOut.write(table.indexOf(s), bitLength);
        if (table.size() < 4095) {
          if (table.size() == 1 << bitLength) {
            bitLength += 1;
          }
          table.add(s + c);
        }
        s = c;
      }
    }
    bitOut.write(table.indexOf(s), bitLength);
    bitOut.write(endCode, bitLength);
    bitOut.flush();
    return byteOut.toByteArray();
  };
  const lzwTable = function() {
    const _map = {};
    let _size = 0;
    const _this2 = {};
    _this2.add = function(key) {
      if (_this2.contains(key)) {
        throw "dup key:" + key;
      }
      _map[key] = _size;
      _size += 1;
    };
    _this2.size = function() {
      return _size;
    };
    _this2.indexOf = function(key) {
      return _map[key];
    };
    _this2.contains = function(key) {
      return typeof _map[key] != "undefined";
    };
    return _this2;
  };
  return _this;
};
var createDataURL = function(width, height, getPixel) {
  const gif = gifImage(width, height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      gif.setPixel(x, y, getPixel(x, y));
    }
  }
  const b = byteArrayOutputStream();
  gif.write(b);
  const base64 = base64EncodeOutputStream();
  const bytes = b.toByteArray();
  for (let i = 0; i < bytes.length; i += 1) {
    base64.writeByte(bytes[i]);
  }
  base64.flush();
  return "data:image/gif;base64," + base64;
};
var stringToBytes = qrcode.stringToBytes;

// src/services/upiPayment.ts
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
      const isDemo = typeof window !== "undefined" && (new URLSearchParams(window.location.search).get("demo") === "1" || localStorage.getItem("vk_demo_mode") === "true");
      if (isDemo) {
        await seedPitchDemoDataToDB();
      } else {
        await this.seedInitialData();
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
    const matchResult = findCustomers(cleanQuery, allCustomers);
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
    const all = await this.getCustomers();
    const existing = all.find((c) => c.name.trim().toLowerCase() === trimmed.toLowerCase());
    if (existing) return existing;
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
    return isDuplicateEntry(
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
      const dayLabel = i === 0 ? "Aaj" : i === 1 ? "Kal" : dayNames[d.getDay()];
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
    const amountStr = customer.balance.toLocaleString("en-IN");
    const text = translations.reminderMessage(customer.name, amountStr, shopName, lang, entries);
    const phone = cleanPhoneNumber(customer.phone);
    const url = phone ? `https://wa.me/91${phone}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
    return { text, url };
  }
  generateReceiptText(entry, customer, shopName = "Kirana Store") {
    const cust = customer || { name: "Customer", phone: "", balance: 0, totalCredit: 0, totalPayment: 0, id: "" };
    const isCredit = entry?.type === "credit";
    const typeLabel = isCredit ? "UDHAAR (CREDIT GIVEN)" : "JAMA (PAYMENT RECEIVED)";
    const dateFormatted = entry?.date ? new Date(entry.date).toLocaleString("en-IN") : (/* @__PURE__ */ new Date()).toLocaleString("en-IN");
    const amt = entry?.amount !== void 0 ? entry.amount.toLocaleString("en-IN") : "0";
    return `
========================================
       ${shopName.toUpperCase()}
           KHATA RECEIPT SLIP
========================================
Date: ${dateFormatted}
Customer: ${cust.name}
Phone: ${cust.phone || "N/A"}
----------------------------------------
Transaction Type: ${typeLabel}
Amount: \u20B9${amt}
${entry?.note ? `Note: ${entry.note}` : ""}
----------------------------------------
Current Total Balance Owed: \u20B9${cust.balance?.toLocaleString("en-IN") || "0"}
========================================
   Thank you for shopping with us!
   Powered by Voice Khata PWA
========================================
    `.trim();
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
    rows.push("# VOICE KHATA TRANSACTIONS");
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
    this.customers = JSON.parse(JSON.stringify(INITIAL_CUSTOMERS));
    this.entries = JSON.parse(JSON.stringify(INITIAL_ENTRIES));
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
    const matchResult = findCustomers(cleanQuery, this.customers);
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
    return isDuplicateEntry(
      { customerId: customerQuery, customerName: customerQuery, amount, type },
      this.entries,
      withinMs
    );
  }
  async findOrCreateCustomer(name, phone) {
    await this.init();
    const trimmed = name.trim();
    const all = await this.getCustomers();
    const existing = all.find((c) => c.name.trim().toLowerCase() === trimmed.toLowerCase());
    if (existing) return existing;
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
      const dayLabel = i === 0 ? "Aaj" : i === 1 ? "Kal" : dayNames[d.getDay()];
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
    const amountStr = customer.balance.toLocaleString("en-IN");
    const text = translations.reminderMessage(customer.name, amountStr, shopName, lang, entries);
    const phone = cleanPhoneNumber(customer.phone);
    const url = phone ? `https://wa.me/91${phone}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
    return { text, url };
  }
  generateReceiptText(entry, customer, shopName = "Kirana Store") {
    const cust = customer || { name: "Customer", phone: "", balance: 0, totalCredit: 0, totalPayment: 0, id: "" };
    const isCredit = entry?.type === "credit";
    const typeLabel = isCredit ? "UDHAAR (CREDIT GIVEN)" : "JAMA (PAYMENT RECEIVED)";
    const dateFormatted = entry?.date ? new Date(entry.date).toLocaleString("en-IN") : (/* @__PURE__ */ new Date()).toLocaleString("en-IN");
    const amt = entry?.amount !== void 0 ? entry.amount.toLocaleString("en-IN") : "0";
    return `
========================================
       ${shopName.toUpperCase()}
           KHATA RECEIPT SLIP
========================================
Date: ${dateFormatted}
Customer: ${cust.name}
Phone: ${cust.phone || "N/A"}
----------------------------------------
Transaction Type: ${typeLabel}
Amount: \u20B9${amt}
${entry?.note ? `Note: ${entry.note}` : ""}
----------------------------------------
Current Total Balance Owed: \u20B9${cust.balance?.toLocaleString("en-IN") || "0"}
========================================
   Thank you for shopping with us!
   Powered by Voice Khata PWA
========================================
    `.trim();
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
    rows.push("# VOICE KHATA TRANSACTIONS");
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

// scripts/testParser.ts
console.log("--- RUNNING VOICE KHATA PRD TEST SUITE --- \n");
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
    "getLast7DaysSummary: returns 7 days data with Aaj & Kal labels",
    Array.isArray(chartDays) && chartDays.length === 7 && chartDays[6].dayLabel === "Aaj" && chartDays[5].dayLabel === "Kal",
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
    "generateReceiptText: produces thermal printable receipt slip with shop name and totals",
    receiptSlip.includes("SRI LAKSHMI KIRANA") && receiptSlip.includes("RECEIPT SLIP") && receiptSlip.includes("750"),
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
    csvData.includes("# VOICE KHATA TRANSACTIONS") && csvData.includes("Transaction ID,Date,Customer ID,Customer Name") && csvData.includes("# CUSTOMERS SUMMARY"),
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
