# Property Connection Fixes - TODO List

## Issues Identified:

1. Frontend form missing fields that backend expects (roomType, parking, parkingType, etc.)
2. Form data structure needs to match backend property schema
3. Some backend fields are not being captured in the frontend form

## Steps to Fix:

### [x] 1. Update formData state to include all required backend fields

- Add missing fields: roomType, parking, parkingType, propertyAge, floorNumber, totalFloors, facingDirection, waterSupply, electricity, availableFrom

### [ ] 2. Update form steps to capture additional fields

- Step 1: Add roomType field (already in UI but not in formData)
- Step 3: Add additional property specification fields
- Step 4: Add utility and availability fields

### [ ] 3. Fix handleSubmit function to properly map all fields

- Ensure all form fields are included in FormData
- Handle proper data type conversions

### [ ] 4. Test the complete flow

- Verify property creation works
- Check that properties appear in Properties page
- Validate all data is properly saved and displayed

## Current Progress:

- [x] Step 1: Update formData state ✓
- [ ] Step 2: Update form steps
- [ ] Step 3: Fix handleSubmit
- [ ] Step 4: Test flow
