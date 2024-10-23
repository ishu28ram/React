import { Box, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ChannelCard = ({channel,marginTop}) => {
  return (
    <Box
    sx={{
      boxShadow: 'none',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: '356px', md: '320px' },
      height: '326px',
      margin: 'auto',
      marginTop:'-120px'
    }}>
      <Link to={`/channel/${channel?.id?.channelId}`}>
          <CardContent sx={{display:'flex',flexDirection:'column',justifyContent:'center',textAlign:'center',alignItems:'center',color:'#fff'}}>
              <CardMedia image={channel?.snippet?.thumbnails?.high?.url}
              alt={channel?.snippet?.title}
              sx={{
                borderRadius:'50%',height:'180px',width:'180px',mb:2,border:'1px solid #e3e3e3'
              }}
              />
              <Typography variant='subtitle1'>
                {channel?.snippet?.title}
                </Typography> 
                <Typography variant='subtitle2' color='darkgray'>
                {parseInt(channel?.statistics?.subscriberCount).toLocaleString('en-Us')} Subscribers
                </Typography>
          </CardContent>
      </Link>
    </Box>
  )
}

export default ChannelCard