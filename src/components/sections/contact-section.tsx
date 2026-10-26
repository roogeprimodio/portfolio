
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
import { Loader2, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { iconFor } from "@/components/layout/social-icons";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
  // Honeypot. Hidden from humans; the server treats any value as spam.
  website: z.string().max(0).optional(),
});

export function ContactSection() {
  const [isPending, startTransition] = useTransition();
  const [isGlitching, setIsGlitching] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
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
    <section id="contact" className="flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="text-center space-y-2 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-widest font-headline text-primary uppercase animate-glitch-subtle [text-shadow:0_0_8px_hsl(var(--primary)/0.5)]">
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
                {/* Honeypot: off-screen rather than display:none so naive
                    bots still see it as a fillable field. */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Do not fill this in</label>
                  <input
                    id="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...form.register("website")}
                  />
                </div>

                <Button type="submit" disabled={isPending} className={`w-full group bg-accent/80 text-accent-foreground hover:bg-accent hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 font-headline tracking-widest text-lg ${isGlitching ? 'animate-glitch' : ''}`}>
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'TRANSMIT'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Direct channels, for people who would rather skip the form. */}
      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        aria-label="Direct channels"
        className="mt-8 flex w-full max-w-lg flex-wrap items-center justify-center gap-2"
      >
        <li className="w-full text-center font-code text-[10px] uppercase tracking-[0.25em] text-primary/50 dark:text-accent/50">
          {"// or open a direct channel"}
        </li>
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-2 rounded-sm border border-primary/20 bg-card/60 px-3 py-2 font-code text-[11px] uppercase tracking-widest text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[3px_3px_0_0_hsl(var(--accent)/0.9)] dark:border-accent/15 dark:bg-card/40 dark:hover:shadow-[0_0_16px_-4px_hsl(var(--accent)/0.5)]"
          >
            <Mail className="h-4 w-4" aria-hidden /> Email
          </a>
        </li>
        {socials.map((social) => {
          const Icon = iconFor(social.icon);
          const external = social.href.startsWith("http");
          return (
            <li key={social.name}>
              <a
                href={social.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-2 rounded-sm border border-primary/20 bg-card/60 px-3 py-2 font-code text-[11px] uppercase tracking-widest text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[3px_3px_0_0_hsl(var(--accent)/0.9)] dark:border-accent/15 dark:bg-card/40 dark:hover:shadow-[0_0_16px_-4px_hsl(var(--accent)/0.5)]"
              >
                <Icon className="h-4 w-4" aria-hidden /> {social.name}
              </a>
            </li>
          );
        })}
      </motion.ul>
    </section>
  );
}
