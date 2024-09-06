# NashtechAngularFoodShop

This project was generated with [Angular CLI](https://github.comm/angular/angular-cli) version 18.2.1.
___
# Available Screens
## Login
![image](https://github.com/user-attachments/assets/0cc72a6b-f753-455c-9292-45c8b3174a5b)

## Register
![image](https://github.com/user-attachments/assets/c4f439c8-48ef-49c9-9e87-9a296c76de21)

## Home
![image](https://github.com/user-attachments/assets/b437b07e-99f5-40eb-9d8a-957a5a14d658)

## Shop
![image](https://github.com/user-attachments/assets/efed4158-3a23-4dbd-b129-90645a4f3e08)

## Cart
![image](https://github.com/user-attachments/assets/0913e3e8-9344-418f-8845-4565679e19be)
  ### Coupon & Estimate
  ![image](https://github.com/user-attachments/assets/f030a4cf-62b1-454e-99ba-3674487ccc19)
  
## Wishlist
![image](https://github.com/user-attachments/assets/9adb20f2-79fa-4953-8085-34717b5d6ee1)

## Checkout
![image](https://github.com/user-attachments/assets/2772dc18-5dc6-42aa-a839-f056d941099f)

## Order Summary
![image](https://github.com/user-attachments/assets/175feaac-9250-47bb-a096-10fd07d7509b)
![image](https://github.com/user-attachments/assets/1f2de8a8-1efb-4fed-93af-66b1c31b4bcc)

___


# Exercise 1: Authenthication

## 1.Objectives:
Create a basic authentication system in Angular that allows users to register, log in, and access a protected route. The system will include form validation, user authentication, and route guarding.
## 2.Requirements:
- [x] available/implemented feature
- [ ] unavailable/not implemented feature 
### 1.Registration Form:
- [x] Create a registration component (RegisterComponent) with a form that includes fields for username, email, and password.
- [x] Add form validation: required fields, email format validation, and minimum password length of 6 characters.
- [x] On form submission, store the user data locally (e.g., using localStorage).	
### 2.Login Form:
- [x] Create a login component (LoginCompronent) with a form that includes fields for email and password.
- [x] Add form validation: required fields and email format validation.
- [x] On form submission, check the credentials against the stored user data.
- [x] If the credentials match, store a token (e.g., a simple string) in localStorage to simulate authentication.

### 3.Navigation:
- [x] Create a basic navigation bar with links to the registration and login pages.
- [x] Add a link to a protected route (CheckoutComponent), only accessible to logged-in users.
### 4.Authentication Service:
- [x] Create an AuthService to handle user registration, login, and authentication state.
- [x] Implement methods like register, login, isAuthenticated, and logout.
- [x] Use localStorage to persist user data and authentication status.
### 5.Protected Route:
- [x] Create a CheckoutComponent that will be accessible only to authenticated users.
- [x] Implement route guarding using an AuthGuard to protect the CheckoutComponent.
- [x] If a user tries to access the dashboard without being logged in, redirect them to the login page.
### 6.Logout:
- [x] Add a logout button to the navigation bar that clears the authentication token from localStorage and redirects the user to the login page.
___
# Exercise 2: State Management
The purpose of this document is to outline the functional and non-functional requirements for the Shopping Cart module of the e-commerce platform. This module will allow users to select and manage products they wish to purchase.

## 3.Entry point:
Dashboard( Exercise 1)

## 4.Functional features:

### 7.Add to Cart:
- [x] Users should be able to add products to the cart from product listings or product detail pages.
- [x] The system should allow adding multiple quantities of the same product.
- [x] A confirmation message should be displayed upon successful addition.
### 8.View Cart:
- [x] Users should be able to view the cart at any time by clicking on the cart icon.
- [x] The cart should display product details including name, image, price, quantity, and total price per item.
- [x] A summary section showing the total cost of all items should be visible.
### 9.Update Cart:
- [x] Users should be able to increase or decrease the quantity of products in the cart.
- [x] The system should automatically update the total price based on quantity changes.
### 10.Remove from Cart:
- [x] Users should be able to remove individual products from the cart.
- [x] A confirmation prompt should appear before removal.
- [x] The cart total should update accordingly.
### 11.Save for Later(Wishlist):
- [x] Users should have the option to move items from the cart to a “Saved for Later” list.
- [x] Saved items should be easily accessible and can be moved back to the cart.
## 5.Checkout Process
### 1.Checkout Button:
- [x] The cart should include a clearly visible "Checkout" button.
- [x] Users clicking the "Checkout" button should be redirected to the checkout process.
### 2.Apply Coupons:
- [x] Users should be able to apply discount codes or coupons in the cart.
- [x] The system should validate the coupon and apply the discount if valid.
### 3.Shipping Costs:
- [x] The cart should display estimated shipping costs based on the user's location.
### 4.Taxes:
- [x] The system should calculate and display applicable taxes based on the user's shipping address.
## 6.Session Persistence:
- [x] The cart should persist across user sessions, retaining its contents even if the user logs out and logs back in( suggest to store added items in localStorage)

___
```
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
```
