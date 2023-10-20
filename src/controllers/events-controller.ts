import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { eventsService } from '@/services';
import { redis } from '@/server';

export async function getDefaultEvent(_req: Request, res: Response) {
  const eventRedis = await redis.get('event');
  if (eventRedis) {
    console.info('Foi pelo Redis !!!');
    return res.status(httpStatus.OK).send(JSON.parse(eventRedis));
  }
  const event = await eventsService.getFirstEvent();
  await redis.set('event', JSON.stringify(event), 'EX', 120);
  console.info('Foi banco normal');
  return res.status(httpStatus.OK).send(event);
}
