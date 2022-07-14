import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "product",
    timestamps: false,
  })
export class ProductModel extends Model {

    @PrimaryKey
    @Column
    declare id: string

    @Column
    declare name: string

    @Column
    declare description: string

    @Column
    declare amount: number

    @Column
    declare price: number

}
