import {Layout} from "../layout/Layout";
import {
    Box,
    Container,
    Stack,
    Button,
    FormControl, Card,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Order} from "../../types/order";
import {getOrdersByClient, getOrdersByClientPaged, getOrdersByUserPaged} from "../../api/orderService";
import {Client} from "../../types/client";
import {clientGetSingle} from "../../api/clientService";
import { useHeaders } from "../../hooks/useHeaders";
import {OrderByClientTable} from "./OrderByClientTable";
import {ClientTable} from "./ClientTable";
import Pagination from "@mui/material/Pagination";

export const OrdersbyClient = () => {
    const { clientId } = useParams();
    const [orders, setOrders] = useState<Order[]>();
    const [client, setClient] = useState<Client>();
    const [deletionUpdate, setDeletionUpdate] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const headers = useHeaders();

    useEffect(() => {
        const getOrders = async () =>{
            let data = {page: currentPage}
            const orderResponse = await getOrdersByClientPaged(Number(clientId), data, headers);
            const client = await clientGetSingle(Number(clientId), headers);

            setOrders(orderResponse.orders);
            setClient(client);
        }

        getOrders();
    }, [deletionUpdate]);

    const updateDeletion = () => {
        setDeletionUpdate(true);
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
                        <ClientTable client={client} />

                        {/*<Card>*/}
                        {/*    <OrderByClientTable updateDeletion={updateDeletion} orders={orders} clientId={clientId}/>*/}
                        {/*    <Pagination*/}
                        {/*        count={totalPages}*/}
                        {/*        page={currentPage}*/}
                        {/*        onChange={(event, page) => {*/}
                        {/*            setCurrentPage(page);*/}
                        {/*        }}*/}
                        {/*        sx={{ '& .MuiPagination-ul' : {*/}
                        {/*                display: 'flex',*/}
                        {/*                width: '80%',*/}
                        {/*                margin: '1rem auto 0 auto',*/}
                        {/*                justifyContent: 'center'*/}
                        {/*            }}}*/}
                        {/*    />*/}
                        {/*</Card>*/}

                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
}

export default OrdersbyClient