import { LoginPage } from "../support/pages/loginPage";
import { ProductPage } from "../support/pages/productPage";
import { ShoppingCart } from "../support/pages/shoppingCart";

describe("Desafio pre-entrega", () => {


  const loginPage = new LoginPage();
  const productPage = new ProductPage();
  const shoppingCart = new ShoppingCart();



  before('Before', () => {



  })


  beforeEach(() => {
    cy.fixture('productos').as('add')
    cy.visit('');
    cy.get('#registertoggle').dblclick()




  })

  it('Pre-entrega', function () {
    const cantidadEsperadaProducto1 = 2;
    const cantidadEsperadaProducto2 = 1;



    loginPage.escribirUsuario(Cypress.env().usuario);
    loginPage.escribirContraseña(Cypress.env().contraseña);
    cy.get('#submitForm').click();
    cy.wait(3000);

    productPage.clickOnlineShop();
    productPage.elegirProducto1(), { timeout: 10000 };
    cy.get('#closeModal').click();
    productPage.elegirProducto2(), { timeout: 10000 };
    cy.get('#closeModal').click();
    productPage.elegirProducto1(), { timeout: 10000 };
    cy.get('#closeModal').click();
    productPage.clickGoToShoppingCart();

    cy.fixture('productos.json').then((data) => {



      const producto1 = data.Producto1;

      const unitPriceProducto1 = producto1.unitPrice;
      const quantityProducto1 = producto1.quantity;

      const producto2 = data.Producto2;

      const unitPriceProducto2 = producto2.unitPrice;
      const quantityProducto2 = producto2.quantity;

      const expectedTotalPriceProducto1 = shoppingCart.totalPrice(unitPriceProducto1, quantityProducto1);
      const expectedTotalPriceProducto2 = shoppingCart.totalPrice(unitPriceProducto2, quantityProducto2);




      cy.contains("Jean Azul", { timeout: 10000 }).should('be.visible').should('have.text', data.Producto1.nombre);
      cy.contains('Jean Azul').siblings('#unitPrice').should('have.text', data.Producto1.unitPrice);
      cy.contains('Jean Azul').siblings('#productAmount').should('have.text', cantidadEsperadaProducto1);
      cy.contains('Jean Azul').siblings('#totalPrice').should('have.text', expectedTotalPriceProducto1);


      cy.contains("Sweater rosa", { timeout: 10000 }).should('be.visible').should('have.text', data.Producto2.nombre);
      cy.contains('Sweater rosa').siblings('#unitPrice').should('have.text', data.Producto2.unitPrice);
      cy.contains('Sweater rosa').siblings('#productAmount').should('have.text', cantidadEsperadaProducto2);
      cy.contains('Sweater rosa').siblings('#totalPrice').should('have.text', expectedTotalPriceProducto2);


    });

  });

});



