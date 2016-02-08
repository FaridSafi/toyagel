var React = require('react-native');
var {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    Button,
    Image
    } = React;
var CalendarPicker = require('react-native-calendar-picker');
var Parse = require('parse/react-native');
var Button = require('../common/button');


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

                <Image style={styles.imageHolder}
                        source={require('../common/images/bilbil_owezowa.png')}
                />

                <Text style={styles.label}>
                    Bilbil Owezowa
                </Text>

                <CalendarPicker
                    selectedDate={this.state.date}
                    onDateChange={this.onDateChange}
                />

                <Button text={'Doly'} style={styles.buttonStyle}/>

            </View>


        );
    },
    onSignoutPress: function(){
        Parse.User.logOut();
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
    },
    imageHolder:{
        height:200,
        width:200
    },
    buttonStyle:{
        color:'#ff0000'
    }

});