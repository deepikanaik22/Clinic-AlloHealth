export type PatientStatus = 'Waiting' | 'With Doctor' | 'Completed' | 'Cancelled';

export interface Patient {
  id: number;
  name: string;
  queueNumber: number;
  status: PatientStatus;
  arrivalTime: Date;
  doctor: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  availability: {
    day: string;
    slots: string[];
  }[];
  rating: number;
  reviews: number;
}

export interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  specialization: string;
  startTime: Date;
  status: 'Booked' | 'Completed' | 'Cancelled';
}
