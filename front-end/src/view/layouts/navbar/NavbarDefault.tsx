import { Link } from 'react-router-dom';
import { navigationRoutes } from '../../../app/config/navigationRoutes';

const NavbarDefault = () => {
	return (
		<nav className='flex justify-between items-center px-10 py-5'>
			<div>
				<Link to='/' className='p-3 hover:text-white'>
					<h2 className='text-xl text-white font-semibold'>Logo</h2>
				</Link>
			</div>

			<ul className='flex items-center gap-2 text-[#bdbdc0] font-medium font-jakarta'>
				{navigationRoutes.map((option) => {
					return (
						<li key={option.title}>
							<Link
								to={option.url}
								className='p-3 hover:text-white'
							>
								{option.title}
							</Link>
						</li>
					);
				})}
			</ul>

			<div>
				<button
					className='
						font-jakarta
						text-sm
						px-4
						py-2
						rounded-full
						text-white
						font-medium
						bg-white
						bg-opacity-[.08]
						border
						border-white
						border-opacity-[.08]
						hover:border-opacity-25'
				>
					Log in
				</button>
			</div>
		</nav>
	);
};
export default NavbarDefault;
