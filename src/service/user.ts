// import { conSoap } from "../models/connSoap";
// import { connSoap } from "../models/connSoap/type";
// import { Request, Response } from 'express';

// export const getUserId = async (req: Request, id:number) => {
//     try {
//         // const { userId } = id/;
//         const url = 'http://soap-app:8081/ws/subscription';
//         const xml = `
//         <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
//             <Body>
//                 <getSubs xmlns="http://service.sayit.com/">
//                     <arg0 xmlns="">${id}</arg0>
//                 </getSubs>
//             </Body>
//         </Envelope>`;
//         const header = {
//             'Content-Type': 'text/xml;charset=UTF-8',
//             'soapAction': 'getSubs',
//         };

//         const conSoap: conSoap = {
//             url: url,
//             header: header,
//             xml: xml,
//         };
        

//         const response = await connSoap(conSoap);
//         const userId = response.substring(response.indexOf("<return>") + 8, response.indexOf("</return>"));
//         return userId;
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }
