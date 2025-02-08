import { LoginPage } from "../support/pages/loginPage";
import { ProductPage } from "../support/pages/productPage";
import { ShoppingCart } from "../support/pages/shoppingCart";
import { Checkout } from "../support/pages/checkOut";
import { Receip } from "../support/pages/recipt";

describe("Entrega Final", () => {

  const loginPage = new LoginPage();
  const productPage = new ProductPage();
  const shoppingCart = new ShoppingCart();
  const checkOut = new Checkout();
  const recipt = new Receip();
  const baseAPIUrl = 'https://pushing-it.onrender.com/api';
  let username;
  let password = '123456!';
  let token;
  
  before(() => {
    // Registro y login del usuario en la API
    username = 'usuario' + Math.floor(Math.random() * 1000);
    const gender = "Female";
    const day = '04';
    const month = 'November';
    const year = "1988";
    cy.request({
      method: 'POST',
      url: `${baseAPIUrl}/register`,
      body: {
        "username": username,
        "password": password,
        "gender": gender,
        "day": day,
        "month": month,
        "year": year,
      },
    }).then(response => {
      expect(response.status).to.be.equal(201);
      token = response.body.token; 
    });
    cy.request({
      method: 'POST',
      url: `${baseAPIUrl}/login`,
      body: {
        "username": username,
        "password": password,
      },
    }).then(response => {
      expect(response.status).to.be.equal(201);
      expect(response.body.user.username).to.be.equal(username);
 
    cy.fixture('productos').as('add');
    cy.visit('');
    cy.get('#registertoggle').dblclick();
    loginPage.escribirUsuario(Cypress.env().usuario);
    loginPage.escribirContraseña(Cypress.env().contraseña);
    cy.get('#submitForm').click();
    cy.wait(3000);
  });
});

  it('Debería registrar, logearse, hacer compra y borrar usuario', function () {
    // 1. Flujo de compra
    productPage.clickOnlineShop();
    shoppingCart.elegirProducto1(), { timeout: 10000 };
    cy.get('#closeModal').click();
    shoppingCart.elegirProducto2(), { timeout: 10000 };
    cy.get('#closeModal').click();
    shoppingCart.elegirProducto1(), { timeout: 10000 };
    cy.get('#closeModal').click();
    shoppingCart.clickGoToShoppingCart();

    cy.fixture('productos.json').then((data) => {
      cy.contains(data.Producto1.nombre).should('be.visible').should('have.text', data.Producto1.nombre);
      cy.contains(data.Producto1.nombre).siblings('#unitPrice').should('have.text', `$${data.Producto1.unitPrice}`);
      cy.contains(data.Producto1.nombre).siblings('#productAmount').should('have.text', data.Producto1.quantity);
      cy.contains(data.Producto1.nombre).siblings('#totalPrice').should('have.text', `$${(data.Producto1.unitPrice * data.Producto1.quantity)}`);
      
      cy.contains(data.Producto2.nombre).should('be.visible').should('have.text', data.Producto2.nombre);
      cy.contains(data.Producto2.nombre).siblings('#unitPrice').should('have.text', `$${data.Producto2.unitPrice}`);
      cy.contains(data.Producto2.nombre).siblings('#productAmount').should('have.text', data.Producto2.quantity);
      cy.contains(data.Producto2.nombre).siblings('#totalPrice').should('have.text', `$${(data.Producto2.unitPrice * data.Producto2.quantity)}`);
      
      checkOut.clickShowTotalPrice();
      cy.get('p#price b').should('have.text', data.Producto1.quantity * data.Producto1.unitPrice + data.Producto2.quantity * data.Producto2.unitPrice);
      recipt.clickBillingSummary();
      recipt.clickCheckOut();
      
      cy.fixture('checkout.json').then((check) => {
        check.Checkout.nombre;
        check.Checkout.apellido;
        check.Checkout.tarjeta;
        checkOut.datosPersonales();
        checkOut.clickPuchase();
        recipt.validarDatos(check.Checkout);
        recipt.validarProductos();
      });
    });
  });

  after(() => {
    // Eliminar el usuario 
    cy.request({
      method: 'DELETE',
      url: `${baseAPIUrl}/deleteuser/${username}`,
      headers: {
        "authorization": `Bearer ${token}`,
      },
    }).then(response => {
      cy.log(response)
      expect(response.status).to.be.equal(202);
    });
    // Validar que el usuario fue borrado
    cy.request({
      method: 'GET',
      url: `${baseAPIUrl}/${username}`,
      failOnStatusCode: false,
      headers: {
        "authorization": `Bearer ${token}`,
      },
    }).then(response => {
      cy.log(response)
      expect(response.status).to.be.equal(404);
    });
  });

});
