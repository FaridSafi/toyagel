var React = require('react-native');
var {
    StyleSheet,
    View,
    TextInput,
    Text
    } = React;
var Parse = require('parse/react-native');
var Button = require('./src/common/button');

module.exports= React.createClass({
    getInitialState:function(){
        return{
            username:'',
            password:'',
            email:'',
            errorMessage:''
        };
    },
    render:function(){
        <View style={styles.container}>
            <Text>Sign up</Text>

            <Text style={styles.label}>Username:</Text>

        </View>
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
    }
});