import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TextField, RaisedButton, SelectField, MenuItem} from 'material-ui'
import './styles.css'
import api from '../../api'

class ContactContainer extends Component {
  state = {
    fields: {
      name: '',
      email: '',
      twitter: '',
      facebook: '',
      telefono: '',
      acopioId: ''
    },
    acopios: []
  }

  componentWillMount () {
    api.getAcopios()
      .then(response => this.setState({acopios: response.data}))
  }

  handleChange (section, value) {
    this.setState({
      fields: {
        ...this.state.fields,
        [section]: value
      }
    })
  }

  handleChangeFields = (e) => this.handleChange(e.target.name, e.target.value)

  handleSelectChange = (e, i, value) => this.handleChange('acopioId', value)


  disabledBtn () {

  }

  render () {
    return (
      <div className='wrapper'>
        <h1 className='title'>Contactos</h1>
        <div className='formContainer'>
          <div className='form'>
            <TextField
              floatingLabelText='Nombre'
              name='name'
              onChange={this.handleChangeFields}
            />
            <TextField
              floatingLabelText='Email'
              name='email'
              onChange={this.handleChangeFields}
            />
            <TextField
              floatingLabelText='Twitter'
              name='twitter'
              onChange={this.handleChangeFields}
            />
            <TextField
              floatingLabelText='Facebook'
              name='facebook'
              onChange={this.handleChangeFields}
            />
            <TextField
              floatingLabelText='Teléfono'
              name='telefono'
              onChange={this.handleChangeFields}
            />
            <SelectField
               floatingLabelText='Centro de acopio'
               floatingLabelFixed={true}
               value={this.state.fields.acopioId}
               onChange={this.handleSelectChange}
               maxHeight={200}
               autoWidth={true}
             >
               {
                 this.state.acopios.map((item, key) => (
                   <MenuItem key={key} value={item.id} primaryText={item.nombre} />
                 ))
               }
             </SelectField>
          </div>
          <RaisedButton
            label='guardar'
            disabled={this.disabledBtn()}
            secondary
          />
        </div>
      </div>
    )
  }
}

export default ContactContainer
