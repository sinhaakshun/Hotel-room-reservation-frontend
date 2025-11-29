// Home.tsx
import React from "react";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import { useRooms } from "../hooks/useRooms";
import Controls from "../components/Controls";
import RoomGrid from "../components/RoomGrid";

export default function Home() {
  const { rooms, loading, error, lastBooked, bookRooms, reset, randomize } = useRooms();

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>Hotel Room Reservation</Typography>
      <Controls onBook={bookRooms} onRandomize={randomize} onReset={reset} loading={loading} />
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <RoomGrid rooms={rooms} lastBooked={lastBooked} />
    </Container>
  );
}
