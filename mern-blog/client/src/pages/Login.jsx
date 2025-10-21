import { useState } from 'react';
import { http } from '../api/http';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const { token } = await http('/auth/login', { method: 'POST', body: { email, password } });
            login(token);
            navigate('/');
        } catch (e) {
            setError(e.data?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
}
