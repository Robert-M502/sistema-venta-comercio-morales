/* Usuarios en la panel administrativo */
const nuevo = document.querySelector("#nuevo_registro");
const frm = document.querySelector("#frmRegistro");
const titleModal = document.querySelector("#titleModal");
let tblUsuarios;

const myModal = new bootstrap.Modal(document.getElementById("nuevoModal"));

document.addEventListener("DOMContentLoaded", function () {
    /* Cargar datos pendientes con DataTables */
    tblUsuarios = $("#tablUsuarios").DataTable({
        ajax: {
            url: base_url + "usuarios/listar",
            dataSrc: "",
        },
        columns: [{ data: "id" }, { data: "nombres" }, { data: "apellidos" }, { data: "correo" }, { data: "perfil" }],
        language /* Variable/es-ES.js */,
        dom /* Variable/es-ES.js */,
        buttons /* Variable/es-ES.js */,
    });
    /* Levantar modal */
    nuevo.addEventListener("click", function () {
        titleModal.textContent = "Nuevo usuario";
        myModal.show();
    });

    /* Submit  usuarios */
    frm.addEventListener("submit", function (e) {
        e.preventDefault();
        let data = new FormData(this);
        /* Ajax */
        const url = base_url + "usuarios/registrar"; /* controlador/metodo */
        const http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.send(data);
        /* Verificar el estados */
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(
                    this.responseText
                ); /* Muestra claramente si hay error en el contraldor, modelo u otros archivos en la consola o en la red */
                const res = JSON.parse(this.responseText);
                if (res.icono == "success") {
                    /* Ocultar modal */
                    myModal.hide();
                    /* Recarga la tabla con ajax */
                    tblUsuarios.ajax.reload();
                }
                Swal.fire("Aviso", res.msg.toUpperCase(), res.icono); //Alerta
            }
        };
    });
});
