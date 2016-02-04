var React = require('react-native');
var {
    Text,
    View,
    Button,
    StyleSheet
    } = React;

module.exports = React.createClass({
    render: function () {
        return (
            <View style={styles.container}>
                <Button style={styles.button}>{this.props.button}</Button>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});