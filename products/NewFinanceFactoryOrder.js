import React from "react"
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Skeleton, Form, Button, message } from 'antd';
import { BASE_CONTACT_ROUTES } from '../../util/routes';
import { fetchContact, fetchContactClear } from "../../actions/contactActions";
import { createOrder, createOrderClear } from "../../actions/financeFactoryActions";
import PageHeader from '../shared/PageHeader';
import ErrorDisplay from '../shared/ErrorDisplay';
import FinanceFactoryOrderForm from '../contact_subscriptions/products/FinanceFactoryOrderForm'

const TITLE = 'New business loan'

class NewFinanceFactoryOrder extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchContactClear());
    const { contact_id } = this.props.match.params;
    this.props.dispatch(fetchContact(contact_id));
  }

  componentDidUpdate(prevProps, _prevState) {
    if (prevProps.newOrder !== this.props.newOrder) {
      if (this.props.newOrder) {
        message.success('Application submitted succesfully');
        this.props.dispatch(createOrderClear());
        this.props.history.push(`/subscriptions/${this.props.newOrder.subscription_id}`);
      }
    }
  }

  onFinish = values => {
    let result = {}
    result.contact_id = this.props.match.params.contact_id;
    result.finance_factory_order = values;
    this.props.dispatch(createOrder(result));
  };

  render () {
    const { contact, error } = this.props;
    const loading = (contact == null || contact === undefined);
    
    
    if (loading) {
      return (
        <div className="content-holder" style={{background: '#fff'}}>
          <Skeleton />
        </div>
      )
    }

    const routes = BASE_CONTACT_ROUTES.concat(
      [
        {
          path: `/contacts/${contact.id}`,
          breadcrumbName: `${contact.name}`
        },
        {
          path: `/contacts/${contact.id}/business_loans/new`,
          breadcrumbName: TITLE
        }
      ]
    )

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    
    return (
      <>
        <PageHeader title={TITLE} routes={routes} />
        <div className="content-holder" style={{background: '#fff'}}>
          <Form {...layout} onFinish={this.onFinish}>
            <ErrorDisplay error={error}/>
            <FinanceFactoryOrderForm />
            <div
              style={{
                width: '100%',
                background: '#fff',
                padding: '10px 16px',
              }}
            >
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={this.props.loading}>
                  Create
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  contact: state.contacts.activeContact,
  newOrder: state.financeFactory.newOrder,
  loading: state.financeFactory.newOrderLoading,
  error: state.financeFactory.newOrderError,
});

export default connect(mapStateToProps)(withRouter(NewFinanceFactoryOrder));