import {Box, Button, Container, Stack} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useHeaders} from "../../hooks/useHeaders";
import {Layout} from "../layout/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Client} from "../../types/client";
import {clientGetSingle} from "../../api/clientService";
import {Sale} from "../../types/sale";
import {SaleForm} from "../../types/saleForm";
import {getCreateForm, saleGetByClient, saleGetByClientPaged} from "../../api/saleService";
import {SalesByClientTable} from "./SalesByClientTable";

interface SalesByClientProps {
    sales: Sale[] | undefined;
    saleCreateForm: SaleForm | undefined;
}

export const SalesbyClient = () => {
    const dispatch = useDispatch();
    const { clientId } = useParams();
    const [sales, setSales] = useState<Sale[]>();
    const [saleCreateForm, setSaleCreateForm] = useState<SaleForm>();
    const [client, setClient] = useState<Client>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const headers = useHeaders();

    useEffect(() => {
        const getSales = async () => {
            let data = {page: currentPage}
            const salesResponse: any = await saleGetByClientPaged(Number(clientId), data, headers);
            const clientResponse: any = await clientGetSingle(Number(clientId), headers);
            const saleCreateFormResponse = await getCreateForm(headers);

            setSales(salesResponse.sales);
            setTotalPages(salesResponse.totalPages);
            setClient(clientResponse);
            setSaleCreateForm(saleCreateFormResponse);
        }

        getSales();
    }, [dispatch, currentPage]);

    return (
        <Layout>
            <Box sx={{width: "100%", mt: 4}}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 8
                    }}
                >
                    <Container maxWidth="xl">
                        <div>
                            <Link to={`/clients/${clientId}`}>
                                <Button sx={{border: 'none', color: 'black', fontSize: '15px', mb: 2}}>
                                    <ArrowBackIcon sx={{mr: 1}}/> Kthehu
                                </Button>
                            </Link>
                        </div>
                        <Stack spacing={3}>
                            <SalesByClientTable
                                sales={sales}
                                saleCreateForm={saleCreateForm}
                                client={client}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}/>
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </Layout>
    );
}