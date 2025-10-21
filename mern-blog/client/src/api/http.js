export const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function http(path, { method = 'GET', body, token, headers } = {}) {
    const opts = { method, headers: { 'Content-Type': 'application/json', ...(headers || {}) } };
    if (token) opts.headers.Authorization = `Bearer ${token}`;
    if (body && opts.headers['Content-Type'] === 'application/json') {
        opts.body = JSON.stringify(body);
    }
    const res = await fetch(`${API_BASE}${path}`, opts);
    const isJson = res.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await res.json() : null;
    if (!res.ok) throw { status: res.status, data };
    return data;
}

export async function uploadImage(file) {
    const form = new FormData();
    form.append('image', file);
    const res = await fetch(`${API_BASE}/posts/upload`, { method: 'POST', body: form });
    const data = await res.json();
    if (!res.ok) throw data;
    return data; // { filename, url }
}
