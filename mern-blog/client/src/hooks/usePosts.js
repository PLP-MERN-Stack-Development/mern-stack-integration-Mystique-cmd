import { useEffect, useState } from 'react';
import { http } from '../api/http';

export function usePosts(params = {}) {
    const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true); setError(null);
            try {
                const qs = new URLSearchParams(params).toString();
                const res = await http(`/posts?${qs}`);
                setData(res);
            } catch (err) {
                setError(err.data?.message || 'Failed to load posts');
            } finally {
                setLoading(false);
            }
        })();
    }, [JSON.stringify(params)]);

    return { data, loading, error, setData };
}
