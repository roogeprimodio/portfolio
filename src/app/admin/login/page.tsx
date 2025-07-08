
'use client';

import { useFormState } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginWithEmail } from '@/auth/actions';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  // Using a ref to track pending state as useFormStatus is not available in this context
  const ref = useRef<HTMLButtonElement>(null);
  
  // A bit of a hack to manage pending state without useFormStatus
  const form = ref.current?.closest('form');
  
  // This is not a perfect solution for pending state, but it's a simple one
  // For a real app, you might want a more robust state management
  let pending = false;
  if (form) {
    form.addEventListener('submit', () => {
        pending = true;
        if(ref.current) ref.current.disabled = true;
    });
  }

  return (
    <Button type="submit" className="w-full" disabled={pending} ref={ref}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(loginWithEmail, undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.success === false && state.message) {
      toast({
        title: "Login Failed",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
