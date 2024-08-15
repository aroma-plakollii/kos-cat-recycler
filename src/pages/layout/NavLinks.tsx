import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import WebIcon from '@mui/icons-material/Web';
import { LibraryBooks } from '@mui/icons-material';
import {userType} from "../../api/authService";

export const items = [
    {
        name: 'home',
        title: 'Kërko',
        path: '/home',
        icon: (<SearchIcon />),
        hasAuthorization: (userType === 'super-admin')
    },
    {
        name: 'clients',
        title: 'Klientët',
        path: '/clients',
        icon: (<GroupIcon />),
        hasAuthorization: (userType === 'super-admin')
    },
    {
        name: 'orders',
        title: 'Blerjet',
        path: '/orders',
        icon: (<ShoppingCartIcon />),
        hasAuthorization: (userType === 'super-admin')
    },
    {
        name: 'users',
        title: 'Përdoruesit',
        path: '/users',
        icon: (<PersonIcon />),
        hasAuthorization: (userType === 'super-admin')
    },
    {
        name: 'reports',
        title: 'Reports',
        path: '/reports',
        icon: (<LibraryBooks />),
        hasAuthorization: (userType === 'super-admin')
    }

    // {
    //     name: 'sitemaps',
    //     title: 'Faqet',
    //     path: '/sitemaps',
    //     icon: (<WebAssetIcon />)
    // },
    // {
    //     name: 'authoriozations',
    //     title: 'Autorizimet',
    //     path: '/authorizations',
    //     icon: (<WebIcon />)
    // },
];


// if (userType === 'super-admin') {
//     items.push(
//         {
//             name: 'users',
//             title: 'Përdoruesit',
//             path: '/users',
//             icon: (<PersonIcon />)
//         },
//         {
//             name: 'reports',
//             title: 'Reports',
//             path: '/reports',
//             icon: (<LibraryBooks />)
//         }
//     );
// }