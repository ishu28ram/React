import "./App.css";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Feed from "./Component/Feed";
import VideoDetails from "./Component/VideoDetails";
import ChannelDetails from "./Component/ChannelDetails";
import Search from "./Component/Search";

function App() {
  return (
    <Box
      sx={{
        background: "#000",
        color: "white",
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetails />} />
          <Route path="/channel/:id" element={<ChannelDetails />} />
          <Route path="/search/:searchterm" element={<Search />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
