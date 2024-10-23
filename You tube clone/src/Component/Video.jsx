import { Box, Stack } from '@mui/material'
import React from 'react'
import VideoCard from './VideoCard'
import Loader from './Loader'

const Video = ({videos,direction}) => {
   if(!videos?.length) return <Loader />;
  return (
    <Stack direction={direction||'row'} flexWrap='wrap' justifyContent='center'  alignItems='center' gap={1.5} sx={{
       "@media (min-width: 758px)": {
          width: "100%",
        },
    }}>
      {
      videos.map((item,id)=>(
         <Box key={id}>
            {
              item.id.videoId && <VideoCard channel={item} video={item}/>
              
            }
            {/* {
               item.id.channelId && <ChannelCard channel={item}/>
            } */}
           
          
        </Box>

      ))
      
      }</Stack>
  )
}

export default Video