import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import dayjs from "dayjs";
import {Order} from "../../types/order";
import {TableCell, TableRow} from "@mui/material";

interface ReportsPDFProps {
    orders: Order[] | undefined;
    global: any;
}

export const ReportsPDF : React.FC<ReportsPDFProps> = (props) => {

    const totalKilograms = props?.orders?.reduce((sum, order) => sum + (order.kilogram || 0), 0);
    const totalPrices = props?.orders?.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);

    const styles = StyleSheet.create({
            page: {
                flexDirection: 'column',
                padding: 10,
                height: '100vh'
            },
            header: {
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            },
            logo: {
                width: 80,
                height: 25,
            },
            companyDetails: {
                fontSize: '11px',
                lineHeight: '1.55px'
            },
            table: {
                marginTop: 48,
                borderWidth: 1,
                borderColor: '#000',
                borderStyle: 'solid',
            },
            tableRow: {
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#000',
                borderBottomStyle: 'solid',
            },
            tableCellId: {
                padding: "5px",
                width: '8%',
                fontSize: '10px',
                borderRightWidth: 1,
                borderRightColor: '#000',
                borderRightStyle: 'solid',
            },
            tableCell: {
                padding: "5px",
                width: '15%',
                fontSize: '10px',
                borderRightWidth: 1,
                borderRightColor: '#000',
                borderRightStyle: 'solid',
            },
            tableHead: {
                backgroundColor: '#eee',
            },
            tableCellFiller: {
                padding: "5px",
                width: '17%',
            },
            tableCellTotal: {
                fontWeight: "extrabold",
                padding: "5px",
                width: '30.2%',
                fontSize: '11px',
                borderLeftWidth: 1,
                borderLeftColor: '#000',
                borderLeftStyle: 'solid',
                textAlign: "right",
            },
            weight:{
                fontWeight: "extrabold"
            },
            price: {
                textAlign: "right",
                padding: "5px",
                width: '15%',
                fontSize: '10px',
                borderRightWidth: 1,
                borderRightColor: '#000',
                borderRightStyle: 'solid',
            }
    });

    return(
        <Document>
            <Page style={styles.page}>
                <View style={styles.header}>
                    <Image
                        style={styles.logo}
                        src="/assets/Lockup-Color.png"
                    />
                </View>
                <View>
                    <Text style={styles.companyDetails}>{props.global.companyDetails.businessNumber}</Text>
                    <Text style={styles.companyDetails}>{props.global.companyDetails.name}</Text>
                    <Text style={styles.companyDetails}>{props.global.companyDetails.phone}</Text>
                    <Text style={styles.companyDetails}>{props.global.companyDetails.address}</Text>
                </View>
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHead]}>
                        <Text style={[styles.tableCellId, styles.weight]}>Id</Text>
                        <Text style={[styles.tableCell, styles.weight]}>Klienti</Text>
                        <Text style={[styles.tableCell, styles.weight]}>Data</Text>
                        <Text style={[styles.tableCell, styles.weight]}>Lloji</Text>
                        <Text style={[styles.tableCell, styles.weight]}>Sasia</Text>
                        <Text style={[styles.tableCell, styles.weight]}>Kg</Text>
                        <Text style={[styles.tableCell, styles.weight]}>Çmimi</Text>
                        <Text style={[styles.tableCell, styles.weight]}>Totali</Text>
                    </View>
                    {props?.orders?.map((order) => (
                        <View key={order.idOrder} style={styles.tableRow}>
                            <Text style={styles.tableCellId}>{order.idOrder}</Text>
                            <Text style={styles.tableCell}>{`${order.idClient?.firstName} ${order.idClient?.lastName}`}</Text>
                            <Text style={styles.tableCell}>{order.orderDate ? dayjs(order.orderDate).format('DD-MM-YYYY') : ''}</Text>
                            <Text style={styles.tableCell}>{order.type}</Text>
                            <Text style={styles.tableCell}>{order.quantity}</Text>
                            <Text style={styles.tableCell}>{order.kilogram}kg</Text>
                            <Text style={styles.price}>{order.price}&euro;</Text>
                            <Text style={styles.price}>{order.totalPrice}&euro;</Text>
                        </View>
                    ))}
                    <View style={styles.tableRow}>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Text style={styles.tableCellFiller}></Text>
                        ))}
                        <Text style={styles.tableCellTotal}>Kg: {totalKilograms}kg</Text>
                        <Text style={styles.tableCellTotal}>Totali: {totalPrices}&euro;</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}