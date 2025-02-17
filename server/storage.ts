import { type Teacher, type Student, type Booking, type InsertTeacher, type InsertStudent, type InsertBooking, mockTeachers } from "@shared/schema";

export interface IStorage {
  // Teachers
  getTeachers(): Promise<Teacher[]>;
  getTeacher(id: number): Promise<Teacher | undefined>;
  searchTeachers(query: string, subjects?: string[]): Promise<Teacher[]>;
  
  // Students
  createStudent(student: InsertStudent): Promise<Student>;
  getStudentByEmail(email: string): Promise<Student | undefined>;
  
  // Bookings
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByStudent(studentId: number): Promise<Booking[]>;
  getBookingsByTeacher(teacherId: number): Promise<Booking[]>;
}

export class MemStorage implements IStorage {
  private teachers: Map<number, Teacher>;
  private students: Map<number, Student>;
  private bookings: Map<number, Booking>;
  private currentIds: { teacher: number; student: number; booking: number };

  constructor() {
    this.teachers = new Map();
    this.students = new Map();
    this.bookings = new Map();
    this.currentIds = { teacher: 1, student: 1, booking: 1 };
    
    // Initialize with mock teachers
    mockTeachers.forEach(teacher => {
      const id = this.currentIds.teacher++;
      this.teachers.set(id, { ...teacher, id });
    });
  }

  async getTeachers(): Promise<Teacher[]> {
    return Array.from(this.teachers.values());
  }

  async getTeacher(id: number): Promise<Teacher | undefined> {
    return this.teachers.get(id);
  }

  async searchTeachers(query: string, subjects?: string[]): Promise<Teacher[]> {
    return Array.from(this.teachers.values()).filter(teacher => {
      const matchesQuery = !query || 
        teacher.name.toLowerCase().includes(query.toLowerCase()) ||
        teacher.bio.toLowerCase().includes(query.toLowerCase());
      
      const matchesSubjects = !subjects?.length || 
        subjects.some(subject => teacher.subjects.includes(subject));
      
      return matchesQuery && matchesSubjects;
    });
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = this.currentIds.student++;
    const student = { ...insertStudent, id };
    this.students.set(id, student);
    return student;
  }

  async getStudentByEmail(email: string): Promise<Student | undefined> {
    return Array.from(this.students.values()).find(
      student => student.email === email
    );
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentIds.booking++;
    const booking = { ...insertBooking, id };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBookingsByStudent(studentId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.studentId === studentId
    );
  }

  async getBookingsByTeacher(teacherId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      booking => booking.teacherId === teacherId
    );
  }
}

export const storage = new MemStorage();
