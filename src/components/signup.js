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
                <Text>Registraciya</Text>

                <Text style={styles.label}>Lakamyn</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.username}
                    onChangeText={(text) => this.setState({username: text})}
                    />

                <Text>Parol</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})}

                    />
                <Button text={'Registraciya'} onPress={this.onSignUpPress}></Button>

            </View>
        );
    },
    onSignUpPress: function () {
        var user = new Parse.User();
        user.set('username', this.state.username);
        user.set('password', this.state.password);

        user.signUp(null,{
            succes: (user) => {this.props.navigator.immediatelyResetRouteStack({name: 'search'}); },
            error: (user, error) => {this.setState({errorMessage: error.message});}
        });
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