using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CarRentalSystem.DBContext;

public partial class CarRentalDBContext : DbContext
{
    public CarRentalDBContext(DbContextOptions<CarRentalDBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CarBookingDetail> CarBookingDetails { get; set; }

    public virtual DbSet<CarDetail> CarDetails { get; set; }

    public virtual DbSet<CarImage> CarImages { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserType> UserTypes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CarBookingDetail>(entity =>
        {
            entity.HasKey(e => e.CarBookingId);

            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.PricePerDay).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Car).WithMany(p => p.CarBookingDetails)
                .HasForeignKey(d => d.CarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarBookingDetails_CarId_CarDetails_CarId");

            entity.HasOne(d => d.User).WithMany(p => p.CarBookingDetails)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarBookingDetails_UserId_Users_UserId");
        });

        modelBuilder.Entity<CarDetail>(entity =>
        {
            entity.HasKey(e => e.CarId);

            entity.Property(e => e.CarRegistrationDate).HasColumnType("datetime");
            entity.Property(e => e.InsuranceExpiryDate).HasColumnType("datetime");
            entity.Property(e => e.PricePerDay).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.PucexpiryDate)
                .HasColumnType("datetime")
                .HasColumnName("PUCExpiryDate");
            entity.Property(e => e.PucimageName).HasColumnName("PUCImageName");
            entity.Property(e => e.RcimageName).HasColumnName("RCImageName");
        });

        modelBuilder.Entity<CarImage>(entity =>
        {
            entity.HasOne(d => d.Car).WithMany(p => p.CarImages)
                .HasForeignKey(d => d.CarId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CarImages_CarId_CarDetails_CarId");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ResetTokenExpiry).HasColumnType("datetime");

            entity.HasOne(d => d.UserType).WithMany(p => p.Users)
                .HasForeignKey(d => d.UserTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Users_UserTypeId_UserTypes_UserTypeId");
        });

        modelBuilder.Entity<UserType>(entity =>
        {
            entity.HasKey(e => e.UserTypeId).HasName("PK_UserType");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
