// AdminAddCenter.js

import React from 'react';
import api from '../../api';
import {TextField, RaisedButton} from 'material-ui';
import {Link} from 'react-router-dom';
import './admin.css';
import './AdminAddCenter.css';

const baseState = {
	name: '',
	address: '',
	lat: '',
	long: ''
}

export default class AdminAddCenter extends React.Component {
	constructor() {
		super();
		this.state = baseState;
		this.addNewCenter = this.addNewCenter.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}
	addNewCenter() {
		const newCenter = {
			nombre: this.state.name,
			direccion: this.state.address,
			geopos: {
				lat: this.state.lat,
				lng: this.state.long
			}
		};
		api.saveAcopio(newCenter).then(result => {
			if(result.status === 200) {
				this.setState({
					success: true
				});
				this.resetFields();
			}
		});
	}
	resetFields(){
		this.setState(baseState);
	}
	handleUpdate(e) {
		this.setState({
			[e.target.name] : e.target.value
		});
	}
	render() {
		return (
			<div className="AdminAddCenter container content">
				<Link to="/admin/centers">Ver todos los centros</Link>
				{this.state.success ? (<p className="tac successMsg"><i className="fa fa-check"></i>Guardado exitosamente</p>) : ''}
				<h1 style={{marginBottom: 30}}>Agregar nuevo centro de acopio</h1>
				<form action="#" className="AddCenterForm">
					<TextField value={this.state.name} onChange={this.handleUpdate} name="name" fullWidth hintText="Nombre del centro" />
					<TextField value={this.state.address} onChange={this.handleUpdate} name="address" fullWidth hintText="Direcci&oacute;n" />
					<div className="cf">
						<TextField value={this.state.lat} onChange={this.handleUpdate} name="lat" className="half" hintText="Latitud" />
						<TextField value={this.state.long} onChange={this.handleUpdate} name="long" className="half" hintText="Longitud" />
					</div>
					<RaisedButton onClick={this.addNewCenter} label="Enviar" buttonStyle={{height: 50}} className="submit btn" primary fullWidth />
				</form>
			</div>
		)
	}
}
