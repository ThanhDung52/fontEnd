import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import { Button, Card, useTheme } from "@mui/material";

const AddressCart = ({ item, showButton, handleSelectAddress }) => {
    const theme = useTheme(); 

    return (
        <Card
            className="flex gap-5 w-64 p-5"
            sx={{
                backgroundColor: theme.palette.background.paper, // Màu nền cho Card
                color: theme.palette.text.primary, // Màu chữ cho toàn bộ Card
                border: `1px solid ${theme.palette.divider}`, 
            }}
        >
            <HomeIcon sx={{ color: theme.palette.text.primary }} /> {/* Màu cho biểu tượng HomeIcon */}
            <div className="space-y-3">
                <h1 className="font-semibold text-lg" style={{ color: theme.palette.text.primary }}> {/* Áp dụng màu chữ từ theme */}
                    Home
                </h1>
                <p style={{ color: theme.palette.text.secondary }}> {/* Áp dụng màu chữ từ theme */}
                    Numbai, nwe shivam building, gokuldham market, 530068,
                    Maharastra, India
                </p>
                {showButton && (
                    <Button variant="outlined" fullWidth onClick={() => handleSelectAddress(item)}>
                        Select
                    </Button>
                )}
            </div>
        </Card>
    )
}

export default AddressCart;
