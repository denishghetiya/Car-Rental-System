USE [master]
GO
/****** Object:  Database [CarRental]    Script Date: 05-10-2026 16:27:20 ******/
CREATE DATABASE [CarRental]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'CarRental', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLSERVER1\MSSQL\DATA\CarRental.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'CarRental_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLSERVER1\MSSQL\DATA\CarRental_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [CarRental] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [CarRental].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [CarRental] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [CarRental] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [CarRental] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [CarRental] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [CarRental] SET ARITHABORT OFF 
GO
ALTER DATABASE [CarRental] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [CarRental] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [CarRental] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [CarRental] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [CarRental] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [CarRental] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [CarRental] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [CarRental] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [CarRental] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [CarRental] SET  DISABLE_BROKER 
GO
ALTER DATABASE [CarRental] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [CarRental] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [CarRental] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [CarRental] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [CarRental] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [CarRental] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [CarRental] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [CarRental] SET RECOVERY FULL 
GO
ALTER DATABASE [CarRental] SET  MULTI_USER 
GO
ALTER DATABASE [CarRental] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [CarRental] SET DB_CHAINING OFF 
GO
ALTER DATABASE [CarRental] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [CarRental] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [CarRental] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [CarRental] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'CarRental', N'ON'
GO
ALTER DATABASE [CarRental] SET QUERY_STORE = ON
GO
ALTER DATABASE [CarRental] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [CarRental]
GO
/****** Object:  Table [dbo].[CarBookingDetails]    Script Date: 05-10-2026 16:27:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarBookingDetails](
	[CarBookingId] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[CarId] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[PricePerDay] [decimal](18, 2) NOT NULL,
	[TotalAmount] [decimal](18, 2) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CarBookingDetails] PRIMARY KEY CLUSTERED 
(
	[CarBookingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarDetails]    Script Date: 05-10-2026 16:27:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarDetails](
	[CarId] [int] IDENTITY(1,1) NOT NULL,
	[CarName] [nvarchar](max) NOT NULL,
	[CarPlateNumber] [nvarchar](max) NOT NULL,
	[CarRegistrationDate] [datetime] NOT NULL,
	[PUCExpiryDate] [datetime] NOT NULL,
	[InsuranceExpiryDate] [datetime] NOT NULL,
	[PricePerDay] [decimal](18, 2) NOT NULL,
	[RCImageName] [nvarchar](max) NOT NULL,
	[PUCImageName] [nvarchar](max) NOT NULL,
	[InsuranceImageName] [nvarchar](max) NOT NULL,
	[IsOnRent] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CarDetails] PRIMARY KEY CLUSTERED 
(
	[CarId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarImages]    Script Date: 05-10-2026 16:27:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarImages](
	[CarImageId] [int] IDENTITY(1,1) NOT NULL,
	[CarImageName] [nvarchar](max) NOT NULL,
	[CarId] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_CarImages] PRIMARY KEY CLUSTERED 
(
	[CarImageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 05-10-2026 16:27:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserTypeId] [int] NOT NULL,
	[Username] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[ImageName] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ResetToken] [nvarchar](max) NULL,
	[ResetTokenExpiry] [datetime] NULL,
	[IsActive] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserTypes]    Script Date: 05-10-2026 16:27:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserTypes](
	[UserTypeId] [int] IDENTITY(1,1) NOT NULL,
	[UserTypeName] [nvarchar](max) NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_UserType] PRIMARY KEY CLUSTERED 
(
	[UserTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[CarBookingDetails] ON 
GO
INSERT [dbo].[CarBookingDetails] ([CarBookingId], [UserId], [CarId], [StartDate], [EndDate], [PricePerDay], [TotalAmount], [IsDeleted]) VALUES (112, 4, 27, CAST(N'2025-11-24T00:00:00.000' AS DateTime), CAST(N'2025-11-25T00:00:00.000' AS DateTime), CAST(1.00 AS Decimal(18, 2)), CAST(2.00 AS Decimal(18, 2)), 0)
GO
INSERT [dbo].[CarBookingDetails] ([CarBookingId], [UserId], [CarId], [StartDate], [EndDate], [PricePerDay], [TotalAmount], [IsDeleted]) VALUES (113, 4, 28, CAST(N'2025-11-26T00:00:00.000' AS DateTime), CAST(N'2025-11-27T00:00:00.000' AS DateTime), CAST(2.00 AS Decimal(18, 2)), CAST(4.00 AS Decimal(18, 2)), 0)
GO
INSERT [dbo].[CarBookingDetails] ([CarBookingId], [UserId], [CarId], [StartDate], [EndDate], [PricePerDay], [TotalAmount], [IsDeleted]) VALUES (114, 4, 29, CAST(N'2025-11-28T00:00:00.000' AS DateTime), CAST(N'2025-11-29T00:00:00.000' AS DateTime), CAST(3.00 AS Decimal(18, 2)), CAST(6.00 AS Decimal(18, 2)), 0)
GO
SET IDENTITY_INSERT [dbo].[CarBookingDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[CarDetails] ON 
GO
INSERT [dbo].[CarDetails] ([CarId], [CarName], [CarPlateNumber], [CarRegistrationDate], [PUCExpiryDate], [InsuranceExpiryDate], [PricePerDay], [RCImageName], [PUCImageName], [InsuranceImageName], [IsOnRent], [IsDeleted]) VALUES (27, N'Range Rover', N'GJ10DG0001', CAST(N'2025-11-26T00:00:00.000' AS DateTime), CAST(N'2025-11-26T00:00:00.000' AS DateTime), CAST(N'2025-11-26T00:00:00.000' AS DateTime), CAST(1.00 AS Decimal(18, 2)), N'rc 1_20251126174852359.jpg', N'puc 1_20251126174852437.jpg', N'is 1_20251126174852455.jpg', 0, 0)
GO
INSERT [dbo].[CarDetails] ([CarId], [CarName], [CarPlateNumber], [CarRegistrationDate], [PUCExpiryDate], [InsuranceExpiryDate], [PricePerDay], [RCImageName], [PUCImageName], [InsuranceImageName], [IsOnRent], [IsDeleted]) VALUES (28, N'Diffender', N'GJ10DG0002', CAST(N'2025-11-26T00:00:00.000' AS DateTime), CAST(N'2025-11-26T00:00:00.000' AS DateTime), CAST(N'2025-11-26T00:00:00.000' AS DateTime), CAST(2.00 AS Decimal(18, 2)), N'rc 2_20251126174926159.jpg', N'puc 2_20251126174926174.jpg', N'is 2_20251126174926208.jpg', 0, 0)
GO
INSERT [dbo].[CarDetails] ([CarId], [CarName], [CarPlateNumber], [CarRegistrationDate], [PUCExpiryDate], [InsuranceExpiryDate], [PricePerDay], [RCImageName], [PUCImageName], [InsuranceImageName], [IsOnRent], [IsDeleted]) VALUES (29, N'Rolls Roys', N'GJ10DG0003', CAST(N'2025-11-26T00:00:00.000' AS DateTime), CAST(N'2025-11-26T00:00:00.000' AS DateTime), CAST(N'2025-11-26T00:00:00.000' AS DateTime), CAST(3.00 AS Decimal(18, 2)), N'rc 3_20251126174957183.jpg', N'puc 3_20251126174957196.jpg', N'is 3_20251126174957230.jpg', 0, 0)
GO
SET IDENTITY_INSERT [dbo].[CarDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[CarImages] ON 
GO
INSERT [dbo].[CarImages] ([CarImageId], [CarImageName], [CarId], [IsDeleted]) VALUES (95, N'1_20251126174852468.jpg', 27, 0)
GO
INSERT [dbo].[CarImages] ([CarImageId], [CarImageName], [CarId], [IsDeleted]) VALUES (96, N'2_20251126174852481.jpg', 27, 0)
GO
INSERT [dbo].[CarImages] ([CarImageId], [CarImageName], [CarId], [IsDeleted]) VALUES (97, N'3_20251126174926223.jpg', 28, 0)
GO
INSERT [dbo].[CarImages] ([CarImageId], [CarImageName], [CarId], [IsDeleted]) VALUES (98, N'4_20251126174926240.jpg', 28, 0)
GO
INSERT [dbo].[CarImages] ([CarImageId], [CarImageName], [CarId], [IsDeleted]) VALUES (99, N'5_20251126174957262.jpg', 29, 0)
GO
INSERT [dbo].[CarImages] ([CarImageId], [CarImageName], [CarId], [IsDeleted]) VALUES (100, N'6_20251126174957297.jpg', 29, 0)
GO
SET IDENTITY_INSERT [dbo].[CarImages] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 
GO
INSERT [dbo].[Users] ([UserId], [UserTypeId], [Username], [Email], [Password], [ImageName], [CreatedDate], [ResetToken], [ResetTokenExpiry], [IsActive], [IsDeleted]) VALUES (4, 1, N'Admin', N'admin@mailinator.com', N'Rtw5TGnwmLpGccxaDMpTgg==', N'shiv.png', CAST(N'2025-11-17T11:07:59.167' AS DateTime), N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNTg4YzBiOC00YzkxLTRiZmItODM5Zi04NDJjNzc3ZGE5ZjUiLCJVc2VySWQiOiI0IiwiVXNlcm5hbWUiOiJBZG1pbiIsIkVtYWlsIjoiYWRtaW5AbWFpbGluYXRvci5jb20iLCJVc2VyVHlwZUlkIjoiMSIsIlVzZXJUeXBlTmFtZSI6IkFkbWluIiwiZXhwIjoxNzg5ODEyOTA2fQ.8dtwNUjFJEwBLSfeU4Pgp3Eeo86ZE5uuCnfQaUgdTVo', CAST(N'2026-09-19T10:15:06.930' AS DateTime), 1, 0)
GO
INSERT [dbo].[Users] ([UserId], [UserTypeId], [Username], [Email], [Password], [ImageName], [CreatedDate], [ResetToken], [ResetTokenExpiry], [IsActive], [IsDeleted]) VALUES (7, 2, N'Denish', N'denish@mailinator.com', N'Rtw5TGnwmLpGccxaDMpTgg==', N'shiv_20251121144443643.png', CAST(N'2025-11-20T16:22:12.137' AS DateTime), N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMDRiNDRkYS1iMjU4LTQ2ZDQtYTFjZi0zZDQyODMzNmM3OWEiLCJVc2VySWQiOiI3IiwiVXNlcm5hbWUiOiJEZW5pc2giLCJFbWFpbCI6ImRlbmlzaEBtYWlsaW5hdG9yLmNvbSIsIlVzZXJUeXBlSWQiOiIyIiwiVXNlclR5cGVOYW1lIjoiVXNlciIsImV4cCI6MTc4OTgxMjAzNX0.AyBD4skWdrtmRJNoPQZB5Ss43KKHVfmgafz20c7RimE', CAST(N'2026-09-19T10:00:37.803' AS DateTime), 1, 0)
GO
INSERT [dbo].[Users] ([UserId], [UserTypeId], [Username], [Email], [Password], [ImageName], [CreatedDate], [ResetToken], [ResetTokenExpiry], [IsActive], [IsDeleted]) VALUES (8, 2, N'Ronak', N'ronak@mailinator.com', N'Btmyu3IW+j3rHyMRMcl+uQ==', N'rc 2_20251124120907060.jpg', CAST(N'2025-11-24T12:09:07.130' AS DateTime), N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzMGZkYzE3NS02NDA5LTRhMGQtYmQwNS00NWVhM2FlYjI1OGMiLCJVc2VySWQiOiI4IiwiVXNlcm5hbWUiOiJSb25hayIsIkVtYWlsIjoicm9uYWtAbWFpbGluYXRvci5jb20iLCJVc2VyVHlwZUlkIjoiMiIsIlVzZXJUeXBlTmFtZSI6IlVzZXIiLCJleHAiOjE3NjQxNTM3OTl9.3_enCURDLUa498LPWYLuFWNyLBfMR3bfQOwDo3jOUYM', CAST(N'2025-11-26T10:43:19.230' AS DateTime), 1, 0)
GO
INSERT [dbo].[Users] ([UserId], [UserTypeId], [Username], [Email], [Password], [ImageName], [CreatedDate], [ResetToken], [ResetTokenExpiry], [IsActive], [IsDeleted]) VALUES (9, 2, N'Dhyey', N'dhyey@mailinator.com', N'Btmyu3IW+j3rHyMRMcl+uQ==', N'is 2_20251124122157911.jpg', CAST(N'2025-11-24T12:21:57.930' AS DateTime), N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjZGZmOTY0Yy02OTY4LTRjMWMtYjU1ZS01ZTk5YzI3NTNiYzkiLCJVc2VySWQiOiI5IiwiVXNlcm5hbWUiOiJEaHlleSIsIkVtYWlsIjoiZGh5ZXlAbWFpbGluYXRvci5jb20iLCJVc2VyVHlwZUlkIjoiMiIsIlVzZXJUeXBlTmFtZSI6IlVzZXIiLCJleHAiOjE3NjM5NzEwMDd9.T0y0e6ePqsXHh2v34-hf1TWmuOr-xGFnEF5Qd_FoZp4', CAST(N'2025-11-24T07:56:47.317' AS DateTime), 1, 0)
GO
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET IDENTITY_INSERT [dbo].[UserTypes] ON 
GO
INSERT [dbo].[UserTypes] ([UserTypeId], [UserTypeName], [IsDeleted]) VALUES (1, N'Admin', 0)
GO
INSERT [dbo].[UserTypes] ([UserTypeId], [UserTypeName], [IsDeleted]) VALUES (2, N'User', 0)
GO
SET IDENTITY_INSERT [dbo].[UserTypes] OFF
GO
ALTER TABLE [dbo].[CarBookingDetails]  WITH CHECK ADD  CONSTRAINT [FK_CarBookingDetails_CarId_CarDetails_CarId] FOREIGN KEY([CarId])
REFERENCES [dbo].[CarDetails] ([CarId])
GO
ALTER TABLE [dbo].[CarBookingDetails] CHECK CONSTRAINT [FK_CarBookingDetails_CarId_CarDetails_CarId]
GO
ALTER TABLE [dbo].[CarBookingDetails]  WITH CHECK ADD  CONSTRAINT [FK_CarBookingDetails_UserId_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[CarBookingDetails] CHECK CONSTRAINT [FK_CarBookingDetails_UserId_Users_UserId]
GO
ALTER TABLE [dbo].[CarImages]  WITH CHECK ADD  CONSTRAINT [FK_CarImages_CarId_CarDetails_CarId] FOREIGN KEY([CarId])
REFERENCES [dbo].[CarDetails] ([CarId])
GO
ALTER TABLE [dbo].[CarImages] CHECK CONSTRAINT [FK_CarImages_CarId_CarDetails_CarId]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_UserTypeId_UserTypes_UserTypeId] FOREIGN KEY([UserTypeId])
REFERENCES [dbo].[UserTypes] ([UserTypeId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_UserTypeId_UserTypes_UserTypeId]
GO
USE [master]
GO
ALTER DATABASE [CarRental] SET  READ_WRITE 
GO
