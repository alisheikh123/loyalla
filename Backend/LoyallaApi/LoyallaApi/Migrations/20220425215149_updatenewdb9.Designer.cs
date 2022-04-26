﻿// <auto-generated />
using System;
using LoyallaApi.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace LoyallaApi.Migrations
{
    [DbContext(typeof(LoyallaContext))]
    [Migration("20220425215149_updatenewdb9")]
    partial class updatenewdb9
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("LoyallaApi.DBModels.Anwser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<double>("IsAnwsers")
                        .HasColumnType("double precision");

                    b.Property<double>("OptionId")
                        .HasColumnType("double precision");

                    b.Property<int?>("OptionsId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("OptionsId");

                    b.ToTable("Anwser_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Cases", b =>
                {
                    b.Property<int>("Case_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int?>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreationDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("FileName")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdateDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("Updated_By")
                        .HasColumnType("integer");

                    b.HasKey("Case_Id");

                    b.ToTable("Case_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Feedback", b =>
                {
                    b.Property<int>("Feedback_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("Case_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreationDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Feedbacks")
                        .HasColumnType("text");

                    b.Property<int>("Student_Id")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdateDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.HasKey("Feedback_Id");

                    b.ToTable("Feedback_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Options", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("OptionName")
                        .HasColumnType("text");

                    b.Property<int>("QuestionId")
                        .HasColumnType("integer");

                    b.Property<int?>("QuestionsQuestionId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("QuestionsQuestionId");

                    b.ToTable("Options_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Paper", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("PaperName")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Paper_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Questions", b =>
                {
                    b.Property<int>("QuestionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreationDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<int>("PaperId")
                        .HasColumnType("integer");

                    b.Property<string>("QuestionName")
                        .HasColumnType("text");

                    b.Property<string>("Topic")
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdateDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.HasKey("QuestionId");

                    b.HasIndex("PaperId");

                    b.ToTable("Question_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Signup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<string>("Age")
                        .HasColumnType("text");

                    b.Property<string>("CurrentStatus")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Field")
                        .HasColumnType("text");

                    b.Property<string>("Location")
                        .HasColumnType("text");

                    b.Property<string>("MedicalTraining")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("School")
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.Property<string>("otherField")
                        .HasColumnType("text");

                    b.Property<string>("otherStatus")
                        .HasColumnType("text");

                    b.Property<string>("otherTraining")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Signup");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.StudentCaseAttemptStatus", b =>
                {
                    b.Property<int>("StudentCaseAttemptStatus_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<int>("Case_Id")
                        .HasColumnType("integer");

                    b.Property<int>("Created_By")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("CreationDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Status")
                        .HasColumnType("text");

                    b.Property<int>("Student_Id")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdateDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Updated_By")
                        .HasColumnType("integer");

                    b.HasKey("StudentCaseAttemptStatus_Id");

                    b.ToTable("StudentCaseAttemptStatus_tbl");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Anwser", b =>
                {
                    b.HasOne("LoyallaApi.DBModels.Options", "Options")
                        .WithMany("Anwsers")
                        .HasForeignKey("OptionsId");

                    b.Navigation("Options");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Options", b =>
                {
                    b.HasOne("LoyallaApi.DBModels.Questions", "Questions")
                        .WithMany("Options")
                        .HasForeignKey("QuestionsQuestionId");

                    b.Navigation("Questions");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Questions", b =>
                {
                    b.HasOne("LoyallaApi.DBModels.Paper", "Paper")
                        .WithMany("Questions")
                        .HasForeignKey("PaperId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Paper");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Options", b =>
                {
                    b.Navigation("Anwsers");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Paper", b =>
                {
                    b.Navigation("Questions");
                });

            modelBuilder.Entity("LoyallaApi.DBModels.Questions", b =>
                {
                    b.Navigation("Options");
                });
#pragma warning restore 612, 618
        }
    }
}
