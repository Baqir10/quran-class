import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Nav() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl font-bold text-primary">TeachConnect</a>
        </Link>
        <div className="space-x-4">
          <Link href="/teachers">
            <a className="text-gray-600 hover:text-primary">Find Teachers</a>
          </Link>
          <Link href="/calendar">
            <a className="text-gray-600 hover:text-primary">My Schedule</a>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}