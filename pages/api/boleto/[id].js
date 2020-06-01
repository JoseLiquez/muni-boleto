import dbConnect from '../../../utils/dbConnect';
import Boleto from '../../../models/Boleto';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch(method){
        case 'GET':
            try {
                const boleto = await Boleto.findById(id);

                if (!boleto){
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: boleto})
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'PUT':
            try {
                const boleto = await Boleto.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                
                if (!boleto){
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: boleto})
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'DELETE':
            try {
                const deletedBoleto = await Boleto.deleteOne({_id: id});

                if(!deletedBoleto) {
                    return res.status(400).json({success: false})
                }

                res.status(200).json({success: true, data: {} })
            } catch (error) {
                return res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false})
        break;
    }
}