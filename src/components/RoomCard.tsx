// RoomCard.tsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { type IRoom } from "../types";

interface Props {
  room: IRoom;
  isHighlighted?: boolean;
  onClick?: (room: IRoom) => void;
}

export default function RoomCard({ room, isHighlighted, onClick }: Props) {
  const bg = room.occupied ? "#e57373" : isHighlighted ? "#81c784" : "#f5f5f5";

  return (
    <Card
      onClick={() => onClick?.(room)}
      sx={{
        cursor: onClick ? "pointer" : "default",
        bgcolor: bg,
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: 1,
        borderRadius: 1
      }}
      variant="outlined"
    >
      <CardContent sx={{ padding: 1 }}>
        <Typography align="center" variant="subtitle2">
          {room.roomNo}
        </Typography>
        <Typography align="center" variant="caption">
          {room.occupied ? "Occupied" : "Free"}
        </Typography>
      </CardContent>
    </Card>
  );
}
