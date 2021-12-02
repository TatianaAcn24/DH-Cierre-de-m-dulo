let autos = require('./autos');

const concesionaria = {
    autos: autos,
    buscarAuto: function (patente) {
        let resultado;
        autos.forEach(elemento => {
            if (elemento.patente == patente) {
                resultado = elemento;
            }
        });
        if (resultado == undefined)
            resultado = null;
        return resultado;
    },
    venderAuto: function (patente) {
        let autoParaVender = this.buscarAuto(patente);
        if (autoParaVender != null) {
            autoParaVender.vendido = true;
        }
        return autoParaVender;
    },
    autosParaLaVenta: function () {
        let autosEnVenta = autos.filter((elemento) => { return elemento.vendido == false });
        return autosEnVenta;
    },
    autosNuevos: function () {
        let autosParaVenta = this.autosParaLaVenta();
        let autoNuevo = autosParaVenta.filter(function (elemento) {
            return elemento.km < 100;
        });
        return autoNuevo;
    },
    listaDeVentas: function () {
        let precios = [];
        let listaDeVentas = autos.filter(function (elemento) {
            if (elemento.vendido == true) {
                return elemento.precio;
            }
        });
        listaDeVentas.forEach(elemento => {
            precios.push(elemento.precio);
        })
        return precios;
    },
    totalDeVentas: function () {
        let autosVendidos = this.listaDeVentas();
        if (autosVendidos.length >= 1) {
            let totalDeVentas = autosVendidos.reduce(function (acumulador, carros) {
                return acumulador + carros;
            });
            return totalDeVentas;
        }
        else
            return 0;
    },
    puedeComprar: function (auto, persona) {
        let { precio, cuotas } = auto;
        let pagoPorCuota = precio / cuotas;
        let { capacidadDePagoEnCuotas, capacidadDePagoTotal } = persona;
        if (capacidadDePagoEnCuotas >= pagoPorCuota && capacidadDePagoTotal >= precio) {
            return true;
        }
        else {
            return false;
        }
    },
    autosQuePuedeComprar(persona) {
        let autosParaLaVenta = this.autosParaLaVenta();
        let puedeComprar = [];
        autosParaLaVenta.forEach((elemento) => {
            puedeComprar.push(this.puedeComprar(elemento, persona));

        })
        let autosQuePuedeComprar = [];
        autos.forEach((elemento, indice) => {
            if (puedeComprar[indice] == true) {
                autosQuePuedeComprar.push(elemento);
            }
        });
        return autosQuePuedeComprar;
    }
};

/* 
console.log(concesionaria.buscarAuto('APL123'));
console.log(concesionaria.buscarAuto('JJK116'));
console.log(concesionaria.buscarAuto('ABC123'));
console.log(concesionaria.venderAuto('APL123'));
console.log(concesionaria.venderAuto('JJK116'));
console.log(concesionaria.venderAuto('ABC123'));
console.log(concesionaria.autosParaLaVenta());
console.log(concesionaria.autosNuevos());
console.log(concesionaria.listaDeVentas());
console.log(concesionaria.totalDeVentas());
let persona = {
    nombre: "Juan",
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000
};
console.log(concesionaria.autosQuePuedeComprar(persona)); */