import React, { useState } from "react";
import Video from "./Video";
import Sidebar from "./Sidebar";
import { Stack, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setselectedCategory] = useState("New");
  const[videos,setVideos]=useState([])

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
    .then(data=>{
      console.log(data.items);
      setVideos(data.items)
    })
  }, [selectedCategory]);

  return (
    <Stack
      margin='10px'
      sx={{
        flexDirection: {
          sx: "column",
          md: "row",
        },
      }}
    >
      <Box
        sx={{
          height: {
            sx: "auto",
            md: "92vh",
          },
          borderRight: "1px solid #3d3d3d",
          px: {
            sx: "0",
            md: 2,
          },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setselectedCategory={setselectedCategory}
        />
      </Box>

      <Box
        p={2}
        sx={{
          overflowY: "auto",
          height: "90vh",
          flex: 5,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={5}
          sx={{
            color: "white",
          }}
        >
          {selectedCategory} <span style={{ color: "#f31503" }}>Videos</span>
        </Typography>
        <Video videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
