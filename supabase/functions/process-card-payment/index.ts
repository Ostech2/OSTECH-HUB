import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CardPaymentRequest {
  courseId: string;
  courseTitle: string;
  amount: number;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  email: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const paymentRequest: CardPaymentRequest = await req.json();
    const { courseId, courseTitle, amount, cardNumber, expiryDate, cvv, cardholderName, email } = paymentRequest;

    console.log('Processing card payment:', { courseId, courseTitle, amount, cardholderName, email });

    // Validate card number (basic Luhn algorithm check)
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cleanCardNumber)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid card number format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate expiry date (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid expiry date format. Use MM/YY' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if card is expired
    const [month, year] = expiryDate.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Card has expired' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate CVV
    if (!/^\d{3,4}$/.test(cvv)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid CVV' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate transaction ID
    const transactionId = `CARD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Determine card type
    let cardType = 'Unknown';
    if (cleanCardNumber.startsWith('4')) {
      cardType = 'Visa';
    } else if (/^5[1-5]/.test(cleanCardNumber) || /^2[2-7]/.test(cleanCardNumber)) {
      cardType = 'MasterCard';
    } else if (/^3[47]/.test(cleanCardNumber)) {
      cardType = 'American Express';
    }

    // Create payment record
    const { data: paymentRecord, error: insertError } = await supabase
      .from('payments')
      .insert({
        course_id: courseId,
        course_title: courseTitle,
        amount: amount,
        currency: 'UGX',
        payment_method: `card_${cardType.toLowerCase().replace(' ', '_')}`,
        phone_number: email, // Using email for card payments
        status: 'processing',
        transaction_id: transactionId,
        external_reference: `****${cleanCardNumber.slice(-4)}`,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to create payment record:', insertError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to create payment record' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Payment record created:', paymentRecord.id);

    // Simulate card payment processing (in production, integrate with payment gateway like Flutterwave, Paystack, etc.)
    // For demo purposes, we'll simulate a successful payment after validation
    
    // Update payment status to completed (simulated)
    const { error: updateError } = await supabase
      .from('payments')
      .update({ status: 'completed' })
      .eq('id', paymentRecord.id);

    if (updateError) {
      console.error('Failed to update payment status:', updateError);
    }

    console.log('Card payment processed successfully for transaction:', transactionId);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Payment processed successfully!',
        transactionId: transactionId,
        cardType: cardType,
        lastFourDigits: cleanCardNumber.slice(-4),
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Card payment processing error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
