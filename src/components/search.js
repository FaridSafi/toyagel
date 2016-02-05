var React = require('react-native');
var {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    DatePickerIOS
    } = React;

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            date: new Date()
        };
    },
    getInitialState: function () {
        return {
            date: this.props.date,
            user: null
        }
    },
    componentWillMount: function () {
        Parse.User.currentAsync().then((user) => { this.setState({user: user}); })
    },
    onDateChange: function (date) {
        this.setState({date: date});
    },
    render: function () {
        if (!this.state.user) {
            return <Text> Loading.... </Text>
        }
        var username = this.state.user.get('username');

        return (
            <View style={styles.container}>
                <Text>Welcome back, {username}</Text>
            </View>
        );
    }
})
;

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});