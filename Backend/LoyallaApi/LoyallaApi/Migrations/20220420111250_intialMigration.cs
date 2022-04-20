using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LoyallaApi.Migrations
{
    public partial class intialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answer_tbl");

            migrationBuilder.DropTable(
                name: "CaseQuestionAnswers_tbl");

            migrationBuilder.DropTable(
                name: "Student_tbl");

            migrationBuilder.AddColumn<int>(
                name: "OptionIdId",
                table: "Question_tbl",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QuestionType",
                table: "Question_tbl",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Options_tbl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QuestionId = table.Column<int>(type: "integer", nullable: false),
                    OptionName = table.Column<string>(type: "text", nullable: true),
                    IsAnswer = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Options_tbl", x => x.Id);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Question_tbl_Options_tbl_OptionIdId",
                table: "Question_tbl");

            migrationBuilder.DropTable(
                name: "Options_tbl");

            migrationBuilder.DropIndex(
                name: "IX_Question_tbl_OptionIdId",
                table: "Question_tbl");

            migrationBuilder.DropColumn(
                name: "OptionIdId",
                table: "Question_tbl");

            migrationBuilder.DropColumn(
                name: "QuestionType",
                table: "Question_tbl");

            migrationBuilder.CreateTable(
                name: "Answer_tbl",
                columns: table => new
                {
                    Answer_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Answer = table.Column<string>(type: "text", nullable: true),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Question_Id = table.Column<int>(type: "integer", nullable: false),
                    QuestionsQuestion_Id = table.Column<int>(type: "integer", nullable: true),
                    UpdateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Updated_By = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answer_tbl", x => x.Answer_Id);
                    table.ForeignKey(
                        name: "FK_Answer_tbl_Question_tbl_QuestionsQuestion_Id",
                        column: x => x.QuestionsQuestion_Id,
                        principalTable: "Question_tbl",
                        principalColumn: "Question_Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CaseQuestionAnswers_tbl",
                columns: table => new
                {
                    CaseQuestionAnswer_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Answer_Id = table.Column<int>(type: "integer", nullable: false),
                    Case_Id = table.Column<int>(type: "integer", nullable: false),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    UpdateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Updated_By = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseQuestionAnswers_tbl", x => x.CaseQuestionAnswer_Id);
                });

            migrationBuilder.CreateTable(
                name: "Student_tbl",
                columns: table => new
                {
                    Student_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Address = table.Column<string>(type: "text", nullable: true),
                    Age = table.Column<int>(type: "integer", nullable: false),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Current_Status = table.Column<string>(type: "text", nullable: true),
                    Current_Year_Of_Medical_School = table.Column<string>(type: "text", nullable: true),
                    Current_Year_Of_Medical_Traning = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Field = table.Column<string>(type: "text", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: true),
                    Student_Name = table.Column<string>(type: "text", nullable: true),
                    UpdateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Updated_By = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student_tbl", x => x.Student_Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answer_tbl_QuestionsQuestion_Id",
                table: "Answer_tbl",
                column: "QuestionsQuestion_Id");
        }
    }
}
