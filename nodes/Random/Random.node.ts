import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
    IExecuteFunctions
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		
            displayName: 'Random',
            name: 'random',
            icon: 'file:randomIcon.svg',
            group: ['input'],
            version: 1,
            description: 'Gerarador de números aleatórios utilizando a API da Random.org',
            defaults: {
                name: 'Random',
            },
            inputs: ['main'],
            outputs: ['main'],
		properties: [
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                required: true,
                default: 0,
                description: 'Valor mínimo',
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                required: true,
                default: 100,
                description: 'Valor máximo',
            }
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

        const min = this.getNodeParameter('min',0) as number;
        const max = this.getNodeParameter('max',0) as number;

        const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

         const response = await this.helpers.httpRequest.call(this, {
            method: 'GET',
            url: url,
            json: false,
        });
        
        const randomNumber = parseInt(response.toString().trim(), 10);

		const returnData = [{ random: randomNumber }];

		return [this.helpers.returnJsonArray(returnData)];
	}
}