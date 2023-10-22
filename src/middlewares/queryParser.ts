import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      filters: object;
    }
  }
}

function parseFilters(queryParams) {
  const query: object = {};

  const operatorMap: { [key: string]: string } = {
    eq: '$eq', // Equal
    ne: '$ne', // Not equal
    gt: '$gt', // Greater than
    gte: '$gte', // Greater than or equal
    lt: '$lt', // Less than
    lte: '$lte', // Less than or equal
  };

  for (const key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      const value = queryParams[key];

      if (typeof value === 'object') {
        for (const operator in value) {
          if (value.hasOwnProperty(operator) && operatorMap[operator]) {
            const operatorValue = value[operator];
            query[key] = query[key] || {};
            query[key][operatorMap[operator]] = operatorValue;
          }
        }
      } else {
        query[key] = value;
      }
    }
  }

  return query;
}

export function queryParser(req: Request, res: Response, next: NextFunction) {
  req.filters = parseFilters(req.query);

  next();
}
