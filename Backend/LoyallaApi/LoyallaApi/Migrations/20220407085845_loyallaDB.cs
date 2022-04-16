using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LoyallaApi.Migrations
{
    public partial class loyallaDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Answer_tbl",
                columns: table => new
                {
                    Answer_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Question_Id = table.Column<int>(type: "integer", nullable: false),
                    Answer = table.Column<string>(type: "text", nullable: true),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answer_tbl", x => x.Answer_Id);
                });

            migrationBuilder.CreateTable(
                name: "Case_tbl",
                columns: table => new
                {
                    Case_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Case_tbl", x => x.Case_Id);
                });

            migrationBuilder.CreateTable(
                name: "CaseQuestionAnswers_tbl",
                columns: table => new
                {
                    CaseQuestionAnswer_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Case_Id = table.Column<int>(type: "integer", nullable: false),
                    Answer_Id = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseQuestionAnswers_tbl", x => x.CaseQuestionAnswer_Id);
                });

            migrationBuilder.CreateTable(
                name: "Feedback_tbl",
                columns: table => new
                {
                    Feedback_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Case_Id = table.Column<int>(type: "integer", nullable: false),
                    Student_Id = table.Column<int>(type: "integer", nullable: false),
                    Feedbacks = table.Column<string>(type: "text", nullable: true),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedback_tbl", x => x.Feedback_Id);
                });

            migrationBuilder.CreateTable(
                name: "Question_tbl",
                columns: table => new
                {
                    Question_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Question = table.Column<string>(type: "text", nullable: true),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question_tbl", x => x.Question_Id);
                });

            migrationBuilder.CreateTable(
                name: "Student_tbl",
                columns: table => new
                {
                    Student_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Student_Name = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: true),
                    Age = table.Column<int>(type: "integer", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: true),
                    Field = table.Column<string>(type: "text", nullable: true),
                    Current_Status = table.Column<string>(type: "text", nullable: true),
                    Current_Year_Of_Medical_School = table.Column<string>(type: "text", nullable: true),
                    Current_Year_Of_Medical_Traning = table.Column<string>(type: "text", nullable: true),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student_tbl", x => x.Student_Id);
                });

            migrationBuilder.CreateTable(
                name: "StudentCaseAttemptStatus_tbl",
                columns: table => new
                {
                    StudentCaseAttemptStatus_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Case_Id = table.Column<int>(type: "integer", nullable: false),
                    Student_Id = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: true),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentCaseAttemptStatus_tbl", x => x.StudentCaseAttemptStatus_Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answer_tbl");

            migrationBuilder.DropTable(
                name: "Case_tbl");

            migrationBuilder.DropTable(
                name: "CaseQuestionAnswers_tbl");

            migrationBuilder.DropTable(
                name: "Feedback_tbl");

            migrationBuilder.DropTable(
                name: "Question_tbl");

            migrationBuilder.DropTable(
                name: "Student_tbl");

            migrationBuilder.DropTable(
                name: "StudentCaseAttemptStatus_tbl");
        }
    }
}
