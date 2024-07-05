import { Container, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    let isValid = true;
  
    // Validate name
    if (!name) {
      toast.error("Please enter your name");
      isValid = false;
      return
    }
  
    // Validate phone number
    if (!phone) {
      toast.error("Please enter your phone number");
      isValid = false;
      return
    } else if (!/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      isValid = false;
      return
    }
  
    // Validate email
    if (!email) {
      toast.error("Please enter your email");
      isValid = false;
      return
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      isValid = false;
      return
    }
  
    // If all fields are valid
    if (isValid) {
      toast.success(`Successfully Logged in ${name}!`);
      localStorage.setItem("userDetails", JSON.stringify({ name, phone, email }));
      navigate("/secondPage");
    }
  };
  
  return (
    // user details info
    <>
       <Container style={{ width: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '20px', marginTop: "10rem", borderRadius: "10px" }}>
        <TextField
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Submit
        </Button>
      </Container>
    </>
  );
};

export default SignUp;
