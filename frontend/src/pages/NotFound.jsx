import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <h1>404 — Page not found</h1>
            <p>The page you are looking for does not exist.</p>
            <button onClick={() => navigate('/')}>Back to shop</button>
        </div>
    );
}
