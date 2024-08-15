import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';

interface IAuthLayout {
    children: any
}

export const AuthLayout = (props: IAuthLayout) => {
    const { children } = props;

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flex: '1 1 auto',
                height: '100vh'
            }}
        >
            <Grid container sx={{ flex: '1 1 auto' }} >
                <Grid xs={12} lg={6}
                    sx={{
                        backgroundColor: 'background.paper',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        order: { xs: 2, lg: 1 },
                    }}
                >
                    {children}
                </Grid>

                <Grid
                    xs={12}
                    lg={6}
                    sx={{
                        alignItems: 'center',
                        background: '#e4e4e478',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        order: { xs: 1, lg: 2 },
                        '& img': {
                            maxWidth: '100%'
                        }
                    }}
                >
                    <Box sx={{ p: 3 }}>
                        <img
                            alt=""
                            src="/assets/Lockup-Color.svg"
                            style={{width: '30rem', height: 'auto', objectFit: 'contain'}}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};