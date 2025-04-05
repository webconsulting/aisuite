import { IExecuteFunctions, INodeType, INodeTypeDescription, INodeParameters } from 'n8n-workflow';
  
  export class ConfirmNode implements INodeType {
      description: INodeTypeDescription = {
        displayName: 'Confirm',
        name: 'confirm',
        icon: 'fa:check-circle',
        group: ['input'],
        version: 1,
        description: 'Ask a confirmation question',
        defaults: {
            name: 'Confirm Node',
            color: '#00b5e2',
        },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'Question',
                name: 'message',
                type: 'string',
                default: '',
                placeholder: 'What do you want to confirm?',
                description: 'The question to ask the user',
            },
            {
                displayName: 'Confirmation Type',
                name: 'type',
                type: 'options',
                options: [
                    {
                        name: 'Yes/No',
                        value: 'yesno',
                    },
                    {
                        name: 'Accept/Decline',
                        value: 'acceptdecline',
                    },
                ],
                default: 'yesno',
                description: 'The type of confirmation to ask',
            },
            {
              displayName: 'Confirmed?',
              name: 'confirmed',
              type: 'boolean',
              default: false,
              // displayOptions: {
              //   show: {
              //     _internal: ['true'], // ou autre condition si tu veux le cacher
              //   },
              // },
            }
        ],
    };
  
    async execute(this: IExecuteFunctions): Promise<any> {
      const confirmed = this.getNodeParameter('confirmed', 0) as boolean;
    
      if (!confirmed) {
        // Retourne une sortie indiquant que l'action est en attente
        return this.prepareOutputData([
          {
            json: {
              status: 'waiting',
              message: 'Awaiting confirmation. Set `confirmed` to true and re-execute.',
            },
          },
        ]);
      }
    
      return this.prepareOutputData([
        {
          json: {
            status: 'confirmed',
            message: 'Confirmation received!',
          },
        },
      ]);
    }
  }