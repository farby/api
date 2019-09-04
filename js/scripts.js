$("#btnRegistrar").click(registrarUsuario);
$("#btnLogin").click(loguearUsuario);
$("#btnAddTarea").click(agregarTarea);
var token;
var usuarioId;

function registrarUsuario() {
    let user = $("#user").val();
    let pass = $("#pass").val();
    let name = $("#name").val();
    
    $.ajax({
	url:"http://api.pitanga.uy/usuarios.php",
	type:"POST",
	datatype:"json",
	data:{
	    user,
	    pass,
	    name
	},
	success:mostrarDatosLogin,
	error:mostrarError
    });
}

function loguearUsuario() {
    let user = $("#userLogin").val();
    let pass = $("#passLogin").val();
    
    $.ajax({
	url:"http://api.pitanga.uy/login.php",
	type:"POST",
	datatype:"json",
	data:{
	    user,
	    pass
	},
	success:mostrarDatosLogin,
	error:mostrarError
    });
}

function buscarTareas() {
    let user = $("#user").val();
    let pass = $("#pass").val();
    let name = $("#name").val();
    
    $.ajax({
	url:"http://api.pitanga.uy/tareas.php",
	headers:{token:token},
	type:"GET",
	datatype:"json",
	data:{
	    id: usuarioId
	},
	success:mostrarTareas,
	error:mostrarError
    });
}

function agregarTarea() {
    let nombre = '' + Math.random() * 1000;
    let descripcion = 'tarea ' + nombre;
    let usuario = usuarioId;
    $.ajax({
	url:"http://api.pitanga.uy/tareas.php",
	headers:{token:token},
	type:"POST",
	datatype:"json",
	data:{
	    nombre,
	    descripcion,
	    usuario
	},
	success:function(){
	    buscarTareas();
	},
	error:mostrarError
    });
}

function modificarTarea(id, nombre) {
    nombre = prompt("Nuevo nombre de la Tarea:", nombre);
    let descripcion = 'tarea ' + nombre;
    $.ajax({
	url:"http://api.pitanga.uy/tareas.php",
	headers:{token:token},
	type:"PUT",
	datatype:"json",
	data:{
	    id,
	    nombre,
	    descripcion
	},
	success:function(){
	    buscarTareas();
	},
	error:mostrarError
    });
}

function borrarTarea(id) {
    $.ajax({
	url:"http://api.pitanga.uy/tareas.php",
	headers:{token:token},
	type:"DELETE",
	datatype:"json",
	data:{
	    id
	},
	success:function(){
	    buscarTareas();
	},
	error:mostrarError
    });
}

function mostrarDatosLogin(usuario) {
    console.log(usuario);
    token = usuario.token;
    usuarioId = usuario.id;
    buscarTareas();
}

function mostrarTareas(tareas) {
   let tar = tareas.tareas;
   let msg = ''; 
   for (t in tar) {
       let nom = tar[t].nombre;
       let id = tar[t].id
       msg += nom + "<button id=del" + id + " onclick='borrarTarea(" + id + ")'>Borrar Tarea Id " + id + "</button>";
       msg += "<button id=upd" + id + " onclick='modificarTarea(" + id + ",`" + nom + "`)'>Modificar Tarea Id " + id + "</button><br><br>";
   }
   console.log(tareas);
   $("#msg").html(msg);
}

function mostrarError(e) {
    alert(e.responseJSON.mensaje);
    console.log(e);
}
