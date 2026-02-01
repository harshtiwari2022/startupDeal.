# Startup Benefits & Deals Platform

A full-stack web application that provides **exclusive SaaS deals and benefits** to startups, founders, and indie hackers.  
The platform enforces **authentication, authorization, and verification-based access control** while maintaining a premium, animated user experience.

---
<img width="1746" height="977" alt="Screenshot 2026-01-29 170118" src="https://github.com/user-attachments/assets/12c2be19-8443-43e3-a0f6-4eef28594fd7" />

## 1. End-to-End Application Flow,

1. A user lands on the **Landing Page** and understands the value proposition.
2. The user **registers** with name, email, and password.
3. The user **logs in** and receives a JWT from the backend.
4. The JWT is stored on the frontend and used for authenticated requests.
5. The user browses **available deals**.
6. Some deals are **public**, while others are **locked**.
7. Locked deals require the user to be **verified**.
8. The user can **claim an eligible deal**.
9. Claimed deals appear in the **User Dashboard** with status tracking:
   - `pending`
   - `approved`
   - `rejected`

The application prioritizes **clarity of flow and correctness** over excessive features.

---

## 2. Authentication and Authorization Strategy

### Authentication
- Authentication is implemented using **JWT (JSON Web Tokens)**.
- On successful login, the backend issues a signed JWT.
- The token is stored on the frontend (`localStorage`).
- All protected API requests include:


### Authorization
- Middleware validates the JWT and attaches user data to the request.
- Certain actions (e.g. claiming locked deals) require:

- - Unauthorized or unverified requests are blocked with proper HTTP status codes.

This ensures secure access control across the application.

---

## 3. Internal Flow of Claiming a Deal
<img width="1676" height="802" alt="Screenshot 2026-01-29 170153" src="https://github.com/user-attachments/assets/d8749700-99ae-4fc8-a21c-d4fe37231309" />

<img width="1620" height="694" alt="Screenshot 2026-01-29 170133" src="https://github.com/user-attachments/assets/1cd295ce-a052-4e82-8f9b-bd4c457c28aa" />

1. User clicks **“Claim Deal”** on a deal detail page.
2. Frontend sends a request to:
3. 3. Backend performs the following checks:
- User is authenticated
- Deal exists
- Deal has not already been claimed by the user
- If the deal is locked, the user must be verified
4. A new `Claim` record is created with status `pending`.
5. The claim is stored in the database.
6. The user sees the claimed deal in the **Dashboard**.

Duplicate claims are prevented using both backend validation and database-level constraints.

---

## 4. Interaction Between Frontend and Backend

- Frontend is built using **Next.js (App Router)**.
- Backend exposes **REST APIs** using Express.js.
- Frontend fetches all dynamic data (auth, deals, claims) from the backend.
- Auth state is derived from the JWT and reflected in the UI.
- Frontend and backend responsibilities are clearly separated.

This results in a predictable and maintainable request–response flow.

---

## 5. Known Limitations / Weak Points

- User verification is simulated using a boolean flag.
- No email verification or OTP flow.
- No admin panel for managing deals or claims.
- JWT is stored in localStorage (not ideal for production).
- No pagination on the deals list.
- Limited advanced error handling.

These limitations were accepted to meet time constraints.

---

## 6. Improvements Required for Production Readiness

For a production-grade system, the following improvements would be required:

- Use HTTP-only cookies for JWT storage
- Add email verification and account recovery
- Implement an admin dashboard
- Add pagination, caching, and search optimization
- Apply rate limiting and request validation
- Improve logging, monitoring, and error handling
- Harden security headers and CORS policies

---

## 7. UI and Performance Considerations

- Premium SaaS-style UI with Tailwind CSS
- Page transitions and micro-interactions using Framer Motion
- Optional Three.js 3D hero element for visual engagement
- Loading states for async operations
- Animations are used to enhance usability, not distract

Performance considerations include:
- Minimal client-side state
- Efficient rendering
- Indexed database queries
- Clean component separation

---

## Final Notes

This project focuses on:
- Clear product thinking
- Correct backend logic
- Real frontend–backend integration
- Explainable design decisions

All code is written with clarity and maintainability in mind.

---

**Author:** Harsh Tiwari  
**Role:** Full-Stack Developer


