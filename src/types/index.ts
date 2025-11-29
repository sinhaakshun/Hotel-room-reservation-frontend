export interface IRoom {
  _id?: string;        // from DB
  roomNo: number;
  floor: number;
  indexOnFloor: number;
  occupied: boolean;
}

export interface BookingResult {
  booked: IRoom[];
}
