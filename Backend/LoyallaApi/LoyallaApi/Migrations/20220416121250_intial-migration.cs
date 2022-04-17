using Microsoft.EntityFrameworkCore.Migrations;

namespace LoyallaApi.Migrations
{
    public partial class intialmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuestionsQuestion_Id",
                table: "Answer_tbl",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answer_tbl_QuestionsQuestion_Id",
                table: "Answer_tbl",
                column: "QuestionsQuestion_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Answer_tbl_Question_tbl_QuestionsQuestion_Id",
                table: "Answer_tbl",
                column: "QuestionsQuestion_Id",
                principalTable: "Question_tbl",
                principalColumn: "Question_Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answer_tbl_Question_tbl_QuestionsQuestion_Id",
                table: "Answer_tbl");

            migrationBuilder.DropIndex(
                name: "IX_Answer_tbl_QuestionsQuestion_Id",
                table: "Answer_tbl");

            migrationBuilder.DropColumn(
                name: "QuestionsQuestion_Id",
                table: "Answer_tbl");
        }
    }
}
