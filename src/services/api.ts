import axios from 'axios';
import type { User, Post } from '../types/api';

// Create axios instances for different backends
export const nodeApi = axios.create({
  baseURL: import.meta.env.VITE_NODE_API_URL || 'http://localhost:3000/api',
});

export const phpApi = axios.create({
  baseURL: import.meta.env.VITE_PHP_API_URL || 'http://localhost:8000/api',
});

// User-related API calls
export const userApi = {
  // From Node.js backend
  getUsers: async (): Promise<User[]> => {
    const response = await nodeApi.get('/users');
    return response.data;
  },
  
  // From PHP backend
  getUserDetails: async (id: string): Promise<User> => {
    const response = await phpApi.get(`/users/${id}`);
    return response.data;
  },
};

// Post-related API calls
export const postApi = {
  // From Node.js backend
  getPosts: async (): Promise<Post[]> => {
    const response = await nodeApi.get('/posts');
    return response.data;
  },
  
  // From PHP backend
  getPostAnalytics: async (id: string) => {
    const response = await phpApi.get(`/posts/${id}/analytics`);
    return response.data;
  },
};