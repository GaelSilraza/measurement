import { Box, Typography } from '@mui/material';
import MeasurementData from './components/MeasurementData';

const Measurement = () => {

	return (
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			className='mt-4 mb-8'
			flexDirection='column'
			gap='2rem'
		>
			<Typography typography='h4'>Medições</Typography>
			<MeasurementData />
		</Box>
	);
};

export default Measurement;
