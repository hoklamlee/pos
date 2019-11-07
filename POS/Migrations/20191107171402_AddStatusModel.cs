using Microsoft.EntityFrameworkCore.Migrations;

namespace POS.Migrations
{
    public partial class AddStatusModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventorys_Users_CreatedBy_UserId",
                table: "Inventorys");

            migrationBuilder.DropForeignKey(
                name: "FK_Inventorys_Users_ModifiedBy_UserId",
                table: "Inventorys");

            migrationBuilder.DropIndex(
                name: "IX_Inventorys_CreatedBy_UserId",
                table: "Inventorys");

            migrationBuilder.DropIndex(
                name: "IX_Inventorys_ModifiedBy_UserId",
                table: "Inventorys");

            migrationBuilder.AddColumn<int>(
                name: "CreatedByUserId",
                table: "Inventorys",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ModifiedByUserId",
                table: "Inventorys",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Inventorys_CreatedByUserId",
                table: "Inventorys",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventorys_ModifiedByUserId",
                table: "Inventorys",
                column: "ModifiedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventorys_Users_CreatedByUserId",
                table: "Inventorys",
                column: "CreatedByUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inventorys_Users_ModifiedByUserId",
                table: "Inventorys",
                column: "ModifiedByUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventorys_Users_CreatedByUserId",
                table: "Inventorys");

            migrationBuilder.DropForeignKey(
                name: "FK_Inventorys_Users_ModifiedByUserId",
                table: "Inventorys");

            migrationBuilder.DropIndex(
                name: "IX_Inventorys_CreatedByUserId",
                table: "Inventorys");

            migrationBuilder.DropIndex(
                name: "IX_Inventorys_ModifiedByUserId",
                table: "Inventorys");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "Inventorys");

            migrationBuilder.DropColumn(
                name: "ModifiedByUserId",
                table: "Inventorys");

            migrationBuilder.CreateIndex(
                name: "IX_Inventorys_CreatedBy_UserId",
                table: "Inventorys",
                column: "CreatedBy_UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventorys_ModifiedBy_UserId",
                table: "Inventorys",
                column: "ModifiedBy_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventorys_Users_CreatedBy_UserId",
                table: "Inventorys",
                column: "CreatedBy_UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inventorys_Users_ModifiedBy_UserId",
                table: "Inventorys",
                column: "ModifiedBy_UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
