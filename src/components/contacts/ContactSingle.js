import React from 'react'
import PropTypes from 'prop-types'
import {TextField, RaisedButton, SelectField, MenuItem} from 'material-ui'
import './styles.css'

const requiredMsg = {
  optionalFields: '*Necesitamos al menos uno de los campos (Email, Facebook. Twitter, Teléfono para continuar)'
}

const ContactSingle = ({
  handleChangeFields,
  handleSelectChange,
  state,
  optionalFields,
  disabledBtn,
  onSave,
  emailErrorTxt
}) => (
  <div>
    <h1 className='contactTitle'>Contactos</h1>
    <div className='contactFormContainer'>
      <div className='contactForm'>
        <TextField
          floatingLabelText='Nombre'
          name='name'
          value={state.fields.name}
          onChange={handleChangeFields}
        />
        <TextField
          floatingLabelText='Email'
          name='email'
          value={state.fields.email}
          onChange={handleChangeFields}
          errorText={emailErrorTxt}
        />
        <TextField
          floatingLabelText='Twitter'
          name='twitter'
          value={state.fields.twitter}
          onChange={handleChangeFields}
        />
        <TextField
          floatingLabelText='Facebook'
          name='facebook'
          value={state.fields.facebook}
          onChange={handleChangeFields}
        />
        <TextField
          floatingLabelText='Teléfono'
          name='telefono'
          value={state.fields.telefono}
          onChange={handleChangeFields}
        />
        <SelectField
          floatingLabelText='Centro de acopio'
          floatingLabelFixed
          value={state.fields.acopioId}
          onChange={handleSelectChange}
          maxHeight={200}
          autoWidth={true}
          errorText={state.fields.acopioId ? null : '*Requerido'}
          errorStyle={{color: 'red'}}
         >
          {
            state.acopios.map((item, key) => (
              <MenuItem key={key} value={item.id} primaryText={item.nombre} />
            ))
          }
        </SelectField>
      </div>
      <div>
        {
          optionalFields
            ? <p className='contactMessage'>{requiredMsg.optionalFields}</p>
            : null
        }
        <RaisedButton
          label='guardar'
          disabled={disabledBtn}
          secondary
          onClick={onSave}
        />
      </div>
    </div>
  </div>
)

ContactSingle.propTypes = {
  handleChangeFields: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  optionalFields: PropTypes.bool.isRequired,
  disabledBtn: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  emailErrorTxt: PropTypes.string.isRequired
}

export default ContactSingle
