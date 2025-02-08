
export class ShoppingCart {
    constructor() {
        this.quantity = '#productAmount'; 
        this.unitPrice = '#unitPrice';  
        this.goToShoppingCart = '#goShoppingCart';
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
