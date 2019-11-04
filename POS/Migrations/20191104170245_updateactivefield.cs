using Microsoft.EntityFrameworkCore.Migrations;

namespace POS.Migrations
{
    public partial class updateactivefield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Users",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Active",
                table: "Inventorys",
                nullable: false,
                defaultValue: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "Users");
        }
    }
}
