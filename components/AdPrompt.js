import { useEffect, useState } from 'react';
import Select from './Select';

export default function AdPrompt({ onSubmitted }) {
	const [productName, setProductName] = useState('');
	const [desc, setDesc] = useState('');
	const [target, setTarget] = useState({
		value: '',
		label: '',
	});
	const [showSelect, setShowSelect] = useState(true);
	const [isEnabled, setIsEnabled] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		const req = {
			productName: productName,
			target: target.value,
			desc: desc,
		};
		fetch('/api/generate/ad', {
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
			});
	};

	const refresh = () => {
		setProductName('');
		setDesc('');
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
				setProductName(e.target.value);
				break;
			case 'desc':
				setDesc(e.target.value);
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
			productName.length !== 0 &&
			desc.length !== 0 &&
			target.value.length !== 0 &&
			target.label.length !== 0
		)
			setIsEnabled(true);
		else setIsEnabled(false);
	}, [productName, desc, target]);

	return (
		<form
			className='flex flex-col w-1/2 border-2 border-black p-5 rounded-md'
			onSubmit={onSubmit}>
			<h1 className='text-2xl text-center'>
				Fly away with awesome advertisement! 🤩
			</h1>
			<div className='py-3 flex flex-col'>
				<label className='mb-2' htmlFor='name'>
					Product Name
				</label>
				<input
					id='name'
					type='text'
					placeholder='Enter your product name...'
					onChange={handleChange}
					value={productName}
					className='p-1.5 border-[1.5px] border-gray-300 focus:outline-none focus:border-black rounded-md'
				/>
			</div>
			<div className='py-3 flex flex-col'>
				<label className='mb-2' htmlFor='desc'>
					Product Description
				</label>
				<textarea
					id='desc'
					placeholder="Enter your product's description..."
					onChange={handleChange}
					value={desc}
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
