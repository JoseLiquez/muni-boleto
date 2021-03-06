import dbConnect from '../../../utils/dbConnect';
import Boleto from '../../../models/Boleto';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch(method){
        case 'GET':
            try {
                const boletos = await Boleto.find({});

                res.status(200).json({success: true, data: boletos});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'POST':
            try {
                const boleto = await Boleto.create(req.body);

                res.status(201).json({success: true, data: boleto});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        default:
            res.status(400).json({success: false});
        break;
    }
}