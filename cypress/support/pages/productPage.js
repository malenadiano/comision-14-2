export class ProductPage {

    constructor() {

        this.onlineShop = '#onlineshoplink';
        this.goToShoppingCart = '#goShoppingCart';


    }

    clickOnlineShop() {


        cy.get(this.onlineShop, { timeout: 30000 }).click();

    }

    clickGoToShoppingCart() {


        cy.get(this.goToShoppingCart, { timeout: 30000 }).click();
    }

    elegirProducto1() {

        cy.get('#add-to-cart-1003').click();
    }

    elegirProducto2() {

        cy.get('#add-to-cart-1004').click();

    }
}