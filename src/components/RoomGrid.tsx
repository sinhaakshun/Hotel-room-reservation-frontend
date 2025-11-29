// src/components/RoomGrid.tsx
import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import RoomCard from "./RoomCard";
import type { IRoom } from "../types";

interface Props {
  rooms: IRoom[];
  lastBooked: number[]; // roomNos highlighted
}

export default function RoomGrid({ rooms, lastBooked }: Props) {
  // group rooms by floor
  const floors = Object.values(
    rooms.reduce((acc, r) => {
      if (!acc[r.floor]) acc[r.floor] = { floor: r.floor, rooms: [] as IRoom[] };
      acc[r.floor].rooms.push(r);
      return acc;
    }, {} as Record<number, { floor: number; rooms: IRoom[] }>)
  )
    .sort((a, b) => b.floor - a.floor) // highest floor first
    .map(f => ({ ...f, rooms: f.rooms.sort((x, y) => x.indexOnFloor - y.indexOnFloor) }));

  return (
    <Box>
      {floors.map(f => {
        // columns = number of rooms on that floor, but cap for layout density
        const roomCount = f.rooms.length;
        const maxCols = Math.min(roomCount, 10); // cap columns to 10 for floors that have many rooms
        // gridTemplateColumns: create up to maxCols columns, each flexible
        const gridTemplateColumns = `repeat(${maxCols}, minmax(72px, 1fr))`;

        return (
          <Paper key={f.floor} sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "#fbfbfb" }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
              Floor {f.floor}
            </Typography>

            <Box
              role="list"
              sx={{
                display: "grid",
                gridTemplateColumns,
                gap: 1,
                alignItems: "stretch",
                // if fewer rooms than maxCols, center them left-to-right by placing grid in single row
                // we want left-to-right order where indexOnFloor 1 is on the left (closest to stairs)
                // so no reverse needed.
              }}
            >
              {f.rooms.map(room => (
                <Box key={room.roomNo} role="listitem">
                  <RoomCard room={room} isHighlighted={lastBooked.includes(room.roomNo)} />
                </Box>
              ))}
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}
