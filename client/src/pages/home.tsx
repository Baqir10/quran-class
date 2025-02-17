import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-32">
      <section className="text-center space-y-6 py-20">
        <h1 className="text-4xl sm:text-6xl font-bold">
          Find Your Perfect Teacher
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with experienced teachers for personalized learning in any subject.
          Start your learning journey today.
        </p>
        <Link href="/teachers">
          <Button size="lg" className="text-lg px-8">
            Find Teachers
          </Button>
        </Link>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        {[
          {
            title: "Expert Teachers",
            description: "Learn from qualified and experienced teachers.",
            image: "https://images.unsplash.com/photo-1577896851231-70ef18881754",
          },
          {
            title: "Flexible Learning",
            description: "Choose when and how you want to learn.",
            image: "https://images.unsplash.com/photo-1519406596751-0a3ccc4937fe",
          },
          {
            title: "Any Subject",
            description: "Find teachers for any subject you want to learn.",
            image: "https://images.unsplash.com/photo-1578593139939-cccb1e98698c",
          },
        ].map((feature) => (
          <div key={feature.title} className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
