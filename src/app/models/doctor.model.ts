import { Hospital } from "./hospital.model";

interface _DoctorUser {
  _id: string;
  name: string;
  image?: string;
}

export class Doctor {
  constructor(
    public name: string,
    public _id?: string,
    public image?: string,
    public user?: _DoctorUser,
    public hospitals?: Hospital[],
  ) {}
}
