import {clientSocket} from './clientSocket';
export const defaultEndpoint = `http://${document.location.host}`;

export const defaultSocket = new clientSocket(defaultEndpoint);