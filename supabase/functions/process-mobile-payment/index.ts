import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  courseId: string;
  courseTitle: string;
  amount: number;
  phoneNumber: string;
  paymentMethod: "mtn" | "airtel";
}

async function sendSMS(phoneNumber: string, message: string): Promise<boolean> {
  const apiKey = Deno.env.get("AFRICASTALKING_API_KEY");
  const username = Deno.env.get("AFRICASTALKING_USERNAME");

  if (!apiKey || !username) {
    console.error("Africa's Talking credentials not configured");
    return false;
  }

  // Format phone number to international format for Uganda
  let formattedPhone = phoneNumber.replace(/\s/g, "");
  if (formattedPhone.startsWith("0")) {
    formattedPhone = "+256" + formattedPhone.substring(1);
  } else if (formattedPhone.startsWith("256")) {
    formattedPhone = "+" + formattedPhone;
  } else if (!formattedPhone.startsWith("+")) {
    formattedPhone = "+256" + formattedPhone;
  }

  try {
    const response = await fetch("https://api.africastalking.com/version1/messaging", {
      method: "POST",
      headers: {
        "apiKey": apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      },
      body: new URLSearchParams({
        username: username,
        to: formattedPhone,
        message: message,
      }),
    });

    const result = await response.json();
    console.log("SMS API Response:", JSON.stringify(result));

    if (result.SMSMessageData?.Recipients?.[0]?.status === "Success") {
      console.log("SMS sent successfully to:", formattedPhone);
      return true;
    } else {
      console.error("SMS sending failed:", result);
      return false;
    }
  } catch (error) {
    console.error("Error sending SMS:", error);
    return false;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { courseId, courseTitle, amount, phoneNumber, paymentMethod }: PaymentRequest = await req.json();

    console.log(`Processing ${paymentMethod.toUpperCase()} payment for course: ${courseTitle}`);
    console.log(`Amount: UGX ${amount}, Phone: ${phoneNumber}`);

    // Validate phone number format for Uganda
    const phoneRegex = /^(256|0)?(7[0-9]{8})$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid phone number format. Use format: 0771234567 or 256771234567" 
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate transaction reference
    const transactionId = `OSTECH-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        course_id: courseId,
        course_title: courseTitle,
        amount: amount,
        currency: "UGX",
        payment_method: paymentMethod,
        phone_number: phoneNumber,
        status: "pending",
        transaction_id: transactionId,
      })
      .select()
      .single();

    if (paymentError) {
      console.error("Error creating payment record:", paymentError);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to create payment record" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Payment record created:", payment.id);

    // Send SMS notification to the user
    const providerName = paymentMethod === "mtn" ? "MTN Mobile Money" : "Airtel Money";
    const smsMessage = `OSTECH HUB: To complete your payment of UGX ${amount.toLocaleString()} for "${courseTitle}", please dial *165# (MTN) or *185# (Airtel) and approve the transaction. Ref: ${transactionId}`;
    
    const smsSent = await sendSMS(phoneNumber, smsMessage);
    
    if (smsSent) {
      console.log("SMS notification sent successfully");
    } else {
      console.log("SMS notification failed, but payment record created");
    }

    // Update payment status to processing
    await supabase
      .from("payments")
      .update({ status: "processing" })
      .eq("id", payment.id);

    const simulatedResponse = {
      success: true,
      transactionId: transactionId,
      message: `${providerName} payment initiated. You will receive an SMS with instructions on ${phoneNumber}.`,
      paymentId: payment.id,
      smsSent: smsSent,
      instructions: [
        `1. You will receive an SMS on ${phoneNumber} with payment details`,
        `2. Dial ${paymentMethod === "mtn" ? "*165#" : "*185#"} to access Mobile Money`,
        "3. Select 'Approve Transaction' or 'Payments'",
        "4. Enter your PIN to confirm the payment",
        "5. Your course access will be activated once payment is confirmed"
      ]
    };

    console.log("Payment processed successfully:", transactionId);

    return new Response(
      JSON.stringify(simulatedResponse),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: unknown) {
    console.error("Error processing payment:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});