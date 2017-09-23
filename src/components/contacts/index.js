import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TextField, RaisedButton, SelectField, MenuItem} from 'material-ui'
import './styles.css'
import api from '../../api'

const requiredMsg = {
  optionalFields: '*Necesitamos al menos uno de los campos (Email, Facebook. Twitter, Teléfono para continuar)'
}

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

  optionalFields () {
    const { name, email, twitter, facebook, telefono } = this.state.fields
    const validate = !!name || !!email || !!twitter || !!facebook || !!telefono
    return validate
  }

  disabledBtn () {
    const { acopioId } = this.state.fields
    const _optionalFields = this.optionalFields()
    const validate = _optionalFields && acopioId
    return validate
  }

  onSave = (e) => {
    e.preventDefault()
    console.log('On-SAVE', this.state.fields);
    api.saveContacto(this.state.fields)
  }

  render () {
    return (
      <div className='contactWrapper'>
        <h1 className='contactTitle'>Contactos</h1>
        <div className='contactFormContainer'>
          <div className='contactForm'>
            <TextField
              floatingLabelText='Nombre'
              name='name'
              onChange={this.handleChangeFields}
            />
            <div>
              <TextField
                floatingLabelText='Email'
                name='email'
                onChange={this.handleChangeFields}
              />
            </div>
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
              errorText={this.state.fields.acopioId ? null : '*Requerido'}
              errorStyle={{color: 'red'}}
             >
              {
                this.state.acopios.map((item, key) => (
                  <MenuItem key={key} value={item.id} primaryText={item.nombre} />
                ))
              }
            </SelectField>
          </div>
          <div>
            {
              !this.optionalFields()
                ? <p className='contactMessage'>{requiredMsg.optionalFields}</p>
                : null
            }
            <RaisedButton
              label='guardar'
              disabled={!this.disabledBtn()}
              secondary
              onClick={this.onSave}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ContactContainer
