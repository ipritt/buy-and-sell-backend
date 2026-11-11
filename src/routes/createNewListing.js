import Boom from '@hapi/boom';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database.js';
import { getAuth } from 'firebase-admin/auth';

export const createNewListingRoute = {
    method: 'POST',
    path: '/api/listings',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        if (!token) throw Boom.unauthorized('Authentication is required.');

        const user = await getAuth().verifyIdToken(token);
        const userId = user.user_id;
        const { name = '', description = '', price = 0 } = req.payload;
        const id = uuidv4();
        const views = 0;
        await db.query(`INSERT INTO listings (id, name, description, price, user_id, views) 
            VALUES (?, ?, ?, ?, ?, ?)`, [id, name, description, price, userId, views]);
        return { id, name, description, price, user_id: userId, views };
    }
}