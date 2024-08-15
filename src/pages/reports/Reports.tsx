import {
    Box,
    Button,
    Card,
    CardActions,
    Container,
    FormControl,
    Autocomplete,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import {ChangeEvent, useEffect, useState} from "react";
import { Layout } from "../layout/Layout";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {getOrdersByDate, getOrdersByDateAndClient} from "../../api/orderService";
import {Order} from "../../types/order";
import {useHeaders} from "../../hooks/useHeaders";
import {clientGetAll} from "../../api/clientService";
import {setClients} from "../../features/clients/clientSlice";
import {Client} from "../../types/client";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {resetOrders, setOrders} from "../../features/orders/orderSlice";
import {Link} from "react-router-dom";
import {useGlobalData} from "../../hooks/useGlobalData";
import {ReportsTable} from "./ReportsTable";
import * as XLSX from 'xlsx';
interface TransformedOrder {
    Id: number | string;
    "Numri i porosis": string;
    "Data e porosis": string;
    Klienti: string;
    "Numri i leternjoftimit": string;
    Lloji: string;
    Sasia: number | string;
    kilogram: number | string;
    Çmimi: string;
    Totali: string;
}

interface FilterData {
    client: Client;
    clients: Client[];
    orders: TransformedOrder[];
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    isFilteredByDate: boolean;
    isFilteredByClient: boolean;
}

export const Reports = () => {
    const headers = useHeaders();
    const dispatch = useDispatch();
    const clients = useSelector((state: RootState) => state.clients);
    const orders = useSelector((state: RootState) => state.orders);
    const [filterData, setFilterData] = useState<FilterData>({
        client: {},
        clients: [],
        orders: [],
        startDate: dayjs(new Date()),
        endDate: dayjs(new Date()),
        isFilteredByDate: false,
        isFilteredByClient: false

    });
    const globalData = useGlobalData();
    const defaultProps = {
        options: filterData.clients,
        getOptionLabel: (option: Client) => `${option.firstName} ${option.lastName}`,
    };

    useEffect(() => {
        const getClients = async () => {
            dispatch(resetOrders());
            const clientsResponse: any = await clientGetAll(headers);

            if(clientsResponse)
                dispatch(setClients(clientsResponse.clients as Client[]));
        }

        getClients();
    }, [dispatch]);

    const onDateChange = (key: any, val: any) => {
        setFilterData({
            ...filterData,
            [key] : val
        });
    };

    const filterByDate = async () => {
        try{
            const data = {
                startDate: filterData.startDate?.format('YYYY-MM-DD'),
                endDate: filterData.endDate?.format('YYYY-MM-DD')
            }

            let transformedOrders: TransformedOrder[] = [];
            const orders = await getOrdersByDate(data, headers);

            if(orders){
                dispatch(setOrders(orders as Order[]));
                transformedOrders = orders.map((order: any) => ({
                    Id: order.idOrder,
                    "Numri i porosis": `${globalData.companyDetails.orderNumber}${order.idOrder}`,
                    "Data e porosis": dayjs(filterData.startDate).format('DD.MM.YYYY'),
                    Klienti: `${order.idClient.firstName} ${order.idClient.lastName}`,
                    "Numri i leternjoftimit": order.idClient.nationalId,
                    Lloji: order.type,
                    Sasia: order.quantity,
                    kilogram: order.kilogram,
                    Çmimi: order.price,
                    Totali: order.totalPrice
                }));

                const totalKilograms = transformedOrders.reduce((acc, order) => acc + Number(order.kilogram), 0);
                const totalPrices = transformedOrders.reduce((acc, order) => acc + parseFloat(order.Totali), 0);

                transformedOrders.push({
                    Id: '',
                    "Numri i porosis": '',
                    "Data e porosis": '',
                    Klienti: '',
                    "Numri i leternjoftimit": '',
                    Lloji: '',
                    Sasia: '',
                    kilogram: 'Kg: ' + totalKilograms,
                    Çmimi: '',
                    Totali: 'Totali: ' + totalPrices.toFixed(2)
                });

                setFilterData({...filterData, })
            }

            const clientIds = new Set(orders.map((order) => order?.idClient?.idClient));
            const filteredClients = clients.filter(client => clientIds.has(client.idClient));

            setFilterData({
                ...filterData,
                clients: filteredClients,
                isFilteredByDate: true,
                orders: transformedOrders
            });
        }catch (error){
            console.error('Failed getting orders', error);
        }
    }

    const filterByDateAndClient = async (value: any) => {
        try{
            console.log(value)
            const newIdClient = value?.idClient ?? '';
            setFilterData(prev => ({
                ...prev,
                idClient: newIdClient
            }));
            const data = {
                idClient: Number(value?.idClient ?? ''),
                startDate: filterData.startDate?.format('YYYY-MM-DD'),
                endDate: filterData.endDate?.format('YYYY-MM-DD')
            }

            const orders = await getOrdersByDateAndClient(data, headers);

            if(orders){
                dispatch(setOrders(orders as Order[]));
                setFilterData({...filterData, isFilteredByClient: true});
            }
        }catch (error){
            console.error('Failed getting orders', error);
        }
    }

    const handleOnExport = () => {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(filterData.orders);

        XLSX.utils.book_append_sheet(wb, ws, `Raports`);
        XLSX.writeFile(wb, `Raports(${dayjs(filterData.startDate).format('DD.MM.YYYY')}-${dayjs(filterData.endDate).format('DD.MM.YYYY')}).xlsx`);
    }

    return(
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
                        <Card sx={{
                            py: 4,
                            '@media screen and (max-width: 576px)': { px: 3}
                        }}>
                            <Stack
                                direction="row"
                                flexWrap="wrap"
                                gap={2}
                                justifyContent="center"
                                sx={{'@media screen and (max-width: 576px)': { flexDirection: 'column' }}}
                            >
                                <FormControl sx={{width: '37%', '@media screen and (max-width: 576px)': { width: '100%' }}}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']} sx={{paddingTop: '0 !important'}}>
                                            <DatePicker
                                                label="Nga"
                                                value={dayjs(filterData?.startDate)}
                                                onChange={(val) => onDateChange('startDate', val)}
                                                format={'DD/MM/YYYY'}
                                                sx={{width: '100% !important'}}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </FormControl>

                                <FormControl sx={{width: '37%', '@media screen and (max-width: 576px)': { width: '100%' }}}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']} sx={{paddingTop: '0 !important'}}>
                                            <DatePicker
                                                label="Deri"
                                                value={dayjs(filterData?.endDate)}
                                                onChange={(val) => onDateChange('endDate', val)}
                                                format={'DD/MM/YYYY'}
                                                sx={{width: '100% !important'}}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </FormControl>

                                <Button
                                    variant="contained"
                                    onClick={filterByDate}
                                    sx={{width: '15%', '@media screen and (max-width: 576px)': {width: '100%'}}}
                                >
                                    Gjenero Raportin
                                </Button>
                            </Stack>
                        </Card>

                        {orders.length > 0 &&
                            <Stack spacing={3}>
                                <Card sx={{
                                    py: 4,
                                    px: 5,
                                    '@media screen and (max-width: 576px)': {px: 3}
                                }}>
                                    <Box display="flex" justifyContent="end" mb="20px">
                                        <Autocomplete
                                            {...defaultProps}
                                            id="clear-on-escape"
                                            onChange={(event, value) => filterByDateAndClient(value)}
                                            value={clients.find(client => client.idClient === filterData.client.idClient) || null}
                                            clearOnEscape
                                            renderInput={(params) => (
                                                <TextField {...params} label="Klienti" variant="standard"
                                                           sx={{ '& .MuiInputLabel-root': { lineHeight: '11px' }}}
                                                />
                                            )}
                                            sx={{width: '25%', mr: '15px', '@media screen and (max-width: 576px)': {width: '60%'}}}
                                            // isOptionEqualToValue={(option, value) => option.idClient === value.idClient}
                                        />
                                        {/*<Link to={`/reports/pdf-viewer`}>*/}
                                            <Button onClick={handleOnExport} sx={{backgroundColor: '#F3F4F6', color: 'black'}}><DownloadIcon /></Button>
                                        {/*</Link>*/}
                                    </Box>
                                    <ReportsTable orders={orders}/>
                                </Card>
                            </Stack>
                        }

                        {
                            (orders.length === 0 && filterData.isFilteredByDate) &&
                            (
                                <Stack spacing={3}>
                                    <Card sx={{
                                        py: 4,
                                        px: 5,
                                        '@media screen and (max-width: 576px)': {px: 3}
                                    }}>
                                        <Typography>Nuk është gjetur asnjë blerje</Typography>
                                    </Card>
                                </Stack>
                            )
                        }
                    </Stack>
                </Container>
            </Box>
        </Layout>
    )
} 

