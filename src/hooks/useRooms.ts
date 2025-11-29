// src/hooks/useRooms.ts
import { useEffect, useState, useCallback } from "react";
import type { IRoom } from "../types";
import { RoomService } from "../services/room.service";

export function useRooms() {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastBooked, setLastBooked] = useState<number[]>([]); // roomNos just booked

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const data = await RoomService.getAll();
      setRooms(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const bookRooms = async (count: number): Promise<void> => {
    setLoading(true);
    try {
      const result = await RoomService.book(count);

      // Update local state: mark booked rooms as occupied
      const bookedRoomNos = result.booked.map((r) => r.roomNo);

      setRooms((prev) =>
        prev.map((r) =>
          bookedRoomNos.includes(r.roomNo) ? { ...r, occupied: true } : r
        )
      );

      setLastBooked(bookedRoomNos);
      setError(null);

      // ❌ REMOVE: return result.booked;
    } catch (err: any) {
      setError(err.message || "Booking failed");
      throw err;
    } finally {
      setLoading(false);

      // Clear highlight after delay
      setTimeout(() => setLastBooked([]), 3500);
    }
  };


  const reset = async () => {
    setLoading(true);
    try {
      await RoomService.reset();
      await fetchRooms();
    } finally {
      setLoading(false);
    }
  };

  const randomize = async () => {
    setLoading(true);
    try {
      await RoomService.randomize();
      await fetchRooms();
    } finally {
      setLoading(false);
    }
  };

  return {
    rooms,
    loading,
    error,
    lastBooked,
    fetchRooms,
    bookRooms,
    reset,
    randomize
  };
}
