
export class Receip {
    
    constructor() {
        this.billingSummary = '#goBillingSummary';
        this.checkOut = 'button:contains("Go to Checkout")';
        
    }

    clickBillingSummary() {

cy.get(this.billingSummary).click();

}

clickCheckOut(){

    cy.get(this.checkOut).click();
}

    validarDatos(checkout) {
      
            // Validar nombre completo
            cy.get('[data-cy="name"]').should('be.visible')
                .should('have.text', `${checkout.nombre} ${checkout.apellido} has succesfully purchased the following items:`);

            // Validar precio de tarjeta
            cy.get('[data-cy="creditCard"]').should('have.text', checkout.tarjeta);

    }
    validarProductos(){

        cy.fixture('productos.json').then((data) => {
            cy.get('#product-1').should('include.text', data.Producto1.nombre);
            cy.get('#product-2').should('include.text', data.Producto2.nombre);
              const totalPrice = (data.Producto1.quantity * data.Producto1.unitPrice) + (data.Producto2.quantity * data.Producto2.unitPrice);
             cy.get('[data-cy="totalPrice"]').should('include.text', `$${totalPrice}`);
     
        })
          


    };

};
