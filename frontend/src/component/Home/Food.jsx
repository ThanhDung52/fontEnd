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
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
    <CardMedia
  component="img"
  image={food.images[0]}
  alt="Food dish"
  sx={{
    width: 300,          // Đặt chiều rộng cố định
    height: 200,         // Đặt chiều cao cố định
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
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            {food.description}
          </Typography>
          
        </CardContent>
      </Collapse>
    </Card>
    )
}
export default Food