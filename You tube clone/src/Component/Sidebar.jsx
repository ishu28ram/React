import { Stack } from '@mui/material'
import React from 'react'
import {sideBarData} from '../constants/constantsData'

const Sidebar = ({selectedCategory,setselectedCategory}) => {


  return (
    <Stack direction='row' sx={{
      overflowY:'auto',
      transition:'0.5s all',
      height:{
        sx:'auto',
        md:'95%'
      },
      flexDirection:{
        md:'column'
      }
    }}
    className='sidebar-container'>
      
     {
      sideBarData.map(item=>{
        return <button key={item.id} className='category-btn'
        style={{
          background:item.name===selectedCategory &&'#fc1503',
          color:'white',
         
        }}
        onClick={()=>setselectedCategory(item.name)}>
          <span style={{
            color:item.name===selectedCategory ?'white':'red',
            marginRight:'15px',
            fontSize:'1.2rem'
        }}>{item.icon}</span>
          <span>{item.name}</span>
        </button>
      })
     }
    </Stack>
  )
}

export default Sidebar