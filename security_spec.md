# Security Specification: Financo Platform

## Data Invariants
1. A **User** must have a unique UID and specified role (OWNER, WORKER, or SUPERADMIN).
2. A **Business** MUST have an ownerId that matches the UID of an OWNER user.
3. **Products** and **Sales** MUST belong to a valid `businessId`.
4. **Workers** can only access the business they are assigned to.
5. **SuperAdmins** have platform-wide read/write access to certain paths.
6. **Owners** can manage their own business and their assigned workers.

## The Dirty Dozen Payloads (Rejection Targets)
1. **Identity Theft**: A user trying to create a Business with an `ownerId` that isn't their own.
2. **Role Escalation**: A WORKER trying to update their own `role` to OWNER or SUPERADMIN in the `users` collection.
3. **Cross-Business Access**: Business A trying to read/write products of Business B.
4. **Phantom Products**: Creating a Product with a `businessId` that doesn't exist.
5. **Unauthorized Sales**: A WORKER from Business A trying to record a sale for Business B.
6. **Owner Spoofing**: Changing the `ownerId` of an existing Business to hijack it.
7. **Invalid Pricing**: Setting a `price` to a negative value or a non-numeric string.
8. **Admin Impersonation**: A regular user creating a document in the `admins` collection.
9. **Terminal State Bypass**: Updating a Sale record after it has been finalized.
10. **Shadow Data injection**: Adding extra hidden fields (e.g., `isVerified: true`) during a standard update.
11. **Client Timestamp Forgery**: Sending a `createdAt` date from 2020 instead of the current server time.
12. **Recursive Cost Attack**: Sending 1.5KB of junk data as a document ID.

## Test Runner Plan
- Test `create` on `/businesses` with mismatching `ownerId`.
- Test `update` on `/users/{uid}` by a non-owner.
- Test `list` on `/businesses/{busId}/inventory` where user is not a member.
- Test `create` on `/admins` by non-admin.
- Test `write` with missing required schema fields.
