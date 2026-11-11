import { db } from '../database.js';
import { getAuth } from 'firebase-admin/auth';

export const deleteListingRoute = {
    method: 'DELETE',
    path: '/api/listings/{id}',
    handler: async (req, h) => {
        const id = req.params.id;
        const token = req.headers.authtoken;
        const user = await getAuth().verifyIdToken(token);
        const userId = user.user_id;
        await db.query('DELETE FROM listings WHERE id = ? AND user_id = ?', [id, userId]);
        return { message: 'Listing deleted successfully' };
    }
}