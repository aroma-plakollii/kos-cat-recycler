import {
    Box,
    Button,
    Container,
    Stack,
    Divider,
    Typography,
    Card,
    SvgIcon
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalPrintshop from '@mui/icons-material/LocalPrintshop';
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Layout} from "../../layout/Layout";
import {Order} from "../../../types/order";
import {useGlobalData} from "../../../hooks/useGlobalData";
import {getCreateForm, orderGetSingle} from "../../../api/orderService";
import {OrderReceiptContent} from "./OrderReceiptContent";
import { useHeaders } from '../../../hooks/useHeaders';
import {OrderForm} from "../../../types/orderForm";

export const OrderReceipt = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState<Order>();
    const globalData = useGlobalData();
    const headers = useHeaders();

    useEffect( () => {
        const getOrders = async () => {
            const orderResponse = await orderGetSingle(Number(orderId), headers);
            console.log(orderResponse)

            setOrder(orderResponse);
        }

        getOrders();
    }, []);

    const handlePrint = () => {
        window.print();
        console.log(order)
    };

    return (
        <Layout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    mb:8
                }}
            >
                <Container maxWidth="lg">
                    <Stack
                        divider={<Divider />}
                        spacing={4}
                    >
                        <Stack spacing={4}>
                            <Stack
                                alignItems="center"
                                direction="row"
                                justifyContent="space-between"
                                spacing={4}
                            >
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <Link to={`/orders`}>
                                        <Button sx={{border: 'none', color: 'black', fontSize: '15px'}}>
                                            <ArrowBackIcon sx={{mr: 1}}/> Kthehu
                                        </Button>
                                    </Link>
                                </Stack>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <Button
                                        color="inherit"
                                        onClick={handlePrint}
                                    >
                                        <SvgIcon>
                                            <LocalPrintshop sx={{color: 'text.secondary'}} />
                                        </SvgIcon>
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Card sx={{ px: 6, pt: 4, overflowX: 'auto'}} >
                            <OrderReceiptContent id="printContent" order={order} global={globalData}/>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    )
}