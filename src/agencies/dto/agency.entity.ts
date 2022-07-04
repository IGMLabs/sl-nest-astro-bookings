import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ collection: "agencies", _id: true, timestamps: true })
export class Agency {
  @Prop({ required: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false, index: true })
  range?: string;

  @Prop({ required: false, index: true })
  status?: boolean;

  @Prop({ required: false, index: false })
  fee?: number;
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
AgencySchema.index({ range: 1, status: 1 });
