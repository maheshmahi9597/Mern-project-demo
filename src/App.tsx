import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Users, FileText } from 'lucide-react';
import { userApi, postApi } from './services/api';

const queryClient = new QueryClient();

function Dashboard() {
  const { data: users, isLoading: usersLoading } = useQuery('users', userApi.getUsers);
  const { data: posts, isLoading: postsLoading } = useQuery('posts', postApi.getPosts);

  if (usersLoading || postsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Users</h2>
        </div>
        <ul className="space-y-2">
          {users?.map((user) => (
            <li key={user.id} className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-6 h-6 text-green-500" />
          <h2 className="text-xl font-semibold">Posts</h2>
        </div>
        <ul className="space-y-2">
          {posts?.map((post) => (
            <li key={post.id} className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium">{post.title}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <h1 className="text-xl font-bold text-gray-800">MERN + PHP Integration</h1>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6">
          <Dashboard />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;