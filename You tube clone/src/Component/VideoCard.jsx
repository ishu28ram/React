import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => {
  const formatThumbnailUrl = (url) => {
    if (url) {
      if (url.startsWith("https://")) {
        return url.slice(5); // Return unchanged URL if it already starts with "https://"
      } else {
        return url.slice(9); // Remove "https =>//" and keep the rest of the URL
      }
    }
    return null;
  };

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
        margin: 0,
        padding: 0,
      }}
    >
      <Link to={videoId && `/video/${videoId}`}>
        <CardMedia
          image={`https://${formatThumbnailUrl(
            snippet?.thumbnails?.high?.url
          )}`} // Add "https://" to the formatted URL
          alt={snippet?.title}
          sx={{ width: { xs: "100%", sm: "320px" }, height: 180 }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#1E1E1E", height: "106px" }}>
        {/* <img src={}/> */}
        <Link to={videoId && `/video/${videoId}`}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0, 60)}
          </Typography>
        </Link>
        <Link to={snippet?.channelId && `/channel/${snippet?.channelId}`}>
          <Typography variant="subtitle2" color="gray">
            {snippet?.channelTitle}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};
export default VideoCard;
