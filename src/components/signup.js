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
            passwordConfirmation: '',
            email: '',
            errorMessage: ''
        };
    },
    render: function () {
        return (
            <View style={styles.container}>

                <Text style={styles.label}>Lakamyn</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.username}
                    onChangeText={(text) => this.setState({username: text})}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.email}
                    onChangetext={(text) => this.setState({email: text})}
                />

                <Text>Parol</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})}

                />

                <Text>Parol yene bir gezek</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={this.state.passwordConfirmation}
                    onChangeText={(text) => this.setState({passwordConfirmation: text})}

                />

                <Text style={styles.label}>{this.state.errorMessage}</Text>
                <Button text={'Registraciya'} onPress={this.onSignUpPress}/>
                <Button text={'Hasabyma gir'} onPress={this.onSigninPress}/>

            </View>
        );
    },
    onSignUpPress: function () {

        if (this.state.password !== this.state.passwordConfirmation) {
            return this.setState({errorMessage: 'Parolynyz den gelmedi'});
        }
        var user = new Parse.User();
        user.set('username', this.state.username);
        user.set('password', this.state.password);

        user.signUp({
            succes: (user) => {
                this.props.navigator.immediatelyResetRouteStack([{name: 'search'}]);
            },
            error: (user, error) => {
                this.setState({errorMessage: error.message});
            }
        });
    },
    onSigninPress: function () {
        this.props.navigator.pop();
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 18
    },
    input: {
        padding: 4,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        width: 200,
        alignSelf: 'center'
    }
});