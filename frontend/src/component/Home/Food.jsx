import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getAllFood } from "../State/Food/Action"
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography, useTheme } from "@mui/material"
import { red } from "@mui/material/colors"
import { ExpandMore } from "@mui/icons-material"

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';




const Food =({food}) =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {foods} = useSelector((store) =>store)
    const theme = useTheme(); 

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
useEffect(()=>{
    
},[foods])

    return(
        <Card sx={{ 
          backgroundColor: theme.palette.background.paper, // Màu nền cho Card
          color: theme.palette.text.primary, // Màu chữ
          border: `2px solid ${theme.palette.divider}`, // Viền
          }} >
    <CardMedia
  component="img"
  image={food.images[0]}
  alt="Food dish"
  sx={{
    width: '100%',         
    height: '200px',      
    objectFit: "cover",  // Giữ tỷ lệ và cắt hình ảnh nếu cần để lấp đầy khung
  }}
/>

      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight:"200" }}>
          {food.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {food.price}
        </Typography>
      </CardContent>
    </Card>
    )
}
export default Food