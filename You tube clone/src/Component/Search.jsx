import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Loader from './Loader'
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Video from "./Video";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchterm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchterm}`)
      .then((data) => setVideos(data.items))
  }, [searchterm]);

   if(!videos?.length) return <Loader />;

  return (
    <Box p={2} minHeight="95vh">
      <Typography variant="h4" fontWeight={900}  color="white" mb={3} ml={{ sm: "100px"}}>
        Search Results for <span style={{ color: "#FC1503" }}>{searchterm}</span> videos
      </Typography>
      <Box display="flex">
        {<Video videos={videos} />}
      </Box>
    </Box>
  );
};

export default SearchFeed;