import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotels, getHotelsWithRooms } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.get('/', getHotels).get('/:hotelId', getHotelsWithRooms); //.all('/*', authenticateToken)

export { hotelsRouter };
