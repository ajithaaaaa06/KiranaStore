/**
 * Core Data Models and Types for Voice Khata
 * Designed for offline-first kirana shopkeeper operations.
 */

export type TransactionType = 'credit' | 'payment';
// credit = Udhaar Diya (Customer took goods on credit, owes money)
// payment = Jama Mila (Customer paid cash/settled udhaar)

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  totalCredit: number;   // Total udhaar given (₹)
  totalPayment: number;  // Total jama received (₹)
  balance: number;       // totalCredit - totalPayment (>0 means customer owes money)
  lastTransactionDate?: string; // ISO string
  createdAt?: string;     // ISO string
  notes?: string;
}

/**
 * Standard Ledger Entry model
 */
export interface LedgerEntry {
  id: string;
  customerId: string;
  type: TransactionType;
  amount: number;
  date: string;          // ISO string
  note?: string;
  notes?: string;        // Backward compatible alias
  createdAt: string;     // ISO string
  customerName?: string;
  rawTranscript?: string;// Spoken transcript that created this entry
  synced?: boolean;
}

// Transaction is an alias for LedgerEntry for backward compatibility
export type Transaction = LedgerEntry;

export interface ParsedSubEntry {
  id: string;
  amount: number;
  type: TransactionType;
  date: string;
  relativeDateLabel?: string;
  note?: string;
  isLowConfidence?: boolean;
}

/**
 * Parsed Entry from Voice Command
 */
export interface ParsedEntry {
  customerName?: string;
  amount?: number;
  type?: TransactionType;
  date?: string;
  confidence: number;
  rawTranscript: string;
  relativeDateLabel?: string;
  notes?: string;
  note?: string;
  entries?: ParsedSubEntry[];
  compoundDetails?: CompoundDetails;
  isLowConfidence?: boolean;
  lowConfidenceField?: 'amount' | 'customer' | 'type';
}

export interface TodaySummary {
  date: string;          // YYYY-MM-DD
  totalCredit: number;
  totalPayment: number;
  netBalance: number;
  entryCount: number;
  activeCustomers: number;
}

// DailySummary extends TodaySummary with legacy fields for full backward compatibility
export interface DailySummary {
  date: string;
  totalCredit: number;
  totalPayment: number;
  netBalance: number;
  entryCount: number;
  activeCustomers: number;
  totalCreditGiven: number;
  totalPaymentReceived: number;
  netBalanceChange: number;
  transactionCount: number;
  activeCustomersCount: number;
}

export type CommandIntent =
  | 'add_transaction'
  | 'query_balance'
  | 'correction'
  | 'unknown';

export interface CompoundDetails {
  creditAmount: number;
  paymentAmount: number;
  netAmount: number;
  explanation: string;
}

export interface ParsedVoiceCommand extends ParsedEntry {
  intent: CommandIntent;
  correctionOfPrevious?: boolean;
  isDuplicatePotential?: boolean;
  compoundDetails?: CompoundDetails;
}

export type LanguageCode = 'hi' | 'hinglish' | 'en' | 'kn' | 'ta' | 'te';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  speechLocale: string;
}

export interface ConfirmEntryData {
  customerName: string;
  customerId?: string;
  amount: number;
  type: TransactionType;
  date: string;
  notes?: string;
  relativeDateLabel?: string;
}

export interface DayChartData {
  date: string;
  dayLabel: string;
  credit: number;
  payment: number;
  net: number;
}

/**
 * TypeScript interface for Ledger Service
 */
export interface ILedgerService {
  addEntry(
    entry: Omit<LedgerEntry, 'id' | 'createdAt'>,
    customerName?: string
  ): Promise<{ entry: LedgerEntry; customer: Customer; isDuplicate?: boolean }>;

  updateEntry(
    id: string,
    updates: Partial<LedgerEntry>
  ): Promise<LedgerEntry>;

  getCustomers(): Promise<Customer[]>;

  getCustomerBalance(customerId: string): Promise<number>;

  getTodaySummary(date?: string): Promise<TodaySummary>;

  findCustomers(query: string): Promise<Customer[]>;

  getLast7DaysSummary?(): Promise<DayChartData[]>;
  getTopPendingCustomers?(limit?: number): Promise<Customer[]>;

  checkDuplicateEntry?(
    customerQuery: string,
    amount: number,
    type: TransactionType,
    withinMs?: number
  ): Promise<boolean>;

  // Auxiliary methods for full kirana workflows
  getCustomerById(id: string): Promise<Customer | null>;
  updateCustomer?(id: string, updates: Partial<Customer>): Promise<Customer>;
  getCustomerEntries(customerId: string): Promise<LedgerEntry[]>;
  deleteEntry(id: string): Promise<void>;
  exportData(): Promise<string>;
  exportCSV?(): Promise<string>;
  clearAllData?(): Promise<void>;
  seedPitchDemoData?(): Promise<void>;
}
