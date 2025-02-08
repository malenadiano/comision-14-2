export class Checkout {
    
    constructor() {
        this.preciosCheckOut = 'p#price b';
        this.datoApellido = '#lastName';
        this.datoNombre = '#FirstName';
        this.datoTarjeta = '#cardNumber';
        this.clickPurchase = '[data-cy="purchase"]';
    }
       
    clickShowTotalPrice() {
        cy.contains('button', 'Show total price').click();
    }


    datosPersonales() {
        cy.fixture('checkOut.json').then((check) => {
            cy.get(this.datoNombre).type(check.Checkout.nombre);
            cy.get(this.datoApellido).type(check.Checkout.apellido);
            cy.get(this.datoTarjeta).type(check.Checkout.tarjeta);

       
        });

        
    }

        clickPuchase() {

        cy.get(this.clickPurchase).click();
    }
}



