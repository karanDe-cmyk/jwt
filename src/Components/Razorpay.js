import React, { useRef } from 'react';

export default function Razorpay() {
    const nameRef = useRef();
    const mobileRef = useRef();
    const amountRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const details = {
            name: nameRef.current.value,
            mobile: mobileRef.current.value,
            amount: amountRef.current.value
        };

        try {
            const res = await fetch('http://localhost:3001/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(details)
            });

            const data = await res.json();

            const options = {
                key: 'rzp_test_TlxM6W37t3zETC',
                amount: data.amount,
                currency: 'INR',
                name: 'letsmakecompany',
                description: 'Test Payment',
                order_id: data.id,
                handler: function (response) {
                    alert('Payment Successful!');
                    console.log('Payment ID:', response.razorpay_payment_id);
                    console.log('Order ID:', response.razorpay_order_id);
                    console.log('Signature:', response.razorpay_signature);
                },
                prefill: {
                    name: details.name,
                    contact: details.mobile
                },
                theme: {
                    color: '#003a9b'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error initiating payment:', error);
            alert('Failed to initiate payment. Please try again.');
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 bg-light'>
            <form onSubmit={handleSubmit} className="w-50 p-4 border rounded bg-white shadow-sm">
                <h2 className="text-center mb-4">Payment Form</h2>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type='text' className='form-control' ref={nameRef} placeholder='Enter your name' required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Mobile</label>
                    <input type='tel' className='form-control' ref={mobileRef} placeholder='Enter your phone number' pattern='[0-9]{10}' required />
                    <div className="form-text">Must be a 10-digit number</div>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Amount</label>
                    <input type='number' className='form-control' ref={amountRef} placeholder='Enter amount' required />
                </div>
                <button type='submit' className='btn btn-primary w-100'>Pay now</button>
            </form>
        </div>
    );
}
