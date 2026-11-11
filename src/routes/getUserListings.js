import Boom from '@hapi/boom';
import { getAuth } from 'firebase-admin/auth';
import { db } from '../database.js';

export const getUserListingsRoute = {
    method: 'GET',
    path: '/api/users/{userId}/listings',
    handler: async (req, h) => {
        const token = req.headers.authtoken;
        if (!token) throw Boom.unauthorized('Authentication is required.');

        const user = await getAuth().verifyIdToken(token);
        const userId = user.user_id;

        if (user.uid !== userId) throw Boom.unauthorized('Users can only access their own listings!');

        const { results } = await db.query('SELECT * FROM listings WHERE user_id = ?', [userId]);
        return results;
    }
}