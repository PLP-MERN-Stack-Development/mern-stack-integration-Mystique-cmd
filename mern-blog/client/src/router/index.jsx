import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import PostListPage from '../pages/PostListPage';
import PostViewPage from '../pages/PostViewPage';
import PostEditPage from '../pages/PostEditPage';
import Login from '../pages/Login';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <PostListPage /> },
            { path: 'posts/:id', element: <PostViewPage /> },
            { path: 'posts/:id/edit', element: <PostEditPage /> },
            { path: 'create', element: <PostEditPage /> },
            { path: 'login', element: <Login /> },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
