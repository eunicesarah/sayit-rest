import { Router, Request, Response } from 'express';
import { logger } from "../middlewares";
import { showPsikolog } from '../models/psikolog';
import mysql from '../infrastructure/database/mysql';
import { validateApiKey } from '../util/apikey';
import { bookingPsikolog } from '../handler/book';
import { subscribePremium } from '../service/subscribe';
// import { getUserId } from '../service/user';


export const router = Router();

router.use(logger);


router.get('/consultation', async (req: Request, res: Response) => {
    try {
      const psikolog = await showPsikolog(mysql);
  
      if (!psikolog) {
        return res.status(404).send({ message: 'Psikolog not found' });
      }
  
      return res.send({ message: 'Show all psikolog', data: psikolog });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).send({ message: 'Internal Server Error' });
    }
  });
  
router.post('/reservation', 
    async (req: Request, res: Response) => {
        try {
            const result = await bookingPsikolog(req);
            res.send({ message: 'Booking success', data: result });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).send({ message: 'Internal Server Error' });
        }  
    }
);

router.post('/subscribe',
    async (req: Request, res: Response) => {
        try {
            const result = await subscribePremium(req);
            res.send({ message: 'Subscribe success', data: result });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
);


// router.post('/test/:id', 
//     async (req: Request, res: Response) => {
//         try {
//             const result = await getUserId(req, parseInt(req.params.id));
//             res.send({ message: 'Booking success', data: result });
//         } catch (error) {
//             console.error('Error:', error);
//             return res.status(500).send({ message: 'Internal Server Error' });
//         }  
//     }
// );