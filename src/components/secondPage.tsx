import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Details } from "../models/Details";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Department from "./department";
import { Container } from "@mui/material";

const columns = [
  { field: "userId", headerName: "User Id", width: 150 },
  { field: "id", headerName: "Id", width: 150 },
  { field: "title", headerName: "Title", width: 300 },
  { field: "body", headerName: "Body", width: 400 },
];

const SecondPage = () => {
  const [details, setDetails] = useState<Details[]>([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      toast.error("Unauthorized. Please log in again.");
      navigate("/");
    } else {
      setDetails(JSON.parse(userDetails));
    }
  }, [navigate]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setDetails(data))
      .catch((error) => {
        toast.error("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <Container>
      <h1>User Details</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={details} columns={columns} />
      </div>
      <div>
        <h1>Department Manage</h1>
        <Department/>
      </div>
      </Container>
    </>
  );
};

export default SecondPage;
