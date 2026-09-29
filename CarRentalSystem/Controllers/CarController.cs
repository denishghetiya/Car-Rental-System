using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text.RegularExpressions;
using CarRentalSystem.DBContext;
using CarRentalSystem.Helper;
using CarRentalSystem.ViewModels;

namespace CarRentalSystem.Controllers
{
    [Authorize]
    public class CarController : Controller
    {
        private readonly CarRentalDBContext _context;
        private readonly IWebHostEnvironment _webHost;
        private readonly EncryptionHelper _encryptionHelper;

        public CarController(CarRentalDBContext context, IWebHostEnvironment webHost, EncryptionHelper encryptionHelper)
        {
            _context = context;
            _webHost = webHost;
            _encryptionHelper = encryptionHelper;
        }

        [HttpGet]
        public async Task<IActionResult> CarDetailList()
        {
            if(User.FindFirstValue("UserTypeName") != "Admin")
            {
                return RedirectToAction("AccessDenied", "Login");
            }
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> CarDetailList([FromBody] RequestPaginationViewModel model)
        {
            if (User.FindFirstValue("UserTypeName") != "Admin")
            {
                return RedirectToAction("AccessDenied", "Login");
            }
            var query = _context.CarDetails
                .Where(u => u.IsDeleted != true)
                .AsQueryable();

            var totalCount = query.Count();

            var Order = query
                .Skip(model.Start)
                .Take(model.Length)
                .Select(a => new AddCarViewModel
                {
                    CarId = a.CarId,
                    CarName = a.CarName,
                    CarPlateNumber = a.CarPlateNumber,
                    CarRegistrationDate = a.CarRegistrationDate,
                    PUCExpiryDate = a.PucexpiryDate,
                    InsuranceExpiryDate = a.InsuranceExpiryDate,
                    PricePerDay = a.PricePerDay,
                }).OrderByDescending(a => a.CarId).ToList();

            return Json(new
            {
                draw = model.Draw,
                recordsTotal = totalCount,
                recordsFiltered = totalCount,
                data = Order
            });
        }
        [HttpGet]
        public async Task<IActionResult> AddCarDetails(int? carId)
        {
            if (User.FindFirstValue("UserTypeName") != "Admin")
            {
                return RedirectToAction("AccessDenied", "Login");
            }
            if (carId == 0 || carId == null)
            {
                var model = new AddCarViewModel
                {
                    CarRegistrationDate = DateTime.Today,
                    PUCExpiryDate = DateTime.Today,
                    InsuranceExpiryDate = DateTime.Today,
                    //CarImages = new List<CarImageViewModel>()
                    //{
                    //    new CarImageViewModel
                    //    {
                    //    
                    //    }
                    //}.ToList()
                };
                return View(model);
            }
            if (carId > 0)
            {
                var cardetail = _context.CarDetails.Include(f => f.CarImages.Where(e => e.IsDeleted != true)).FirstOrDefault(f => f.CarId == carId && f.IsDeleted != true);
                var model = new AddCarViewModel
                {
                    CarId = cardetail.CarId,
                    CarName = cardetail.CarName,
                    CarPlateNumber = cardetail.CarPlateNumber,
                    CarRegistrationDate = cardetail.CarRegistrationDate,
                    PUCExpiryDate = cardetail.PucexpiryDate,
                    InsuranceExpiryDate = cardetail.InsuranceExpiryDate,
                    PricePerDay = cardetail.PricePerDay,
                    RCImageName = $"/Uploads/{cardetail.RcimageName}",
                    PUCImageName = $"/Uploads/{cardetail.PucimageName}",
                    InsuranceImageName = $"/Uploads/{cardetail.InsuranceImageName}",
                    CarImages = cardetail.CarImages.Where(oi => oi.IsDeleted != true).Select(oi => new CarImageViewModel
                    {
                        CarImageId = oi.CarImageId,
                        CarImageName = $"/Uploads/{oi.CarImageName}",
                        CarId = oi.CarId
                    }).ToList()
                };
                return View("EditCarDetails",model);
            }
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> AddCarDetails(AddCarViewModel model)
        {
            if (User.FindFirstValue("UserTypeName") != "Admin")
            {
                return RedirectToAction("AccessDenied", "Login");
            }
            if (model.CarId == 0)
            {
                var oldcar = _context.CarDetails.Any(c => c.CarPlateNumber == model.CarPlateNumber && c.IsDeleted != true);
                if (oldcar == true)
                {
                    return Json(new { success = false, message = "This Plate Number car is already exist." });
                }
                if (model.CarImg.Count == 0)
                {
                    if (model.CarImages.Any(c=>c.CarImage != null) == false)
                    {
                        return Json(new { success = false, message = "Please select image." });
                    }
                }

                var newcar = new CarDetail
                {
                    CarName = model.CarName,
                    CarPlateNumber = model.CarPlateNumber,
                    CarRegistrationDate = model.CarRegistrationDate,
                    PucexpiryDate = model.PUCExpiryDate,
                    InsuranceExpiryDate = model.InsuranceExpiryDate,
                    PricePerDay = model.PricePerDay
                };
                newcar.RcimageName = await SaveImage(model.RCImage,"");
                newcar.PucimageName = await SaveImage(model.PUCImage,"");
                newcar.InsuranceImageName = await SaveImage(model.InsuranceImage,"");
                foreach (var image in model.CarImages)
                {
                    if (image.CarImage != null) {
                        var carImage = new CarImage
                        {
                            CarImageName = await SaveImage(image.CarImage, "")
                        };
                        newcar.CarImages.Add(carImage);
                    }
                }
                foreach (var image in model.CarImg)
                {
                    if (image != null)
                    {
                        var carImage = new CarImage
                        {
                            CarImageName = await SaveImage(image, "")
                        };
                        newcar.CarImages.Add(carImage);
                    }
                }
                _context.CarDetails.Add(newcar);
                await _context.SaveChangesAsync();
                return Json(new { success = true, message = "New Car saved successfully." });
            }
            if (model.CarId > 0)
            {
                var oldcar = _context.CarDetails.Any(c =>c.CarId != model.CarId && c.CarPlateNumber == model.CarPlateNumber && c.IsDeleted != true);
                if (oldcar == true)
                {
                    return Json(new { success = false, message = "This Plate Number car is already exist." });
                }

                var car = await _context.CarDetails.Include(f => f.CarImages.Where(e => e.IsDeleted != true)).FirstOrDefaultAsync(f => f.CarId == model.CarId && f.IsDeleted != true);
                if (car == null) return Json(new { success = false, message = "Car Not Found." });

                car.CarName = model.CarName;
                car.CarPlateNumber = model.CarPlateNumber;
                car.CarRegistrationDate = model.CarRegistrationDate;
                car.PucexpiryDate = model.PUCExpiryDate;
                car.InsuranceExpiryDate = model.InsuranceExpiryDate;
                car.PricePerDay = model.PricePerDay;
                if (model.RCImage != null)
                {
                    car.RcimageName = await SaveImage(model.RCImage,model.RCImageName);
                }
                if (model.PUCImage != null)
                {
                    car.PucimageName = await SaveImage(model.PUCImage,model.PUCImageName);
                }
                if (model.InsuranceImage != null)
                {
                    car.InsuranceImageName = await SaveImage(model.InsuranceImage,model.InsuranceImageName);
                }
                if (model.CarImages != null)
                {
                    var oldimage = car.CarImages.Where(oi => !model.CarImages.Any(io => io != null && io.CarImageId == oi.CarImageId)).ToList();
                    foreach (var image in oldimage)
                    {
                        var imagePath = Path.Combine(_webHost.WebRootPath, "Uploads", image.CarImageName);
                        if (System.IO.File.Exists(imagePath))
                        {
                            System.IO.File.Delete(imagePath);
                            image.IsDeleted = true;
                            _context.CarImages.Update(image);
                        }
                    }
                    foreach (var image in model.CarImages)
                    {
                        if (image.CarImage != null) {
                            var carImage = car.CarImages.FirstOrDefault(c=>c.CarImageId == image.CarImageId && c.CarImageId != 0 && c.IsDeleted != true);
                            if (carImage != null)
                            {
                                carImage.CarImageName = await SaveImage(image.CarImage, carImage.CarImageName);
                            }
                            else
                            {
                                car.CarImages.Add(new CarImage
                                {
                                    CarImageName = await SaveImage(image.CarImage, "")
                                });
                            }
                        }
                    }
                }
                foreach (var image in model.CarImg)
                {
                    var carImage = new CarImage
                    {
                        CarImageName = await SaveImage(image, "")
                    };
                    car.CarImages.Add(carImage);
                }
                _context.CarDetails.Update(car);
                await _context.SaveChangesAsync();
                return Json(new { success = true, message = "CarDetail updated successfully." });
            }
            return Json(new { success = false, message = "Something went wrong." });
        }
        public async Task<string> SaveImage(IFormFile file, string? oldfilename)
        {
            var uploadsFolder = Path.Combine(_webHost.WebRootPath, "Uploads");
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }
            if (!string.IsNullOrEmpty(oldfilename)) {
                var oldImagePath = Path.Combine(uploadsFolder, oldfilename);
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }
            }
            var timeStamp = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            var originalFileName = Path.GetFileNameWithoutExtension(file.FileName);
            var extension = Path.GetExtension(file.FileName);
            var uniqueFileName = $"{originalFileName}_{timeStamp}{extension}";

            var fileSavePath = Path.Combine(uploadsFolder, uniqueFileName);
            using (var stream = new FileStream(fileSavePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return uniqueFileName;
        }
        public async Task<IActionResult> DeleteCarDetail(int? carId)
        {
            if (User.FindFirstValue("UserTypeName") != "Admin")
            {
                return RedirectToAction("AccessDenied", "Login");
            }
            var carbook = _context.CarBookingDetails.Any(a => a.CarId == carId && (a.StartDate >= DateTime.Today || a.EndDate >= DateTime.Today) && a.IsDeleted != true);
            if (carbook == true)
            {
                return Json(new { success = false, message = "CarDetail is booked thats why cann't deleted." });
            }
            var car = _context.CarDetails.Include(a => a.CarImages).FirstOrDefault(a => a.CarId == carId && a.IsDeleted != true);
            car.IsDeleted = true;
            car.CarImages.Where(oi => oi.IsDeleted != true).ToList().ForEach(ii => ii.IsDeleted = true);
            _context.CarDetails.Update(car);
            await _context.SaveChangesAsync();
            return Json(new { success = true, message = "CarDetail deleted successfully." });
        }
    }
}


