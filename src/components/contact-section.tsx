"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendContactMessageAction } from "@/app/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export function ContactSection() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    startTransition(async () => {
      const result = await sendContactMessageAction(values);
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="contact" ref={ref} className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
              Let's Build Together
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
              Have a project in mind or just want to say hello? I'd love to hear from you.
            </p>
        </div>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-lg border border-border/20 rounded-xl overflow-hidden">
              <CardContent className="p-6 md:p-8">
                  <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                              <Input placeholder="Your Name" {...field} className="bg-input/50" />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                      />
                      <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                              <Input placeholder="your.email@example.com" {...field} className="bg-input/50"/>
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                      />
                      <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                              <Textarea placeholder="Your message here..." {...field} rows={5} className="bg-input/50" />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                      />
                      <Button type="submit" disabled={isPending} size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Send Message
                      </Button>
                  </form>
                  </Form>
              </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
