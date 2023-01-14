import { Order } from "../model/order.model.js";
export const order=(req,res,next)=>{
    Order.create({
        userId: req.session.erId,
        total: req.body.total*1,
        name : req.body.name,
        mobileNo: req.body.mobileNo,
        deliveryAddress: req.body.deliveryAddress,
        paymentMode: 'CASH',
        items: JSON.parse(req.body.items)
    }).then(result=>{
        return res.status(200).json({message: 'Order placed Successfully'});
    }).catch(err=>{
        return res.status(200).json({message: 'Oops! something went wrong'});
    })
}