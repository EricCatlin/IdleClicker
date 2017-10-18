import { Router } from 'express';
import nodes from './nodes';
import auth from './auth';

import GraphJS from '../lib/graph';
export default ({ config, db, io }) => {
    let api = Router();

    api.use('/nodes', nodes({ config, db, io }));
    api.use('/auth', auth({ config, db, io }));
    

    // perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json({ version });
    });
    return api;
}