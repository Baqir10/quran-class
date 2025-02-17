import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Teacher } from "@shared/schema";
import { Link } from "wouter";

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={teacher.imageUrl} alt={teacher.name} />
          <AvatarFallback>{teacher.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{teacher.name}</h3>
          <p className="text-sm text-muted-foreground">
            {teacher.yearsExperience} years experience
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 line-clamp-2">{teacher.bio}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {teacher.subjects.map((subject) => (
            <Badge key={subject} variant="secondary">
              {subject}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">${teacher.hourlyRate}/hour</p>
          <Link href={`/teachers/${teacher.id}`}>
            <Button>View Profile</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
