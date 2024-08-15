import {
    Box,
    Button,
    Container,
    Stack,
    Divider,
    Typography,
    Card,
    SvgIcon
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalPrintshop from '@mui/icons-material/LocalPrintshop';
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Layout} from "../../layout/Layout";
import {useGlobalData} from "../../../hooks/useGlobalData";
import { useHeaders } from '../../../hooks/useHeaders';
import {Sale} from "../../../types/sale";
import {saleGetSingle} from "../../../api/saleService";
import {SaleReceiptContent} from "./SaleReceiptContent";
export const SaleReceipt = () => {
    const { saleId } = useParams();
    const [sale, setSale] = useState<Sale>();
    const globalData = useGlobalData();
    const headers = useHeaders();

    useEffect( () => {
        const getSale = async () => {
            const saleResponse = await saleGetSingle(Number(saleId), headers);

            setSale(saleResponse);
        }

        getSale();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <Layout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    mb:8
                }}
            >
                <Container maxWidth="lg">
                    <Stack
                        divider={<Divider />}
                        spacing={4}
                    >
                        <Stack spacing={4}>
                            <Stack
                                alignItems="center"
                                direction="row"
                                justifyContent="space-between"
                                spacing={4}
                            >
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <Link to={`/sales`}>
                                        <Button sx={{border: 'none', color: 'black', fontSize: '15px'}}>
                                            <ArrowBackIcon sx={{mr: 1}}/> Kthehu
                                        </Button>
                                    </Link>
                                </Stack>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                >
                                    {/*<Link to={`/invoices/${clientInvoice?.idClientInvoice}`}>*/}
                                    {/*    <Button*/}
                                    {/*        sx={{*/}
                                    {/*            mr: '0.5rem',*/}
                                    {/*            padding: '8px 17px !important',*/}
                                    {/*            color: '#f0d000',*/}
                                    {/*            backgroundColor: '#fff4d6',*/}
                                    {/*            fontSize: '13px',*/}
                                    {/*            borderRadius: '10px'*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        Detajet e faturës*/}
                                    {/*    </Button>*/}
                                    {/*</Link>*/}
                                    <Button
                                        sx={{
                                            mr: '0.5rem',
                                            padding: '8px 17px !important',
                                            color: 'black',
                                            backgroundColor: '#dddddd',
                                            fontSize: '13px',
                                            borderRadius: '10px'
                                        }}
                                        onClick={handlePrint}
                                    >
                                        <SvgIcon>
                                            <LocalPrintshop sx={{color: 'text.secondary'}} />
                                        </SvgIcon>
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Card sx={{ px: 6, height: '63rem', overflowX: 'auto', pt: 3}} >
                            <SaleReceiptContent id="printContent" sale={sale} global={globalData}/>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    )
}