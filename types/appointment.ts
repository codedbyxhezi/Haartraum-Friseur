export type AppointmentStatus = "BOOKED" | "CANCELLED";

export type Appointment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  startsAt: string;
  status: AppointmentStatus;
};
