import axios from 'axios';
import type { User, Post } from '../types/api';

// Create axios instances for different backends
export const nodeApi = axios.create({
  baseURL: import.meta.env.VITE_NODE_API_URL || 'http://localhost:3000/api',
});

export const phpApi = axios.create({
  baseURL: import.meta.env.VITE_PHP_API_URL || 'http://localhost:8000/api',
});

// Helper function to ensure data is serializable
const ensureSerializable = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};

// User-related API calls
export const userApi = {
  // From Node.js backend
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await nodeApi.get('/users');
      return ensureSerializable(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },
  
  // From PHP backend
  getUserDetails: async (id: string): Promise<User | null> => {
    try {
      const response = await phpApi.get(`/users/${id}`);
      return ensureSerializable(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  },
};

// Post-related API calls
export const postApi = {
  // From Node.js backend
  getPosts: async (): Promise<Post[]> => {
    try {
      const response = await nodeApi.get('/posts');
      return ensureSerializable(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },
  
  // From PHP backend
  getPostAnalytics: async (id: string) => {
    try {
      const response = await phpApi.get(`/posts/${id}/analytics`);
      return ensureSerializable(response.data);
    } catch (error) {
      console.error('Error fetching post analytics:', error);
      return null;
    }
  },
};
