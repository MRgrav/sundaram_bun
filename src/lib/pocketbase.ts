import PocketBase from 'pocketbase';
import User from 'pocketbase'; // Import for typing

const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';

export const pb = new PocketBase(POCKETBASE_URL);

// Optional: Enable auto cancellation
pb.autoCancellation(false);

// Define the type for the authenticated user record
export interface AuthUser extends User {
    username: string;
    email: string;
    // Add other fields from your PocketBase 'users' collection here if needed
}

export const isAuthenticated = () => {
    return pb.authStore.isValid && pb.authStore.token
}