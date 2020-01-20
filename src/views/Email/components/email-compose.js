import React from 'react';
import { Modal, Select, Form, Input } from 'antd';
import { INPUT_PLACEHOLDER } from '../../../common/constants/';
import '../styles/composeForm.scss';

const { Option } = Select;

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
}

class EmailComposer extends React.PureComponent {
  state = {
    to: [], cc: [],
    subject: '',
    body: ''
  }

  handleOk = () => {
    const { from = '' } = this.props;
    const payload = { ...this.state, from }    
    this.props.onSend(payload)
  }

  handleEmailChange = (email, type) => {
    this.setState({ [type]: email });
  }

  renderDropdown = (type = 'to') => {
    const { contacts = [] } = this.props;
    return <Select mode="multiple"
      style={{ width: '100%' }}
      placeholder={INPUT_PLACEHOLDER.EMAIL}
      onChange={(selected) => this.handleEmailChange(selected, type)}
    >
      {contacts.map(i => <Option key={i}>{i}</Option>)}
    </Select>

  }

  handlTextChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  isEmailFormValid = () => {
    const { to, cc, subject, body } = this.state;
    return (!to.length || !cc.length || !subject || !body)
  }

  render() {
    const { contacts = [] } = this.props;
    return (
      <Modal
        title="New Message"
        visible={this.props.visible}
        onOk={this.handleOk}
        okButtonProps={{ disabled: this.isEmailFormValid() }}
        okText='Send'
        onCancel={this.props.onToggleCompose}
      >
        <Form className='email-form'>
          <Form.Item label='To' {...formLayout} >
            {this.renderDropdown('to')}
          </Form.Item>
          <Form.Item label='CC'  {...formLayout} >
            {this.renderDropdown('cc')}
          </Form.Item>
          <Form.Item label='Subject'  {...formLayout} >
            <Input name='subject'
              onChange={this.handlTextChange}
              placeholder={INPUT_PLACEHOLDER.SUBJECT} />
          </Form.Item>
          <Form.Item label='Body'  {...formLayout} >
            <Input.TextArea name='body'
              rows={5}
              onChange={this.handlTextChange}
              placeholder={INPUT_PLACEHOLDER.BODY} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default EmailComposer;