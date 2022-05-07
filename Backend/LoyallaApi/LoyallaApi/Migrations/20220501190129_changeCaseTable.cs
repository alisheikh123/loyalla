using Microsoft.EntityFrameworkCore.Migrations;

namespace LoyallaApi.Migrations
{
    public partial class changeCaseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CaseId",
                table: "Paper_tbl",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CasesCase_Id",
                table: "Paper_tbl",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Paper_tbl_CasesCase_Id",
                table: "Paper_tbl",
                column: "CasesCase_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Paper_tbl_Case_tbl_CasesCase_Id",
                table: "Paper_tbl",
                column: "CasesCase_Id",
                principalTable: "Case_tbl",
                principalColumn: "Case_Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Paper_tbl_Case_tbl_CasesCase_Id",
                table: "Paper_tbl");

            migrationBuilder.DropIndex(
                name: "IX_Paper_tbl_CasesCase_Id",
                table: "Paper_tbl");

            migrationBuilder.DropColumn(
                name: "CaseId",
                table: "Paper_tbl");

            migrationBuilder.DropColumn(
                name: "CasesCase_Id",
                table: "Paper_tbl");
        }
    }
}
