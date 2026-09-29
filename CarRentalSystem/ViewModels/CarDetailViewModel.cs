using System.ComponentModel.DataAnnotations;

namespace CarRentalSystem.ViewModels
{
    public class AddCarViewModel
    {
        public int CarId { get; set; }
        public string CarName { get; set; }
        public string CarPlateNumber { get; set; }
        public DateTime CarRegistrationDate { get; set; }
        public DateTime PUCExpiryDate { get; set; }
        public DateTime InsuranceExpiryDate { get; set; }
        public decimal PricePerDay { get; set; }
        public string? RCImageName { get; set; }
        public IFormFile? RCImage { get; set; } 
        public string? PUCImageName { get; set; }
        public IFormFile? PUCImage { get; set; } 
        public string? InsuranceImageName { get; set; }
        public IFormFile? InsuranceImage { get; set; }
        public List<IFormFile> CarImg { get; set; } = new List<IFormFile>();
        public List<CarImageViewModel> CarImages { get; set; } = new List<CarImageViewModel>();
    }
    public class CarImageViewModel
    {
        public int CarImageId { get; set; }
        public string? CarImageName { get; set; }
        public IFormFile? CarImage { get; set; }
        public int CarId { get; set; }
    }
    public class CarBookingDetailViewModel
    {
        public int CarBookingId { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; }
        public int CarIdD { get; set; }
        public int CarIdH { get; set; }
        public string CarName { get; set; }
        public string CarPlateNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal PricePerDay { get; set; }
        public decimal TotalAmount { get; set; }
        public bool isCarDeleted { get; set; }
    }
}
