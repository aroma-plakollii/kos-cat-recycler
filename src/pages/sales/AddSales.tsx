import {Link, useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {useHeaders} from "../../hooks/useHeaders";
import dayjs from "dayjs";
import {clientGetSingle} from "../../api/clientService";
import {Layout} from "../layout/Layout";
import {
    Box, Button,
    Card, CardActions,
    CardContent,
    CardHeader, Divider,
    FormControl,
    MenuItem, TableCell,
    TextField,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {DateTimePicker} from "@mui/x-date-pickers";
import theme from "../../theme/theme";
import {Sale} from "../../types/sale";
import {SaleForm} from "../../types/saleForm";
import {saleCreate} from "../../api/saleService";

export const AddSale = () => {
    const navigate = useNavigate();
    const [sale, setSale] = useState<Sale>();
    const [saleCreateForm, setSaleCreateForm] = useState<SaleForm>();
    const [errors, setErrors] = useState<any>({
        date: false,
        description: false,
        quantity: false,
        price: false,
        totalPrice: false,
        kilogram: false,
    });
    const headers = useHeaders();

    useEffect(() => {
        const calculateTotalPrice = async () =>{
            setSale({ ...sale,
                totalPrice: Number((Number(sale?.quantity) * Number(sale?.price)).toFixed(2))});
        }

        calculateTotalPrice();
    }, [sale?.quantity, sale?.price]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSale({ ...sale, [e.target.name]: e.target.value });
        setErrors({...errors, [e.target.name]: !(e.target.value) ? true : false });
    };

    const onDateChange = (val: any, property: string) => {
        setSale({
            ...sale,
            [property]: val
        });
        setErrors({...errors, [property]: !(val) ? true : false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!sale?.date || !sale?.quantity || !sale?.price
            || !sale?.totalPrice || !sale?.kilogram){

            setErrors({
                date: !sale?.date ? true : false,
                quantity: !sale?.quantity ? true : false,
                price: !sale?.price ? true : false,
                totalPrice: !sale?.totalPrice ? true : false,
                kilogram: !sale?.kilogram ? true : false,
            })

            return;
        }

        try{
            const res = await saleCreate(sale, headers);

            if(res){
                navigate(`/sales`);
            }
        }catch(error) {
            console.error('Sale create failed', error);
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
                            title="Shto Shitjen"
                        />
                        <CardContent sx={{pt: 0}}>
                            <Box sx={{m: -1.5}}>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        xs={12}
                                        md={12}
                                    >
                                        <FormControl sx={{width: '100% !important'}}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']} sx={{width: '100% !important', paddingTop: '0 !important'}}>
                                                    <DatePicker
                                                        label="Data"
                                                        value={sale?.date}
                                                        onChange={(val) => onDateChange(val, 'date')}
                                                        format={'DD/MM/YYYY'}
                                                        sx={{width: '100% !important',
                                                            border: errors.date ? '1px solid red' : 'none',
                                                            borderRadius: '10px'}}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={12}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Përshkrimi"
                                            name="description"
                                            type='text'
                                            onChange={handleChange}
                                            value={sale?.description}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: sale?.description ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.kilogram}
                                            label="Kilogrami"
                                            name="kilogram"
                                            type='text'
                                            onChange={handleChange}
                                            value={sale?.kilogram}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: sale?.kilogram ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            error={errors.quantity}
                                            fullWidth
                                            label="Sasia"
                                            name="quantity"
                                            type='text'
                                            onChange={handleChange}
                                            value={sale?.quantity}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: sale?.quantity ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.price}
                                            label="Çmimi"
                                            name="price"
                                            type='text'
                                            onChange={handleChange}
                                            value={sale?.price}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: sale?.price ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.totalPrice}
                                            label="Çmimi total"
                                            name="totalPrice"
                                            type='text'
                                            onChange={handleChange}
                                            value={sale?.quantity && sale?.price ? (+sale.quantity * +sale.price).toFixed(2) : ''}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: (sale?.quantity || sale?.price || sale?.totalPrice) ? true : false,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'right', pt: 2}}>
                            <Link to={`/sales`}>
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