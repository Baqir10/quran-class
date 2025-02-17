import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { type Booking } from "@shared/schema";
import { format } from "date-fns";

export default function CalendarView() {
  const [date, setDate] = useState<Date>(new Date());

  const { data: bookings, isLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings/student/1"], // Hardcoded student ID for now
  });

  // Create a map of dates to bookings for easier lookup
  const bookingsByDate = new Map<string, Booking[]>();
  bookings?.forEach((booking) => {
    const dateStr = format(new Date(booking.date), "yyyy-MM-dd");
    const existing = bookingsByDate.get(dateStr) || [];
    bookingsByDate.set(dateStr, [...existing, booking]);
  });

  return (
    <div className="grid md:grid-cols-[auto,1fr] gap-8">
      <Card className="p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="rounded-md"
          modifiers={{
            booked: (date) => {
              const dateStr = format(date, "yyyy-MM-dd");
              return bookingsByDate.has(dateStr);
            },
          }}
          modifiersStyles={{
            booked: { 
              backgroundColor: "hsl(var(--primary))", 
              color: "white" 
            }
          }}
        />
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">
          Classes on {format(date, "MMMM d, yyyy")}
        </h2>
        
        {isLoading ? (
          <p>Loading bookings...</p>
        ) : (
          <div className="space-y-4">
            {bookingsByDate.get(format(date, "yyyy-MM-dd"))?.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{booking.subject}</h3>
                    <Badge>{booking.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {format(new Date(booking.date), "h:mm a")}
                  </p>
                  {booking.message && (
                    <p className="text-sm mt-2">{booking.message}</p>
                  )}
                </CardContent>
              </Card>
            )) || (
              <p className="text-muted-foreground">No classes scheduled for this day.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
