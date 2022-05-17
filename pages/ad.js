import AdPrompt from '../components/AdPrompt';
import { useState } from 'react';
import Image from 'next/image';

export default function Ad() {
	const [res, setRes] = useState('');

	const handleSubmit = (value) => {
		setRes(value);
	};
	return (
		<div className='p-10 flex flex-col justify-center items-center'>
			<AdPrompt onSubmitted={handleSubmit} />
			<div className='mt-10 w-1/2 border-2 border-black p-5 rounded-md flex flex-col justify-center'>
				<h1 className='text-2xl text-center mb-5'>The result! 👀</h1>
				{res.length !== 0 ? (
					<p>{res}</p>
				) : (
					<Image src='/loading.svg' width='600' height='600' />
				)}
			</div>
		</div>
	);
}
