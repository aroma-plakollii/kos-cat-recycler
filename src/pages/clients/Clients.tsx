import {Layout} from "../layout/Layout";
import { Card,Box, Container, Stack, CardHeader, Table, TableHead, TableRow, TableBody, TableCell, Button, CardActions, TableContainer} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useEffect, useState} from "react";
import {
    clientDelete,
    clientGetAllPaged,
    getClientsByUser,
    getClientsByUserPaged,
    getCreateForm
} from "../../api/clientService";
import {setClients} from "../../features/clients/clientSlice";
import {ClientForm} from "../../types/clientForm";
import theme from "../../theme/theme";
import { useHeaders } from "../../hooks/useHeaders";
import AlertConfirm from "../shared/AlertConfirm";
import {Auth} from "../../types/auth";
import {SkeletonTableWithButton} from "../shared/SkeletonTableWithButton";

const Clients = () => {
    const dispatch = useDispatch();
    const clients = useSelector((state: RootState) => state.clients);
    const storedData = sessionStorage.getItem('auth');
    const sessionAuthData: Auth = storedData ? JSON.parse(storedData) : null;
    const user = sessionAuthData ? sessionAuthData.user : null;
    const [clientCreateForm, setClientCreateForm] = useState<ClientForm>();
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [alertOpen, setAlertOpen]= useState<boolean>(false);
    const [clientId, setClientId]= useState<number | undefined>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect(() => {
        const getClients = async () => {
            let clientsResponse;
            let data = {page: currentPage}
            user?.userType === 'super-admin' ? clientsResponse = await clientGetAllPaged(currentPage, headers) : clientsResponse = await getClientsByUserPaged(user?.idUser, data, headers)
            const clientCreateFormResponse = await getCreateForm(headers);

            dispatch(setClients(clientsResponse.clients));
            setTotalPages(clientsResponse.totalPages);
            setClientCreateForm(clientCreateFormResponse);
            setLoading(false);
        }

        getClients();
    }, [dispatch, isDeleted, currentPage]);

    const onDelete = async (id: number | undefined) => {
        setAlertOpen(true);
        setClientId(id);
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await clientDelete(clientId, headers);

            if (isDeleted) {
                setIsDeleted(true);
                setAlertOpen(false);
                setClientId(0);
                setLoading(true);
            }
        } else if(confirm === 'cancel'){
            setAlertOpen(false);
            setClientId(0);
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
                            <Link to={'/clients/add'}>
                                <Button
                                    startIcon={(
                                        <AddIcon />
                                    )}
                                    variant="contained"
                                >
                                    Shto
                                </Button>
                            </Link>
                        </div>

                        <Card sx={{pb: 2}}>
                            <CardHeader
                                title="Klientët"
                            />
                            <TableContainer sx={{ overflowX: 'auto' }}>
                                <Box sx={{minWidth: 800}}>
                                    <Table>
                                        <TableHead sx={{background: '#f8f9fa'}}>
                                            <TableRow>
                                                <TableCell>
                                                    Id
                                                </TableCell>
                                                <TableCell>
                                                    Emri
                                                </TableCell>
                                                <TableCell>
                                                    Mbiemri
                                                </TableCell>
                                                <TableCell>
                                                    Numri i leternjoftimit
                                                </TableCell>
                                                <TableCell>
                                                    Numri i telefonit
                                                </TableCell>
                                                <TableCell>
                                                    Qyteti
                                                </TableCell>
                                                <TableCell>
                                                    Përdoruesi
                                                </TableCell>
                                                <TableCell align="right">

                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {clients.map((client) => {
                                                const city = clientCreateForm?.municipalities.find(municipality => municipality.idMunicipality === client?.idMunicipality?.idMunicipality)
                                                const clientUser = clientCreateForm?.users.find(user => user.idUser === client?.idUser?.idUser);

                                                return (
                                                    <TableRow
                                                        hover
                                                        key={client.idClient}
                                                    >
                                                        <TableCell>
                                                            {client.idClient}
                                                        </TableCell>
                                                        <TableCell>
                                                            {client.firstName}
                                                        </TableCell>
                                                        <TableCell>
                                                            {client.lastName}
                                                        </TableCell>
                                                        <TableCell>
                                                            {client.nationalId}
                                                        </TableCell>
                                                        <TableCell>
                                                            {client.phone}
                                                        </TableCell>
                                                        <TableCell>
                                                            {city?.municipalityName}
                                                        </TableCell>
                                                        <TableCell>
                                                            {`${clientUser?.firstName} ${clientUser?.lastName}`}
                                                        </TableCell>
                                                        <TableCell align="right" sx={{display: 'flex'}}>
                                                            { user?.userType === 'super-admin' &&
                                                                <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.error.dark,
                                                                    backgroundColor: '#ffdad7', fontSize: '13px', borderRadius: '15px' }}
                                                                        onClick={() => onDelete(client.idClient)}>
                                                                    FSHIJ
                                                                </Button>
                                                            }
                                                            <Link to={`/clients/${client.idClient}`}>
                                                                <Button
                                                                        sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.primary.dark,
                                                                        backgroundColor: '#ccddff', fontSize: '13px', borderRadius: '15px' }}>
                                                                    DETAJET
                                                                </Button>
                                                            </Link>
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
                    {alertOpen && <AlertConfirm
                        title={'Jeni duke fshirë klientin'}
                        message={'Jeni i sigurt që dëshironi të fshini klientin?'}
                        isOpen={alertOpen}
                        onClose={onCloseAlert}
                    />}
                </Container>
            </Box>
        </Layout>
    );
}

export default Clients;