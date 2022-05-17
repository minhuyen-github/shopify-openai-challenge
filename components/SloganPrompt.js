import { useState, useEffect } from 'react';
import Select from './Select';

export default function SloganPrompt({ onSubmitted }) {
	const [brandName, setBrandName] = useState('');
	const [product, setProduct] = useState('');
	const [target, setTarget] = useState({
		value: '',
		label: '',
	});
	const [showSelect, setShowSelect] = useState(true);
	const [isEnabled, setIsEnabled] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		const req = {
			brandName: brandName,
			target: target.value,
			product: product,
		};
		fetch('/api/generate/slogan', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(req),
		})
			.then((res) => res.json())
			.then((data) => {
				onSubmitted(data.result);
				refresh();
				setLoading(false);
			});
	};

	const refresh = () => {
		setBrandName('');
		setProduct('');
		setTarget({
			value: '',
			label: '',
		});
	};

	const onSelected = (value) => {
		setTarget(value);
	};

	const handleChange = (e) => {
		switch (e.target.id) {
			case 'name':
				setBrandName(e.target.value);
				break;
			case 'product':
				setProduct(e.target.value);
				break;
			default:
				break;
		}
	};

	const toggleSelect = (e) => {
		e.preventDefault();
		setShowSelect(!showSelect);
	};

	useEffect(() => {
		if (
			brandName.length !== 0 &&
			product.length !== 0 &&
			target.value.length !== 0 &&
			target.label.length !== 0
		)
			setIsEnabled(true);
		else setIsEnabled(false);
	}, [brandName, product, target]);

	return (
		<form
			className='flex flex-col w-1/2 border-2 border-black p-5 rounded-md'
			onSubmit={onSubmit}>
			<h1 className='text-2xl text-center'>Catchy slogan is on the way! 😎</h1>
			<div className='py-3 flex flex-col'>
				<label className='mb-2' htmlFor='name'>
					Brand Name (Optional)
				</label>
				<input
					id='name'
					type='text'
					placeholder='Enter your product name...'
					onChange={handleChange}
					value={brandName}
					className='p-1.5 border-[1.5px] border-gray-300 focus:outline-none focus:border-black rounded-md'
				/>
			</div>
			<div className='py-3 flex flex-col'>
				<label className='mb-2' htmlFor='product'>
					What does your brand sell?
				</label>
				<input
					id='product'
					type='text'
					placeholder='Jewelry, Household Appliances, etc.'
					onChange={handleChange}
					value={product}
					className='p-1.5 border-[1.5px] border-gray-300 focus:outline-none focus:border-black rounded-md'
				/>
			</div>
			<div className='py-3'>
				<label>
					You can select the existing target customer groups or you can define
					your own!
				</label>
				<div className='mt-5 flex flex-1 items-center justify-between w-full'>
					{showSelect ? (
						<Select selected={target.label} onSelected={onSelected} />
					) : null}
					{!showSelect ? (
						<input
							type='text'
							className='flex-grow p-1.5 border-[1.5px] border-gray-300 focus:border-black rounded-md focus:outline-none'
							placeholder='Specify your target group...'
							onChange={onSelected}
							minLength={4}
							maxLength={100}
							value={target}
						/>
					) : (
						<button
							className='flex-grow ml-3 p-2 rounded-md bg-black text-white'
							onClick={toggleSelect}>
							Specify your groups
						</button>
					)}
					{!showSelect ? (
						<button
							className='flex-grow ml-3 p-2 rounded-md bg-black text-white'
							onClick={toggleSelect}>
							Choose from our list
						</button>
					) : null}
				</div>
			</div>
			<input
				type='submit'
				value='Generate'
				className={`mt-5 py-3 rounded-md ${
					isEnabled
						? 'bg-black text-white generate-cursor'
						: 'bg-gray-200 text-gray-400'
				}`}
				disabled={!isEnabled}
			/>
		</form>
	);
}
