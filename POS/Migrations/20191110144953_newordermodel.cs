using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace POS.Migrations
{
    public partial class newordermodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OrderDate = table.Column<DateTime>(nullable: true),
                    Remark = table.Column<string>(nullable: true),
                    DeliverById = table.Column<int>(nullable: true),
                    DeliverDate = table.Column<DateTime>(nullable: true),
                    StatusId = table.Column<int>(nullable: true),
                    PurchaserId = table.Column<int>(nullable: true),
                    Active = table.Column<bool>(nullable: false),
                    CreatedByUserId = table.Column<int>(nullable: true),
                    CreatedBy_UserId = table.Column<int>(nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedByUserId = table.Column<int>(nullable: true),
                    ModifiedBy_UserId = table.Column<int>(nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Orders_Users_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_Users_DeliverById",
                        column: x => x.DeliverById,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_Users_ModifiedByUserId",
                        column: x => x.ModifiedByUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_Purchasers_PurchaserId",
                        column: x => x.PurchaserId,
                        principalTable: "Purchasers",
                        principalColumn: "PurchaserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_Statuses_StatusId",
                        column: x => x.StatusId,
                        principalTable: "Statuses",
                        principalColumn: "StatusId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CreatedByUserId",
                table: "Orders",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DeliverById",
                table: "Orders",
                column: "DeliverById");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ModifiedByUserId",
                table: "Orders",
                column: "ModifiedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PurchaserId",
                table: "Orders",
                column: "PurchaserId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_StatusId",
                table: "Orders",
                column: "StatusId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
