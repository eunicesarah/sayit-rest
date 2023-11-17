import { Response } from 'express';
import * as HTTPStatus from 'http-status-codes';

const buildResponse = (res: Response, httpStatus: number, data: any) => {
    let statusText = HTTPStatus.getStatusText(httpStatus).toUpperCase();
    statusText = statusText.replace(/ /g, '_');

    const resData = {
        status: statusText,
        data: data ? data : null
    };
    res.status(httpStatus).send(resData);
};

export { buildResponse};
