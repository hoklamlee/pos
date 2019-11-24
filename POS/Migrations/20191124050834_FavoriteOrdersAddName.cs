using Microsoft.EntityFrameworkCore.Migrations;

namespace POS.Migrations
{
    public partial class FavoriteOrdersAddName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "FavouriteOrders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "name",
                table: "FavouriteOrders");
        }
    }
}
