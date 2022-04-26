using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LoyallaApi.Migrations
{
    public partial class updatenewdb8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Anwser_tbl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OptionId = table.Column<double>(type: "double precision", nullable: false),
                    IsAnwsers = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Anwser_tbl", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Case_tbl",
                columns: table => new
                {
                    Case_Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    FileName = table.Column<string>(type: "text", nullable: true),
                    Created_By = table.Column<int>(type: "integer", nullable: true),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Updated_By = table.Column<int>(type: "integer", nullable: true),
                    UpdateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Case_tbl", x => x.Case_Id);
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
                name: "Options_tbl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    QuestionId = table.Column<int>(type: "integer", nullable: false),
                    OptionName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Options_tbl", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Paper_tbl",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PaperName = table.Column<string>(type: "text", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paper_tbl", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Question_tbl",
                columns: table => new
                {
                    QuestionId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Topic = table.Column<string>(type: "text", nullable: true),
                    QuestionName = table.Column<string>(type: "text", nullable: true),
                    PaperId = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Created_By = table.Column<int>(type: "integer", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    Updated_By = table.Column<int>(type: "integer", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question_tbl", x => x.QuestionId);
                });

            migrationBuilder.CreateTable(
                name: "Signup",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Location = table.Column<string>(type: "text", nullable: true),
                    CurrentStatus = table.Column<string>(type: "text", nullable: true),
                    MedicalTraining = table.Column<string>(type: "text", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: true),
                    Age = table.Column<string>(type: "text", nullable: true),
                    Field = table.Column<string>(type: "text", nullable: true),
                    School = table.Column<string>(type: "text", nullable: true),
                    otherStatus = table.Column<string>(type: "text", nullable: true),
                    otherTraining = table.Column<string>(type: "text", nullable: true),
                    otherField = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Signup", x => x.Id);
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
                name: "Anwser_tbl");

            migrationBuilder.DropTable(
                name: "Case_tbl");

            migrationBuilder.DropTable(
                name: "Feedback_tbl");

            migrationBuilder.DropTable(
                name: "Options_tbl");

            migrationBuilder.DropTable(
                name: "Paper_tbl");

            migrationBuilder.DropTable(
                name: "Question_tbl");

            migrationBuilder.DropTable(
                name: "Signup");

            migrationBuilder.DropTable(
                name: "StudentCaseAttemptStatus_tbl");
        }
    }
}
