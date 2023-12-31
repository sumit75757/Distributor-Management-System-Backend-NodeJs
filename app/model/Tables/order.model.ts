import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { nameOf } from "../../helpers/helper";
import { MerchantEntity } from "./merchant.model";
import { ProductCategoryEntity } from "./productCategory.model";
import { UserInfoEntity } from "./userInfo.model";
import { DistributorEntity } from "./distributor.model";

@Entity(Table_Name.orders)
@Unique([nameOf<OrdersEntity>('ProductId'), nameOf<OrdersEntity>('SalesMen'), nameOf<OrdersEntity>('ProductQuantity')])
export class OrdersEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    OrderId: string

    @Column({type: 'uuid'})
    ProductId: string

    @Column({ type: 'uuid', nullable: true})
    ProductCategoryId: string

    @Column({ type: 'uuid', nullable: true})
    DistributorId: string

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

    @Column({nullable: true})
    Packing: string

    @Column({nullable: true})
    NOS: string

    @Column({nullable: true})
    Scheme: string

    @Column({default: 'Pending'})
    Status: string
    
    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    @ManyToOne(() => ProductCategoryEntity)
    @JoinColumn([
        {
            name: nameOf<OrdersEntity>('ProductCategoryId'),
            referencedColumnName: nameOf<ProductCategoryEntity>('ProductCategoryId')
        }
    ])
    product_cat_details: ProductCategoryEntity

    @ManyToOne(() => MerchantEntity)
    @JoinColumn([
        {
            name: nameOf<OrdersEntity>('MerchantId'),
            referencedColumnName: nameOf<MerchantEntity>('MerchantId')
        }
    ])
    merchant_details: MerchantEntity

    @ManyToOne(() => DistributorEntity)
    @JoinColumn([
        {
            name: nameOf<OrdersEntity>('DistributorId'),
            referencedColumnName: nameOf<DistributorEntity>('DistributorId')
        }
    ])
    distributor_details: DistributorEntity

    
    @ManyToOne(() => UserInfoEntity)
    @JoinColumn([
        {
            name: nameOf<OrdersEntity>('SalesmenId'),
            referencedColumnName: nameOf<UserInfoEntity>('UserId')
        }
    ])
    salesmen_details: UserInfoEntity

    static async modify(data: Record<string, any>) { };
};