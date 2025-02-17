import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { type Teacher } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BookingForm from "@/components/booking-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeacherDetails() {
  const { id } = useParams();

  const { data: teacher, isLoading } = useQuery<Teacher>({
    queryKey: [`/api/teachers/${id}`],
  });

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-6">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!teacher) {
    return <div>Teacher not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-6">
        <Avatar className="h-32 w-32">
          <AvatarImage src={teacher.imageUrl} alt={teacher.name} />
          <AvatarFallback>{teacher.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{teacher.name}</h1>
          <p className="text-xl text-muted-foreground">
            ${teacher.hourlyRate}/hour · {teacher.yearsExperience} years experience
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">About</h2>
        <p className="text-muted-foreground">{teacher.bio}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Subjects</h2>
        <div className="flex flex-wrap gap-2">
          {teacher.subjects.map((subject) => (
            <Badge key={subject} variant="secondary">
              {subject}
            </Badge>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="py-6">
          <h2 className="text-xl font-semibold mb-4">Book a Session</h2>
          <BookingForm teacherId={teacher.id} />
        </CardContent>
      </Card>
    </div>
  );
}
