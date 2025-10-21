import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppLayout() {
    const { token, logout } = useAuth();
    return (
        <div>
            <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #eee' }}>
                <Link to="/">Posts</Link>
                <Link to="/create">Create</Link>
                {token ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
            </nav>
            <main style={{ padding: 16 }}>
                <Outlet />
            </main>
        </div>
    );
}
