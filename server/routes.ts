import { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertStudentSchema, insertBookingSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  // Teachers
  app.get("/api/teachers", async (req, res) => {
    const { query, subjects } = req.query;
    const teachers = await storage.searchTeachers(
      query as string,
      subjects ? (subjects as string).split(",") : undefined
    );
    res.json(teachers);
  });

  app.get("/api/teachers/:id", async (req, res) => {
    const teacher = await storage.getTeacher(parseInt(req.params.id));
    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }
    res.json(teacher);
  });

  // Students
  app.post("/api/students", async (req, res) => {
    const parseResult = insertStudentSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ message: "Invalid student data" });
      return;
    }

    const existingStudent = await storage.getStudentByEmail(parseResult.data.email);
    if (existingStudent) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }

    const student = await storage.createStudent(parseResult.data);
    res.status(201).json(student);
  });

  // Bookings
  app.post("/api/bookings", async (req, res) => {
    const parseResult = insertBookingSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ message: "Invalid booking data" });
      return;
    }

    const teacher = await storage.getTeacher(parseResult.data.teacherId);
    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    const booking = await storage.createBooking(parseResult.data);
    res.status(201).json(booking);
  });

  // Get bookings for a student
  app.get("/api/bookings/student/:id", async (req, res) => {
    const studentId = parseInt(req.params.id);
    const bookings = await storage.getBookingsByStudent(studentId);
    res.json(bookings);
  });

  const httpServer = createServer(app);
  return httpServer;
}