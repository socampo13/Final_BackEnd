import { async } from "rxjs";
import productosEnVenta from "../productos";

export const renderProductoCard = (req, res) => {
    res.render("/api/productos/guardar");
};

export const createNewProduct = async(req, res) => {
    const { id, title, price, picture, description } = req.body;
    const errors = [];
    if(!id) {
        errors.push({text: "Ingresa un id" });
    }
    if(!title) {
        errors.push({text: "Ingresa un nombre"});
    }
    if(!price) {
        errors.push({text: "Ingresa un precio"});
    }
    if(!picture) {
        errors.push({text: "Ingresa un link a una imágen"});
    }
    if(!description) {
        errors.push({text: "Ingresa una descripción"});
    }
    if(errors.length > 0) {
        res.render("/api/productos/guardar", {
            errors,
            id,
            title,
            price,
            picture,
            description,
        });
    } else {
        const nuevoProducto = new ProductosEnVenta ({id, title, price, picture, description});
        nuevoProducto.user = req.user.id;
        await nuevoProducto.save();
        req.flash("success_msg", "Nuevo producto agregado con exito");
        res.redirect("/api/productos/vista");
    }
};

export const renderProductos = async (req, res) => {
    const productos = await ProductosEnVenta.find({ user: req.user.id })
    .sort({ date: "desc"})
    .lean();

    res.render("/api/productos/vista", { productos });
};

export const renderEdit = async (req, res) => {
    const productoNuevo = await ProductosEnVenta.findById(req.params.id).lean();
    if(productoNuevo.user != req.user.id) {
        req.flash("error_msg", "Sin autorización");
        return res.redirect("/api/productos/vista");
    }
    res.render("/api/productos/actuaslizar/:id", { productoNuevo });
}

export const updateProducto = async (req, res) => {
    const {id, title, price, picture, description} = req.body;
    await ProductosEnVenta.findByIdAndUpdate(req.params.id, {id, title, price, picture, description});
    req.flash("success_msg", "Producto actualizado con exito");
    res.redirect("/api/productos/vista");
};

export const borrarProducto = async (req, res) => {
    await ProductosEnVenta.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Producto borrado con exito");
    res.redirect("/api/productos/vista");
};