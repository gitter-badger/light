var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils');
var NewsStore = require('../../stores/NewsStore');
import NewsCategoryStore from '../../stores/NewsCategoryStore';
var NewsActionCreators = require('../../actions/NewsActionCreators');
var classNames = require('classnames');
import Paper from 'material-ui/lib/paper';
import Markdown from '../Markdown';
import RaisedButton from 'material-ui/lib/raised-button';
require('rc-pagination/assets/index.css');
import Pagination from 'rc-pagination';
import Locale from 'rc-pagination/lib/locale/en_US';
require('rc-select/assets/index.css');
import Select from 'rc-select';
import CommonUtils from '../../utils/CommonUtils';


var News = React.createClass({
    displayName: 'News',

    getInitialState: function() {
        return {
            posts: [],
            ancestors: [],
            allowUpdate: false,
            total: 0,
            pageSize: 10,
            pageNo: 1
        };
    },

    componentWillMount: function() {
        NewsStore.addChangeListener(this._onNewsChange);

        NewsCategoryStore.addChangeListener(this._newsCategoryChange);

        // need to make sure that category tree is loaded in case of bookmark.
        if(NewsCategoryStore.getCategory().length === 0) {
            NewsActionCreators.getNewsTree();
        } else {
            // lookup categoryRid from categoryId in params.
            let category = CommonUtils.findCategory(NewsCategoryStore.getCategory(), this.props.params.categoryId);
            NewsActionCreators.getNewsPost(category['@rid'], this.state.pageNo, this.state.pageSize);
        }
    },

    componentWillUnmount: function() {
        NewsStore.removeChangeListener(this._onNewsChange);
        NewsCategoryStore.removeChangeListener(this._newsCategoryChange);
    },

    _onNewsChange: function() {
        this.setState({
            ancestors: NewsStore.getAncestors(),
            allowUpdate: NewsStore.getAllowUpdate(),
            posts: NewsStore.getPosts(),
            total: NewsStore.getTotal()
        });
    },

    _newsCategoryChange: function() {
        // The Main doesn't care about the post loading anymore. the loading action always starts here.
        let rid = NewsCategoryStore.getCategory()[0]['@rid'];
        if(this.props.params.categoryId) {
            let category = CommonUtils.findCategory(NewsCategoryStore.getCategory(), this.props.params.categoryId);
            rid = category['@rid'];
        }
        this.setState({rid: rid});
        NewsActionCreators.getNewsPost(rid, this.state.pageNo, this.state.pageSize);
    },

    _routeToPost: function(postId) {
        this.props.history.push('/news/' + this.props.params.categoryId + '/' + postId);
    },

    _onAddPost: function () {
        //console.log("_onAddPost is called");
        this.props.history.push('/news/postAdd/' + this.props.params.categoryId);
    },

    _onPageNoChange: function (key) {
        //console.log("_onPageNoChange is called", key);
        this.setState({
            pageNo: key
        });
        // use key instead of this.state.pageNo as setState is async.
        NewsActionCreators.getNewsPost(this.state.rid, key, this.state.pageSize);
    },

    _onPageSizeChange: function (current, pageSize) {
        //console.log("_onPageSizeChange is called", current, pageSize);
        this.setState({
            pageSize: pageSize
        });
        NewsActionCreators.getNewsPost(this.state.rid, this.state.pageNo, pageSize);
    },

    render: function() {
        //console.log('total', this.state.total);
        let addButton = this.state.allowUpdate? <RaisedButton label="Add Post" primary={true} onTouchTap={this._onAddPost} /> : '';
        return (
            <div>
                <div className="blogHeader">
                    <h2>News{addButton}</h2>
                </div>
                <div className="blogRoot">
                    <div className="leftColumn">
                        {
                            this.state.posts.map(function(post, index) {
                                var boundClick = this._routeToPost.bind(this, post.postId);
                                return (
                                    <span key={index}>
                                        <Paper className="blogPostPaper">
                                            <div className="blogPost">
                                                <h2 className="title"><a onClick={boundClick}>{post.title}</a></h2>
                                                <span>Submitted by {post.createUserId} on {post.createDate}</span>
                                                <Markdown text={post.summary} />
                                            </div>
                                        </Paper>
                                    </span>
                                );
                            }, this)
                        }
                        <Pagination locale={Locale} selectComponentClass={Select} showSizeChanger={true} pageSizeOptions={['10', '25', '50', '100']} onShowSizeChange={this._onPageSizeChange} onChange={this._onPageNoChange} current={this.state.pageNo} pageSize={this.state.pageSize} total={this.state.total}/>
                    </div>
                    <div className="rightColumn">
                        <div className="blogInfo">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = News;


/*
 <div className="rightColumn">
 <div className="blogInfo">
 <h1>News Information</h1>
 <p>In this section, you will see some information and references pertaining to the opened blog.</p>
 <p>Also, having the screen width be less then 64em will hide it, leaving reading room for mobile users only concerned with reading post content on the go.</p>
 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci alias cum, cumque cupiditate ea eum itaque, minus molestias necessitatibus nihil pariatur perspiciatis quam quas quod rem repellat, sint voluptate.</p>
 </div>
 </div>

 */