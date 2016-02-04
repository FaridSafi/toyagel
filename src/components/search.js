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
            date: this.props.date
        }
    },
    onDateChange: function (date) {
        this.setState({date: date});
    },
    render: function () {
        return (
            <View style={styles.container}>
                <Text style={styles.result}>{this.props.navigator}</Text>
            </View>
        );
    }
});

var StyleSheet = React.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    result: {}
});