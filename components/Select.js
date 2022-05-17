import { useState } from 'react';

export default function Select({ selected, onSelected }) {
	const [show, setShow] = useState(false);

	const options = [
		{ value: 'parents', label: 'Parents' },
		{ value: 'teenagers', label: 'Teenagers' },
		{ value: 'children', label: 'Children' },
		{ value: 'students', label: 'Students' },
		{ value: 'adult', label: 'Adult' },
		{ value: 'elders', label: 'Elders' },
		{ value: 'women', label: 'Women' },
		{ value: 'men', label: 'Men' },
	];

	const handleSelect = (option) => {
		onSelected(option);
		setShow(!show);
	};

	return (
		<div
			className='relative w-[300px] cursor-pointer'
			onClick={() => setShow(!show)}>
			<div
				className={`flex justify-between items-center border-[1.5px] rounded-md p-1.5 ${
					show ? 'border-black' : 'border-gray-300'
				}`}>
				<span
					className={`${
						selected.length === 0 ? 'text-gray-400' : 'text-black'
					}`}>
					{selected.length === 0 ? 'Select your target group...' : selected}
				</span>
				<span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-4 w-4'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19 9l-7 7-7-7'
						/>
					</svg>
				</span>
			</div>
			{show ? (
				<div className='grid grid-cols-1 z-10 absolute top-12 border-[1.5px] border-black rounded-md w-full bg-white'>
					{options.map((option) => (
						<p
							key={option.value}
							onClick={() => handleSelect(option)}
							className='p-2 hover:bg-black hover:text-white'>
							{option.label}
						</p>
					))}
				</div>
			) : null}
		</div>
	);
}
