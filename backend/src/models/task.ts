import { Sequelize, DataTypes, Model, type InferAttributes, type InferCreationAttributes } from "sequelize";

export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task, { omit: "id" }>> {
    declare id: number;
    declare name: string;
    declare description: string;
    declare priority: number;
    declare completed: boolean;
}

export function initTaskModel(sequelize: Sequelize) {
    Task.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            priority: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                    max: 10
                }
            },
            completed: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
            sequelize,
            timestamps: false
        }
    )
}