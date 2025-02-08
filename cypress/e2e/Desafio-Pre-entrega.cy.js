import { LoginPage } from "../support/pages/loginPage";
import { ProductPage } from "../support/pages/productPage";
import { ShoppingCart } from "../support/pages/shoppingCart";

describe("Desafio pre-entrega", () => {


  const loginPage = new LoginPage();
  const productPage = new ProductPage();
  const shoppingCart = new ShoppingCart();

  beforeEach(() => {
    cy.fixture('productos').as('add')
    cy.visit('');
    cy.get('#registertoggle').dblclick();
    loginPage.escribirUsuario(Cypress.env().usuario);
    loginPage.escribirContraseña(Cypress.env().contraseña);
    cy.get('#submitForm').click();
    cy.wait(3000);

  })

  it('Pre-entrega', function () {
    // const cantidadEsperadaProducto1 = 2;
    // const cantidadEsperadaProducto2 = 1;
    productPage.clickOnlineShop();
    productPage.elegirProducto1(), { timeout: 10000 };
    cy.get('#closeModal').click();
    productPage.elegirProducto2(), { timeout: 10000 };
    cy.get('#closeModal').click();
    productPage.elegirProducto1(), { timeout: 10000 };
    cy.get('#closeModal').click();
    productPage.clickGoToShoppingCart();
    cy.fixture('productos.json').then((data) => {



data.Producto1.unitPrice;
data.Producto1.quantity;
     data.Producto2unitPrice;
     data.Producto2.quantity;

      // const expectedTotalPriceProducto1 = shoppingCart.totalPrice(data.Producto1.unitPriceProducto1* data.Producto1.quantityProducto1);
      // const expectedTotalPriceProducto2 = shoppingCart.totalPrice(data.Producto2.unitPriceProducto2* data.Producto2.quantityProducto2);




      cy.contains(data.Producto1.nombre).should('be.visible').should('have.text', data.Producto1.nombre);
    //  cy.contains(data.Producto1.nombre).siblings('#unitPrice').should('have.text', data.Producto1.unitPrice);
      cy.contains(data.Producto1.nombre).siblings('#productAmount').should('have.text', data.Producto1.quantity);
    //  cy.contains(data.Producto1.nombre).siblings('#totalPrice').should('have.text', data.Producto1.unitPrice*data.Producto1.quantity);


      cy.contains(data.Producto2.nombre).should('be.visible').should('have.text', data.Producto2.nombre);
    //  cy.contains(data.Producto2.nombre).siblings('#unitPrice').should('have.text', data.Producto2.unitPrice);
      cy.contains(data.Producto2.nombre).siblings('#productAmount').should('have.text', data.Producto2.quantity);
  //   cy.contains(data.Producto2.nombre).siblings('#totalPrice').should('have.text', data.Producto2.unitPrice*data.Producto2.quantity);


    });

  });

});



