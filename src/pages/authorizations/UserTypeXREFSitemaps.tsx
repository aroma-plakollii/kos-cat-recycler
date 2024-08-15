import {Layout} from "../layout/Layout";
import {
    Card,
    Box,
    Container,
    Stack,
    CardHeader,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Button,
    CardActions,
    TableContainer,
    Typography
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useEffect, useState} from "react";
import theme from "../../theme/theme";
import {userTypeXREFSitemapForm} from "../../types/userTypeXREFSitemapForm";
import {
    getCreateForm, getUserTypeXREFSitemapByUserType,
    userTypeXREFSitemapDelete,
} from "../../api/userTypeXREFSitemapsService";
import {setUserTypeXREFSitemaps} from "../../features/userTypeXREFSitemaps/userTypeXREFSitemapSlice";
import {UserType} from "../../types/userType";
import {userTypeGetSingle} from "../../api/userTypeService";
import { useHeaders } from "../../hooks/useHeaders";

const UserTypeXREFSitemaps = () => {
    const dispatch = useDispatch();
    const { userTypeId } = useParams();
    const userTypeXREFSitemaps = useSelector((state: RootState) => state.userTypeXREFSitemaps)
    const [userTypeXREFSitemapCreateForm, setUserTypeXREFSitemapCreateForm] = useState<userTypeXREFSitemapForm>();
    const [userType, setUserType] = useState<UserType>();
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const headers = useHeaders();

    useEffect(() => {
        const getUserTypeXREFSitemap = async () => {
            const userTypeXREFSitemapResponse = await getUserTypeXREFSitemapByUserType(Number(userTypeId), headers);
            const userTypeXREFSitemapCreateFormResponse = await getCreateForm(headers);
            const userType = await userTypeGetSingle(Number(userTypeId), headers);

            setUserType(userType);
            dispatch(setUserTypeXREFSitemaps(userTypeXREFSitemapResponse));
            setUserTypeXREFSitemapCreateForm(userTypeXREFSitemapCreateFormResponse);
        }

        getUserTypeXREFSitemap();
    }, [dispatch, isDeleted]);

    const onDelete = async (id: number | undefined) => {
        const isDeleted = await userTypeXREFSitemapDelete(id, headers);

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
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={2}
                                sx={{
                                    backgroundColor: '#def0ff75',
                                    boxShadow:' rgba(149, 157, 165, 0.2) 0px 8px 15px',
                                    borderRadius: 2.5,
                                    px: 3,
                                    py: 4,
                                }}
                            >
                                <Box
                                    sx={{
                                        flexShrink: 0,
                                        height: 48,
                                        width: 48,
                                    }}
                                >
                                    <PersonIcon sx={{fontSize: '50px', color: theme.palette.primary.dark}}/>
                                </Box>
                                <div>
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        Lloji i Përdoruesit
                                    </Typography>
                                    <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>{userType?.typeName}</Typography>
                                </div>
                            </Stack>
                            <Link to={`/authorizations/add/${userTypeId}`}>
                                <Button
                                    startIcon={(
                                        <AddIcon />
                                    )}
                                    variant="contained"
                                >
                                    Shto
                                </Button>
                            </Link>
                        </Box>

                        <Card sx={{pb: 2}}>
                            <CardHeader
                                title="Autorizimet"
                            />
                            <TableContainer sx={{ overflowX: 'auto' }}>
                                <Box sx={{minWidth: 800}}>
                                    {userTypeXREFSitemaps.length === 0 ? <Typography sx={{fontSize: '18px', margin: '1rem 1.5rem'}}>Nuk ka asnjë sitemap në dispozicion</Typography> :(
                                        <Table>
                                            <TableHead sx={{background: '#f8f9fa'}}>
                                                <TableRow>
                                                    <TableCell>
                                                        Id
                                                    </TableCell>
                                                    <TableCell>
                                                        Sitemap
                                                    </TableCell>
                                                    <TableCell>
                                                        Ka autorizim
                                                    </TableCell>
                                                    <TableCell>
                                                        Krijo
                                                    </TableCell>
                                                    <TableCell>
                                                        Lexo
                                                    </TableCell>
                                                    <TableCell>
                                                        Ndrysho
                                                    </TableCell>
                                                    <TableCell>
                                                        Fshij
                                                    </TableCell>
                                                    <TableCell />
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {userTypeXREFSitemaps.map((userTypeXREFSitemap) => {
                                                    const sitemap = userTypeXREFSitemapCreateForm?.sitemaps.find((sitemap)=> sitemap.idSitemap === userTypeXREFSitemap.idSitemap?.idSitemap);

                                                    return (
                                                        <TableRow
                                                            hover
                                                        >
                                                            <TableCell>
                                                                {userType?.idUserType}
                                                            </TableCell>
                                                            <TableCell>
                                                                {sitemap?.url}
                                                            </TableCell>
                                                            <TableCell>
                                                                {userTypeXREFSitemap?.hasAuthorization ? (
                                                                    <CircleIcon style={{ color: 'green' }} />
                                                                ) : (
                                                                    <CircleIcon style={{ color: 'red' }} />
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {userTypeXREFSitemap?.create ? (
                                                                    <CircleIcon style={{ color: 'green' }} />
                                                                ) : (
                                                                    <CircleIcon style={{ color: 'red' }} />
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {userTypeXREFSitemap?.read ? (
                                                                    <CircleIcon style={{ color: 'green' }} />
                                                                ) : (
                                                                    <CircleIcon style={{ color: 'red' }} />
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {userTypeXREFSitemap?.update ? (
                                                                    <CircleIcon style={{ color: 'green' }} />
                                                                ) : (
                                                                    <CircleIcon style={{ color: 'red' }} />
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                {userTypeXREFSitemap?.destroy ? (
                                                                    <CircleIcon style={{ color: 'green' }} />
                                                                ) : (
                                                                    <CircleIcon style={{ color: 'red' }} />
                                                                )}
                                                            </TableCell>
                                                            <TableCell align="right" sx={{display: 'flex'}}>
                                                                <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.error.dark,
                                                                    backgroundColor: '#ffdad7', fontSize: '13px', borderRadius: '15px' }}
                                                                        onClick={() => onDelete(userTypeXREFSitemap?.idUserTypeXREFSitemap)}>
                                                                    FSHIJ
                                                                </Button>
                                                                <Link to={`/authorizations/${userTypeXREFSitemap?.idUserTypeXREFSitemap}`}>
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
                                    )}
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

export default UserTypeXREFSitemaps;