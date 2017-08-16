import { Router } from 'express';
import nodes from './nodes';
import GraphJS from '../lib/graph';
export default ({ config, db, io }) => {
    let api = Router();

    api.use('/node', nodes({ config, db, io }));
 

    // perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json({ version });
    });
    return api;
}