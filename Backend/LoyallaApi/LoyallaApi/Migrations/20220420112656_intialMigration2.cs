using Microsoft.EntityFrameworkCore.Migrations;

namespace LoyallaApi.Migrations
{
    public partial class intialMigration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Question_tbl_Options_tbl_OptionIdId",
                table: "Question_tbl");

            migrationBuilder.DropIndex(
                name: "IX_Question_tbl_OptionIdId",
                table: "Question_tbl");

            migrationBuilder.DropColumn(
                name: "OptionIdId",
                table: "Question_tbl");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OptionIdId",
                table: "Question_tbl",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Question_tbl_OptionIdId",
                table: "Question_tbl",
                column: "OptionIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_Question_tbl_Options_tbl_OptionIdId",
                table: "Question_tbl",
                column: "OptionIdId",
                principalTable: "Options_tbl",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
