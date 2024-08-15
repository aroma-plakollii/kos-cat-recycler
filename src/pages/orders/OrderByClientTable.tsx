import {
    Box,
    Button, Card, CardActions,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableHead,
    TableRow,
    Typography
} from "@mui/material";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import theme from "../../theme/theme";
import {Order} from "../../types/order";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {getCreateForm, orderDelete, orderGetAll} from "../../api/orderService";
import {useHeaders} from "../../hooks/useHeaders";
import AlertConfirm from "../shared/AlertConfirm";
import {setOrders} from "../../features/orders/orderSlice";
import Pagination from "@mui/material/Pagination";

interface OrderByClientTableProps {
    clientId: string | undefined;
    orders: Order[] | undefined;
    currentPage: number;
    totalPages: number;
    updateDeletion: () => void;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const OrderByClientTable : React.FC<OrderByClientTableProps> = (props) => {
    const user = useSelector((state: RootState) => state.auth.user );
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [alertOpen, setAlertOpen]= useState<boolean>(false);
    const [orderId, setOrderId]= useState<number | undefined>(0)
    const headers = useHeaders();

    const onDelete = async (id: number | undefined) => {
        setAlertOpen(true);
        setOrderId(id);
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await orderDelete(orderId, headers);

            if (isDeleted) {
                setIsDeleted(true);
                setAlertOpen(false);
                setOrderId(0);
            }
        } else if(confirm === 'cancel'){
            setAlertOpen(false);
            setOrderId(0);
        }
        props.updateDeletion();
    }
    return(
        <>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1, my: 4}}>
                <Link to={`/orders/add/${props.clientId}`}>
                    <Button
                        startIcon={(
                            <AddIcon />
                        )}
                        variant="contained"
                    >
                        Shto Blerjen
                    </Button>
                </Link>
            </Box>

            <Card sx={{pb: 4}}>
                <CardHeader
                    title="Blerjet"
                />
                {props.orders?.length === 0 ? <Typography sx={{pl: 3}}>Klienti nuk ka asnjë blerje</Typography> : (
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
                                            Lloji
                                        </TableCell>
                                        <TableCell>
                                            Çmimi total
                                        </TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.orders?.map((order) => {
                                        const formattedMonth = order.orderDate ? dayjs(order.orderDate).format('MMM') : '';
                                        const formattedDay = order.orderDate ? dayjs(order.orderDate).format('DD') : '';
                                        const formattedYear = order.orderDate ? dayjs(order.orderDate).format('YYYY') : '';

                                        return (
                                            <TableRow
                                                hover
                                            >
                                                <TableCell sx={{mt: 1}}>
                                                    {order.idOrder}
                                                </TableCell>
                                                <TableCell sx={{mt: 1}}>
                                                    <Box
                                                        sx={{
                                                            p: '5px 10px',
                                                            backgroundColor: '#e7eaed',
                                                            borderRadius: 2,
                                                            maxWidth: 'fit-content',
                                                            display: "flex",
                                                            alignItems: "center",
                                                            flexDirection: "column"
                                                        }}
                                                    >
                                                        <Typography
                                                            color="text.primary"
                                                            variant="caption"
                                                            sx={{textTransform: 'uppercase', fontSize: '15px'}}
                                                        >
                                                            {formattedMonth}
                                                        </Typography>
                                                        <Typography
                                                            color="text.primary"
                                                            variant="h6"
                                                        >
                                                            {formattedDay}
                                                        </Typography>
                                                        <Typography
                                                            color="text.primary"
                                                            variant="caption"
                                                            sx={{textTransform: 'uppercase', fontSize: '11px'}}
                                                        >
                                                            {formattedYear}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{mt: 1}}>
                                                    {order.type}
                                                </TableCell>
                                                <TableCell sx={{mt: 1}}>
                                                    {order.totalPrice}&euro;
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Link to={`/orders/receipt/${order.idOrder}`}>
                                                        <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: 'black',
                                                            backgroundColor: '#dddddd', fontSize: '13px', borderRadius: '15px' }}>
                                                            FATURA
                                                        </Button>
                                                    </Link>
                                                    <Link to={`/orders/${order.idOrder}`}>
                                                        <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.primary.dark,
                                                            backgroundColor: '#ccddff', fontSize: '13px', borderRadius: '15px' }}>
                                                            DETAJET
                                                        </Button>
                                                    </Link>
                                                    { user?.userType === 'super-admin' &&
                                                        <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.error.dark,
                                                            backgroundColor: '#ffdad7', fontSize: '13px', borderRadius: '15px' }}
                                                                onClick={() => onDelete(order.idOrder)}>
                                                            FSHIJ
                                                        </Button>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                        {props.totalPages > 1 &&
                            <Pagination
                                count={props.totalPages}
                                page={props.currentPage}
                                onChange={(event, page) => {
                                    props.setCurrentPage(page);
                                }}
                                sx={{
                                    '& .MuiPagination-ul': {
                                        display: 'flex',
                                        width: '80%',
                                        margin: '1rem auto 0 auto',
                                        justifyContent: 'center'
                                    }
                                }}
                            />}
                    </TableContainer>
                )}
            </Card>
            {alertOpen && <AlertConfirm
                title={'Jeni duke fshirë blerjen'}
                message={'Jeni i sigurt që dëshironi të fshini blerjen?'}
                isOpen={alertOpen}
                onClose={onCloseAlert}
            />}
        </>
    )
}