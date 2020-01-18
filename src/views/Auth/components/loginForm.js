
import { Button, Form, Input } from 'antd';
import React from 'react';
import { ERRORS, FORM_LAYOUTS } from '../../../common/constants/index';

const formStyle = {
  width: '40vw',
  backgroundColor: 'white',
  padding: '3rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}
class RegistrationForm extends React.PureComponent {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onLogin(values)
      }
    });
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form style={formStyle} {...FORM_LAYOUTS.FORM_ITEM_} onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: ERRORS.INVALID_EMAIL,
              },
              {
                required: true,
                message: ERRORS.EMPTY_EMAIL,
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: ERRORS.PASSWORD,
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item {...FORM_LAYOUTS.TAIL_FORM_ITEM}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;
