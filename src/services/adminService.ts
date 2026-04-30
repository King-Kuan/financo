/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  collection, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  doc, 
  orderBy 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Business } from '../types';

export const adminService = {
  async getPendingBusinesses(): Promise<Business[]> {
    const path = 'businesses';
    try {
      const q = query(
        collection(db, path), 
        where('status', '==', 'PENDING'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => doc.data() as Business);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  async approveBusiness(bizId: string) {
    const path = `businesses/${bizId}`;
    try {
      await updateDoc(doc(db, path), {
        status: 'ACTIVE',
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  async getPlatformStats() {
    const path = 'businesses';
    try {
      const querySnapshot = await getDocs(collection(db, path));
      const businesses = querySnapshot.docs.map(doc => doc.data() as Business);
      
      return {
        total: businesses.length,
        active: businesses.filter(b => b.status === 'ACTIVE').length,
        pending: businesses.filter(b => b.status === 'PENDING').length
      };
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return { total: 0, active: 0, pending: 0 };
    }
  }
};
