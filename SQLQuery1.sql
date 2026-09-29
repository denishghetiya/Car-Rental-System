--delete from [dbo].[CarBookingDetails]
--delete from [dbo].[CarImages]
--delete from [dbo].[CarDetails]

select * from [dbo].[CarDetails]
select * from [dbo].[CarImages]

select * from [dbo].[CarBookingDetails]

select * from [dbo].[Users]
select * from [dbo].[UserTypes]

--UPDATE CarDetails SET IsDeleted = 0, IsOnRent=0 WHERE CarId = 12;
--UPDATE CarImages SET IsDeleted = 0 WHERE CarId = 6;
--UPDATE CarBookingDetails SET IsDeleted = 0 WHERE CarId = 27;

ALTER TABLE [Users] ADD CONSTRAINT FK_Users_UserTypeId_UserTypes_UserTypeId FOREIGN KEY (UserTypeId) REFERENCES UserTypes(UserTypeId);
