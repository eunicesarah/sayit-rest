import { Router, Request, Response } from 'express';
import { logger } from '../middlewares';
import { delFeedback, giveFeedback, showPsikologId, updateProfile } from '../service/psikolog';
import { showPsikolog } from '../models/psikolog';
import mysql from '../infrastructure/database/mysql';
import { login, register } from '../handler/psikolog';
import validateRequest from '../util/validate';
import { jLoginReq, jRegisterReq } from '../handler/psikolog/type';
import { listReservation } from '../service/book';

export const router = Router();

router.use(logger);

// Move the POST route for /register above the GET route for /psikolog
router.post('/register', validateRequest({body: jRegisterReq}),register);

router.post('/login', validateRequest({body: jLoginReq}), login);

router.post('/feedback/:id', async (req: Request, res: Response) => {
  try {
    const feedback = await giveFeedback(
      parseInt(req.params.id),
      req.body.feedback_content,
      );
      res.send({ message: 'Feedback added successfully', data: feedback });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}
);

router.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const psikolog = await showPsikologId(parseInt(req.params.id));
    console.log('Data retrieved:', psikolog);
    if (psikolog) {
      res.send({ message: `Find a psikolog id ${req.params.id}`, data: psikolog });
    } else {
      res.status(404).send({ message: `Psikolog with id ${req.params.id} not found` });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.get('/booked/:id', async (req: Request, res: Response) => {
  try {
    const psikolog = await listReservation(parseInt(req.params.id));

    if (!psikolog) {
      return res.status(404).send({ message: 'Psikolog not found' });
    }

    return res.send({ message: 'Show all psikolog', data: psikolog });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});


    
router.put('/update/:id', async (req: Request, res: Response) => {
    try{
      const psikolog = await updateProfile(parseInt(req.params.id), req.body.psikolog_name, req.body.psikolog_klinik, req.body.psikolog_phone);

      if (psikolog) {
        res.send({ message: `Psikolog with id ${req.params.id} has been updated`, data: psikolog });
      } else {
        res.status(404).send({ message: `Psikolog with id ${req.params.id} not found` });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

router.delete('/delete/:id', async (req: Request, res: Response) => {
  try {
    const psikolog = await delFeedback(parseInt(req.params.id));

    return res.send({ message: 'Feedback deleted', data: psikolog });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});