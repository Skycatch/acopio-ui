// AdminCenters.js
// Route: /admin/centers/

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './admin.css';
import './AdminCenters.css';
import api from '../../api'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Link } from 'react-router-dom'


export default class AdminCenters extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.deleteCenter = this.deleteCenter.bind(this)
  }
  componentDidMount() {
    api.getAcopios().then(result => {
      if(result.status === 200) {
        let centerObj = {}
        result.data.forEach(center => {
          centerObj[center.id] = center
        })
        this.setState({
          centers: centerObj
        });
      }
    })
  }
  deleteCenter(e) {
    e.preventDefault();
    let delid = e.target.dataset['id']
    if(!window.confirm('Are you sure you want to delete ' + this.state.centers[delid].nombre + '?')){
      return false;
    }
    api.deleteAcopio(delid).then(result => {
      if(result.status === 200) {
        console.log("Successfully deleted " + delid);
        const centers = {...this.state.centers};
        delete centers[delid];
        this.setState({centers});
      }
    });
  }
  render() {
    var centers;
    let uri = '/admin/centers/';
    if(this.state.centers) {
      centers = Object.keys(this.state.centers).map((centerkey, index) => {
        let center = this.state.centers[centerkey]
        return (
          <TableRow key={center.id} className="rowhover">
            <TableRowColumn style={styles.smallCol}>
              <Link to={uri+center.id}>{index+1}</Link>
            </TableRowColumn>
            <TableRowColumn>
              <Link to={uri+center.id}>{center.id}</Link>
            </TableRowColumn>
            <TableRowColumn>
              <Link to={uri+center.id}>{center.nombre}</Link>
            </TableRowColumn>
            <TableRowColumn title={center.direccion}>{center.direccion}</TableRowColumn>
            <TableRowColumn>
              <a href="#">{ center.geopos ? '(' + center.geopos.lat + ', ' + center.geopos.lng + ')' : ''}</a>
            </TableRowColumn>
            <TableRowColumn style={styles.mediumCol}>
              <a data-id={center.id} className="edit-btn" href="#">Edit</a>
              <a onClick={e => {this.deleteCenter(e)}} data-id={center.id} className="del-btn" href="#">Delete</a>
            </TableRowColumn>
          </TableRow>
        )
      })
    }
    else {
      centers = (<TableRow> <TableRowColumn colSpan={4}> No se encontraron resultados </TableRowColumn> </TableRow>);
    }

    return (
      <div className="content container">
        <div className="AdminCenters">
          <h1>Administrar centros de acopio</h1>
          <div className="row cf">
            <a className="u-fl" href="#">Ver todos</a>
            <RaisedButton label="+ Agregar nuevo" primary className="u-fr" />
          </div>
          <div className="centerList">
            <Table >
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={styles.smallCol}>#</TableHeaderColumn>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Nombre</TableHeaderColumn>
                  <TableHeaderColumn>Direcci&oacute;n</TableHeaderColumn>
                  <TableHeaderColumn>Coordenadas (lat, long)</TableHeaderColumn>
                  <TableHeaderColumn style={styles.mediumCol}>Actions</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {centers}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}

var styles = {
  smallCol: {width: '4%'},
  mediumCol: {width: '15%'}
}
