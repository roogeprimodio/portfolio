"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { refineSummaryAction } from "@/app/actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";

const formSchema = z.object({
  selfSummary: z.string().min(20, "Please provide a summary of at least 20 characters."),
  projectDescriptions: z.string().min(50, "Please describe your projects in at least 50 characters. Separate projects with a new line."),
});

export function HeroSection() {
  const [isPending, startTransition] = useTransition();
  const [refinedSummary, setRefinedSummary] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selfSummary: "",
      projectDescriptions: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setRefinedSummary("");
    startTransition(async () => {
      const result = await refineSummaryAction(values.selfSummary, values.projectDescriptions);
      setRefinedSummary(result);
    });
  }

  return (
    <section id="home" className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
              Welcome to FolioFlow
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Craft the perfect professional narrative. Use our AI-powered tool to refine your self-summary based on your project experiences. Let your portfolio shine.
            </p>
            {refinedSummary && !refinedSummary.toLowerCase().includes("error") && !refinedSummary.toLowerCase().includes("please") && (
              <Card className="bg-primary/5 animate-in fade-in duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Sparkles className="text-accent" />
                    Your AI-Refined Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80">
                    {refinedSummary}
                  </blockquote>
                </CardContent>
              </Card>
            )}
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Generate Your Summary</CardTitle>
              <CardDescription>
                Enter your current summary and project details, and let AI work its magic.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="selfSummary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Current Self-Summary</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., A passionate developer with experience in web technologies..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectDescriptions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Project Descriptions</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your projects, one per line..." {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isPending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Refining...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Refine with AI
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
