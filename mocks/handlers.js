import { rest } from 'msw'
import { add, subtract, multiply, divide } from "../utils/calculate";

export const handlers = [
    rest.get('/api/calculate/:operation/:first/:second', async (req, res, ctx) => {
      const params = req.params;
      let result;
      switch (params.operation) {
        case "add":
          result = add(params.first, params.second);
          break;
        case "subtract":
          result = subtract(params.first, params.second);
          break;
        case "multiply":
          result = multiply(params.first, params.second);
          break;
        case "divide":
          result = divide(params.first, params.second);
          break;
        default:
          throw new Error(`Unsupported operation ${params.operation}`);
      }
        return res(
          // ctx.delay(200),
          ctx.status(200),
          ctx.json({
            result: result,
          })
        )
      })
  ]