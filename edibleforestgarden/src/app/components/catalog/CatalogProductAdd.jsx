import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import RaisedButton from 'material-ui/lib/raised-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import FormStore from '../../stores/FormStore';
import ProductStore from '../../stores/ProductStore';
import FormActionCreators from '../../actions/FormActionCreators';
import CatalogActionCreators from '../../actions/CatalogActionCreators';
import SchemaForm from 'react-schema-form/lib/SchemaForm';
import utils from 'react-schema-form/lib/utils';
import RcSelect from 'react-schema-form-rc-select/lib/RcSelect';
require('rc-select/assets/index.css');
import CatalogCategoryStore from '../../stores/CatalogCategoryStore';
import CommonUtils from '../../utils/CommonUtils';
import Markdown from '../Markdown';


const id = 'com.networknt.light.catalog.product.add';

var CatalogProductAdd = React.createClass({

    getInitialState: function() {
        return {
            error: null,
            schema: null,
            form: null,
            model: null,
            action: null
        };
    },

    componentWillMount: function() {
        FormStore.addChangeListener(this._onFormChange);
        ProductStore.addChangeListener(this._onProductChange);
        FormActionCreators.getForm(id);
    },

    componentWillUnmount: function() {
        FormStore.removeChangeListener(this._onFormChange);
        ProductStore.removeChangeListener(this._onProductChange);
    },

    _onFormChange: function() {
        let schema = FormStore.getForm(id).schema;
        let form = FormStore.getForm(id).form;
        let action = FormStore.getForm(id).action;
        let category = CommonUtils.findCategory(CatalogCategoryStore.getCategory(), this.props.params.categoryId);
        this.setState({
            schema: schema,
            form: form,
            action: action,
            model: {parentRid: category['@rid']}
        });
    },

    _onProductChange: function() {

        // TODO display toaster
    },

    _onModelChange: function(key, val) {
        utils.selectOrSet(key, this.state.model, val);
        // force update in order to refresh markdown rendering.
        this.forceUpdate();
    },

    _onTouchTap: function(action) {
        let validationResult = utils.validateBySchema(this.state.schema, this.state.model);
        console.log('validationResult', validationResult);
        if(!validationResult.valid) {
            this.setState({error: validationResult.error.message});
        } else {
            action.data = this.state.model;
            CatalogActionCreators.addProduct(action);
        }
    },

    render: function() {
        if(this.state.schema) {
            var actions = [];
            {this.state.action.map((item, index) => {
                let boundTouchTap = this._onTouchTap.bind(this, item);
                actions.push(<RaisedButton key={index} label={item.title} primary={true} onTouchTap={boundTouchTap} />)
            })}
            return (
                <div>
                    <pre>{this.state.error}</pre>
                    <SchemaForm schema={this.state.schema} model={this.state.model} form={this.state.form} onModelChange={this._onModelChange} mapper= {{"rc-select": RcSelect}} />
                    <pre>{this.state.error}</pre>
                    {actions}
                    <Tabs initialSelectedIndex={1}>
                        <Tab label="Description">
                            <Markdown text={this.state.model.description} />
                        </Tab>
                        <Tab label="Content">
                            <Markdown text={this.state.model.content} />
                        </Tab>
                    </Tabs>
                </div>
            )
        } else {
            return <CircularProgress mode="indeterminate"/>
        }
    }
});

module.exports = CatalogProductAdd;
