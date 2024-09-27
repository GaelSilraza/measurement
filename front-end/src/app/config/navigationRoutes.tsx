import { ReactElement } from 'react';
import Measurement from '../../view/pages/Measurement/Measurement';

interface NavigationRoutes {
	title: string;
	url: string;
	element: ReactElement; 
}

export const navigationRoutes: NavigationRoutes[] = [
	{
		title: 'Medições',
		url: 'measurement',
    element: <Measurement />,
	},
];
