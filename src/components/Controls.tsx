// Controls.tsx
import React, { useState } from "react";
import { Box, Button, TextField, Stack } from "@mui/material";

interface Props {
  onBook: (count: number) => Promise<void>;
  onRandomize: () => Promise<void>;
  onReset: () => Promise<void>;
  loading?: boolean;
}

export default function Controls({ onBook, onRandomize, onReset, loading }: Props) {
  const [countStr, setCountStr] = useState("1");

  const book = async () => {
    const count = Number(countStr);
    if (!count || count < 1 || count > 5) {
      alert("Enter count between 1 and 5");
      return;
    }
    await onBook(count);
  };

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
      <TextField label="No. of rooms" value={countStr} onChange={(e) => setCountStr(e.target.value)} size="small" />
      <Button variant="contained" onClick={book} disabled={loading}>Book</Button>
      <Button variant="outlined" onClick={onRandomize} disabled={loading}>Randomize</Button>
      <Button variant="outlined" color="error" onClick={onReset} disabled={loading}>Reset</Button>
    </Stack>
  );
}
