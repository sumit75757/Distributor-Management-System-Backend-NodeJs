import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Table_Name } from "../Constant_Table";
import { BaseModel } from "../Basemodel/basemodel";
import { nameOf } from "../../helpers/helper";
import { DistributorEntity } from "./distributor.model";

@Entity(Table_Name.citys)
@Unique([nameOf<CityEntity>('State'), nameOf<CityEntity>('District'), nameOf<CityEntity>('CityName')])

export class CityEntity extends BaseModel {
    @PrimaryGeneratedColumn('uuid')
    CityId: string

    @Column()
    State: string

    @Column()
    District: string

    @Column()
    CityName: string

    @CreateDateColumn()
    CreatedAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

    @OneToMany(() => DistributorEntity, (distributor)=> distributor.city_details)
    @JoinColumn([
        {
            name: nameOf<CityEntity>('CityId'),
            referencedColumnName: nameOf<DistributorEntity>('CityId')
        }
    ])
    distributor_details: DistributorEntity
    
    static async modify(data: Record<string, any>) { };
};