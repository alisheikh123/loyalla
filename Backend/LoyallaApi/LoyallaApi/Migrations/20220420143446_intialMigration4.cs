using Microsoft.EntityFrameworkCore.Migrations;

namespace LoyallaApi.Migrations
{
    public partial class intialMigration4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PaperId",
                table: "Question_tbl",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaperId",
                table: "Question_tbl");
        }
    }
}
