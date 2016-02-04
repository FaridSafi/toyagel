var React = require('react-native');
var {
    StyleSheet,
    View,
    TextInput,
    Text
    } = React;
var Parse = require('parse/react-native');
var Button = require('../common/button');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            username: '',
            password: '',
            email: '',
            errorMessage: ''
        };
    },
    render: function () {
        return (
            <View style={styles.container}>
                <Text>Sign up</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
                    />

                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    secureEntryText={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password:text})}

                    />

            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    label: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        width: 40
    },
    input: {
        alignItems: 'center',
        justifyContent: 'center',

    }
});