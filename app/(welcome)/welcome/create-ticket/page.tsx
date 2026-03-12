"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, Send, MessageSquare } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import raiseTicket from "@/lib/user/raiseTicket";
import { useAuth } from "@/context/AuthContext";
import getProfileId from "@/lib/user/getProfileId";

// Assuming this matches your imported RaiseTicketSchema
const formSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  full_name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  course: z.string().min(1, "Please specify the course"),
  description: z.string().min(10, "Please provide more details"),
  profile_id: z.string().optional(),
});

type TicketFormValues = z.infer<typeof formSchema>;

interface RaiseTicketProps {
  defaultValues?: Partial<TicketFormValues>;
}

export default function page({ defaultValues }: RaiseTicketProps) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TicketFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmit = async (data: TicketFormValues) => {
    const profileId = await getProfileId(user?.uid ?? "");
    const ticket_id = `tik-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalPayload = {
      ...data,
      profileId: profileId,
      ticket_id: ticket_id,
    };

    const response = await raiseTicket(finalPayload);
    if (response.success) {
      toast.success("Ticket raised successfully! We will contact you soon.");
      reset();
    } else {
      toast.error("Failed to raise ticket. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-t-4 border-t-primary">
      <Toaster />

      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Raise a Support Ticket</CardTitle>
            <CardDescription>
              Our team at Navigate Skills will resolve your issue within 24
              hours.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Full Name</label>
              <Input {...register("full_name")} placeholder="Enter your name" />
              {errors.full_name && (
                <p className="text-xs text-red-500">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Email Address</label>
              <Input
                {...register("email")}
                type="email"
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Phone Number</label>
              <Input {...register("phone")} placeholder="9876543210" />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Course */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Course Name</label>
              <Input
                {...register("course")}
                placeholder="e.g. Kathak, Fitness"
              />
              {errors.course && (
                <p className="text-xs text-red-500">{errors.course.message}</p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Subject</label>
            <Input
              {...register("subject")}
              placeholder="What is the issue about?"
            />
            {errors.subject && (
              <p className="text-xs text-red-500">{errors.subject.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Detailed Description</label>
            <Textarea
              {...register("description")}
              placeholder="Please describe your issue in detail..."
              className="min-h-[120px]"
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-6 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" /> Submit Ticket
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
