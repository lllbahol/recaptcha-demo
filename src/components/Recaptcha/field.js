import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-form';
import ReCaptcha from '../Recaptcha';

const ReCaptchaField = (props) => (
  <Field
    field={props.fieldKey}
    validate={(value) => ({
      error: value === false ? 'reCaptcha验证未通过' : null,
    })}
    defaultValue={false}
  >
    {
      ({ setValue }) => (<ReCaptcha setSuccess={(pass) => { setValue(pass); }} />)
    }
  </Field>
);

ReCaptchaField.propTypes = {
  fieldKey: PropTypes.string,
};

export default ReCaptchaField;
