import { useEffect, useState } from 'react';
import { http } from '../api/http';

export function useCategories() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await http('/categories');
                setItems(res);
            } catch (e) {
                setError('Failed to load categories');
            } finally {
                setLoading(false);
            }
        })();
    }, []);
    return { items, loading, error };
}
