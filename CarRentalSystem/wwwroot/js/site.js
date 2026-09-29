$(document).ready(function () {

    $("#loginform").validate({
        rules: {
            Email: { required: true},
            Password: { required: true}
        },
        messages: {
            Email: {
                required: "Email is Required."
            },
            Password: {
                required: "Password is Required."
            }
        },
        errorElement: "div",
        errorClass: "text-danger small mt-1",
        highlight: function (element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function (form) {
            $('#loginformbtn').prop("disabled", true);
            var formData = $(form);
            $.ajax({
                url: "/Login/Login",
                type: "POST",
                data: formData.serialize(),
                success: function (response) {
                    if(response.success == true){
                        window.location.href = "/Dashboard/Dashboard";
                    }
                    if(response.success == false){
                        Swal.fire({
                          icon: "error",
                          text: response.message,
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        });
                        $('#loginformbtn').prop("disabled", false);
                    }
                },
                error: function (res) {
                    Swal.fire({
                        icon: "error",
                        text: "Something went wrong: " + res.statusText,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            });
        }
    });

    $("#registerform").validate({
        rules: {
            Username: { required: true},
            Email: { required: true},
            Password: { required: true},
            ConfirmPassword: { required: true},
            Image: { required: true}
        },
        messages: {
            Username: {
                required: "Username is Required."
            },
            Email: {
                required: "Email is Required."
            },
            Password: {
                required: "Password is Required."
            },
            ConfirmPassword: {
                required: "ConfirmPassword is Required."
            },
            Image: {
                required: "Image is Required."
            }
        },
        errorElement: "div",
        errorClass: "text-danger small mt-1",
        highlight: function (element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function (form) {
            $('#registerformbtn').prop("disabled", true);
            var formData = new FormData(form);
            $.ajax({
                url: "/Login/RegisterUser",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    if(response.success == true){
                    Swal.fire({
                        icon: "success",
                        text: response.message,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                          }).then((result) => {
                              if (result.isConfirmed) {
                                window.location.href = "/Login/Login";
                              }
                          });
                    }
                    if(response.success == false){
                        Swal.fire({
                          icon: "error",
                          text: response.message,
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        });
                        $('#registerformbtn').prop("disabled", false);
                    }
                },
                error: function (res) {
                    Swal.fire({
                        icon: "error",
                        text: "Something went wrong: " + res.statusText,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            });
        }
    });

    $("#resetPasswordForm").validate({
        rules: {
            NewPassword: { required: true},
            ConfirmPassword: { required: true}
        },
        messages: {
            NewPassword: {
                required: "NewPassword is Required."
            },
            ConfirmPassword: {
                required: "ConfirmPassword is Required."
            }
        },
        errorElement: "div",
        errorClass: "text-danger small mt-1",
        highlight: function (element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function (form) {
            $('#resetpassformsubbtn').prop("disabled", true);
            var formData = $(form);
            $.ajax({
                url: "/Login/ResetPassword",
                type: "POST",
                data: formData.serialize(),
                success: function (response) {
                    if(response.success == true){
                        window.location.href = "/Login/Login";
                    }
                    if(response.success == false){
                        Swal.fire({
                          icon: "error",
                          text: response.message,
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        });
                        $('#resetpassformsubbtn').prop("disabled", false);
                    }
                },
                error: function (res) {
                    Swal.fire({
                        icon: "error",
                        text: "Something went wrong: " + res.statusText,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            });
        }
    });

    $("#forgotPasswordForm").validate({
        rules: {
            Email: { required: true}
        },
        messages: {
            Email: {
                required: "Email is Required."
            }
        },
        errorElement: "div",
        errorClass: "text-danger small mt-1",
        highlight: function (element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function (form) {
            $('#forgotpassformbtn').prop("disabled", true);
            var formData = $(form);
            $.ajax({
                url: "/Login/ForgotPassword",
                type: "POST",
                data: formData.serialize(),
                success: function (response) {
                    if(response.success == true){
                    window.location.href = "/Login/Login";
                    }
                    if(response.success == false){
                        Swal.fire({
                          icon: "error",
                          text: response.message,
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        });
                        $('#forgotpassformbtn').prop("disabled", false);
                    }
                },
                error: function (res) {
                    Swal.fire({
                        icon: "error",
                        text: "Something went wrong: " + res.statusText,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            });
        }
    });

    $("#editUserForm").validate({
        rules: {
            Username: { required: true},
            Email: { required: true},
            Password: { required: true}
        },
        messages: {
            Username: {
                required: "Username is Required."
            },
            Email: {
                required: "Email is Required."
            },
            Password: {
                required: "Password is Required."
            }
        },
        errorElement: "div",
        errorClass: "text-danger small mt-1",
        highlight: function (element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function (form) {
            $('#edituserformbtn').prop("disabled", true);
            var formData = new FormData(form);
            $.ajax({
                url: "/Dashboard/EditUser",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    if(response.success == true){
                    Swal.fire({
                        icon: "success",
                        text: response.message,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                          }).then((result) => {
                              if (result.isConfirmed) {
                                window.location.href = "/Dashboard/Dashboard";
                              }
                          });
                    }
                    if(response.success == false){
                        Swal.fire({
                          icon: "error",
                          text: response.message,
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        });
                        $('#edituserformbtn').prop("disabled", false);
                    }
                },
                error: function (res) {
                    Swal.fire({
                        icon: "error",
                        text: "Something went wrong: " + res.statusText,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            });
        }
    });

    $("#changePasswordForm").validate({
        rules: {
            OldPassword: { required: true},
            NewPassword: { required: true},
            ConfirmPassword: { required: true}
        },
        messages: {
            OldPassword: {
                required: "OldPassword is Required."
            },
            NewPassword: {
                required: "NewPassword is Required."
            },
            ConfirmPassword: {
                required: "ConfirmPassword is Required."
            }
        },
        errorElement: "div",
        errorClass: "text-danger small mt-1",
        highlight: function (element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function (form) {
            $('#changepasswordformbtn').prop("disabled", true);
            var formData = new FormData(form);
            $.ajax({
                url: "/Dashboard/ChangePassword",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    if(response.success == true){
                    Swal.fire({
                        icon: "success",
                        text: response.message,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                          }).then((result) => {
                              if (result.isConfirmed) {
                                window.location.href = "/Dashboard/Dashboard";
                              }
                          });
                    }
                    if(response.success == false){
                        Swal.fire({
                          icon: "error",
                          text: response.message,
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        });
                        $('#changepasswordformbtn').prop("disabled", false);
                    }
                },
                error: function (res) {
                    Swal.fire({
                        icon: "error",
                        text: "Something went wrong: " + res.statusText,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            });
        }
    });

    $("#carDetailList").DataTable({
            searching: false,
            order: [],
            processing: true,
            serverSide: true,
            autoWidth: false,
            lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
            ajax: {
                url: "/Car/CarDetailList",
                type: "POST",
                contentType: "application/json",
                data: function (d) {
                    return JSON.stringify({
                        draw: d.draw,
                        start: d.start,
                        length: d.length,
                        //search: null,
                        columns: d.columns.map((col, index) => ({
                            field: col.data,
                            isSortable: col.orderable,
                            sort: d.order.find(o => o.column === index)
                                ? { direction: d.order.find(o => o.column === index).dir === "asc" ? 0 : 1 }
                                : null
                        })),
                    });
                }
            },
            columns: [
                { title: "CarId", data: "carId", visible: false, searchable: false },
                { title: "CarName", data: "carName", searchable: false, orderable: false },
                { title: "CarPlateNumber", data: "carPlateNumber" , searchable: false, orderable: false },
                { title: "CarRegistrationDate", data: "carRegistrationDate" , searchable: false, orderable: false },
                { title: "PUCExpiryDate", data: "pucExpiryDate" , searchable: false, orderable: false },
                { title: "InsuranceExpiryDate", data: "insuranceExpiryDate" , searchable: false, orderable: false },
                { title: "PricePerDay", data: "pricePerDay" , searchable: false, orderable: false },
                {
                    title: "Action",
                    data: "carId",
                    orderable: false,
                    searchable: false,
                    width: "10%",
                    render: function (data) {
                        return `
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown">Action</button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item btneditcar text-primary" href="/Car/AddCarDetails?carId=${data}" ><i class="fa fa-edit"></i>&nbsp;Edit</a></li>
                                    <li><a class="dropdown-item btndeletecar text-danger" style="cursor: pointer;" onclick="deleteCarDetail(${data})" ><i class="fa fa-trash"></i>&nbsp;Delete</a></li>
                                </ul>
                            </div>`;
                    }
                }
            ]
    });

    $("#addCarDetailForm").validate({
        rules: {
            CarName: { required: true},
            CarPlateNumber: { required: true},
            PricePerDay: { required: true, min : 1},
            CarRegistrationDate: { required: true},
            PUCExpiryDate: { required: true},
            InsuranceExpiryDate: { required: true},
            RCImage: { required: true},
            PUCImage: { required: true},
            InsuranceImage: { required: true},
            CarImg: { required: true }
        },
        messages: {
            CarName: {
                required: "CarName is Required."
            },
            CarPlateNumber: {
                required: "CarPlateNumber is Required."
            },
            PricePerDay: {
                required: "PricePerDay is Required.",
                min: "Price should be greater than 1."
            },
            CarRegistrationDate: {
                required: "CarRegistrationDate is Required."
            },
            PUCExpiryDate: {
                required: "PUCExpiryDate is Required."
            },
            InsuranceExpiryDate: {
                required: "InsuranceExpiryDate is Required."
            },
            RCImage: {
                required: "RCImage is Required."
            },
            PUCImage: {
                required: "PUCImage is Required."
            },
            InsuranceImage: {
                required: "InsuranceImage is Required."
            },
            CarImg: { 
                required: "Please select one car image." 
            }
        },
        errorElement: "div",
        errorClass: "text-danger small mt-1",
        highlight: function (element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function (form) {
            //var items = $("#CarImagesList .carimages"); 
            //if (items.length == 0) {
            //    $("#errors").text("At least one car image should be here.");
            //    return false; 
            //}
            $('#submitBtnACDF').prop('disabled',true);
            var formData = new FormData(form);
            $.ajax({
                url: "/Car/AddCarDetails",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    if(response.success == true){
                    Swal.fire({
                        icon: "success",
                        text: response.message,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                          }).then((result) => {
                              if (result.isConfirmed) {
                                window.location.href = "/Car/CarDetailList";
                              }
                          });
                    }
                    if(response.success == false){
                        Swal.fire({
                          icon: "error",
                          text: response.message,
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        });
                        $('#submitBtnACDF').prop('disabled',false);
                    }
                },
                error: function (res) {
                    Swal.fire({
                        icon: "error",
                        text: "Something went wrong: " + res.statusText,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            });
        }
    });

    $("#editCarDetailForm").validate({
        rules: {
            CarName: { required: true},
            CarPlateNumber: { required: true},
            PricePerDay: { required: true, min:1},
            CarRegistrationDate: { required: true},
            PUCExpiryDate: { required: true},
            InsuranceExpiryDate: { required: true}
        },
        messages: {
            CarName: {
                required: "CarName is Required."
            },
            CarPlateNumber: {
                required: "CarPlateNumber is Required."
            },
            PricePerDay: {
                required: "PricePerDay is Required.",
                min: "Price should be greater than 1."
            },
            CarRegistrationDate: {
                required: "CarRegistrationDate is Required."
            },
            PUCExpiryDate: {
                required: "PUCExpiryDate is Required."
            },
            InsuranceExpiryDate: {
                required: "InsuranceExpiryDate is Required."
            }
        },
        errorElement: "div",
        errorClass: "text-danger small mt-1",
        highlight: function (element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function (form) {
            //var items = $("#CarImagesList .carimages"); 
            //if (items.length === 0) {
            //    $("#errors").text("At least one car image should be here.");
            //    return false; 
            //}
            $('#submitBtnECDF').prop('disabled',true);
            var formData = new FormData(form);
            $.ajax({
                url: "/Car/AddCarDetails",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    if(response.success == true){
                    Swal.fire({
                        icon: "success",
                        text: response.message,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                          }).then((result) => {
                              if (result.isConfirmed) {
                                window.location.href = "/Car/CarDetailList";
                              }
                          });
                    }
                    if(response.success == false){
                        Swal.fire({
                          icon: "error",
                          text: response.message,
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        });
                        $('#submitBtnECDF').prop('disabled',false);
                    }
                },
                error: function (res) {
                    Swal.fire({
                        icon: "error",
                        text: "Something went wrong: " + res.statusText,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            });
        }
    });

    $("#addCarImageBtn").click(function () {
        $("#errors").empty();
        var index = $("#CarImagesList .carimages").length;
        var newimage = `
             <div class="col-md-3 carimages">
                <input type="hidden" name="CarImages.index" value="${index}" />
                <input type="hidden" name="CarImages[${index}].CarImageId" value="" />
                <input type="hidden" name="CarImages[${index}].CarId" value="" />
                
                <label class="form-label">Car Image</label>
                <input type="hidden" name="CarImages[${index}].CarImageName" value="" class="carimagename"/>
                <input type="file" name="CarImages[${index}].CarImage" id="CarImage-${index}" class="form-control CarImage" accept="image/*" onchange="previewImage(event,'CarImageimagePreview-${index}')" />
            
                <img id="CarImageimagePreview-${index}" class="CarImageimagePreview" src="#" alt="Image Preview" style="display: none; max-width: 200px; max-height: 200px;" />
                
                <button type="button" class="btn btn-danger btn-sm removeCarImage">remove</button>
            </div>
        `;
        $("#CarImagesList").append(newimage);
        addValidation();
    });
    
    $(document).on("click", ".removeCarImage", function () {
        var row = $(this).closest(".carimages");
        var indexVal = row.prev('input[name="CarImages.index"]').val();
        $('input[name="CarImages.index"][value="' + indexVal + '"]').remove();
        row.remove();
        renumberField();
    });
    
    addValidation();

    $("#carBookingList").DataTable({
            searching: false,
            order: [],
            processing: true,
            serverSide: true,
            autoWidth: false,
            lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
            ajax: {
                url: "/CarBooking/CarBookingList",
                type: "POST",
                contentType: "application/json",
                data: function (d) {
                    return JSON.stringify({
                        draw: d.draw,
                        start: d.start,
                        length: d.length,
                        //search: null,
                        columns: d.columns.map((col, index) => ({
                            field: col.data,
                            isSortable: col.orderable,
                            sort: d.order.find(o => o.column === index)
                                ? { direction: d.order.find(o => o.column === index).dir === "asc" ? 0 : 1 }
                                : null
                        })),
                    });
                }
            },
            columns: [
                
                { title: "CarBookingId", data: "carBookingId", visible: false, searchable: false },
                { title: "UserId", data: "userId", visible: false, searchable: false },
                { title: "Username", data: "username", searchable: false, orderable: false },
                { title: "CarId", data: "carIdD" , visible: false, searchable: false },
                { title: "CarName", data: "carName" , searchable: false, orderable: false },
                { title: "StartDate", data: "startDate" , searchable: false, orderable: false },
                { title: "EndDate", data: "endDate" , searchable: false, orderable: false },
                { title: "PricePerDay", data: "pricePerDay" , searchable: false, orderable: false },
                { title: "TotalAmount", data: "totalAmount" , searchable: false, orderable: false },
                {
                    title: "Action",
                    data: "carBookingId",
                    visible: isAdmin(),
                    orderable: false,
                    searchable: false,
                    width: "10%",
                    render: function (data,d,car) {
                        var html = '';
                        if(currentUserType == "Admin"){
                            
                            html += `<div class="btn-group" role="group">
                                <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown">Action</button>
                                <ul class="dropdown-menu">`;
                                
                            if(car.isCarDeleted == false){
                                html += `<li><a class="dropdown-item btneditcarbooking text-primary" href="/CarBooking/AddCarBooking?carBookingId=${data}" ><i class="fa fa-edit"></i>&nbsp;Edit</a></li>`;
                            }
                            html += `<li><a class="dropdown-item btndeletecarbooking text-danger" style="cursor: pointer;" onclick="deleteCarBooking(${data})" ><i class="fa fa-trash"></i>&nbsp;Delete</a></li>
                            </ul></div>`;
                        }
                        return html;
                    }
                }
            ]
    });

    $("#addCarBookingForm").validate({
        rules: {
            CarIdD : { min : 1},
            StartDate: { required: true},
            EndDate: { required: true },
            PricePerDay: { required: true},
            TotalAmount: { required: true}
        },
        messages: {
            CarIdD : { 
                min: "Select Car."
            },
            StartDate: {
                required: "CarName is Required."
            },
            EndDate: {
                required: "EndDate is Required.",
            },
            PricePerDay: {
                required: "PricePerDay is Required."
            },
            TotalAmount: {
                required: "TotalAmount is Required."
            }
        },
        errorElement: "div",
        errorClass: "text-danger small mt-1",
        highlight: function (element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function (element) {
            $(element).removeClass("is-invalid");
        },
        submitHandler: function (form) {
            $('#submitBtnACBF').prop('disabled',true);
            var formData = new FormData(form);
            $.ajax({
                url: "/CarBooking/AddCarBooking",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    if(response.success == true){
                    Swal.fire({
                        icon: "success",
                        text: response.message,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                          }).then((result) => {
                              if (result.isConfirmed) {
                                window.location.href = "/CarBooking/CarBookingList";
                              }
                          });
                    }
                    if(response.success == false){
                        Swal.fire({
                          icon: "error",
                          text: response.message,
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        });
                        $('#submitBtnACBF').prop('disabled',false);
                    }
                },
                error: function (res) {
                    Swal.fire({
                        icon: "error",
                        text: "Something went wrong: " + res.statusText,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            });
        }
    });

    loadCars();

    $(".CarIdD").change(function () {
        var selectedOption = $(this).find("option:selected");
        var price = selectedOption.data("price") || 0;
        $(".priceperdayD").val(price);

        var startDate = $('#StartDate').val();
        var endDate = $('#EndDate').val();
        var price = $('#PricePerDay').val();
        if(endDate >= startDate){
            var diff = new Date(Date.parse(endDate) - Date.parse(startDate));
            var days = diff/1000/60/60/24;
            $('#TotalAmount').val((days+1)*price);
        } else {
            $('#TotalAmount').val(0);
        }
        var carId = $(this).val();
        if (carId > 0) {
            
            $.ajax({
                url: `/CarBooking/GetCarDetail?carId=` + carId ,
                type: "GET",
                success: function (car) {
                    showCarDetails(car);
                }
            });
        }
        $("#PricePerDay").prop("readonly", true);
        if(currentUserType == "Admin"){
            $("#PricePerDay").prop("readonly", false);
        }
    });
    $("#StartDate").change(function () {
        var startDate = $(this).val();
        var endDate = $('#EndDate').val();
        var price = $('#PricePerDay').val();
        $('#EndDate').attr('min', startDate);
        if(endDate >= startDate){
            var diff = new Date(Date.parse(endDate) - Date.parse(startDate));
            var days = diff/1000/60/60/24;
            $('#TotalAmount').val((days+1)*price);
        } else {
            $('#TotalAmount').val(0);
        }
    });
    $("#EndDate").change(function () {
        var startDate = $('#StartDate').val();
        var endDate = $(this).val();
        var price = $('#PricePerDay').val();
        if(endDate >= startDate){
            var diff = new Date(Date.parse(endDate) - Date.parse(startDate));
            var days = diff/1000/60/60/24;
            $('#TotalAmount').val((days+1)*price);
        } else {
            $('#TotalAmount').val(0);
        }
    });
    $("#PricePerDay").change(function () {
        var startDate = $('#StartDate').val();
        var endDate = $('#EndDate').val();
        var price = $(this).val();
        if(endDate >= startDate){
            var diff = new Date(Date.parse(endDate) - Date.parse(startDate));
            var days = diff/1000/60/60/24;
            $('#TotalAmount').val((days+1)*price);
        } else {
            $('#TotalAmount').val(0);
        }
    });
    

    $("#applyFilter").click(function () {
        var start = $("#reportstartDate").val();
        var end = $("#reportendDate").val();
        if(start == "" && end == ""){
            Swal.fire({
              text: "Please select any date.",
              allowOutsideClick: false,
              allowEscapeKey: false
            });
            return false;
        }
        $("#bookingTable").DataTable().destroy();
        $("#bookingTable").DataTable({
                searching: false,
                order: [],
                processing: true,
                serverSide: true,
                autoWidth: false,
                lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
                ajax: {
                    url: "/CarBooking/CarBookingData",
                    type: "POST",
                    contentType: "application/json",
                    data: function (d) {
                        return JSON.stringify({
                            draw: d.draw,
                            start: d.start,
                            length: d.length,
                            //search: null,
                            columns: d.columns.map((col, index) => ({
                                field: col.data,
                                isSortable: col.orderable,
                                sort: d.order.find(o => o.column === index)
                                    ? { direction: d.order.find(o => o.column === index).dir === "asc" ? 0 : 1 }
                                    : null
                            })),
                            filters: {
                                field1: new Date($("#reportstartDate").val()),
                                field2: new Date($("#reportendDate").val())
                            }
                        });
                    },
                    complete: function (xhr) {
                        var total = xhr.responseJSON.totalAmountSum;
                        $("#totalAmountofallrecords").text(total.toFixed(2));
                    }
                },
                columns: [
                    { title: "CarBookingId", data: "carBookingId", visible: false, searchable: false },
                    { title: "UserId", data: "userId", visible: false, searchable: false },
                    { title: "Username", data: "username", searchable: false, orderable: false },
                    { title: "CarName", data: "carName" , searchable: false, orderable: false },
                    { title: "CarPlateNumber", data: "carPlateNumber" , searchable: false, orderable: false },
                    { title: "StartDate", data: "startDate" , searchable: false, orderable: false },
                    { title: "EndDate", data: "endDate" , searchable: false, orderable: false },
                    { title: "PricePerDay", data: "pricePerDay" , searchable: false, orderable: false },
                    { title: "TotalAmount", data: "totalAmount" , searchable: false, orderable: false },
                    
                ]
        });
    });

    $("#CarImg").change(function () {
        if (typeof (FileReader) != "undefined") {
            var dvPreview = $("#CarImgimagePreview");
            //dvPreview.html("");
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
            $($(this)[0].files).each(function () {
                var file = $(this);
                if (regex.test(file[0].name.toLowerCase())) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var imgdiv = `<div id="imgdiv" class="imgdiv"></div>`;
                        var img = $("<img />");
                        img.attr("style", "height:150px;width:150px;margin-right:30px;margin-bottom:30px;margin-top:30px;");
                        img.attr("src", e.target.result);
                        var removeimgbtn = `<button type="button" id="removeimgbtn" class="removeimgbtn" style="position: absolute; top: 2px; left: 2px;">X</button>`
                        removeimgbtn.click(function(){
                            imgdiv.remove();
                        });
                        imgdiv.append(img).append(removeimgbtn);
                        dvPreview.append(imgdiv);
                    }
                    reader.readAsDataURL(file[0]);
                } else {
                    alert(file[0].name + " is not a valid image file.");
                    dvPreview.html("");
                    return false;
                }
            });
        } else {
            alert("This browser does not support HTML5 FileReader.");
        }
    });
    
});

function loadCars(){
    var val = $('#CarIdH').val();
    $.ajax({
        url: "/CarBooking/LoadCars?currentCarId="+val,
        type: "GET",
        success: function (data){
            
            $('.CarIdD').empty();
            $('.CarIdD').append(`<option value="0" hidden >--Select Car--</option>`);
            $(data).each(function(i,car){
                $('.CarIdD').append(`<option value="${car.carId}" data-price="${car.pricePerDay}">${car.carName}</option>`);
            });
            if(val > 0){
                $('.CarIdD').val(val);
            }
            if (val > 0) {
            
            $.ajax({
                url: `/CarBooking/GetCarDetail?carId=` + val ,
                type: "GET",
                success: function (car) {
                    showCarDetails(car);
                }
            });
        }
        }
    });
}

function showCarDetails(car) {
    
    if (!car) {
        $("#carDetailsContainer").html("");
        return;
    }
    //if($("#CarIdH").val() == car.carId){
    //    //$('#StartDate').attr('min', car.enddate.toString().split('T')[0]);
    //    //$('#EndDate').attr('min', car.enddate.toString().split('T')[0]);
    //    //$('#StartDate').removeAttr("min");
    //    //$('#EndDate').removeAttr("min");
    //}
    //else{
    //    $('#StartDate').attr('min', car.enddate.toString().split('T')[0]);
    //    $('#EndDate').attr('min', car.enddate.toString().split('T')[0]);
    //}

    var html = `
        <div class="card p-3 shadow-sm">
            <h4>${car.carName}</h4>
            <p><strong>Plate Number:</strong> ${car.carPlateNumber ?? "-"}</p>
            <p><strong>Price Per Day:</strong> ₹${car.pricePerDay ?? 0}</p>
            <p><strong>Registration:</strong> ${car.carRegistrationDate ?? "-"}</p>
            <p><strong>PUC Expiry:</strong> ${car.pucexpiryDate ?? "-"}</p>
            <p><strong>Insurance:</strong> ${car.insuranceExpiryDate ?? "-"}</p>

            <h5 class="mt-3">Car Images</h5>
            <div class="d-flex flex-wrap">
                ${(car.images && car.images.length > 0)
                    ? car.images.map(img => `
                        <img src="/uploads/${img.carImageName}" 
                             class="m-2" 
                             style="height:120px;width:150px;object-fit:cover;border-radius:8px;border:1px solid #ccc;" />
                      `).join("")
                    : "<p>No images available</p>"
                }
            </div>
        </div>
    `;

    $("#carDetailsContainer").html(html);
}

function renumberField() {
    $("#CarImagesList .carimages").each(function (i) {
        $(this).find("input").each(function () {
            var name = $(this).attr("name");
            if (name) {
                name = name.replace(/\[\d+\]/, "[" + i + "]");
                $(this).attr("name", name);
            }
        });
        $(this).find('input[name="CarImages.index"]').val(i);
    });
}

function deleteCarDetail(carId) {
    var text = "Are you sure want to delete Car Detail ?";
    Swal.fire({
      text: text,
      icon: "question",
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "/Car/DeleteCarDetail?carId="+carId,
                type: 'POST',
                success: function (res) {
                    if(res.success == true){
                        Swal.fire({
                        icon: "success",
                        text: res.message,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                          }).then((result) => {
                              if (result.isConfirmed) {
                                window.location.reload();
                              }
                          });
                    }
                    if(res.success == false){
                        Swal.fire({
                          icon: "error",
                          text: res.message,
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        });
                    }
                },
                error: function (res, status, error) {
                    Swal.fire({
                        icon: "error",
                        text: "Something went wrong: " + res.statusText,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            });
        }
    });
}
function deleteCarBooking(carBookingId) {
    var text = "Are you sure want to delete Car Booking ?";
    Swal.fire({
      text: text,
      icon: "question",
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
                url: "/CarBooking/DeleteCarBooking?carBookingId="+carBookingId,
                type: 'GET',
                success: function (res) {
                    if(res.success == true){
                        Swal.fire({
                        icon: "success",
                        text: res.message,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                          }).then((result) => {
                              if (result.isConfirmed) {
                                window.location.reload();
                              }
                          });
                    }
                    if(res.success == false){
                        Swal.fire({
                          icon: "error",
                          text: res.message,
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        });
                    }
                },
                error: function (res, status, error) {
                    Swal.fire({
                        icon: "error",
                        text: "Something went wrong: " + res.statusText,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            });
        }
    });
}

function addValidation() {
        $("#CarImagesList .carimages").each(function () {
            var CarImageName = $(this).find(".carimagename").val();
            if(CarImageName == undefined){
                var CarImage = $(this).find(".CarImage");
                CarImage.rules("add", {
                    required: true,
                    messages: {
                        required: "Car Image is required."
                    }
                });
            }
        });
}

function Logout() {
    $.ajax({
        url: '/Login/Logout',
        type: 'GET',
        success: function (res) {
            if(res.success == true){
                window.location.href = '/Login/Login';
                window.location.reload();
            }
        },
        error: function (res, status, error) {
            Swal.fire({
                icon: "error",
                text: "Something went wrong: " + res.statusText,
                allowOutsideClick: false,
                allowEscapeKey: false
            });
        }
    });
}

function ForgotPassword(email){
    Swal.fire({
      text: "Are you sure want to Reset Password ?",
      icon: "question",
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
                url: '/Login/ForgotPassword?Email='+email,
                type: 'POST',
                success: function (res) {
                    if(res.success == true){
                        Swal.fire({
                        icon: "success",
                        text: res.message,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                          }).then((result) => {
                              if (result.isConfirmed) {
                                window.location.reload();
                              }
                          });
                    }
                },
                error: function (res, status, error) {
                    Swal.fire({
                        icon: "error",
                        text: "Something went wrong: " + res.statusText,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    });
                }
            });
        }
    });
}

function previewImage(event,imagepreview) {
    var input = event.target;
    var preview = document.getElementById(imagepreview);
    var file = input.files[0];
    if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please select a valid image file (jpg, png, gif, webp).');
            input.value = ''; 
            preview.style.display = 'none';
            return;
        }
    
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
    else {
        preview.src = "#";
        preview.style.display = 'none';
    }
}

function isAdmin() {
    if(currentUserType == "Admin"){
        return true;
    }
    else{
        return false;
    }
}

function FilterOrReset() {
    $("#reportstartDate").val(0);
    $("#reportendDate").val(0);
    $("#bookingTable").DataTable().destroy();
    $("#bookingTable").empty();
}