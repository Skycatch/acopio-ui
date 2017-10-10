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

const deleteCenter = id => api.deleteAcopio(id)

export default class AdminCenters extends React.Component {
  state = {
    paginateEvery: 20,
    selectedPage: 1,
    centers: [],
    shownCenters: [],
    selectedRows: []
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

  getSelectedCenters (startingIndex) {
    return this.state.centers.slice(startingIndex, startingIndex + this.state.paginateEvery)
  }


  showPage (page) {
    let startingIndex = (page - 1)*this.state.paginateEvery
    this.setState({
      selectedPage: page,
      shownCenters: this.getSelectedCenters(startingIndex)
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

  onDelete = () => {
    const { selectedRows, selectedPage, paginateEvery, centers: oldCenters } = this.state
    const offset = (selectedPage - 1) * paginateEvery
    const selectedWithOffset = selectedRows.map(r => r + offset)
    const selectedWithOffsetPopulated = selectedWithOffset.map((r) => oldCenters[r])
    selectedWithOffsetPopulated.reduce((pAcc, { id }) => pAcc.then(() => deleteCenter(id)), Promise.resolve()).then(() => {
      const centers = _.remove(oldCenters, (_, index) => selectedWithOffset.indexOf(index) === -1)
      this.setState(() => ({ centers }))
    }).then(() => {
      this.showPage(1)
    }).catch(console.error)
  }

  onRowSelection = (selectedRows) => {
    window.requestAnimationFrame(() => {
      this.setState(() => ( { selectedRows }))
    })
    
  }

  isSelected = (index) => this.state.selectedRows.indexOf(index) !== -1

  render () {
    const uri = '/admin/centers/'
    const { centers, shownCenters } = this.state
    const renderedCenters = this.state.centers.length !== 0 ? shownCenters.map((center, index) => {
      return (
        <TableRow key={center.id} className="rowhover" selected={this.isSelected(index)}>
          <TableRowColumn>
            <Link to={uri + center.id}>{center.nombre}</Link>
          </TableRowColumn>
          <TableRowColumn title={center.direccion}>{center.direccion}</TableRowColumn>
        </TableRow>
      )
    }) :(<TableRow> <TableRowColumn colSpan={4}> No se encontraron resultados </TableRowColumn> </TableRow>)

    return (
      <div className="content container">
        <div className="AdminCenters">
          <h1>Administrar centros de acopio</h1>
          <div className="row cf">
            <a className="u-fl" href="#" style={{display:'none'}}>Ver todos</a>
            <RaisedButton label="- Borrar" secondary onClick={this.onDelete} />
            <Link to="/admin/centers/new" className="u-fr">
              <RaisedButton label="+ Agregar nuevo" primary />
            </Link>
          </div>
          <div className="centerList">
            {this.pagination(centers)}
            <Table multiSelectable onRowSelection onRowSelection={this.onRowSelection}>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>Nombre</TableHeaderColumn>
                  <TableHeaderColumn>Direcci&oacute;n</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody  >
                {renderedCenters}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}