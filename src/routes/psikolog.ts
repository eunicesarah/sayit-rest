import { Router, Request, Response } from 'express';
import { logger } from '../middlewares';
import { showPsikologId } from '../service/psikolog';
import { showPsikolog } from '../models/psikolog';
import mysql from '../infrastructure/database/mysql';
import { loginPsikolog, registerPsikolog } from "../service/auth";
import { login, register } from '../handler/user';
import validateRequest from '../util/validate';
import { jLoginReq, jRegisterReq } from '../handler/user/type';

export const router = Router();

router.use(logger);

// Move the POST route for /register above the GET route for /psikolog
router.post('/register', validateRequest({body: jRegisterReq}),register);

router.post('/login', validateRequest({body: jLoginReq}), login);

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
