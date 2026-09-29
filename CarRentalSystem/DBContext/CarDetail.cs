using System;
using System.Collections.Generic;

namespace CarRentalSystem.DBContext;

public partial class CarDetail
{
    public int CarId { get; set; }

    public string CarName { get; set; } = null!;

    public string CarPlateNumber { get; set; } = null!;

    public DateTime CarRegistrationDate { get; set; }

    public DateTime PucexpiryDate { get; set; }

    public DateTime InsuranceExpiryDate { get; set; }

    public decimal PricePerDay { get; set; }

    public string RcimageName { get; set; } = null!;

    public string PucimageName { get; set; } = null!;

    public string InsuranceImageName { get; set; } = null!;

    public bool IsOnRent { get; set; }

    public bool IsDeleted { get; set; }

    public virtual ICollection<CarBookingDetail> CarBookingDetails { get; set; } = new List<CarBookingDetail>();

    public virtual ICollection<CarImage> CarImages { get; set; } = new List<CarImage>();
}
