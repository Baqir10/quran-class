import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
  hourlyRate: integer("hourly_rate").notNull(),
  subjects: text("subjects").array().notNull(),
  yearsExperience: integer("years_experience").notNull(),
});

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull(),
  teacherId: integer("teacher_id").notNull(),  
  date: timestamp("date").notNull(),
  status: text("status").notNull().default("pending"),
  subject: text("subject").notNull(),
  message: text("message"),
});

export const insertTeacherSchema = createInsertSchema(teachers);
export const insertStudentSchema = createInsertSchema(students);
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true });

export type Teacher = typeof teachers.$inferSelect;
export type Student = typeof students.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type InsertTeacher = z.infer<typeof insertTeacherSchema>;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export const mockTeachers: InsertTeacher[] = [
  {
    name: "John Smith",
    email: "john@example.com",
    bio: "Experienced math and science teacher with a passion for making complex concepts simple.",
    imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
    hourlyRate: 50,
    subjects: ["Mathematics", "Physics"],
    yearsExperience: 8
  },
  {
    name: "Sarah Johnson",
    email: "sarah@example.com", 
    bio: "English literature expert specializing in creative writing and composition.",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    hourlyRate: 45,
    subjects: ["English", "Literature"],
    yearsExperience: 6
  },
  // Add more mock teachers using the provided stock photos
];
