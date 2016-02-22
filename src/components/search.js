var React = require('react-native');
var {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    Image
    } = React;
var CalendarPicker = require('react-native-calendar-picker');
//var CalendarPicker = require('rn.daterangepicker');
var Parse = require('parse/react-native');
var Button = require('../common/button');


var Search = React.createClass({
        getDefaultProps: function () {
            return {
                date: new Date()
            };
        },
        getInitialState: function () {
            return {
                date: this.props.date,
                artistName: '',
                artistUserId: 1,
                user: null
            }
        },
        componentWillMount: function () {
            Parse.User.currentAsync().then((user) => {
                this.setState({user: user});
            });

            this.getArtistName();
        },
        getArtistName: function () {
            var query = new Parse.Query(Parse.User);
            query.equalTo('userId', this.state.artistUserId);
            //query.equalTo('objectId', '6yCeF80qWf');
            return query.first({
                success: (result) => {
                    this.setState({artistName: result.get('name')});
                    console.log("WOOOHOOOOO " + result.get('name'));
                },
                error: (data, error) => {
                    console.log('Error occured : ' + error.message())
                }
            });
        },

        getNextArtistName: function () {
            this.setState({artistUserId: this.state.artistUserId + 1});
            this.getArtistName();
        },

        getPreviousArtistName: function () {
            if (this.state.artistUserId > 0) {
                console.log("Number : " + this.state.artistUserId);
                this.setState({artistUserId: this.state.artistUserId - 1});
            }else{
                console.log('Reached to first artist !!!');
                console.log("Number : " + this.state.artistUserId);
            }
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
                        {this.state.artistName}
                    </Text>

                    <Button text={'Next'} onPress={this.getNextArtistName}/>
                    <Button text={'Previous'} onPress={this.getPreviousArtistName}/>

                    <CalendarPicker
                        selectedDate={this.state.date}
                        onDateChange={this.onDateChange}
                        />

                    <Button text={'Cyk'} onPress={this.onLogoutPress}/>

                    <Button text={'Habarlas'} onPress={this.onPress}/>
                </View>


            );
        },
        onLogoutPress: function () {
            //Parse.User.logOut();
            console.log('I reached here !!!')
            this.props.navigator.immediatelyResetRouteStack([{name: 'signin'}]);
        },
        onPress: function () {
            this.props.navigator.push({name: 'messenger'});
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
    imageHolder: {
        height: 200,
        width: 100
    },
    contact: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginTop: 10,
    },
    availableDates: {
        color: 'green'
    }

});

module.exports = Search;