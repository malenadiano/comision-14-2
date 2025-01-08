
export class ShoppingCart {

    constructor() {
        this.quantity = '#productAmount'; 
        this.unitPrice = '#unitPrice';  
    }

    totalPrice(unitPrice, quantity) {
        // Asegurarse de convertir los valores a números antes de realizar el cálculo
        const unitPriceValue = parseFloat(unitPrice.replace('$', '').replace(',', '').trim());
        const quantityValue = parseInt(quantity, 10);

    
        // Calcular el precio total
        const totalPrice = unitPriceValue * quantityValue;

        // Crear una variable con el símbolo de pesos
        const totalPriceWithSymbol = `$${totalPrice.toFixed(2)}`; // Añadir el símbolo de pesos

        return totalPriceWithSymbol; // Retorna el precio total con el símbolo
    }
}
