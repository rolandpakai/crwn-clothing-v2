import { useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { StripeCardElement } from "@stripe/stripe-js";

import { BUTTON_TYPE_CLASSES } from "../button/button.component"
import { PaymentFromContainer, FormContainer, PaymentButton } from "./payment-form.styles";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null ;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 })
    }).then(
      res => res.json()
    );

    const clientSecret = response.paymentIntent.client_secret; 

    const cartDetails = elements.getElement(CardElement);

    if(cartDetails && ifValidCardElement(cartDetails)) {
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cartDetails,
          billing_details: {
            name: currentUser ? currentUser.displayName: 'Guest',
          }
        }
      });

      setIsProcessingPayment(false);

      if(paymentResult.error) {
        console.log('paymentResult.error', paymentResult.error);
        alert(paymentResult.error);
      } else {
        if(paymentResult.paymentIntent.status === 'succeeded') {
          alert('Payment Successful');
        }
      }
    }
  }

  return (
    <PaymentFromContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <PaymentButton 
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}>
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFromContainer>
  );
}

export default PaymentForm;