import {Layout} from "../layout/Layout";
import { Card,Box, Container, Stack, CardHeader, Table, TableHead, TableRow, TableBody, TableCell, Button, CardActions, TableContainer} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useEffect, useState} from "react";
import theme from "../../theme/theme";
import {sitemapDelete, sitemapGetAll} from "../../api/sitemapService";
import {Sitemap} from "../../types/sitemap";
import {setSitemaps} from "../../features/sitemaps/sitemapSlice";
import { useHeaders } from "../../hooks/useHeaders";

const Sitemaps = () => {
    const dispatch = useDispatch();
    const sitemaps = useSelector((state: RootState) => state.sitemaps)
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const headers = useHeaders();

    useEffect(() => {
        const getSitemaps = async () => {
            const sitemapResponse: any = await sitemapGetAll(headers);

            if(sitemapResponse)
                dispatch(setSitemaps(sitemapResponse.sitemap as Sitemap[]));
        }

        getSitemaps();
    }, [dispatch, isDeleted]);

    const onDelete = async (id: number | undefined) => {
        const isDeleted = await sitemapDelete(id, headers);

        if (isDeleted){
            setIsDeleted(true);
        }
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
                        <div>
                            <Link to={'/sitemaps/add'}>
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
                                title="Faqet"
                            />
                            <TableContainer sx={{ overflowX: 'auto' }}>
                                <Box sx={{minWidth: 800}}>
                                    <Table>
                                        <TableHead sx={{background: '#f8f9fa'}}>
                                            <TableRow>
                                                <TableCell>
                                                </TableCell>
                                                <TableCell>
                                                    Emri
                                                </TableCell>
                                                <TableCell>
                                                    Url
                                                </TableCell>
                                                <TableCell />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {sitemaps.map((sitemap) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                    >
                                                        <TableCell>
                                                            <Link to={`${sitemap.url}`}>
                                                                <OpenInNewIcon sx={{color: 'black'}} />
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell>
                                                            {sitemap.name}
                                                        </TableCell>
                                                        <TableCell>
                                                            {sitemap.url}
                                                        </TableCell>
                                                        <TableCell align="right" sx={{display: 'flex'}}>
                                                            <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.error.dark,
                                                                    backgroundColor: '#ffdad7', fontSize: '13px', borderRadius: '15px' }}
                                                                    onClick={() => onDelete(sitemap.idSitemap)}>
                                                                FSHIJ
                                                            </Button>
                                                            <Link to={`/sitemaps/${sitemap.idSitemap}`}>
                                                                <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.primary.dark,
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
                            <CardActions />
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
}

export default Sitemaps;