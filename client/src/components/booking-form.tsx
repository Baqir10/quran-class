import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface BookingFormProps {
  teacherId: number;
  onSuccess?: () => void;
}

export default function BookingForm({ teacherId, onSuccess }: BookingFormProps) {
  const { toast } = useToast();
  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      teacherId,
      studentId: 1, // Hardcoded for demo
      subject: "",
      message: "",
      date: new Date(),
    },
  });

  const mutation = useMutation({
    mutationFn: (data: InsertBooking) =>
      apiRequest("POST", "/api/bookings", data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your booking request has been sent!",
      });
      form.reset();
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit booking request",
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input {...field} placeholder="What subject do you want to learn?" />
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
                <Textarea
                  {...field}
                  placeholder="Tell the teacher what you want to learn..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Sending..." : "Request Booking"}
        </Button>
      </form>
    </Form>
  );
}
