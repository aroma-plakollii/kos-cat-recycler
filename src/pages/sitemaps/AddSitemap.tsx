import {Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Unstable_Grid2 as Grid, FormControlLabel, Checkbox } from '@mui/material';
import {ChangeEvent, useState} from "react";
import theme from "../../theme/theme";
import {Link, useNavigate} from "react-router-dom";
import {Layout} from "../layout/Layout";
import {Sitemap} from "../../types/sitemap";
import {sitemapCreate} from "../../api/sitemapService";
import { useHeaders } from '../../hooks/useHeaders';
export const AddSitemap = () => {
    const navigate = useNavigate();
    const [sitemap, setSitemap] = useState<Sitemap>();
    const [error, setError] = useState<boolean>(false);
    const headers = useHeaders();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSitemap({ ...sitemap, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSitemap({ ...sitemap, isMenuItem: e.target.checked });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);

        if (!sitemap?.name || !sitemap?.url){
            setError(true);
            return;
        }

        try{
           const res = await sitemapCreate(sitemap, headers);

            if(res){
                navigate('/sitemaps');
            }
        }catch(error) {
            console.error('Sitemap create failed', error);
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
                            title="Shto Faqen"
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
                                            error={error}
                                            label="Emri i faqes"
                                            name="name"
                                            type='text'
                                            onChange={handleChange}
                                            value={sitemap?.name}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: sitemap?.name ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={error}
                                            label="Url i faqes"
                                            name="url"
                                            onChange={handleChange}
                                            value={sitemap?.url}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: sitemap?.url ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={6}>
                                        <FormControlLabel
                                            control={<Checkbox value={sitemap?.isMenuItem} onChange={handleCheckboxChange} />}
                                            label="Faqja si menu item"
                                            labelPlacement="start"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'right', pt: 2}}>
                            <Link to={`/sitemaps`}>
                                <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600]}, }}>
                                    Anulo
                                </Button>
                            </Link>
                            <Button variant="contained" type="submit">
                                Regjistro
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </Layout>
    )
}