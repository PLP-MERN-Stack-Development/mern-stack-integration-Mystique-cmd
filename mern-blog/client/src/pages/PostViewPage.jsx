import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { http } from '../api/http';

export default function PostViewPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await http(`/posts/${id}`);
                setPost(res);
            } catch (e) {
                setError('Failed to load');
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!post) return null;

    return (
        <div>
            <h1>{post.title}</h1>
            {post.featuredImage && <img src={post.featuredImage.startsWith('/uploads') ? post.featuredImage : `/uploads/${post.featuredImage}`} alt="" width={400} />}
            <p>{post.content}</p>
            <Link to={`/posts/${id}/edit`}>Edit</Link>
        </div>
    );
}
