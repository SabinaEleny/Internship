import { Schema, model, Document, Types } from 'mongoose';

export interface IOrder extends Document {
    user: Types.ObjectId;
    productsPurchased: {
        product: Types.ObjectId;
        quantity: number;
    }[];
    totalAmount: number;
}

const OrderSchema: Schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        productsPurchased: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true, min: 1 },
            },
        ],
        totalAmount: { type: Number, required: true },
    },
    {
        versionKey: false
    }
);


export default model<IOrder>('Order', OrderSchema);

