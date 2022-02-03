import { Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div>
            <Typography variant='h2'>Welcome to Westeros</Typography>
            <Outlet/>
        </div>
    )
}

export default Layout;
