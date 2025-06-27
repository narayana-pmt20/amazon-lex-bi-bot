import React from "react"
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Skeleton, Form, Button, message, Space } from 'antd';
import { BASE_CONTACT_ROUTES } from '../../util/routes';
import { fetchContact, fetchContactClear } from "../../actions/contactActions";
import { createArticle, createArticleClear } from "../../actions/prArticleActions";
import PageHeader from '../shared/PageHeader';
import ErrorDisplay from '../shared/ErrorDisplay';
import PrArticleForm from '../contact_subscriptions/products/PrArticleForm';

const TITLE = 'New PR Article'

class NewPrArticle extends React.Component {
  state = {
    save_draft: false,
    disabled: false,
  }

  componentDidMount() {
    this.props.dispatch(fetchContactClear());
    const { contact_id } = this.props.match.params;
    this.props.dispatch(fetchContact(contact_id));
  }

  componentDidUpdate(prevProps, _prevState) {
    if (prevProps.newArticle !== this.props.newArticle) {
      if (this.props.newArticle) {
        message.success(this.state.save_draft ? 'Article saved as draft' : 'Article submitted succesfully');
        this.props.dispatch(createArticleClear());
        const { state, contact_id, id } = this.props.newArticle;
        if (state === 'draft') {
          this.props.history.push(`/contacts/${contact_id}`);
        } else if (state === 'info_needed') {
          this.props.history.push(`/contacts/${contact_id}/pr_articles/${id}/interaction_info`);
        }
      }
    }
  }

  onFinish = values => {
    const { contact } = this.props;
    values['min_age'] = values['age_group'][0]
    values['max_age'] = values['age_group'][1]
    values['contact_id'] = contact.id
    values['op'] = 'info_needed'
    if (this.state.save_draft) {
      values['op'] = 'save_draft'
    }
    this.props.dispatch(createArticle(values))
  };

  onFileUpload = value => {
    this.setState({
      disabled: value
    })
  }

  render() {
    const { contact, error, user } = this.props;
    const { disabled } = this.state;
    const loading = (contact == null || contact === undefined);

    if (loading) {
      return (
        <div className="content-holder" style={{ background: '#fff' }}>
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
          path: `/contacts/${contact.id}/pr_article/new`,
          breadcrumbName: TITLE
        }
      ]
    )

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const initialValues = {
      age_group: [18, 100],
      author_name: user.name,
    }

    return (
      <>
        <PageHeader title={TITLE} routes={routes} />
        <div className="content-holder" style={{ background: '#fff' }}>
          <Form {...layout} onFinish={this.onFinish} initialValues={initialValues}>
            <ErrorDisplay error={error} />
            <PrArticleForm contact={contact} onFileUpload={this.onFileUpload} />
            <div
              style={{
                width: '100%',
                background: '#fff',
                padding: '10px 16px',
              }}
            >
              <Form.Item>
                <Space direction='horizontal'>
                  <Button htmlType="submit" loading={this.props.loading} onClick={() => this.setState({ save_draft: true })} disabled={disabled}>
                    Save Draft
                  </Button>
                  <Button type="primary" htmlType="submit" loading={this.props.loading} onClick={() => this.setState({ save_draft: false })} disabled={disabled}>
                    Create
                  </Button>
                </Space>
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
  newArticle: state.prArticle.newArticle,
  loading: state.prArticle.newArticleLoading,
  error: state.prArticle.newArticleError,
  user: state.profile.profile,
});

export default connect(mapStateToProps)(withRouter(NewPrArticle));