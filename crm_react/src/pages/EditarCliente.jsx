import { Form, useLoaderData, useActionData, useNavigate, redirect } from 'react-router-dom'
import {obtenerCliente, actualizarCliente} from "../data/clientes"
import Formulario from '../components/Formulario'
import Error from '../components/Error'

export async function loader({params}){
	const cliente = await obtenerCliente(params.client_id)
	if (Object.values(cliente).length === 0){
		throw new Response('', {
			status: 404,
			statusText: 'No se encontraron clientes'
		})
	}
	return cliente
}

export async function action({request, params}){
	const formData = await request.formData()
	const datos = Object.fromEntries(formData)
	const email = formData.get("email")
	// validacion
	const errores = []
	if(Object.values(datos).includes("")){
		errores.push("todos los campos son obligatorios")
	}

	let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

	if(!regex.test(email)){
		errores.push("El email no es valido")
	}

	// retornar datos
	if(Object.keys(errores).length){
		return errores
	}

	await actualizarCliente(params.client_id, datos)
	// solo se utiliza en actions y loaders los redirects
	return redirect("/")
}

function EditarCliente(){

	const cliente = useLoaderData()
	const navigate = useNavigate()
	const errores = useActionData()

	return(
		<>
			<h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
			<p className="mt-3">Puedes modificar los datos del cliente: {cliente.nombre}</p>

			<div className="flex justify-end">
				<button className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
					onClick={()=>navigate(-1)}>
					Volver
				</button>
			</div>
			<div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
				<p>Formulario aquí</p>
				{errores?.length && errores.map((error, idx)=> <Error key={idx}> {error} </Error>)}
				<Form 
					method="post"
					noValidate
					>
					<Formulario cliente={cliente} />
					<input
						type="submit"
						className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
						value="guardar cambios"
					/>
				</Form>
			</div>
		</>
		)
}

export default EditarCliente