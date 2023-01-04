import handler from "../pages/api/calculate/[...params]";

import { rest } from 'msw'
export const handlers = [
    rest.get('/api/calculate/add/1/2', (req, res, ctx) => {
      console.log('req', req);
        return res(
          ctx.status(200),
          ctx.json({
            result: 3,
          })
        )
      })
  ]