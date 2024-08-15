import {Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, FormControl, Unstable_Grid2 as Grid, MenuItem } from '@mui/material';
import {Layout} from "../layout/Layout";
import {Link, useNavigate, useParams} from "react-router-dom";
import theme from "../../theme/theme";
import {ChangeEvent, useEffect, useState} from "react";
import {Client} from "../../types/client";
import {ClientForm} from "../../types/clientForm";
import {clientGetSingle, clientUpdate, getUpdateForm} from "../../api/clientService";
import {Country} from "../../types/country";
import {Municipality} from "../../types/municipality";
import { useHeaders } from '../../hooks/useHeaders';
import {User} from "../../types/user";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {OrderByClientTable} from "../orders/OrderByClientTable";
import {Order} from "../../types/order";
import {getOrdersByClient, getOrdersByClientPaged, getOrdersByUserPaged} from "../../api/orderService";
import {Auth} from "../../types/auth";
import Pagination from "@mui/material/Pagination";
import {SkeletonTableWithButton} from "../shared/SkeletonTableWithButton";
import {SkeletonDetails} from "../shared/SkeletonDetails";

export const EditClient = () => {
    const { clientId } = useParams();
    const storedData = sessionStorage.getItem('auth');
    const sessionAuthData: Auth = storedData ? JSON.parse(storedData) : null;
    const user = sessionAuthData ? sessionAuthData.user : null;
    const navigate = useNavigate();
    const [client, setClient] = useState<Client>();
    const [orders, setOrders] = useState<Order[]>();
    const [clientUpdateForm, setClientUpdateForm] = useState<ClientForm>();
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        phone: false,
        nationalId:false,
        idCountry: false,
        idMunicipality: false
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [deletionUpdate, setDeletionUpdate] = useState<boolean>(false);
    const headers = useHeaders();
    const [loading, setLoading] = useState<boolean>(true);
    const defaultProps = {
        options: clientUpdateForm?.municipalities || [],
        getOptionLabel: (option: Municipality) => `${option.municipalityName}`,
    };

    useEffect(() => {
        const getClient = async () =>{
            const client = await clientGetSingle(Number(clientId), headers);
            let data = {page: currentPage}
            const orderResponse = await getOrdersByClientPaged(Number(clientId), data, headers);
            const clientUpdateFormResponse = await getUpdateForm(headers);

            setClient(client);
            setOrders(orderResponse.orders);
            setTotalPages(orderResponse.totalPages)
            setClientUpdateForm(clientUpdateFormResponse);
            setLoading(false);
        }

        getClient();
    }, [deletionUpdate, currentPage]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setClient({ ...client, [e.target.name]: e.target.value });
        setErrors({
            ...errors,
            [e.target.name]: e.target.value ? false : true
        });
    };

    const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setClient({
            ...client,
            [name]: {
                ...(client && client[name as keyof Client] as Record<string, any> || {}),
                [e.target.name]: value,
            },
        });
        setErrors({
            ...errors,
            [e.target.name]: e.target.value ? false : true
        });
    };

    const updateDeletion = () => {
        setDeletionUpdate(true);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!client?.firstName || !client?.lastName || !client?.phone
            || !client?.idCountry || !client?.idMunicipality){
            setErrors({
                firstName: !client?.firstName ? true : false,
                lastName: !client?.lastName ? true : false,
                phone: !client?.phone ? true : false,
                nationalId: !client?.nationalId ? true : false,
                idCountry: !client?.idCountry ? true : false,
                idMunicipality: !client?.idMunicipality ? true : false,
            });
            setLoading(false);
            return;
        }

        try{
            const res = await clientUpdate(Number(clientId), client, headers);
            if(res){
                setLoading(false);
                navigate('/clients');
            }
        }catch(error) {
            console.error('Client update failed', error);
        }
    }

    if(loading){
        return (
            <SkeletonDetails />
        )
    }

    return (
        <Layout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    width: '70%',
                    margin: 'auto',
                    '@media screen and (max-width: 576px)': {width: '90%'}
                }}
            >
                <form
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Card sx={{pb: 2}}>
                        <CardHeader
                            title="Detajet e Klientit"
                        />
                        <CardContent sx={{pt: 0}}>
                            <Box sx={{m: -1.5}}>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.firstName}
                                            label="Emri"
                                            name="firstName"
                                            type='text'
                                            onChange={handleChange}
                                            value={client?.firstName}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.firstName ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.lastName}
                                            label="Mbiemri"
                                            name="lastName"
                                            onChange={handleChange}
                                            value={client?.lastName}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.lastName ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.phone}
                                            label="Numri i telefonit"
                                            name="phone"
                                            onChange={handleChange}
                                            value={client?.phone}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.phone ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.nationalId}
                                            label="Numri i leternjoftimit"
                                            name="nationalId"
                                            onChange={handleChange}
                                            value={client?.nationalId}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.nationalId ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    {/*<Grid*/}
                                    {/*    xs={12}*/}
                                    {/*    md={6}*/}
                                    {/*>*/}
                                    {/*    <TextField*/}
                                    {/*        fullWidth*/}
                                    {/*        // error={error}*/}
                                    {/*        label="Nënshkrimi dixhital"*/}
                                    {/*        name="digitalSignature"*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        value={client?.digitalSignature}*/}
                                    {/*        variant="outlined"*/}
                                    {/*        InputLabelProps={{*/}
                                    {/*            shrink: client?.digitalSignature ? true : false,*/}
                                    {/*        }}*/}
                                    {/*    />*/}
                                    {/*</Grid>*/}
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            select
                                            error={errors.idCountry}
                                            label="Shteti"
                                            name="idCountry"
                                            onChange={handleSelectChange}
                                            value={client?.idCountry?.idCountry || ''}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.idCountry?.idCountry ? true : false,
                                            }}
                                        >

                                            {clientUpdateForm?.countries.map((country: Country | any) => {
                                                return (
                                                    <MenuItem
                                                        key={country.idCountry}
                                                        value={country.idCountry}
                                                    >
                                                        {country.countryName}
                                                    </MenuItem >
                                                )
                                            })}
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            select
                                            error={errors.idMunicipality}
                                            label="Komuna"
                                            name="idMunicipality"
                                            onChange={handleSelectChange}
                                            value={client?.idMunicipality?.idMunicipality || ''}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.idMunicipality?.idMunicipality ? true : false,
                                            }}
                                        >

                                            {clientUpdateForm?.municipalities.map((municipality: Municipality | any) => {
                                                return (
                                                    <MenuItem
                                                        key={municipality.idMunicipality}
                                                        value={municipality.idMunicipality}
                                                    >
                                                        {municipality.municipalityName}
                                                    </MenuItem >
                                                )
                                            })}
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'right', pt: 2}}>
                            <Link to={`/clients`}>
                                <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600]}, }}>
                                    Anulo
                                </Button>
                            </Link>
                            { user?.userType === 'super-admin' &&
                                <Button variant="contained" type="submit">
                                    Ruaj ndryshimet
                                </Button>
                            }
                        </CardActions>
                    </Card>
                </form>

                <OrderByClientTable
                    updateDeletion={updateDeletion}
                    clientId={clientId}
                    orders={orders}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}/>
            </Box>
        </Layout>
    )
}