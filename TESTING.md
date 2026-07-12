# Manual API Testing Evidence

Automated test coverage was not completed in the available timeframe.
The core flows were manually verified end-to-end via Postman; evidence below.

## Auth & RBAC
![Valid token test](./docs/testing-evidence/valid_token_test.png)
![Patient view](./docs/testing-evidence/as_patients.png)
![Doctor view](./docs/testing-evidence/as_doctors_view.png)

## Doctor Availability
![Doctor profile creation](./docs/testing-evidence/doctors_profile.png)
![List all doctors](./docs/testing-evidence/list_all_doctors.png)
![View availability](./docs/testing-evidence/view_avilability.png)
![Doctor availability](./docs/testing-evidence/doctors_availaibility.png)

## Booking (Idempotency & Concurrency)
![Book appointment](./docs/testing-evidence/book_an_appointment.png)
![Already booked slot - 409](./docs/testing-evidence/already_booked_slot.png)