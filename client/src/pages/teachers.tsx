import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TeacherCard from "@/components/teacher-card";
import SearchFilters from "@/components/search-filters";
import { type Teacher } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Teachers() {
  const [query, setQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const { data: teachers, isLoading } = useQuery<Teacher[]>({
    queryKey: ["/api/teachers", query, selectedSubjects],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (query) searchParams.set("query", query);
      if (selectedSubjects.length) {
        searchParams.set("subjects", selectedSubjects.join(","));
      }
      const res = await fetch(`/api/teachers?${searchParams}`);
      if (!res.ok) throw new Error("Failed to fetch teachers");
      return res.json();
    },
  });

  return (
    <div className="grid md:grid-cols-[300px,1fr] gap-8">
      <aside>
        <SearchFilters
          query={query}
          onQueryChange={setQuery}
          selectedSubjects={selectedSubjects}
          onSubjectsChange={setSelectedSubjects}
        />
      </aside>

      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Available Teachers</h1>
        
        {isLoading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex gap-4 mb-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {teachers?.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
