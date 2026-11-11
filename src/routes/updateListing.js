import Boom from '@hapi/boom';
import { getAuth } from 'firebase-admin/auth';
import { db } from '../database.js';

export const updateListingRoute = {
    method: 'POST',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const id = req.params.id;
        const token = req.headers.authtoken;
        if (!token) throw Boom.unauthorized('Authentication is required.');

        const user = await getAuth().verifyIdToken(token);
        const userId = user.user_id;
        const { name, description, price } = req.payload;
        await db.query(`UPDATE listings SET name = ?, description = ?, price = ? 
            WHERE id = ? AND user_id = ?`, [name, description, price, id, userId]);

        const { results } = await db.query('SELECT * FROM listings WHERE id = ? AND user_id = ?', [id, userId]);
        if (!results.length) throw Boom.notFound('Listing not found.');
        return results[0];
    }
}