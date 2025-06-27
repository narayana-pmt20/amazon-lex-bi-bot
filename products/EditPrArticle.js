import React from "react"
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Skeleton, Form, Button, message, Space } from 'antd';
import { BASE_CONTACT_ROUTES } from '../../util/routes';
import { updateArticle, updateArticleClear, fetchArticle, fetchArticleClear } from "../../actions/prArticleActions";
import PageHeader from '../shared/PageHeader';
import ErrorDisplay from '../shared/ErrorDisplay';
import PrArticleForm from '../contact_subscriptions/products/PrArticleForm';

const TITLE = 'Edit PR Article'

class EditPrArticle extends React.Component {
  state = {
    save_draft: false,
    disabled: false
  }

  componentDidMount() {
    this.props.dispatch(fetchArticleClear())
    const { id } = this.props.match.params;
    this.props.dispatch(fetchArticle(id));
  }

  componentDidUpdate(prevProps, _prevState) {
    if (prevProps.editArticle !== this.props.editArticle) {
      if (this.props.editArticle) {
        message.success(this.state.save_draft ? 'Article saved as draft' : 'Article updated succesfully');
        this.props.dispatch(updateArticleClear());
        this.props.history.push(this.props.editArticle.state === 'draft' ? `/contacts/${this.props.editArticle.contact_id}` : `/contacts/${this.props.editArticle.contact_id}/pr_articles/${this.props.editArticle.id}/interaction_info`)
      }
    }
  }

  onFinish = values => {
    const { article } = this.props
    values['min_age'] = values['age_group'][0]
    values['max_age'] = values['age_group'][1]
    if (this.state.save_draft) {
      values['op'] = 'save_draft'
    }
    else {
      values['op'] = 'info_needed'
    }
    this.props.dispatch(updateArticle(article.id, values))
  };

  onFileUpload = value => {
    this.setState({
      disabled: value
    })
  }

  render() {
    const { article, error } = this.props;
    const { disabled } = this.state;
    const loading = (article == null || article === undefined);


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
          path: `/contacts/${article.contact.id}`,
          breadcrumbName: `${article.contact.name}`
        },
        {
          path: `/pr_articles/${article.id}/edit`,
          breadcrumbName: TITLE
        }
      ]
    )

    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    let initialValues = article;
    initialValues.age_group = [article.min_age, article.max_age]
    initialValues.images = null;
    if (article.attachment_json) {
      initialValues.images = article.attachment_json.images;
      initialValues.attachment = article.attachment_json.attachment;
    }

    return (
      <>
        <PageHeader title={TITLE} routes={routes} />
        <div className="content-holder" style={{ background: '#fff' }}>
          <Form {...layout} onFinish={this.onFinish} initialValues={initialValues}>
            <ErrorDisplay error={error} />
            <PrArticleForm contact={article.contact} fileList={article.attachment_json.images}  onFileUpload={this.onFileUpload}/>
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
  article: state.prArticle.article,
  editArticle: state.prArticle.editArticle,
  loading: state.prArticle.editArticleLoading,
  error: state.prArticle.editArticleError,
});

export default connect(mapStateToProps)(withRouter(EditPrArticle));