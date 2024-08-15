import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    FormControl,
    Unstable_Grid2 as Grid,
    MenuItem,
    Autocomplete, Typography
} from '@mui/material';
import { AutocompleteChangeDetails } from '@mui/material/Autocomplete';
import {Layout} from "../layout/Layout";
import {Link, useNavigate} from "react-router-dom";
import theme from "../../theme/theme";
import {ChangeEvent, useEffect, useState} from "react";
import {Client} from "../../types/client";
import {ClientForm} from "../../types/clientForm";
import {clientCreate, getCreateForm} from "../../api/clientService";
import {Municipality} from "../../types/municipality";
import { useHeaders } from '../../hooks/useHeaders';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Auth} from "../../types/auth";

export const AddClient = () => {
    const navigate = useNavigate();
    const storedData = sessionStorage.getItem('auth');
    const sessionAuthData = storedData ? JSON.parse(storedData) : null;
    const user = sessionAuthData ? sessionAuthData.user : null;
    const [client, setClient] = useState<Client>();
    const [clientCreateForm, setClientCreateForm] = useState<ClientForm>();
    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        phone: false,
        nationalId:false,
        idCountry: false,
        idMunicipality: false,
        errorMessage: ''
    });
    const headers = useHeaders();
    const defaultProps = {
        options: clientCreateForm?.municipalities || [],
        // options: clientCreateForm?.municipalities.map((option: any) => option.municipalityName),
        getOptionLabel: (option: Municipality) => `${option.municipalityName}`,
    };

    useEffect( () => {
        const getClientCreateForm = async () => {
            const clientCreateFormResponse = await getCreateForm(headers);
            setClientCreateForm(clientCreateFormResponse);

            if (clientCreateFormResponse?.countries?.length > 0) {
                setClient(prevClient => ({
                    ...prevClient,
                    idCountry: clientCreateFormResponse.countries[0],
                    idUser: user
                }));
            }
        }

        getClientCreateForm();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setClient({ ...client, [e.target.name]: e.target.value });
        setErrors({
            ...errors,
            [e.target.name]: e.target.value ? false : true,
            errorMessage: e.target.value && ''
        });
    };

    const handleAutoCompleteChange = (
        event: React.SyntheticEvent<Element, Event>,
        value: Municipality | null,
    ) => {
        if (value !== null) {
            setClient({ ...client, idMunicipality: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!client?.firstName || !client?.lastName || !client?.phone
            || !client?.idCountry || !client?.idMunicipality){
            setErrors({
                ...errors,
                firstName: !client?.firstName ? true : false,
                lastName: !client?.lastName ? true : false,
                phone: !client?.phone ? true : false,
                nationalId: !client?.nationalId ? true : false,
                idCountry: !client?.idCountry ? true : false,
                idMunicipality: !client?.idMunicipality ? true : false,
            });
            return;
        }

        try{
            const res = await clientCreate(client, headers);

            if(res.status === 409){
                setErrors({
                    ...errors,
                    nationalId: true,
                    errorMessage: "Ekziston një klient me të njëjtin numër të leternjoftimit"
                });
                return;
            }
            if(res){
                navigate('/clients');
            }
        }catch(error: any) {
            console.error('Client create failed', error);
        }
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
                            title="Shto Klientin"
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
                                            error={errors.nationalId}
                                            fullWidth
                                            label="Numri i leternjoftimit"
                                            name="nationalId"
                                            onChange={handleChange}
                                            value={client?.nationalId}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.nationalId ? true : false,
                                            }}
                                        />
                                        {errors.errorMessage && <Typography sx={{color: 'red', fontSize: '12px', pt: 1}}>{errors.errorMessage}</Typography>}
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
                                            value={client?.idCountry?.idCountry || ''}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.idCountry?.idCountry  ? true : false,
                                            }}
                                        >
                                            <MenuItem
                                                key={clientCreateForm?.countries[0].idCountry}
                                                value={clientCreateForm?.countries[0].idCountry}
                                            >
                                                {clientCreateForm?.countries[0].countryName}
                                            </MenuItem >
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <Autocomplete
                                            {...defaultProps}
                                            id="clear-on-escape"
                                            onChange={handleAutoCompleteChange}
                                            value={client?.idMunicipality}
                                            // defaultValue={client?.idMunicipality?.idMunicipality}
                                            clearOnEscape
                                            inputValue={client?.idMunicipality?.municipalityName}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Komuna" variant="standard"
                                                           sx={{ height: '60px','& .MuiInputLabel-root': { lineHeight: '14px'}}}
                                                />
                                            )}
                                            sx={{width: '100%', mr: '15px',
                                                '& .MuiInputBase-root': {height: '39px', borderBottom: errors.idMunicipality ? '2px solid red' : 'none'}}}
                                        />
                                    </Grid>
                                    {/*<Grid*/}
                                    {/*    xs={12}*/}
                                    {/*    md={6}*/}
                                    {/*>*/}
                                    {/*    <TextField*/}
                                    {/*        fullWidth*/}
                                    {/*        select*/}
                                    {/*        // error={error}*/}
                                    {/*        label="Përdoruesi"*/}
                                    {/*        name="idUser"*/}
                                    {/*        onChange={handleChange}*/}
                                    {/*        value={client?.idUser?.idUser || ''}*/}
                                    {/*        variant="outlined"*/}
                                    {/*        InputLabelProps={{*/}
                                    {/*            shrink: client?.idUser?.idUser ? true : false,*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        {clientCreateForm?.users*/}
                                    {/*            .filter((userItem: User | any) => userItem.idUser === user?.idUser)*/}
                                    {/*            .map((userItem: User | any) => (*/}
                                    {/*                <MenuItem key={userItem.idUser} value={userItem.idUser}>*/}
                                    {/*                    {`${userItem.firstName} ${userItem.lastName}`}*/}
                                    {/*                </MenuItem>*/}
                                    {/*            ))}*/}
                                    {/*    </TextField>*/}
                                    {/*</Grid>*/}
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
                            <Button variant="contained" type="submit">
                                Ruaj
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </Layout>
    )
}