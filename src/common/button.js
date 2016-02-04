var React = require('react-native');
var {
    Text,
    TouchableHighlight,
    StyleSheet
    } = React;

module.exports = React.createClass({

    render: function () {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor={'gray'}
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor:'black',
        borderWidth:1,
        borderRadius:5,
        padding:5,
        marginTop:10
    },
    buttonText: {
        flex: 1
    }
});