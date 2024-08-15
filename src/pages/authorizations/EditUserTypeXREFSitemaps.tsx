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
import {
    getUpdateForm,
    userTypeXREFSitemapGetSingle, userTypeXREFSitemapUpdate
} from "../../api/userTypeXREFSitemapsService";
import {UserType} from "../../types/userType";
import {Sitemap} from "../../types/sitemap";
import { useHeaders } from '../../hooks/useHeaders';

export const EditUserTypeXREFSitemaps = () => {
    const { userTypeXREFSitemapId } = useParams();
    const navigate = useNavigate();
    const [userTypeXREFSitemap, setUserTypeXREFSitemap] = useState<UserTypeXREFSitemap>();
    const [userTypeXREFSitemapUpdateForm, setUserTypeXREFSitemapUpdateForm] = useState<userTypeXREFSitemapForm>();
    const [error, setError] = useState<boolean>(false);
    const headers = useHeaders();

    useEffect( () => {
        const getUserTypeXREFSitemap = async () => {
            const userTypeXREFSitemap = await userTypeXREFSitemapGetSingle(Number(userTypeXREFSitemapId), headers);
            const userTypeXREFSitemapUpdateFormResponse = await getUpdateForm(headers);

            setUserTypeXREFSitemap(userTypeXREFSitemap)
            setUserTypeXREFSitemapUpdateForm(userTypeXREFSitemapUpdateFormResponse);
        }

        getUserTypeXREFSitemap();
    }, []);

    const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserTypeXREFSitemap({
            ...userTypeXREFSitemap,
            [name]: {
                ...(userTypeXREFSitemap && userTypeXREFSitemap[name as keyof UserTypeXREFSitemap] as Record<string, any> || {}),
                [e.target.name]: value,
            },
        });
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserTypeXREFSitemap({ ...userTypeXREFSitemap, [e.target.name]: e.target.checked });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);

        if (!userTypeXREFSitemap?.idUserType || !userTypeXREFSitemap?.idSitemap){
            setError(false)
            return;
        }

        try{
            const res = await userTypeXREFSitemapUpdate(Number(userTypeXREFSitemapId), userTypeXREFSitemap, headers);

            if(res){
                navigate('/authorizations');
            }
        }catch(error) {
            console.error('UserTypeXREFSitemap update failed', error);
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
                            title="Detajet e Autorizimit"
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
                                            onChange={handleSelectChange}
                                            value={userTypeXREFSitemap?.idUserType?.idUserType || ''}
                                            disabled
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: userTypeXREFSitemap?.idUserType ? true : false,
                                            }}
                                        >
                                            {userTypeXREFSitemapUpdateForm?.userTypes.map((userType: UserType | any) => {
                                                return (
                                                    <MenuItem
                                                        key={userType.idUserType}
                                                        value={userType.idUserType}
                                                    >
                                                        {userType.typeName}
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
                                            error={error}
                                            label="Sitemap"
                                            name="idSitemap"
                                            onChange={handleSelectChange}
                                            value={userTypeXREFSitemap?.idSitemap?.idSitemap || ''}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: userTypeXREFSitemap?.idSitemap ? true : false,
                                            }}
                                        >
                                            {userTypeXREFSitemapUpdateForm?.sitemaps.map((sitemap: Sitemap | any) => {
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
                                            control={<Checkbox name="hasAuthorization" onChange={handleCheckboxChange} />}
                                            label="Ka autorizim"
                                            labelPlacement="start"
                                            checked={userTypeXREFSitemap?.hasAuthorization ? true : false}
                                            sx={{width: '20%', display: 'flex', justifyContent: 'space-between',
                                                '@media screen and (max-width: 992px)': {width: '40%'},
                                                '@media screen and (max-width: 576px)': {width: '95%'}}}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox name="create"  onChange={handleCheckboxChange} />}
                                            label="Krijo"
                                            labelPlacement="start"
                                            checked={userTypeXREFSitemap?.create ? true : false}
                                            sx={{width: '20%', display: 'flex', justifyContent: 'space-between',
                                                '@media screen and (max-width: 992px)': {width: '40%'},
                                                '@media screen and (max-width: 576px)': {width: '95%'}}}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox name="read" onChange={handleCheckboxChange} />}
                                            label="Lexo"
                                            labelPlacement="start"
                                            checked={userTypeXREFSitemap?.read ? true : false}
                                            sx={{width: '20%', display: 'flex', justifyContent: 'space-between',
                                                '@media screen and (max-width: 992px)': {width: '40%'},
                                                '@media screen and (max-width: 576px)': {width: '95%'}}}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox name="update" onChange={handleCheckboxChange} />}
                                            label="Ndrysho"
                                            labelPlacement="start"
                                            checked={userTypeXREFSitemap?.update ? true : false}
                                            sx={{width: '20%', display: 'flex', justifyContent: 'space-between',
                                                '@media screen and (max-width: 992px)': {width: '40%'},
                                                '@media screen and (max-width: 576px)': {width: '95%'}}}
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox name="destroy" checked={userTypeXREFSitemap?.destroy ? true : false} onChange={handleCheckboxChange} />}
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
                            <Link to={`/authorizations`}>
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