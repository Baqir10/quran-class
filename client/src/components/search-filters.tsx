import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Literature",
  "History",
  "Computer Science",
];

interface SearchFiltersProps {
  query: string;
  onQueryChange: (query: string) => void;
  selectedSubjects: string[];
  onSubjectsChange: (subjects: string[]) => void;
}

export default function SearchFilters({
  query,
  onQueryChange,
  selectedSubjects,
  onSubjectsChange,
}: SearchFiltersProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search teachers..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>
      
      <div>
        <Label>Subjects</Label>
        <div className="mt-2 space-y-2">
          {SUBJECTS.map((subject) => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox
                id={subject}
                checked={selectedSubjects.includes(subject)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onSubjectsChange([...selectedSubjects, subject]);
                  } else {
                    onSubjectsChange(
                      selectedSubjects.filter((s) => s !== subject)
                    );
                  }
                }}
              />
              <label
                htmlFor={subject}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {subject}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
