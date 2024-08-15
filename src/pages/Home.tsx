import {Layout} from "./layout/Layout";
import {
    Card,
    TableContainer,
    Box,
    Container,
    Stack,
    Typography,
    CardHeader,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Button,
    CardActions,
    TextField, TableHead
} from '@mui/material';
import {Link} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import theme from "../theme/theme";
import {useEffect, useState} from "react";
import {clientGetAll, getClientsByUser, getCreateForm, searchClients, searchClientsByUser} from "../api/clientService";
import {Client} from "../types/client";
import { useHeaders } from "../hooks/useHeaders";
import {ClientForm} from "../types/clientForm";
import {setClients} from "../features/clients/clientSlice";
import {Auth} from "../types/auth";
import {SkeletonTable} from "./shared/SkeletonTable";
import {SkeletonHomeTable} from "./shared/SkeletonHomeTable";

const Home = () => {
    const storedData = sessionStorage.getItem('auth');
    const sessionAuthData: Auth = storedData ? JSON.parse(storedData) : null;
    const user = sessionAuthData ? sessionAuthData.user : null;
    const [searchTerm, setSearchTerm] = useState<string | number>('');
    const [clients, setClients] = useState<Client[]>([]);
    const [clientCreateForm, setClientCreateForm] = useState<ClientForm>();
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const headers = useHeaders();

    useEffect(() => {
        const getClients = async () => {
            const clientCreateFormResponse = await getCreateForm(headers);

            setClientCreateForm(clientCreateFormResponse);
        }

        getClients();
    }, []);

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const getClients = async (term: string | number) => {
        let res;
        user?.userType === 'super-admin' ? res = await searchClients(term, headers) : res = await searchClientsByUser(term, user?.idUser, headers)
        // const res = await searchClients(term, headers) as Client[];
        setClients(res);
        setLoading(false);
    }

    const handleButtonClick = () => {
        setLoading(true);
        setHasSearched(true);
        getClients(searchTerm);
    };

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
                        <Card sx={{ 
                            py: 4, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            border: "1px solid #b4b4b4" 
                            }}>
                            <Stack
                                width="90%"
                                direction="row"
                                flexWrap="wrap"
                                gap={2}
                            >
                                <Box sx={{ flexGrow: 1 }}>
                                    <TextField
                                        defaultValue=""
                                        onChange={handleSearchChange}
                                        fullWidth
                                        label="Kërko klientin"
                                        name="query"
                                    />
                                </Box>
                                <Button
                                    // size="large"
                                    onClick={handleButtonClick}
                                    variant="contained"
                                    sx={{width: '15%', '@media screen and (max-width: 768px)': {width: '25%'},
                                        '@media screen and (max-width: 576px)': {width: '4%'}}}
                                >
                                    <SearchIcon /> <Typography sx={{fontSize: '15px', ml: 1, '@media screen and (max-width: 576px)': {display: 'none'}}}>Kërko</Typography>
                                </Button>
                            </Stack>
                            <Box sx={{width: '90%', mt: 3}} display={"flex"} justifyContent={"space-between"}>
                                {
                                    clients.length > 0 &&
                                    <Typography color="text.secondary" variant="body1">{`Janë gjetur ${clients.length} klient`}</Typography>
                                }
                                <Typography
                                    color="text.secondary"
                                    variant="body1"
                                    sx={{textDecoration: 'underline'}}
                                >
                                    <Link to={'/clients/add'}><Typography display='inline' sx={{textDecoration: 'underline', color: theme.palette.grey["900"], cursor: 'pointer'}}>Krijo klient të ri new</Typography></Link>
                                </Typography>
                            </Box>
                            <CardActions />
                        </Card>
                        {loading ? (
                            <SkeletonHomeTable />
                        ) : clients.length > 0 ? (
                            <Card sx={{ pb: 2 }}>
                                <CardHeader title="Klientet" />
                                <TableContainer sx={{ overflowX: 'auto' }}>
                                    <Box sx={{ minWidth: 800 }}>
                                        <Table>
                                            <TableHead sx={{ background: '#f8f9fa' }}>
                                                <TableRow>
                                                    <TableCell>
                                                        Id
                                                    </TableCell>
                                                    <TableCell>
                                                        Emri
                                                    </TableCell>
                                                    <TableCell>
                                                        Numri i leternjoftimit
                                                    </TableCell>
                                                    <TableCell>
                                                        Përdoruesi
                                                    </TableCell>
                                                    <TableCell align="right"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {clients.map((client) => {
                                                    const clientUser = clientCreateForm?.users.find(user => user.idUser === client?.idUser?.idUser);
                                                    return (
                                                        <TableRow hover key={client.idClient}>
                                                            <TableCell sx={{ mt: 1 }}>
                                                                {client.idClient}
                                                            </TableCell>
                                                            <TableCell sx={{ mt: 1 }}>
                                                                {`${client?.firstName} ${client?.lastName}`}
                                                            </TableCell>
                                                            <TableCell sx={{ mt: 1 }}>
                                                                {client.nationalId}
                                                            </TableCell>
                                                            <TableCell>
                                                                {`${clientUser?.firstName} ${clientUser?.lastName}`}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Link to={`/clients/${client.idClient}`}>
                                                                    <Button variant="contained">Blerjet</Button>
                                                                </Link>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </TableContainer>
                                <CardActions />
                            </Card>
                        ) : (
                            hasSearched ? (
                                <Card sx={{ p: 4 }}>
                                    <Typography>Nuk është gjetur asnjë klient</Typography>
                                </Card>
                            ) : null
                        )}
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
}

export default Home;