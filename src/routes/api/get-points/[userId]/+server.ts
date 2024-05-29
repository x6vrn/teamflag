import {getPoints} from '$lib/server/api'
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({params}) => {
    try {
        const points = await getPoints(parseInt(params.userId))
        return json({points})
    } catch (error) {
    //   return json({ message: error.message }, { status: 500 });
    }
  };
  
