import { Label } from "@mui/icons-material";
import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import OrderTable from "./OrderTable";

const orderStatus = [
    { value: "pending", label: "PENDING" },
    { value: "Completed", label: "COMPLETED" },
    { value: "All", label: "all" },
]

export const Orders = () => {
    const [ filterValue, setFilterValue ] = useState("all")
    


    const handleFilter = (e, value) => {
        setFilterValue(e.target.name)
        console.log(e.target.value,e.target.name,value);
        
    }
   
 
    return (
        <div className="px-2">
            <Card className="p-5 ">
                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                    Order Status
                </Typography>
                <FormControl>
                    <RadioGroup
                     onChange={ handleFilter}
                      row 
                      name="orderStatus" 
                      value={filterValue || "all"}
                      >
                        {orderStatus.map((item) => <FormControlLabel
                            key={item.label}
                            value={item.value}
                            control={<Radio />}
                            label={item.label}
                            sx={{ color: "gray" }}
                        />)}
                    </RadioGroup>
                </FormControl>
            </Card>
            <OrderTable/>
        </div>
    )
}