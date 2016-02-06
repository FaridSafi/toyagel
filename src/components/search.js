var React = require('react-native');
var {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    DatePickerIOS
    } = React;

var Parse = require('parse/react-native');

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
        Parse.User.currentAsync().then((user) => {
            this.setState({user: user});
        })
    },
    onDateChange: function (date) {
        this.setState({date: date});
    },
    render: function () {
        if (!this.state.user) {
            return <View style={styles.container}>
                <Text style={styles.label}> Loading.... </Text>
            </View>
        }
        var username = this.state.user.get('username');

        return (
            <View style={styles.container}>
                <Text>{this.state.date}</Text>
                <DatePickerIOS
                    date={this.state.date}
                    mode="date"
                    onDateChange={this.onDateChange}
                />
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
    },
    label: {
        fontSize: 18
    }
});