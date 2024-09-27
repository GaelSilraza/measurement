import {
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
} from '@mui/material';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';
import { Measurement } from '../../../../app/entities/Measurement';
import { useEffect, useState } from 'react';
import { getAll } from '../../../../app/services/measurementService/getAll';

export interface TableColumn {
	name: string;
	align?: 'left' | 'right' | 'center';
	minWidth?: number;
}

const columns: TableColumn[] = [
	{ name: 'equipemntId', minWidth: 80 },
	{ name: 'value', minWidth: 80 },
];

interface IntervalOptions {
	id: string;
	name: string;
}

const intervalOptions: IntervalOptions[] = [
	{
		id: '1d',
		name: '24 horas',
	},
	{
		id: '2d',
		name: '48 horas',
	},
	{
		id: '1w',
		name: '1 semana',
	},
	{
		id: '1m',
		name: '1 mês',
	},
];

const MeasurementData = () => {
	const [interval, setInterval] = useState<string>('1d');
	const [rows, setRows] = useState<Array<Measurement>>([]);

	useEffect(() => {
		getAll({ interval: interval }).then(({ data }) => setRows(data));
	}, [interval]);

	const onChangeInterval = (event: SelectChangeEvent<string>) => {
		setInterval(event.target.value);
	};

	return (
		<>
			<Paper className='w-3/4'>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.name}
										align={column.align || 'left'}
										style={{ minWidth: column.minWidth || 80 }}
									>
										{column.name}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((data) => (
								<TableRow key={data.id}>
									<TableCell>{data.equipmentId}</TableCell>
									<TableCell>{data.value}</TableCell>
								</TableRow>
							))}

							<TableRow>
								<TableCell colSpan={4} align='left'>
									<FormControl className='w-2/4'>
										<InputLabel id='measurement-interval'>Intervalo</InputLabel>
										<Select
											labelId='measurement-interval'
											id='measurement-interval'
											value={interval}
											defaultValue='1d'
											label='Interval'
											onChange={onChangeInterval}
											sx={{
												maxWidth: '140px',
												alignItems: 'self-end',
												border: 'none',
											}}
										>
											{intervalOptions.map((option) => (
												<MenuItem value={option.id} key={option.id}>
													{option.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
			<Paper
				className='w-3/4'
				sx={{ display: 'flex', justifyContent: 'center' }}
			>
				{rows.length > 0 && (
					<BarChart width={600} height={400} data={rows}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='equipmentId' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey='value' fill='#8884d8' />
					</BarChart>
				)}
			</Paper>
		</>
	);
};

export default MeasurementData;
