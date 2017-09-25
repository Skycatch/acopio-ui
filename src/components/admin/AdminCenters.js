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
import _ from 'lodash'

export default class AdminCenters extends React.Component {
  constructor () {
    super()
    this.state = {
      paginateEvery: 20,
      selectedPage: 1,
      centers: [],
      shownCenters: []
    }
  }

  componentDidMount () {
    api.getAcopios()
      .then(result => {
          const centers = _.sortBy(result.data, ['nombre'])
          this.setState({
            centers,
            shownCenters: centers.slice(0, this.state.paginateEvery)
          })
      })
      .catch(console.error)
  }

  showPage (page) {
    let startingIndex = (page - 1)*this.state.paginateEvery
    this.setState({
      selectedPage: page,
      shownCenters: this.state.centers.slice(startingIndex, startingIndex + this.state.paginateEvery)
    })
  }

  pagination (centers) {
    return _.flow(
      centers => (centers.length/this.state.paginateEvery) + 1,
      numOfPages => _.range(1, numOfPages),
      pageNums => pageNums.map(num => (
        <span 
          onClick={() => this.showPage(num)} 
          value={num} 
          key={num} 
          className={this.state.selectedPage === num ? 'admin-pagination-selected': ''}
          style={{color:"#33C3F0", textDecoration:'underline', cursor: 'pointer'}}
        >
          {num}
        </span>)),
      pages => (
        <div style={{margin: '10px auto', maxWidth:500 , display:'flex' , justifyContent:'space-around'}}>
          {pages}
        </div>)//TODO prefijos
    )(centers)
  }

  deleteCenter = (e) => {
    //TODO, versión anterior borrada, porque no se utilizaba y asumia que this.state.centers era un objeto, pero puede  ser problemátuci para hacer sorts o filtros
  }

  render () {
    var centers
    let uri = '/admin/centers/'
    if (this.state.centers) {
      centers = this.state.shownCenters.map((center, index) => {
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
            <a className="u-fl" href="#" style={{display:'none'}}>Ver todos</a>
            <Link to="/admin/centers/new" className="u-fr">
              <RaisedButton label="+ Agregar nuevo" primary />
            </Link>
          </div>
          <div className="centerList">
            {this.pagination(this.state.centers)}
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
