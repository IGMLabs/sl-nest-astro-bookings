import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema( { collection: 'agencies', _id: true, timestamps: true})
export class Agency extends Document {

  @Prop({required: true, index: true})
    id: string;
    @Prop({required: true})
    name: string;
  }

export const AgencySchema = SchemaFactory.createForClass(Agency);
AgencySchema.index({id: 1}) 
