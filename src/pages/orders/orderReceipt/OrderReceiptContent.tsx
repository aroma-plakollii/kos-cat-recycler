import {
    Box,
    Stack,
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography
} from '@mui/material';
import {Order} from "../../../types/order";
import dayjs from "dayjs";
import {OrderForm} from "../../../types/orderForm";

interface OrderReceiptProps {
    id: any,
    order: Order | undefined;
    global: any;
}

export const OrderReceiptContent : React.FC<OrderReceiptProps> = (props) => {
    return (
        <Box id={props.id} sx={{height: '95vh', width: '100%', mx: 0, position: 'relative', '@media screen and (max-width: 576px)': { width: '160vw' }}}>
            <Box sx={{ mt: 1}}>
                <Grid
                    container
                    justifyContent="space-between"
                >
                    <Grid
                        xs={3}
                    >
                        <Typography variant="body2">
                            Nr. Unik: <b>{props.global.companyDetails.businessNumber}</b>
                            <br/>
                            Nr. TVSH: <b>{props.global.companyDetails.taxNumber}</b>
                            {/*<br/>*/}
                            {/*<b>{props.global.companyDetails.name}</b>*/}
                            <br/>
                            Tel: <b>{props.global.companyDetails.phone}</b>
                            <br/>
                            Adresa: <b>{props.global.companyDetails.address}</b>
                            <br/>
                            Nr: <b>{`${props.global.companyDetails.orderNumber}${props.order?.idOrder}`}</b>
                            <br/>
                            Data: <b>{props.order?.orderDate ? dayjs(props.order?.orderDate).format('DD.MM.YYYY') : ''}</b>
                        </Typography>
                    </Grid>
                    <Grid
                        xs={6}
                        sx={{display: 'flex', justifyContent: 'center'}}
                    >
                        <div>
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    height: 70,
                                    width: 70,
                                }}
                            >
                                <img
                                    src="/assets/Lockup-Color.svg"
                                    alt="Lockup"
                                    style={{width: '12rem', height: 'auto', objectFit: 'contain'}}
                                />
                            </Box>
                        </div>
                    </Grid>
                    <Grid
                        xs={3}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: {xs: 'right'},
                            }}
                        >

                            Shitësi: <b>{`${props.order?.idClient?.firstName} ${props.order?.idClient?.lastName}`}</b>
                            <br/>
                            Tel: <b>{props.order?.idClient?.phone}</b>
                            <br/>
                            ID: <b>{props.order?.idClient?.nationalId}</b>
                            <br/>
                            <b>{props.order?.idClient?.idMunicipality?.municipalityName}</b>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Table sx={{ mt: 12, border: '1px solid black' }}>
                <TableHead sx={{ border: '1px solid black' }}>
                    <TableRow>
                        <TableCell sx={{py: 1}}>Lloji</TableCell>
                        <TableCell sx={{py: 1}}>Sasia</TableCell>
                        <TableCell sx={{py: 1}}>Kilogrami</TableCell>
                        <TableCell sx={{py: 1}}>Çmimi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ border: '1px solid black' }}>
                        <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.order?.type}</TableCell>
                        <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.order?.quantity}</TableCell>
                        <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.order?.kilogram}kg</TableCell>
                        <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.order?.price}&euro;</TableCell>
                    </TableRow>
                    {/*{Array.from({ length: 11 }).map((_, index) => (*/}
                    {/*    <TableRow key={index}>*/}
                    {/*        <TableCell sx={{ border: 0 }}></TableCell>*/}
                    {/*        <TableCell sx={{ border: 0 }}></TableCell>*/}
                    {/*        <TableCell sx={{ border: 0 }}></TableCell>*/}
                    {/*        <TableCell sx={{ border: 0 }}></TableCell>*/}
                    {/*        <TableCell sx={{ border: 0 }}></TableCell>*/}
                    {/*        <TableCell sx={{ border: 0 }}></TableCell>*/}
                    {/*    </TableRow>*/}
                    {/*))}*/}
                    <TableRow>
                        <TableCell
                            colSpan={5}
                            sx={{ borderBottom: 'none', borderTop: '1px solid black', py: 1 }}
                        />
                        <TableCell
                            align="right"
                            sx={{ borderBottom: 'none', borderTop: '1px solid black', py: 1 }}
                        >
                            <Typography variant="subtitle2">
                                <span style={{fontWeight: 700, fontSize: '16px', marginRight: '1rem'}}>Totali:</span>
                                {props.order?.totalPrice}&euro;
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 60,
                    left: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    // mt: 10,
                }}
            >
                <Typography sx={{ fontWeight: 500, fontSize: '18px', mr: 9, fontFamily: 'Times New Roman' }}>Depoisti</Typography>
                <Typography sx={{ width: '10.5rem', borderBottom: '1px solid black', height: '2.5rem', mr: 2 }}></Typography>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 60,
                    right: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    // mt: 10,
                }}
            >
                <Typography sx={{ fontWeight: 500, fontSize: '18px', mr: 8, fontFamily: 'Times New Roman' }}>Nënshkrimi</Typography>
                <Typography sx={{ width: '10.5rem', borderBottom: '1px solid black', height: '2.5rem', mr: 2 }}></Typography>
            </Box>
        </ Box>
    )
}