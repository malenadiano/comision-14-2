export class ProductPage {
    constructor() {
        this.onlineShop = '#onlineshoplink';
       
    }
    clickOnlineShop() {
        cy.get(this.onlineShop, { timeout: 30000 }).click();
    }




    
 
}

