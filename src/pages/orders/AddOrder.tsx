import {Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, FormControl, Unstable_Grid2 as Grid, MenuItem } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Layout} from "../layout/Layout";
import {Link, useNavigate, useParams} from "react-router-dom";
import theme from "../../theme/theme";
import {ChangeEvent, useEffect, useState} from "react";
import {Order} from "../../types/order";
import {OrderForm} from "../../types/orderForm";
import {getCreateForm, orderCreate} from "../../api/orderService";
import { useHeaders } from '../../hooks/useHeaders';
import {clientGetSingle} from "../../api/clientService";

export const AddOrder = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const storedData = sessionStorage.getItem('auth');
    const sessionAuthData = storedData ? JSON.parse(storedData) : null;
    const user = sessionAuthData ? sessionAuthData.user : null;
    const [order, setOrder] = useState<Order>();
    const [orderCreateForm, setOrderCreateForm] = useState<OrderForm>();
    const [errors, setErrors] = useState({
        quantity: false,
        price: false,
        orderDate: false,
        type: false,
        kilogram: false,
        totalPrice: false
    });
    const headers = useHeaders();

    useEffect( () => {
        const getOrderCreateForm = async () => {
            // const orderDate = order?.orderDate ? order?.orderDate : new Date();
            const client = await clientGetSingle(Number(clientId), headers);
            const orderCreateFormResponse = await getCreateForm(headers);

            setOrderCreateForm(orderCreateFormResponse);
            if (user !== null) {
                setOrder({...order, idUser: user, idClient: client, type: 'Katalizator mbeturinë'});
            }
        }

        getOrderCreateForm();
    }, []);

    useEffect(() => {
        const calculateTotalPrice = async () =>{
            setOrder({ ...order,
                totalPrice: Number((Number(order?.quantity) * Number(order?.price)).toFixed(2))});
        }

        calculateTotalPrice();
    }, [order?.quantity, order?.price]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setOrder({
            ...order,
            [name]: value,
        });

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: value ? false : true,
        }));
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

        if (!order?.idClient || !order?.quantity || !order?.price || !order?.orderDate ||
            !order?.type || !order?.kilogram){
            setErrors({
                ...errors,
                quantity: !order?.quantity ? true : false,
                price: !order?.price ? true : false,
                orderDate: !order?.orderDate ? true : false,
                type: !order?.type ? true : false,
                kilogram: !order?.kilogram ? true : false,
                totalPrice: !order?.totalPrice ? true : false
            });
            return;
        }

        try{
            const res = await orderCreate(order, headers);

            if(res){
                navigate(`/clients/${clientId}`);
            }
        }catch(error) {
            console.error('Order create failed', error);
        }
    }

    return (
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
                            title="Shto Blerjen"
                        />
                        <CardContent sx={{pt: 0}}>
                            <Box sx={{m: -1.5}}>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    {/*<Grid*/}
                                    {/*    xs={12}*/}
                                    {/*    md={6}*/}
                                    {/*>*/}
                                    {/*    <TextField*/}
                                    {/*        fullWidth*/}
                                    {/*        select*/}
                                    {/*        error={error}*/}
                                    {/*        label="Klienti"*/}
                                    {/*        name="idClient"*/}
                                    {/*        type='text'*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        value={order?.idClient}*/}
                                    {/*        variant="outlined"*/}
                                    {/*        InputLabelProps={{*/}
                                    {/*            shrink: order?.idClient ? true : false,*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        {orderCreateForm?.clients.map((client: Client | any) => {*/}
                                    {/*            return (*/}
                                    {/*                <MenuItem*/}
                                    {/*                    key={client.idClient}*/}
                                    {/*                    value={client.idClient}*/}
                                    {/*                >*/}
                                    {/*                    {`${client.firstName} ${client.lastName}`}*/}
                                    {/*                </MenuItem >*/}
                                    {/*            )*/}
                                    {/*        })}*/}
                                    {/*    </TextField>*/}
                                    {/*</Grid>*/}
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
                                                        value={order?.orderDate}
                                                        onChange={onDateChange}
                                                        disablePast={user?.userType === 'agent' ? true : false}
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
                                                shrink: (order?.quantity || order?.price || order?.totalPrice) ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    {/*<Grid*/}
                                    {/*    xs={12}*/}
                                    {/*    md={6}*/}
                                    {/*>*/}
                                    {/*    <TextField*/}
                                    {/*        fullWidth*/}
                                    {/*        select*/}
                                    {/*        // error={error}*/}
                                    {/*        label="Përdoruesi"*/}
                                    {/*        name="idUser"*/}
                                    {/*        type='text'*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        value={order?.idUser?.idUser || ''}*/}
                                    {/*        variant="outlined"*/}
                                    {/*        InputLabelProps={{*/}
                                    {/*            shrink: order?.idUser?.idUser ? true : false,*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        {orderCreateForm?.users*/}
                                    {/*            .filter((userItem: User | any) => userItem.idUser === user?.idUser)*/}
                                    {/*                .map((userItem: User | any) => (*/}
                                    {/*                    <MenuItem key={userItem.idUser} value={userItem.idUser}>*/}
                                    {/*                        {`${userItem.firstName} ${userItem.lastName}`}*/}
                                    {/*                    </MenuItem>*/}
                                    {/*                ))}*/}
                                    {/*    </TextField>*/}
                                    {/*</Grid>*/}
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'right', pt: 2}}>
                            <Link to={`/clients/${clientId}`}>
                                <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600]}, }}>
                                    Anulo
                                </Button>
                            </Link>
                            <Button variant="contained" type='submit'>
                                Ruaj
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </Layout>
    )
}