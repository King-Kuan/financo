/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plan } from './types';

export const PLANS: Plan[] = [
  {
    id: 'STARTER',
    name: 'Starter',
    priceRwf: 12000,
    maxWorkers: 0,
    features: ['Basic Dashboard', 'Offline Sales', 'Basic Inventory', 'Revenue KPIs']
  },
  {
    id: 'GROWTH',
    name: 'Growth',
    priceRwf: 30000,
    maxWorkers: 5,
    features: ['Professional Invoices', 'Client Management', 'Cash & Bank', 'Full Reports', 'In-app Messaging']
  },
  {
    id: 'ENTERPRISE',
    name: 'Enterprise',
    priceRwf: 50000,
    maxWorkers: 100,
    features: ['Multiple Branches', 'Fixed Assets', 'Payroll', 'WhatsApp Marketing', 'Palace Advisory']
  }
];

export const MOCK_BUSINESSES: any[] = [
  {
    id: 'biz_1',
    name: 'Kigali Tech Hub',
    ownerName: 'Eric Uwimana',
    email: 'eric@kigali.rw',
    status: 'ACTIVE',
    planId: 'GROWTH',
    createdAt: '2024-01-15'
  }
];
