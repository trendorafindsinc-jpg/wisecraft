/**
 * Firebase Authentication Service
 * Production-ready auth operations with error handling
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  type User as FirebaseUser,
  type AuthError,
} from "firebase/auth";
import { auth } from "./config";

// Auth error codes mapped to user-friendly messages
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Please check your connection.",
  "auth/user-disabled": "This account has been disabled.",
};

function getErrorMessage(error: AuthError): string {
  return AUTH_ERROR_MESSAGES[error.code] || "An unexpected error occurred. Please try again.";
}

export interface AuthResult {
  success: boolean;
  user?: FirebaseUser;
  error?: string;
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<AuthResult> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: getErrorMessage(error as AuthError) };
  }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: getErrorMessage(error as AuthError) };
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<AuthResult> {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: getErrorMessage(error as AuthError) };
  }
}

/**
 * Sign out current user
 */
export async function logOut(): Promise<AuthResult> {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: getErrorMessage(error as AuthError) };
  }
}

/**
 * Subscribe to auth state changes
 */
export function onAuthChange(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Get current user (synchronous, may be null)
 */
export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser;
}
