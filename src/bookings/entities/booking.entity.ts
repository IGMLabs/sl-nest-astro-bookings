import { Trip } from "src/trips/entities/trip.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Payment } from "./payment.entity";

@Entity("bookings")
export class Booking {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => Trip )
    trip: Trip;

    @Column({ nullable: false })
    client: string;

    @Column({ type: "int", default: 1 })
    passengers: number;

    @Column({ type: "timestamp", default: () => "now()" })
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;
    
    @OneToOne(() => Payment, (payment) => payment.booking, {eager: true, cascade: true})
    payment: Payment;

}