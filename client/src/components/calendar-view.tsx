import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { type Booking, type Teacher } from "@shared/schema";
import { format } from "date-fns";

interface BookingWithTeacher extends Booking {
  teacher?: Teacher;
}

export default function CalendarView() {
  const [date, setDate] = useState<Date>(new Date());

  // Fetch bookings with teacher information
  const { data: bookings, isLoading } = useQuery<BookingWithTeacher[]>({
    queryKey: ["/api/bookings/student/1"], // Hardcoded student ID for now
    queryFn: async () => {
      const res = await fetch("/api/bookings/student/1");
      const bookings = await res.json();

      // Fetch teacher details for each booking
      const bookingsWithTeachers = await Promise.all(
        bookings.map(async (booking) => {
          const teacherRes = await fetch(`/api/teachers/${booking.teacherId}`);
          const teacher = await teacherRes.json();
          return { ...booking, teacher };
        })
      );

      return bookingsWithTeachers;
    },
  });

  // Create a map of dates to bookings for easier lookup
  const bookingsByDate = new Map<string, BookingWithTeacher[]>();
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
          <p>Loading classes...</p>
        ) : (
          <div className="space-y-4">
            {bookingsByDate.get(format(date, "yyyy-MM-dd"))?.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{booking.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        with {booking.teacher?.name}
                      </p>
                    </div>
                    <Badge>{booking.status}</Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Time:</span> {format(new Date(booking.date), "h:mm a")}
                    </p>
                    {booking.teacher && (
                      <p className="text-sm">
                        <span className="font-medium">Rate:</span> ${booking.teacher.hourlyRate}/hour
                      </p>
                    )}
                    {booking.message && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-1">Notes:</p>
                        <p className="text-sm text-muted-foreground">{booking.message}</p>
                      </div>
                    )}
                  </div>
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