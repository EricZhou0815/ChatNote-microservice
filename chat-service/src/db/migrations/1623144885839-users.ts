import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class users1623144885839 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		// create user table
		await queryRunner.createTable(
			new Table({
				columns: [
					{
						isPrimary: true,
						length: "36",
						name: "id",
						type: "char"
					},
					{
						length: "25",
						name: "username",
						type: "varchar"
					},
					{
						length: "60",
						name: "password",
						type: "char"
					},
					{
						default: "now()",
						name: "createdAt",
						type: "timestamp"
					},
				],
				name: "users",
			})
		)

		// create index on username
		await queryRunner.createIndex(
			"users",
			new TableIndex({
				columnNames: ["username"],
				isUnique: true,
				name: "unique_username",
			})
		)

	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users")
	}
}
