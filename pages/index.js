import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
	return (
		<main className='flex h-screen w-screen items-center justify-evenly p-5'>
			<div>
				<h1 className='text-5xl mb-5'>Davinci - Your brand writer</h1>
				<h2 className='text-xl'>
					Creative advertisements and catchy slogans are just two clicks away!
				</h2>
				<div className='grid grid-cols-2 mt-10 space-x-10'>
					<Link href='/ad'>
						<button className='bg-black text-white rounded-md p-3'>
							Generate Advertisement
						</button>
					</Link>
					<Link href='/slogan'>
						<button className='bg-black text-white rounded-md p-3'>
							Whip Up Slogan
						</button>
					</Link>
				</div>
			</div>
			<Image src='/hero.svg' alt='Hero' width='700' height='600' />
		</main>
	);
}
