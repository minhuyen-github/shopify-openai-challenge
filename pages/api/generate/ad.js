// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

console.log(process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
	const { productName, desc, target } = req.body;
	console.log('here');
	const completion = await openai.createCompletion('text-davinci-002', {
		prompt: setPrompt(productName, desc, target),
		temperature: 0.6,
		max_tokens: 1000,
	});
	res.status(200).json({ result: completion.data.choices[0].text });
}

function setPrompt(name, desc, target) {
	return `Write an ad for ${name} with the following description ${
		target.length === 0 ? '' : 'to aim at ' + target
	} \nDescription: ${desc}`;
}
