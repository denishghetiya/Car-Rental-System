using CarRentalSystem.DBContext;
using CarRentalSystem.Helper;
using CarRentalSystem.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace CarRentalSystem.Controllers
{
    [Authorize]
    public class CarBookingController : Controller
    {
        private readonly CarRentalDBContext _context;
        private readonly IWebHostEnvironment _webHost;
        private readonly EncryptionHelper _encryptionHelper;

        public CarBookingController(CarRentalDBContext context, IWebHostEnvironment webHost, EncryptionHelper encryptionHelper)
        {
            _context = context;
            _webHost = webHost;
            _encryptionHelper = encryptionHelper;
        }

        [HttpGet]
        public async Task<IActionResult> CarBookingList()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> CarBookingList([FromBody] RequestPaginationViewModel model)
        {
            
            var query = _context.CarBookingDetails.Include(u => u.User).Include(c => c.Car)
                .Where(u => u.IsDeleted != true)
                .AsQueryable();
            if (User.FindFirstValue("UserTypeName") == "User")
            {
                int userId = int.Parse(User.FindFirstValue("UserId"));
                query = query.Where(u => u.UserId == userId);
            }

            var totalCount = query.Count();

            var Order = query
                .Skip(model.Start)
                .Take(model.Length)
                .Select(a => new CarBookingDetailViewModel
                {
                    CarBookingId = a.CarBookingId,
                    UserId = a.UserId,
                    Username = a.User.Username,
                    CarIdD = a.CarId,
                    CarName = a.Car.CarName,
                    StartDate = a.StartDate,
                    EndDate = a.EndDate,
                    PricePerDay = a.PricePerDay,
                    TotalAmount = a.TotalAmount,
                    isCarDeleted = a.Car.IsDeleted
                }).OrderByDescending(a => a.CarBookingId).ToList();

            return Json(new
            {
                draw = model.Draw,
                recordsTotal = totalCount,
                recordsFiltered = totalCount,
                data = Order
            });
        }
        [HttpGet]
        public async Task<IActionResult> AddCarBooking(int? carBookingId)
        {
            if (carBookingId == 0 || carBookingId == null)
            {
                var model = new CarBookingDetailViewModel
                {
                    StartDate = DateTime.Today,
                    EndDate = DateTime.Today,
                };
                return View(model);
            }
            if (carBookingId > 0)
            {
                if (User.FindFirstValue("UserTypeName") != "Admin")
                {
                    return RedirectToAction("AccessDenied", "Login");
                }
                var carbookingdetail = _context.CarBookingDetails.Include(f => f.Car).Include(f => f.User).FirstOrDefault(f => f.CarBookingId == carBookingId && f.IsDeleted != true);
                var model = new CarBookingDetailViewModel
                {
                    CarBookingId = carbookingdetail.CarBookingId,
                    UserId = carbookingdetail.UserId,
                    CarIdD = carbookingdetail.CarId,
                    CarIdH = carbookingdetail.CarId,
                    CarName = carbookingdetail.Car.CarName,
                    StartDate = carbookingdetail.StartDate,
                    EndDate = carbookingdetail.EndDate,
                    PricePerDay = carbookingdetail.PricePerDay,
                    TotalAmount = carbookingdetail.TotalAmount
                };
                return View(model);
            }
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> AddCarBooking(CarBookingDetailViewModel model)
        {
            if (model.CarBookingId == 0)
            {
                var car = _context.CarDetails.Any(c => c.CarId == model.CarIdD && c.IsDeleted != true);
                if (car != true)
                {
                    return Json(new { success = false, message = "Car does not exist." });
                }
                var carbooking = _context.CarBookingDetails.Any(c=>c.CarId == model.CarIdD && c.IsDeleted != true &&
                                ((c.StartDate <= model.StartDate && c.EndDate >= model.StartDate)||(c.StartDate <= model.EndDate && c.EndDate >= model.EndDate))
                                );
                if (carbooking == true) 
                {
                    return Json(new { success = false, message = "This car is already booked on this dates." });
                }

                int userId = int.Parse(User.FindFirstValue("UserID"));
                var newcarbook = new CarBookingDetail
                {
                    UserId = userId,
                    CarId = model.CarIdD,
                    StartDate = model.StartDate,
                    EndDate = model.EndDate,
                    PricePerDay = model.PricePerDay,
                    TotalAmount = model.TotalAmount
                };
                _context.CarBookingDetails.Add(newcarbook);
                //var car = _context.CarDetails.FirstOrDefault(a => a.CarId == model.CarIdD && a.IsDeleted != true);
                //car.IsOnRent = true;
                //_context.CarDetails.Update(car);
                await _context.SaveChangesAsync();
                return Json(new { success = true, message = "Car Booked successfully." });
            }
            if (model.CarBookingId > 0)
            {
                if (User.FindFirstValue("UserTypeName") != "Admin")
                {
                    return RedirectToAction("AccessDenied", "Login");
                }
                var car = _context.CarDetails.Any(c=>c.CarId == model.CarIdD && c.IsDeleted != true);
                if (car != true)
                {
                    return Json(new { success = false, message = "Car does not exist." });
                }
                var carbooking = _context.CarBookingDetails.Any(c => c.CarBookingId != model.CarBookingId && c.CarId == model.CarIdD && c.IsDeleted != true &&
                                ((c.StartDate <= model.StartDate && c.EndDate >= model.StartDate) || (c.StartDate <= model.EndDate && c.EndDate >= model.EndDate))
                                );
                if (carbooking == true)
                {
                    return Json(new { success = false, message = "This car is already booked on this startdate." });
                }

                var carbook = await _context.CarBookingDetails.FirstOrDefaultAsync(f => f.CarBookingId == model.CarBookingId && f.IsDeleted != true);
                if (carbook == null) return Json(new { success = false, message = "Car Booking Detail Not Found." });

                carbook.UserId = model.UserId;
                carbook.CarId = model.CarIdD;
                carbook.StartDate = model.StartDate;
                carbook.EndDate = model.EndDate;
                if (User.FindFirstValue("UserTypeName") == "Admin")
                {
                    carbook.PricePerDay = model.PricePerDay;
                }
                carbook.TotalAmount = model.TotalAmount;
                
                _context.CarBookingDetails.Update(carbook);

                //var car = _context.CarDetails.FirstOrDefault(a => a.CarId == model.CarIdD && a.IsDeleted != true);
                //car.IsOnRent = true;
                //_context.CarDetails.Update(car);

                await _context.SaveChangesAsync();
                return Json(new { success = true, message = "Car Booking Detail updated successfully." });
            }
            return Json(new { success = false, message = "Something went wrong." });
        }
        public async Task<IActionResult> LoadCars(int? currentCarId)
        {
            var cars = _context.CarDetails.Where(a => (a.CarId == currentCarId || a.IsOnRent != true) && a.IsDeleted != true).ToList();
            return Json(cars);
        }
        public async Task<IActionResult> GetCarDetail(int carId)
        {
            var car = _context.CarDetails.Include(c=>c.CarBookingDetails.Where(d=>d.IsDeleted != true)).Include(c=>c.CarImages)
                        .Where(c => c.CarId == carId && c.IsDeleted != true)
                        .Select(c => new
                        {
                            c.CarId,
                            c.CarName,
                            c.CarPlateNumber,
                            c.PricePerDay,
                            c.CarRegistrationDate,
                            c.PucexpiryDate,
                            c.InsuranceExpiryDate,
                            
                            Images = c.CarImages.Where(e => e.IsDeleted != true).Select(i => new
                            {
                                i.CarImageId,
                                i.CarImageName
                            }).ToList(),

                            success = true
                        })
                        .FirstOrDefault();
            if (car == null)
            {
                return Json(new { success = false, message = "Car does not exist." });
            }

            return Json(car);
        }
        [HttpGet]
        public async Task<IActionResult> CarBookingReport()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> CarBookingData([FromBody] RequestPaginationViewModel model)
        {
            var query = _context.CarBookingDetails.Include(u => u.User).Include(c => c.Car)
                .Where(b => b.IsDeleted != true)
                .AsQueryable();

            if (model.Filters.field1 != null && model.Filters.field2 == null)
            {
                query = query.Where(b=>b.StartDate >= model.Filters.field1);
            }
            if (model.Filters.field1 == null && model.Filters.field2 != null)
            {
                query = query.Where(b => b.EndDate <= model.Filters.field2);
            }
            if (model.Filters.field1 != null && model.Filters.field2 != null)
            {
                query = query.Where(b => b.StartDate >= model.Filters.field1 && b.EndDate <= model.Filters.field2);
            }

            var totalCount = query.Count();

            var Order = query
                .Skip(model.Start)
                .Take(model.Length)
                .Select(b => new
                {
                    b.CarBookingId,
                    b.UserId,
                    Username = b.User.Username,
                    b.CarId,
                    CarName = b.Car.CarName,
                    CarPlateNumber = b.Car.CarPlateNumber,
                    StartDate = b.StartDate.ToString("yyyy-MM-dd"),
                    EndDate = b.EndDate.ToString("yyyy-MM-dd"),
                    b.PricePerDay,
                    b.TotalAmount
                }).OrderByDescending(a => a.CarBookingId).ToList();

            var totalAmount = query.Sum(x => x.TotalAmount);

            return Json(new
            {
                draw = model.Draw,
                recordsTotal = totalCount,
                recordsFiltered = totalCount,
                totalAmountSum = totalAmount,
                data = Order
            });
        }


        public async Task<IActionResult> DeleteCarBooking(int? carBookingId)
        {
            if (User.FindFirstValue("UserTypeName") != "Admin")
            {
                return RedirectToAction("AccessDenied", "Login");
            }
            var carbook = _context.CarBookingDetails.FirstOrDefault(a => a.CarBookingId == carBookingId && a.IsDeleted != true);
            if (carbook.StartDate >= DateTime.Today || carbook.EndDate >= DateTime.Today) 
            {
                return Json(new { success = false, message = "This booking's due date is not over." });
            }
            //var car = _context.CarDetails.FirstOrDefault(c=>c.CarId == carbook.CarId && c.IsDeleted != true);
            //car.IsOnRent = false;
            carbook.IsDeleted = true;
            _context.CarBookingDetails.Update(carbook);
            //_context.CarDetails.Update(car);
            await _context.SaveChangesAsync();
            return Json(new { success = true, message = "Car booking deleted successfully." });
        }

    }
}


