const fs = require('fs')
    //arreglo
let listadoPorHacer = [];

const guardarDB = () => {
    //CONVIERTE un objeto a un json valido
    let data = JSON.stringify(listadoPorHacer);
    // grabamos en un archivo .json
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}
const cargarDB = () => {
    //leer un archivo .json
    try {
        listadoPorHacer = require('../db/data.json');
        //para que vaya agregando en el array y no lo
        //reescriba 
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        descripcion: descripcion,
        completado: false

    };
    listadoPorHacer.push(porHacer); //agrega un elemento en array

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    //buscar elemento y retorna la posición de elemento 
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    //borrar un elemento de el arreglo, filtrar de un arreglo
    //las descripciones que sea diferente a la mandada
    //excluyo ese elemento del listado en un nuevolistado
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}