import React, { useState, useEffect } from 'react';

const PaymentPage = ({ userName }) => {
  const [currentPaymentStatus, setCurrentPaymentStatus] = useState(true);
  const [dueAmount, setDueAmount] = useState(0);
  const [paymentError, setPaymentError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const handlePayment = async () => {
    const confirmPayment = window.confirm('Are you sure you want to proceed with the payment?');

    if (!confirmPayment) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/complete-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName, amount: dueAmount }),
      });

      if (response.status === 200) {
        getCurrentPaymentStatus();
        setPaymentError("");
      } else {
        const data = await response.json();
        setPaymentError(data.error || 'Unknown Error! Failed Payment.');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
    
  };

  const getCurrentPaymentStatus = async () => {
    try {
      setFetching(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get-payment-status?username=${userName}`);
      if (response.status === 200) {
        const data = await response.json();
        setCurrentPaymentStatus(data.due_status || false);
        setDueAmount(data.amount || 0);
      } else {
        const data = await response.json();
      }
    } catch (error) {
    }finally{
      setFetching(false);
    }
  };

  useEffect(() => {
    getCurrentPaymentStatus();
  }, [userName]);

  return (
    <div className="jumbotron mt-4">
      <h3>Payment Request</h3>
      {currentPaymentStatus ? (
        <>
          <p>Total Due Fee Amount till Current Month:{fetching?'Fetching if any dues...':'INR '+dueAmount+'/-'}</p>
          <button className="btn btn-primary" onClick={handlePayment} disabled={loading || !dueAmount}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
          {paymentError && <p className="mt-2" style={{ color: 'red' }}>{paymentError}</p>}
        </>
      ) : (
        <p style={{ color: 'green' }}>Fee Dues Cleared! Nothing to Pay! Enjoy your Yoga Classes!</p>
      )}
    </div>
  );
};

export default PaymentPage;
