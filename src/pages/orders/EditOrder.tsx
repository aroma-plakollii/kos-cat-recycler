import {Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, FormControl, Unstable_Grid2 as Grid, MenuItem } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {Layout} from "../layout/Layout";
import {Link, useNavigate, useParams} from "react-router-dom";
import theme from "../../theme/theme";
import {ChangeEvent, useEffect, useState} from "react";
import {Order} from "../../types/order";
import {OrderForm} from "../../types/orderForm";
import {getUpdateForm, orderGetSingle, orderUpdate} from "../../api/orderService";
import {useGlobalData} from "../../hooks/useGlobalData";
import { useHeaders } from '../../hooks/useHeaders';
import {Auth} from "../../types/auth";
import {SkeletonDetails} from "../shared/SkeletonDetails";

export const EditOrder = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const storedData = sessionStorage.getItem('auth');
    const sessionAuthData: Auth = storedData ? JSON.parse(storedData) : null;
    const user = sessionAuthData ? sessionAuthData.user : null;
    const [order, setOrder] = useState<Order>();
    const [orderUpdateForm, setOrderUpdateForm] = useState<OrderForm>();
    const [errors, setErrors] = useState({
        quantity: false,
        price: false,
        orderDate: false,
        type: false,
        kilogram: false,
        totalPrice: false
    });
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect(() => {
        const getOrders = async () =>{
            const order = await orderGetSingle(Number(orderId), headers);
            setOrder(order);
            setLoading(false);
        }

        getOrders();
    }, []);

    useEffect(() => {
        const calculateTotalPrice = async () =>{
            setOrder({ ...order,
                totalPrice: Number((Number(order?.quantity) * Number(order?.price)).toFixed(2))});
        }

        calculateTotalPrice();
    }, [order?.quantity, order?.price]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOrder({ ...order, [e.target.name]: e.target.value});
        setErrors({
            ...errors,
            [e.target.name]: e.target.value ? false : true,
        });
    };

    const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setOrder({
            ...order,
            [name]: {
                ...(order && order[name as keyof Order] as Record<string, any> || {}),
                [e.target.name]: value,
            },
        });
    };

    const onDateChange = (val: any) => {
        setOrder({
            ...order,
            orderDate: val
        });
        setErrors({
            ...errors,
            orderDate: val ? false : true,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!order?.idClient || !order?.quantity || !order?.price || !order?.orderDate ||
            !order?.type || !order?.kilogram){
            setErrors({
                ...errors,
                quantity: !order?.quantity ? true : false,
                price: !order?.price ? true : false,
                orderDate: !order?.orderDate ? true : false,
                type: !order?.type ? true : false,
                kilogram: !order?.kilogram ? true : false,
            });
            setLoading(false);
            return;
        }

        try{
            const res = await orderUpdate(Number(orderId), order, headers);

            if(res){
                setLoading(false);
                navigate('/orders');
            }
        }catch(error) {
            console.error('Order update failed', error);
        }
    }

    if(loading){
        return (
            <SkeletonDetails />
        )
    }

    return (
        <>
            <Layout>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 8,
                        width: '70%',
                        margin: 'auto',
                        '@media screen and (max-width: 576px)': {width: '90%'}
                    }}
                >
                    <form
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <Card sx={{pb: 2}}>
                            <CardHeader
                                title="Detajet e Blerjes"
                            />
                            <CardContent sx={{pt: 0}}>
                                <Box sx={{m: -1.5}}>
                                    <Grid
                                        container
                                        spacing={3}
                                    >
                                        <Grid
                                            xs={12}
                                            md={6}
                                        >
                                            <TextField
                                                fullWidth
                                                error={errors.quantity}
                                                label="Sasia"
                                                name="quantity"
                                                onChange={handleChange}
                                                value={order?.quantity}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: order?.quantity ? true : false,
                                                }}
                                            />
                                        </Grid>
                                        <Grid
                                            xs={12}
                                            md={6}
                                        >
                                            <TextField
                                                fullWidth
                                                error={errors.price}
                                                label="Çmimi"
                                                name="price"
                                                onChange={handleChange}
                                                value={order?.price}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: order?.price ? true : false,
                                                }}
                                            />
                                        </Grid>
                                        <Grid
                                            xs={12}
                                            md={6}
                                        >
                                            <FormControl sx={{width: '100% !important'}}>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer components={['DatePicker']} sx={{width: '100% !important', paddingTop: '0 !important'}}>
                                                        <DatePicker
                                                            label="Data e porosisë"
                                                            value={dayjs(order?.orderDate)}
                                                            onChange={onDateChange}
                                                            format={'DD/MM/YYYY'}
                                                            sx={{width: '100% !important',
                                                                border: errors.orderDate ? '1px solid red' : 'none',
                                                                borderRadius: '10px'}}
                                                        />
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                            </FormControl>
                                        </Grid>

                                        <Grid
                                            xs={12}
                                            md={6}
                                        >
                                            <TextField
                                                fullWidth
                                                error={errors.type}
                                                label="Lloji"
                                                name="type"
                                                onChange={handleChange}
                                                value={order?.type}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: order?.type ? true : false,
                                                }}
                                            />
                                        </Grid>
                                        {/*<Grid*/}
                                        {/*    xs={12}*/}
                                        {/*    md={6}*/}
                                        {/*>*/}
                                        {/*    <TextField*/}
                                        {/*        fullWidth*/}
                                        {/*        error={error}*/}
                                        {/*        label="Materiali"*/}
                                        {/*        name="material"*/}
                                        {/*        onChange={handleChange}*/}
                                        {/*        value={order?.material}*/}
                                        {/*        variant="outlined"*/}
                                        {/*        InputLabelProps={{*/}
                                        {/*            shrink: order?.material ? true : false,*/}
                                        {/*        }}*/}
                                        {/*    />*/}
                                        {/*</Grid>*/}
                                        <Grid
                                            xs={12}
                                            md={6}
                                        >
                                            <TextField
                                                fullWidth
                                                error={errors.kilogram}
                                                label="Kilogrami"
                                                name="kilogram"
                                                onChange={handleChange}
                                                value={order?.kilogram}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: order?.kilogram ? true : false,
                                                }}
                                            />
                                        </Grid>
                                        <Grid
                                            xs={12}
                                            md={6}
                                        >
                                            <TextField
                                                fullWidth
                                                error={errors.totalPrice}
                                                label="Çmimi total"
                                                name="totalPrice"
                                                onChange={handleChange}
                                                value={order?.quantity && order?.price ? (+order.quantity * +order.price).toFixed(2) : ''}
                                                variant="outlined"
                                                InputLabelProps={{
                                                    shrink: order?.price ? true : false,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                            <Divider/>
                            <CardActions sx={{justifyContent: 'right', pt: 2}}>
                                <Link to={`/orders`}>
                                    <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600]}, }}>
                                        Anulo
                                    </Button>
                                </Link>
                                { user?.userType === 'super-admin' &&
                                    <Button variant="contained" type="submit">
                                        Ruaj ndryshimet
                                    </Button>
                                }
                            </CardActions>
                        </Card>
                    </form>
                </Box>
            </Layout>
        </>
    )
}