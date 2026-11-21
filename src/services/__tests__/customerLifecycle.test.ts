import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryLedgerService } from '../ledgerService';

describe('Customer Data Lifecycle (Fresh Install, Zero Demo, Single Creation)', () => {
  let service: InMemoryLedgerService;

  beforeEach(() => {
    service = new InMemoryLedgerService();
  });

  describe('1. Fresh Install & Empty Customer List', () => {
    it('fresh install starts with exactly zero customers and zero entries', async () => {
      await service.init();
      const customers = await service.getCustomers();
      const entries = await service.getEntries();

      // STRICT REQUIREMENT: No pre-seeded or demo customers on fresh install
      expect(customers).toEqual([]);
      expect(customers.length).toBe(0);
      expect(entries).toEqual([]);
      expect(entries.length).toBe(0);
    });

    it('returns zero metrics in daily summary on fresh install', async () => {
      await service.init();
      const summary = await service.getTodaySummary();

      expect(summary.activeCustomers).toBe(0);
      expect(summary.entryCount).toBe(0);
      expect(summary.totalCredit).toBe(0);
      expect(summary.totalPayment).toBe(0);
      expect(summary.netBalance).toBe(0);
    });

    it('returns empty list for top pending customers on fresh install', async () => {
      await service.init();
      const topPending = await service.getTopPendingCustomers(5);
      expect(topPending).toEqual([]);
      expect(topPending.length).toBe(0);
    });
  });

  describe('2. Single Customer Creation & Duplicate Prevention', () => {
    it('a new customer name creates exactly one customer', async () => {
      await service.init();
      expect((await service.getCustomers()).length).toBe(0);

      // Add first entry for a new customer
      const result = await service.addEntry(
        {
          customerId: '',
          customerName: 'Gopal',
          amount: 500,
          type: 'credit',
          date: new Date().toISOString(),
          rawTranscript: 'Gopal ko 500 udhaar',
        },
        'Gopal'
      );

      expect(result.customer).toBeDefined();
      expect(result.customer.name).toBe('Gopal');
      expect(result.customer.balance).toBe(500);

      // Verify exactly one customer exists in the entire ledger
      const allCustomers = await service.getCustomers();
      expect(allCustomers.length).toBe(1);
      expect(allCustomers[0].name).toBe('Gopal');
      expect(allCustomers[0].id).toBe(result.customer.id);
    });

    it('when a spoken name matches an existing customer, reuses that customer and NEVER creates a duplicate', async () => {
      await service.init();

      // 1. Create first entry for "Deepak"
      const res1 = await service.addEntry(
        {
          customerId: '',
          customerName: 'Deepak',
          amount: 300,
          type: 'credit',
          date: new Date().toISOString(),
        },
        'Deepak'
      );

      const customerId = res1.customer.id;
      expect((await service.getCustomers()).length).toBe(1);

      // 2. Add second entry for "Deepak" (exact same name)
      const res2 = await service.addEntry(
        {
          customerId: '',
          customerName: 'Deepak',
          amount: 200,
          type: 'credit',
          date: new Date().toISOString(),
        },
        'Deepak'
      );

      // Must reuse existing customer ID
      expect(res2.customer.id).toBe(customerId);

      // Total customers count MUST still be strictly 1
      const customersAfterExact = await service.getCustomers();
      expect(customersAfterExact.length).toBe(1);
      expect(customersAfterExact[0].balance).toBe(500); // 300 + 200

      // 3. Add third entry with lowercase "deepak"
      const res3 = await service.addEntry(
        {
          customerId: '',
          customerName: 'deepak',
          amount: 100,
          type: 'payment',
          date: new Date().toISOString(),
        },
        'deepak'
      );

      // Must reuse existing customer ID even with case differences
      expect(res3.customer.id).toBe(customerId);

      // Total customers count MUST STILL be strictly 1
      const customersAfterCase = await service.getCustomers();
      expect(customersAfterCase.length).toBe(1);
      expect(customersAfterCase[0].balance).toBe(400); // 500 - 100
    });

    it('findOrCreateCustomer reuses matching customer and prevents duplicates', async () => {
      await service.init();

      // First call creates
      const cust1 = await service.findOrCreateCustomer('Sunita Sharma', '9845011111');
      expect(cust1.name).toBe('Sunita Sharma');
      expect((await service.getCustomers()).length).toBe(1);

      // Second call with same name reuses
      const cust2 = await service.findOrCreateCustomer('Sunita Sharma');
      expect(cust2.id).toBe(cust1.id);
      expect((await service.getCustomers()).length).toBe(1);

      // Third call with case-insensitive variation reuses
      const cust3 = await service.findOrCreateCustomer('sunita sharma');
      expect(cust3.id).toBe(cust1.id);
      expect((await service.getCustomers()).length).toBe(1);
    });
  });

  describe('3. Demo Mode Isolation', () => {
    it('demo dataset is only populated when seedPitchDemoData or seedInitialData is explicitly called', async () => {
      const freshService = new InMemoryLedgerService();
      await freshService.init();
      expect((await freshService.getCustomers()).length).toBe(0);

      // Explicitly load demo
      await freshService.seedPitchDemoData();
      const demoCusts = await freshService.getCustomers();
      expect(demoCusts.length).toBeGreaterThanOrEqual(10);

      // Clearing data returns it cleanly to 0
      await freshService.clearAllData();
      expect((await freshService.getCustomers()).length).toBe(0);
    });
  });
});
