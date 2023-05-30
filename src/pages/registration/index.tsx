import { Button, TextField } from "@mui/material";
import { useState } from "react";

export const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("https://no23.lavina.tech/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <TextField
        label="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <TextField
        label="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button type="submit">Register</Button>
    </form>
  );
};
