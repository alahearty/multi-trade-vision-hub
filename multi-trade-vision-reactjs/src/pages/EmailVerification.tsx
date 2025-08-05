import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Mail, ArrowLeft } from "lucide-react";
import { apiClient } from '@/lib/api';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      setLoading(true);
      const response = await apiClient.verifyEmail({ token: verificationToken });
      
      if (response.error) {
        setVerificationStatus('error');
        setErrorMessage(response.error);
      } else {
        setVerificationStatus('success');
        toast({
          title: "Email Verified",
          description: "Your email has been verified successfully!",
        });
      }
    } catch (error) {
      setVerificationStatus('error');
      setErrorMessage('Failed to verify email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.resendVerification({ email });
      
      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Email Sent",
          description: "Verification email sent successfully. Please check your inbox.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying your email...</p>
        </div>
      );
    }

    if (verificationStatus === 'success') {
      return (
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
          <p className="text-muted-foreground mb-6">
            Your email has been verified successfully. You can now log in to your account.
          </p>
          <Button onClick={() => navigate('/login')} className="w-full">
            Continue to Login
          </Button>
        </div>
      );
    }

    if (verificationStatus === 'error') {
      return (
        <div className="text-center py-8">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
          <p className="text-muted-foreground mb-6">
            {errorMessage || 'The verification link is invalid or has expired.'}
          </p>
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />
              <Button 
                onClick={resendVerification} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Sending...' : 'Resend Verification Email'}
              </Button>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="w-full"
            >
              Back to Login
            </Button>
          </div>
        </div>
      );
    }

    // Default state - no token provided
    return (
      <div className="text-center py-8">
        <Mail className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Email Verification</h2>
        <p className="text-muted-foreground mb-6">
          Please check your email for a verification link, or enter your email below to resend the verification.
        </p>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button 
            onClick={resendVerification} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Sending...' : 'Resend Verification Email'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="w-full"
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowLeft 
                className="h-4 w-4 cursor-pointer" 
                onClick={() => navigate('/login')}
              />
              Email Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 