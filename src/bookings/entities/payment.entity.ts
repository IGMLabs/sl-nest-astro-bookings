import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Booking } from "./booking.entity";

@Entity("payment")
export class Payment {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => Booking, (booking)=> booking.payment, {eager: true})
    booking: Booking;

    @Column({nullable: false})
    card: string;

    @Column({type: "int", nullable: false})
    amount: number;
}