import {Layout} from "../layout/Layout";
import { Card,Box, Container, Stack, CardHeader, Table, TableHead, TableRow, TableBody, TableCell, Button, CardActions, TableContainer, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useEffect, useState} from "react";
import dayjs from 'dayjs';
import {OrderForm} from "../../types/orderForm";
import {
    getCreateForm,
    getOrdersByUser,
    getOrdersByUserPaged,
    orderDelete,
    orderGetAll,
    orderGetAllPaged
} from "../../api/orderService";
import {Order} from "../../types/order";
import {setOrders} from "../../features/orders/orderSlice";
import theme from "../../theme/theme";
import { useHeaders } from "../../hooks/useHeaders";
import {userType} from "../../api/authService";
import {userDelete} from "../../api/userService";
import AlertConfirm from "../shared/AlertConfirm";
import {Auth} from "../../types/auth";
import {clientGetAll, getClientsByUser} from "../../api/clientService";
import Pagination from "@mui/material/Pagination";
import {SkeletonTable} from "../shared/SkeletonTable";


const Orders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state: RootState) => state.orders);
    const storedData = sessionStorage.getItem('auth');
    const sessionAuthData: Auth = storedData ? JSON.parse(storedData) : null;
    const user = sessionAuthData ? sessionAuthData.user : null;
    const [orderCreateForm, setOrderCreateForm] = useState<OrderForm>();
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [alertOpen, setAlertOpen]= useState<boolean>(false);
    const [orderId, setOrderId]= useState<number | undefined>(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect(() => {
        const getOrders = async () => {
            let orderResponse;
            let data = {page: currentPage}
            user?.userType === 'super-admin' ? orderResponse = await orderGetAllPaged(currentPage, headers) : orderResponse = await getOrdersByUserPaged(user?.idUser, data, headers)
            const orderCreateFormResponse = await getCreateForm(headers);

            dispatch(setOrders(orderResponse.orders));
            setTotalPages(orderResponse.totalPages);
            setOrderCreateForm(orderCreateFormResponse);
            setLoading(false);
        }

        getOrders();
    }, [dispatch, isDeleted, currentPage]);

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
                setLoading(true);
            }
        } else if(confirm === 'cancel'){
            setAlertOpen(false);
            setOrderId(0);
        }
    }

    if(loading){
        return (
            <SkeletonTable />
        )
    }

    return (
        <Layout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Card sx={{pb: 2}}>
                            <CardHeader
                                title="Blerjet"
                            />
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
                                                    Komuna
                                                </TableCell>
                                                <TableCell>
                                                    Çmimi total
                                                </TableCell>
                                                <TableCell />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders.map((order) => {
                                                const client = orderCreateForm?.clients.find((client) => client.idClient === order.idClient?.idClient);
                                                const formattedMonth = order.orderDate ? dayjs(order.orderDate).format('MMM') : '';
                                                const formattedDay = order.orderDate ? dayjs(order.orderDate).format('DD') : '';
                                                const formattedYear = order.orderDate ? dayjs(order.orderDate).format('YYYY') : '';

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
                                                        <TableCell>
                                                            {`${client?.firstName} ${client?.lastName}`}
                                                        </TableCell>
                                                        <TableCell>
                                                            {client?.idMunicipality?.municipalityName}
                                                        </TableCell>
                                                        <TableCell>
                                                            {order.totalPrice}&euro;
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
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
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </TableContainer>
                            {totalPages > 1 &&
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={(event, page) => {
                                        setCurrentPage(page);
                                        setLoading(true);
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
                        </Card>
                    </Stack>
                    {alertOpen && <AlertConfirm
                        title={'Jeni duke fshirë blerjen'}
                        message={'Jeni i sigurt që dëshironi të fshini blerjen?'}
                        isOpen={alertOpen}
                        onClose={onCloseAlert}
                    />}
                </Container>
            </Box>
        </Layout>
    );
}

export default Orders;