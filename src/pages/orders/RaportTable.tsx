import {Order} from "../../types/order";
import {Box, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import dayjs from "dayjs";
import {Client} from "../../types/client";

interface RaportTableProps {
    // pdfRef: any;
    compId: any;
    client: Client | undefined;
    orders: Order[] | undefined;
    global: any;
}

export const RaportTable : React.FC<RaportTableProps> = (props) => {
    return(
        <Box id={props.compId} sx={{height: '100vh', width: '94%', m: 3}}>
            <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="space-between"
                spacing={3}
            >
                <Box
                    sx={{
                        height: 35,
                        width: 125,
                    }}
                >
                    <img
                        src="/assets/Lockup-Color.png"
                        alt="Lockup"
                        style={{width: '16rem', height: 'auto', objectFit: 'contain',}}
                    />
                </Box>
            </Stack>
            <Box sx={{mt: 3}}>
                <Grid
                    container
                    justifyContent="space-between"
                >
                    <Grid
                        xs={12}
                        sm={6}
                    >
                        <Typography variant="body2">
                            {props.global.companyDetails.businessNumber}
                            <br />
                            {props.global.companyDetails.name}
                            <br />
                            {props.global.companyDetails.phone}
                            <br />
                            {props.global.companyDetails.address}
                        </Typography>
                    </Grid>
                    <Grid
                        xs={12}
                        sm={6}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: { xs: 'left', sm: 'right' },
                                mt: {xs: '0.5rem'}
                            }}
                        >
                            {`${props.client?.firstName} ${props.client?.lastName}`}
                            <br />
                            {props.client?.email}
                            <br />
                            {props.client?.phone}
                            <br />
                            {props.client?.address}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Table sx={{ mt: 12, border: '1px solid black' }}>
                <TableHead sx={{ border: '1px solid black' }}>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Data e porosisë</TableCell>
                        <TableCell>Lloji</TableCell>
                        <TableCell>Materiali</TableCell>
                        <TableCell>Sasia</TableCell>
                        <TableCell>Kilogrami</TableCell>
                        <TableCell>Çmimi</TableCell>
                        <TableCell>Çmimi Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props?.orders?.map((order) => {
                        return(
                            <TableRow sx={{ border: '1px solid black' }}>
                                <TableCell sx={{borderBottom: '1px solid black'}}>{order?.idOrder}</TableCell>
                                <TableCell sx={{borderBottom: '1px solid black'}}>{order?.orderDate ? dayjs(order?.orderDate).format('DD-MM-YYYY') : ''}</TableCell>
                                <TableCell sx={{borderBottom: '1px solid black'}}>{order?.type}</TableCell>
                                <TableCell sx={{borderBottom: '1px solid black'}}>{order?.material}</TableCell>
                                <TableCell sx={{borderBottom: '1px solid black'}}>{order?.quantity}</TableCell>
                                <TableCell sx={{borderBottom: '1px solid black'}}>{order?.kilogram}kg</TableCell>
                                <TableCell sx={{borderBottom: '1px solid black'}}>{order?.price}&euro;</TableCell>
                                <TableCell sx={{borderBottom: '1px solid black'}}>{order?.totalPrice}&euro;</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </ Box>
    )
}