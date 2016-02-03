var React = require('react-native');
var {
    StyleSheet,
    Navigator
    }= React;
var Parse = require("parse/react-native");
var Signin = require('./src/components/signin');
var Signup = require('./src/components/signup');
var Search = require('./src/components/search');

var ROUTES = {
    signin: Signin,
    signup: Signup,
    search: Search
};

module.exports = React.createClass({
    componentWillMount: function () {
        Parse.initialize();
    },
    renderScene: function (route, navigator) {
        var Component = ROUTES[signin];
        return <Component route={route} navigator={navigator}/>;
    },
    render: function () {
        return (<Navigator
            styles={styles.container}
            initialRoute={{name:'signin'}}
            renderScene={this.renderScene()}
            configureScene={()=>{return Navigator.SceneConfigs.FloatFromLeft;}}
        />);
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});