/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PlanType = 'STARTER' | 'GROWTH' | 'ENTERPRISE';
export type BusinessStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'REJECTED';
export type UserRole = 'SUPERADMIN' | 'OWNER' | 'WORKER';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  businessId?: string;
  createdAt: string;
}

export interface Plan {
  id: PlanType;
  name: string;
  priceRwf: number;
  maxWorkers: number;
  features: string[];
}

export interface Business {
  id: string;
  name: string;
  ownerId: string;
  ownerName: string;
  email: string;
  phone: string;
  status: BusinessStatus;
  planId: PlanType;
  createdAt: string;
  logoUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  costPrice: number;
  quantity: number;
  minStockAlert: number;
  unit: string;
}

export interface Sale {
  id: string;
  bizId: string;
  cashierId: string;
  total: number;
  paymentMethod: 'CASH' | 'MOMO' | 'CARD' | 'CREDIT';
  status: 'COMPLETED' | 'PENDING';
  items: SaleItem[];
  createdAt: string;
}

export interface SaleItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
}

export interface Invoice {
  id: string;
  bizId: string;
  clientId: string;
  total: number;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';
  dueDate: string;
  createdAt: string;
}
