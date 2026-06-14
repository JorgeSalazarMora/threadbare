import { useState } from "react";
import './CheckoutForm.css';

export default function CheckoutForm({ onSuccess }){

    const [fields, setFields] = useState({
        name: '',
        email: '',
        address: '',
        cardNumber: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        address: '',
        cardNumber: '',
    });

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        address: false,
        cardNumber: false,
    });

    function handleSubmit(e) {
        e.preventDefault()
        if (!isFormValid) return
        onSuccess()
        setFields({ name: '', email: '', address: '', cardNumber: '' });
        setTouched({ name: false, email: false, address: false, cardNumber: false });
    }

    function validate(field, value)
    {
        switch (field){
            case 'name': return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
            case 'email': return !value.includes('@') ? 'Enter a valid email address' : '';
            case 'address':  return value.trim().length < 10 ? 'Enter your full address' : '';
            case 'cardNumber': return !/^\d{16}$/.test(value.replace(/\s/g,''))
                                ? 'Card number must be 16 digits' : '';
            default: return '';
        }
    }

    const isFormValid = Object.keys(fields).every(field =>
        fields[field].trim() !== '' && validate(field, fields[field]) === ''
    );
   
  return(
    <div>
         <button type="button" className="back-link" onClick={() => window.scrollTo(0, 0)}>
                    Back to cart
         </button>
          
        <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="field">
                <label>Name</label>
                <input value={fields.name}
                    onChange={e => {
                        const v = e.target.value;
                        setFields(prev => ({ ...prev, name: v }));
                        if (touched.name) setErrors(prev => ({ ...prev, name: validate('name', v) }));
                    }}
                    onBlur={e => {
                        const v = e.target.value;
                        setTouched(prev => ({ ...prev, name: true }));
                        setErrors(prev => ({ ...prev, name: validate('name', v) }));
                    }}/>
                {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="field">
                <label>Email</label>
                <input value={fields.email}
                    onChange={e => {
                        const v = e.target.value;
                        setFields(prev => ({ ...prev, email: v }));
                        if (touched.email) setErrors(prev => ({ ...prev, email: validate('email', v) }));
                    }}
                    onBlur={e => {
                        const v = e.target.value;
                        setTouched(prev => ({ ...prev, email: true }));
                        setErrors(prev => ({ ...prev, email: validate('email', v) }));
                    }}/>
                {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="field">
                <label>Address</label>
                <input value={fields.address}
                    onChange={e => {
                        const v = e.target.value;
                        setFields(prev => ({ ...prev, address: v }));
                        if (touched.address) setErrors(prev => ({ ...prev, address: validate('address', v) }));
                    }}
                    onBlur={e => {
                        const v = e.target.value;
                        setTouched(prev => ({ ...prev, address: true }));
                        setErrors(prev => ({ ...prev, address: validate('address', v) }));
                    }}/>
                {errors.address && <span className="field-error">{errors.address}</span>}
            </div>

            <div className="field">
                <label>Card Number</label>
                <input value={fields.cardNumber}
                    onChange={e => {
                        const v = e.target.value;
                        setFields(prev => ({ ...prev, cardNumber: v }));
                        if (touched.cardNumber) setErrors(prev => ({ ...prev, cardNumber: validate('cardNumber', v) }));
                    }}
                    onBlur={e => {
                        const v = e.target.value;
                        setTouched(prev => ({ ...prev, cardNumber: true }));
                        setErrors(prev => ({ ...prev, cardNumber: validate('cardNumber', v) }));
                    }}/>
                {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
            </div>
            
            <button disabled={!isFormValid}>Place order</button>
        </form>
    </div>
    
  );
}