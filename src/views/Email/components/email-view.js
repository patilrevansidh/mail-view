import React from 'react';
import { Row, Col, Checkbox, Avatar } from 'antd';

export class EmailDetailView extends React.PureComponent {

    render() {
        const { emailDetail = {} } = this.props
        if (!emailDetail.subject) {
            return <div className='email-not-found'>
                No Such Email
            </div>
        }
        return (
            <div className='email-detail-view '>
                <span className='email-subject'>{emailDetail.subject}</span>
                <div className='sender-recipient-container'>
                    <span className='sender-container'>
                        <Avatar size="small" icon="user" />
                        <span className='from'>{emailDetail.from}</span>
                    </span>
                    <div className='recipient-container'>
                        <div className='recipient-list'>
                            To {emailDetail.to.toString()}
                        </div>
                        <div className='recipient-list'>
                            CC {emailDetail.cc.toString()}
                        </div>
                    </div>
                </div>
                <div className='email-body'>
                    {emailDetail.body}
                </div>
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
            </Row>
        )
    }
}

