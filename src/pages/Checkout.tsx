import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Shield, ChevronRight, Check, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { courses, formatPrice } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = searchParams.get('courseId');
  
  const [paymentMethod, setPaymentMethod] = useState<'mobile' | 'card'>('mobile');
  const [mobileProvider, setMobileProvider] = useState<'mtn' | 'airtel'>('mtn');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentInstructions, setPaymentInstructions] = useState<string[]>([]);
  
  // Card payment fields
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [email, setEmail] = useState('');

  // Find course by ID or default to first course
  const course = courses.find(c => c.id === courseId) || courses[0];
  const serviceFee = Math.round(course.price * 0.05);
  const total = course.price + serviceFee;

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleMobilePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      toast({
        title: 'Phone number required',
        description: 'Please enter your mobile money phone number',
        variant: 'destructive',
      });
      return;
    }

    // Validate phone number format
    const phoneRegex = /^(256|0)?(7[0-9]{8})$/;
    const cleanPhone = phoneNumber.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      toast({
        title: 'Invalid phone number',
        description: 'Please enter a valid Ugandan phone number (e.g., 0771234567)',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('process-mobile-payment', {
        body: {
          courseId: course.id,
          courseTitle: course.title,
          amount: total,
          phoneNumber: cleanPhone,
          paymentMethod: mobileProvider,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.success) {
        setPaymentSuccess(true);
        setPaymentInstructions(data.instructions || []);
        
        toast({
          title: 'Payment Initiated!',
          description: data.message,
        });
      } else {
        throw new Error(data.error || 'Payment failed');
      }
    } catch (error: unknown) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
      toast({
        title: 'Payment Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate card fields
    if (!cardholderName.trim()) {
      toast({ title: 'Cardholder name required', variant: 'destructive' });
      return;
    }
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: 'Valid email required', variant: 'destructive' });
      return;
    }
    
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
      toast({ title: 'Invalid card number', variant: 'destructive' });
      return;
    }
    
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      toast({ title: 'Invalid expiry date (MM/YY)', variant: 'destructive' });
      return;
    }
    
    if (cvv.length < 3 || cvv.length > 4) {
      toast({ title: 'Invalid CVV', variant: 'destructive' });
      return;
    }

    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('process-card-payment', {
        body: {
          courseId: course.id,
          courseTitle: course.title,
          amount: total,
          cardNumber: cleanCardNumber,
          expiryDate,
          cvv,
          cardholderName,
          email,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.success) {
        setPaymentSuccess(true);
        setPaymentInstructions([
          `Payment of ${formatPrice(total)} completed successfully`,
          `Card used: ${data.cardType} ending in ${data.lastFourDigits}`,
          `Transaction ID: ${data.transactionId}`,
          'A confirmation email will be sent to your email address',
          'You now have lifetime access to this course',
        ]);
        
        toast({
          title: 'Payment Successful!',
          description: data.message,
        });
      } else {
        throw new Error(data.error || 'Payment failed');
      }
    } catch (error: unknown) {
      console.error('Card payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Payment processing failed';
      toast({
        title: 'Payment Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <Layout showFooter={false}>
        <section className="py-16 bg-background min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-primary" />
              </div>
              
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Payment Initiated Successfully!
              </h1>
              
              <div className="bg-card rounded-2xl p-6 shadow-soft mb-6 text-left">
                <h2 className="font-semibold text-foreground mb-4">Complete your payment:</h2>
                <ol className="space-y-3">
                  {paymentInstructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3 text-muted-foreground">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span>{instruction.replace(/^\d+\.\s*/, '')}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={`p-4 rounded-lg mb-6 ${mobileProvider === 'mtn' ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`font-medium ${mobileProvider === 'mtn' ? 'text-yellow-700' : 'text-red-700'}`}>
                  Check your phone ({phoneNumber}) for the {mobileProvider === 'mtn' ? 'MTN MoMo' : 'Airtel Money'} prompt
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={() => navigate('/courses')}>
                  Browse More Courses
                </Button>
                <Button variant="hero" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout showFooter={false}>
      {/* Breadcrumb */}
      <div className="bg-secondary py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/course/${course.id}`} className="hover:text-primary">Course</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
              Complete Your Purchase
            </h1>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Payment Form */}
              <div className="lg:col-span-3 space-y-6">
                {/* Payment Method Selection */}
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Select Payment Method
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        paymentMethod === 'mobile'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setPaymentMethod('mobile')}
                    >
                      <Smartphone className="w-6 h-6 text-primary" />
                      <div className="text-left">
                        <p className="font-semibold text-foreground">Mobile Money</p>
                        <p className="text-xs text-muted-foreground">MTN, Airtel</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                        paymentMethod === 'card'
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CreditCard className="w-6 h-6 text-primary" />
                      <div className="text-left">
                        <p className="font-semibold text-foreground">Card Payment</p>
                        <p className="text-xs text-muted-foreground">Visa, MasterCard</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Payment Details Form */}
                <form onSubmit={paymentMethod === 'mobile' ? handleMobilePayment : handleCardPayment} className="bg-card rounded-2xl p-6 shadow-soft">
                  {paymentMethod === 'mobile' ? (
                    <div className="space-y-4">
                      <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                        Mobile Money Details
                      </h2>
                      
                      {/* Provider Selection */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          className={`p-4 rounded-lg border-2 transition-all ${
                            mobileProvider === 'mtn'
                              ? 'border-yellow-400 bg-yellow-50'
                              : 'border-border hover:border-yellow-400/50'
                          }`}
                          onClick={() => setMobileProvider('mtn')}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                              <span className="font-bold text-white text-lg">MTN</span>
                            </div>
                            <p className="font-bold text-yellow-600">MTN MoMo</p>
                          </div>
                        </button>
                        <button
                          type="button"
                          className={`p-4 rounded-lg border-2 transition-all ${
                            mobileProvider === 'airtel'
                              ? 'border-red-400 bg-red-50'
                              : 'border-border hover:border-red-400/50'
                          }`}
                          onClick={() => setMobileProvider('airtel')}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="font-bold text-white text-xs">AIRTEL</span>
                            </div>
                            <p className="font-bold text-red-600">Airtel Money</p>
                          </div>
                        </button>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Phone Number</label>
                        <Input
                          type="tel"
                          placeholder="e.g., 0772 123 456"
                          className="h-12"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter the phone number registered with {mobileProvider === 'mtn' ? 'MTN MoMo' : 'Airtel Money'}
                        </p>
                      </div>

                      <div className={`p-4 rounded-lg ${mobileProvider === 'mtn' ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
                        <p className="text-sm text-muted-foreground">
                          You will receive a prompt on your phone to confirm the payment of{' '}
                          <span className="font-semibold text-foreground">{formatPrice(total)}</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                        Card Details
                      </h2>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Cardholder Name</label>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          className="h-12"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Email Address</label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          className="h-12"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Card Number</label>
                        <Input
                          type="text"
                          placeholder="4242 4242 4242 4242"
                          className="h-12"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          maxLength={19}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Expiry Date</label>
                          <Input
                            type="text"
                            placeholder="MM/YY"
                            className="h-12"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                            maxLength={5}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">CVV</label>
                          <Input
                            type="text"
                            placeholder="123"
                            className="h-12"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                        <div className="flex gap-2">
                          <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                          <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center">
                            <div className="w-3 h-3 bg-red-600 rounded-full opacity-80"></div>
                            <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-80 -ml-1"></div>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">We accept Visa and MasterCard</span>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full mt-6"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing Payment...
                      </>
                    ) : paymentMethod === 'mobile' ? (
                      `Pay ${formatPrice(total)} with ${mobileProvider === 'mtn' ? 'MTN MoMo' : 'Airtel Money'}`
                    ) : (
                      `Pay ${formatPrice(total)} with Card`
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Secure payment powered by trusted providers</span>
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl p-6 shadow-soft sticky top-24">
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                    Order Summary
                  </h2>

                  <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-20 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-foreground line-clamp-2 text-sm">
                        {course.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        By {course.trainerName}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Course Price</span>
                      <span className="text-foreground">{formatPrice(course.price)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span className="text-foreground">{formatPrice(serviceFee)}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-display text-xl font-bold text-primary">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      'Lifetime access to course content',
                      'Certificate of completion',
                      '30-day money-back guarantee',
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;