// AdminCenters.js
// Route: /admin/centers/

import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import './admin.css'
import './AdminCenters.css'
import api from '../../api'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { Link } from 'react-router-dom'

export default class AdminCenters extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {
    api.getAcopios().then(result => {
      if (result.status === 200) {
        let centerObj = {}
        result.data.forEach(center => {
          centerObj[center.id] = center
        })
        this.setState({
          centers: centerObj
        })
      }
    })
  }

  deleteCenter = (e) => {
    e.preventDefault()
    let delid = e.target.dataset['id']
    if (!window.confirm('Are you sure you want to delete ' + this.state.centers[delid].nombre + '?')) {
      return false
    }
    api.deleteAcopio(delid).then(result => {
      if (result.status === 200) {
        const centers = {...this.state.centers}
        delete centers[delid]
        this.setState({centers})
      }
    })
  }

  render () {
    var centers
    let uri = '/admin/centers/view/'
    if (this.state.centers) {
      centers = Object.keys(this.state.centers).map((centerkey, index) => {
        let center = this.state.centers[centerkey]
        return (
          <TableRow key={center.id} className="rowhover">
            <TableRowColumn>
              <Link to={uri + center.id}>{center.nombre}</Link>
            </TableRowColumn>
            <TableRowColumn title={center.direccion}>{center.direccion}</TableRowColumn>
          </TableRow>
        )
      })
    } else {
      centers = (<TableRow> <TableRowColumn colSpan={4}> No se encontraron resultados </TableRowColumn> </TableRow>)
    }

    return (
      <div className="content container">
        <div className="AdminCenters">
          <h1>Administrar centros de acopio</h1>
          <div className="row cf">
            <a className="u-fl" href="#">Ver todos</a>
            <Link to="/admin/centers/addnew" className="u-fr">
              <RaisedButton label="+ Agregar nuevo" primary />
            </Link>
          </div>
          <div className="centerList">
            <Table >
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Nombre</TableHeaderColumn>
                  <TableHeaderColumn>Direcci&oacute;n</TableHeaderColumn>
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
