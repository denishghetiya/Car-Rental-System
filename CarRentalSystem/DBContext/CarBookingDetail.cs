using System;
using System.Collections.Generic;

namespace CarRentalSystem.DBContext;

public partial class CarBookingDetail
{
    public int CarBookingId { get; set; }

    public int UserId { get; set; }

    public int CarId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public decimal PricePerDay { get; set; }

    public decimal TotalAmount { get; set; }

    public bool IsDeleted { get; set; }

    public virtual CarDetail Car { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
