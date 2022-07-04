import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "users", _id: true, timestamps: false })
export class User extends Document {
  @Prop({ required: true, index: true })
  public id: string;

  @Prop({ required: false })
  public name?: string;

  @Prop({ required: true, index: true })
  public email: string;

  @Prop()
  public password: string;

  @Prop()
  public createdAt: Date;

  @Prop()
  public updatedAt: Date;

  @Prop({ required: false })
  public roles?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1, password: 1 });
