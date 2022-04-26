using Microsoft.EntityFrameworkCore.Migrations;

namespace LoyallaApi.Migrations
{
    public partial class updatenewdb9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuestionsQuestionId",
                table: "Options_tbl",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OptionsId",
                table: "Anwser_tbl",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Question_tbl_PaperId",
                table: "Question_tbl",
                column: "PaperId");

            migrationBuilder.CreateIndex(
                name: "IX_Options_tbl_QuestionsQuestionId",
                table: "Options_tbl",
                column: "QuestionsQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Anwser_tbl_OptionsId",
                table: "Anwser_tbl",
                column: "OptionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Anwser_tbl_Options_tbl_OptionsId",
                table: "Anwser_tbl",
                column: "OptionsId",
                principalTable: "Options_tbl",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Options_tbl_Question_tbl_QuestionsQuestionId",
                table: "Options_tbl",
                column: "QuestionsQuestionId",
                principalTable: "Question_tbl",
                principalColumn: "QuestionId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Question_tbl_Paper_tbl_PaperId",
                table: "Question_tbl",
                column: "PaperId",
                principalTable: "Paper_tbl",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Anwser_tbl_Options_tbl_OptionsId",
                table: "Anwser_tbl");

            migrationBuilder.DropForeignKey(
                name: "FK_Options_tbl_Question_tbl_QuestionsQuestionId",
                table: "Options_tbl");

            migrationBuilder.DropForeignKey(
                name: "FK_Question_tbl_Paper_tbl_PaperId",
                table: "Question_tbl");

            migrationBuilder.DropIndex(
                name: "IX_Question_tbl_PaperId",
                table: "Question_tbl");

            migrationBuilder.DropIndex(
                name: "IX_Options_tbl_QuestionsQuestionId",
                table: "Options_tbl");

            migrationBuilder.DropIndex(
                name: "IX_Anwser_tbl_OptionsId",
                table: "Anwser_tbl");

            migrationBuilder.DropColumn(
                name: "QuestionsQuestionId",
                table: "Options_tbl");

            migrationBuilder.DropColumn(
                name: "OptionsId",
                table: "Anwser_tbl");
        }
    }
}
