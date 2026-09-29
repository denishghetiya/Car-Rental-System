using System;
using System.Collections.Generic;

namespace CarRentalSystem.DBContext;

public partial class CarImage
{
    public int CarImageId { get; set; }

    public string CarImageName { get; set; } = null!;

    public int CarId { get; set; }

    public bool IsDeleted { get; set; }

    public virtual CarDetail Car { get; set; } = null!;
}
