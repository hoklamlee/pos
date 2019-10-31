using Microsoft.EntityFrameworkCore.Migrations;

namespace POS.Migrations
{
    public partial class addactiveforinventory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "Inventorys",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "Inventorys");
        }
    }
}
