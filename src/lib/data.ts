import type { Patient, Doctor, Appointment } from '@/lib/types';

export const mockPatients: Patient[] = [
  { id: 1, name: 'Alice Johnson', queueNumber: 1, status: 'With Doctor', arrivalTime: new Date(new Date().setHours(9, 5)), doctor: 'Dr. Evelyn Reed' },
  { id: 2, name: 'Bob Williams', queueNumber: 2, status: 'Waiting', arrivalTime: new Date(new Date().setHours(9, 15)), doctor: 'Dr. Samuel Green' },
  { id: 3, name: 'Charlie Brown', queueNumber: 3, status: 'Waiting', arrivalTime: new Date(new Date().setHours(9, 30)), doctor: 'Dr. Evelyn Reed' },
  { id: 4, name: 'Diana Miller', queueNumber: 4, status: 'Waiting', arrivalTime: new Date(new Date().setHours(9, 45)), doctor: 'Dr. Olivia Blue' },
  { id: 5, name: 'Ethan Davis', queueNumber: 5, status: 'Completed', arrivalTime: new Date(new Date().setHours(8, 50)), doctor: 'Dr. Samuel Green' },
];

export const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Evelyn Reed',
    specialization: 'Cardiology',
    availability: [
      { day: 'Monday', slots: ['09:00', '11:00', '14:00'] },
      { day: 'Wednesday', slots: ['10:00', '12:00', '15:00'] },
    ],
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 2,
    name: 'Dr. Samuel Green',
    specialization: 'Pediatrics',
    availability: [
      { day: 'Tuesday', slots: ['09:30', '11:30', '14:30'] },
      { day: 'Thursday', slots: ['10:30', '12:30', '15:30'] },
    ],
    rating: 4.8,
    reviews: 98,
  },
  {
    id: 3,
    name: 'Dr. Olivia Blue',
    specialization: 'Dermatology',
    availability: [
      { day: 'Monday', slots: ['13:00', '16:00'] },
      { day: 'Friday', slots: ['09:00', '11:00', '14:00'] },
    ],
    rating: 4.7,
    reviews: 152,
  },
];

export const mockAppointments: Appointment[] = [
    { id: 1, patientName: 'Grace Lee', doctorName: 'Dr. Evelyn Reed', specialization: 'Cardiology', startTime: new Date(new Date().setDate(new Date().getDate() + 1)), status: 'Booked' },
    { id: 2, patientName: 'Henry Wilson', doctorName: 'Dr. Samuel Green', specialization: 'Pediatrics', startTime: new Date(new Date().setDate(new Date().getDate() + 1)), status: 'Booked' },
    { id: 3, patientName: 'Ivy Clark', doctorName: 'Dr. Olivia Blue', specialization: 'Dermatology', startTime: new Date(new Date().setDate(new Date().getDate() + 2)), status: 'Booked' },
    { id: 4, patientName: 'Jack Turner', doctorName: 'Dr. Evelyn Reed', specialization: 'Cardiology', startTime: new Date(new Date().setDate(new Date().getDate() + 2)), status: 'Booked' },
];
