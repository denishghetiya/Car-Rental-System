using System;
using System.Collections.Generic;

namespace CarRentalSystem.DBContext;

public partial class User
{
    public int UserId { get; set; }

    public int UserTypeId { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? ImageName { get; set; }

    public DateTime CreatedDate { get; set; }

    public string? ResetToken { get; set; }

    public DateTime? ResetTokenExpiry { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public virtual ICollection<CarBookingDetail> CarBookingDetails { get; set; } = new List<CarBookingDetail>();

    public virtual UserType UserType { get; set; } = null!;
}
