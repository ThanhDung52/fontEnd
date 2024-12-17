import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import OrderTable from "./OrderTable";

const orderStatus = [
    { value: "PENDING", label: "Đang chờ" },
    { value: "COMPLETED", label: "Hoàn thành" },
    { value: "all", label: "Tất cả" },
];

export const Orders = () => {
    const [filterValue, setFilterValue] = useState("all");

    const handleFilter = (e) => {
        const { value } = e.target;
        setFilterValue(value);
    };

    return (
        <div className="px-2">
            <Card className="p-5">
                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                    Trạng thái đơn hàng
                </Typography>
                <FormControl>
                    <RadioGroup
                        onChange={handleFilter}
                        row
                        name="orderStatus"
                        value={filterValue}
                    >
                        {orderStatus.map((item) => (
                            <FormControlLabel
                                key={item.value}
                                value={item.value}
                                control={<Radio />}
                                label={item.label}
                                sx={{ color: "gray" }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Card>
            <OrderTable filter={filterValue} />
        </div>
    );
};

export default Orders;
