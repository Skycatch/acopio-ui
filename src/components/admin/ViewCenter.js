import React, {Component} from 'react'
import {
	TextField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	RaisedButton,
} from 'material-ui'
import api from '../../api'
import './admin.css'
import './ViewCenter.css'

const serial = fn =>
	fn.reduce((promise, fn) =>
		promise.then(result => fn().then(Array.prototype.concat.bind(result))),
	Promise.resolve([]))

class ViewCenter extends Component {

	constructor (props) {
		super(props)
		this.state = {
			loading: true,
			center: {},
			productList: [],
			filteredProducts: [],
			newProduct: '',
			filter: '',
			selected: []
		}
	}

	componentDidMount () {
		this.initComp()
	}

	initComp () {
		const { id } = this.props.match.params
		const product = api.getProductosByAcopioId(id).then(({data: productList}) => {
			this.setState(() => ({ productList, filteredProducts: productList }))
		})
		api.getAcopio(id).then(result => {
			this.setState({center: result.data});
		})
		this.setState(() => ({ loading: true }))
		product.then(() => {
			this.setState(() => ({ loading: false, filter: '', newProduct: '' }))
		})

	}

	onChangeFilter (evt, filter) {
		const { productList } = this.state
		const inputValue = filter.trim().toLowerCase()
		const inputLength = inputValue.length
		const filteredProducts = inputLength === 0 ? productList : productList.filter(({nombre}) =>
			nombre.toLowerCase().slice(0, inputLength) === filter
		)
		this.setState(() => ({ filteredProducts, filter }))
	}

	onRowSelection (selected) {
		window.requestAnimationFrame(() => {
			this.setState(() => ({ selected }))
		})
	}

	onSave () {
		const { id } = this.props.match.params
		const { newProduct } = this.state
		api.saveProducto({
			acopioId: id,
			nombre: newProduct
		}).then((res) => {
			this.initComp()
		})
	}

	onDelete () {
		const { selected, filteredProducts } = this.state
		if (selected === 'none') return
		this.setState(() => ({ loading: true }))
		const toDelete = (selected === 'all' ? filteredProducts : selected.map(index => filteredProducts[index])).map(({ id }) => id)

		const fns = toDelete.map(id => () => api.deleteProducto(id))
		serial(fns).then((res) => {
			this.initComp()
		})
	}

	render () {
		const { newProduct, filteredProducts, filter, selected } = this.state
		return this.state.loading ? <div className="container"><h2>Loading</h2></div> : (
			<div className="ViewCenter container content">
				<h2>{this.state.center.nombre}</h2>
				<TextField
					hintText="Nuevo Producto"
					value={newProduct}
					onChange={(evt, newProduct) => { this.setState(() => ({ newProduct })) }}
				/>
				<br />
				<RaisedButton label="Crear" primary onClick={this.onSave} />
				<br />
				<TextField
					hintText="Filtrar"
					value={filter}
					onChange={this.onChangeFilter}
				/>
				<br />
				<RaisedButton label="Borrar" secondary onClick={this.onDelete} />
				<Table multiSelectable onRowSelection={this.onRowSelection} >
					<TableHeader>
						<TableRow>
							<TableHeaderColumn>Nombre</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredProducts.map(({ nombre, id }, index) =>
							(<TableRow key={id} selected={selected.indexOf(index) !== -1}>
								<TableRowColumn>{nombre}</TableRowColumn>
							</TableRow>)
						)}
					</TableBody>
				</Table>
				<RaisedButton label="Borrar" secondary onClick={this.onDelete} />
			</div>
		)
	}
}

export default ViewCenter;
