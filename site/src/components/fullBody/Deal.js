import Footer from "./Footer";
import Header from "./Header";
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Deal() { 
    return <div className="bg-img">
        <Header />
            <div className='container wrap'>
                <div className="message-body">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress variant="determinate" {...props} />
                        </Box>
                        <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" color="text.secondary">{`${Math.round(
                            props.value,
                            )}%`}</Typography>
                        </Box>
                    </Box>
                </div>
            </div>
        <Footer />
    </div>
}

export default Deal;