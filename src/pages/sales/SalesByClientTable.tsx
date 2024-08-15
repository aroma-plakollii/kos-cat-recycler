import {
    Box, Button,
    Card, CardActions,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import theme from "../../theme/theme";
import EditIcon from "@mui/icons-material/Edit";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {Client} from "../../types/client";
import {Sale} from "../../types/sale";
import {SaleForm} from "../../types/saleForm";
import {Dispatch, SetStateAction} from "react";
import Pagination from "@mui/material/Pagination";

interface SalesByClientTableProps {
    sales: Sale[] | undefined;
    saleCreateForm: SaleForm | undefined;
    client: Client| undefined;
    currentPage: number;
    totalPages: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const SalesByClientTable : React.FC<SalesByClientTableProps> = (props) => {
    return(
        <Card sx={{pb: 2}}>
            <Box display={'flex'} p={2} sx={{alignItems: 'center'}}>
                <Typography sx={{fontWeight: '500' , fontSize: '21px'}}>Shitjet - </Typography>
                <Typography sx={{fontSize: '15px', pl: 1, pt: 0.4}}> {`${props.client?.firstName} ${props.client?.lastName}`}</Typography>
            </Box>
            {props.sales && props.sales?.length > 0 ? (
                <TableContainer sx={{ overflowX: 'auto' }}>
                    <Box sx={{minWidth: 800}}>
                        <Table>
                            <TableHead sx={{background: '#f8f9fa'}}>
                                <TableRow>
                                    <TableCell>
                                        Nr. i shitjes
                                    </TableCell>
                                    <TableCell>
                                        Data
                                    </TableCell>
                                    <TableCell>
                                        Kilogrami
                                    </TableCell>
                                    <TableCell>
                                        Sasia
                                    </TableCell>
                                    <TableCell>
                                        Totali
                                    </TableCell>
                                    <TableCell align="right">

                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.sales?.map((sale) => {
                                    const formattedMonth = sale?.date ? dayjs(sale?.date).format('MMM') : '';
                                    const formattedDay = sale?.date ? dayjs(sale?.date).format('DD') : '';
                                    const formattedYear = sale?.date ? dayjs(sale?.date).format('YYYY') : '';

                                    return (
                                        <TableRow
                                            hover
                                        >
                                            <TableCell>
                                                {sale.saleNumber}
                                            </TableCell>
                                            <TableCell sx={{pl: 1}}>
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
                                                {sale.kilogram}
                                            </TableCell>
                                            <TableCell>
                                                {sale.quantity}
                                            </TableCell>
                                            <TableCell>
                                                {`${sale.totalPrice}€`}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Link to={`/sales/receipt/${sale.idSale}`}>
                                                    <Button
                                                        sx={{
                                                            mr: '0.5rem',
                                                            padding: '3px 14px !important',
                                                            color: 'black',
                                                            backgroundColor: '#dddddd',
                                                            fontSize: '13px',
                                                            borderRadius: '15px'
                                                        }}
                                                    >
                                                        <ReceiptLongIcon />
                                                    </Button>
                                                </Link>
                                                <Link to={`/sales/${sale.idSale}`}>
                                                    <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.primary.dark,
                                                        backgroundColor: '#ccddff', fontSize: '13px', borderRadius: '15px' }}>
                                                        <EditIcon />
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                    { props.totalPages > 1 &&
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
            ) : <Typography px={3}>Klienti nuk ka asnjë shitje</Typography>}
        </Card>
    )
}