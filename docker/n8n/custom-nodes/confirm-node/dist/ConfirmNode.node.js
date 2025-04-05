"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmNode = void 0;
class ConfirmNode {
    constructor() {
        this.description = {
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
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const confirmed = this.getNodeParameter('confirmed', 0);
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
        });
    }
}
exports.ConfirmNode = ConfirmNode;
