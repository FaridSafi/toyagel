var React = require('react-native');
var {
    StyleSheet,
    Navigator
    }= React;
var Parse = require("parse/react-native");
var Signin = require('./components/signin');
var Signup = require('./components/signup');
var Search = require('./components/search');
var Messenger = require('./components/messenger');

var ROUTES = {
    signin: Signin,
    signup: Signup,
    search: Search,
    messenger:Messenger
};

module.exports = React.createClass({
    componentWillMount: function () {
        Parse.initialize("dMbiGYUIGQS5MLGvcLa4JgTcfkrVzQMqaUMbAz3O","isbWezgVVCJy9WhokxvEhZVl2Q15Ovu3Nq8uqzGB");
    },
    renderScene: function (route, navigator) {
        var Component = ROUTES[route.name];
        return <Component route={route} navigator={navigator}/>;
    },
    render: function () {
        return (
            <Navigator
            style={styles.container}
            initialRoute={{name: 'messenger'}}
            renderScene={this.renderScene}
            configureScene={() => {return Navigator.SceneConfigs.FloatFromLeft;}}
            />);
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});