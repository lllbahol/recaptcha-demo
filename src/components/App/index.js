import React from 'react';
import { Form } from 'react-form';
// import Recaptcha from '../Recaptcha';
import RecaptchaField from '../Recaptcha/field';

const App = ()=> (
  <div>
    <h1>Recaptcha</h1>
    {/* <Recaptcha /> */}
    <Form>
      {
        ({ values, errors }) => {
          console.log(values, errors);
          return (
            <div>
              <RecaptchaField fieldKey="validate" />
              <button
                style={{ border: '1px solid #000', fontSize: 16 }}
              >
                {errors ? `not pass ${errors['validate']}` : 'pass'}
              </button>
            </div>
          );
        }
      }
    </Form>
  </div>
)

export default App;