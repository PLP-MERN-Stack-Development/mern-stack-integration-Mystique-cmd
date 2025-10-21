import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { http, uploadImage } from '../api/http';
import { useAuth } from '../context/AuthContext';

export default function PostEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    const [form, setForm] = useState({ title: '', slug: '', content: '', categories: [], featuredImage: '' });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const res = await http(`/posts/${id}`);
                setForm({ title: res.title, slug: res.slug, content: res.content, categories: res.categories?.map(c => c._id) || [], featuredImage: res.featuredImage || '' });
            } catch (e) {
                setError('Failed to load post');
            }
        })();
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setSaving(true); setError(null);
        try {
            const method = id ? 'PUT' : 'POST';
            const path = id ? `/posts/${id}` : '/posts';
            const optimisticUpdate = { ...form }; // optimistic snapshot
            // You can update local lists here before confirmation for optimistic UI
            const res = await http(path, { method, body: form, token });
            navigate(`/posts/${res._id}`);
        } catch (e) {
            setError(e.data?.errors?.join(', ') || e.data?.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    const onFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const { url } = await uploadImage(file);
            setForm(f => ({ ...f, featuredImage: url }));
        } catch {
            setError('Image upload failed');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>{id ? 'Edit post' : 'Create post'}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <input placeholder="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
            <textarea placeholder="Content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <button disabled={saving} type="submit">{saving ? 'Saving...' : 'Save'}</button>
        </form>
    );
}
