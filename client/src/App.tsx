import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Nav from "@/components/nav";
import Home from "@/pages/home";
import Teachers from "@/pages/teachers";
import TeacherDetails from "@/pages/teacher-details";
import Register from "@/pages/register";
import Calendar from "@/pages/calendar";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/teachers" component={Teachers} />
          <Route path="/teachers/:id" component={TeacherDetails} />
          <Route path="/register" component={Register} />
          <Route path="/calendar" component={Calendar} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;