import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { navigationRoutes } from '../app/config/navigationRoutes';
import Navbar from '../view/layouts/navbar/Navbar';

export const Router = () => {
	return (
		<BrowserRouter>
		<Navbar />
			<Routes>
				<Route>
					<Route>
						<Route
							path='/'
							element={<></>}
							key='home'
						/>
						{navigationRoutes.map((option) => {
							return (
								<Route
									path={option.url}
									element={option.element}
									key={option.title}
								/>
							);
						})}
					</Route>
				</Route>

				{/* Esses endpoints são ser para quando houver autenticação */}
				{/* <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Dashboard />} />
        </Route>*/}
			</Routes>
		</BrowserRouter>
	);
};
