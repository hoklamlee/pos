using Microsoft.EntityFrameworkCore.Migrations;

namespace POS.Migrations
{
    public partial class updatenuable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Quatity",
                table: "OrderItems",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<long>(
                name: "Price",
                table: "OrderItems",
                nullable: true,
                oldClrType: typeof(long));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Quatity",
                table: "OrderItems",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "Price",
                table: "OrderItems",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);
        }
    }
}
