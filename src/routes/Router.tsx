import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Login';
import Home from '../pages/Home';
import { ProtectedRoute } from './ProtectedRoute';
import OrdersbyClient from "../pages/orders/OrdersbyClient";
import {AddOrder} from "../pages/orders/AddOrder";
import {EditOrder} from "../pages/orders/EditOrder";
import Clients from "../pages/clients/Clients";
import {AddClient} from "../pages/clients/AddClient";
import {EditClient} from "../pages/clients/EditClient";
import Users from "../pages/users/Users";
import {AddUser} from "../pages/users/AddUser";
import {EditUser} from "../pages/users/EditUser";
import Orders from "../pages/orders/Orders";
import Sitemaps from "../pages/sitemaps/Sitemaps";
import {AddSitemap} from "../pages/sitemaps/AddSitemap";
import {EditSitemap} from "../pages/sitemaps/EditSitemap";
import UserTypeXREFSitemaps from "../pages/authorizations/UserTypeXREFSitemaps";
import {AddUserTypeXREFSitemaps} from "../pages/authorizations/AddUserTypeXREFSitemaps";
import {EditUserTypeXREFSitemaps} from "../pages/authorizations/EditUserTypeXREFSitemaps";
import UserTypes from "../pages/authorizations/UserTypes";
import {AddUserType} from "../pages/authorizations/AddUserType";
import {OrderReceipt} from "../pages/orders/orderReceipt/OrderReceipt";
import { Reports } from '../pages/reports/Reports';
import Unauthorized from '../pages/Unauthorized';
import { ReportsPDFViewer } from '../pages/reports/ReportsPDFViewer';
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import {Sales} from "../pages/sales/Sales";
import {AddSale} from "../pages/sales/AddSales";
import {EditSale} from "../pages/sales/EditSale";
import {SalesbyClient} from "../pages/sales/SalesByClient";
import {SaleReceipt} from "../pages/sales/saleReceipt/SaleReceipt";

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token/:idUser" element={<ResetPassword />} />
                <Route path="/" element={<Navigate to="/home" replace />} />
                
                <Route path="/home" element={
                    <ProtectedRoute requiredRoles={['super-admin', 'admin', 'agent']}>
                        <Home />
                    </ProtectedRoute>} />
                    
                    {/*Orders*/}
                    <Route path="/orders" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin', 'agent']}>
                            <Orders />
                        </ProtectedRoute>
                    } />
                    <Route path="/orders/add/:clientId" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin', 'agent']}>
                            <AddOrder />
                        </ProtectedRoute>
                    } />
                    <Route path="/orders/:orderId" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin', 'agent']}>
                            <EditOrder />
                        </ProtectedRoute>
                    } />
                    <Route path="/orders/receipt/:orderId" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin', 'agent']}>
                            <OrderReceipt />
                        </ProtectedRoute>
                    } />

                    <Route path="/orders/client/:clientId" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin', 'agent']}>
                            <OrdersbyClient />
                        </ProtectedRoute>
                    } />

                    {/*Clients*/}
                    <Route path="/clients" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin', 'agent']}>
                            <Clients />
                        </ProtectedRoute>
                    } />
                    <Route path="/clients/add" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin', 'agent']}>
                            <AddClient />
                        </ProtectedRoute>
                    } />
                    <Route path="/clients/:clientId" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin', 'agent']}>
                            <EditClient />
                        </ProtectedRoute>
                    } />

                    {/*Sales*/}
                    <Route path="/sales" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <Sales />
                        </ProtectedRoute>
                    } />
                    <Route path="/sales/add" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <AddSale />
                        </ProtectedRoute>
                    } />
                    <Route path="/sales/:saleId" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <EditSale />
                        </ProtectedRoute>
                    } />
                    <Route path="/sales/receipt/:saleId" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <SaleReceipt />
                        </ProtectedRoute>
                    } />

                    <Route path="/sales/client/:clientId" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin', 'agent']}>
                            <SalesbyClient />
                        </ProtectedRoute>
                    } />

                    {/*Users*/}
                    <Route path="/users" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <Users />
                        </ProtectedRoute>
                    } />
                    
                    <Route path="/users/add" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <AddUser />
                        </ProtectedRoute>
                    } />
                    <Route path="/users/:userId" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <EditUser />
                        </ProtectedRoute>
                    } />

                    {/*Sitemaps*/}
                    <Route path="/sitemaps" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <Sitemaps />
                        </ProtectedRoute>
                    } />
                    <Route path="/sitemaps/add" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <AddSitemap />
                        </ProtectedRoute>
                    } />
                    <Route path="/sitemaps/:sitemapId" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <EditSitemap />
                        </ProtectedRoute>
                    } />

                    {/*User Type*/}
                    <Route path="/authorizations" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <UserTypes />
                        </ProtectedRoute>
                    } />
                    <Route path="/authorizations/add" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <AddUserType />
                        </ProtectedRoute>
                    } />

                    {/*UserTypeXREFSitemaps*/}
                    <Route path="/authorizations/type/:userTypeId" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <UserTypeXREFSitemaps />
                        </ProtectedRoute>
                    } />
                    <Route path="/authorizations/add/:userTypeId" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <AddUserTypeXREFSitemaps />
                        </ProtectedRoute>
                    } />
                    <Route path="/authorizations/:userTypeXREFSitemapId" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <EditUserTypeXREFSitemaps />
                        </ProtectedRoute>
                    } />
                    <Route path="/reports" element={
                        <ProtectedRoute requiredRoles={['super-admin', 'admin']}>
                            <Reports />
                        </ProtectedRoute>
                    } />
                    <Route path="/reports/pdf-viewer" element={
                        <ProtectedRoute>
                            <ReportsPDFViewer />
                        </ProtectedRoute>
                    } />


                    <Route path="/unauthorized" element={<Unauthorized />} />       
            </Routes>
        </BrowserRouter>
    )
};

export default Router;