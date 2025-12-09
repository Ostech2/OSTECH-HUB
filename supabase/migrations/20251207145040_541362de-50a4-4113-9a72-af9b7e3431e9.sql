-- Create payments table to track all transactions
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'UGX',
  payment_method TEXT NOT NULL CHECK (payment_method IN ('mtn', 'airtel')),
  phone_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  transaction_id TEXT,
  external_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert payments (for guest checkout)
CREATE POLICY "Anyone can create payments" 
ON public.payments 
FOR INSERT 
WITH CHECK (true);

-- Users can view their own payments
CREATE POLICY "Users can view own payments" 
ON public.payments 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();