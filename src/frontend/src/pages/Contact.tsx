/**
 * Contact.tsx — Contact page with validated form and info cards.
 *
 * Features:
 *   - react-hook-form validation (name, email, subject, message)
 *   - Calls useSubmitContact on submit
 *   - Success toast via sonner
 *   - Contact info cards (email, location, response time, security)
 *   - FAQ section
 */

import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Layout from "../components/Layout";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useSubmitContact } from "../hooks/useReviews";
import type { ContactInput } from "../types";

// ─── Contact info cards ────────────────────────────────────────────────────────

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "support@sentinelai.app",
    sub: "For technical support and feedback",
    href: "mailto:support@sentinelai.app",
  },
  {
    icon: MapPin,
    label: "Platform",
    value: "Internet Computer (ICP)",
    sub: "Globally accessible — no single server",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    sub: "Monday – Friday",
    href: null,
  },
  {
    icon: Shield,
    label: "Security",
    value: "End-to-end encrypted",
    sub: "Powered by Internet Identity",
    href: null,
  },
];

// ─── FAQ items ────────────────────────────────────────────────────────────────

const FAQ = [
  {
    q: "Is the system free to use?",
    a: "Yes. Sentinel AI is a free academic project. Login is via Internet Identity — no credit card required.",
  },
  {
    q: "How accurate is the fake-review detection?",
    a: "Our heuristic model achieves ~94% accuracy on the validation set. Results should be used as a guide alongside human judgement.",
  },
  {
    q: "Can I upload a CSV of reviews?",
    a: "Yes. Navigate to Dashboard → Analyse and use the 'Bulk Upload' tab to process up to 500 reviews per batch.",
  },
  {
    q: "Is my review data stored?",
    a: "Submitted reviews are stored in the Internet Computer canister associated with your Internet Identity principal.",
  },
];

// ─── Form type ────────────────────────────────────────────────────────────────

type ContactFormValues = ContactInput & { subject: string };

// ─── Component ────────────────────────────────────────────────────────────────

export default function Contact() {
  const mutation = useSubmitContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await mutation.mutateAsync(data);
      toast.success("Message sent! We'll get back to you within 24 hours.", {
        duration: 5000,
      });
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="py-16 px-4 bg-background border-b border-border">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="mb-4 gap-1.5 text-xs uppercase tracking-wider border-primary/30 text-primary bg-primary/10"
          >
            <MessageSquare className="w-3 h-3" />
            Get in touch
          </Badge>
          <h1 className="font-display font-bold text-5xl text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-lg">
            Questions about the system, research collaboration, or just curious
            about how Sentinel AI works? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* ── Contact info cards ── */}
      <section className="py-12 px-4 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTACT_INFO.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full border-border hover:border-primary/30 transition-smooth">
                  <CardContent className="p-5">
                    <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                      <info.icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">
                      {info.label}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1"
                        data-ocid={`contact-info-${info.label.toLowerCase()}`}
                      >
                        {info.value}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-foreground">
                        {info.value}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {info.sub}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main form + FAQ ── */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* ── Contact form ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-2xl text-foreground mb-6">
              Send a message
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              data-ocid="contact-form"
              noValidate
            >
              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contact-name"
                    placeholder="Alex Johnson"
                    autoComplete="name"
                    data-ocid="contact-name"
                    aria-invalid={!!errors.name}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-email">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="alex@example.com"
                    autoComplete="email"
                    data-ocid="contact-email"
                    aria-invalid={!!errors.email}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <Label htmlFor="contact-subject">
                  Subject <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contact-subject"
                  placeholder="Question about CSV bulk analysis"
                  data-ocid="contact-subject"
                  aria-invalid={!!errors.subject}
                  {...register("subject", {
                    required: "Subject is required",
                    minLength: {
                      value: 4,
                      message: "Subject must be at least 4 characters",
                    },
                  })}
                />
                {errors.subject && (
                  <p className="text-xs text-destructive" role="alert">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="contact-message">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="contact-message"
                  placeholder="Describe your question, feedback, or research interest in detail…"
                  rows={6}
                  data-ocid="contact-message"
                  aria-invalid={!!errors.message}
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 20,
                      message: "Message must be at least 20 characters",
                    },
                    maxLength: {
                      value: 2000,
                      message: "Message cannot exceed 2,000 characters",
                    },
                  })}
                />
                {errors.message && (
                  <p className="text-xs text-destructive" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full gap-2 h-11"
                disabled={isSubmitting || mutation.isPending}
                data-ocid="contact-submit"
              >
                <Send className="w-4 h-4" />
                {isSubmitting || mutation.isPending
                  ? "Sending…"
                  : "Send message"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We typically respond within 24 hours. Your information is never
                shared with third parties.
              </p>
            </form>
          </motion.div>

          {/* ── FAQ ── */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-display font-bold text-2xl text-foreground mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {FAQ.map((item, i) => (
                <motion.div
                  key={item.q}
                  className="rounded-xl border border-border p-4 bg-card"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <h3 className="font-semibold text-sm text-foreground mb-1.5">
                    {item.q}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* More help */}
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/15">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">
                  Looking for technical docs?{" "}
                </span>
                Visit the{" "}
                <Link
                  to="/about"
                  className="text-primary underline underline-offset-2 hover:no-underline"
                >
                  About page
                </Link>{" "}
                for the full NLP pipeline breakdown and methodology.
              </p>
            </div>

            {/* Direct email */}
            <a
              href="mailto:support@sentinelai.app"
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              data-ocid="contact-email-link"
            >
              <Globe className="w-4 h-4" />
              Or email us directly
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
