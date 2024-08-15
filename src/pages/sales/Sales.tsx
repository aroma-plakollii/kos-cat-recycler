import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useEffect, useState} from "react";
import {useHeaders} from "../../hooks/useHeaders";
import {Layout} from "../layout/Layout";
import {
    Box,
    Button,
    Card, CardActions,
    CardHeader,
    Container,
    Stack,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import theme from "../../theme/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AlertConfirm from "../shared/AlertConfirm";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {SaleForm} from "../../types/saleForm";
import {getCreateForm, saleDelete, saleGetAll, saleGetAllPaged} from "../../api/saleService";
import {setSales} from "../../features/sales/saleSlice";
import {Sale} from "../../types/sale";
import Pagination from "@mui/material/Pagination";
import {SkeletonTable} from "../shared/SkeletonTable";
import {SkeletonTableWithButton} from "../shared/SkeletonTableWithButton";

export const Sales = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user );
    const sales = useSelector((state: RootState) => state.sales);
    const [saleCreateForm, setSaleCreateForm] = useState<SaleForm>();
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [alertOpen, setAlertOpen]= useState<boolean>(false);
    const [saleId, setSaleId]= useState<number | undefined>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect(() => {
        const getSales = async () => {
            const salesResponse: any = await saleGetAllPaged(currentPage, headers);

            if(salesResponse)
                dispatch(setSales(salesResponse.sales as Sale[]));

            setTotalPages(salesResponse.totalPages)
            setLoading(false);
        }

        getSales();
    }, [dispatch, isDeleted, currentPage]);

    const onDelete = async (id: number | undefined) => {
        setAlertOpen(true);
        setSaleId(id);
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await saleDelete(saleId, headers);

            if (isDeleted) {
                setIsDeleted(true);
                setAlertOpen(false);
                setSaleId(0);
                setLoading(true);
            }
        } else if(confirm === 'cancel'){
            setAlertOpen(false);
            setSaleId(0);
        }
    }

    if(loading){
        return (
            <SkeletonTableWithButton />
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
                        <div>
                            <Link to={'/sales/add'}>
                                <Button
                                    startIcon={(
                                        <AddIcon/>
                                    )}
                                    variant="contained"
                                >
                                    Shto
                                </Button>
                            </Link>
                        </div>

                        <Card sx={{pb: 2}}>
                            <CardHeader
                                title="Shitjet"
                            />
                            <TableContainer sx={{overflowX: 'auto'}}>
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
                                            {sales.map((sale) => {
                                                const formattedMonth = sale?.date ? dayjs(sale?.date).format('MMM') : '';
                                                const formattedDay = sale?.date ? dayjs(sale?.date).format('DD') : '';
                                                const formattedYear = sale?.date ? dayjs(sale?.date).format('YYYY') : '';
                                                return (
                                                    <TableRow
                                                        hover
                                                        key={sale.idSale}
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
                                                            {sale.totalPrice}&euro;
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
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
                                                                        <ReceiptLongIcon/>
                                                                    </Button>
                                                                </Link>
                                                                <Link to={`/sales/${sale.idSale}`}>
                                                                    <Button
                                                                        sx={{
                                                                            mr: '0.5rem',
                                                                            padding: '3px 14px !important',
                                                                            color: theme.palette.primary.dark,
                                                                            backgroundColor: '#ccddff',
                                                                            fontSize: '13px',
                                                                            borderRadius: '15px'
                                                                        }}>
                                                                        <EditIcon/>
                                                                    </Button>
                                                                </Link>
                                                                {user?.userType === 'super-admin' &&
                                                                    <Button sx={{
                                                                        mr: '0.5rem',
                                                                        padding: '3px 14px !important',
                                                                        color: theme.palette.error.dark,
                                                                        backgroundColor: '#ffdad7',
                                                                        fontSize: '13px',
                                                                        borderRadius: '15px'
                                                                    }}
                                                                            onClick={() => onDelete(sale.idSale)}>
                                                                        <DeleteIcon/>
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
                </Container>
                {alertOpen && <AlertConfirm
                    title={'Jeni duke fshirë shitjen'}
                    message={'Jeni i sigurt që dëshironi të fshini shitjen?'}
                    isOpen={alertOpen}
                    onClose={onCloseAlert}
                />}
            </Box>
        </Layout>
    );
}