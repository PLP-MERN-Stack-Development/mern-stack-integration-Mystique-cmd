import { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { Link } from 'react-router-dom';

export default function PostListPage() {
    const [page, setPage] = useState(1);
    const [q, setQ] = useState('');
    const { data, loading, error } = usePosts({ page, limit: 10, q });

    return (
        <div>
            <h1>Blog posts</h1>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." />
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {data.items.map(p => (
                    <li key={p._id}>
                        <Link to={`/posts/${p._id}`}>{p.title}</Link>
                    </li>
                ))}
            </ul>
            <div style={{ display: 'flex', gap: 8 }}>
                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
                <span>{page} / {data.pages}</span>
                <button disabled={page >= data.pages} onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
        </div>
    );
}
