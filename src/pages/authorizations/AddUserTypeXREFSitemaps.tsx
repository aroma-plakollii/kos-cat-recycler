import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid,
    MenuItem,
    FormControlLabel, Checkbox
} from '@mui/material';
import {Layout} from "../layout/Layout";
import {Link, useNavigate, useParams} from "react-router-dom";
import theme from "../../theme/theme";
import {ChangeEvent, useEffect, useState} from "react";
import {UserTypeXREFSitemap} from "../../types/userTypeXREPSitemap";
import {userTypeXREFSitemapForm} from "../../types/userTypeXREFSitemapForm";
import {getCreateForm, userTypeXREFSitemapCreate} from "../../api/userTypeXREFSitemapsService";
import {UserType} from "../../types/userType";
import {Sitemap} from "../../types/sitemap";
import {userTypeGetSingle} from "../../api/userTypeService";
import { useHeaders } from '../../hooks/useHeaders';

export const AddUserTypeXREFSitemaps = () => {
    const navigate = useNavigate();
    const { userTypeId } = useParams();
    const [userTypeXREFSitemap, setUserTypeXREFSitemap] = useState<UserTypeXREFSitemap>();
    const [userTypeXREFSitemapCreateForm, setUserTypeXREFSitemapCreateForm] = useState<userTypeXREFSitemapForm>();
    const [userType, setUserType] = useState<UserType>();
    const [error, setError] = useState<boolean>(false);
    const headers = useHeaders()

    useEffect( () => {
        const getUserTypeXREFSitemapCreateForm = async () => {
            const userTypeXREFSitemapCreateFormResponse = await getCreateForm(headers);
            const userTypeResponse = await userTypeGetSingle(Number(userTypeId), headers)

            setUserType(userTypeResponse);
            setUserTypeXREFSitemap({...userTypeXREFSitemap, idUserType: userTypeResponse});
            setUserTypeXREFSitemapCreateForm(userTypeXREFSitemapCreateFormResponse);
        }

        getUserTypeXREFSitemapCreateForm();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserTypeXREFSitemap({ ...userTypeXREFSitemap, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserTypeXREFSitemap({ ...userTypeXREFSitemap, [e.target.name]: e.target.checked });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false)

        if (!userTypeXREFSitemap?.idUserType || !userTypeXREFSitemap?.idSitemap){
            setError(false)
            return;
        }

        try{
            const res = await userTypeXREFSitemapCreate(userTypeXREFSitemap, headers);

            if(res){
                navigate(`/authorizations/type/${userTypeId}`);
            }
        }catch(error) {
            console.error('UserTypeXREFSitemap create failed', error);
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
                            title="Shto Autorizimin"
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
                                            select
                                            error={error}
                                            label="Lloji i përdoruesit"
                                            name="idUserType"
                                            disabled
                                            value={userType?.idUserType || ''}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: userType?.idUserType ? true : false,
                                            }}
                                        >
                                            <MenuItem
                                                key={userType?.idUserType}
                                                value={userType?.idUserType}
                                            >
                                                {userType?.typeName}
                                            </MenuItem >
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            select
                                            error={error}
                                            label="Sitemap"
                                            name="idSitemap"
                                            onChange={handleChange}
                                            value={userTypeXREFSitemap?.idSitemap}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: userTypeXREFSitemap?.idSitemap ? true : false,
                                            }}
                                        >
                                            {userTypeXREFSitemapCreateForm?.sitemaps.map((sitemap: Sitemap | any) => {
                                                return (
                                                    <MenuItem
                                                        key={sitemap.idSitemap}
                                                        value={sitemap.idSitemap}
                                                    >
                                                        {sitemap.url}
                                                    </MenuItem >
                                                )
                                            })}
                                        </TextField>
                                    </Grid>
                                    <Grid xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox name="hasAuthorization" checked={userTypeXREFSitemap?.hasAuthorization} onChange={handleCheckboxChange} />}
                                            label="Ka autorizim"
                                            labelPlacement="start"
                                            sx={{width: '20%', display: 'flex', justifyContent: 'space-between',
                                                '@media screen and (max-width: 992px)': {width: '40%'},
                                                '@media screen and (max-width: 576px)': {width: '95%'}}}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox name="create" checked={userTypeXREFSitemap?.create} onChange={handleCheckboxChange} />}
                                            label="Krijo"
                                            labelPlacement="start"
                                            sx={{width: '20%', display: 'flex', justifyContent: 'space-between',
                                                '@media screen and (max-width: 992px)': {width: '40%'},
                                                '@media screen and (max-width: 576px)': {width: '95%'}}}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox name="read" checked={userTypeXREFSitemap?.read} onChange={handleCheckboxChange} />}
                                            label="Lexo"
                                            labelPlacement="start"
                                            sx={{width: '20%', display: 'flex', justifyContent: 'space-between',
                                                '@media screen and (max-width: 992px)': {width: '40%'},
                                                '@media screen and (max-width: 576px)': {width: '95%'}}}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox name="update" checked={userTypeXREFSitemap?.update} onChange={handleCheckboxChange} />}
                                            label="Ndrysho"
                                            labelPlacement="start"
                                            sx={{width: '20%', display: 'flex', justifyContent: 'space-between',
                                                '@media screen and (max-width: 992px)': {width: '40%'},
                                                '@media screen and (max-width: 576px)': {width: '95%'}}}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox name="destroy" checked={userTypeXREFSitemap?.destroy} onChange={handleCheckboxChange} />}
                                            label="Fshij"
                                            labelPlacement="start"
                                            sx={{width: '20%', display: 'flex', justifyContent: 'space-between',
                                                '@media screen and (max-width: 992px)': {width: '40%'},
                                                '@media screen and (max-width: 576px)': {width: '95%'}}}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'right', pt: 2}}>
                            <Link to={`/authorizations/type/${userTypeId}`}>
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