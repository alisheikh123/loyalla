using Microsoft.EntityFrameworkCore.Migrations;

namespace LoyallaApi.Migrations
{
    public partial class addnewcase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Case_tbl");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Case_tbl",
                type: "text",
                nullable: true);
        }
    }
}
