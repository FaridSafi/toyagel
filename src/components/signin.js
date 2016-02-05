var React = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    TextInput
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

                <Text style={styles.label}>Lakamyn</Text>
                <TextInput style={styles.input}
                           value={this.state.username}
                           onChangeText={(text)=>this.setState({username: text})}
                    />

                <Text style={styles.label}>Parol</Text>
                <TextInput style={styles.input}
                           secureTextEntry={true}
                           value={this.state.password}
                           onChangeText={(text)=>this.setState({password: text})}
                    />

                <Text style={styles.label}>{this.state.errorMessage}</Text>
                <Button text={'Iceri gir'} onPress={this.onPress}/>
                <Button text={'Registraciya'} onPress={this.onSignUpPress}/>

            </View>
        );
    },
    onSignUpPress: function () {
        this.props.navigator.push({name: 'signup'});
    },
    onPress: function () {
        Parse.User.logIn(this.state.username, this.state.password, {
            success: (user)=> {
                this.props.navigator.immediatelyResetRouteStack([{name: 'search'}]);
            },
            error: (data, error)=> {
                this.setState({errorMessage: error.message});
            }
        });
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
