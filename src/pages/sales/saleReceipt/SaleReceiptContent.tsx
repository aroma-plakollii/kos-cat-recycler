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
import dayjs from "dayjs";
import {Sale} from "../../../types/sale";

interface SaleReceiptContentProps {
    id: any,
    sale: Sale | undefined;
    global: any;
}

export const SaleReceiptContent : React.FC<SaleReceiptContentProps> = (props) => {
    return (
        <Box id={props.id} sx={{height: '90vh', width: '100%', mt: 1, '@media screen and (max-width: 576px)': { width: '160vw' } }}>
            <Box>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid
                        xs={5}
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
                            Nr: <b>{props.sale?.saleNumber}</b>
                            <br/>
                            Data: <b>{dayjs(props.sale?.date).format('DD.MM.YYYY')}</b>
                        </Typography>
                    </Grid>
                    <Grid
                        xs={7}
                        sx={{display: 'flex', justifyContent: 'start'}}
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
                </Grid>
            </Box>
            <Table sx={{ mt: 16, border: '1px solid black' }}>
                <TableHead sx={{ border: '1px solid black' }}>
                    <TableRow>
                        <TableCell sx={{py: 1}}>Përshkrimi</TableCell>
                        <TableCell sx={{py: 1}}>Kilogrami</TableCell>
                        <TableCell sx={{py: 1}}>Sasia</TableCell>
                        <TableCell sx={{py: 1}}>Çmimi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ border: '1px solid black' }}>
                        <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.sale?.description}</TableCell>
                        <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.sale?.kilogram}kg</TableCell>
                        <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.sale?.quantity}</TableCell>
                        <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.sale?.price}&euro;</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell
                            colSpan={5}
                            sx={{ borderBottom: 'none', borderTop: '1px solid black', py: 1}}
                        />
                        <TableCell
                            align="right"
                            sx={{ borderBottom: 'none', borderTop: '1px solid black', py: 1 }}
                        >
                            <Typography variant="subtitle2">
                                <span style={{fontWeight: 700, fontSize: '16px', marginRight: '1rem'}}>Totali:</span>
                                {props.sale?.totalPrice}&euro;
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </ Box>
    )
}