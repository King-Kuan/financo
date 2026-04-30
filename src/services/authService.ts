/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserRole, Business, UserProfile } from '../types';

const googleProvider = new GoogleAuthProvider();

export const authService = {
  async signInWithGoogle() {
    try {
      auth.useDeviceLanguage();
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error: any) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  async signOut() {
    await firebaseSignOut(auth);
  },

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const path = `users/${uid}`;
    try {
      const docSnap = await getDoc(doc(db, path));
      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  },

  async isSuperAdmin(uid: string): Promise<boolean> {
    const path = `admins/${uid}`;
    try {
      const docSnap = await getDoc(doc(db, path));
      return docSnap.exists();
    } catch (error) {
      // Permission denied or unreachable means not admin in most cases
      return false;
    }
  },

  async registerOwner(user: FirebaseUser, businessData: { name: string; planId: string }) {
    const bizId = `biz_${user.uid.slice(0, 8)}`;
    
    const business: Business = {
      id: bizId,
      name: businessData.name,
      ownerId: user.uid,
      ownerName: user.displayName || 'Owner',
      email: user.email || '',
      phone: '',
      planId: businessData.planId as any,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    const profile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      name: user.displayName || 'Owner',
      role: 'OWNER',
      businessId: bizId,
      createdAt: new Date().toISOString()
    };

    try {
      // Create profile and business in parallel
      await Promise.all([
        setDoc(doc(db, 'users', user.uid), profile),
        setDoc(doc(db, 'businesses', bizId), business)
      ]);
      return { profile, business };
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'multi-path');
    }
  },

  async getBusiness(bizId: string): Promise<Business | null> {
    const path = `businesses/${bizId}`;
    try {
      const docSnap = await getDoc(doc(db, path));
      if (docSnap.exists()) {
        return docSnap.data() as Business;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  }
};
