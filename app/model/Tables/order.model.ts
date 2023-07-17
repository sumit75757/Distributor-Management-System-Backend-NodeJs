import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { nameOf } from "../../helpers/helper";
import { ProductEntity } from "./product.model";
import { SalesmenEntity } from "./salesment.model";
import { MerchantEntity } from "./merchant.model";

@Entity(Table_Name.orders)
@Unique([nameOf<OrdersEntity>('ProductId'), nameOf<OrdersEntity>('SalesMen'), nameOf<OrdersEntity>('ProductQuantity')])
export class OrdersEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    OrderId: string

    @Column({type: 'uuid'})
    ProductId: string

    @Column({ type: 'uuid', nullable: true})
    ProductCategoryId: string

    @Column({type: 'uuid'})
    MerchantId: string

    @Column({type: 'uuid', nullable: true })
    SalesmenId: string

    @Column()
    SalesMen: string

    @Column({nullable: true})
    ProductQuantity: string

    @Column()
    OrderDate: Date

    @Column({default: 'Pending'})
    Status: string
    
    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    @ManyToOne(() => ProductEntity)
    @JoinColumn([
        {
            name: nameOf<OrdersEntity>('ProductId'),
            referencedColumnName: nameOf<ProductEntity>('ProductId')
        }
    ])
    product_details: ProductEntity

    @ManyToOne(() => MerchantEntity)
    @JoinColumn([
        {
            name: nameOf<OrdersEntity>('MerchantId'),
            referencedColumnName: nameOf<MerchantEntity>('MerchantId')
        }
    ])
    merchant_details: MerchantEntity

    
    @ManyToOne(() => SalesmenEntity)
    @JoinColumn([
        {
            name: nameOf<OrdersEntity>('SalesmenId'),
            referencedColumnName: nameOf<SalesmenEntity>('SalesmanId')
        }
    ])
    salesmen_details: SalesmenEntity

    static async modify(data: Record<string, any>) { };
};