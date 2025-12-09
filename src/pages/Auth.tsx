import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'learner',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: isLogin ? 'Welcome back!' : 'Account created!',
      description: isLogin
        ? 'You have successfully logged in.'
        : 'Please check your email to verify your account.',
    });

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary" />
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-primary-foreground">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <GraduationCap className="w-7 h-7" />
            </div>
            <span className="font-display text-3xl font-bold">
              OSTECH<span className="text-accent"> HUB</span>
            </span>
          </Link>
          
          <div className="max-w-md text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Empower Your Business Journey
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Join thousands of Ugandan entrepreneurs learning practical skills to grow their businesses.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-display text-3xl font-bold">10K+</p>
              <p className="text-sm text-primary-foreground/70">Learners</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold">150+</p>
              <p className="text-sm text-primary-foreground/70">Courses</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold">50+</p>
              <p className="text-sm text-primary-foreground/70">Trainers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link to="/" className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              OSTECH<span className="text-primary"> HUB</span>
            </span>
          </Link>

          <div className="text-center mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isLogin
                ? 'Sign in to continue your learning journey'
                : 'Start your journey to business success'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 h-12"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">I want to</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.role === 'learner'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setFormData({ ...formData, role: 'learner' })}
                  >
                    <p className="font-semibold text-foreground">Learn</p>
                    <p className="text-xs text-muted-foreground">Take courses</p>
                  </button>
                  <button
                    type="button"
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.role === 'trainer'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setFormData({ ...formData, role: 'trainer' })}
                  >
                    <p className="font-semibold text-foreground">Teach</p>
                    <p className="text-xs text-muted-foreground">Create courses</p>
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            )}

            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isLoading}>
              {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                className="text-primary font-medium hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-12">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
