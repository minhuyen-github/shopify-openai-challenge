import SloganPrompt from '../components/SloganPrompt';
import { useState } from 'react';
import Image from 'next/image';

export default function Slogan() {
	const [res, setRes] = useState('');

	const handleSubmit = (value) => {
		setRes(value);
	};
	return (
		<div className='p-10 flex flex-col justify-center items-center'>
			<SloganPrompt onSubmitted={handleSubmit} />
			{res.length !== 0 ? (
				<div className='mt-10 w-1/2 border-2 border-black p-5 rounded-md flex flex-col justify-center'>
					<h1 className='text-2xl text-center mb-5'>The result! 👀</h1>
					<p className='text-center'>{res}</p>
				</div>
			) : (
				<div className='mt-10 w-1/2 border-2 border-black p-5 rounded-md flex flex-col justify-center'>
					<h1 className='text-2xl text-center mb-5'>Such emptyness!</h1>
					<Image src='/loading.svg' width='600' height='600' />
				</div>
			)}
		</div>
	);
}
