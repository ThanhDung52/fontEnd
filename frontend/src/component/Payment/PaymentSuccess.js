import React from "react";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { green } from "@mui/material/colors";
import { Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PayMentSuccess =()=>{
    const navigate = useNavigate()
    return(
        <div className="min-h-screen px-5">
            <div className="flex flex-col items-center justify-center h-[90vh]">
                <Card className="box w-full lg:w-1/4 flex flex-col items-center rounded-md p-5">
                    <TaskAltIcon sx={{fontSize:"5rem", color:green[500]}}/>
                    <h1 className="py-5 text-2xl font-semibold">
                        Đặt hàng thành công
                    </h1>
                    <p className="py-3 text-center text-gray-400">
                    Cảm ơn bạn đã lựa chọn nhà hàng của chúng tôi! chúc bạn ngon miệng

                        </p>
                    <p className="py-2 text-center text-gray-200 text-lg">
                        Chúc bạn có một ngày tốt lành!
                    </p>
                    <Button onClick={()=>navigate("/")} variant="contained" className="p-5" sx={{margin:"1rem 0rem"}}>Go To Home</Button>
                </Card>
            </div>
        </div>
    )
}