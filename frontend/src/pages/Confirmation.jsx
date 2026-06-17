import { useNavigate } from 'react-router-dom';

export default function Confirmation() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <h1>Order placed!</h1>
            <p>Thank you for your purchase. Your order is on its way.</p>
            <button onClick={() => navigate('/')}>Back to shop</button>
        </div>
    );
}
