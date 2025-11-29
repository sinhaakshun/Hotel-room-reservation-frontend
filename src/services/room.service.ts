// src/services/room.service.ts
import networking from "../api/networking";
import type { IRoom, BookingResult } from "../types";

const BASE = "/rooms";

export const RoomService = {
  getAll: async (): Promise<IRoom[]> => {
    return networking.get<IRoom[]>(BASE);
  },

  book: async (count: number): Promise<BookingResult> => {
    return networking.post<BookingResult, { count: number }>(`${BASE}/book`, { count });
  },

  reset: async (): Promise<string> => {
    return networking.post<string>(`${BASE}/reset`);
  },

  randomize: async (): Promise<string> => {
    return networking.post<string>(`${BASE}/randomize`);
  }
};
