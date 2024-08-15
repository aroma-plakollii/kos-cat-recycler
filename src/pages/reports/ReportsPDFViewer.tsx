import { PDFViewer } from '@react-pdf/renderer';
import {ReportsPDF} from "./ReportsPDF";
import {useGlobalData} from "../../hooks/useGlobalData";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

export const ReportsPDFViewer = () => {
    const globalData = useGlobalData();
    const orders = useSelector((state: RootState) => state.orders);

    return (
        <div>
            <PDFViewer width="100%" height="1200">
                <ReportsPDF orders={orders} global={globalData}/>
            </PDFViewer>
        </div>
    )
}