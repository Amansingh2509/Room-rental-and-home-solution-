# TODO: Booking Data Submission Fixes

## Current Issues:

1. Frontend sends `securityDepositAmount` and `paymentScreenshot` fields that backend doesn't expect
2. Backend booking endpoint only handles specific fields from booking schema
3. Property ID handling issues between URL params and form data
4. Component naming inconsistency in PropertyBooking.jsx - ✅ FIXED
5. Missing PurchaseRentalAgreement component - ✅ FIXED

## Steps to Fix:

### Backend (property.js):

- [ ] Update booking endpoint to handle additional payment fields
- [ ] Add proper validation for all incoming fields
- [ ] Ensure propertyId is correctly handled
- [x] Add rental agreement endpoint - ✅ COMPLETED

### Frontend (PropertyBooking.jsx):

- [x] Fix component name consistency - ✅ COMPLETED
- [ ] Ensure propertyId is correctly passed from URL params
- [ ] Update form submission to match backend expectations
- [ ] Add proper error handling and logging
- [x] Create PurchaseRentalAgreement component - ✅ COMPLETED
- [x] Add route for PurchaseRentalAgreement - ✅ COMPLETED

### Testing:

- [ ] Test booking submission with property ID: 68ab14ba05736ebf16fb280b
- [ ] Verify data is properly saved to MongoDB
- [ ] Check validation and error handling
- [ ] Test rental agreement submission

## Progress:

- [x] Backend fixes partially implemented
- [x] Frontend fixes partially implemented
- [ ] Testing completed
