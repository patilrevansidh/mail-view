import React from 'react';
import { Row, Col, Checkbox } from 'antd';

export class EmailDetailView extends React.PureComponent {
    render() {
        return (
            <div>
                EmailDetailView
            </div>
        );
    }
}

export class EmailListItem extends React.PureComponent {

    handleSelect = () => {
        const { mail } = this.props;
        this.props.onSelect(mail.id);
    }

    handleDetailView = () => {
        const { mail } = this.props;
        this.props.onView(mail.id);
    }

    render() {
        const { mail, first, isSelected } = this.props;
        let className = first ? 'email-first-list-item' : 'email-list-item';
        className = !mail.read ? className + ' unread-email' : className;
        return (
            <Row className={className} >
                <Col xs={4}>
                    <span>
                        <Checkbox checked={isSelected} onClick={this.handleSelect} />
                        <span>{mail.name}</span>
                    </span>
                </Col>
                <Col className='email-item-preview' xs={16} onClick={this.handleDetailView}>
                    <span>{mail.subject}</span>
                </Col>
            </Row >
        )
    }
}

