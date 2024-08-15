import {Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import dayjs from "dayjs";
import {Order} from "../../types/order";

interface ReportsTableProps{
    orders: Order[];
}

export const ReportsTable: React.FC<ReportsTableProps> = (props) => {
    return(
        <TableContainer sx={{ overflowX: 'auto' }}>
            <Box sx={{minWidth: 800}}>
                <Table>
                    <TableHead sx={{background: '#f8f9fa'}}>
                        <TableRow>
                            <TableCell>
                                Id
                            </TableCell>
                            <TableCell>
                                Data e porosisë
                            </TableCell>
                            <TableCell>
                                Klienti
                            </TableCell>
                            <TableCell>
                                Lloji
                            </TableCell>
                            <TableCell>
                                Sasia
                            </TableCell>
                            <TableCell>
                                Kg
                            </TableCell>
                            <TableCell>
                                Çmimi
                            </TableCell>
                            <TableCell>
                                Totali
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.orders.map((order) => {
                            const formattedMonth = order.orderDate ? dayjs(order.orderDate).format('MMM') : '';
                            const formattedDay = order.orderDate ? dayjs(order.orderDate).format('DD') : '';

                            return (
                                <TableRow
                                    hover
                                >
                                    <TableCell>
                                        {order.idOrder}
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                p: '5px 10px',
                                                backgroundColor: '#e7eaed',
                                                borderRadius: 2,
                                                maxWidth: 'fit-content',
                                            }}
                                        >
                                            <Typography
                                                align="center"
                                                color="text.primary"
                                                variant="caption"
                                                sx={{textTransform: 'uppercase', fontSize: '15px'}}
                                            >
                                                {formattedMonth}
                                            </Typography>
                                            <Typography
                                                align="center"
                                                color="text.primary"
                                                variant="h6"
                                            >
                                                {formattedDay}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {`${order.idClient?.firstName} ${order.idClient?.lastName}`}
                                    </TableCell>
                                    <TableCell>
                                        {order.type}
                                    </TableCell>
                                    <TableCell>
                                        {order.quantity}
                                    </TableCell>
                                    <TableCell>
                                        {order.kilogram}kg
                                    </TableCell>
                                    <TableCell>
                                        {order.price}&euro;
                                    </TableCell>
                                    <TableCell>
                                        {order.totalPrice}&euro;
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Box>
        </TableContainer>
    )
}