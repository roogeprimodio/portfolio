
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendContactMessageAction } from "@/app/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Instagram, Facebook, Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export function ContactSection() {
  const [isPending, startTransition] = useTransition();
  const [isGlitching, setIsGlitching] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    startTransition(async () => {
      setIsGlitching(true);
      const result = await sendContactMessageAction(values);
      if (result.success) {
        toast({
          title: "TRANSMISSION RECEIVED",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: "LINK FAILED",
          description: "Transmission corrupted. Please try again.",
          variant: "destructive",
        });
      }
      setTimeout(() => setIsGlitching(false), 600);
    });
  };

  return (
    <section id="contact" className="flex flex-col items-center justify-center p-4 overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
      <div className="text-center space-y-2 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle">
          Establish Link
        </h2>
        <p className="text-accent font-code">Send a transmission.</p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-lg"
      >
        <div className="absolute -inset-4 bg-accent/10 rounded-xl blur-2xl animate-glitch-subtle group-hover:bg-accent/20 transition-all duration-500"></div>
        <Card className="relative bg-card/60 backdrop-blur-md border border-accent/30 shadow-2xl shadow-black/50">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-code text-accent">CALLSIGN // NAME</FormLabel>
                    <FormControl><Input placeholder="> Enter your name" {...field} className="bg-card/50 border-accent/50 focus:border-accent font-code" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-code text-accent">FREQUENCY // EMAIL</FormLabel>
                    <FormControl><Input placeholder="> Enter your email" {...field} className="bg-card/50 border-accent/50 focus:border-accent font-code" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-code text-accent">TRANSMISSION // MESSAGE</FormLabel>
                    <FormControl><Textarea placeholder="> Your message..." {...field} rows={4} className="bg-card/50 border-accent/50 focus:border-accent font-code" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" disabled={isPending} className={`w-full group bg-accent/80 text-accent-foreground hover:bg-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 font-headline tracking-widest text-lg ${isGlitching ? 'animate-glitch' : ''}`}>
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'TRANSMIT'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mt-12 text-center">
        <p className="font-code text-accent mb-4">Or connect on other networks</p>
        <div className="flex justify-center gap-6">
          <motion.a href="#" target="_blank" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="text-accent hover:text-primary transition-colors">
            <Instagram className="h-8 w-8" />
          </motion.a>
          <motion.a href="#" target="_blank" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="text-accent hover:text-primary transition-colors">
            <Facebook className="h-8 w-8" />
          </motion.a>
          <motion.a href="#" target="_blank" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: "spring", stiffness: 300 }} className="text-accent hover:text-primary transition-colors">
            <Twitter className="h-8 w-8" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
