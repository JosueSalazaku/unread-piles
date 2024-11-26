import type { NextApiRequest, NextApiResponse } from "next";

export default function initMiddleware(
  middleware: (req: NextApiRequest, res: NextApiResponse, callback: (result: unknown) => void) => void
) {
  return (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: unknown) => {
        if (result instanceof Error) {
          return reject(result); // Reject if result is an Error
        }
        return resolve(); // Resolve without passing the result
      });
    });
}
