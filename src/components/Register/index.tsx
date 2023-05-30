import { Button, TextField, Typography, Box } from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRegisterUserMutation } from "../../redux/slices/apiSlice";

interface User {
  name: string;
  email: string;
  key: string;
  secret: string;
}

export const Register = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    key: "",
    secret: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await registerUser(user).unwrap();
      alert("User registered successfully");
    } catch (error) {
      if (error instanceof Error) {
        alert(`Registration failed: ${error.message}`);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <TextField
        name="name"
        label="Name"
        value={user.name}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        name="email"
        label="Email"
        value={user.email}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        name="key"
        label="Key"
        value={user.key}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        name="secret"
        label="Secret"
        value={user.secret}
        onChange={handleChange}
        variant="outlined"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </Box>
  );
};
