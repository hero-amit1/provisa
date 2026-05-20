# Task TODO

## Step 1 — Upload routes hardening (400 instead of 500) ✅
- Update:
  - `backend/routes/admin/blogs.js`
  - `backend/routes/admin/team.js`
  - `backend/routes/admin/universities.js`
- Goal: catch `upload.single('image')` / Cloudinary/multer failures and return a clean JSON `400` with `message`, instead of generic 500.


## Step 2 — Testimonials rating NaN prevention ✅
- Updated `frontend/src/pages/admin/AdminTestimonials.tsx`
- Goal: prevent `rating` becoming `NaN` when user clears the number input; clamp to 1..5.

## Step 3 — Optional better frontend error surfacing
- Update `frontend/src/lib/api.ts` to log endpoint/payload + parsed backend error body.

## Step 4 — Validate
- Restart backend.
- Re-test failing endpoints and confirm:
  - blogs/team/universities: no longer 500 for upload issues; you get meaningful 400.
  - testimonials: no more rating-related 400 due to NaN.


